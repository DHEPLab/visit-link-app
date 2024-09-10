import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  FlatList,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useTranslation } from "react-i18next";

import http from "../utils/http";
import { useFetch, useManualFetch, useBoolState } from "../utils";
import { Colors } from "../constants";
import { styled, px2dp } from "../utils/styled";
import { GenderIcon, BabyStage, FeedingPattern } from "../constants/enums";
import {
  VisitItem,
  GhostNavigatorHeader,
  Button,
  Card,
  StaticField,
  NoData,
  ApproveStatus,
  CarerItem,
  Modal,
  Input,
  LargeButtonContainer,
  Message,
} from "../components";
import { useMethods } from "./BabyForm/CreateBabyStep2";
import storage from "../cache/storage";
import confirm from "../components/modal/confirm";

export default function Baby({ navigation, route }) {
  const { t } = useTranslation("Baby");
  const { params } = route;
  const [index, setIndex] = useState(params?.tab === "family" ? 1 : 0);

  const [started, setStarted] = useState(false);
  const [baby, refreshBaby] = useFetch(`/api/babies/${params.id}`, {}, params);
  const [carers, refreshCarers] = useFetch(
    `/api/babies/${params.id}/carers`,
    {},
    params?.allCarerList || [],
  );
  const [createVistErrors, refreshCreateVistErrors] = useFetch(
    `/api/log/${params.id}`,
    {},
    [],
  );
  const [babyVisits, refreshBabyVisits] = useManualFetch(
    `/api/babies/${params.id}/visits`,
    {},
    {},
  );

  const [messageVisble, openMessage, closeMessage] = useBoolState();
  const [errorMessageVisble, openErrorMessage, closeErrorMessage] =
    useBoolState();
  const { isConnected } = useSelector((state) => state.net);
  const [errorMessage, setErrorMessage] = useState();
  const [offlineVisit, setOfflineVisit] = useState({});

  useEffect(
    () =>
      navigation.addListener("focus", () => {
        refreshBabyVisits();
        loadOfflineVisit();
      }),
    [navigation],
  );

  useEffect(() => {
    if (!route.params.success) return;
    onSubmitSuccess();
  }, [route.params.success]);

  function onSubmitSuccess() {
    onRefresh();
    openMessage();
  }

  function onRefresh() {
    if (isConnected) {
      refreshBaby();
      refreshCarers();
      refreshCreateVistErrors();
    }
  }

  async function loadOfflineVisit() {
    if (params?.id) {
      const visits = (await storage.getOfflineVisits()) || [];
      const data = visits.find((n) => n.babyId === params?.id);
      setOfflineVisit(data);
    }
  }

  function handleCreateVisit() {
    if (isConnected) {
      if (offlineVisit?.babyId) {
        setErrorMessage(t("offlineVisitExists"));
        openErrorMessage();
        return false;
      }
      http
        .silenceGet(`/api/babies/${baby.id}/lesson`)
        .then((_) =>
          navigation.navigate("CreateVisit", {
            lockBaby: true,
            baby: {
              ...baby,
              months: baby.months,
              carerName: carers[0]?.name,
              carerPhone: carers[0]?.phone,
            },
            prevParams: params,
          }),
        )
        .catch((error) => {
          setErrorMessage(error.detail);
          openErrorMessage();
        });
    } else {
      if (offlineVisit?.babyId) {
        setErrorMessage(t("offlineVisitExists"));
        openErrorMessage();
        return false;
      } else {
        storage.getNextShouldVisit(baby.id).then((nextVisit) => {
          if (nextVisit) {
            navigation.navigate("CreateVisit", {
              lockBaby: true,
              baby: {
                ...baby,
                nextShouldVisitDTO: nextVisit,
                months: baby.months,
                carerName: carers[0]?.name,
                carerPhone: carers[0]?.phone,
              },
              prevParams: params,
            });
          } else {
            setErrorMessage(t("noMatchingClass"));
            openErrorMessage();
          }
        });
      }
    }
  }

  function deleteError(id) {
    if (id) {
      http.delete(`/api/log/${id}`).then(refreshCreateVistErrors);
    }
  }

  return (
    <>
      <Header {...Colors.linearGradient}>
        <Message
          visible={messageVisble}
          buttonText={t("understood")}
          onButtonPress={closeMessage}
          title={t("submitSuccess")}
          content={t("submitSuccessMessage")}
        />
        <Message
          error
          visible={errorMessageVisble}
          buttonText={t("understood")}
          onButtonPress={closeErrorMessage}
          title={t("cannotCreateVisit")}
          content={errorMessage}
        />
        <GhostNavigatorHeader
          navigation={navigation}
          title={t("babyDetails")}
        />
        <BackgroundImage
          source={require("../assets/images/baby-header-bg.png")}
        />
        <BabyContainer>
          <View>
            <IdentityContainer>
              <ApproveStatus
                approved={
                  baby.approved == null ? params.approved : baby.approved
                }
              />
              <Identity>
                {t("id")}:{" "}
                {baby.identity || params.identity || t("notAvailable")}
              </Identity>
            </IdentityContainer>
            <Name>{baby.name || params.name}</Name>
          </View>
          <InfoContainer>
            <View>
              <Stage>
                <MaterialCommunityIcons
                  name={GenderIcon[baby.gender || params.gender]}
                  size={px2dp(12)}
                  color="#fff"
                />
                <Age>
                  {params.pastEdc
                    ? t("babyDueDateArrived")
                    : t("babyAge", {
                        stage: BabyStage[baby.stage || params.stage],
                        days: baby.days || params.days,
                      })}
                </Age>
              </Stage>
              {baby.feedingPattern && (
                <FeedingPatternContainer>
                  <FeedingPatternLabel>
                    {t("feedingStatus")}：
                  </FeedingPatternLabel>
                  <FeedingPatternValue>
                    {FeedingPattern[baby.feedingPattern]}
                  </FeedingPatternValue>
                </FeedingPatternContainer>
              )}
            </View>
            {baby.identity && (
              <Button
                ghost
                title={t("editInfo")}
                disabled={!isConnected}
                onPress={() =>
                  navigation.navigate("EditBaby", {
                    from: "Baby",
                    baby,
                    id: params.id,
                    prevParams: params,
                  })
                }
              />
            )}
          </InfoContainer>
        </BabyContainer>
      </Header>

      <TabView
        onIndexChange={setIndex}
        navigationState={{
          index,
          routes: [
            { key: "Visits", title: t("visitRecords") },
            { key: "Family", title: t("familyInfo") },
          ],
        }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "#FF794F" }}
            style={{ backgroundColor: "#fff" }}
            renderLabel={({ route, focused }) => (
              <TabBarLabelContainer>
                <TabBarLabel focused={focused}>{route.title}</TabBarLabel>
                {route.key === "Visits" && babyVisits.numberOfNoRemark > 0 && (
                  <NumberOfNoRemark>
                    {babyVisits.numberOfNoRemark}
                  </NumberOfNoRemark>
                )}
              </TabBarLabelContainer>
            )}
          />
        )}
        renderScene={SceneMap({
          Visits: () => (
            <Visits
              connect={isConnected}
              onCreateVisit={handleCreateVisit}
              createVistErrors={createVistErrors || []}
              deleteError={deleteError}
              onChange={setStarted}
              notStartedVisits={babyVisits.notStarted}
              startedVisits={babyVisits.started}
              offlineVisit={offlineVisit}
              numberOfNoRemark={babyVisits.numberOfNoRemark}
              started={started}
              navigation={navigation}
              approved={baby.approved}
              canCreate={baby.canCreate}
            />
          ),
          Family: () => (
            <Family
              baby={baby}
              carers={carers}
              connect={isConnected}
              navigation={navigation}
              onRefresh={onRefresh}
              params={params}
            />
          ),
        })}
      />
    </>
  );
}

const TabBarLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TabBarLabel = styled.Text`
  font-size: 12px;
  color: #ff794f;
  font-weight: ${({ focused }) => (focused ? "bold" : "normal")};
`;

const IdentityContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  opacity: 0.6;
`;

const FeedingPatternContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

const FeedingPatternLabel = styled.Text`
  color: #fff;
  font-size: 10px;
`;

const FeedingPatternValue = styled.Text`
  background: #ffede2;
  border-radius: 2px;
  color: #ff794f;
  padding: 2px 4px;
  font-size: 8px;
`;

const Stage = styled.View`
  flex-direction: row;
  align-items: center;
`;

function Visits({
  started,
  connect,
  startedVisits,
  offlineVisit,
  createVistErrors,
  deleteError,
  notStartedVisits,
  numberOfNoRemark,
  onChange,
  navigation,
  onCreateVisit,
  approved,
  canCreate,
}) {
  const { t } = useTranslation("Baby");

  function handlePressVisit(item) {
    if (!approved && item.status === "NOT_STARTED") {
      ToastAndroid.show(t("waitForApproval"), ToastAndroid.SHORT);
      return;
    }
    navigation.navigate("Visit", { id: item.id });
  }

  function redDot(item) {
    return (
      (item.status === "EXPIRED" || item.status === "UNDONE") &&
      item.remark == null
    );
  }

  return (
    <VisitsContainer>
      {!connect && (
        <PromptWords>
          <AntDesign name="infocirlceo" size={px2dp(8)} color="#ACA9A9" />
          {t("offlineMode")}
        </PromptWords>
      )}
      <VisitTabs>
        <TouchableOpacity onPress={() => onChange(false)} activeOpacity={0.8}>
          <VisitTab active={!started}>{t("plannedVisits")}</VisitTab>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChange(true)} activeOpacity={0.8}>
          <TitleContainer>
            <VisitTab active={started}>
              {t("completedIncompleteExpiredVisits")}
            </VisitTab>
            {numberOfNoRemark > 0 && (
              <NumberOfNoRemark active={started}>
                {numberOfNoRemark}
              </NumberOfNoRemark>
            )}
          </TitleContainer>
        </TouchableOpacity>
      </VisitTabs>
      {createVistErrors &&
        createVistErrors.map((n, i) => (
          <ErrorText onPress={() => deleteError(n?.id)} key={i}>
            {" "}
            Ⓧ {n.msg}
          </ErrorText>
        ))}
      {!started && offlineVisit?.babyId && (
        <VisitItem
          onPress={() => {}}
          value={offlineVisit}
          redDot={redDot(offlineVisit)}
        />
      )}
      <FlatList
        ListEmptyComponent={
          offlineVisit?.babyId ? null : <NoData title={t("noResults")} />
        }
        data={started ? startedVisits : notStartedVisits}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => (
          <VisitItem
            onPress={() => handlePressVisit(item)}
            value={item}
            redDot={redDot(item)}
          />
        )}
      />
      <FixedButtonContainer>
        <Button
          size="large"
          disabled={!canCreate}
          title={t("newVisit")}
          onPress={onCreateVisit}
        />
      </FixedButtonContainer>
    </VisitsContainer>
  );
}

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 16px;
`;

const NumberOfNoRemark = styled.Text`
  font-size: 8px;
  color: #565656;
  padding: 0 3px;
  height: 12px;
  line-height: 12px;
  border-radius: 5px;
  background: #d8d8d8;
  margin-left: 4px;
  font-weight: bold;
  ${({ active }) =>
    active &&
    `
    margin-bottom: 2px;
  `}
`;

function Family({ baby, carers, connect, navigation, onRefresh, params }) {
  const { t } = useTranslation("Baby");
  const [remark, setRemark] = useState(baby.remark);
  const [closeAccountReason, setCloseAccountReason] = useState();
  const [deleteId, setDeleteId] = useState();

  const [remarkVisible, openRemark, closeRemark] = useBoolState();
  const [deleteVisible, openDelete, closeDelete] = useBoolState();
  const [closeAccountVisible, openCloseAccount, closeCloseAccount] =
    useBoolState();
  const { familyTies } = useMethods();
  const dispatch = useDispatch();

  function handleChangeMaster(carer) {
    http
      .put(`/api/babies/${baby.id}/carers/${carer.id}`, {
        ...carer,
        master: true,
      })
      .then(onRefresh);
  }

  function handleDelete() {
    http.delete(`/api/babies/${baby.id}/carers/${deleteId}`).then(onRefresh);
  }

  function handleChangeRemark() {
    confirm(t("confirmEditInfo"), {
      onOk: () => {
        return http
          .put(`/api/babies/${baby.id}/remark`, { remark })
          .then(() => {
            onRefresh();
            closeRemark();
          });
      },
      dispatch,
    });
  }

  function handleCloseAccount() {
    http
      .put(`/api/babies/${baby.id}/close`, { reason: closeAccountReason })
      .then(() => {
        onRefresh();
        closeCloseAccount();
      });
  }

  return (
    <CardContainer contentContainerStyle={{ paddingVertical: 20 }}>
      <Card
        title={t("remarks")}
        hideBody={!baby.remark}
        right={
          <Button
            disabled={!connect || !baby.id}
            title={baby.remark ? t("edit") : t("add")}
            onPress={openRemark}
          />
        }
      >
        <StaticField>{baby.remark}</StaticField>
      </Card>

      <Card
        title={t("addressInfo")}
        right={
          <Button
            title={t("edit")}
            disabled={!connect || !baby.id}
            onPress={() =>
              navigation.navigate("EditAddress", {
                id: baby.id,
                from: "Baby",
                address: { area: baby.area, location: baby.location },
                prevParams: params,
              })
            }
          />
        }
      >
        <StaticField label={t("area")}>{baby.area}</StaticField>
        <StaticField label={t("detailedAddress")}>{baby.location}</StaticField>
      </Card>

      <Card
        title={t("caregiverInfo")}
        noPadding
        right={
          <Button
            title={t("add")}
            disabled={!connect || !baby.id || carers.length > 3}
            onPress={() =>
              navigation.navigate("CreateCarer", {
                from: "Baby",
                babyId: baby.id,
                filterFamilyTies: familyTies(carers),
                prevParams: params,
              })
            }
          />
        }
      >
        <CarersContainer>
          {carers.map((carer, index) => (
            <CarerItem
              key={carer.id}
              value={carer}
              number={index + 1}
              disabled={!connect || !baby.id}
              noBorder={index === carers.length - 1}
              onChangeMaster={() => handleChangeMaster(carer)}
              onPressDelete={() => {
                if (carer.master) {
                  ToastAndroid.show(
                    t("setPrimaryCarerFirst"),
                    ToastAndroid.LONG,
                  );
                  return;
                }
                setDeleteId(carer.id);
                openDelete();
              }}
              onPressModify={() =>
                navigation.navigate("EditCarer", {
                  babyId: baby.id,
                  carer,
                  carerIndex: index,
                  from: "Baby",
                  filterFamilyTies: familyTies(carers, carer.familyTies),
                  prevParams: params,
                })
              }
            />
          ))}
        </CarersContainer>
      </Card>

      {baby.actionFromApp !== "DELETE" && (
        <LargeButtonContainer>
          <Button
            type="weaken"
            title={t("deactivateBaby")}
            disabled={!connect || !baby.id}
            onPress={openCloseAccount}
          />
        </LargeButtonContainer>
      )}

      <Modal
        title={t("deactivateBabyConfirm")}
        visible={closeAccountVisible}
        content={
          <Input
            value={closeAccountReason}
            onChangeText={setCloseAccountReason}
            border
            placeholder={t("enterDeactivationReason")}
          />
        }
        onCancel={closeCloseAccount}
        onOk={handleCloseAccount}
        okText={t("deactivate")}
        disableOk={!closeAccountReason}
      />
      <Modal
        title={t("addRemarks")}
        visible={remarkVisible}
        content={
          <Input
            value={remark}
            onChangeText={setRemark}
            border
            placeholder={t("enterBabyRemarks")}
          />
        }
        onCancel={closeRemark}
        onOk={handleChangeRemark}
      />
      <Modal
        title={t("deleteCaregiver")}
        visible={deleteVisible}
        contentText={t("confirmDeleteCaregiver")}
        okText={t("delete")}
        cancelText={t("cancel")}
        onCancel={closeDelete}
        onOk={handleDelete}
      />
    </CardContainer>
  );
}

const CarersContainer = styled.View`
  padding: 0 24px;
`;

const FixedButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 400px;
  display: flex;
  padding-top: 10px;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.49);
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  height: 134px;
  width: 140px;
  right: 0;
  bottom: 0;
`;

const InfoContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const BabyContainer = styled.View`
  padding: 0 28px;
`;

const WhiteText = styled.Text`
  color: #fff;
`;

const Name = styled(WhiteText)`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;

const Identity = styled(WhiteText)`
  margin-top: 4px;
  font-size: 10px;
`;

const Age = styled(WhiteText)`
  margin-left: 4px;
  font-size: 10px;
`;

const Header = styled(LinearGradient)`
  min-height: 160px;
  width: 100%;
  padding-bottom: 20px;
`;

const VisitsContainer = styled.View`
  padding: 20px 28px;
  padding-bottom: 45px;
  position: relative;
  flex: 1;
`;

const VisitTabs = styled.View`
  padding-bottom: 24px;
  flex-direction: row;
`;

const VisitTab = styled.Text`
  font-size: 12px;
  color: #525252;
  ${({ active }) =>
    active &&
    `
    font-weight: bold;
    border-bottom-width: 2px;
    border-color: #FFC3A0;
  `}
`;

const CardContainer = styled(ScrollView)`
  padding: 0 28px;
  padding-bottom: 60px;
`;

const PromptWords = styled.Text`
  font-size: 10px;
  color: #8e8e93;
  margin-bottom: 2px;
`;

const ErrorText = styled.Text`
  padding: 1px 4px;
  font-size: 8px;
  font-weight: 400;
  color: #ff2f2f;
  border-radius: 2px;
  margin-bottom: 5px;
`;
