import React from 'react';
import { TouchableOpacity } from 'react-native';

import { ModuleStatus } from '../constants/enums';
import { Colors } from '../constants';
import { styled } from '../utils/styled';

export default function ModuleItem({ value = {}, onPress, disabled }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled}>
      <Container>
        <StatusPoint
          color={Colors.moduleStatus[value.status]}
          borderColor={Colors.moduleStatusBorder[value.status]}
        />
        <Status color={Colors.moduleStatus[value.status]}>{ModuleStatus[value.status]}</Status>
        <Number>{value.number}</Number>
        <Name>{value.name}</Name>
      </Container>
    </TouchableOpacity>
  );
}

const StatusPoint = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background: ${({ color }) => color};
  border-width: 2px;
  border-color: ${({ borderColor }) => borderColor};
  margin-right: 8px;
`;

const Text = styled.Text`
  font-size: 10px;
  font-weight: bold;
`;

const Status = styled(Text)`
  color: ${({ color }) => color};
  margin-right: 16px;
`;

const Number = styled(Text)`
  margin-right: 12px;
`;
const Name = styled(Text)``;

const Container = styled.View`
  height: 42px;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  padding-left: 12px;
`;
