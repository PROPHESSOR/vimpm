/**
 * Copyright (c) 2018 PROPHESSOR
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

// api: https://vimawesome.com/api/plugins?page=#{page}&query=#{query} // # - minified

'use strict';

const request = require('request');

const API = 'https://vimawesome.com/api/plugins?query=#';

module.exports = new class Api {

    /** Search the plugin
     * @param  {string} plugin - Plugin name
     * @returns {Promise} api results
     */
    search (plugin) {
        return new Promise((resolve, reject) => {
            request.get(API + plugin, (err, res, body) => {
                if (err) return reject(err);

                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(new Error('Can\'t parse JSON response'));
                }
            });
        });
    }
}();
