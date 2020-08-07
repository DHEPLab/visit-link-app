import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { BabyStage, GenderIcon } from '../constants/enums';
import { styled, px2dp } from '../utils/styled';

export default function MiniBaby({ approved, name, gender, stage, months, identity }) {
  function genderColor(value) {
    switch (value) {
      case 'MALE':
        return '#64B5CF';
      case 'FEMALE':
        return '#F2709C';
      default:
        return '#CECECE';
    }
  }

  return (
    <Baby>
      <Status approved={approved}>{approved ? '已审核' : '待审核'}</Status>
      <Name>{name}</Name>
      <Gender>
        <MaterialCommunityIcons
          name={GenderIcon[gender]}
          size={px2dp(12)}
          color={genderColor(gender)}
        />
      </Gender>
      <Age>
        {BabyStage[stage]} {months}个月
      </Age>
      <Identity>ID:{identity || '未填写'}</Identity>
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

  ${({ approved }) =>
    !approved &&
    `
    background: #EEEEEE;
    color: #B2B2B2;
  `}
`;

const Age = styled.Text`
  color: #525252;
  font-size: 8px;
  margin-right: 16px;
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
  flex: 1;
`;

const Gender = styled(Age)`
  margin-right: 4px;
`;

const Identity = styled.Text`
  color: #b2b2b2;
  font-size: 8px;
  margin-left: auto;
`;
