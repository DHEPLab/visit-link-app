import React from 'react';
import { TextInput } from 'react-native';

import { styled } from '../../utils/styled';
import { Colors } from '../../constants';

export default function Input({ value, onChange, onBlur, ...props }) {
  return (
    <StyledTextInput
      value={value}
      selectionColor={Colors.theme.colors.primary}
      onChangeText={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
}

const StyledTextInput = styled(TextInput)`
  width: 100%;
  font-size: 10px;
`;
