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

ToastAndroid.showWithGravity = jest.fn();
ToastAndroid.show = jest.fn();
global.fetch = jest.fn();
