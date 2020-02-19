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
import { ErrorTableTemplateWithNoExtraData } from "../ErrorTableTemplate";
import { ExtraDataTemplate } from "../ExtraData";
import { StructuredProblemReport, StructuredProblemReportDataWithNoExtraData } from "../StructuredProblemReport";
import { AppError } from "./AppError";

/**
 * type guard. confirms if the given input is actually one of our
 * AppErrors or not.
 *
 * use this instead of the `instanceof` operator for future-proofing.
 */
export function isAppError<
    T extends ErrorTable,
    N extends keyof T,
    M extends ErrorTableTemplateWithNoExtraData<T, N, E>,
    E extends ExtraDataTemplate,
    R extends StructuredProblemReportDataWithNoExtraData<T, N, M, E>,
    S extends StructuredProblemReport<T, N, M, E, R>
>(
    input: unknown,
): input is AppError<T, N, M, E, R, S> {
    return (input instanceof AppError);
}