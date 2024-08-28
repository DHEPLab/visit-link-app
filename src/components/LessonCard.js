import React from "react";

import { styled } from "../utils/styled";

import Visit from "../utils/visit";
import Card from "./elements/Card";
import Button from "./elements/Button";
import StaticForm from "./elements/StaticForm";
import StaticField from "./elements/StaticField";
import { useTranslation } from "react-i18next";

export default function LessonCard({
  validate,
  disabled,
  status,
  lesson,
  navigation,
}) {
  const { t } = useTranslation();
  function startVisitPreview() {
    if (validate && !validate()) return;
    navigation.navigate("LessonIntro", { id: lesson.id, preview: true });
  }

  return (
    <Card
      title={t("Visits:sessionIncluded")}
      right={
        Visit.statusNotStart(status) && (
          <Button
            title={t("Visits:preview")}
            disabled={disabled}
            onPress={startVisitPreview}
          />
        )
      }
    >
      <LessonName>{lesson?.name}</LessonName>
      <StaticForm>
        {lesson?.moduleNames?.map((name, index) => (
          <StaticField key={name} label={`${t("Visits:module")} ${index + 1}`}>
            {name}
          </StaticField>
        ))}
      </StaticForm>
    </Card>
  );
}

const LessonName = styled.Text`
  color: #525252;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
`;
