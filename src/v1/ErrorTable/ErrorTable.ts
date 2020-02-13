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

import { PACKAGE_NAME } from "..";
import { ExtraDataTemplate } from "../ExtraDataTemplate";
import { StructuredProblemTemplate } from "../StructuredProblemTemplate";

interface UnreachableCodeExtraDataTemplate extends ExtraDataTemplate {
    extra: {
        publicExtra?: null,
        logsOnlyExtra: {
            function: string;
        },
    };
}

type UnreachableCodeStructuredProblemTemplate = StructuredProblemTemplate<
    ErrorTable,
    "unreachable-code"
> & UnreachableCodeExtraDataTemplate;

/**
 * a list of all of the structured problems that your app or package
 * can generate
 *
 * extend this class in your own app or package, and add in all of the
 * errors that your app or package can throw
 *
 * then export it as the constant ERROR_TABLE, in case anyone else ever
 * needs to query it
 */
export class ErrorTable {
    // everything in this class has to follow the same structure
    [key: string]: StructuredProblemTemplate<any, string> & ExtraDataTemplate;

    /**
     * use this error in if/else & the default clause of switch statements
     * to spot things that should never happen
     */
    // tslint:disable-next-line: max-line-length
    public "unreachable-code": UnreachableCodeStructuredProblemTemplate = {
        packageName: PACKAGE_NAME,
        errorName: "unreachable-code",
        status: httpStatusCodeFrom(500),
        detail: "this code should never execute",
        extra: {
            logsOnlyExtra: {
                function: "the function that threw this error",
            },
        },
    };
}