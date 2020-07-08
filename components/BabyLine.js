import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { BabyStage } from '../constants/enums';
import { styled, px2dp } from '../utils/styled';

export default function BabyLine({ name, gender, stage, month, identity }) {
  function genderIcon(value) {
    switch (value) {
      case 'MALE':
        return 'gender-male';
      case 'FEMALE':
        return 'gender-female';
      default:
        return 'gender-male-female';
    }
  }

  function genderColor(value) {
    switch (value) {
      case 'MALE':
        return '#64B5CF';
      case 'FEMALE':
        return '#F2709C';
      default:
        return 'black';
    }
  }

  return (
    <Baby>
      {/* <Status>已审核</Status> */}
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
  );
}

const Status = styled.Text`
  padding: 1px 4px;
  margin-right: 8px;
  font-size: 8px;
  color: #ff794f;
  background: #ffede2;
  border-radius: 2px;
`;

const Age = styled.Text`
  color: #525252;
  font-size: 8px;
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

const Gender = styled(Age)`
  margin-right: 4px;
`;

const Identity = styled.Text`
  color: #b2b2b2;
  font-size: 8px;
  margin-left: auto;
`;
