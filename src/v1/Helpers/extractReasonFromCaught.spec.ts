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
import { describe } from "mocha";

import { DEFAULT_ERROR_REASON, extractReasonFromCaught } from ".";

// tslint:disable-next-line: no-var-requires
const { expect } = require("chai")
  // tslint:disable-next-line: no-var-requires
  .use(require("chai-bytes"))
  // tslint:disable-next-line: no-var-requires
  .use(require("chai-string"));

class UnitTestError extends Error {
    public constructor(message: string) {
        super(message);
        this.name = "UnitTestError";
    }
}

// tslint:disable-next-line: max-classes-per-file
class UnitTestNonError {
    public toString() {
        return "this is from UnitTestNonError";
    }
}

describe("extractReasonFromCaught()", () => {
    it("if given an Error, will return the Error's name and message", () => {
        const input = new UnitTestError("this is the message");
        const expectedValue = "UnitTestError: this is the message";

        const actualValue = extractReasonFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });

    it("if given an Error, will return the Error's name, message, and stack if stack trace option is enabled", () => {
        const input = new UnitTestError("this is the message");
        const expectedValue = "UnitTestError: this is the message\n    at Context.<anonymous>";

        const actualValue = extractReasonFromCaught(input, { stackTrace: true });

        expect(actualValue).to.startWith(expectedValue);
    });

    it("if given an object with .toString(), will return the return value from .toString()", () => {
        const input = new UnitTestNonError();
        const expectedValue = "this is from UnitTestNonError";

        const actualValue = extractReasonFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });

    it("if given an object without .toString(), will return the DEFAULT_ERROR_REASON", () => {
        const input = { empty: true };
        const expectedValue = DEFAULT_ERROR_REASON;

        const actualValue = extractReasonFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });

    it("if given a string, it will return that string", () => {
        const input = "this is an error message";
        const expectedValue = input;

        const actualValue = extractReasonFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });

    it("if given a number, it will return that as a string", () => {
        const input = 100.125;
        const expectedValue = "100.125";

        const actualValue = extractReasonFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });

    it("if given `true`, it will return the DEFAULT_ERROR_REASON", () => {
        const input = true;
        const expectedValue = DEFAULT_ERROR_REASON;

        const actualValue = extractReasonFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });

    it("if given `false`, it will return the DEFAULT_ERROR_REASON", () => {
        const input = false;
        const expectedValue = DEFAULT_ERROR_REASON;

        const actualValue = extractReasonFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });

    it("if given `null`, it will return the DEFAULT_ERROR_REASON", () => {
        const input = null;
        const expectedValue = DEFAULT_ERROR_REASON;

        const actualValue = extractReasonFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });

    it("if given `undefined`, it will return the DEFAULT_ERROR_REASON", () => {
        const input = undefined;
        const expectedValue = DEFAULT_ERROR_REASON;

        const actualValue = extractReasonFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });

    it("if given `NaN`, it will return the DEFAULT_ERROR_REASON", () => {
        const input = NaN;
        const expectedValue = DEFAULT_ERROR_REASON;

        const actualValue = extractReasonFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });
});