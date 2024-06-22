## What's inside?

This Turborepo (monorepo) includes the following apps:

- `frontend`: a Next.js app
- `backend`: a NestJS app

Each app is 100% TypeScript

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Install Dependencies

NOTE: This monorepo requires yarn version `3.6.1`. You can install it by running:

```sh
yarn set version 3.6.1
```

To install all dependencies, run the following command:

```sh
yarn
```

### Build

To build all apps, run the following command:

```sh
yarn build
```

### Develop

To run the dev server for both `frontend` and `backend` apps, run the following command:

```sh
yarn dev
```

NOTE: Make sure all the setup steps for both the frontend and backend apps where completed to install and configure everything correctly.

## Assumptions Made

- Pagination is offset based and the frontend sets it to 5 by default.
- The DB is initially seeded with 10 pokemon records using Prisma.
- The `imageUrl` field is set to `null` by default and there is not image upload when creating a card to simplify implementation.
- I assumed showing the battle results in a dialog would make for a better UX. Also displays additional info.
- Tailwind was used for styling to get fast prototyping.
