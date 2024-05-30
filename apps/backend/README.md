## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Optimizations and other Considerations

1. Replace default Express server for Fastify for lower request latency
2. Replace default tsc compiler for SWC to boost compilation times
3. Add DB level check constraints to attack and hp cols
4. Add API swagger docs to all endpoint routes

## Assumptions Made

- entity assumptions
- validation assumptions
- domain rule assumptions
- resistance and weakness assumptions
- more?
