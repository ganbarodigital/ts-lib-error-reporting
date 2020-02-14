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
import { StructuredProblemReport, StructuredProblemReportStructWithExtraData } from "../StructuredProblemReport";
import { StructuredProblemTemplate } from "../StructuredProblemTemplate";
import { AppError } from "./AppError";

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

type UnitErrorStructuredProblemReportStruct = StructuredProblemReportStructWithExtraData<
    UnitErrorTable,
    "unit-test-failure",
    UnitErrorStructuredProblemTemplate,
    UnitErrorExtraDataTemplate
>;

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

const errorTable = new UnitErrorTable();

describe("AppError", () => {
    it("is throwable", () => {
        const inputValue: UnitErrorStructuredProblemReportStruct = {
            template: errorTable["unit-test-failure"],
            extra: {
                publicExtra: {
                    field1: "first field",
                },
                logsOnlyExtra: {
                    field2: "second field",
                },
            },
        };
        const unit = AppError.from(
            StructuredProblemReport.from(inputValue),
        );

        expect(unit).to.be.instanceOf(Error);
    }),
    describe(".details", () => {
        it("contains the structured problem report", () => {
            const problemData: UnitErrorStructuredProblemReportStruct = {
                template: errorTable["unit-test-failure"],
                extra: {
                    publicExtra: {
                        field1: "first field",
                    },
                    logsOnlyExtra: {
                        field2: "second field",
                    },
                },
            };
            const inputValue = StructuredProblemReport.from(problemData);
            const unit = AppError.from(inputValue);

            const actualValue = unit.details;

            expect(actualValue).to.equal(inputValue);
        });
    }),
    describe(" constructor()", () => {
        it("creates a new AppError", () => {
            const inputValue: UnitErrorStructuredProblemReportStruct = {
                template: errorTable["unit-test-failure"],
                extra: {
                    publicExtra: {
                        field1: "first field",
                    },
                    logsOnlyExtra: {
                        field2: "second field",
                    },
                },
            };
            const actualValue = AppError.from(
                StructuredProblemReport.from(inputValue),
            );

            expect(actualValue).to.be.instanceOf(AppError);
        });
    });

    describe(".message", () => {
        it("contains the error's details (from the underlying template)", () => {
            const inputValue: UnitErrorStructuredProblemReportStruct = {
                template: errorTable["unit-test-failure"],
                extra: {
                    publicExtra: {
                        field1: "first field",
                    },
                    logsOnlyExtra: {
                        field2: "second field",
                    },
                },
            };
            const expectedValue = inputValue.template.detail;

            const unit = AppError.from(
                StructuredProblemReport.from(inputValue),
            );
            const actualValue = unit.message;

            expect(actualValue).to.equal(expectedValue);
        });
    });

    describe(".name", () => {
        it("contains the error's name", () => {
            const inputValue = StructuredProblemReport.from({
                template: errorTable["unit-test-failure"],
                extra: {
                    publicExtra: {
                        field1: "first field",
                    },
                    logsOnlyExtra: {
                        field2: "second field",
                    },
                },
            } as UnitErrorStructuredProblemReportStruct);
            const expectedValue = inputValue.type.toString();

            const unit = AppError.from(inputValue);
            const actualValue = unit.name;

            expect(actualValue).to.equal(expectedValue);
        });
    });

});