#!/bin/bash

set -e -u

root_dir="$(cd $(dirname $0)/../ && pwd)"
echo 'Package files into tar file'
cd "${root_dir}"
tar -cvzf app.tar.gz ".expo-shared" "__tests__" "assets" "components" "config" "constants" "navigation" "screens" "App.js" "app.json" "babel.config.js" "docker-compose.yml" "Dockerfile" "jsconfig.json" "package.json" "startDocker.sh" "yarn.lock" 

echo 'Package done.'