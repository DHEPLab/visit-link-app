import React, { useEffect, useState } from "react";
import { ScrollView, ToastAndroid } from "react-native";
import { useSelector } from "react-redux";

import http from "../utils/http";
import Visit from "../utils/visit";

import { styled } from "../utils/styled";
import { useManualFetch, useBoolState } from "../utils";
import {
  Card,
  Button,
  StaticField,
  StaticForm,
  Modal,
  Input,
  LessonCard,
  BabyCard,
  StartLesson,
} from "../components";
import { useTranslation } from "react-i18next";

export default function VisitScreen({ navigation, route }) {
  const { params } = route;
  const { t, i18n } = useTranslation();
  const [visit, refresh] = useManualFetch(`/api/visits/${params.id}`);
  const { visitTime, status, baby, lesson } = visit;

  const [remark, setRemark] = useState(visit.remark);

  const [remarkVisible, openRemark, closeRemark] = useBoolState();
  const update = useSelector((state) => state.lessonsUpdate);

  useEffect(
    () => navigation.addListener("focus", () => refresh()),
    [navigation],
  );

  useEffect(() => {
    if (!route.params.visitTime) return;
    http
      .put(`/api/visits/${params.id}`, { visitTime: params.visitTime })
      .then(() => refresh());
  }, [route.params?.visitTime]);

  function handleChangeVisitTime() {
    http.get(`/api/visits/${params.id}/date-range`).then((range) => {
      navigation.navigate("PickVisitTime", { visitTime, from: "Visit", range });
    });
  }

  function handleChangeRemark() {
    http.put(`/api/visits/${params.id}/remark`, { remark }).then(() => {
      closeRemark();
      refresh();
    });
  }

  function validate() {
    if (update.isAvailable) {
      ToastAndroid.show(t("Visits:unavailableMessage"), ToastAndroid.LONG);
      return false;
    }
    return true;
  }

  async function cancelVisit(deleteReason) {
    await http.delete(`/api/visits/${visit.id}?deleteReason=${deleteReason}`);
    setTimeout(() => {
      navigation.navigate("Baby");
    }, 1);
  }

  const formatDateTime = (time) => {
    if (i18n.language === "zh") {
      return Visit.formatDateTimeCN(time);
    }
    return Visit.formatDateTimeEN(time);
  };

  return (
    <ScrollView>
      <Container>
        {!Visit.statusDone(status) && (
          <Card
            title={Visit.remarkTitle(status)}
            right={<Button title={t("Common:edit")} onPress={openRemark} />}
            hideBody={!visit.remark}
          >
            <StaticForm>
              <StaticField label={Visit.remarkTitle(status)}>
                {visit.remark}
              </StaticField>
            </StaticForm>
          </Card>
        )}
        <Modal
          title={Visit.remarkModalTitle(status)}
          visible={remarkVisible}
          content={
            <Input
              value={remark}
              onChangeText={setRemark}
              border
              placeholder={t("Form:pleaseInput")}
            />
          }
          onCancel={closeRemark}
          onOk={handleChangeRemark}
          disableOk={!remark}
        />

        <Card
          title={t("Visits:visitTime")}
          right={
            Visit.statusNotStart(status) && (
              <Button
                title={t("Visits:edit")}
                onPress={handleChangeVisitTime}
              />
            )
          }
        >
          <StaticForm>
            {(Visit.statusNotStart(status) || Visit.statusExpired(status)) &&
              visitTime && (
                <StaticField label={t("Visits:visitTime")}>
                  {formatDateTime(visitTime)}
                </StaticField>
              )}
            {Visit.statusUndone(status) && visitTime && (
              <StaticField label={t("Visits:startTime")}>
                {formatDateTime(visit.startTime)}
              </StaticField>
            )}
            {Visit.statusDone(status) && visitTime && (
              <>
                <StaticField label={t("Visits:startTime")}>
                  {formatDateTime(visit.startTime)}
                </StaticField>
                <StaticField label={t("Visits:endTime")}>
                  {formatDateTime(visit.completeTime)}
                </StaticField>
              </>
            )}
          </StaticForm>
        </Card>

        <BabyCard baby={baby} />
        <LessonCard
          {...{
            lesson,
            status,
            navigation,
            validate,
          }}
        />

        <StartLesson
          {...{
            status,
            visitTime,
            navigation,
            visitId: visit.id,
            lessonId: visit?.lesson?.id,
            nextModuleIndex: visit?.nextModuleIndex,
            from: "Visit",
            validate,
          }}
          cancelVisit={cancelVisit}
        />
      </Container>
    </ScrollView>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;
