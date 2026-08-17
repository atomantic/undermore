'use strict';

var js = require('@eslint/js');

module.exports = [
    js.configs.recommended,
    {
        files: [
            'bin/**/*.js',
            'scripts/**/*.js',
            'src/_source/**/*.js',
            'test/node.test.js'
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'commonjs',
            globals: {
                Buffer: 'readonly',
                __dirname: 'readonly',
                atob: 'readonly',
                btoa: 'readonly',
                chars: 'readonly',
                console: 'readonly',
                escape: 'readonly',
                global: 'readonly',
                module: 'readonly',
                process: 'readonly',
                require: 'readonly',
                unescape: 'readonly',
                window: 'readonly',
                _: 'readonly'
            }
        },
        rules: {
            'no-cond-assign': 'off',
            'no-unused-vars': ['error', {
                args: 'none'
            }]
        }
    }
];
