import React from 'react';
import { styled } from '../utils/styled';

export default function ({ children }) {
  return <StaticForm>{children}</StaticForm>;
}

const StaticForm = styled.View`
  margin-bottom: -6px;
`;
