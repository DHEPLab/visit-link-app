import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import storage from '../cache/storage';
import { styled } from '../utils/styled';
import { Colors } from '../constants';
import { GhostNavigatorHeader, BottomRightBackground, Button, ModuleItem } from '../components';

export default function LessonModules({ navigation, route }) {
  const [lesson] = storage.useLesson(route.params?.id);
  const [nextModule, setNextModule] = storage.useNextModule();
  const canFinish = nextModule > lesson.modules?.length - 1;

  useEffect(() => {
    if (route.params.moduleId && route.params.finished) {
      storage.setNextModule(nextModule + 1);
      setNextModule(nextModule + 1);
    }
  }, [route.params?.moduleId]);

  function status(index) {
    return index < nextModule ? 'DONE' : 'UNDONE';
  }

  function finish() {
    navigation.navigate('Home');
    storage.setVisitStatus('DONE');
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
            disabled={index !== nextModule}
            onPress={() =>
              navigation.navigate('Module', { id: module.id, lessonId: route.params.id })
            }
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
