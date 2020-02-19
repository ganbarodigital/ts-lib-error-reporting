# Structured Errors for TypeScript

## Introduction

This library offers a structured `AppError` type, based on [RFC 7807][RFC 7807]. It gives you a standard structure to use for creating Errors that are easy to report and handle.

- [Introduction](#introduction)
- [Quick Start](#quick-start)
- [V1 API](#v1-api)
  - [Introduction](#introduction-1)
  - [Motivation](#motivation)
  - [Bootstrap Error Reporting In Your Package](#bootstrap-error-reporting-in-your-package)
  - [Defining A New Throwable Error](#defining-a-new-throwable-error)
  - [Throwing An Error](#throwing-an-error)
  - [Catching An Error](#catching-an-error)
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

### Introduction

This library gives you:

* an `AppError` base class, which you extend to create your own throwable Errors
* a `StructuredProblemReport`, which holds information about your errors in a standardised format based on [RFC 7807][RFC 7807]
* an `ErrorTable` base class, which you extend to register a list of AppErrors that your code can throw

What makes this library different is that we use TypeScript's type system to enforce the relationship between `ErrorTable` and `AppError`. You literally cannot create and throw an `AppError` unless it has also been defined in the `ErrorTable`.

### Motivation

The very last place you want a runtime error is in the code that reports an error, or handles an error that it has caught in a `try / catch` block. When something has gone wrong, you need to know about it.

We can't eliminate all error-handling runtime errors using TypeScript, but we can make sure that if your `throw` and `catch` code compiles, it will run.

The other difficult problem with error handling is dealing with unknown / undocumented / unexpected exceptions. They need turning into something that you (the developer) can understand in your logs, and into something that you can return to your end-user safely and within the limits of data protection law.

We can make this much easier to handle by ensuring:

* that all errors follow a common structure,
* that all errors declare types for any unique parts of their structure,
* that there's a central list of known errors for you to look at

### Bootstrap Error Reporting In Your Package

When you add the Error Reporting library to your app or package, you need to do these bootstrap activities.

#### Step 1: You Need A PACKAGE_NAME Constant

When you [populate your `ErrorTable`](#step-3-adding-your-new-error-to-your-errortable) later on, you'll be using the name of your app or package in every error that you define.

Define this as a constant now, to save you effort later on.

```typescript
import { packageNameFrom } from "@ganbarodigital/ts-lib-packagename/lib/v1";

export const PACKAGE_NAME = packageNameFrom("<your-package-name>");
```

#### Step 2: You Need An ErrorTable

You must define all of your errors in a central place, called the `ErrorTable`.

Create your `ErrorTable` by implementing the `ErrorTable` interface:

```typescript
import {
  ErrorTable,
  ExtraDataTemplate,
  NoExtraDataTemplate,
} from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

export class MyPackageErrorTable implements ErrorTable {
    // everything in this class has to follow the same structure
    [key: string]: ErrorTableTemplate<any, string, ExtraDataTemplate | NoExtraDataTemplate>;
}

/**
 * a list of errors defined by MyPackage
 *
 * export this, so that any code that uses your package can inspect
 * the list
 */
export const ERROR_TABLE = new MyPackageErrorTable();
```

Now that you've got your `ErrorTable`, you're ready to define the errors that your app / package can throw.

### Defining A New Throwable Error

Here's how to define a new throwable error in your app or package:

1. Define an `ExtraDataTemplate` interface for your new error.
2. Define an `ErrorTableTemplate` for your new error.
3. Add an entry for your new error to your `ErrorTable` class.
4. Define a `StructuredProblemReportData` type for your new error.
5. Define a `StructuredProblemReport` type for your new error.
6. Define a `class` that `extends AppError` (this will be the class that you create and `throw` at runtime)

I'm sorry that it's a lot of steps. We need them:

* to support auto-completion of different error structures when you're writing code
* to enforce type-integrity at compile-time
* to get the code to compile at all

Most of these steps are very small. Because they define types, they don't increase the amount of unit tests you have to write.

#### Step 1: Defining The ExtraData For Your New Error Type

_Extra data_ is data captured at runtime about the error. It's captured to:

* help tell the caller why the error happened
* help you debug and fix a bug in your code

You get to define what this extra data is, and it goes into the template for your error. The Typescript compiler uses your template _at compile time_ to make sure any thrown errors provide all of the extra data you are after.

We split the extra data up into two groups:

* information that can be shared with an end-user (e.g. in an API response, or in a HTML page), and
* information that must only go into your app logs

You decide which extra data fields go into each of these groups. If you don't need any extra data fields at all, we support that too - and we'll show you how to do that shortly.

If you want both `public` and `logsOnly` extra data, extend `AllExtraData`:

```typescript
import { AllExtraData } from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

export interface UnreachableCodeExtraData extends AllExtraData {
    public: {
        // add your own fields and types here
    };
    logsOnly: {
        // add your own fields and types here
    };
}
```

If you only want `public` extra data, extend `ExtraPublicData`:

```typescript
import { ExtraPublicData } from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

export interface UnreachableCodeExtraData extends ExtraPublicData {
    public: {
        // add your own fields and types here
    };
}
```

If you only want `logsOnly` extra data, extend `ExtraLogsOnlyData`:

```typescript
import { ExtraLogsOnlyData } from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

export interface UnreachableCodeExtraData extends ExtraLogsOnlyData {
    logsOnly: {
        // add your own fields and types here
    };
}
```

Finally, if you don't wany any extra data at all, extend `NoExtraDataTemplate`:

```typescript
import { NoExtraDataTemplate } from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

export interface UnreachableCodeExtraData extends NoExtraDataTemplate { }
```

You're now ready to build an `ErrorTableTemplate` for your new error type.

#### Step 2: Creating The Template For Your New Error Type

The _ErrorTableTemplate_ defines the structure that goes into your app/package's `ErrorTable`. Each error has its own `ErrorTableTemplate`, so that each error can have its own structure.

```typescript
import { ErrorTableTemplate } from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

export type UnreachableCodeTemplate = ErrorTableTemplate<
    MyPackageErrorTable,
    "unreachable-code",
    UnreachableCodeExtraData
>;
```

What's going on here?

* The first generic parameter is the name of your `ErrorTable` class.
* Every error gets added to your `ErrorTable` class as a property. The second generic parameter is the name of that property. It _has_ to be a static string. It cannot be a variable or constant that you've defined.
* The third generic property is your error's `ExtraData` interface.

This ties each `ErrorTemplate` to a property on your `ErrorTable` class.

#### Step 3: Adding Your New Error To Your ErrorTable

Add an entry for your error to your `ErrorTable` class:

```typescript
import { httpStatusCodeFrom } from "@ganbarodigital/ts-lib-http-types/lib/v1";
import { packageNameFrom } from "@ganbarodigital/ts-lib-packagename/lib/v1";
import { ErrorTable } from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

export class MyPackageErrorTable implements ErrorTable {
    // everything in this class has to follow the same structure
    [key: string]: ErrorTableTemplate<any, string, ExtraDataTemplate | NoExtraDataTemplate>;

    // this is your new error
    //
    // the property name:
    // - MUST be a static string
    // - MUST match the name used when you defined your ErrorTemplate
    public "unreachable-code": UnreachableCodeTemplate = {
        // this helps devs find out which package defined the error
        packageName: PACKAGE_NAME,
        // this must be the same as the property name
        errorName: "unreachable-code",
        // this is a HTTP status code. try/catch blocks may use it
        // when sending an API response back to an end-user
        status: httpStatusCodeFrom(500),
        // a human-readable description of the error
        detail: "this code should never execute",
        // the `ExtraData` section we defined earlier
        // fill it with dummy or example data here
        extra: {
            logsOnly: {
                function: "the function that threw this error",
            },
        },
    };
}
```

We've finished defining our error. Next, you need to make it possible to create and throw the error at runtime.

#### Step 4: Creating A StructuredProblemReportData Type

Throwable errors are classes that `extend AppError`. `AppError` itself is a JavaScript `Error` class that holds extra information in what we call a `StructuredProblemReport`.

Before you can `extend AppError`, you need to define the structure of the data that goes into the `StructuredProblemReport`:

```typescript
import { StructuredProblemReportData } from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

export type UnreachableCodeData = StructuredProblemReportData<
    MyPackageErrorTable,
    "unreachable-code",
    UnreachableCodeTemplate,
    UnreachableCodeExtraData
>;
```

Once again, we're typing this type to a named property on your `ErrorTable` class.

#### Step 5: Create A StructuredProblemReport Type

Next, you need to define a `StructuredProblemReport` type that contains your `StructuredProblemReportData`.

```typescript
import { StructuredProblemReport } from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

export type UnreachableCodeSRP = StructuredProblemReport<
    MyPackageErrorTable,
    "unreachable-code",
    UnreachableCodeTemplate,
    UnreachableCodeExtraData,
    UnreachableCodeData
>;
```

#### Step 6: Creating A Throwable Error Class

Finally, you can pull it all together, and create a new class that `extends AppError`.

```typescript
import { AppError, AppErrorParams } from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

/**
 * throwable Javascript Error
 */
export class UnreachableCodeError extends AppError<
    ErrorTable,
    "unreachable-code",
    UnreachableCodeTemplate,
    UnreachableCodeExtraData,
    UnreachableCodeData,
    UnreachableCodeSRP
> {
    public constructor(params: UnreachableCodeExtraData & AppErrorParams) {
        const errorDetails: UnreachableCodeData = {
            template: ERROR_TABLE["unreachable-code"],
            errorId: params.errorId,
            extra: {
                logsOnlyData: params.logsOnlyData,
            },
        };

        super(StructuredProblemReport.from(errorDetails));
    }
}
```

As before, the generic parameters are all used to tie your new error to the entry in your `ErrorTable` class. This is how the TypeScript compiler is able to catch problems at compile-time, so that things don't go wrong when you're trying to throw an error at runtime.

The constructor takes an object as its parameter. That object will contain:

* `public`: if your `ExtraDataTemplate` has defined a `public` section,
* `logsOnly`: if your `ExtraDataTemplate` has defined a `logsOnly` section,
* `errorId`: this is an optional string. If present, it should contain a unique ID for this error, as per [RFC 7807][RFC 7807]'s `instance` field.

### Throwing An Error

To throw an error, just create a new error object, and pass in the required extra data:

```typescript
throw new UnreachableCodeError({
    logsOnly: {
        reason: "unsupported type 'X' in switch statement",
    },
    errorId: "abcdef",
});
```

If you forget to pass in the required extra data - or if you pass in data of the wrong type - the TypeScript compiler will refuse to compile the code.

### Catching An Error

Once you've caught the error, you can use `instanceof` _type guards_ as normal:

```typescript
import { isAppError } from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

try {
    // do some work here
} catch (e) {
    if (e instanceof UnreachableCodeError) {
        // TypeScript now knows what `e` is, and
        // VS Code will do auto-completion on the
        // available properties
        //
        // e.details is your StructuredProblemReport
        console.log(
          e.name + ": "
          + e.message + "; "
          + e.details.extra.logsOnly.reason
        );
    } else if (isAppError(e)) {
        // TypeScript now knows that `e` is some kind
        // of AppError, but it doesn't know which
        // specific error
        //
        // you'd use this to write all structured errors
        // out to your logs
        console.log(
          e.name + ": "
          + e.message + "; "
          + JSON.stringify(e.details)
        );
    }
}
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