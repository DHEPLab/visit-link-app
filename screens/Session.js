import React from 'react';
import { View, Text } from 'react-native';
import LinearGradientHeader from '../components/LinearGradientHeader';

export default function () {
  return (
    <View>
      <LinearGradientHeader>
        您需要在本次家访中完成{'\n'}这些课程模块:
      </LinearGradientHeader>
      <Text>Session Screen</Text>
    </View>
  );
}
