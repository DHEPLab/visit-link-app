import React from 'react';
import { View } from 'react-native';

export default function Cascader({ data }) {
  function onChange(value) {
    console.log('onChange', value);
  }
  return <View></View>;
}
