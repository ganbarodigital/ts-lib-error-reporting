# Structured Errors for TypeScript

## Introduction

This library offers a structured `AppError` type, inspired by [RFC 7807][RFC 7807].

* It gives you a standard structure to use for creating Errors that are easy to report and handle.
* It also gives the TypeScript compiler the information it needs to catch mistakes when you're trying to create and throw errors.
* The structured errors can be converted into the [RFC 7807][RFC 7807] format for API responses.

It also offers an `OnError` callback definition, to help you separate error detection from error handling.

- [Introduction](#introduction)
- [Motivation](#motivation)
  - [Prevent Error Handlers Crashing The Code](#prevent-error-handlers-crashing-the-code)
  - [Handling Errors From Other Code](#handling-errors-from-other-code)
  - [API Responses Containing Errors](#api-responses-containing-errors)
- [Quick Start](#quick-start)
- [v1 API](#v1-api)
  - [Introduction](#introduction-1)
  - [Bootstrap Error Reporting In Your Package](#bootstrap-error-reporting-in-your-package)
  - [Defining A New Throwable Error](#defining-a-new-throwable-error)
  - [Throwing An Error](#throwing-an-error)
  - [Catching An Error](#catching-an-error)
  - [OnError Callbacks](#onerror-callbacks)
- [NPM Scripts](#npm-scripts)
  - [npm run clean](#npm-run-clean)
  - [npm run build](#npm-run-build)
  - [npm run test](#npm-run-test)
  - [npm run cover](#npm-run-cover)

## Motivation

### Prevent Error Handlers Crashing The Code

The very last place you want a runtime error is in the code that reports an error, or handles an error that it has caught in a `try / catch` block. When something has gone wrong, you need to know about it.

We can't eliminate all error-handling runtime errors using TypeScript, but we can make sure that if your `throw` and `catch` code compiles, it will run.

### Handling Errors From Other Code

The other difficult problem with error handling is dealing with unknown / undocumented / unexpected exceptions. They need turning into something that you (the developer) can understand in your logs, and into something that you can return to your end-user safely and within the limits of data protection law.

We can make this much easier to handle by ensuring:

* that all errors follow a common structure,
* that all errors declare types for any unique parts of their structure,
* that there's a central list of known errors for you to look at

### API Responses Containing Errors

Finally, we're backend developers. We mostly write APIs. When we send the details of an error back in an API response, we want that response to follow a standard structure. [RFC 7807][RFC 7807] gives us that standard structure.

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

## v1 API

### Introduction

This library gives you:

* an `AppError` base class, which you extend to create your own throwable Errors
* a `StructuredProblemReport`, which holds information about your errors in a standardised format that is easy to convert to [RFC 7807][RFC 7807] API error responses
* an `ErrorTable` base class, which you extend to register a list of AppErrors that your code can throw
* an `OnError` callback definition, which allows you to separate _error detection_ from _error handling_

What makes this library different is that we use TypeScript's type system to enforce the relationship between `ErrorTable` and `AppError`. You literally cannot create and throw an `AppError` unless it has also been defined in the `ErrorTable`.

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
    ErrorTableTemplate,
} from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

export class MyPackageErrorTable implements ErrorTable {
    // everything in this class has to follow the same structure
    [key: string]: ErrorTableTemplate<any, string>;
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

1. Define an `ErrorTableTemplate` for your new error.
2. Define an `ExtraDataTemplate` interface for your new error.
3. Define a `StructuredProblemReportData` type for your new error.
4. Define a `StructuredProblemReport` type for your new error.
5. Define a `class` that `extends AppError` (this will be the class that you create and `throw` at runtime)
6. Add an entry for your new error to your `ErrorTable` class.

I'm sorry that it's a lot of steps. We need them:

* to support auto-completion of different error structures when you're writing code
* to enforce type-integrity at compile-time
* to get the code to compile at all

Most of these steps are very small. Because they define types, they don't increase the amount of unit tests you have to write.

__Be aware__ that your code won't compile until you've completed all of these steps. This is by design: it forces you to create errors that are correctly published in your `ErrorTable` too.

#### Step 1: Creating The Template For Your New Error Type

The _ErrorTableTemplate_ defines the structure that goes into your app/package's `ErrorTable`. Each error has its own `ErrorTableTemplate`, so that each error can have its own structure.

```typescript
import { ErrorTableTemplate } from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

export type UnreachableCodeTemplate = ErrorTableTemplate<
    MyPackageErrorTable,
    "unreachable-code"
>;
```

#### Step 2: Defining The ExtraData For Your New Error Type

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

#### Step 3: Creating A StructuredProblemReportData Type

Throwable errors are classes that `extend AppError`. `AppError` itself is a JavaScript `Error` class that holds extra information in what we call a `StructuredProblemReport`.

Before you can `extend AppError`, you need to define the structure of the data that goes into the `StructuredProblemReport`.

If your error contains _extra data_, create a type alias for `StructuredProblemReportDataWithExtraData`:

```typescript
import { StructuredProblemReportDataWithExtraData } from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

export type UnreachableCodeData = StructuredProblemReportDataWithExtraData<
    MyPackageErrorTable,
    "unreachable-code",
    UnreachableCodeTemplate,
    UnreachableCodeExtraData
>;
```

If your error does **not** contain _extra data_, create a type alias using `StructuredProblemReportDataWithNoExtraData`:

```typescript
import { StructuredProblemReportDataWithNoExtraData } from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

export type UnreachableCodeData = StructuredProblemReportDataWithNoExtraData<
    MyPackageErrorTable,
    "unreachable-code",
    UnreachableCodeTemplate,
    UnreachableCodeExtraData
>;
```

#### Step 4: Create A StructuredProblemReport Type

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

#### Step 5: Creating A Throwable Error Class

Now, you can pull it all together, and create a new class that `extends AppError`.

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

#### Step 6: Adding Your New Error To Your ErrorTable

Finally, add an entry for your error to your `ErrorTable` class:

```typescript
import { httpStatusCodeFrom } from "@ganbarodigital/ts-lib-http-types/lib/v1";
import { packageNameFrom } from "@ganbarodigital/ts-lib-packagename/lib/v1";
import { ErrorTable, ErrorTableTemplate } from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

export class MyPackageErrorTable implements ErrorTable {
    // everything in this class has to follow the same structure
    [key: string]: ErrorTableTemplate<any, string>;

    // this is your new error
    //
    // the property name:
    // - MUST be a static string
    // - MUST match the name used when you defined your ErrorTableTemplate
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
    };
}
```

At this point, both your error class and your error table should now compile.

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

### OnError Callbacks

Make your code more reusable by separating out _error detection_ from _error handling_.

```typescript
import { OnError, THROW_THE_ERROR } from "@ganbarodigital/ts-lib-error-reporting/lib/v1";

function doSomething(input: string, onError: OnError = THROW_THE_ERROR) {
    // detect if we have a problem
    if (input.length < 10) {
        // but ask the caller what to do about it
        onError(new StringTooShort({
            logsOnly: {
                minLength: 10,
            }
        }));
    }
}
```

Here's the definition of `OnError`:

```typescript
/**
 * signature for an error-handling function
 *
 * error-handling functions are there to delegate error handling back to
 * the caller:
 *
 * * a library function accepts an error-handler as a parameter
 * * the library function is responsible for determining if an error has
 *   occurred
 * * the library function calls the error-handler, and the error-handler
 *   decides what action to take
 *
 * By default, OnError() expects any sub-class of AppError, and it
 * never returns back to the caller. You can override either of these to
 * suit your code.
 *
 * @param err
 *        what error has occurred?
 */
export type OnError<E extends AnyAppError = AnyAppError, R = never> = (err: E) => R;
```

It takes two generic type parameters:

- the type of error it will accept (the default is anything that's an `AppError`),
- what the error handler will return (the default is that it never returns; ie that it must `throw` an error)

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