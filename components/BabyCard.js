import React from 'react';
import { TouchableNativeFeedback } from 'react-native';

import { styled } from '../utils/styled';
import StaticFormItem from './StaticFormItem';

export default function ({ name, identity, stage, carerName, carerPhone, onPress }) {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.SelectableBackground()}
    >
      <Card>
        <Baby>
          <Name>{name}</Name>
          <Age>{stage}/16月</Age>
          <Identity>ID:{identity}</Identity>
        </Baby>
        <Carer>
          <StaticFormItem label="主照料人">{carerName}</StaticFormItem>
          <StaticFormItem label="联系方式">{carerPhone}</StaticFormItem>
        </Carer>
      </Card>
    </TouchableNativeFeedback>
  );
}

const Card = styled.View`
  padding: 16px;
  width: 344px;
  border-radius: 8px;
  align-self: center;
  background: #fff;
  margin-bottom: 8px;
`;

const Carer = styled.View`
  margin-top: 16px;
  margin-bottom: -8px;
  margin-left: 20px;
`;

const Baby = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Name = styled.Text`
  color: #525252;
  font-weight: bold;
  font-size: 12px;
  margin-right: 12px;
`;

const Age = styled.Text`
  color: #525252;
  font-size: 8px;
`;

const Identity = styled.Text`
  color: #b2b2b2;
  font-size: 8px;
  margin-left: auto;
`;
