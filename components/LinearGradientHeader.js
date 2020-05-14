import React from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ({ children }) {
  return (
    <LinearGradientHeader
      start={[0, 0]}
      end={[1, 1]}
      colors={['#FF9472', '#F2709C']}
    >
      <Title>{children}</Title>
    </LinearGradientHeader>
  );
}

const LinearGradientHeader = styled(LinearGradient)`
  width: 100%;
  height: 180px;
  padding-top: 58px;
  padding-left: 28px;
`;

const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`;
