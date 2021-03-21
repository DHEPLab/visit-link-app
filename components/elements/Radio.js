import React from 'react';
import { styled } from '../../utils/styled';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Radio({ value, onChange, label }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onChange(!value)}>
      <Container>
        <Box checked={value}>{value && <Checked />}</Box>
        <Label>{label}</Label>
      </Container>
    </TouchableOpacity>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Checked = styled.View`
  width: 6px;
  height: 6px;
  background: #ff794f;
  border-radius: 6px;
`;

const Box = styled.View`
  width: 12px;
  height: 12px;
  border-width: 1px;
  border-color: #eee;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  ${({ checked }) =>
    checked &&
    `
    background: #FFEDE2;
    border-color: #FFC3A0;
  `}
`;

const Label = styled.Text`
  margin-left: 8px;
  margin-right: 8px;
  color: #8e8e93;
  font-size: 10px;
`;
