import { ToastAndroid } from "react-native";
import mockRNCNetInfo from "@react-native-community/netinfo/jest/netinfo-mock.js";

jest.mock("@react-native-community/netinfo", () => mockRNCNetInfo);

jest.mock("@react-native-async-storage/async-storage", () => {
  let storage = {};
  return {
    getItem: (key) => storage[key],
    setItem: (key, value) => (storage[key] = value),
  };
});

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: "en",
    },
  }),
  Trans: ({ children }) => children,
  Translation: ({ children }) => children(() => ""),
  withTranslation: () => (Component) => (props) => null,
}));

jest.mock("i18next", () => ({
  t: (key) => key,
}));

ToastAndroid.showWithGravity = jest.fn();
ToastAndroid.show = jest.fn();
global.fetch = jest.fn();
