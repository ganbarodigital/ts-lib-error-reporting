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
import { expect } from "chai";
import { describe } from "mocha";

import { mustBeHttpStatusCode } from ".";
import { AnyAppError, OnError } from "../../internal";

describe("mustBeHttpStatusCode()", () => {
    const onError: OnError = (e: AnyAppError): never => {
        throw new Error(JSON.stringify(e.details.extra));
    };

    it("accepts integers in the range 100-599 inclusive", () => {
        for (let inputValue = 100; inputValue < 600; inputValue++) {
            mustBeHttpStatusCode(inputValue);
        }
    });

    it("rejects non-integers in the range 100-599 inclusive", () => {
        for (let inputValue = 100.5; inputValue < 600; inputValue++) {
            const expectedMessage = "{\"input\":" + inputValue + "}";
            expect(() => mustBeHttpStatusCode(inputValue, onError)).to.throw(expectedMessage);
        }
    });

    it("rejects numbers below 100", () => {
        for (let inputValue = -100; inputValue < 100; inputValue++) {
            const expectedMessage = "{\"input\":" + inputValue + "}";
            expect(() => mustBeHttpStatusCode(inputValue, onError)).to.throw(expectedMessage);
        }
    });

    it("rejects numbers above 599", () => {
        for (let inputValue = 600; inputValue < 1000; inputValue++) {
            const expectedMessage = "{\"input\":" + inputValue + "}";
            expect(() => mustBeHttpStatusCode(inputValue, onError)).to.throw(expectedMessage);
        }
    });

    it("has a default error handler", () => {
        const expectedMessage = "input falls outside the range of a valid HTTP status code";
        expect(() => mustBeHttpStatusCode(700)).to.throw(expectedMessage);
    });
});