import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import StaticField from "./elements/StaticField";
import StaticForm from "./elements/StaticForm";
import MiniBaby from "./MiniBaby";

import { styled, px2dp } from "../utils/styled";

export default function BabyItem({
  id,
  carerName,
  carerPhone,
  onPress,
  ...props
}) {
  const { t } = useTranslation("BabyItem");

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        onPress({
          id,
          ...props,
        })
      }
    >
      <Card>
        <MiniBaby baby={{ ...props, id }} />
        <Carer>
          <StaticForm style={{ flexGrow: 1 }}>
            <StaticField label={t("primaryCaregiver")}>
              {carerName || t("none")}
            </StaticField>
            <StaticField label={t("contactInfo")}>
              {carerPhone || t("none")}
            </StaticField>
          </StaticForm>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={px2dp(18)}
            color="#FF794F"
          />
        </Carer>
      </Card>
    </TouchableOpacity>
  );
}

const Card = styled.View`
  padding: 16px 24px;
  width: 344px;
  border-radius: 8px;
  align-self: center;
  background: #fff;
  margin-bottom: 8px;
`;

const Carer = styled.View`
  flex-direction: row;
  margin-top: 14px;
`;
