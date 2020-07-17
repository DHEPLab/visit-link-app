import React from 'react';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styled } from '../utils/styled';
import { Colors } from '../constants';
import { Button } from '../components';
import { useNavigation } from '@react-navigation/native';
import Text from '../components/curriculum/Text';
import Media from '../components/curriculum/Media';

export default function Module() {
  const navigation = useNavigation();
  return (
    <>
      <Header {...Colors.linearGradient}>
        <Escape>
          <Button text title="退出模块" onPress={navigation.goBack} />
        </Escape>
        <Name>模块名称模块名称模块名称模块名称模块名称</Name>
        <Description>
          模块描述模块描述模块描述模块描述模块描述模块描述模块描述模块描述模块描述模块描述模块描述模块描述模块
        </Description>
      </Header>
      <StyledScrollView>
        <ModuleCard>
          <Text value={{ type: 'instruction', html: '<b>abc</b>' }} />
          <Text value={{ type: 'script', html: '<p>123</p><b>abc</b>' }} />
          <Text value={{ type: 'reference', html: '<p>123</p><b>abc</b>' }} />
          <Media
            value={{
              type: 'Video',
              file: 'https://interactive-examples.mdn.mozilla.net/media/examples/flower.mp4',
              text: '花开的时候',
            }}
          />
          <Media
            value={{
              type: 'Picture',
              file:
                'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1089874897,1268118658&fm=26&gp=0.jpg',
              text: '快乐的一只小青蛙',
            }}
          />
        </ModuleCard>
        <ButtonContainer>
          <Button size="large" title="下一步" />
          <LastStepButton>
            <Button info title="上一步" />
          </LastStepButton>
        </ButtonContainer>
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

const LastStepButton = styled.View`
  margin-top: 10px;
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
`;

const Header = styled(LinearGradient)`
  padding: 0 28px;
  padding-top: 10px;
  height: 84px;
  width: 100%;
`;
