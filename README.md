# Healthy Future App

![main workflow](https://github.com/DHEPLab/visit-link-app/actions/workflows/main.yml/badge.svg)

## Supported Platforms

Recommended resolution: 1200x1920

Supports only Android Pad, Android 9 Pie or higher (other versions untested; tested on HUAWEI MediaPad M5 lite 8 which is 1200x1920 FHD, 283 PPI, 8.0 inch)

## Local Development

* NodeJS version v20 LTS
* Expo SDK 51

[Prepare an Android emulator](https://docs.expo.io/workflow/android-studio-emulator/)

```shell
$ yarn
$ yarn start                  # start the .env.development config which use localhost:8080 api
$ NODE_ENV='test' yarn start  # start the .env.test config which use real dev server
```

Run on Android device/emulator by clicking in the Expo Development Tools or use the official [Expo Client App](https://expo.io/tools#client) to scan the QR code for preview.


Recommended tool: [React Native Debugger](https://github.com/jhen0409/react-native-debugger)

## External Dependencies

healthy-future-backend，API endpoint located in `constants/Config.js`

## Building Android APK

```shell
$ npm install --global eas-cli
```

Make suer you have correct installation and environment variables set.
* Android SDK
* Android NDK: 26.1.10909125 (Install use Android Studio SDK Manager)
* CMake 3.22.1 (Install use Android Studio SDK Manager)

Then you can use command build APK locally
```shell
EAS_LOCAL_BUILD_SKIP_CLEANUP=1 eas build --profile development --platform android --local
```

You can also use EAS CLI to build APK remotely.
```shell
eas build --profile development --platform android
```

## Docs

The documentation we use the mkdocs format, you can use command to preview the docs locally, also you can import the docs into the internal dev portal, e.g. [Backstage](https://backstage.io/)
```shell
$ docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material
```

## Reference

- [Expo](https://docs.expo.io/)
