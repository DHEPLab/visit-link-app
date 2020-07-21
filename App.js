import React, { useEffect } from 'react';
import { SplashScreen } from 'expo';
import { LocaleConfig } from 'react-native-calendars';
import { NavigationContainer } from '@react-navigation/native';

import rootReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { restoreToken } from './actions';

import Http from './utils/http';
import { Colors } from './constants';
import { useBoolState } from './utils';
import Navigator from './navigation/Navigator';

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
          <Navigator />
        </NavigationContainer>
      </Provider>
    );
  }
}

LocaleConfig.locales['zh'] = {
  monthNames: [
    '1 月',
    '2 月',
    '3 月',
    '4 月',
    '5 月',
    '6 月',
    '7 月',
    '8 月',
    '9 月',
    '10 月',
    '11 月',
    '12 月',
  ],
  monthNamesShort: [
    '1 月',
    '2 月',
    '3 月',
    '4 月',
    '5 月',
    '6 月',
    '7 月',
    '8 月',
    '9 月',
    '10 月',
    '11 月',
    '12 月',
  ],
  dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
  today: '今天',
};
LocaleConfig.defaultLocale = 'zh';
