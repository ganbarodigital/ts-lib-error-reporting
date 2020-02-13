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
import { PackageName } from "@ganbarodigital/ts-lib-packagename/lib/v1";
import { ValueObject } from "@ganbarodigital/ts-lib-value-objects/lib/v2";

import { ErrorTable } from "../ErrorTable";
import { ErrorTypeStruct } from "./ErrorTypeStruct";

/**
 * the unique ID of each type of error
 *
 * this is used in structured problem reports to tell developers:
 *
 * - which package the error was declared in
 * - which error inside that package was reported
 *
 * this is used in application error handlers to complete an RFC-7807
 * structured problem report
 */
export class ErrorType<T extends ErrorTable, N extends keyof T> extends ValueObject<ErrorTypeStruct<T, N>> {
    /**
     * smart constructor
     */
    public static from<T extends ErrorTable, N extends keyof T>(input: ErrorTypeStruct<T, N>): ErrorType<T, N> {
        return new ErrorType(input);
    }

    /**
     * returns the name of the package that defined this error.
     *
     * this may include the name of a sub-module.
     */
    public get context(): PackageName {
        return this.value.context;
    }

    /**
     * returns this error's name.
     *
     * error names are unique within each `this.context` only.
     */
    public get name(): string {
        return this.value.name as string;
    }

    /**
     * returns the fully-qualified name of this error type, suitable
     * for putting into an RFC-7807 structured problem report
     */
    public toString(): string {
        return this.value.context + "/" + this.value.name;
    }
}