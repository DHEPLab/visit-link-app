import React, { useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { SplashScreen } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { setStatusBarStyle } from 'expo-status-bar';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { restoreToken, netInfo } from './actions';

import Http from './utils/http';
import Navigator from './navigation/Navigator';
import { Colors } from './constants';
import { useBoolState } from './utils';
import './config';

const store = createStore(
  rootReducer,
  // Debugging Redux
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function App(props) {
  const [isLoadingComplete, loadingComplete] = useBoolState();

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
      </NavigationContainer>
    </Provider>
  );
}
