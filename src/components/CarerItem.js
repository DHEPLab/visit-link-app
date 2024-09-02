import React from "react";
import { useTranslation } from "react-i18next";
import { styled } from "../utils/styled";
import { FamilyTies } from "../constants/enums";

import Button from "./elements/Button";
import StaticForm from "./elements/StaticForm";
import StaticField from "./elements/StaticField";
import Radio from "./elements/Radio";

export default function CarerItem({
  number,
  value,
  disabled,
  noBorder,
  onPressDelete,
  onChangeMaster,
  onPressModify,
}) {
  const { t } = useTranslation("CarerItem");

  return (
    <Container noBorder={noBorder}>
      <Header>
        <Number>{t("caregiver", { number })}</Number>
        <Radio
          label={
            value.master ? t("primaryCaregiver") : t("setPrimaryCaregiver")
          }
          value={value.master}
          onChange={onChangeMaster}
        />
        <Operation>
          <Button
            type="delete"
            disabled={disabled}
            title={t("delete")}
            onPress={onPressDelete}
          />
          <Separator />
          <Button
            type="link"
            disabled={disabled}
            title={t("edit")}
            onPress={onPressModify}
          />
        </Operation>
      </Header>
      <StaticForm>
        <StaticField label={t("caregiverName")}>{value.name}</StaticField>
        <StaticField label={t("relationship")}>
          {FamilyTies[value.familyTies]}
        </StaticField>
        <StaticField label={t("phoneNumber")}>{value.phone}</StaticField>
        <StaticField label={t("wechatAccount")}>{value.wechat}</StaticField>
      </StaticForm>
    </Container>
  );
}

const Container = styled.View`
  padding: 12px 0;
  border-bottom-width: 1px;
  border-color: #eee;
  ${({ noBorder }) =>
    noBorder &&
    `
    border-bottom-width: 0;
  `}
`;

const Header = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const Number = styled.Text`
  color: #525252;
  font-size: 10px;
  font-weight: bold;
  width: 60px;
`;

const Master = styled.Text`
  color: #8e8e93;
  font-size: 10px;
`;

const Operation = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const Separator = styled.View`
  margin: 0 8px;
  height: 8px;
  border-left-width: 1px;
  border-color: #cecece;
`;
