jest.mock('@react-native-community/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
