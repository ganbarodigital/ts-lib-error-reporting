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
import { HttpStatusCode } from "@ganbarodigital/ts-lib-http-types/lib/v1";
import { PackageName } from "@ganbarodigital/ts-lib-packagename/lib/v1";
import { ValueObject } from "@ganbarodigital/ts-lib-value-objects/lib/v2";

import { StructuredProblemReportData } from ".";
import { ErrorTable } from "../ErrorTable";
import { ErrorTableTemplate } from "../ErrorTableTemplate";
import { ExtraDataTemplate, NoExtraDataTemplate } from "../ExtraData";

/**
 * value object. represents a problem (a logic or robustness error) that
 * has been reported in the code.
 */
export class StructuredProblemReport<
    T extends ErrorTable,
    N extends keyof T,
    M extends ErrorTableTemplate<T, N, E>,
    R extends StructuredProblemReportData<T, N, M, E>,
    E extends ExtraDataTemplate | NoExtraDataTemplate
>
    extends ValueObject<R> {
    /**
     * smart constructor
     */
    public static from<
        T extends ErrorTable,
        N extends keyof T,
        M extends ErrorTableTemplate<T, N, E>,
        R extends StructuredProblemReportData<T, N, M, E>,
        E extends ExtraDataTemplate | null
    >(
        input: R,
    ): StructuredProblemReport<T, N, M, R, E> {
        return new StructuredProblemReport(input);
    }

    /**
     * a human-readable description of what the problem is
     *
     * NOTE: `detail` is not a printf() format string. It will have the
     * exact same value for each and every instance of the same reported
     * problem.
     */
    get detail(): string {
        return this.value.template.detail;
    }

    /**
     * unique ID of this instance.
     *
     * if present, may be used to build a URI that is shared with the
     * end-user.
     */
    get errorId(): string | null {
        return this.value.errorId ?? null;
    }

    /**
     * what kind of error is this?
     *
     * error names are only unique to a single package
     *
     * combine this with `packageName` to get a unique name for this error
     */
    get errorName(): N {
        return this.value.template.errorName;
    }

    /**
     * what extra information do we have about this instance of the error?
     *
     * NOTE: some errors will not have any extra information available.
     */
    get extra(): E | undefined {
        return this.value.extra;
    }

    /**
     * an error name that's guaranteed to be unique across all packages
     */
    get fqErrorName(): string {
        return this.packageName + "/" + this.errorName;
    }

    /**
     * which package defined this error?
     */
    get packageName(): PackageName {
        return this.value.template.packageName;
    }

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
    get status(): HttpStatusCode {
        return this.value.template.status;
    }

    /**
     * the StructuredProblemReportTemplate that was used to define
     * this error
     */
    get template(): M {
        return this.value.template;
    }
}