import React from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styled } from '../config/styled';
import { Colors } from '../constants/*';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/*';

export default function Me() {
  const navigation = useNavigation();

  return (
    <>
      <Header start={[0, 0]} end={[1, 1]} colors={Colors.colors}>
        <BackgroundImage source={require('../assets/images/me-bg.png')} />
        <HeaderTitle>个人中心</HeaderTitle>
        <NameContainer>
          <Name>张三李四张三李四张三</Name>
          <Identity>ID: 66666888</Identity>
        </NameContainer>
        <InfoContainer>
          <View>
            <PhoneNumber>18618282929</PhoneNumber>
            <Location>某某某某某某省/某某某某市/某某某某某某县</Location>
          </View>
          <Button
            ghost
            title="修改资料"
            onPress={() => navigation.push('ChangeProfile')}
          />
        </InfoContainer>
      </Header>
    </>
  );
}

const Header = styled(LinearGradient)`
  width: 100%;
  height: 160px;
  padding: 0 28px;
  position: relative;
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  height: 148px;
  width: 220px;
  right: 0;
  bottom: 0;
`;

const WhiteText = styled.Text`
  color: #fff;
`;

const HeaderTitle = styled(WhiteText)`
  font-size: 12px;
  color: #fff;
  align-self: center;
  margin-top: 18px;
  font-weight: bold;
`;

const NameContainer = styled.View`
  margin-top: 28px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const Name = styled(WhiteText)`
  font-size: 20px;
  font-weight: bold;
`;

const Identity = styled(WhiteText)`
  font-size: 10px;
  font-weight: bold;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const PhoneNumber = styled(WhiteText)`
  margin-bottom: 8px;
`;

const Location = styled(WhiteText)`
  font-size: 10px;
`;
