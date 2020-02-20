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
    ErrorTable,
    ErrorTableTemplateWithNoExtraData,
    ExtraDataTemplate,
    NoExtraDataTemplate,
} from "../internal";

/**
 * the internal data captured when an error occurs
 *
 * this defines the structure that you pass into
 * `StructuredProblemReport.from()` when you create problem reports at
 * runtime
 *
 *  use this as your base interface when defining errors that have NO
 * `extra` bits of data
 */
export interface StructuredProblemReportDataWithNoExtraData<
    T extends ErrorTable,
    N extends keyof T,
    M extends ErrorTableTemplateWithNoExtraData<T, N, E>,
    E extends ExtraDataTemplate | NoExtraDataTemplate
> {
    template: M;

    /**
     * unique ID of this instance.
     *
     * if present, may be used to build a URI that is shared with the
     * end-user.
     */
    errorId?: string;

    /**
     * the internal data captured when an error occurs
     *
     * this is split up into (up to) two properties:
     *
     * - `public`: data that can be shared with the caller
     *   (e.g. included in an API response payload)
     *   this data will also be written to the logs
     * - `logsOnly`: data that can only be written to the logs
     *   (i.e. it must not be shared with the caller)
     */
    extra?: E;
}