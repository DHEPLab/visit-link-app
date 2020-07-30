import React, { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { SplashScreen } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import './config';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { restoreToken } from './actions';

import Http from './utils/http';
import Navigator from './navigation/Navigator';
import { Colors } from './constants';
import { useBoolState } from './utils';

const store = createStore(
  rootReducer,
  // Debugging Redux
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function App(props) {
  const [isLoadingComplete, loadingComplete] = useBoolState();

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        NetInfo.fetch().then((state) => {
          console.log('Connection type', state.type);
          console.log('Is connected?', state.isConnected);
        });

        // Restore token from async storage
        const token = await Http.token();
        store.dispatch(restoreToken(token));

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
    return NetInfo.addEventListener((state) => {
      console.log('Event Connection type', state.type);
      console.log('Event Is connected?', state.isConnected);
    });
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
