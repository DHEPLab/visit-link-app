import React from 'react';
import { TextInput } from 'react-native';

export default function ({ value, onChange, onBlur, ...props }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      style={{ width: '100%' }}
      {...props}
    />
  );
}
