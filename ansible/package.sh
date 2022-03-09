#!/bin/bash

set -e -u

root_dir="$(cd $(dirname $0)/../ && pwd)"

echo 'Package files into zip file'
cd "${root_dir}"
tar -cvzf app.tar.gz "dist"

echo 'Package done.'
