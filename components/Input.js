import React from 'react';
import { TextInput } from 'react-native';

export default function ({ ...props }) {
  return <TextInput style={{ width: '100%' }} {...props} />;
}
