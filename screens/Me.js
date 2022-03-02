import React from 'react';
import Constants from 'expo-constants';
import {Image, RefreshControl, ScrollView, View} from 'react-native';
import {useDispatch} from 'react-redux';

import Http from '../utils/http';
import {styled} from '../utils/styled';
import {Colors} from '../constants';
import {useBoolState, useFetch} from '../utils';
import Storage from '../cache/storage';
import {LinearGradient} from 'expo-linear-gradient';
import {Button, Card, Message, Modal, StaticField, StaticForm} from '../components';
import {signOut} from '../actions';
import QrCodeScanner from "./QrCodeScanner";

export default function Me({ navigation }) {
  const dispatch = useDispatch();
  const { navigate } = navigation;
  const [user, refresh, refreshing] = useFetch('/api/account/profile');

  const [visible, open] = useBoolState();
  const [confirmVisible, openConfirm, closeConfirm] = useBoolState();

  const chw = user?.chw;
  const supervisor = chw?.supervisor;

  async function handleLogout() {
    closeConfirm();
    await Http.signOut();
    clearCache()
    open();
    dispatch(signOut());
  }

  function clearCache () {
    Storage.setNextVisit({});
    Storage.setBabies([])
    Storage.setOfflineBabies([])
  }
  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl colors={Colors.colors} refreshing={refreshing} onRefresh={refresh} />
        }
      >
        <Header {...Colors.linearGradient}>
          <Message visible={visible} title="您已退出登录" />
          <BackgroundImage source={require('../assets/images/me-bg.png')} />
          <HeaderTitle>个人中心</HeaderTitle>
          <NameContainer>
            <Name>{user.realName}</Name>
            <Identity>ID: {chw?.identity}</Identity>
          </NameContainer>
          <InfoContainer>
            <View>
              <PhoneNumber>{user.phone}</PhoneNumber>
              <Location>{user.chw?.tags?.join(', ')}</Location>
            </View>
            <QrCodeScanner onScanned={(v) => console.log(v)}/>
          </InfoContainer>
        </Header>

        <CardsContainer>
          <Card
            title="账户信息"
            right={<Button title="修改密码" onPress={() => navigate('ChangePassword')} />}
            background={require('../assets/images/account.png')}
            backgroundWidth={40}
            backgroundHeight={50}
          >
            <StaticForm>
              <StaticField label="账户名称">{user.username}</StaticField>
              <StaticField label="账户密码">******</StaticField>
            </StaticForm>
          </Card>
          {supervisor?.id && (
            <Card
              title="督导信息"
              background={require('../assets/images/supervisor.png')}
              backgroundWidth={40}
              backgroundHeight={50}
            >
              <StaticForm>
                <StaticField label="督导姓名">{supervisor?.realName}</StaticField>
                <StaticField label="督导电话">{supervisor?.phone}</StaticField>
              </StaticForm>
            </Card>
          )}
        </CardsContainer>
      </ScrollView>

      <Logout>
        <Button title="退出登录" type="weaken" onPress={openConfirm} />
      </Logout>
      <Version>版本号 v{Constants.manifest.version}</Version>

      <Modal
        title="退出登录"
        visible={confirmVisible}
        contentText="您确定要退出登录吗？"
        okText="退出登录"
        cancelText="稍后再说"
        onCancel={closeConfirm}
        onOk={handleLogout}
      />
    </>
  );
}

const Version = styled.Text`
  position: absolute;
  bottom: 10px;
  align-self: center;
  color: #bbb;
  font-size: 9px;
`;

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
