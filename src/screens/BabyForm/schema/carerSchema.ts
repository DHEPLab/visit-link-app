import { UseTranslationResponse } from "react-i18next";
import { object, string } from "yup";

export const carerSchema = (
  t: UseTranslationResponse<"CreateCarer", undefined>["t"],
) => {
  return object().shape({
    name: string()
      .matches(/^[\p{L}\p{M}'\- ]{2,10}$/u, t("nameValidation"))
      .required(t("required")),
    familyTies: string().required(t("required")),
    phone: string()
      .matches(/^1[0-9]{10}$/, t("phoneValidation"))
      .required(t("required")),
    wechat: string().nullable().max(20, t("wechatValidation")),
  });
};
