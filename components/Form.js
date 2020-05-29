import React from 'react';
import { styled } from '../config/styled';

export default function ({ children }) {
  return <Form>{children}</Form>;
}

const Form = styled.View`
  background-color: #fff;
  border-radius: 8px;
  padding: 4px 24px;
`;
