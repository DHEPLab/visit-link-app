import React from "react";

import { styled } from "../utils/styled";

import Visit from "../utils/visit";
import Card from "./elements/Card";
import Button from "./elements/Button";
import StaticForm from "./elements/StaticForm";
import StaticField from "./elements/StaticField";
import { useTranslation } from "react-i18next";

/**
 * A card component that represents a lesson, with options for validation, status display, and navigation.
 *
 * @param {Object} props - The properties passed to the lesson card component.
 * @param {() => void} [props.validate] - An optional function to validate the lesson or its content.
 * @param {boolean} [props.disabled] - If true, the card is disabled and user interactions are blocked (optional).
 * @param {string} props.status - The status of the lesson, such as "completed", "in-progress", etc.
 * @param {Object} [props.lesson] - The lesson data to be displayed in the card.
 * @param {Object} props.navigation - The navigation object used for routing to other screens.
 *
 * @returns {JSX.Element} A card component that represents a lesson with various interactive features.
 */
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
