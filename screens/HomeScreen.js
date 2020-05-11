import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, View, TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get('window');
console.log(height, width);

export default function () {
  return (
    <Container>
      <Header>
        <NextVisit>您的下一次家访：</NextVisit>
      </Header>
      <VisitCard></VisitCard>
      <View>
        {/* <TouchableOpacity> */}
        <StartButton>开始课程</StartButton>
        {/* </TouchableOpacity> */}
      </View>
    </Container>
  );
}

const Container = styled.View`
  height: 100%;
`;

const NextVisit = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`;

const VisitCard = styled.View`
  align-self: center;
  width: 308px;
  height: 277px;
  margin-top: -35px;
  border-radius: 16px;
  background-color: #fff;
  elevation: 10;
  z-index: 1;
`;

const Header = styled.View`
  width: 100%;
  height: 180px;
  padding-top: 58px;
  padding-left: 46px;
  background: #ff9472;
`;

const StartButton = styled.Text`
  width: 260px;
  height: 28px;
  line-height: 28px;
  background-color: #ff9472;
  border-radius: 270px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: -14px;
  elevation: 10;
`;
