import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ApproveStatus from '../components/ApproveStatus';
import { BabyStage, GenderIcon } from '../constants/enums';
import { styled, px2dp } from '../utils/styled';

export default function MiniBaby({
  baby: { approved, name, gender, stage, months, identity },
  hideStatus,
}) {
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
      {!hideStatus && (
        <StatusContainer>
          <ApproveStatus gray approved={approved} />
        </StatusContainer>
      )}
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

const StatusContainer = styled.View`
  margin-right: 8px;
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
