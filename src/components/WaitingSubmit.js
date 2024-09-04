import React from "react";

import { styled } from "../utils/styled";
import { useTranslation } from "react-i18next";

export default function WaitingSubmit({ approved, gray }) {
  const { t } = useTranslation();
  return (
    <Status gray={!approved && gray}>{t("Component:waitingSubmit")}</Status>
  );
}

const Status = styled.Text`
  padding: 1px 4px;
  font-size: 8px;
  color: #ff794f;
  background: #ffede2;
  border-radius: 2px;

  ${({ gray }) =>
    gray &&
    `
    background: #EEEEEE;
    color: #B2B2B2;
  `}
`;
