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

export default function VisitScreen({ navigation, route }) {
  const { params } = route;
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
      ToastAndroid.show("请先到首页更新课程资源", ToastAndroid.LONG);
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

  return (
    <ScrollView>
      <Container>
        {!Visit.statusDone(status) && (
          <Card
            title={Visit.remarkTitle(status)}
            right={<Button title="编辑" onPress={openRemark} />}
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
          title="请填写备注"
          visible={remarkVisible}
          content={
            <Input
              value={remark}
              onChangeText={setRemark}
              border
              placeholder="请输入"
            />
          }
          onCancel={closeRemark}
          onOk={handleChangeRemark}
          disableOk={!remark}
        />

        <Card
          title="家访时间"
          right={
            Visit.statusNotStart(status) && (
              <Button title="修改" onPress={handleChangeVisitTime} />
            )
          }
        >
          <StaticForm>
            {(Visit.statusNotStart(status) || Visit.statusExpired(status)) &&
              visitTime && (
                <StaticField label="家访时间">
                  {Visit.formatDateTimeCN(visitTime)}
                </StaticField>
              )}
            {Visit.statusUndone(status) && visitTime && (
              <StaticField label="开始时间">
                {Visit.formatDateTimeCN(visit.startTime)}
              </StaticField>
            )}
            {Visit.statusDone(status) && visitTime && (
              <>
                <StaticField label="开始时间">
                  {Visit.formatDateTimeCN(visit.startTime)}
                </StaticField>
                <StaticField label="结束时间">
                  {Visit.formatDateTimeCN(visit.completeTime)}
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
