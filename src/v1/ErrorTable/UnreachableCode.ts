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
import {
    AppError,
    AppErrorParams,
    ErrorTableTemplate,
    ExtraLogsOnlyData,
    StructuredProblemReport,
    StructuredProblemReportDataWithExtraData,
} from "../internal";
import { ErrorTable } from "./ErrorTable";
import { ERROR_TABLE } from "./PackageErrorTable";

/**
 * the ExtraData that must be provided for each UnreachableCodeError
 *
 * @see UnreachableCodeError
 */
export interface UnreachableCodeExtraData extends ExtraLogsOnlyData {
    logsOnly: {
        reason: string;
    };
}

/**
 * defines the structure of the data that goes into our ErrorTable
 *
 * @see ErrorReportingErrorTable
 */
export type UnreachableCodeTemplate = ErrorTableTemplate<
    ErrorTable,
    "unreachable-code"
>;

/**
 * defines the data that goes into our StructuredProblemReport
 */
export type UnreachableCodeData = StructuredProblemReportDataWithExtraData<
    ErrorTable,
    "unreachable-code",
    UnreachableCodeTemplate,
    UnreachableCodeExtraData
>;

/**
 * a type alias for our StructuredProblemReport
 */
export type UnreachableCodeSRP = StructuredProblemReport<
    ErrorTable,
    "unreachable-code",
    UnreachableCodeTemplate,
    UnreachableCodeExtraData,
    UnreachableCodeData
>;

/**
 * throwable Javascript Error, for when code that should never execute
 * has, in fact, executed
 *
 * commonly used in the `default:` clause of a `switch` statement, to
 * catch problems when the `switch` statement is handling a wider range
 * of input than it was originally written to support
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
                logsOnly: params.logsOnly,
            },
        };

        super(StructuredProblemReport.from(errorDetails));
    }
}