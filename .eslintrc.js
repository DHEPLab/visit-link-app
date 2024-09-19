// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": 1,
    "react-hooks/exhaustive-deps": "off",
    "comma-dangle": ["off"],
  },

  env: {
    jest: true,
    node: true,
  },
};
