import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from '../constants';
import { styled } from '../utils/styled';

export default function () {
  return (
    <Header {...Colors.linearGradient}>
      <Title>家访日程安排</Title>
      <Date>2020年05月22日</Date>
    </Header>
  );
}

const Header = styled(LinearGradient)`
  height: 84px;
  width: 100%;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 12px;
  align-self: center;
  margin-top: 28px;
  font-weight: bold;
`;

const Date = styled.Text`
  color: #fff;
  font-size: 12px;
  align-self: center;
  margin-top: 8px;
  font-weight: bold;
`;
