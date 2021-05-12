# Healthy Future App

## 适用平台

推荐分辨率 12000x1920

仅支持 Android Pad，Android 9 Pie 或更高（其他版本未测试，测试机型号 HUAWEI MediaPad M5 lite 8"）

## 本地开发

NodeJS 版本 v12 LTS, Expo SDK 38

[准备 Android 模拟器](https://docs.expo.io/workflow/android-studio-emulator/)

```
$ yarn global add expo-cli@3.23.1
$ yarn
$ yarn start
```

点击 Expo Development Tools 中的 Run on Android device/emulator，也可以使用官方 [Expo Client App](https://expo.io/tools#client) 扫码预览

推荐使用 [React Native Debugger](https://github.com/jhen0409/react-native-debugger)

## 外部依赖

healthy-future-backend，请求地址在 `constants/Config.js`

## 部署脚本

```
$ ansible/build.sh
$ ansible/package.sh
$ DEPLOY_GROUP=prod ansible/deploy.sh
```

## 打包 Android Apk

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

## Reference

- [Expo](https://docs.expo.io/)
- [Build Standalone Expo .apk and .ipa with Turtle CLI](https://www.robincussol.com/build-standalone-expo-apk-ipa-with-turtle-cli/)
