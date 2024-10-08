import React from "react";
import { TouchableOpacity } from "react-native";

import Status from "./Status";
import { styled } from "../utils/styled";
import { useTranslation } from "react-i18next";

export default function QuestionnaireItem({ name, onPress, disabled }) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={disabled}>
      <Container opacity={disabled ? 0.4 : 1}>
        <Status
          title={t("Component:question")}
          borderColor="#FFEDE2"
          color="#FF794F"
        />
        <Name>{name}</Name>
      </Container>
    </TouchableOpacity>
  );
}

const Text = styled.Text`
  font-size: 10px;
  font-weight: bold;
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
