import React from 'react';
import { styled } from '../utils/styled';

export default function ({ label, children }) {
  return (
    <StaticFormItem>
      {label && <Label>{label}</Label>}
      <Value>{children}</Value>
    </StaticFormItem>
  );
}

const StaticFormItem = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

const Label = styled.Text`
  color: #8e8e93;
  font-size: 10px;
  width: 50px;
  text-align: right;
`;

const Value = styled.Text`
  color: #4a4a4a;
  font-size: 10px;
  font-weight: bold;
  margin-left: 12px;
`;
