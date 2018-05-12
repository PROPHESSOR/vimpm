/**
 * Copyright (c) 2018 PROPHESSOR
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

'use strict';

const cp = require('child_process');
const getVim = require('../utils/getVim');
const { error, log } = Logger;

const VIM = getVim();

module.exports = () => {
    if (!VIM) return error('You have not installed vim, nor gvim');

    try {
        cp.spawn(VIM, ['+PluginList'], { stdio: 'inherit' });
    } catch (e) {
        return error(`Can't execute ${VIM} +PluginList`);
    }
};
