/**
 * Copyright (c) 2018 PROPHESSOR
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
'use strict';

const input = require('prompt-sync')();

const api = require('../../utils/api');

const { log, success, error } = Logger;

module.exports = (pluginname) => {
    log(`Installing plugin "${pluginname}"...`);

    api.search(pluginname)
        .then(({ plugins }) => {
            log('What plugin do you want to install?');
            for (const i in plugins) {
                if (!plugins.hasOwnProperty(i)) continue;

                const plugin = plugins[i];

                log(`\t${Number(i) + 1}:\t${plugin.normalized_name || plugin.vimorg_name}`);
            }

            let number = 0;

            do {
                number = Number(input('>>> '));
            } while (!number || number <= 0 || number > 20);

            log(`You has selected ${plugins[number - 1].normalized_name}!`);
        })
        .catch((err) => {
            error(`[FATAL ERROR]: Can't get plugins! ${err}`);
        });

    return false;
};
