/*jslint jquery:true,browser:true */
/*global test,module,equal,define,ok*/
define([
    '../src/safe.js',
    '../src/string.capitalize.js',
    '../src/string.contains.js',
    '../src/string.endsWith.js',
    '../src/string.startsWith.js',
    '../src/string.left.js',
    '../src/string.right.js',
    '../src/string.trunc.js'
], function() {

    'use strict';

    /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
    */

    var str = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).';

    module('JS#string', {
        // This will run before each test in this module.
        setup: function() {
            //this.elems = $('#qunit-fixture').children();
        }
    });

    test('capitalize', function() {
        equal(typeof str.capitalize, 'function', 'function has been added to String.prototype');
        var basic = 'hello.',
            mixed = 'hello WORLD.',
            funked = '1234 #asdf!j';
        equal(basic.capitalize(), 'Hello.', 'basic cap');
        equal(mixed.capitalize(), 'Hello world.', 'mixed');
        equal(funked.capitalize(), '1234 #asdf!j', 'funky');
    });

    test('contains', function() {
        equal(typeof str.contains, 'function', 'function has been added to String.prototype');
        ok(str.contains('It is'), 'contains start characters');
        ok(str.contains('the like).'), 'contains last characters');
        ok(!str.contains('nonexistent'), 'does not contain nonexistent string');
        ok(!str.contains('It is', 1), 'does not find string given wrong partial starting point');
        ok(!str.contains('IT IS'), 'does not find wrong case');
    });

    test('startsWith', function() {
        equal(typeof str.startsWith, 'function', 'function has been added to String.prototype');
        ok(str.startsWith('I'), 'string starts with first letter');
        ok(str.startsWith('It'), 'string starts with first two letters');
        ok(str.startsWith('It is a long '), 'string starts with first part');
        ok(!str.startsWith('foobar'), 'string does not start with foobar');
    });

    test('endsWith', function() {
        equal(typeof str.endsWith, 'function', 'function has been added to String.prototype');
        ok(str.endsWith('.'), 'string ends with last letter');
        ok(str.endsWith(').'), 'string ends with last two letters');
        ok(str.endsWith('and the like).'), 'string ends with last part');
        ok(!str.endsWith('foobar'), 'string does not end with foobar');
    });

    test('trunc', function() {
        equal(typeof str.trunc, 'function', 'function has been added to String.prototype');
        equal(str.trunc(1), 'I&hellip;', 'truncates to 1 char');
        equal(str.trunc(0), '&hellip;', 'truncates to ellipsis');
        equal(str.trunc(10), 'It is a lo&hellip;', 'truncates to 10 chars');
        equal(str.trunc(5000), str, 'truncates beyond length to full string only');
        equal(str.trunc(1, '...<a>read more</a>'), 'I...<a>read more</a>', 'truncates with custom suffix');
    });

    test('left', function() {
        equal(typeof str.left, 'function', 'function has been added to String.prototype');
        equal(str.left(2), 'It', 'left two letters');
        equal(str.left(0), '', 'left zero letters');
        equal(str.left(10), 'It is a lo', 'left ten letters');
        equal(str.left(5000), str, 'left beyond letters');
    });

    test('right', function() {
        equal(typeof str.right, 'function', 'function has been added to String.prototype');
        equal(str.right(2), ').', 'right two letters');
        equal(str.right(0), '', 'right zero letters');
        equal(str.right(10), 'the like).', 'right ten letters');
        equal(str.right(5000), str, 'left beyond letters');
    });

});