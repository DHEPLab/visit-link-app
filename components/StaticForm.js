import React from 'react';
import { styled } from '../config/styled';

export default function ({ children }) {
  return <StaticForm>{children}</StaticForm>;
}

const StaticForm = styled.View`
  margin-bottom: -8px;
`;
