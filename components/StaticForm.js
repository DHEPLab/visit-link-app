import React from 'react';
import { styled } from '../utils/styled';

export default function ({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.View`
  margin-bottom: -6px;
`;
