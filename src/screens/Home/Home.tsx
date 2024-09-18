import { lessonsUpdate } from "@/actions";
import Resources from "@/cache/resources";
import Storage from "@/cache/storage";
import {
  BabyCard,
  BottomRightBackground,
  Button,
  LessonCard,
  Message,
  StartLesson,
} from "@/components";
import { Colors } from "@/constants";

import { Visit } from "@/models";
import { RootStackParamList } from "@/navigation/RootStackParamList";
import { RootState } from "@/store";
import { useBoolState } from "@/utils";

import Http from "@/utils/http";
import { styled } from "@/utils/styled";
import VisitUtils from "@/utils/visit";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, ToastAndroid } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import type { NativeStackScreenProps } from "react-native-screens/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { OtherBabyCard } from "./OtherBabyCard";
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home: React.FC<Props> = ({ navigation }) => {
  const [visit, reloadVisit] = Storage.useNextVisit() as [Visit, () => void];
  const { visitTime, baby, lesson, status } = visit;

  const [refreshing, startRefresh, endRefresh] = useBoolState();
  const [fetching, startFetch, endFetch] = useBoolState();
  const [
    submitErrorMessageVisible,
    openSubmitErrorMessage,
    closeSubmitErrorMessage,
  ] = useBoolState(false);
  const [reloadOtherVisit, setReloadOtherVisit] = useState({});

  const dispatch = useDispatch();
  // lesson resources update state
  const update = useSelector((state: typeof RootState) => state.lessonsUpdate);

  // refresh silent mode when focus navigation
  useEffect(
    () => navigation.addListener("focus", () => refresh(true)),
    [navigation],
  );

  // silent mode prevents flickering when loading too fast
  async function refresh(silent = false) {
    !silent && startRefresh();
    try {
      dispatch(lessonsUpdate(await Resources.checkForUpdateAsync()));
    } catch {}
    try {
      await submit();
    } catch {}
    try {
      Storage.setNextVisit(await Http.get("/api/visits/next")).then(() =>
        setReloadOtherVisit({}),
      );
    } catch {
      Storage.setNextVisit({});
      // never going to get 404
      // if (e.status === 404) {}
    }
    reloadVisit();
    !silent && endRefresh();
  }

  // submit home visit data starting with offline mode
  async function submit() {
    const uncommitted = await Storage.getUncommittedVisitStatus();
    const nextModuleIndex = await Storage.getNextModule();
    const id = Object.keys(uncommitted || {})[0];
    if (id) {
      const answersData = await Storage.getAnswers(id);
      return Http.silencePut(`/api/visits/${id}/status`, {
        visitStatus: uncommitted[id].status,
        startTime: uncommitted[id].startTime,
        nextModuleIndex,
        questionnaireRecords: answersData?.answers,
      })
        .then((_) => {
          Storage.setNextVisit({});
          Storage.committedVisitStatus();
          Storage.setAnswers(id, {});
          Storage.setNextModule(0);
        })
        .catch((_) => openSubmitErrorMessage());
    }
  }

  const { t, i18n } = useTranslation(["Home", "Visits", "App"]);

  const isZH = i18n.language === "zh";

  async function handleFetchUpdate() {
    startFetch();
    try {
      await Resources.fetchUpdateAsync();
      dispatch(lessonsUpdate({ isAvailable: false }));
      ToastAndroid.show(t("downloadSuccess"), ToastAndroid.SHORT);
    } catch (e) {
      ToastAndroid.show(t("downloadError"), ToastAndroid.SHORT);
    } finally {
      endFetch();
    }
  }

  async function cancelVisit(deleteReason: string) {
    await Http.delete(`/api/visits/${visit.id}?deleteReason=${deleteReason}`);
    setTimeout(() => {
      refresh(true);
    }, 1);
  }

  return (
    <StyledScrollView
      refreshControl={
        <RefreshControl
          colors={Colors.colors}
          refreshing={refreshing}
          onRefresh={refresh}
        />
      }
    >
      <Spinner
        visible={fetching}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />

      <Message
        info
        visible={submitErrorMessageVisible}
        title={t("waitForSync")}
        content={t("waitForMessage")}
        buttonText={t("App:understood")}
        onButtonPress={closeSubmitErrorMessage}
      />

      <Header {...Colors.linearGradient}>
        <BottomRightBackground
          width={140}
          height={134}
          source={require("@/assets/images/curriculum-bg.png")}
        />

        <Title testId="visit-title">
          {visit.id
            ? `${t("nextVisitDate")} \n${isZH ? VisitUtils.formatDateTimeCN(visitTime) : VisitUtils.formatDateTimeEN(visitTime)}`
            : t("noVisitMessage")}
        </Title>

        {update.isAvailable && (
          <SyncButton>
            <Button
              ghost
              size="small"
              onPress={handleFetchUpdate}
              title={update.firstTime ? t("download") : t("update")}
            />
          </SyncButton>
        )}
      </Header>

      {visit.id ? (
        <CardContainer>
          <BabyCard baby={baby} />
          <LessonCard
            disabled={update.isAvailable}
            lesson={lesson}
            status={status}
            navigation={navigation}
          />
        </CardContainer>
      ) : (
        <NoDataContainer>
          <Button
            title={t("Visits:scheduleVisit")}
            disabled={update.isAvailable}
            size="large"
            onPress={() =>
              navigation.navigate("CreateVisit", {
                visitTime: VisitUtils.defaultVisitTime(new Date()),
              })
            }
          />
        </NoDataContainer>
      )}

      <StartLesson
        disabled={update.isAvailable}
        status={status}
        visitTime={visitTime}
        navigation={navigation}
        visitId={visit.id}
        lessonId={visit?.lesson?.id}
        from="Home"
        cancelVisit={cancelVisit}
      />
      {visit.id ? (
        <OtherBabyCard excludeVisitId={visit.id} reload={reloadOtherVisit} />
      ) : null}
    </StyledScrollView>
  );
};

const SyncButton = styled.View`
  position: absolute;
  right: 20px;
  top: 30px;
`;

const Header = styled(LinearGradient)`
  position: relative;
  width: 100%;
  height: 160px;
  padding-top: 50px;
  padding-left: 28px;
`;

const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`;

const NoDataContainer = styled.View`
  height: 100px;
  justify-content: center;
`;

const StyledScrollView = styled(ScrollView)`
  flex: 1;
`;

const CardContainer = styled.View`
  margin: -34px 28px 0;
`;

export default Home;
