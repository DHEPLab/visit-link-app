import React from 'react';
import { styled } from '../../utils/styled';

export default function ({ children }) {
  return <Alert>{children}</Alert>;
}

const Alert = styled.Text`
  font-size: 10px;
  color: #8e8e93ff;
  margin: 14px 0;
`;
