import React from 'react';
import { ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import { styled } from '../utils/styled';
import Form from '../components/elements/Form.js';
import FormItem from '../components/elements/FormItem';
import { Colors } from '../constants';
import { Button, Input } from '../components';
import RadioGroup from '../components/elements/RadioGroup';
import Http from '../utils/http';

export default function QuestionScreen({ navigation, route }) {
  const { params } = route;
  const {data, answers} = params;

  function onSubmit(values) {
    // TODO这里需要组装成{name: key, answer: value}
    Http
      .post('/api/record', {
        baby: {
          ...values
        }
      })
      .then((data) => {
        setTimeout(() => {
          navigation.navigate('LessonModules', {});
        }, 1000);
      })
      .finally(() => {});
  }

  return (
    <>
      <Header {...Colors.linearGradient}>
        <Escape>
          <Button type="text" title="退出问卷" onPress={navigation.goBack} />
        </Escape>
        <Name>{data.name}</Name>
      </Header>

      <StyledScrollView>
        <Formik
          initialValues={answers}
          validateOnChange={false}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form>
              <ModuleCard>
                {data.questions && data.questions.map((question: any, index: number) => 
                  <View key={index}>
                    <QuestionTitle>{`${index+1}.${question?.value?.title}`}</QuestionTitle>
                    {question.type === 'Text' ? <QuestionInputCard>
                        <FormItem name={`${index+1}.${question?.value?.title}`} noBorder>
                          <Input placeholder="请输入" />
                        </FormItem>
                      </QuestionInputCard>:
                      <QuestionRadioCard>
                        <FormItem name={`${index+1}.${question?.value?.title}`} noBorder>
                          <RadioGroup options={question?.value?.options} />
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
            </Form>
          )}
        </Formik>
      </StyledScrollView>
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
