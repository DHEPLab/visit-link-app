import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useBoolState } from "../../utils";
import { styled } from "../../utils/styled";
import { CreateBabyNavigator, BabyForm, Modal } from "../../components";

export default function CreateBabyStep1({ navigation }) {
  const { t } = useTranslation("CreateBabyStep1");
  const [visible, open, close] = useBoolState();
  const [action, setAction] = useState();

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (e.data.action.type !== "GO_BACK") return;
        e.preventDefault();
        open();
        setAction(e.data.action);
      }),
    [navigation],
  );

  function onSubmit(values) {
    navigation.navigate("CreateBabyStep2", { baby: values });
  }

  return (
    <>
      <CreateBabyNavigator active={1} navigation={navigation} />
      <Container>
        <BabyForm onSubmit={onSubmit} submitBtnText={t("nextStep")} />
      </Container>
      <Modal
        visible={visible}
        title={t("attention")}
        contentText={t("loseEditedContent")}
        okText={t("exit")}
        cancelText={t("thinkAgain")}
        onCancel={close}
        onOk={() => {
          close();
          navigation.dispatch(action);
        }}
      />
    </>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;
