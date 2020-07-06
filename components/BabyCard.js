import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import StaticField from './StaticField';
import { styled, px2dp } from '../utils/styled';
import { BabyStage } from '../constants/enums';

export default function ({
  id,
  name,
  identity,
  gender,
  stage,
  month,
  carerName,
  carerPhone,
  onPress,
}) {
  function genderIcon(gender) {
    switch (gender) {
      case 'MALE':
        return 'gender-male';
      case 'FEMALE':
        return 'gender-female';
      default:
        return 'gender-male-female';
    }
  }

  function genderColor(gender) {
    switch (gender) {
      case 'MALE':
        return '#64B5CF';
      case 'FEMALE':
        return '#F2709C';
      default:
        return 'black';
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        onPress({
          id,
          name,
          identity,
          gender,
          stage,
          month,
        })
      }
    >
      <Card>
        <Baby>
          <Status>已审核</Status>
          <Name>{name}</Name>
          <Gender>
            <MaterialCommunityIcons
              name={genderIcon(gender)}
              size={px2dp(12)}
              color={genderColor(gender)}
            />
          </Gender>
          <Age>
            {BabyStage[stage]}/{month}月
          </Age>
          <Identity>ID:{identity}</Identity>
        </Baby>
        <Carer>
          <StaticField label="主照料人">{carerName}</StaticField>
          <StaticField label="联系方式">{carerPhone}</StaticField>
          <ArrowRight name="keyboard-arrow-right" size={px2dp(14)} color="#FF794F" />
        </Carer>
      </Card>
    </TouchableOpacity>
  );
}

const ArrowRight = styled(MaterialIcons)`
  position: absolute;
  top: 10px;
  right: 0;
`;

const Status = styled.Text`
  padding: 1px 4px;
  margin-right: 8px;
  font-size: 8px;
  color: #ff794f;
  background: #ffede2;
  border-radius: 2px;
`;

const Card = styled.View`
  padding: 16px;
  width: 344px;
  border-radius: 8px;
  align-self: center;
  background: #fff;
  margin-bottom: 8px;
`;

const Carer = styled.View`
  margin-top: 14px;
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

const Gender = styled(Age)`
  margin-right: 4px;
`;

const Identity = styled.Text`
  color: #b2b2b2;
  font-size: 8px;
  margin-left: auto;
`;
