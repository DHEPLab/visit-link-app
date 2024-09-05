import React from "react";
import { ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import { styled } from "../utils/styled";
import FormItem from "../components/elements/FormItem";
import Message from "../components/elements/Message";
import { useBoolState } from "../utils";
import InputFormItem from "../components/elements/InputFormItem";
import { Colors } from "../constants";
import { Button, Input } from "../components";
import RadioGroup from "../components/elements/RadioGroup";
import CheckBoxGroup from "../components/elements/CheckBoxGroup";
import storage from "../cache/storage";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export default function QuestionScreen({ navigation, route }) {
  const { params } = route;
  const { data, lessonId, visitId } = params;
  const [errorMessageVisble, openErrorMessage, closeErrorMessage] =
    useBoolState();

  function onSubmit(values) {
    const resultList = Object.values(values).map((answer, i) => {
      const type = data.questions[i].type;
      const result = {
        titleNo: i + 1,
        name: data.questions[i].value?.title.trim(),
      };
      if (type === "Radio") {
        result.answer =
          answer?.check + (answer?.input ? "," + answer?.input : "") || "";
      } else if (type === "Checkbox") {
        result.answer = answer
          .map((e) => e?.check + (e.input ? "," + e.input : ""))
          .join("/n");
      } else {
        result.answer = answer;
      }
      return result;
    });
    storage.setAnswers(visitId, { lessonId: lessonId, answers: resultList });
    navigation.navigate("LessonModules", {
      ...(params.prevParams || {}),
    });
  }

  const { t } = useTranslation();

  const QuestionTypeEnum = {
    Text: t("enum:QuestionType.Text"),
    Checkbox: t("enum:QuestionType.Checkbox"),
    Radio: t("enum:QuestionType.Radio"),
  };

  return (
    <>
      <Header {...Colors.linearGradient}>
        <Escape>
          <Button
            type="text"
            title={t("Question:exit")}
            onPress={navigation.goBack}
          />
        </Escape>
        <Name>{data.name}</Name>
      </Header>
      <Formik initialValues={{}} validateOnChange={false} onSubmit={onSubmit}>
        {({ handleSubmit, validateForm, values }) => (
          <StyledScrollView>
            <ModuleCard>
              {data.questions &&
                data.questions.map((question, index) => (
                  <View key={index}>
                    <QuestionTitle>
                      <QuestionType>
                        （{QuestionTypeEnum[question.type]}）
                      </QuestionType>
                      {`${index + 1}.${question?.value?.title.trim()}`}
                    </QuestionTitle>
                    {question.type === "Text" ? (
                      <QuestionInputCard>
                        <InputFormItem
                          name={`${index + 1}`}
                          noBorder
                          validate={(value) => (value ? "" : "Required！")}
                        >
                          <Input placeholder={t("Form:pleaseInput")} />
                        </InputFormItem>
                      </QuestionInputCard>
                    ) : (
                      <QuestionRadioCard>
                        <FormItem
                          name={`${index + 1}`}
                          noBorder
                          validate={(value) => (value ? "" : "Required！")}
                        >
                          {question.type === "Radio" ? (
                            <RadioGroup options={question?.value?.options} />
                          ) : (
                            <CheckBoxGroup options={question?.value?.options} />
                          )}
                        </FormItem>
                      </QuestionRadioCard>
                    )}
                  </View>
                ))}
            </ModuleCard>
            <ButtonContainer>
              <Button
                size="large"
                title={t("Question:complete")}
                onPress={() => {
                  validateForm(values)
                    .then((res) => {
                      if (Object.keys(res).length === 0) {
                        handleSubmit();
                      } else {
                        openErrorMessage();
                      }
                    })
                    .catch((e) => {
                      console.error(e);
                      openErrorMessage();
                    });
                }}
              />
            </ButtonContainer>
          </StyledScrollView>
        )}
      </Formik>
      <Message
        error
        visible={errorMessageVisble}
        buttonText={t("App:understood")}
        onButtonPress={closeErrorMessage}
        title={t("Question:unsaved")}
        content={t("Session:quizTips")}
      />
    </>
  );
}

const Escape = styled.View`
  position: absolute;
  right: 28px;
  top: 20px;
  z-index: 10;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 40px;
`;

const StyledScrollView = styled(ScrollView)`
  padding: 20px 28px;
`;

const ModuleCard = styled.View`
  padding: 20px 24px;
  padding-bottom: 5px;
  border-radius: 8px;
  background: #fff;
`;

const Description = styled.Text`
  font-size: 10px;
  color: #fff;
  margin-top: 6px;
`;

const Name = styled(Description)`
  font-weight: bold;
  margin-top: 12px;
  width: 280px;
`;

const Header = styled(LinearGradient)`
  padding: 0 28px;
  padding-top: 10px;
  min-height: 84px;
  padding-bottom: 10px;
  width: 100%;
`;

const QuestionTitle = styled.Text`
  min-height: 24px;
  font-size: 12px;
  color: #525252;
  line-height: 20px;
`;

const QuestionRadioCard = styled.View`
  margin: 3px 0px 10px;
  border-radius: 8px;
  border: 3px solid #ffede2;
  padding: 10px;
`;

const QuestionInputCard = styled.View`
  margin: 3px 0px 10px;
  border-radius: 30px;
  border: 2px solid #ffede2;
`;

const QuestionType = styled.Text`
  padding: 1px 4px;
  font-size: 8px;
  color: #ff794f;
`;
