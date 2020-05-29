import React from 'react';
import { styled } from '../config/styled';

export default function ({ label, children }) {
  return (
    <FormItem>
      <Label>{label}:</Label>
      {children}
    </FormItem>
  );
}

const FormItem = styled.View`
  flex-direction: row;
  align-items: center;
  border-color: #eee;
  border-bottom-width: 1px;
  border-style: solid;
  padding: 8px 0;
`;

const Label = styled.Text`
  margin-right: 12px;
  color: #8e8e93;
  font-size: 10px;
  font-weight: bold;
`;
