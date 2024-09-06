import { UseTranslationResponse } from "react-i18next";
import { object, string } from "yup";

export const carerSchema = (
  t: UseTranslationResponse<"CreateCarer", undefined>["t"],
) => {
  return object().shape({
    name: string()
      .matches(/^[\p{L}\p{M}\p{Zs}’'·-]{1,50}$/u, t("nameValidation"))
      .required(t("required")),
    familyTies: string().required(t("required")),
    phone: string()
      .matches(/^\+?\d{5,20}$/, t("phoneValidation"))
      .required(t("required")),
    wechat: string().nullable().max(20, t("wechatValidation")),
  });
};
