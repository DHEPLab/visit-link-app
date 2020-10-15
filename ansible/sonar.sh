#!/bin/bash

sonar-scanner \
  -Dsonar.projectKey=healthy-future-app \
  -Dsonar.sources=. \
  -Dsonar.host.url=${SONAR_HOST_URL} \
  -Dsonar.login=${SONAR_LOGIN} \
  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
  -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info
