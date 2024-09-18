// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "react-hooks/exhaustive-deps": "off",
  },

  env: {
    jest: true,
    node: true,
  },
};
