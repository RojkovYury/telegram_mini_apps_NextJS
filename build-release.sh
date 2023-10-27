#!/bin/bash -eux

KEY="b23233e1-4c7f-43a8-a336-d63a71bedbfa"

#export GENERATE_SOURCEMAP=false
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production
export NEXT_PUBLIC_BASE_PATH=/upay-admin-bot
export API_BASE_URL=https://qa5.clubber.me/upay-bot/api

yarn build

# see https://nextjs.org/docs/deployment#docker-image
# and https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
mkdir -p ./target
cp -R ./public ./target/
cp -a .next/standalone/* ./target/
cp -a .next/standalone/.next ./target/
cp -a .next/static target/.next/

