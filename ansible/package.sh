#!/bin/bash

set -e -u

root_dir="$(cd $(dirname $0)/../ && pwd)"
echo 'Package files into tar file'
cd "${root_dir}"
tar --exclude "node_modules" -cvzf app.tar.gz "./"

echo 'Package done.'