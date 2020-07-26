#!/bin/bash

set -e -u

echo 'Build with yarn'

yarn config set registry https://registry.npm.taobao.org/
yarn global add expo-cli
yarn
yarn test:ci

echo 'Build Done.'
