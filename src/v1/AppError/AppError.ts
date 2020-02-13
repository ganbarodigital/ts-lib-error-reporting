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
import { ExtraDataTemplate, NoExtraDataTemplate } from "../ExtraDataTemplate";
import { StructuredProblemReport } from "../StructuredProblemReport";
import { StructuredProblemTemplateWithExtraData } from "../StructuredProblemTemplate";

/**
 * base class for throwable Javascript Errors.
 *
 * It includes structured information about the error that is being
 * reported.
 */
export class AppError<
    T extends ErrorTable,
    N extends keyof T,
    M extends StructuredProblemTemplateWithExtraData<T, N, E>,
    E extends ExtraDataTemplate = NoExtraDataTemplate,
> extends Error {
    /**
     * information about what went wrong, in a type-safe structure
     */
    public readonly details: StructuredProblemReport<T, N, M, E>;

    /**
     * call `AppError.from()` to create a new instance of AppError
     */
    public constructor(details: StructuredProblemReport<T, N, M, E>) {
        super(details.detail);
        this.details = details;

        // we want the error name to be ours
        this.name = this.details.packageName + "/" + this.details.errorName;
    }
}