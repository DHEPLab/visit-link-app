import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

import Form from "./elements/Form";
import Card from "./elements/Card";
import FormItem from "./elements/FormItem";
import Input from "./elements/Input";
import Button from "./elements/Button";
import Cascader from "./elements/Cascader";
import LargeButtonContainer from "./LargeButtonContainer";

import Pcas from "../constants/pcas-code.json";
import { styled } from "../utils/styled";

export default function AddressForm({
  onSubmit,
  initialValues = {},
  submitting,
}) {
  const { t } = useTranslation("AddressForm");

  const validationSchema = Yup.object().shape({
    area: Yup.string().required(t("required")),
    location: Yup.string()
      .max(200, t("locationMaxLength"))
      .required(t("required")),
  });

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <>
            <Card title={t("addressInfo")} noPadding>
              <Form>
                <FormItem
                  name="area"
                  label={t("area")}
                  labelWidth={44}
                  labelAlign={"right"}
                >
                  <Cascader options={Pcas} placeholder={t("selectArea")} />
                </FormItem>
                <FormItem
                  name="location"
                  label={t("detailedAddress")}
                  labelWidth={44}
                  labelAlign={"right"}
                  labelVerticalAlign={"start"}
                  noBorder
                >
                  <Input
                    placeholder={t("enterDetailedAddress")}
                    multiline={true}
                  />
                </FormItem>
              </Form>
            </Card>
            <LargeButtonContainer>
              <Button
                size="large"
                title={t("submit")}
                disabled={submitting}
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
