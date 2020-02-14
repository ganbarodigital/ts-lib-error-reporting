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
import { expect } from "chai";
import { describe } from "mocha";

import {
    errorTable,
    UnitTestFailureStructuredProblemReportStruct,
    UnitTestNoExtraStructuredProblemReportStruct,
} from "../Fixtures";
import { StructuredProblemReport } from "../StructuredProblemReport";

describe("StructuredProblemReport", () => {
    describe(".from()", () => {
        it("creates a new StructuredProblemReport", () => {
            const inputValue: UnitTestFailureStructuredProblemReportStruct = {
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

            const unit = StructuredProblemReport.from(inputValue);

            expect(unit).to.be.instanceOf(StructuredProblemReport);
        });

        it("accepts a template that has no `extra` data", () => {
            const inputValue: UnitTestNoExtraStructuredProblemReportStruct = {
                template: errorTable["unit-test-no-extra"],
            };

            const unit = StructuredProblemReport.from(inputValue);

            expect(unit).to.be.instanceOf(StructuredProblemReport);
        });
    });

    describe(".detail", () => {
        it("returns the `detail` field from the underlying template", () => {
            const inputValue: UnitTestFailureStructuredProblemReportStruct = {
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

            const unit = StructuredProblemReport.from(inputValue);
            const actualValue = unit.detail;

            expect(actualValue).to.equal(expectedValue);
        });
    });

    describe(".errorId", () => {
        it("returns the `errorId` field from the underlying problem report", () => {
            const inputValue: UnitTestFailureStructuredProblemReportStruct = {
                template: errorTable["unit-test-failure"],
                errorId: "12345",
                extra: {
                    publicExtra: {
                        field1: "first field",
                    },
                    logsOnlyExtra: {
                        field2: "second field",
                    },
                },
            };
            const expectedValue = inputValue.errorId;

            const unit = StructuredProblemReport.from(inputValue);
            const actualValue = unit.errorId;

            expect(actualValue).to.equal(expectedValue);
        });

        it("returns null if there is the `errorId` field in the underlying problem report", () => {
            const inputValue: UnitTestFailureStructuredProblemReportStruct = {
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
            const expectedValue = null;

            const unit = StructuredProblemReport.from(inputValue);
            const actualValue = unit.errorId;

            expect(actualValue).to.equal(expectedValue);
        });
    });

    describe(".errorName", () => {
        it("returns the `errorName` field from the underlying template", () => {
            const inputValue: UnitTestFailureStructuredProblemReportStruct = {
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
            const expectedValue = inputValue.template.errorName;

            const unit = StructuredProblemReport.from(inputValue);
            const actualValue = unit.errorName;

            expect(actualValue).to.equal(expectedValue);
        });
    });

    describe(".packageName", () => {
        it("returns the `packageName` field from the underlying template", () => {
            const inputValue: UnitTestFailureStructuredProblemReportStruct = {
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
            const expectedValue = inputValue.template.packageName;

            const unit = StructuredProblemReport.from(inputValue);
            const actualValue = unit.packageName;

            expect(actualValue).to.equal(expectedValue);
        });
    });

    describe(".status", () => {
        it("returns the `status` field from the underlying template", () => {
            const inputValue: UnitTestFailureStructuredProblemReportStruct = {
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
            const expectedValue = inputValue.template.status;

            const unit = StructuredProblemReport.from(inputValue);
            const actualValue = unit.status;

            expect(actualValue).to.equal(expectedValue);
        });
    });

    describe(".template", () => {
        it("returns the underlying template", () => {
            const inputValue: UnitTestFailureStructuredProblemReportStruct = {
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
            const expectedValue = inputValue.template;

            const unit = StructuredProblemReport.from(inputValue);
            const actualValue = unit.template;

            expect(actualValue).to.equal(expectedValue);
        });
    });
});