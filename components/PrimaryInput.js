import React from 'react';
import { styled } from '../config/styled';
import { TextInput } from 'react-native';

export default function ({ value, onChange, onBlur, ...props }) {
  return (
    <PrimaryInput
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      {...props}
      placeholderTextColor="#ffc3a0"
    />
  );
}

const PrimaryInput = styled(TextInput)`
  width: 260px;
  height: 28px;
  border-radius: 13px;
  padding-left: 16px;
  align-self: center;
  background-color: #ffede2;
`;
