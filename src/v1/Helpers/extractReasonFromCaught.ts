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

export const DEFAULT_ERROR_REASON = "no error information available";

/**
 * turn a value caught by a `catch()` statement into a string, to be used
 * in your AppError's constructor params
 *
 * we return DEFAULT_ERROR_REASON unless `e.toString()` exists, and
 * isn't the default `Object.toString()`
 */
export function extractReasonFromCaught(
    e: any,
    { stackTrace = false }: { stackTrace?: boolean } = {},
): string {
    // let's assume the worst for now
    let reason = DEFAULT_ERROR_REASON;

    // unfortunately, this whole function is a huge collection of
    // special cases. But that's why it's here: to avoid littering
    // your code with these!

    // special case
    //
    // do we have an Error with a stack trace?
    if (e instanceof Error) {
        if (stackTrace && e.stack) {
            // the stack trace already includes the `name` and `message`
            // properties; no need to duplicate them!
            reason = e.stack;
        } else {
            reason = e.toString();
        }

        return reason;
    }

    // special cases
    //
    // these either cause a runtime error if we check for `.toString()`,
    // or they have a `.toString()` that we do not want to use
    if (e === null) {
        return reason;
    }
    if (e === undefined) {
        return reason;
    }
    if (typeof e === "number" && isNaN(e)) {
        return reason;
    }
    if (typeof e === "boolean") {
        return reason;
    }

    // do we have something we can understand?
    //
    // the default `.toString()` function doesn't produce
    // a useful error reason, so we avoid calling that
    if (e.toString !== undefined
        && typeof e.toString === "function"
        && e.toString !== Object.prototype.toString
    ) {
        reason = e.toString();
    }

    // all done
    return reason;
}