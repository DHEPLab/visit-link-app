import React from 'react';
import { Platform, SafeAreaView, Text } from 'react-native';

export default function () {
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
      <Text>Me Screen</Text>
    </SafeAreaView>
  );
}
