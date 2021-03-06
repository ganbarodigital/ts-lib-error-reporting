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
import { PACKAGE_NAME, PackageErrorTable } from "../Errors/PackageErrorTable";
import { HttpStatusCode } from "../internal/HttpStatusCode";
import { NeverABrandedUuidTemplate } from "./NeverABrandedUuid";
import { NeverAFlavouredUuidTemplate } from "./NeverAFlavouredUuid";
import { UnitTestFailureTemplate } from "./UnitTestFailure";
import { UnitTestNoExtraTemplate } from "./UnitTestNoExtra";

export class UnitTestErrorTable extends PackageErrorTable {
    public "never-a-branded-uuid": NeverABrandedUuidTemplate = {
        packageName: PACKAGE_NAME,
        errorName: "never-a-branded-uuid",
        status: 500 as HttpStatusCode,
        detail: "value is not a branded uuid",
    };

    public "never-a-flavoured-uuid": NeverAFlavouredUuidTemplate = {
        packageName: PACKAGE_NAME,
        errorName: "never-a-flavoured-uuid",
        status: 500 as HttpStatusCode,
        detail: "value is not a flavoured uuid",
    };

    public "unit-test-failure": UnitTestFailureTemplate = {
        packageName: PACKAGE_NAME,
        errorName: "unit-test-failure",
        status: 500 as HttpStatusCode,
        detail: "this code should never execute",
    };

    public "unit-test-no-extra": UnitTestNoExtraTemplate = {
        packageName: PACKAGE_NAME,
        errorName: "unit-test-no-extra",
        status: 500 as HttpStatusCode,
        detail: "an example of an error with no extra information",
    };
}

export const UNIT_TEST_ERROR_TABLE = new UnitTestErrorTable();