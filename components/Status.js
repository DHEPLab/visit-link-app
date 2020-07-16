import React from 'react';
import { styled } from '../utils/styled';

export default function Status({ color, borderColor, title }) {
  return (
    <Container>
      <Point color={color} borderColor={borderColor} />
      <Title color={color}>{title}</Title>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Point = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background: ${({ color }) => color};
  border-width: 2px;
  border-color: ${({ borderColor }) => borderColor};
  margin-right: 8px;
`;

const Title = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: ${({ color }) => color};
  margin-right: 16px;
`;
