import React, { useEffect, useState, useContext } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Http from '../utils/http';
import { styled } from '../config/styled';
import { Colors } from '../constants/*';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, StaticForm, StaticFormItem } from '../components/*';
import AuthContext from '../context/AuthContext';

export default function Me() {
  const [user, setUser] = useState({});
  const navigation = useNavigation();
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    Http.get('/api/user/profile').then((r) => {
      setUser(r);
    });
  }, []);

  return (
    <>
      <Header start={[0, 0]} end={[1, 1]} colors={Colors.colors}>
        <BackgroundImage source={require('../assets/images/me-bg.png')} />
        <HeaderTitle>个人中心</HeaderTitle>
        <NameContainer>
          <Name>{user.realName}</Name>
          <Identity>ID: {user.identity}</Identity>
        </NameContainer>
        <InfoContainer>
          <View>
            <PhoneNumber>{user.phone}</PhoneNumber>
            <Location>某某某某某某省/某某某某市/某某某某某某县</Location>
          </View>
        </InfoContainer>
      </Header>
      <CardsContainer>
        <Card
          title="账户信息"
          right={
            <Button
              title="修改密码"
              onPress={() => navigation.push('ChangePassword')}
            />
          }
        >
          <StaticForm>
            <StaticFormItem label="账户名称">{user.username}</StaticFormItem>
            <StaticFormItem label="账户密码">******</StaticFormItem>
          </StaticForm>
        </Card>
        <Card title="督导信息">
          <StaticForm>
            <StaticFormItem label="督导姓名">
              张三李四张三李四张三
            </StaticFormItem>
            <StaticFormItem label="督导电话">18616881618</StaticFormItem>
          </StaticForm>
        </Card>
      </CardsContainer>
      <Logout>
        <Button title="退出登录" logout onPress={() => signOut()} />
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
