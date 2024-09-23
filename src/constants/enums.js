import i18next from "i18next";

export const Gender = {
  FEMALE: i18next.t("Gender.FEMALE", { ns: "enum" }),
  MALE: i18next.t("Gender.MALE", { ns: "enum" }),
  UNKNOWN: i18next.t("Gender.UNKNOWN", { ns: "enum" }),
};

export const GenderIcon = {
  MALE: "gender-male",
  FEMALE: "gender-female",
  UNKNOWN: "gender-male-female",
};

export const VisitStatus = {
  NOT_SUBMIT: i18next.t("VisitStatus.NOT_SUBMIT", { ns: "enum" }),
  NOT_STARTED: i18next.t("VisitStatus.NOT_STARTED", { ns: "enum" }),
  UNDONE: i18next.t("VisitStatus.UNDONE", { ns: "enum" }),
  EXPIRED: i18next.t("VisitStatus.EXPIRED", { ns: "enum" }),
  DONE: i18next.t("VisitStatus.DONE", { ns: "enum" }),
};

export const BabyStage = {
  UNBORN: i18next.t("BabyStage.EDC", { ns: "enum" }),
  BORN: i18next.t("BabyStage.BIRTH", { ns: "enum" }),
};

export const AssistedFood = {
  true: i18next.t("AssistedFood.TRUE", { ns: "enum" }),
  false: i18next.t("AssistedFood.FALSE", { ns: "enum" }),
};

export const FeedingPattern = {
  EXCLUSIVE_BREASTFEEDING: i18next.t("FeedingPattern.BREAST_MILK", {
    ns: "enum",
  }),
  FORMULA_FEEDING: i18next.t("FeedingPattern.MILK_POWDER", { ns: "enum" }),
  MIXED_BREAST_FORMULA_FEEDING: i18next.t("FeedingPattern.MIXED", {
    ns: "enum",
  }),
  NO_BREAST_FORMULA_FEEDING: i18next.t("FeedingPattern.TERMINATED", {
    ns: "enum",
  }),
};

export const FamilyTies = {
  MOTHER: i18next.t("RELATIVES.MOTHER", { ns: "enum" }),
  FATHER: i18next.t("RELATIVES.FATHER", { ns: "enum" }),
  PATERNAL_GRANDMOTHER: i18next.t("RELATIVES.GRANDMOTHER", { ns: "enum" }),
  MATERNAL_GRANDMOTHER: i18next.t("RELATIVES.GRANDMA", { ns: "enum" }),
  PATERNAL_GRANDFATHER: i18next.t("RELATIVES.GRANDFATHER", { ns: "enum" }),
  MATERNAL_GRANDFATHER: i18next.t("RELATIVES.GRANDPA", { ns: "enum" }),
  OTHER: i18next.t("RELATIVES.OTHER", { ns: "enum" }),
};

export const ModuleStatus = {
  DONE: i18next.t("enum:ModuleStatus.DONE"),
  UNDONE: i18next.t("enum:ModuleStatus.UNDONE"),
};

export const QrType = {
  MODULE_ID: "MODULE_ID", // module的id
};
