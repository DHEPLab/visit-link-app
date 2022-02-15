import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';

import Http from '../utils/http';
import Storage from '../cache/storage';
import { styled } from '../utils/styled';
import { Colors } from '../constants';
import { useBoolState } from '../utils';
import Message from '../components/elements/Message';

import { GhostNavigatorHeader, BottomRightBackground, Button, ModuleItem } from '../components';
import QuestionnaireItem from '../components/QuestionnaireItem'
import { uploadVisitLocation } from '../utils/visit';

export default function LessonModules({ navigation, route }) {
  const { params } = route;
  const [lesson] = Storage.useLesson(params?.id);
  const [babyId, setBabyId] = useState()
  const [nextModule, reloadNextModule] = Storage.useNextModule();
  const canFinish = nextModule > lesson.modules?.length - 1;
  const [questionnaire, setQuestionnaire] = useState()
  const { isConnected } = useSelector((state) => state.net);
  const [errorMessageVisble, openErrorMessage, closeErrorMessage] = useBoolState();

  useEffect(() => {
    /*
      使用原始 originModuleId, 因为 moduleId 会在跳转到其他模块时发生改变；
      正确监听 originModuleId 的改变以完成当前模块
    */
    if (!params.preview && params.originModuleId && params.finished) {
      Storage.setNextModule(nextModule + 1);
      reloadNextModule();
    }
  }, [route.params?.originModuleId]);

  useEffect(() => {
    Http.get(`/api/visits/${params.visitId}`).then(({ baby })=> {
      setBabyId(baby.id)
      uploadVisitLocation(baby.id);
    })
  }, [params])

  useEffect(() => {
    queryQuestionnaire()
  }, [lesson]);

  function status(index) {
    return index < nextModule ? 'DONE' : 'UNDONE';
  }

  async function finish() {
    const answersData = await Storage.getAnswers(params?.visitId)
    if (!answersData && questionnaire) {
      openErrorMessage()
      return
    }
    uploadVisitLocation(babyId);
    const answers = answersData?.answers;
    if (!params.preview) {
      if (isConnected) {
        const uncommitted = await Storage.getUncommittedVisitStatus();
        // from Visit screen, online mode, direct submit
        await Http.put(`/api/visits/${params?.visitId}/status`, {
          visitStatus: 'DONE',
          startTime: uncommitted[params?.visitId].startTime,
          nextModuleIndex: nextModule,
          questionnaireRecords: answers
        });
        Storage.setAnswers(params?.visitId, []);
        Storage.committedVisitStatus();
        Storage.setNextModule(0);
      } else {
        // from Home screen, offline mode, save visit status to storage
        await Storage.setUncommittedVisitStatus(params?.visitId, 'DONE');
      }
    }

    // if net connected and have a questionnaire, open a browser
    if (isConnected && lesson.questionnaireAddress) {
      await WebBrowser.openBrowserAsync(lesson.questionnaireAddress);
    }

    navigation.navigate(params.from);
  }

  async function queryQuestionnaire() {
    const { questionnaire } = lesson;
    setQuestionnaire(questionnaire)
  }

  function toQuestion () {
    navigation.navigate('Question', { id: questionnaire.id, data: questionnaire, lessonId: lesson.id, visitId: params?.visitId})
  }

  return (
    <>
      <Header {...Colors.linearGradient}>
        <BottomRightBackground
          width={140}
          height={134}
          source={require('../assets/images/curriculum-bg.png')}
        />
        <GhostNavigatorHeader navigation={navigation} />
        <Hint>你需要在本次家访中完成{'\n'}如下全部模块：</Hint>
      </Header>
      <StyledScrollView>
        {lesson.modules?.map((module, index) => (
          <ModuleItem
            key={module.id}
            value={{ ...module, status: status(index) }}
            disabled={!params.preview && index !== nextModule}
            onPress={() => navigation.navigate('Module', { id: module.id, originId: module.id, lessonId: params.id })}
          />
        ))}
        {questionnaire && <QuestionnaireItem
          name={questionnaire.name}
          disabled={!params.preview && lesson.modules.length > nextModule}
          onPress={() => toQuestion()}
        />}
        <ButtonContainer>
          <Button size="large" title="完成家访" disabled={!canFinish} onPress={finish} />
        </ButtonContainer>
      </StyledScrollView>
      <Message
        error
        visible={errorMessageVisble}
        buttonText="知道了"
        onButtonPress={closeErrorMessage}
        title="无法完成家访"
        content="问卷未答，请作答"
      />
    </>
  );
}

const ButtonContainer = styled.View`
  margin-top: 40px;
`;

const StyledScrollView = styled(ScrollView)`
  padding: 20px 28px;
`;

const Header = styled(LinearGradient)`
  width: 100%;
  height: 160px;
`;

const Hint = styled.Text`
  color: #fff;
  margin-left: 28px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`;
