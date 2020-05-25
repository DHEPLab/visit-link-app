import React from 'react';
import styled from '../config/styled';
import { Button, LinearGradientHeader } from '../components';
import { useNavigation } from '@react-navigation/native';

export default function () {
  const navigation = useNavigation();
  function handleStartSession() {
    navigation.push('Session');
  }

  return (
    <Container>
      <LinearGradientHeader>您的下一次家访：</LinearGradientHeader>
      <VisitCard>
        <Avatar />
        <Name>张三李四</Name>
        <InfoConainer>
          <Row>
            <Label>家访日期：</Label>
            <LabelValue>2020年 05 月 08 日{'\n'}上午 10:00-11:00</LabelValue>
          </Row>
          <Row>
            <Label>家访地点：</Label>
            <LabelValue>
              吉林省/延边朝鲜自治州/{'\n'}安图县朝阳街826号
            </LabelValue>
          </Row>
        </InfoConainer>
      </VisitCard>
      <ButtonContainer>
        <Button size="large" title="开始课程" onPress={handleStartSession} />
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.View`
  height: 100%;
`;

const InfoConainer = styled.View`
  margin: 0 24px;
  margin-top: 16px;
  border-top-width: 1px;
  border-style: solid;
  border-color: #eee;
  padding-top: 12px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Label = styled.Text`
  font-size: 10px;
  color: #ff9472;
`;
const LabelValue = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: #4a4a4a;
  text-align: right;
`;

const Avatar = styled.View`
  margin-top: 16px;
  height: 60px;
  width: 60px;
  border: 4px solid #ffc3a0;
  align-self: center;
  border-radius: 60px;
`;

const Name = styled.Text`
  align-self: center;
  font-size: 12px;
  font-weight: bold;
  margin-top: 12px;
`;

const VisitCard = styled.View`
  align-self: center;
  width: 344px;
  height: 277px;
  margin-top: -35px;
  border-radius: 16px;
  background-color: #fff;
  elevation: 10;
  z-index: 1;
`;

const ButtonContainer = styled.View`
  margin-top: -14px;
`;
