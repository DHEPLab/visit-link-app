import React from "react";
import Constants from "expo-constants";
import { Image, RefreshControl, ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Http from "../utils/http";
import { styled } from "@/utils/styled";
import { Colors } from "../constants";
import { useBoolState, useFetch } from "@/utils";
import Storage from "../cache/storage";
import { LinearGradient } from "expo-linear-gradient";
import {
  Button,
  Card,
  Message,
  Modal,
  StaticField,
  StaticForm,
} from "../components";
import { signOut } from "@/actions";
import QrCodeScanner from "./QrCodeScanner";

export default function Me({ navigation }) {
  const { t } = useTranslation("Me");
  const dispatch = useDispatch();
  const { navigate } = navigation;
  const [user, refresh, refreshing] = useFetch("/api/account/profile");

  const [visible, open] = useBoolState();
  const [confirmVisible, openConfirm, closeConfirm] = useBoolState();

  const chw = user?.chw;
  const supervisor = chw?.supervisor;

  async function handleLogout() {
    closeConfirm();
    await Http.signOut();
    clearCache();
    open();
    dispatch(signOut());
  }

  function clearCache() {
    Storage.setNextVisit({});
    Storage.setBabies([]);
    Storage.setOfflineBabies([]);
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={Colors.colors}
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
      >
        <Header {...Colors.linearGradient}>
          <Message visible={visible} title={t("logOutSuccessfully")} />
          <BackgroundImage source={require("../assets/images/me-bg.png")} />
          <HeaderTitle>{t("account")}</HeaderTitle>
          <NameContainer>
            <Name>{user.realName}</Name>
            <Identity>
              {t("id")}: {chw?.identity}
            </Identity>
          </NameContainer>
          <InfoContainer>
            <ContactInfoContainer>
              <PhoneNumber>{user.phone}</PhoneNumber>
              <Location>{user.chw?.tags?.join("\n")}</Location>
            </ContactInfoContainer>
            <QrCodeScannerContainer>
              <QrCodeScanner navigation={navigation} />
            </QrCodeScannerContainer>
          </InfoContainer>
        </Header>

        <CardsContainer>
          <Card
            title={t("myAccount")}
            right={
              <Button
                title={t("resetMyPassword")}
                onPress={() => navigate("ChangePassword")}
              />
            }
            background={require("../assets/images/account.png")}
            backgroundWidth={40}
            backgroundHeight={50}
          >
            <StaticForm>
              <StaticField label={t("username")}>{user.username}</StaticField>
              <StaticField label={t("password")}>******</StaticField>
            </StaticForm>
          </Card>
          {supervisor?.id && (
            <Card
              title={t("mySupervisor")}
              background={require("../assets/images/supervisor.png")}
              backgroundWidth={40}
              backgroundHeight={50}
            >
              <StaticForm>
                <StaticField label={t("supervisorName")}>
                  {supervisor?.realName}
                </StaticField>
                <StaticField label={t("supervisorPhoneNumber")}>
                  {supervisor?.phone}
                </StaticField>
              </StaticForm>
            </Card>
          )}
        </CardsContainer>
      </ScrollView>

      <Logout>
        <Button title={t("logOut")} type="weaken" onPress={openConfirm} />
      </Logout>
      <Version>
        {t("version")} v{Constants.expoConfig.version}
      </Version>

      <Modal
        title={t("logOut")}
        visible={confirmVisible}
        contentText={t("logOutConfirmation")}
        okText={t("logOut")}
        cancelText={t("cancel")}
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
  min-height: 160px;
  padding: 0 28px 20px 28px;
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
  flex: 10;
`;

const Identity = styled(WhiteText)`
  font-size: 10px;
  font-weight: bold;
  flex: 2;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const ContactInfoContainer = styled.View`
  flex: 11;
`;

const QrCodeScannerContainer = styled.View`
  flex: 1;
`;

const PhoneNumber = styled(WhiteText)`
  margin-bottom: 8px;
`;

const Location = styled(WhiteText)`
  font-size: 10px;
`;
