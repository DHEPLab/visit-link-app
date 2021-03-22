import React from 'react';
import { ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import { styled } from '../utils/styled';
import FormItem from '../components/elements/FormItem';
import InputFormItem from '../components/elements/InputFormItem';
import { Colors } from '../constants';
import { Button, Input } from '../components';
import RadioGroup from '../components/elements/RadioGroup';
import CheckBoxGroup from '../components/elements/CheckBoxGroup';
import storage from '../cache/storage';

export default function QuestionScreen({ navigation, route }) {
  const { params } = route;
  const {data, lessonId} = params;
  function onSubmit(values) {
    const resultList = Object.values(values).map((n, i) => {
      const type = data.questions[i].type
      if(type ==='Radio') {
        const check = Object.values(n)[0]
        return {titleNo: (i + 1), name: Object.keys(n)[0], answer: check?.check + (check?.input ? ',' + check?.input : '') || ''}
      } else if(type === 'Checkbox') {
        const checkArray = Object.values(n)[0]
        const res = checkArray.map(e => e?.check + (e.input ? ',' + e.input : '')).join('/n')
        return {titleNo: (i + 1), name: Object.keys(n)[0], answer: res}
      } else {
        return {titleNo: (i + 1), name: Object.keys(n)[0], answer: Object.values(n)[0]}
      }
    })
    storage.setAnswers({lessonId: lessonId, answers: resultList});
    navigation.navigate('LessonModules', {});
  }

  return (
    <>
      <Header {...Colors.linearGradient}>
        <Escape>
          <Button type="text" title="退出问卷" onPress={navigation.goBack} />
        </Escape>
        <Name>{data.name}</Name>
      </Header>
      <Formik
        initialValues={({})}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <StyledScrollView>
            <ModuleCard>
              {data.questions && data.questions.map((question: any, index: number) => 
                <View key={index}>
                  <QuestionTitle>{`${index+1}.${question?.value?.title}`}</QuestionTitle>
                  {question.type === 'Text' ? <QuestionInputCard>
                      <InputFormItem name={`${index+1}.${question?.value?.title}`} noBorder>
                        <Input placeholder="请输入" />
                      </InputFormItem>
                    </QuestionInputCard>:
                    <QuestionRadioCard>
                      <FormItem name={`${index+1}.${question?.value?.title}`} noBorder>
                      {question.type === 'Radio' ?
                            <RadioGroup options={question?.value?.options} />:
                            <CheckBoxGroup options={question?.value?.options} />
                          }
                      </FormItem>
                    </QuestionRadioCard>
                    }
                </View>
              )}
            </ModuleCard>
            <ButtonContainer>
              <Button
                size="large"
                title="完成"
                onPress={handleSubmit}
              />
            </ButtonContainer>
          </StyledScrollView>
        )}
      </Formik>
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
  width: 512px;
  height: 24px;
  font-size: 12px;
  font-family: Helvetica;
  color: #525252;
  line-height: 32px;
`

const QuestionRadioCard = styled.View`
  margin: 3px 0px 10px;
  border-radius: 8px;
  border: 3px solid #FFEDE2;
  padding: 10px;
`

const QuestionInputCard = styled.View`
  margin: 3px 0px 10px;
  border-radius: 30px;
  border: 2px solid #FFEDE2;
`
