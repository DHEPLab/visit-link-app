#!/bin/bash

set -e -u

root_dir="$(cd $(dirname $0)/../ && pwd)"

echo 'Package files into zip file'
cd "${root_dir}"
tar --exclude -cvzf app.tar.gz "dist" "etc" "docker-compose.yml" "startDocker.sh"

echo 'Package done.'
