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
import { ERROR_TABLE } from "../";
import { AppError } from "../AppError";
import { ExtraDataTemplate } from "../ExtraData";
import { ExtraDataContents } from "../ExtraData/ExtraDataContents";
import { StructuredProblemReport, StructuredProblemReportStructWithExtraData } from "../StructuredProblemReport";
import { StructuredProblemTemplate } from "../StructuredProblemTemplate";
import { ErrorTable } from "./ErrorTable";

export interface UnreachableCodeExtraDataContents extends ExtraDataContents {
    logsOnlyExtra: {
        function: string;
    };
}

export interface UnreachableCodeExtraDataTemplate
    extends ExtraDataTemplate<UnreachableCodeExtraDataContents> { }

export type UnreachableCodeStructuredProblemTemplate = StructuredProblemTemplate<
    ErrorTable,
    "unreachable-code"
> & UnreachableCodeExtraDataTemplate;

export type UnreachableCodeStructuredProblemReportStruct = StructuredProblemReportStructWithExtraData<
    ErrorTable,
    "unreachable-code",
    UnreachableCodeStructuredProblemTemplate,
    UnreachableCodeExtraDataTemplate,
    UnreachableCodeExtraDataContents
>;

export type UnreachableCodeStructuredProblemReport = StructuredProblemReport<
    ErrorTable,
    "unreachable-code",
    UnreachableCodeStructuredProblemTemplate,
    UnreachableCodeStructuredProblemReportStruct,
    UnreachableCodeExtraDataTemplate,
    UnreachableCodeExtraDataContents
>;

type InstanceData = UnreachableCodeExtraDataContents & { errorId?: string };

/**
 * Javascript Error
 */
export class UnreachableCodeError extends AppError<
    ErrorTable,
    "unreachable-code",
    UnreachableCodeStructuredProblemTemplate,
    UnreachableCodeStructuredProblemReportStruct,
    UnreachableCodeExtraDataTemplate,
    UnreachableCodeExtraDataContents
> {
    public constructor(instanceData: InstanceData) {
        const errorDetails: UnreachableCodeStructuredProblemReportStruct = {
            template: ERROR_TABLE["unreachable-code"],
            // tslint:disable-next-line: object-literal-shorthand
            errorId: instanceData.errorId,
            extra: {
                logsOnlyExtra: instanceData.logsOnlyExtra,
            },
        };

        const srp: UnreachableCodeStructuredProblemReport =
        StructuredProblemReport.from(errorDetails);

        super(srp);
    }
}

export const myError = new UnreachableCodeError(
    { logsOnlyExtra: { function: "something went wrong" } },
);