import React from "react";
import * as Yup from "yup";
import moment from "moment";
import { Formik } from "formik";
import {
  Gender,
  BabyStage,
  FeedingPattern,
  AssistedFood,
} from "../constants/enums";

import Card from "./elements/Card";
import Form from "./elements/Form";
import FormItem from "./elements/FormItem";
import Input from "./elements/Input";
import SolidRadios from "./elements/SolidRadios";
import DatePicker from "./elements/DatePicker";
import Button from "./elements/Button";
import LargeButtonContainer from "./LargeButtonContainer";
import { useTranslation } from "react-i18next";

export default function BabyForm({
  onSubmit,
  submitBtnText = "提交",
  initialValues = {},
}) {
  const { t } = useTranslation("BabyForm");
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[\u4e00-\u9fa5]{2,10}$/, t("nameValidation"))
      .required(t("required")),
    gender: Yup.string().required(t("required")),
    stage: Yup.string().required(t("required")),
  });

  function validate(values) {
    const errors = {};
    switch (values.stage) {
      case "EDC":
        if (!values.edc) errors.edc = t("required");
        break;
      case "BIRTH":
        if (!values.birthday) errors.birthday = t("required");
        if (values.assistedFood == null) errors.assistedFood = t("required");
        if (!values.feedingPattern) errors.feedingPattern = t("required");
        break;
    }
    return errors;
  }

  // the baby stage cannot be changed from birth to edc
  function FilteredBabyStage(stage) {
    if (stage === "BIRTH") {
      return { BIRTH: BabyStage["BIRTH"] };
    }
    return BabyStage;
  }
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      validateOnChange={false}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values }) => (
        <>
          <Card title={t("babyInfo")} noPadding>
            <Form>
              <FormItem name="name" label={t("babyName")}>
                <Input placeholder={t("enterBabyName")} />
              </FormItem>
              <FormItem name="gender" label={t("babyGender")}>
                <SolidRadios enums={Gender} />
              </FormItem>
              <FormItem
                name="stage"
                label={t("growthStage")}
                noBorder={!values.stage}
              >
                <SolidRadios enums={FilteredBabyStage(initialValues.stage)} />
              </FormItem>
              {values.stage === "EDC" && (
                <FormItem name="edc" label={t("dueDate")} noBorder>
                  <DatePicker
                    minimumDate={new Date()}
                    maximumDate={moment().add(280, "day").toDate()}
                  />
                </FormItem>
              )}
              {values.stage === "BIRTH" && (
                <>
                  <FormItem name="birthday" label={t("birthDate")}>
                    <DatePicker maximumDate={new Date()} />
                  </FormItem>
                  <FormItem name="assistedFood" label={t("supplementFood")}>
                    <SolidRadios enums={AssistedFood} />
                  </FormItem>
                  <FormItem
                    name="feedingPattern"
                    label={t("feedingMethods")}
                    noBorder
                  >
                    <SolidRadios enums={FeedingPattern} />
                  </FormItem>
                </>
              )}
            </Form>
          </Card>
          <LargeButtonContainer>
            <Button
              size="large"
              title={submitBtnText || t("submit")}
              onPress={handleSubmit}
            />
          </LargeButtonContainer>
        </>
      )}
    </Formik>
  );
}
