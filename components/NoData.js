import React from 'react';

import { styled } from '../utils/styled';

export default function NoData({ title }) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}

const Container = styled.View`
  padding: 20px 0;
  align-items: center;
`;
const Title = styled.Text`
  color: #8e8e93;
  font-size: 10px;
`;
