import React from "react";
import { styled } from "../../utils/styled";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native";
import { useTranslation } from "react-i18next";

export default function RadioGroup({ value, onChange, options = [] }) {
  function checkChange(label, input, from) {
    if (from === "input" || value === label) {
      onChange({ target: { value: { check: label, input: input } } });
    } else {
      onChange({ target: { value: { check: label, input: "" } } });
    }
  }
  const { t } = useTranslation();

  return (
    <Container>
      {options.map((option) => {
        return (
          <TouchableOpacity
            key={option.label}
            activeOpacity={0.8}
            onPress={() => checkChange(option.label, value?.input, "text")}
          >
            <Line>
              <Box checked={option.label === value?.check}>
                {option.label === value?.check && <Checked />}
              </Box>
              <Label>{option.label.trim()}</Label>
            </Line>
            {option.needEnter && (
              <StyledTextInput
                placeholder={t("Form:pleaseInput")}
                value={option.label === value?.check ? option?.input : ""}
                border={true}
                onChangeText={(text) =>
                  checkChange(option.label, text, "input")
                }
              />
            )}
          </TouchableOpacity>
        );
      })}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  margin-bottom: -10px;
  margin-top: -10px;
`;

const Box = styled.View`
  width: 12px;
  height: 12px;
  border-width: 1px;
  border-color: #eee;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  border-color: #ffc3a0;
  ${({ checked }) =>
    checked &&
    `
    background: #FFEDE2;
  `}
`;

const Checked = styled.View`
  width: 6px;
  height: 6px;
  background: #ff794f;
  border-radius: 6px;
`;

const Label = styled.Text`
  margin-left: 8px;
  margin-right: 8px;
  color: #8e8e93;
  font-size: 10px;
`;

const Line = styled.View`
  height: 25px;
  flex-direction: row;
  align-items: center;
`;

const StyledTextInput = styled(TextInput)`
  margin-top: -3px;
  width: 90%;
  margin-left: 18px;
  font-size: 10px;
  ${({ border }) =>
    border &&
    `
    height: 20px;
    border-radius: 13px;
    padding-left: 12px;
    border: 1px solid #FFEDE2;
  `}
`;
