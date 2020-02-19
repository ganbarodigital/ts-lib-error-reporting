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
import { ErrorTableTemplateWithNoExtraData } from "../ErrorTableTemplate";
import { ExtraDataTemplate, NoExtraDataTemplate } from "../ExtraData";
import { ErrorTable } from "./ErrorTable";
import { UnreachableCodeTemplate } from "./UnreachableCode";

/**
 * the ErrorTable for the package `@ganbarodigital/ts-lib-error-reporting`
 *
 * You can extend this in your own package, if you want to reuse the errors
 * that we provide.
 */
export class ErrorReportingErrorTable implements ErrorTable {
    // everything in this class has to follow the same structure
    [key: string]: ErrorTableTemplateWithNoExtraData<any, string, ExtraDataTemplate | NoExtraDataTemplate>;

    /**
     * use this error in if/else & the default clause of switch statements
     * to spot things that should never happen
     */
    public "unreachable-code": UnreachableCodeTemplate = {
        packageName: PACKAGE_NAME,
        errorName: "unreachable-code",
        status: httpStatusCodeFrom(500),
        detail: "this code should never execute",
        extra: {
            logsOnly: {
                reason: "explain why this code should be unreachable",
            },
        },
    };
}
