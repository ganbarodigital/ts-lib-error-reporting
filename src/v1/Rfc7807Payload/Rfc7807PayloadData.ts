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

/**
 * the error information to return to the end-user
 *
 * this is normally built from a StructuredProblemReport
 */
export interface Rfc7807PayloadData {
    /**
     * URI to a description of this type of error
     *
     * this may be an absolute URI; it may also be a relative URI.
     */
    type: string;

    /**
     * unique name of this error
     *
     * this is normally the final fragment of the URI above
     */
    title: string;

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
     * a URI, that contains information about the specific instance of
     * the problem
     */
    instance?: string;

    /**
     * use this to hold any extra information that should be sent back
     * to the end-user
     *
     * information in this object will also be written to the app's logs
     */
    extra?: object;
}