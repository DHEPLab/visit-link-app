import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";

import http from "../utils/http";
import Visit from "../utils/visit";
import { styled } from "../utils/styled";
import {
  MiniBaby,
  Card,
  Button,
  StaticField,
  StaticForm,
  LargeButtonContainer,
} from "../components";
import storage from "../cache/storage";
import { useTranslation } from "react-i18next";

export default function CreateVisit({ navigation, route }) {
  const { params } = route;
  const [visitTime, setVisitTime] = useState();
  const [baby, setBaby] = useState();
  const [lesson, setLesson] = useState();
  const [dateRange, setDateRange] = useState([]);
  const { isConnected } = useSelector((state) => state.net);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (params?.baby) {
      const { baby } = params;
      if (!isConnected) {
        setLesson(baby?.nextShouldVisitDTO?.lesson || null);
      } else {
        http.get(`/api/babies/${baby.id}/lesson`).then(setLesson);
      }
      setBaby(baby);
    }
  }, [params?.baby]);

  useEffect(() => {
    if (params?.visitTime) {
      setVisitTime(params?.visitTime);
    }
  }, [params?.visitTime]);

  useEffect(() => {
    renderDateRange();
  }, [baby]);

  function handleSubmit() {
    http
      .post("/api/visits", {
        visitTime: Visit.formatDateTimeUTC(visitTime),
        babyId: baby.id,
        lessonId: lesson.id,
      })
      .then(navigation.goBack);
  }

  async function handleSaveOfflineBooking() {
    const visit = {
      visitTime: Visit.formatDateTime(visitTime),
      babyId: baby.id,
      lessonId: lesson.id,
      status: "NOT_SUBMIT",
      lessonName: lesson.name,
    };
    const oldVisits = await storage.getOfflineVisits();
    storage
      .setOfflineVisits([...(oldVisits || []), visit])
      .then(navigation.goBack);
  }

  async function renderDateRange() {
    let range = [Visit.defaultStartingRange()];
    if (baby?.id) {
      if (isConnected) {
        range = await http.get(`/api/babies/${baby.id}/visit-date-range`);
      } else {
        const { visitDateRange } = await storage.getNextShouldVisit(baby.id);
        if (visitDateRange) {
          range = visitDateRange;
        }
      }
    }
    setDateRange(range);
    return range;
  }

  async function handleChangeVisitTime() {
    const range = await renderDateRange();
    navigation.navigate("PickVisitTime", {
      visitTime: Visit.formatDateTime(visitTime),
      range,
      prevParams: params,
    });
  }

  return (
    <ScrollView>
      <Container>
        <Card
          title={t("Visits:visitTime")}
          hideBody={!visitTime}
          right={
            <Button
              title={t("Visits:vistEdit")}
              onPress={handleChangeVisitTime}
              hideBody={!visitTime}
            />
          }
        >
          {visitTime && (
            <StaticForm>
              <StaticField label={t("Visits:visitTime")}>
                {i18n.language === "zh"
                  ? Visit.formatDateTimeCN(visitTime)
                  : Visit.formatDateTimeEN(visitTime)}
              </StaticField>
            </StaticForm>
          )}
        </Card>
        {baby && (
          <PromptWords>
            {t("Visits:lessonScheduleTip1", {
              lessonName: lesson?.name || "--",
              date: dateRange[0],
            })}
          </PromptWords>
        )}
        {baby && (
          <PromptWords>
            {t("Visits:lessonScheduleTip2", { date: dateRange[1] })}
          </PromptWords>
        )}
        <Card
          title={t("Visits:visitInfo")}
          hideBody={!baby}
          right={
            !params?.lockBaby && (
              <Button
                title={t("Visits:vistSelect")}
                onPress={() =>
                  navigation.navigate("PickBaby", {
                    visitDate: visitTime && Visit.formatDate(visitTime),
                    prevParams: params,
                  })
                }
              />
            )
          }
          background={require("../assets/images/baby-bg.png")}
        >
          {baby && (
            <>
              <MiniBabyContainer>
                <MiniBaby hideStatus baby={baby} />
              </MiniBabyContainer>
              <StaticForm>
                <StaticField label={t("Visits:carerName")}>
                  {baby.carerName}
                </StaticField>
                <StaticField label={t("Visits:carerPhone")}>
                  {baby.carerPhone}
                </StaticField>
                <StaticField label={t("Visits:area")}>{baby.area}</StaticField>
                <StaticField label={t("Visits:location")}>
                  {baby.location}
                </StaticField>
              </StaticForm>
            </>
          )}
        </Card>
        <Card title={t("Visits:sessionIncluded")}>
          {lesson ? (
            <>
              <LessonName>{lesson.name}</LessonName>
              <StaticForm>
                {lesson.moduleNames?.map((name, index) => (
                  <StaticField
                    key={name}
                    label={`${t("Visits:module")} ${index + 1}`}
                  >
                    {name}
                  </StaticField>
                ))}
              </StaticForm>
            </>
          ) : (
            <NoLesson>{t("Visits:noLessonTip")}</NoLesson>
          )}
        </Card>

        {isConnected && (
          <LargeButtonContainer>
            <Button
              onPress={handleSubmit}
              title={t("Common:submit")}
              size="large"
              disabled={!visitTime || !baby || !lesson}
            />
          </LargeButtonContainer>
        )}
        {!isConnected && (
          <OfflineBookingLine>
            <Button
              onPress={handleSaveOfflineBooking}
              title={t("Visits:offlineBooking")}
              size="large"
              ghost
              type="primary"
              disabled={!visitTime || !baby || !lesson}
            />
          </OfflineBookingLine>
        )}
      </Container>
    </ScrollView>
  );
}

const NoLesson = styled.Text`
  font-size: 10px;
  color: #8e8e93;
`;

const OfflineBookingLine = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const Container = styled.View`
  padding: 20px 28px;
  padding-bottom: 0;
  height: 100%;
`;

const MiniBabyContainer = styled.View`
  padding-bottom: 8px;
`;

const LessonName = styled.Text`
  color: #525252;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const PromptWords = styled.Text`
  font-size: 10px;
  color: #8e8e93;
  margin-bottom: 5px;
`;
