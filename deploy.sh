#!/bin/bash

set -e

# This script intended to be run inside Docker with AWS credentials passed
# in from iam-docker-run.  See README.md for example deployment usage.

if [ -z "$AWS_ENV" ]; then
    echo "Must provide AWS_ENV environment variable"
    exit 1
fi

if [ "$AWS_ENV" == "prod" ]; then
  ng build  --prod --configuration=production
  export SUBDOMAIN="app"
else
  ng build --configuration=development
  export SUBDOMAIN="app-dev"
fi

# empty the bucket first
aws s3 rm s3://$SUBDOMAIN.rosa.bot --recursive

aws s3 cp \
  ./dist/forgotpw-webapp/ \
  s3://$SUBDOMAIN.rosa.bot/ \
  --recursive
