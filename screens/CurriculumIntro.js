import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../constants';
import { styled } from '../utils/styled';
import { GhostNavigatorHeader, BottomRightBackground, Button } from '../components';

export default function CurriculumIntro() {
  const navigation = useNavigation();

  return (
    <Container {...Colors.linearGradient}>
      <BottomRightBackground
        width={280}
        height={268}
        source={require('../assets/images/curriculum-bg.png')}
      />
      <GhostNavigatorHeader navigation={navigation} />
      <TextContainer>
        <Name>课堂名称课堂名称课堂名称课堂名称课堂名称：</Name>
        <Description>
          课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述课堂描述
        </Description>
      </TextContainer>
      <ButtonContainer>
        <Button info title="下一步" onPress={() => navigation.navigate('CurriculumModules')} />
      </ButtonContainer>
    </Container>
  );
}

const TextContainer = styled.View`
  padding: 0 28px;
`;

const Container = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Name = styled.Text`
  width: 240px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-top: 24px;
`;

const Description = styled.Text`
  color: #fff;
  font-size: 10px;
  margin-top: 24px;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 60px;
  width: 100%;
`;
