import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import ApproveStatus from "../components/ApproveStatus";
import WaitingSubmit from "../components/WaitingSubmit";
import { BabyStage, GenderIcon } from "../constants/enums";
import { styled, px2dp } from "../utils/styled";

export default function MiniBaby({
  baby: { id, approved, name, gender, stage, days, identity, pastEdc },
  hideStatus,
}) {
  const { t } = useTranslation("MiniBaby");

  function genderColor(value) {
    switch (value) {
      case "MALE":
        return "#64B5CF";
      case "FEMALE":
        return "#F2709C";
      default:
        return "#CECECE";
    }
  }

  return (
    <Baby>
      {!hideStatus && (
        <StatusContainer>
          {id ? (
            <ApproveStatus gray approved={approved} />
          ) : (
            <WaitingSubmit gray approved={approved} />
          )}
        </StatusContainer>
      )}
      <Name>{name}</Name>
      <Gender>
        <MaterialCommunityIcons
          name={GenderIcon[gender]}
          size={px2dp(12)}
          color={genderColor(gender)}
        />
      </Gender>
      <Age>
        {days !== -1 &&
          (pastEdc ? (
            <Alert>{t("babyDueDateArrived")}</Alert>
          ) : (
            days && `${BabyStage[stage]} ${days} ${t("days")}`
          ))}
      </Age>
      <Identity>ID:{identity || t("idNotFilled")}</Identity>
    </Baby>
  );
}

const StatusContainer = styled.View`
  margin-right: 8px;
`;

const Age = styled.Text`
  color: #525252;
  font-size: 8px;
  margin-right: 16px;
`;

const Alert = styled.Text`
  color: #ff2e2e;
`;

const Baby = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Name = styled.Text`
  color: #525252;
  font-weight: bold;
  font-size: 12px;
  margin-right: 12px;
  flex: 1;
`;

const Gender = styled(Age)`
  margin-right: 4px;
`;

const Identity = styled.Text`
  color: #b2b2b2;
  font-size: 8px;
  margin-left: auto;
`;
