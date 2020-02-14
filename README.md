# Structured Errors for TypeScript

## Introduction

This library offers a structured `AppError` type, based on [RFC 7807][RFC 7807]. It gives you a standard structure to use for creating Errors that are easy to report and handle.

- [Introduction](#introduction)
- [Quick Start](#quick-start)
- [V1 API](#v1-api)
  - [ErrorTypeStruct](#errortypestruct)
  - [ErrorType](#errortype)
  - [isErrorType()](#iserrortype)
- [NPM Scripts](#npm-scripts)
  - [npm run clean](#npm-run-clean)
  - [npm run build](#npm-run-build)
  - [npm run test](#npm-run-test)
  - [npm run cover](#npm-run-cover)

## Quick Start

```
# run this from your Terminal
npm install @ganbarodigital/ts-lib-error-reporting
```

```typescript
// add this import to your Typescript code
import { AppError } from "@ganbarodigital/ts-lib-error-reporting/lib/v1"
```

__VS Code users:__ once you've added a single import anywhere in your project, you'll then be able to auto-import anything else that this library exports.

## V1 API

TBD.

## NPM Scripts

### npm run clean

Use `npm run clean` to delete all of the compiled code.

### npm run build

Use `npm run build` to compile the Typescript into plain Javascript. The compiled code is placed into the `lib/` folder.

`npm run build` does not compile the unit test code.

### npm run test

Use `npm run test` to compile and run the unit tests. The compiled code is placed into the `lib/` folder.

### npm run cover

Use `npm run cover` to compile the unit tests, run them, and see code coverage metrics.

Metrics are written to the terminal, and are also published as HTML into the `coverage/` folder.

[RFC 7807]: https://tools.ietf.org/html/rfc7807