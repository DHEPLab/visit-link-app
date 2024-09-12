import React from "react";
import { ToastAndroid } from "react-native";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { styled } from "../../utils/styled";

import {
  SolidRadios,
  Card,
  LargeButtonContainer,
  Button,
  Form,
  FormItem,
  Input,
  CheckBox,
} from "../../components";
import { FamilyTies } from "../../constants/enums";
import http from "../../utils/http";
import confirm from "../../components/modal/confirm";
import { useDispatch } from "react-redux";
import { carerSchema } from "./schema/carerSchema";

export default function CreateCarer({ navigation, route }) {
  const { t } = useTranslation("CreateCarer");
  const { params } = route;
  const dispatch = useDispatch();

  const validationSchema = carerSchema(t);

  // The same baby cannot choose caregivers who have the same family ties
  function filteredFamilyTies(familyTies) {
    if (!familyTies) return FamilyTies;
    const filtered = {};
    Object.keys(FamilyTies)
      .filter((key) => !familyTies.includes(key))
      .forEach((key) => {
        filtered[key] = FamilyTies[key];
      });
    return filtered;
  }

  async function onSubmit(carer) {
    if (params?.carer?.master && !carer.master) {
      ToastAndroid.show(t("setPrimaryCaregiver"), ToastAndroid.LONG);
      return;
    }

    const carerIndex = params?.carerIndex == null ? -1 : params?.carerIndex;

    if (!params.babyId) {
      navigation.navigate(params.from, {
        ...(params.prevParams || {}),
        carer,
        carerIndex,
      });
      return;
    }
    if (carerIndex === -1) {
      await http.post(`/api/babies/${params.babyId}/carers`, carer);
      navigation.navigate(params.from, {
        ...(params.prevParams || {}),
        success: Math.random(),
      });
    } else {
      confirm(t("confirmEdit"), {
        onOk: async () => {
          await http.put(
            `/api/babies/${params.babyId}/carers/${carer.id}`,
            carer,
          );
          navigation.navigate(params.from, {
            ...(params.prevParams || {}),
            success: Math.random(),
          });
        },
        dispatch,
      });
    }
  }

  return (
    <Container>
      <Formik
        initialValues={params?.carer || { master: false }}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <>
            <Card
              title={t("caregiver")}
              right={
                <CheckBox
                  label={t("primaryCaregiver")}
                  value={values.master}
                  onChange={(checked) => setFieldValue("master", checked)}
                />
              }
              noPadding
            >
              <Form>
                <FormItem name="name" label={t("realName")}>
                  <Input placeholder={t("enterName")} />
                </FormItem>
                <FormItem
                  name="familyTies"
                  label={t("relationship")}
                  labelVerticalAlign={"top"}
                >
                  <SolidRadios
                    enums={filteredFamilyTies(params.filterFamilyTies)}
                  />
                </FormItem>
                <FormItem name="phone" label={t("phoneNumber")}>
                  <Input placeholder={t("enterPhone")} />
                </FormItem>
                <FormItem name="wechat" label={t("wechatAccount")} noBorder>
                  <Input placeholder={t("enterWechat")} />
                </FormItem>
              </Form>
            </Card>
            <LargeButtonContainer>
              <Button
                size="large"
                title={params?.carer ? t("submit") : t("add")}
                onPress={handleSubmit}
              />
            </LargeButtonContainer>
          </>
        )}
      </Formik>
    </Container>
  );
}

const Container = styled.View`
  padding: 20px 28px;
`;
