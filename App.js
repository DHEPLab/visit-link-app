import React, { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { ToastAndroid } from 'react-native';
import { SplashScreen } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { setStatusBarStyle } from 'expo-status-bar';
import { Asset } from 'expo-asset';
import fundebug from 'fundebug-reactnative'

import { Provider, useSelector, useDispatch } from 'react-redux';
import { restoreToken, netInfo, closeGlobalSubmitErrorMessage } from './actions';

import Http from './utils/http';
import Navigator from './navigation/Navigator';
import { Colors } from './constants';
import { useBoolState } from './utils';
import store from './store';
import './config';

import { Message } from './components';

export default function App(props) {
  const [isLoadingComplete, loadingComplete] = useBoolState();

  fundebug.init({
    apikey : '27609b1a4d7f92df3ac938822f5f2d24b434b59042a1ceba944b3164d7934f3e'
  })

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    setStatusBarStyle('light');
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        const net = await NetInfo.fetch();

        // Restore token from async storage
        const token = await Http.token();
        store.dispatch(restoreToken(token));

        if (!net.isConnected) {
          return ToastAndroid.show('当前处于离线模式', ToastAndroid.LONG);
        }

        // pre download offline assets
        Asset.fromModule(require('./assets/images/error-message.png')).downloadAsync();
        try {
          // Check whether the token is valid
          token && (await Http.get('/api/account/profile'));
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
        SplashScreen.hide();
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
      </NavigationContainer>
    </Provider>
  );
}

function GlobalErrorMessage() {
  const { visible } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  return (
    <Message
      error
      visible={visible}
      title="提交失败"
      content="网络发生错误，请稍后重试"
      buttonText="知道了"
      onButtonPress={() => dispatch(closeGlobalSubmitErrorMessage())}
    />
  );
}
