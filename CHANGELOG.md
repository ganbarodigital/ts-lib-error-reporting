# CHANGELOG

## Introduction

This CHANGELOG tells you:

* when a release was made
* what is in each release

It also tells you what changes have been completed, and will be included in the next tagged release.

For each release, changes are grouped under these headings:

* _Backwards-Compatibility Breaks_: a list of any backwards-compatibility breaks
* _New_: a list of new features. If the feature came from a contributor via a PR, make sure you link to the PR and give them a mention here.
* _Fixes_: a list of bugs that have been fixed. If there's an issue for the bug, make sure you link to the GitHub issue here.
* _Dependencies_: a list of dependencies that have been added / updated / removed.
* _Tools_: a list of bundled tools that have been added / updated / removed.

## develop branch

The following changes have been completed, and will be included in the next tagged release.

### New

* Generic errors
  - added `NotImplementedError`

## v0.3.1

Released Tuesday, 5th May 2020.

### New

* Added some helpers for working with `catch` values:
  - added `extractReasonFromCaught()`
  - added `extractStackFromCaught()`

### Tools

* Upgraded the `scripts` section in `package.json` to our latest standard.

## v0.3.0

Released Thursday, 16th April 2020.

### Backwards-Compatibility Breaks

* Dropped support for the `extra` section in `ErrorTableTemplate`s
  - `ErrorTableTemplateWithNoExtraData` and `ErrorTableTemplateWithExtraData` are replaced with just `ErrorTableTemplate`
  - The `extra` section no longer appears in your `ErrorTable`
  - The index signature on `ErrorTable` has been simplified

### Tests

* Added missing code coverage for `ValueObject`
* Added missing code coverage for `UnreachableCodeError`

## v0.2.2

Released Monday, 6th April 2020.

### Dependencies

* Upgraded all deps to resolve a vulnerability in `minimist`
* Moved TypeScript et al into the `devDependencies` section

## v0.2.1

Released Thursday, 20th February 2020.

### Fixes

* Resolved circular dependency between PackageErrorTable, packageNameFrom() and httpStatusCodeFrom()
  - circular dependency only shows up when libraries that use us try and compile their unit tests (sigh)

## v0.2.0

Released Thursday, 20th February 2020.

In this release, we're taking steps to ensure that it's easier to keep our copied definitions in sync with the external libraries.

### New

* Core code from `ts-lib-http-types` has been added
* Core code from `ts-lib-packagename` has been added
* Core code from `ts-lib-value-objects` has been added

## v0.1.1

Released Thursday, 20th February 2020.

### Dependencies

* Copied in code from these packages, to break circular dependency problems affecting unit test compilation:
  - ts-lib-http-types
  - ts-lib-packagename
  - ts-lib-value-objects

## v0.1.0

Released Thursday, 20th February 2020.

### Dependencies

* Updated to latest `ts-lib-packagename` and `ts-lib-http-types` releases.

## v0.0.4

Released Wednesday, 19th February 2020.

### Dependencies

* Switched to the `v2` API of `@ganbarodigital/ts-lib-value-objects`

## v0.0.3

Released Wednesday, 19th February 2020.

### Fixes

* `lib/v1` now exports our types.

## v0.0.2

Released Wednesday, 19th February 2020.

### Dependencies

* Do not depend on unreleased versions of packages.

## v0.0.1

Released Wednesday, 19th February 2020.

### New

* Added `AppError` base class
* Added `isAppError()` type guard
* Added `ErrorTable` interface
* Added `ERROR_TABLE` constant
* Added `UnreachableCodeError` error class
* Added `AllExtraData` type
* Added `ExtraDataTemplate` interface
* Added `ExtraLogsOnlyData` interface
* Added `ExtraPublicData` interface
* Added `NoExtraDataTemplate` type
* Added `OnError` callback type
* Added `THROW_THE_ERROR` default error handler function
* Added `StructuredProblemReport` value object
* Added `StructuredProblemReportDataWithExtraData` interface
* Added `StructuredProblemReportDataWithNoExtraData` interface