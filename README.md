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
npm install @ganbarodigital/ts-lib-apperror
```

```typescript
// add this import to your Typescript code
import { ErrorType } from "@ganbarodigital/ts-lib-apperror/lib/v1"
```

__VS Code users:__ once you've added a single import anywhere in your project, you'll then be able to auto-import anything else that this library exports.

## V1 API

### ErrorTypeStruct

```typescript
import { PackageName } from "@ganbarodigital/ts-lib-packagename/lib/v1";

/**
 * the unique ID of each type of error, as an anonymous object structure
 * for convenience
 */
export interface ErrorTypeStruct {
    context: PackageName;
    name: string;
}
```

### ErrorType

```typescript
import { PackageName } from "@ganbarodigital/ts-lib-packagename/lib/v1";
import { ValueObject } from "@ganbarodigital/ts-lib-value-objects/lib/v2";

/**
 * the unique ID of each type of error
 *
 * this is used in structured problem reports to tell developers:
 *
 * - which package the error was declared in
 * - which error inside that package was reported
 *
 * this is used in application error handlers to complete an RFC-7809
 * structured problem report
 */
export class ErrorType extends ValueObject<ErrorTypeStruct> {
    /**
     * smart constructor
     */
    public static from(input: ErrorTypeStruct): ErrorType {
        return new ErrorType(input);
    }

    /**
     * returns the name of the package that defined this error.
     *
     * this may include the name of a sub-module.
     */
    public get context(): PackageName {
        return this.value.context;
    }

    /**
     * returns this error's name.
     *
     * error names are unique within each `this.context` only.
     */
    public get name(): string {
        return this.value.name;
    }

    /**
     * returns the fully-qualified name of this error type, suitable
     * for putting into an RFC-7809 structured problem report
     */
    public toString(): string {
        return this.value.context + "/" + this.value.name;
    }
}
```

For example:

```typescript
import { packageNameFrom } from "@ganbarodigital/ts-lib-packagename/lib/v1";
import { ErrorType } from "@ganbarodigital/ts-lib-apperror/lib/v1";

const invalidUuidDataErrorType = ErrorType.from({
    context: packageNameFrom("@ganbarodigital/ts-lib-uuid-parser/v1"),
    name: "invalid-uuid-data-error",
});
```

### isErrorType()

```typescript
/**
 * type guard. confirms if a proposed name for an ErrorType fits
 * our legal scheme or not.
 */
export function isErrorType(input: unknown): input is ErrorType;
```

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