# README

The code in this `copied` folder has all been copied from other packages. It will need to be kept in sync with those other packages over time.

## Why Have We Done This?

We had several packages, all depending upon each other:

- @ganbarodigital/ts-lib-error-reporting
- @ganbarodigital/ts-lib-http-types
- @ganbarodigital/ts-lib-packagename
- @ganbarodigital/ts-lib-value-objects

The main `tsc` compiler didn't have a problem with this. Unfortunately, Mocha + `ts-node` couldn't compile and run our unit tests successfully.

We're hoping that breaking these circular dependencies solves this problem.