import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icons from './Icons';
import { styled } from '../utils/styled';

export default function ({ navigation, title }) {
  function goBack() {
    navigation.goBack();
  }

  return (
    <Header>
      {navigation.canGoBack() && (
        <Back onPress={() => goBack()}>
          <Icons name="arrow" size={8} style={{ transform: [{ rotate: '180deg' }] }} />
          <BackText>返回</BackText>
        </Back>
      )}
      <Title>{title || 'Title'}</Title>
    </Header>
  );
}

const Header = styled.View`
  height: 56px;
  width: 100%;
  position: relative;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  margin-top: 28px;
  align-self: center;
`;

const Back = styled(TouchableOpacity)`
  position: absolute;
  flex-direction: row;
  align-items: center;
  top: 30px;
  left: 24px;
  z-index: 99;
`;

const BackText = styled.Text`
  margin-left: 8px;
  font-size: 10px;
  color: #fff;
  font-weight: bold;
`;
