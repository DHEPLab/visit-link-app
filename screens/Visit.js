import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import http from '../utils/http';
import Visit from '../utils/visit';

import { styled } from '../utils/styled';
import { useFetch, useBoolState } from '../utils';
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
} from '../components';

export default function VisitScreen({ navigation, route }) {
  const { params } = route;
  const [visit, refresh] = useFetch(`/api/visits/${params.id}`);
  const { visitTime, status, baby, lesson } = visit;

  const [remark, setRemark] = useState(visit.remark);

  const [remarkVisible, openRemark, closeRemark] = useBoolState();

  useEffect(() => {
    if (!route.params.visitTime) return;
    http.put(`/api/visits/${params.id}`, { visitTime: params.visitTime }).then(() => refresh());
  }, [route.params?.visitTime]);

  function handleChangeVisitTime() {
    http.get(`/api/visits/${params.id}/date-range`).then((range) => {
      navigation.navigate('PickVisitTime', { visitTime, from: 'Visit', range });
    });
  }

  function handleChangeRemark() {
    http.put(`/api/visits/${params.id}/remark`, { remark }).then(() => {
      closeRemark();
      refresh();
    });
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
              <StaticField label={Visit.remarkTitle(status)}>{visit.remark}</StaticField>
            </StaticForm>
          </Card>
        )}
        <Modal
          title="请填写备注"
          visible={remarkVisible}
          content={<Input value={remark} onChangeText={setRemark} border placeholder="请输入" />}
          onCancel={closeRemark}
          onOk={handleChangeRemark}
          disableOk={!remark}
        />

        <Card
          title="家访时间"
          right={
            Visit.statusNotStart(status) && <Button title="修改" onPress={handleChangeVisitTime} />
          }
        >
          {visitTime && (
            <StaticForm>
              <StaticField label="家访时间">{Visit.formatDateTimeCN(visitTime)}</StaticField>
            </StaticForm>
          )}
        </Card>

        <BabyCard baby={baby} />
        <LessonCard lesson={lesson} status={status} navigation={navigation} />

        <StartLesson
          {...{ status, visitTime, navigation, visitId: visit.id, lessonId: visit?.lesson?.id }}
        />
      </Container>
    </ScrollView>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;
