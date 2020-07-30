jest.mock('@react-native-community/async-storage', () => {
  let storage = {};
  return {
    getItem: (key) => storage[key],
    setItem: (key, value) => (storage[key] = value),
  };
});
