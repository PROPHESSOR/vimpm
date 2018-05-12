/**
 * Copyright (c) 2018 PROPHESSOR
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

'use strict';

const testCmd = require('./testCmd');

describe('testCmd', () => {
    test('should return false on qwersafnifbnlewrkj', () => {
        expect(testCmd('qwersafnifbnlewrkj')).toBe(false);
    });
    test('should return true on ls', () => {
        expect(testCmd('ls')).toBe(true);
    });
});
