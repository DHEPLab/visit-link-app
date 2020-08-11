import React from 'react';
import { TextInput } from 'react-native';

import { styled } from '../../utils/styled';
import { Colors } from '../../constants';

export default function Input({ value, border, onChange, onBlur, ...props }) {
  return (
    <StyledTextInput
      value={value}
      selectionColor={Colors.theme.colors.primary}
      onChangeText={onChange}
      onBlur={onBlur}
      border={border}
      {...props}
    />
  );
}

const StyledTextInput = styled(TextInput)`
  width: 100%;
  font-size: 10px;
  ${({ border }) =>
    border &&
    `
    height: 26px;
    border-radius: 13px;
    padding-left: 12px;
    border: 1px solid #eee;
  `}
`;
