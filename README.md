# Healthy Future App

[RURAL EDUCATION ACTION PROGRAM](https://reap.fsi.stanford.edu/). Policy change and research to help China's invisible poor.

## Platform

Only supports Android HD, Android 9 Pie or higher

Recommended resolution 1200x1920

## Expo

[Expo](http://expo.io/) is a framework and a platform for universal React applications. It is a set of tools and services built around React Native and native platforms that help you develop, build, deploy, and quickly iterate on iOS, Android, and web apps from the same JavaScript/TypeScript codebase.

### Automatic Updates

By default, Expo will check for updates automatically when your app is launched and will try to fetch the latest published version. If a new bundle is available, Expo will attempt to download it before launching the experience. If there is no network connection available, or it has not finished downloading in 30 seconds, Expo will fall back to loading a cached version of your app, and continue trying to fetch the update in the background (at which point it will be saved into the cache for the next app load).

## Build Android Apk

[Turtle](https://github.com/expo/turtle) CLI is a command line interface for building Expo standalone apps. You can use it both on your CI and your private computer.

```
$ EXPO_ANDROID_KEYSTORE_PASSWORD="" \
EXPO_ANDROID_KEY_PASSWORD="" \
turtle build:android \
  --type apk \
  --keystore-path ../healthy-app-prod.jks \
  --keystore-alias "keyalias" \
  --allow-non-https-public-url \
  --public-url https://healthyfutures.cloud/expo/android-index.json
```

## Pipeline

### Stage build

```
$ ansible/build.sh
```

### Stage deploy

```
$ ansible/package.sh
$ DEPLOY_GROUP=prod ansible/deploy.sh
```

## Available Scripts

### `yarn start`

Starts a local server for your app and gives you a URL to it

### `yarn export:<env>`

Env: dev, stg, prod

Exports the static files of the app for hosting it on a web server.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn test:ci`

Launches the test runner in the CI mode and display the coverage rate.

## Reference

[Build Standalone Expo .apk and .ipa with Turtle CLI](https://www.robincussol.com/build-standalone-expo-apk-ipa-with-turtle-cli/)
