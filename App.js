import React, { useEffect } from 'react';
import { SplashScreen } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import rootReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { restoreToken } from './actions';

import Http from './utils/http';
import { Colors } from './constants';
import { useBoolState } from './utils';
import BottomTabNavigator from './navigation/BottomTabNavigator';

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

        // Restore token from async storage
        const token = await Http.token();
        store.dispatch(restoreToken(token));

        try {
          // Check whether the token is valid
          token && (await Http.get('/api/account/profile'));
        } catch (e) {
          // Token is invalid
          await Http.auth(null);
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
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer theme={Colors.theme}>
          <BottomTabNavigator />
        </NavigationContainer>
      </Provider>
    );
  }
}
