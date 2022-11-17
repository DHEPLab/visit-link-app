#!/bin/bash

set -e -u

echo 'Build with yarn'

yarn config set registry https://registry.npm.taobao.org/
yarn config set ignore-engines true
yarn global add expo-cli@3.23.1
yarn global add sonarqube-scanner
yarn
yarn test:ci
yarn export:dev
yarn export:prod

echo 'Build Done.'
