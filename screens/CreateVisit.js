import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { ScrollView } from 'react-native';

import Http from '../utils/http';
import Visit from '../utils/visit';
import { styled } from '../utils/styled';
import { BabyLine, Card, Button, StaticField, StaticForm } from '../components';

export default function CreateVisit({ navigation, route }) {
  const { params } = route;
  const [visitTime, setVisitTime] = useState();
  const [baby, setBaby] = useState();
  const [lesson, setLesson] = useState();

  useEffect(() => {
    if (params?.baby) {
      const { baby } = params;
      Http.get(`/api/babies/${baby.id}/lesson`).then(setLesson);
      setBaby(baby);
    }
  }, [params?.baby]);

  useEffect(() => {
    if (params?.visitTime) {
      setVisitTime(params?.visitTime);
    }
  }, [params?.visitTime]);

  function handleSubmit() {
    Http.post('/api/visits', {
      visitTime: Visit.formatDateTime(visitTime),
      babyId: baby.id,
      lessonId: lesson.id,
    }).then(navigation.goBack);
  }

  async function handleChangeVisitTime() {
    let range = [Visit.formatDate(moment())];
    if (baby?.id) {
      range = await http.get(`/api/babies/${baby.id}/visit-date-range`);
    }
    navigation.navigate('PickVisitTime', {
      visitTime: Visit.formatDateTime(visitTime),
      range,
    });
  }

  return (
    <Container>
      <Card
        title="家访时间"
        hideBody={!visitTime}
        right={<Button title="修改" onPress={handleChangeVisitTime} hideBody={!visitTime} />}
      >
        {visitTime && (
          <StaticForm>
            <StaticField label="家访时间">{Visit.formatDateTimeCN(visitTime)}</StaticField>
          </StaticForm>
        )}
      </Card>
      <Card
        title="家访对象"
        hideBody={!baby}
        right={
          !params?.lockBaby && (
            <Button
              title="选择"
              onPress={() =>
                navigation.navigate('PickBaby', {
                  visitDate: visitTime && Visit.formatDate(visitTime),
                })
              }
            />
          )
        }
        background={require('../assets/images/baby-bg.png')}
      >
        {baby && (
          <>
            <BabyLineContainer>
              <BabyLine {...baby} />
            </BabyLineContainer>
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
              {lesson.moduleNames?.map((name, index) => (
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
      <ButtonContainer>
        <Button
          onPress={handleSubmit}
          title="提交"
          size="large"
          disabled={!visitTime || !baby || !lesson}
        />
      </ButtonContainer>
    </Container>
  );
}

const NoLesson = styled.Text``;

const Container = styled(ScrollView)`
  padding: 20px 28px;
  height: 100%;
`;

const ButtonContainer = styled.View`
  padding-top: 30px;
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
