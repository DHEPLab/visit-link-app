import { UseTranslationResponse } from "react-i18next";
import { object, string } from "yup";

export const babySchema = (
  t: UseTranslationResponse<"BabyForm", undefined>["t"],
) => {
  return object().shape({
    name: string()
      .matches(/^[\p{L}\p{M}\p{Zs}’'·-]{1,50}$/u, t("nameValidation"))
      .required(t("required")),
    gender: string().required(t("required")),
    stage: string().required(t("required")),
  });
};
