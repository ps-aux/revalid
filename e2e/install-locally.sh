#!/usr/bin/env bash

project_root="$(dirname $(readlink -f $0))/.."

cd ${project_root}
npm run build
npm pack

mv ps-aux-* e2e/
cd e2e
npm i ps-aux-*
rm ps-aux-*
npm test
