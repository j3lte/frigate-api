#! /bin/bash

npx openapi-typescript https://raw.githubusercontent.com/blakeblackshear/frigate/refs/heads/dev/docs/static/frigate-api.yaml -o ./src/frigate-api.d.ts
