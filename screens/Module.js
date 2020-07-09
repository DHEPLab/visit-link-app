import React from 'react';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styled } from '../utils/styled';
import { Colors } from '../constants';
import { Button } from '../components';
import { useNavigation } from '@react-navigation/native';
import Text from '../components/curriculum/Text';

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
          <Text value={{ type: 'script', html: '<b>abc</b><p>123</p>' }} />
          <Text value={{ type: 'instruction', html: '<b>abc</b><p>123</p>' }} />
          <Text value={{ type: 'reference', html: '<b>abc</b><p>123</p>' }} />
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
