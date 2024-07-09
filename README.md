# Core Workflows

[![npm version](https://badge.fury.io/js/@universal-packages%2Fcore-workflows.svg)](https://www.npmjs.com/package/@universal-packages/core-workflows)
[![Testing](https://github.com/universal-packages/universal-core-workflows/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-core-workflows/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-core-workflows/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-core-workflows)

[Workflows](https://github.com/universal-packages/universal-workflows) universal-core module abstraction.

## Install

```shell
npm install @universal-packages/core-workflows

npm install @universal-packages/core
```

## Initialization

```shell
ucore initialize workflows
```

## Run a workflow

```shell
ucore exec workflow workflow-name
```

## Typescript

In order for typescript to see the global types you need to reference the types somewhere in your project, normally `./src/globals.d.ts`.

```ts
/// <reference types="@universal-packages/core-workflows" />
```

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
