import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Http from "../utils/http";
import { useBoolState } from "@/utils";
import { styled } from "@/utils/styled";
import {
  Alert,
  Button,
  Form,
  FormItem,
  LargeButtonContainer,
  Message,
  PasswordInput,
} from "../components";
import { signOut } from "@/actions";
import { Keyboard, ToastAndroid } from "react-native";

export default function ChangePassword() {
  const { t } = useTranslation("ChangePassword");
  const dispatch = useDispatch();
  const [visible, openMessage] = useBoolState();

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required(t("oldPasswordRequired")),
    password: Yup.string()
      .min(6, t("passwordMinLength"))
      .required(t("passwordRequired")),
  });

  function onSubmit({ oldPassword, password }) {
    // fix huawei unable to display toast when soft keyborard pops up
    Keyboard.dismiss();
    Http.put("/api/account/password", {
      oldPassword,
      password,
    })
      .then(() => {
        openMessage();
        setTimeout(async () => {
          await Http.signOut();
          dispatch(signOut());
        }, 500);
      })
      .catch((err) => {
        if (err.status === 400) {
          ToastAndroid.showWithGravity(
            t("oldPasswordIncorrect"),
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      });
  }

  return (
    <Container>
      <Alert>{t("passwordChangeWarning")}</Alert>
      <Message visible={visible} title={t("passwordChangeSuccess")} />
      <Formik
        initialValues={{}}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values }) => (
          <>
            <Form labelWidth={50} labelAlign="right">
              <FormItem name="oldPassword" label={t("oldPassword")}>
                <PasswordInput />
              </FormItem>
              <FormItem name="password" label={t("newPassword")}>
                <PasswordInput />
              </FormItem>
              <FormItem
                name="confirmPassword"
                label={t("confirmPassword")}
                noBorder
                validate={(value) => {
                  if (value !== values.password) {
                    return t("passwordMismatch");
                  }
                }}
              >
                <PasswordInput onEndEditing={handleSubmit} />
              </FormItem>
            </Form>
            <LargeButtonContainer>
              <Button size="large" onPress={handleSubmit} title={t("submit")} />
            </LargeButtonContainer>
          </>
        )}
      </Formik>
    </Container>
  );
}

const Container = styled.View`
  padding: 6px 28px;
`;
