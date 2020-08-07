import React from 'react';
import { styled } from '../utils/styled';

export default function ListFooter() {
  return <Container>无更多数据</Container>;
}

const Container = styled.Text`
  align-self: center;
  color: #8e8e93;
  font-size: 8px;
  margin-bottom: 10px;
`;
