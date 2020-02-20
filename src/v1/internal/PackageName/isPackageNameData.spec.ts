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

import { isPackageNameData } from "./isPackageNameData";

describe("isPackageNameData()", () => {
    it("supports non-scoped NPM package names", () => {
        const inputValue = "ts-lib-apperror";
        const expectedValue = true;

        const actualValue = isPackageNameData(inputValue);

        expect(actualValue).to.equal(expectedValue);
    });

    it("supports scoped NPM package names", () => {
        const inputValue = "@ganbarodigital/ts-lib-apperror";
        const expectedValue = true;

        const actualValue = isPackageNameData(inputValue);

        expect(actualValue).to.equal(expectedValue);
    });

    it("does not require a component after the package name", () => {
        const inputValue = "@ganbarodigital/ts-lib-apperror";
        const expectedValue = true;

        const actualValue = isPackageNameData(inputValue);

        expect(actualValue).to.equal(expectedValue);
    });

    it("supports sub-package names", () => {
        const validNames = [
            "@ganbarodigital/ts-lib-apperror/v1",
            "@ganbarodigital/ts-lib-apperror/v1/folder",
        ];

        for (const testData of validNames) {
            const inputValue = testData;
            const expectedValue = true;

            const actualValue = isPackageNameData(inputValue);

            expect(actualValue).to.equal(expectedValue, "input value was: " + inputValue);
        }
    });

    it("allows uppercase letters in sub-package names", () => {
        const validNames = [
            "@ganbarodigital/ts-lib-apperror/V1",
            "@ganbarodigital/ts-lib-apperror/v1/FOLDER",
        ];

        // tslint:disable-next-line: forin
        for (const testData of validNames) {
            const inputValue = testData;
            const expectedValue = true;

            const actualValue = isPackageNameData(inputValue);

            expect(actualValue).to.equal(expectedValue, "input value was: " + inputValue);
        }
    });

    it("rejects malformed package names", () => {
        const invalidNames = [
            "",
            "ganbarodigital/@ts-lib-apperror",
        ];

        for (const testData of invalidNames) {
            const inputValue = testData;
            const expectedValue = false;

            const actualValue = isPackageNameData(inputValue);

            expect(actualValue).to.equal(expectedValue, "input value was: " + inputValue);
        }
    });

    it("rejects package names that contain uppercase letters", () => {
        const invalidNames = [
            "@GANBARODIGITAL/ts-lib-apperror",
            "@ganbarodigital/@TS-LIB-APPERROR",
        ];

        // tslint:disable-next-line: forin
        for (const testData of invalidNames) {
            const inputValue = testData;
            const expectedValue = false;

            const actualValue = isPackageNameData(inputValue);

            expect(actualValue).to.equal(expectedValue, "input value was: " + inputValue);
        }
    });
});