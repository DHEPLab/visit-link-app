import React from "react";

import { styled } from "../utils/styled";

import Card from "./elements/Card";
import StaticForm from "./elements/StaticForm";
import StaticField from "./elements/StaticField";
import MiniBaby from "./MiniBaby";

export default function BabyCard({ baby }) {
  return (
    <Card title="家访对象" background={require("../assets/images/baby-bg.png")}>
      <MiniBabyContainer>
        <MiniBaby hideStatus baby={baby || {}} />
      </MiniBabyContainer>
      <StaticForm>
        <StaticField label="主照料人">{baby?.carerName}</StaticField>
        <StaticField label="联系电话">{baby?.carerPhone}</StaticField>
        <StaticField label="所在区域">{baby?.area}</StaticField>
        <StaticField label="详细地址">{baby?.location}</StaticField>
      </StaticForm>
    </Card>
  );
}

const MiniBabyContainer = styled.View`
  padding-bottom: 8px;
`;
