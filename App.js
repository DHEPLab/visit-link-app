import "react-native-gesture-handler";
import React, { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { ToastAndroid } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { setStatusBarStyle } from "expo-status-bar";
import { Asset } from "expo-asset";
import fundebug from "fundebug-reactnative";
import { useTranslation } from "react-i18next";
import "./i18n";

import { Provider, useDispatch, useSelector } from "react-redux";
import {
  closeGlobalSubmitErrorMessage,
  netInfo,
  restoreToken,
} from "./actions";
import { uploadOfflineBabies } from "./cache/uploadData";

import Http from "./utils/http";
import Navigator from "./navigation/Navigator";
import { Colors } from "./constants";
import { useBoolState } from "./utils";
import store from "./store";
import "./config";

import { Message } from "./components";
import { ConfirmModal } from "./components/modal/confirm";
import { PromptModal } from "./components/modal/prompt";
export default function App(props) {
  const [isLoadingComplete, loadingComplete] = useBoolState();

  fundebug.init({
    apikey: "my-secret-token-to-change-in-production",
  });

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    setStatusBarStyle("light");
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const net = await NetInfo.fetch();

        // Restore token from async storage
        const token = await Http.token();
        store.dispatch(restoreToken(token));

        if (!net.isInternetReachable) {
          return ToastAndroid.show("当前处于离线模式", ToastAndroid.LONG);
        }
        uploadOfflineBabies();

        // pre download offline assets
        Asset.fromModule(
          require("./assets/images/error-message.png"),
        ).downloadAsync();
        try {
          // Check whether the token is valid
          token && (await Http.get("/api/account/profile"));
        } catch (e) {
          // Token is invalid
          store.dispatch(restoreToken(null));
          throw e;
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        loadingComplete();
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
    return NetInfo.addEventListener((state) => store.dispatch(netInfo(state)));
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={Colors.theme}>
        <Navigator />
        <GlobalErrorMessage />
        <ConfirmModal />
        <PromptModal />
      </NavigationContainer>
    </Provider>
  );
}

function GlobalErrorMessage() {
  const { visible } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const { t } = useTranslation("App");

  return (
    <Message
      error
      visible={visible}
      title={t("submitFailed")}
      content={t("networkError")}
      buttonText={t("understood")}
      onButtonPress={() => dispatch(closeGlobalSubmitErrorMessage())}
    />
  );
}
