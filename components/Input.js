import React from 'react';
import { styled } from '../config/styled';
import { TextInput } from 'react-native';

export default function ({ login, ...props }) {
  if (login) {
    return <LoginTextInput {...props} placeholderTextColor="#ffc3a0" />;
  }
  return <TextInput style={{ width: '100%' }} {...props} />;
}

const LoginTextInput = styled(TextInput)`
  width: 260px;
  height: 28px;
  border-radius: 13px;
  padding-left: 16px;
  align-self: center;
  background-color: #ffede2;
`;
