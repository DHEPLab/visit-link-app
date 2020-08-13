import React, { useEffect, useState } from 'react';
import { ScrollView, ToastAndroid } from 'react-native';

import http from '../utils/http';
import Visit from '../utils/visit';

import { styled } from '../utils/styled';
import { useFetch, useBoolState } from '../utils';
import {
  MiniBaby,
  Card,
  Button,
  StaticField,
  StaticForm,
  LargeButtonContainer,
  Modal,
  Input,
  LessonCard,
} from '../components';

export default function VisitScreen({ navigation, route }) {
  const { params } = route;
  const [visit, refresh] = useFetch(`/api/visits/${params.id}`);
  const { visitTime, status, baby, lesson } = visit;

  const [remark, setRemark] = useState(visit.remark);

  const [remarkVisible, openRemark, closeRemark] = useBoolState();
  const [startVisitVisible, openStartVisit, closeStartVisit] = useBoolState();

  useEffect(() => {
    if (route.params.visitTime) {
      http.put(`/api/visits/${params.id}`, { visitTime: params.visitTime }).then(() => refresh());
    }
  }, [route.params?.visitTime]);

  function handleContinue() {
    navigation.navigate('LessonIntro', { id: lesson.id });
  }

  function handleStart() {}

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
        <Modal
          title="您确定要立即开始本次家访吗？"
          visible={startVisitVisible}
          contentText={`本次拜访日程为：${Visit.formatDateTimeCN(visitTime)}`}
          okText="开始"
          cancelText="放弃"
          onCancel={closeStartVisit}
          onOk={handleStart}
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

        <Card title="家访对象" background={require('../assets/images/baby-bg.png')}>
          {baby && (
            <>
              <MiniBabyContainer>
                <MiniBaby hideStatus baby={baby} />
              </MiniBabyContainer>
              <StaticForm>
                <StaticField label="主照料人">{baby.carerName}</StaticField>
                <StaticField label="联系电话">{baby.carerPhone}</StaticField>
                <StaticField label="所在区域">{baby.area}</StaticField>
                <StaticField label="详细地址">{baby.location}</StaticField>
              </StaticForm>
            </>
          )}
        </Card>

        <LessonCard lesson={lesson} status={status} navigation={navigation} />

        {Visit.statusNotStart(status) && (
          <LargeButtonContainer>
            <Button
              size="large"
              title="开始课堂"
              onPress={() => {
                if (!Visit.canBegin(status, visitTime)) {
                  ToastAndroid.show('时间未到，无法开始', ToastAndroid.SHORT);
                  return;
                }
                openStartVisit();
              }}
            />
          </LargeButtonContainer>
        )}

        {Visit.statusUndone(status) && (
          <LargeButtonContainer>
            <Button size="large" title="继续课堂" onPress={handleContinue} />
          </LargeButtonContainer>
        )}
      </Container>
    </ScrollView>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;

const MiniBabyContainer = styled.View`
  padding-bottom: 8px;
`;
