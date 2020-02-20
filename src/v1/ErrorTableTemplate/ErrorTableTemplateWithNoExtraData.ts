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
import { HttpStatusCode } from "../copied/HttpStatusCode";
import { PackageName } from "../copied/PackageName";
import { ErrorTable } from "../ErrorTable";
import { ExtraDataTemplate, NoExtraDataTemplate } from "../ExtraData";

/**
 * these go in your ErrorTable, and they define what your structured problem
 * reports will look like
 */
export interface ErrorTableTemplateWithNoExtraData<
    T extends ErrorTable,
    N extends keyof T,
    E extends ExtraDataTemplate | NoExtraDataTemplate
> {
    /**
     * which package has defined this template?
     */
    packageName: PackageName;

    /**
     * what kind of error is this?
     *
     * - `T` is your ErrorTable (a list of all the errors you've declared)
     * - `N` is the name of your error (must be a property of your ErrorTable)
     */
    errorName: N;

    /**
     * the HTTP status that best fits this kind of error
     *
     * NOTE that this is from the point-of-view of the code that throws
     * the error.
     *
     * e.g. a library may report a `422` (validation failure),
     * but it doesn't know where the rejected input comes from.
     *
     * the calling app DOES know, and it may decide to report a `500`
     * (internal server error) back to the end-user instead
     */
    status: HttpStatusCode;

    /**
     * a human-readable summary of the problem
     *
     * this should be the same string for each instance of this error
     * (i.e., don't make it a `printf()` format string!)
     *
     * put instance-specific details into the `extra` section
     */
    detail: string;

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