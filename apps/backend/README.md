## Install deps

```bash
yarn install
```

## Running the dev server

```bash
yarn dev
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Setup Environment Variables

see `.env.EXAMPLE` file

## DB and Prisma Setup

1. Ensure you have a running instance of a Postgres DB.
2. `npx prisma generate`
3. `npx prisma migrate dev`. This will automatically seed the DB if no rows are found. If you prefer to manually seed, run `npx prisma db seed`.
4. You may need to run `npx prisma generate client` to create the client ORM.
5. With this you should be good to go.

## Optimizations and other Follow Up Considerations

1. Replace default Express server for Fastify for lower request latency.
2. Replace default tsc compiler for SWC to boost compilation times.
3. Standardize error responses and error handling into a service provider.
4. Custom logger class
5. Deploy the application to Vercel. Easiest way and most convenient.
6. Add authentication and authorization to protect resources.
7. Standardize response payload format under data key.
8. Apply rate limiting to API routes
