/**
 * Copyright (c) 2018 PROPHESSOR
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

'use strict';

const testCmd = require('./testCmd');

module.exports = () => {
    const vim = testCmd('vim')
        ? 'vim'
        : testCmd('gvim')
            ? 'gvim'
            : null;

    return vim;
};
