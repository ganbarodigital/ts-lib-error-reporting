//
// Copyright (c) 2020-present Ganbaro Digital Ltd
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//
//   * Re-distributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//
//   * Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in
//     the documentation and/or other materials provided with the
//     distribution.
//
//   * Neither the names of the copyright holders nor the names of his
//     contributors may be used to endorse or promote products derived
//     from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
// INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
// LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
// ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
import { ErrorTable } from "../ErrorTable";
import { ErrorTableTemplate } from "../ErrorTableTemplate/ErrorTableTemplate";
import { HttpStatusCode } from "../internal/HttpStatusCode/HttpStatusCode";
import { HttpStatusCodeOutOfRangeTemplate } from "./HttpStatusCodeOutOfRange";
import { InvalidPackageNameTemplate } from "./InvalidPackageName";
import { NotAnIntegerTemplate } from "./NotAnInteger";
import { NotImplementedTemplate } from "./NotImplemented";
import { PackageName } from "../internal/PackageName/PackageName";
import { UnreachableCodeTemplate } from "./UnreachableCode";

/**
 * we use this to track which package has thrown the errors
 *
 * we have to type-cast this here to prevent a circular dependency.
 * in your own packages, you'll call `packageNameFrom()` instead.
 *
 * the same goes for all the HttpStatusCode type-casting in the table.
 */
export const PACKAGE_NAME = "@ganbarodigital/ts-lib-error-reporting/lib/v1" as PackageName;

/**
 * the ErrorTable for the package `@ganbarodigital/ts-lib-error-reporting`
 *
 * You can extend this in your own package, if you want to reuse the errors
 * that we provide.
 */
export class PackageErrorTable implements ErrorTable {
    // everything in this class has to follow the same structure
    [key: string]: ErrorTableTemplate<any, string>;

    public "http-status-code-out-of-range": HttpStatusCodeOutOfRangeTemplate = {
        packageName: PACKAGE_NAME,
        errorName: "http-status-code-out-of-range",
        detail: "input falls outside the range of a valid HTTP status code",
        status: 422 as HttpStatusCode,
    };

    public "invalid-package-name": InvalidPackageNameTemplate = {
        packageName: PACKAGE_NAME,
        errorName: "invalid-package-name",
        detail: "package name does not meet spec 'isPackageName()'",
        status: 422 as HttpStatusCode,
    };

    public "not-an-integer": NotAnIntegerTemplate = {
        packageName: PACKAGE_NAME,
        errorName: "not-an-integer",
        detail: "input must be an integer; was a float",
        status: 422 as HttpStatusCode,
    };

    public "not-implemented": NotImplementedTemplate = {
        packageName: PACKAGE_NAME,
        errorName: "not-implemented",
        detail: "this function or feature has not been implemented",
        status: 500 as HttpStatusCode,
    };

    /**
     * use this error in if/else & the default clause of switch statements
     * to spot things that should never happen
     */
    public "unreachable-code": UnreachableCodeTemplate = {
        packageName: PACKAGE_NAME,
        errorName: "unreachable-code",
        status: 500 as HttpStatusCode,
        detail: "this code should never execute",
    };
}

/**
 * a list of all of the errors that this package can throw
 */
export const ERROR_TABLE = new PackageErrorTable();