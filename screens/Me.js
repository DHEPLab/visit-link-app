import React from 'react';
import { Alert, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useFetch } from '../utils';
import Http from '../utils/http';
import { styled } from '../utils/styled';
import { Colors } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, StaticForm, StaticField } from '../components';
import { useDispatch } from 'react-redux';
import { signOut } from '../actions';

export default function Me() {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const [user] = useFetch('/api/account/profile');

  const chw = () => user.chw || {};
  const supervisor = () => chw().supervisor || {};

  function openAlert() {
    Alert.alert(
      '您确定要退出登录吗？',
      '您确定要退出登录吗？',
      [
        {
          text: '稍后再说',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: '退出登录',
          onPress: async () => {
            await Http.signOut();
            dispatch(signOut());
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <>
      <Header {...Colors.linearGradient}>
        <BackgroundImage source={require('../assets/images/me-bg.png')} />
        <HeaderTitle>个人中心</HeaderTitle>
        <NameContainer>
          <Name>{user.realName}</Name>
          <Identity>ID: {chw().identity}</Identity>
        </NameContainer>
        <InfoContainer>
          <View>
            <PhoneNumber>{user.phone}</PhoneNumber>
            {/* <Location>某某某某某某省/某某某某市/某某某某某某县</Location> */}
          </View>
        </InfoContainer>
      </Header>
      <CardsContainer>
        <Card
          title="账户信息"
          right={<Button title="修改密码" onPress={() => navigate('ChangePassword')} />}
        >
          <StaticForm>
            <StaticField label="账户名称">{user.username}</StaticField>
            <StaticField label="账户密码">******</StaticField>
          </StaticForm>
        </Card>
        {supervisor().id && (
          <Card title="督导信息">
            <StaticForm>
              <StaticField label="督导姓名">{supervisor().realName}</StaticField>
              <StaticField label="督导电话">{supervisor().phone}</StaticField>
            </StaticForm>
          </Card>
        )}
      </CardsContainer>
      <Logout>
        <Button title="退出登录" logout onPress={openAlert} />
      </Logout>
    </>
  );
}

const Logout = styled.View`
  position: absolute;
  bottom: 40px;
  width: 100%;
`;

const CardsContainer = styled.View`
  padding: 20px 28px;
`;

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
  margin-top: 28px;
  font-weight: bold;
`;

const NameContainer = styled.View`
  margin-top: 18px;
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
