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

import { extractStackFromCaught } from ".";

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

describe("extractStackFromCaught()", () => {
    it("if given an Error, will return the Error's stack trace", () => {
        const input = new UnitTestError("this is the message");
        const expectedValue = "    at Context.<anonymous>";

        const actualValue = extractStackFromCaught(input);

        expect(actualValue).to.startWith(expectedValue);
    });

    it("if given an non-Error object, it returns an empty string", () => {
        const input = new UnitTestNonError();
        const expectedValue = "";

        const actualValue = extractStackFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });

    it("if given a string, it returns an empty string", () => {
        const input = "this is an error message";
        const expectedValue = "";

        const actualValue = extractStackFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });

    it("if given a number, it returns an empty string", () => {
        const input = 100.125;
        const expectedValue = "";

        const actualValue = extractStackFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });

    it("if given `true`, it returns an empty string", () => {
        const input = true;
        const expectedValue = "";

        const actualValue = extractStackFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });

    it("if given `false`, it returns an empty string", () => {
        const input = false;
        const expectedValue = "";

        const actualValue = extractStackFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });

    it("if given `null`, it returns an empty string", () => {
        const input = null;
        const expectedValue = "";

        const actualValue = extractStackFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });

    it("if given `undefined`, it returns an empty string", () => {
        const input = undefined;
        const expectedValue = "";

        const actualValue = extractStackFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });

    it("if given `NaN`, it returns an empty string", () => {
        const input = NaN;
        const expectedValue = "";

        const actualValue = extractStackFromCaught(input);

        expect(actualValue).to.equal(expectedValue);
    });
});