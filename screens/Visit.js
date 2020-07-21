import React from 'react';
import { ScrollView } from 'react-native';

import { styled } from '../utils/styled';
import { formatVisitTime, useFetch } from '../utils';
import { BabyLine, Card, Button, StaticField, StaticForm } from '../components';

export default function Visit({ navigation, route }) {
  const [visit] = useFetch(`/api/visits/${route.params.id}`);

  return (
    <Container>
      <Card
        title="家访时间"
        right={<Button title="修改" onPress={() => navigation.navigate('PickVisitTime')} />}
      >
        {visit.visitTime && (
          <StaticForm>
            <StaticField label="家访时间">{formatVisitTime(visit.visitTime)}</StaticField>
          </StaticForm>
        )}
      </Card>

      <Card title="家访对象" background={require('../assets/images/baby-bg.png')}>
        {visit.baby && (
          <>
            <BabyLineContainer>
              <BabyLine {...visit.baby} />
            </BabyLineContainer>
            <StaticForm>
              <StaticField label="主照料人">{visit.baby.carerName}</StaticField>
              <StaticField label="联系电话">{visit.baby.carerPhone}</StaticField>
              <StaticField label="所在区域">{visit.baby.area}</StaticField>
              <StaticField label="详细地址">{visit.baby.location}</StaticField>
            </StaticForm>
          </>
        )}
      </Card>

      <Card title="课程安排">
        {visit.lesson ? (
          <>
            <LessonName>{visit.lesson.name}</LessonName>
            <StaticForm>
              {visit.lesson.moduleNames.map((name, index) => (
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
    </Container>
  );
}

const Container = styled(ScrollView)`
  padding: 20px 28px;
  height: 100%;
`;

const BabyLineContainer = styled.View`
  padding-bottom: 8px;
`;

const LessonName = styled.Text`
  color: #525252;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const NoLesson = styled.Text``;
