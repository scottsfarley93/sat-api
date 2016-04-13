#!/usr/bin/env bash
set -e # halt script on error

if [ "$TRAVIS_BRANCH" == "master" ]; then
    sls function deploy -a -s production -r us-east-1
    sls endpoint deploy -a -s production -r us-east-1
else
    sls function deploy -a -s dev -r us-east-1
    sls endpoint deploy -a -s dev -r us-east-1
fi
