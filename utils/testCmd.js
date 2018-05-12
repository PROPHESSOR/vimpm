/**
 * Copyright (c) 2018 PROPHESSOR
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

'use strict';

const cp = require('child_process');

module.exports = (cmd) => {
    try {
        cp.execSync(`which ${cmd}`);

        return true;
    } catch (e) {
        return false;
    }
};
