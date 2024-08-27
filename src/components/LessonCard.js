import React from "react";

import { styled } from "../utils/styled";

import Visit from "../utils/visit";
import Card from "./elements/Card";
import Button from "./elements/Button";
import StaticForm from "./elements/StaticForm";
import StaticField from "./elements/StaticField";

export default function LessonCard({
  validate,
  disabled,
  status,
  lesson,
  navigation,
}) {
  function startVisitPreview() {
    if (validate && !validate()) return;
    navigation.navigate("LessonIntro", { id: lesson.id, preview: true });
  }

  return (
    <Card
      title="课堂安排"
      right={
        Visit.statusNotStart(status) && (
          <Button
            title="预览"
            disabled={disabled}
            onPress={startVisitPreview}
          />
        )
      }
    >
      <LessonName>{lesson?.name}</LessonName>
      <StaticForm>
        {lesson?.moduleNames?.map((name, index) => (
          <StaticField key={name} label={`模块 ${index + 1}`}>
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
