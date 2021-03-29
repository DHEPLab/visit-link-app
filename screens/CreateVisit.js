import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import http from '../utils/http';
import Visit from '../utils/visit';
import { styled } from '../utils/styled';
import {
  MiniBaby,
  Card,
  Button,
  StaticField,
  StaticForm,
  LargeButtonContainer,
} from '../components';
import storage from '../cache/storage';

export default function CreateVisit({ navigation, route }) {
  const { params } = route;
  const [visitTime, setVisitTime] = useState();
  const [baby, setBaby] = useState();
  const [lesson, setLesson] = useState();
  const [dateRange, setDateRange] = useState([]);
  const { isConnected } = useSelector((state) => state.net);

  useEffect(() => {
    if (params?.baby) {
      const { baby } = params;
      if (!isConnected) {
        setLesson(baby?.nextShouldVisitDTO?.lesson || null)
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
    renderDateRange()
  }, [baby]);

  function handleSubmit() {
    http
      .post('/api/visits', {
        visitTime: Visit.formatDateTime(visitTime),
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
      status: 'NOT_SUBMIT',
      lessonName: lesson.name
    }
    const oldVisits = await storage.getOfflineVisits();
    storage.setOfflineVisits([...(oldVisits || []), visit])
    storage.addOfflineVisit(baby.id, visit).then(navigation.goBack);
  }

  async function renderDateRange () {
    let range = [Visit.defaultStartingRange()];
    if (baby?.id) {
      if (isConnected) {
        range = await http.get(`/api/babies/${baby.id}/visit-date-range`);
      } else {
        const {visitDateRange} = await storage.getNextShouldVisit(baby.id)
        if (visitDateRange) {
          range = visitDateRange
        }
      }
    }
    setDateRange(range)
    return range
  }

  async function handleChangeVisitTime() {
    const range = await renderDateRange();
    navigation.navigate('PickVisitTime', {
      visitTime: Visit.formatDateTime(visitTime),
      range,
    });
  }

  return (
    <ScrollView>
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
        {baby && <PromptWords>当前阶段宝宝的下一次家访课堂为"{lesson?.name}"，最早开始时间为{dateRange[0]}，</PromptWords>}
        {baby && <PromptWords>{dateRange[1]}之后宝宝将进入下一阶段则会错过当前阶段的课堂。</PromptWords>}
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

        <LargeButtonContainer>
          <Button
            onPress={handleSubmit}
            title="提交"
            size="large"
            disabled={!isConnected || !visitTime || !baby || !lesson}
          />
        </LargeButtonContainer>
        {!isConnected && <OfflineBookingLine>
          <Button
            onPress={handleSaveOfflineBooking}
            title="离线预约"
            size="large"
            ghost
            type="primary"
            disabled={!visitTime || !baby || !lesson}
          />
        </OfflineBookingLine>}
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
