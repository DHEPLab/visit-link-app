import React from 'react';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { styled } from '../utils/styled';
import { Colors } from '../constants';
import { GhostNavigatorHeader, BottomRightBackground, Button, ModuleItem } from '../components';

export default function LessonModules() {
  const navigation = useNavigation();
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
        {[0, 1, 2, 3].map((key) => (
          <ModuleItem key={key} value={{ status: 'DONE', number: '01', name: '123b1b23bb31b23' }} />
        ))}
        <ModuleItem
          onPress={() => navigation.navigate('Module')}
          value={{ status: 'UNDONE', number: '02', name: 'b23b2b3b12331' }}
        />
        <ButtonContainer>
          <Button size="large" title="完成家访" disabled={true} />
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
