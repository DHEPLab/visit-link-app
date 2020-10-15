#!/bin/bash

sonar-scanner \
  -Dsonar.projectKey=healthy-future-app \
  -Dsonar.sources=. \
  -Dsonar.host.url=${SONAR_HOST_URL} \
  -Dsonar.login=${SONAR_LOGIN}
