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
import { httpStatusCodeFrom } from "@ganbarodigital/ts-lib-http-types/lib/v1";
import { expect } from "chai";
import { describe } from "mocha";

import { PACKAGE_NAME } from "..";
import { ErrorTable } from "../ErrorTable";
import { ExtraDataTemplate } from "../ExtraDataTemplate";
import { StructuredProblemTemplate } from "../StructuredProblemTemplate";
import { ErrorType } from "./ErrorType";
import { ErrorTypeStruct } from "./ErrorTypeStruct";

interface UnitErrorExtraDataTemplate extends ExtraDataTemplate {
    extra: {
        publicExtra: {
            field1: string;
        };
        logsOnlyExtra: {
            field2: string;
        };
    };
}

type UnitErrorStructuredProblemTemplate = StructuredProblemTemplate<
    UnitErrorTable,
    "unit-test-failure"
> & UnitErrorExtraDataTemplate;

class UnitErrorTable extends ErrorTable {
    public "unit-test-failure": UnitErrorStructuredProblemTemplate = {
        packageName: PACKAGE_NAME,
        errorName: "unit-test-failure",
        status: httpStatusCodeFrom(500),
        detail: "this code should never execute",
        extra: {
            publicExtra: {
                field1: "you can put anything you want here",
            },
            logsOnlyExtra: {
                field2: "you can put anything you want here too",
            },
        },
    };
}

type UnitTestFailure = ErrorTypeStruct<UnitErrorTable, "unit-test-failure">;
const unitTestFailure: UnitTestFailure = {
    context: PACKAGE_NAME,
    name: "unit-test-failure",
};

describe("ErrorType", () => {
    describe(".from()", () => {
        it("creates a new ErrorType", () => {
            const inputValue = unitTestFailure;

            const actualValue = ErrorType.from(inputValue);

            expect(actualValue).to.be.instanceOf(ErrorType);
        });
    });

    describe(".valueOf()", () => {
        it("returns the wrapped value", () => {
            const expectedValue = unitTestFailure;

            const unit = ErrorType.from(unitTestFailure);
            const actualValue = unit.valueOf();

            expect(actualValue).to.equal(expectedValue);
        });
    });

    describe(".context", () => {
        it("is the `context` field from the wrapped value", () => {
            const inputValue = unitTestFailure;
            const expectedValue = inputValue.context;

            const unit = ErrorType.from(unitTestFailure);
            const actualValue = unit.context;

            expect(actualValue).to.equal(expectedValue);
        });
    });

    describe(".name", () => {
        it("is the `name` field from the wrapped value", () => {
            const inputValue = unitTestFailure;
            const expectedValue = inputValue.name;

            const unit = ErrorType.from(unitTestFailure);
            const actualValue = unit.name;

            expect(actualValue).to.equal(expectedValue);
        });
    });

    describe(".toString()", () => {
        it("returns the fully-qualified name of this error type", () => {
            const expectedValue = "@ganbarodigital/ts-lib-apperror/lib/v1/unit-test-failure";

            const unit = ErrorType.from(unitTestFailure);
            const actualValue = unit.toString();

            expect(actualValue).to.equal(expectedValue);
        });
    });
});