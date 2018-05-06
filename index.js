#!/usr/bin/env node
/**
 * Copyright (c) 2018 PROPHESSOR
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

'use strict';


const Logger = new (require('prologger'))({
    showDate:     false,
    showMsgTypes: false,
});

Logger.addLevels([
    //
]);

global.Logger = Logger;

const { log, info, warn, error, success } = Logger;

const cmd = process.argv.slice(2);

const cmds = {
    install: require('./commands/install'),
    version () {
        log(`VIMpm version: ${require('./package.json').version} by PROPHESSOR\n`);
    },
    help () {
        log(`Usage: vimpm
            install <plugin_name>        - Install the plugin
            remove  <plugin_name>        - Remove the plugin
            update  <plugin_name or all> - Update the plugin(s)`);
    },
};

switch (cmd[0]) {
    case 'i':
    case '-i':
    case 'install':
    case '--install':
        cmds.install(cmd[1]);
        break;

    case '-v':
    case '-V':
    case '--version':
        cmds.version();
        break;

    case '-h':
    case '--help':
    default:
        cmds.version();
        cmds.help();
        break;
}
