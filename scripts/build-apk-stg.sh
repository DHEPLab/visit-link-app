#!/bin/bash

EXPO_ANDROID_KEYSTORE_PASSWORD="keystorepassword" \
EXPO_ANDROID_KEY_PASSWORD="keypassword" \
turtle build:android \
  --type apk \
  --keystore-path ./keystore/dev.jks \
  --keystore-alias "keyalias" \
  --allow-non-https-public-url \
  --public-url https://stg.healthyfutures.cloud/expo/sdk44/android-index.json