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
                console: 'readonly',
                global: 'readonly',
                hasOwn: 'readonly',
                module: 'readonly',
                nodeCrypto: 'readonly',
                normalizePath: 'readonly',
                process: 'readonly',
                require: 'readonly',
                utf8Decoder: 'readonly',
                window: 'readonly',
                writeOwn: 'readonly',
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
