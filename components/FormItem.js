import React from 'react';
import { styled } from '../config/styled';

export default function ({ label, children, center, border = true }) {
  return (
    <FormItem border={border} center={center}>
      {label && <Label>{label}:</Label>}
      {children}
    </FormItem>
  );
}

const FormItem = styled.View`
  flex-direction: row;
  ${({ center }) => center && 'justify-content: center;'}
  align-items: center;
  border-color: #eee;
  ${({ border }) => border && 'border-bottom-width: 1px;'}
  padding: 8px 0;
`;

const Label = styled.Text`
  width: 50px;
  text-align: right;
  margin-right: 12px;
  color: #8e8e93;
  font-size: 10px;
  font-weight: bold;
`;
