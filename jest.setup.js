import { ToastAndroid } from 'react-native';

jest.mock('@react-native-async-storage/async-storage', () => {
  let storage = {};
  return {
    getItem: (key) => storage[key],
    setItem: (key, value) => (storage[key] = value),
  };
});

ToastAndroid.showWithGravity = jest.fn();
ToastAndroid.show = jest.fn();
