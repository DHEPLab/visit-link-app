import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import * as WebBrowser from 'expo-web-browser';

import Http from '../utils/http';
import Storage from '../cache/storage';
import { styled } from '../utils/styled';
import { Colors } from '../constants';
import { GhostNavigatorHeader, BottomRightBackground, Button, ModuleItem } from '../components';

export default function LessonModules({ navigation, route }) {
  const { params } = route;
  const [lesson] = Storage.useLesson(params?.id);
  const [nextModule, reloadNextModule] = Storage.useNextModule();
  const canFinish = nextModule > lesson.modules?.length - 1;

  useEffect(() => {
    if (!params.preview && params.moduleId && params.finished) {
      Storage.setNextModule(nextModule + 1);
      reloadNextModule();
    }
  }, [route.params?.moduleId]);

  function status(index) {
    return index < nextModule ? 'DONE' : 'UNDONE';
  }

  async function finish() {
    if (!params.preview) {
      if (params.from === 'Visit') {
        // from Visit screen, online mode, direct submit
        await Http.put(`/api/visits/${params?.visitId}/status`, {
          visitStatus: 'DONE',
          nextModuleIndex: nextModule,
        });
        Storage.cleanVisitStatus();
        Storage.setNextModule(0);
      } else {
        // from Home screen, offline mode, save visit status to storage
        await Storage.setVisitStatus(params?.visitId, 'DONE');
      }
    }

    // if net connected and have a questionnaire, open a browser
    const net = await NetInfo.fetch();
    if (net.isConnected && lesson.questionnaireAddress) {
      await WebBrowser.openBrowserAsync(lesson.questionnaireAddress);
    }
    navigation.navigate(params.from);
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
            onPress={() => navigation.navigate('Module', { id: module.id, lessonId: params.id })}
          />
        ))}
        <ButtonContainer>
          <Button size="large" title="完成家访" disabled={!canFinish} onPress={finish} />
        </ButtonContainer>
      </StyledScrollView>
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
