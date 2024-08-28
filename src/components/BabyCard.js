import React from "react";

import { styled } from "../utils/styled";

import Card from "./elements/Card";
import StaticForm from "./elements/StaticForm";
import StaticField from "./elements/StaticField";
import MiniBaby from "./MiniBaby";
import { useTranslation } from "react-i18next";

export default function BabyCard({ baby }) {
  const { t } = useTranslation();
  return (
    <Card
      title={t("Visits:visitInfo")}
      background={require("../assets/images/baby-bg.png")}
    >
      <MiniBabyContainer>
        <MiniBaby hideStatus baby={baby || {}} />
      </MiniBabyContainer>
      <StaticForm>
        <StaticField label={t("Visits:carerName")}>
          {baby?.carerName}
        </StaticField>
        <StaticField label={t("Visits:carerPhone")}>
          {baby?.carerPhone}
        </StaticField>
        <StaticField label={t("Visits:area")}>{baby?.area}</StaticField>
        <StaticField label={t("Visits:location")}>{baby?.location}</StaticField>
      </StaticForm>
    </Card>
  );
}

const MiniBabyContainer = styled.View`
  padding-bottom: 8px;
`;
