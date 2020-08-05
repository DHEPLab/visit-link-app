import React from 'react';
import { styled } from '../../utils/styled';

export default function ({ children }) {
  return <Form>{children}</Form>;
}

const Form = styled.View`
  background-color: #fff;
  border-radius: 8px;
  padding: 0 24px;
`;
