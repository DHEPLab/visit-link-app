module.exports = function (api) {
  api.cache(true);
  return {
    plugins: ['wildcard'],
    presets: ['babel-preset-expo'],
  };
};
