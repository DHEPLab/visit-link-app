import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';

import { styled } from '../utils/styled';
import VisitUtils from '../utils/visit';
import { useFetch } from '../utils';
import {
  MiniBaby,
  Card,
  Button,
  StaticField,
  StaticForm,
  LargeButtonContainer,
} from '../components';
import http from '../utils/http';

export default function Visit({ navigation, route }) {
  const { params } = route;
  const [visit, refresh] = useFetch(`/api/visits/${params.id}`);
  const { visitTime, status, baby, lesson } = visit;

  const notStarted = status === 'NOT_STARTED';
  const undone = status === 'UNDONE';
  const done = status === 'DONE';
  const expired = status === 'EXPIRED';

  const showRemark = undone || expired;
  const remarkTitle = undone ? '未完成原因' : '过期原因';

  useEffect(() => {
    if (route.params.visitTime) {
      http.put(`/api/visits/${params.id}`, { visitTime: params.visitTime }).then(() => refresh());
    }
  }, [route.params?.visitTime]);

  function handleContinue() {
    navigation.navigate('LessonIntro', { id: lesson.id });
  }

  function handleBegin() {
    handleContinue();
    // http.put(`/api/visits/${params.id}/begin`).then(handleContinue);
  }

  function handleDone() {
    http.put(`/api/visits/${params.id}/done`).then(() => refresh());
  }

  function handleChangeVisitTime() {
    http.get(`/api/visits/${params.id}/date-range`).then((range) => {
      navigation.navigate('PickVisitTime', { visitTime, from: 'Visit', range });
    });
  }

  return (
    <ScrollView>
      <Container>
        {showRemark && (
          <Card title={remarkTitle} right={<Button title="编辑" onPress={() => {}} />}>
            <StaticForm>
              <StaticField label={remarkTitle}>{visit.remark}</StaticField>
            </StaticForm>
          </Card>
        )}

        <Card
          title="家访时间"
          right={notStarted && <Button title="修改" onPress={handleChangeVisitTime} />}
        >
          {visitTime && (
            <StaticForm>
              <StaticField label="家访时间">{VisitUtils.formatDateTimeCN(visitTime)}</StaticField>
            </StaticForm>
          )}
        </Card>

        <Card title="家访对象" background={require('../assets/images/baby-bg.png')}>
          {baby && (
            <>
              <MiniBabyContainer>
                <MiniBaby {...baby} />
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

        <Card title="课程安排">
          {lesson ? (
            <>
              <LessonName>{lesson.name}</LessonName>
              <StaticForm>
                {lesson.moduleNames.map((name, index) => (
                  <StaticField key={name} label={`模块 ${index + 1}`}>
                    {name}
                  </StaticField>
                ))}
              </StaticForm>
            </>
          ) : (
            <NoLesson>课程安排将在选择家访对象后自动展示</NoLesson>
          )}
        </Card>

        {VisitUtils.canBegin(status, visitTime) && (
          <>
            <LargeButtonContainer>
              <Button size="large" title="开始课堂" onPress={handleBegin} />
            </LargeButtonContainer>
            {/** TEST ONLY */}
            {!done && (
              <LargeButtonContainer>
                <Button size="large" title="直接完成课堂" onPress={handleDone} />
              </LargeButtonContainer>
            )}
          </>
        )}

        {undone && (
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

const LessonName = styled.Text`
  color: #525252;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const NoLesson = styled.Text``;
