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
    install:       require('./commands/install'),
    installVundle: require('./commands/installVundle'),
    list:          require('./commands/list'),
    version () {
        log(`VIMpm version: ${require('./package.json').version} by PROPHESSOR\n`);
    },
    help () {
        log(`Usage: vimpm
            install <plugin_name>          - Install the plugin
            list                           - Show plugin list
            remove  <plugin_name>        - Remove the plugin (WIP)
            update  <plugin_name or all> - Update the plugin(s) (WIP)
            installVundle                - Install Vundle
        `);
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

    case 'installVundle':
    case '--installVundle':
        cmds.installVundle();
        break;

    case 'l':
    case '-l':
    case 'list':
    case '--list':
        cmds.list();
        break;

    case '-h':
    case '--help':
    default:
        cmds.version();
        cmds.help();
        break;
}
