import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import storage from "../cache/storage";
import { uploadOfflineBabies, uploadOfflineVisits } from "../cache/uploadData";

import http from "../utils/http";
import { px2dp, styled } from "../utils/styled";
import { Colors } from "../constants";
import {
  BabyItem,
  Button,
  ListFooter,
  Message,
  Modal,
  NoData,
} from "../components";
import { useBoolState } from "../utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Babies({ navigation }) {
  const { t } = useTranslation("Babies");
  const { navigate } = navigation;
  const [search, setSearch] = useState({
    page: 0,
    size: 10,
    force: {},
  });
  const [totalPages, setTotalPages] = useState(0);
  const [contents, setContents] = useState([]);
  const [refreshing, startRefresh, endRefresh] = useBoolState();
  const [tooltip, openTooltip, closeTooltip] = useBoolState();
  const [loading, startLoad, endLoad] = useBoolState();
  const [messageVisble, openMessage, closeMessage] = useBoolState();
  const { isConnected } = useSelector((state) => state.net);
  const [name, setName] = useState();
  const [sortName, setSortName] = useState();
  const [sortDate, setSortDate] = useState();

  async function load() {
    if (isConnected) {
      if (search.page === 0) {
        startRefresh();
        setContents([]);
        uploadOfflineVisits();
        await uploadOfflineBabies();
      } else {
        startLoad();
      }

      http
        .get("/api/babies", search)
        .then((data) => {
          setTotalPages(data.totalPages);
          setContents((contents) => {
            const newValue = [...contents];
            data.content.forEach((tmp, index) => {
              const targetIndex = newValue.findIndex((v) => v.id === tmp.id);
              if (targetIndex >= 0) {
                newValue[targetIndex] = tmp;
              } else {
                newValue.push(tmp);
              }
            });
            return newValue;
          });
        })
        .finally(() => {
          endRefresh();
          endLoad();
        });
    } else {
      // load offline data
      const data = await storage.getBabies();
      // load offline create babies
      const offlineBabies = await storage.getOfflineBabies();
      setTotalPages(1);
      setContents([...(offlineBabies || []), ...(data || [])]);
    }
  }

  useEffect(() => {
    load();
  }, [search.page, search.force, search.sort, isConnected]);

  function backupBabyAndCaregivers() {
    http
      .get("/api/babies", { page: 0, size: 1000 })
      .then((data) => {
        (data?.content || []).forEach((element) => {
          if (element?.nextShouldVisitDTO?.lesson) {
            storage.addNextShouldVisit(element.id, element.nextShouldVisitDTO);
          }
        });
        storage.setBabies(data.content);
      })
      .finally(() => {
        openMessage();
      });
  }

  async function refresh() {
    if (refreshing) return;
    setSortDate("");
    setSortName("");
    setSearch((s) => ({
      ...s,
      page: 0,
      force: {},
      name: name || "",
      sort: "",
    }));
  }

  function handleLoadMore() {
    if (refreshing || loading) return;
    if (totalPages === search.page + 1) return;
    setSearch((s) => ({
      ...s,
      page: s.page + 1,
    }));
  }

  function searchBySortName() {
    const nextSort = getNextSort(sortName);
    setSortName(nextSort);
    setSortDate("");
    setSearch((s) => ({
      ...s,
      page: 0,
      sort: nextSort && `name,${nextSort}`,
    }));
  }

  function searchBySortDate() {
    const nextSort = getNextSort(sortDate);
    setSortDate(nextSort);
    setSortName("");
    setSearch((s) => ({
      ...s,
      page: 0,
      sort: nextSort && `createdAt,${nextSort}`,
    }));
  }

  function getNextSort(sort) {
    switch (sort) {
      case "asc":
        return "desc";
      case "desc":
        return "";
      default:
        return "asc";
    }
  }

  return (
    <>
      <Header {...Colors.linearGradient}>
        <Search>
          <MaterialIcons name="search" size={px2dp(16)} color="#fff" />
          <TextInput
            style={{ marginLeft: px2dp(4), flex: 1, color: "#fff" }}
            onChangeText={(text) => setName(text)}
            onEndEditing={() => refresh()}
            placeholder={t("searchPlaceholder")}
          />
        </Search>
      </Header>

      <Message
        visible={messageVisble}
        buttonText={t("understood", { ns: "App" })}
        onButtonPress={closeMessage}
        title={t("backupSuccess")}
        content=" "
      />

      {isConnected ? (
        <BackupLine>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={backupBabyAndCaregivers}
          >
            <PromptWord>
              {t("backupPrompt")}
              <Link>{t("backupLink")}</Link>
            </PromptWord>
          </TouchableOpacity>
        </BackupLine>
      ) : (
        <BackupLine>
          <PromptWord>
            <AntDesign name="infocirlceo" size={px2dp(8)} color="#ACA9A9" />
            {t("offlineMode")}
          </PromptWord>
        </BackupLine>
      )}
      {contents.length > 0 && (
        <ListHeader>
          <TitleContainer>
            <Title>{t("babyList")}</Title>
            {isConnected && (
              <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <SortLine>
                  {t("sortBy")}
                  <SortField sortType={sortName} onPress={searchBySortName}>
                    {" "}
                    {t("name")}{" "}
                    {sortName === "asc" ? "↑" : sortName === "desc" ? "↓" : "⇅"}
                  </SortField>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <SortField sortType={sortDate} onPress={searchBySortDate}>
                    {" "}
                    {t("creationTime")}{" "}
                    {sortDate === "asc" ? "↑" : sortDate === "desc" ? "↓" : "⇅"}
                  </SortField>
                </SortLine>
              </TouchableOpacity>
            )}
            <InfoLine>
              <TouchableOpacity activeOpacity={0.8} onPress={openTooltip}>
                <TooltipContainer>
                  <Tooltip>{t("attention")}</Tooltip>
                  <AntDesign
                    name="infocirlceo"
                    size={px2dp(8)}
                    color="#ff794f"
                  />
                </TooltipContainer>
              </TouchableOpacity>
            </InfoLine>
          </TitleContainer>
          <Button
            onPress={() => navigate("CreateBabyStep1")}
            title={t("addBaby")}
          />
        </ListHeader>
      )}

      <Modal
        hideCancel
        visible={tooltip}
        onOk={closeTooltip}
        okText={t("understood", { ns: "App" })}
        title={t("attention")}
        contentText={t("attentionTooltip")}
      />
      <FlatList
        ListEmptyComponent={
          !refreshing &&
          !loading && (
            <NoDataContainer>
              {name ? (
                <NoData title={t("noMatchingBaby")} />
              ) : (
                <>
                  <NoData title={t("noBabyInfo")} />
                  <Button
                    title={t("addBaby")}
                    onPress={() => navigate("CreateBabyStep1")}
                  />
                </>
              )}
            </NoDataContainer>
          )
        }
        ListFooterComponent={
          <View style={{ height: 80, backgroundColor: "red", width: "100%" }}>
            {!refreshing && contents.length > 0 && (
              <ListFooter loading={loading} />
            )}
          </View>
        }
        refreshControl={
          <RefreshControl
            colors={Colors.colors}
            onRefresh={() => refresh()}
            refreshing={refreshing}
          />
        }
        data={contents}
        keyExtractor={(item) => item.id + ""}
        onEndReachedThreshold={0.4}
        onEndReached={handleLoadMore}
        renderItem={({ item }) => (
          <BabyItem onPress={(baby) => navigate("Baby", baby)} {...item} />
        )}
      />
    </>
  );
}

const NoDataContainer = styled.View`
  height: 350px;
  justify-content: center;
`;

const BackupLine = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 28px 0px;
`;

const ListHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 5px 28px 10px;
`;

const Title = styled.Text`
  font-size: 12px;
  color: #525252;
  font-weight: bold;
  margin-bottom: 2px;
`;

const PromptWords = styled.Text`
  font-size: 10px;
  color: #8e8e93;
  margin-bottom: 20px;
`;

const PromptWord = styled.Text`
  font-size: 10px;
  color: #8e8e93;
`;

const Link = styled.Text`
  font-size: 10px;
  color: #1717f3;
  margin-right: 2px;
`;

const SortLine = styled.Text`
  font-size: 10px;
  margin-right: 2px;
  margin-top: 3px;
  margin-bottom: 3px;
`;

const SortField = styled.Text`
  font-size: 11px;
  font-weight: 400;
  color: #a4a4a4;
  ${({ sortType }) => sortType && `color: #FF794F;`}
`;

const Tooltip = styled.Text`
  font-size: 8px;
  color: #ff794f;
  margin-right: 2px;
`;

const TooltipContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TitleContainer = styled.View``;

const Header = styled(LinearGradient)`
  width: 100%;
  height: 56px;
  padding-top: 22px;
  align-items: center;
`;

const Search = styled.View`
  flex-direction: row;
  width: 334px;
  height: 24px;
  background: rgba(0, 0, 0, 0.2);
  align-items: center;
  border-radius: 12px;
  padding-left: 12px;
`;

const InfoLine = styled.View`
  width: 50px;
`;
