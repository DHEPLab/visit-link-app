import i18next from "i18next";

export const Role = {
  ROLE_CHW: '工作人员',
  ROLE_SUPERVISOR: '督导',
  ROLE_ADMIN: '管理员',
};

export const Gender = {
  FEMALE: i18next.t('Gender.FEMALE', { ns: "enum" }),
  MALE: i18next.t('Gender.MALE', { ns: "enum" }),
  UNKNOWN: i18next.t('Gender.UNKNOWN', { ns: "enum" }),
};

export const GenderIcon = {
  MALE: 'gender-male',
  FEMALE: 'gender-female',
  UNKNOWN: 'gender-male-female',
};

export const VisitStatus = {
  NOT_SUBMIT: '待提交',
  NOT_STARTED: '待开始',
  UNDONE: '未完成',
  EXPIRED: '已过期',
  DONE: '已完成',
};

export const BabyStage = {
  EDC: i18next.t('BabyStage.EDC', { ns: "enum" }),
  BIRTH: i18next.t('BabyStage.BIRTH', { ns: "enum" }),
};


export const AssistedFood = {
  true: i18next.t('AssistedFood.TRUE', { ns: "enum" }),
  false: i18next.t('AssistedFood.FALSE', { ns: "enum" }),
};

export const FeedingPattern = {
  BREAST_MILK: i18next.t('FeedingPattern.BREAST_MILK', { ns: "enum" }),
  MILK_POWDER: i18next.t('FeedingPattern.MILK_POWDER', { ns: "enum" }),
  MIXED: i18next.t('FeedingPattern.MIXED', { ns: "enum" }),
  TERMINATED: i18next.t('FeedingPattern.TERMINATED', { ns: "enum" }),
};

export const FamilyTies = {
  MOTHER: i18next.t('RELATIVES.MOTHER', { ns: "enum" }),
  FATHER: i18next.t('RELATIVES.FATHER', { ns: "enum" }),
  GRANDMOTHER: i18next.t('RELATIVES.GRANDMOTHER', { ns: "enum" }),
  GRANDMA: i18next.t('RELATIVES.GRANDMA', { ns: "enum" }),
  GRANDFATHER: i18next.t('RELATIVES.GRANDFATHER', { ns: "enum" }),
  GRANDPA: i18next.t('RELATIVES.GRANDPA', { ns: "enum" }),
  OTHER: i18next.t('RELATIVES.OTHER', { ns: "enum" }),
};

export const ModuleStatus = {
  DONE: '已完成',
  UNDONE: '待开始',
};

export const QrType = {
  MODULE_ID: "MODULE_ID"      // module的id
}