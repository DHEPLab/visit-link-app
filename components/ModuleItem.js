import React from 'react';
import { TouchableOpacity } from 'react-native';

import Status from './Status';
import { ModuleStatus } from '../constants/enums';
import { Colors } from '../constants';
import { styled } from '../utils/styled';

export default function ModuleItem({ value = {}, onPress, disabled }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled}>
      <Container opacity={value.status === 'UNDONE' && disabled ? 0.4 : 1}>
        <Status
          title={ModuleStatus[value.status]}
          borderColor={Colors.moduleStatusBorder[value.status]}
          color={Colors.moduleStatus[value.status]}
        />
        <Number>{value.number}</Number>
        <Name>{value.name}</Name>
      </Container>
    </TouchableOpacity>
  );
}

const Text = styled.Text`
  font-size: 10px;
  font-weight: bold;
`;

const Number = styled(Text)`
  margin-right: 12px;
`;
const Name = styled(Text)`
  flex: 1;
  flex-wrap: wrap;
`;

const Container = styled.View`
  padding: 14px 12px;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  opacity: ${({ opacity }) => opacity};
`;
