import React, { useState } from "react";

import { useBoolState } from "../utils";
import { ToastAndroid } from "react-native";

import Visit from "../utils/visit";
import Button from "./elements/Button";
import Modal from "./elements/Modal";
import Message from "./elements/Message";
import Input from "./elements/Input";
import LargeButtonContainer from "./LargeButtonContainer";
import { styled } from "../utils/styled";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function StartLesson({
  disabled,
  status,
  visitTime,
  navigation,
  lessonId,
  visitId,
  nextModuleIndex,
  from,
  validate,
  cancelVisit,
}) {
  const { t } = useTranslation();
  const [startVisitVisible, openStartVisit, closeStartVisit] = useBoolState();
  const [errorMessageVisble, openErrorMessage, closeErrorMessage] =
    useBoolState();
  const [deleteVisible, openDelete, closeDelete] = useBoolState();
  const { isConnected } = useSelector((state) => state.net);
  const [deleteremark, setDeleteRemark] = useState();
  const [errorMessageContent, setErrorMessageContent] = useState(
    t("Visits:notStartMessage"),
  );

  function handleStart() {
    closeStartVisit();
    navigation.navigate("LessonIntro", {
      id: lessonId,
      visitId,
      preview: false,
      from,
    });
  }

  function handleContinue() {
    if (validate && !validate()) return;
    navigation.navigate("LessonIntro", {
      id: lessonId,
      visitId,
      preview: false,
      continue: true,
      nextModuleIndex,
      from,
    });
  }

  return (
    <>
      {visitId && (
        <LargeButtonContainer>
          {/* TODO Validate continue */}
          {Visit.statusUndone(status) && (
            <Button
              disabled={disabled}
              size="large"
              title={t("Visits:continueLesson")}
              onPress={handleContinue}
            />
          )}

          {Visit.statusNotStart(status) && (
            <Button
              disabled={disabled || Visit.statusDone(status)}
              size="large"
              title={t("Visits:startLesson")}
              onPress={() => {
                if (!Visit.canIStart(status, visitTime)) {
                  openErrorMessage();
                  setErrorMessageContent(t("Visits:notStartMessage"));
                  return;
                }
                /*Location.requestBackgroundPermissionsAsync().then(res=> {
                  if (res.status !== 'granted') {
                    setErrorMessageContent("定位权限未打开，无法开始课堂")
                    openErrorMessage();
                    return;
                  }
                })*/
                if (validate && !validate()) return;
                openStartVisit();
              }}
            />
          )}
        </LargeButtonContainer>
      )}

      {visitId && isConnected && Visit.statusNotStart(status) && (
        <ButtonLine>
          <Button
            size="large"
            ghost
            type="primary"
            title={t("Visits:cancelVisit")}
            onPress={() => {
              openDelete();
              setDeleteRemark("");
            }}
          />
        </ButtonLine>
      )}

      <Message
        error
        visible={errorMessageVisble}
        buttonText={t("Common:ok")}
        onButtonPress={closeErrorMessage}
        title={t("Visits:canNotStartLessonMessage")}
        content={errorMessageContent}
      />

      <Modal
        title={t("Visits:confirmStartLessonMessage")}
        visible={startVisitVisible}
        contentText={`${t("Visits:visitSchedule")}：${Visit.formatDateTimeCN(visitTime)}`}
        okText={t("Common:start")}
        cancelText={t("Common:cancel")}
        onCancel={closeStartVisit}
        onOk={handleStart}
      />

      <Modal
        title={t("Visits:cancelVisitReason")}
        visible={deleteVisible}
        content={
          <Input
            value={deleteremark}
            onChangeText={setDeleteRemark}
            border
            placeholder={t("Form:pleaseInput")}
          />
        }
        okText={t("Visits:cancelVisit")}
        cancelText={t("Visits:later")}
        onCancel={closeDelete}
        onOk={() => {
          if (deleteremark) {
            cancelVisit(deleteremark);
            closeDelete();
          } else {
            ToastAndroid.show(t("Visits:inputVisitReason"), ToastAndroid.LONG);
          }
        }}
      />
    </>
  );
}

const ButtonLine = styled.View`
  margin: 0 auto;
`;
