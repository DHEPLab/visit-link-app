import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';

import { formatVisitTime } from '../utils';
import { styled } from '../utils/styled';
import { BabyLine, Card, Button, StaticField, StaticForm } from '../components';

export default function CreateVisit({ navigation, route }) {
  const [baby, setBaby] = useState();
  const [visitTime, setVisitTime] = useState();

  useEffect(() => {
    if (route.params?.baby) {
      setBaby(route.params?.baby);
    }
  }, [route.params?.baby]);

  useEffect(() => {
    if (route.params?.visitTime) {
      setVisitTime(route.params?.visitTime);
    }
  }, [route.params?.visitTime]);

  return (
    <Container>
      <Card
        title="家访时间"
        hideBody={!visitTime}
        right={
          <Button
            title="修改"
            onPress={() => navigation.navigate('PickVisitTime')}
            hideBody={!visitTime}
          />
        }
      >
        {visitTime && (
          <StaticForm>
            <StaticField label="家访时间">{formatVisitTime(visitTime)}</StaticField>
          </StaticForm>
        )}
      </Card>
      <Card
        title="家访对象"
        hideBody={!baby}
        right={<Button title="选择" onPress={() => navigation.navigate('PickBaby')} />}
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
              {/* <StaticField label="微信号码">18616881618</StaticField>
              <StaticField label="所在区域">吉林省/延边朝鲜自治州/安图县</StaticField>
              <StaticField label="详细地址">朝阳街826号</StaticField> */}
            </StaticForm>
          </>
        )}
      </Card>
      <Card title="课程安排">
        <LessonName>课堂名称</LessonName>
        <StaticForm>
          <StaticField label="模块01">模块名称</StaticField>
          <StaticField label="模块02">模块名称</StaticField>
          <StaticField label="模块03">模块名称</StaticField>
        </StaticForm>
      </Card>
      <ButtonContainer>
        <Button title="提交" size="large" />
      </ButtonContainer>
    </Container>
  );
}

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
