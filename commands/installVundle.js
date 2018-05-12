/**
 * Copyright (c) 2018 PROPHESSOR
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

'use strict';

const fs = require('fs');
const os = require('os');
const cp = require('child_process');
const testCmd = require('../utils/testCmd');
const { log, error, success, warn } = Logger;

const HOME = os.homedir();

const VUNDLE_CONFIG_PREFIX = `
set nocompatible
filetype off

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
Plugin 'VundleVim/Vundle.vim'
`;

const VUNDLE_CONFIG_SUFFIX = `
call vundle#end()
filetype plugin indent on
`;


module.exports = () => {
    if (!testCmd('git')) return error('You should install git to use VIMpm!', { from: 'installVundle' });
    if (!fs.existsSync(`${HOME}/.vim`)) return error('I can work only with ~/.vim folder!', { from: 'installVundle' });
    if (!fs.existsSync(`${HOME}/.vim/vimrc`)) fs.writeFileSync(`${HOME}/.vim/vimrc`, '', 'utf8');

    log(`Clonning the Vundle repository...`);
    try {
        cp.execSync(`git clone https://github.com/VundleVim/Vundle.vim ${HOME}/.vim/bundle/Vundle.vim`);
    } catch (e) {
        return error(`Can't clone the Vundle repository! ${e}`, { from: 'installVundle' });
    }
    success('Successfully!');

    log(`Configuring Vundle (.vimrc)...`);
    try {
        let vimrc = fs.readFileSync(`${HOME}/.vim/vimrc`, `utf8`);

        const VIMpmStart = vimrc.search('" === VIMpm === "');
        const VIMpmEnd   = vimrc.search('" ==== VIMpm ==== "');

        if (VIMpmStart !== -1) {
            if (VIMpmEnd !== -1 && VIMpmStart < VIMpmEnd) {
                return success(`VIMpm already installed! Use "vimpm clear" to remove installed plugins!`);
            }

            return warn(`VIMpm already installed, but it's broken! Please remove VIMpm section from ~/.vim/vimrc manually!`);
        }

        // Generate config sections
        vimrc += '\n" === VIMpm === "\n" Do not remove this section! Its change may result in the inoperability of VIMpm!\n';
        vimrc += VUNDLE_CONFIG_PREFIX;
        vimrc += '\n" == VIMpm Plugins == "\n\n" === VIMpm Plugins === "\n'; // Plugins section
        vimrc += VUNDLE_CONFIG_SUFFIX;
        vimrc += '\n" Do not remove this section! Its change may result in the inoperability of VIMpm!\n" ==== VIMpm ==== "\n';

        fs.writeFileSync(`${HOME}/.vim/vimrc`, vimrc, 'utf8');
        success(`Successfully!`);
    } catch (e) {
        return error(`Can't edit the ~/.vim/vimrc file! ${e}`);
    }
};
