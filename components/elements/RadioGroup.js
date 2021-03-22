import React from 'react';
import { styled } from '../../utils/styled';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from './Input'

export default function RadioGroup({ value, onChange, options = [] }) {
  return (
    <Container>
      {options.map((option) => {
        return (
          <TouchableOpacity
            key={option.label}
            activeOpacity={0.8}
            onPress={() => onChange({ target: { value: option.label } })}
          >
            <Radio active={option.label === value}>{option.label}</Radio>
            {option.needEnter && <Input />}
          </TouchableOpacity>
        );
      })}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: -10px;
`;

const Radio = styled.Text`
  color: #8e8e93;
  font-size: 10px;
  margin-right: 12px;
  padding: 1px 14px;
  border-radius: 4px;
  border-width: 1px;
  border-color: #eeeeee;
  margin-bottom: 10px;

  ${({ active }) =>
    active &&
    `
    color: #FF794F;
    border-color: #FFC3A0;
    background: rgba(255,195,160,0.3);
  `}
`;
