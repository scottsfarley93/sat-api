#!/usr/bin/env bash
set -e # halt script on error

if [ "$TRAVIS_BRANCH" == "master" ]; then
    sls function deploy -a -s production
    sls endpoint deploy -a -s production
else
    sls function deploy -a -s dev
    sls endpoint deploy -a -s dev
fi
