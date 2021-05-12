module.exports = () => {
  if (process.env.APP_ENV === "production") {
    return require("./app.prod.json");
  } else if (process.env.APP_ENV === "staging") {
    return require("./app.stg.json");
  } else if (process.env.APP_ENV === "dev") {
    return require("./app.dev.json");
  } else {
    return require("./app.local.json");
  }
};
