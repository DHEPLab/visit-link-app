import React from "react";
import { TextInput } from "react-native";

import { styled } from "../../utils/styled";
import { Colors } from "../../constants";

export default function Input({
  value,
  border,
  onChange,
  onBlur,
  multiline = false,
  ...props
}) {
  return (
    <StyledTextInput
      value={value}
      selectionColor={Colors.theme.colors.primary}
      onChangeText={onChange}
      onBlur={onBlur}
      border={border}
      multiline={multiline}
      {...props}
    />
  );
}

const StyledTextInput = styled(TextInput)`
  width: 100%;
  font-size: 10px;
  ${({ multiline }) => multiline && `height: 30px; vertical-align: top`}
  ${({ border }) =>
    border &&
    `
    height: 26px;
    border-radius: 13px;
    padding-left: 12px;
    border: 1px solid #eee;
  `}
`;
