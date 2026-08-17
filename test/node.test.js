'use strict';

var assert = require('node:assert/strict');
var test = require('node:test');
var lodash = require('lodash').runInContext();
var mixins = require('..');

lodash.mixin(mixins);

test('exports the complete mixin API', function() {
    assert.deepEqual(Object.keys(mixins).sort(), [
        'alphabetize',
        'base64_decode',
        'base64_encode',
        'eFn',
        'fn',
        'fnMore',
        'get',
        'getQuery',
        'isValidDate',
        'ord',
        'set',
        'utf8_decode',
        'utf8_encode',
        'uuid',
        'version'
    ]);
});

test('encodes and decodes Base64 strings and buffers', function() {
    var examples = new Map([
        ['', ''],
        ['f', 'Zg=='],
        ['foo', 'Zm9v'],
        ['quux', 'cXV1eA=='],
        ['複雜', '6KSH6Zuc'],
        ['✈', '4pyI']
    ]);

    examples.forEach(function(encoded, decoded) {
        assert.equal(lodash.base64_encode(decoded), encoded);
        assert.equal(lodash.base64_decode(encoded), decoded);
    });
    assert.equal(lodash.base64_encode(Buffer.from('foo')), 'Zm9v');
    assert.equal(lodash.base64_decode('Zg'), 'f');
    assert.throws(function() {
        lodash.base64_decode('%%%');
    }, TypeError);
    assert.throws(function() {
        lodash.base64_decode('/w==');
    }, URIError);
});

test('alphabetizes nested objects without interpreting special property names', function() {
    var value = {
        z: [{b: 1, a: 2}],
        c: 1,
        a: {z: 1, a: 2}
    };
    var poisoned = JSON.parse('{"a":1,"__proto__":{"injected":true}}');
    var alphabetizedPoisoned = lodash.alphabetize(poisoned);

    assert.equal(
        JSON.stringify(lodash.alphabetize(value)),
        '{"a":{"a":2,"z":1},"c":1,"z":[{"a":2,"b":1}]}'
    );
    assert.equal(Object.getPrototypeOf(alphabetizedPoisoned), Object.prototype);
    assert.equal(Object.hasOwn(alphabetizedPoisoned, '__proto__'), true);
    assert.deepEqual(alphabetizedPoisoned.__proto__, {injected: true});
    assert.equal(alphabetizedPoisoned.injected, undefined);
});

test('gets nested values and preserves defaults', function() {
    var value = {
        falseValue: false,
        nested: {answer: 42},
        nil: null
    };

    assert.equal(lodash.get(value), value);
    assert.equal(lodash.get(value, 'nested.answer'), 42);
    assert.equal(lodash.get(value, ['nested', 'answer']), 42);
    assert.equal(lodash.get(value, 'falseValue', true), false);
    assert.equal(lodash.get(value, 'nested.missing', 'fallback'), 'fallback');
    assert.equal(lodash.get(value, 'nil.missing', 'fallback'), 'fallback');
    assert.equal(lodash.get(value, '__proto__.polluted', 'fallback'), 'fallback');
    assert.equal(lodash.get(value, ['constructor', 'prototype'], 'fallback'), 'fallback');
});

test('sets nested values without coercion or inherited-property prototype pollution', function() {
    var value = {};
    var coercible = {
        toString: function() {
            return '__proto__';
        }
    };

    assert.equal(lodash.set(value, 'nested.answer', 42), value);
    assert.deepEqual(value, {nested: {answer: 42}});
    assert.equal(lodash.set(value, [], 'ignored'), value);
    assert.equal(lodash.set(value, '__proto__.polluted', true), value);
    assert.equal(lodash.set(value, 'constructor.prototype.polluted', true), value);
    assert.equal(lodash.set(value, [['__proto__'], 'polluted'], true), value);
    assert.equal(lodash.set(value, [coercible, 'polluted'], true), value);
    assert.equal(lodash.set(value, ['toString', 'polluted'], true), value);
    assert.equal(lodash.set(value, 'primitive.child', true), value);
    assert.equal({}.polluted, undefined);
    assert.equal(Object.prototype.toString.polluted, undefined);
    assert.deepEqual(value.primitive, {child: true});
    assert.equal(Object.hasOwn(value, 'toString'), true);
    assert.deepEqual(value.toString, {polluted: true});
});

test('provides function helpers', function() {
    var prevented = false;
    var calls = [];
    var scope = {name: 'scope'};
    var combined = lodash.fnMore(function(value) {
        calls.push(['first', this.name, value]);
    }, function(value) {
        calls.push(['second', this.name, value]);
    }, scope);

    assert.equal(lodash.fn(), true);
    lodash.eFn({
        preventDefault: function() {
            prevented = true;
        }
    });
    assert.equal(prevented, true);
    combined('value');
    assert.deepEqual(calls, [
        ['first', 'scope', 'value'],
        ['second', 'scope', 'value']
    ]);
});

test('validates dates and returns ordinal suffixes', function() {
    assert.equal(lodash.isValidDate(new Date('2026-08-16T00:00:00Z')), true);
    assert.equal(lodash.isValidDate(new Date('invalid')), false);
    assert.equal(lodash.isValidDate('2026-08-16'), false);
    assert.equal(lodash.ord(1), 'st');
    assert.equal(lodash.ord(2), 'nd');
    assert.equal(lodash.ord(3), 'rd');
    assert.equal(lodash.ord(11), 'th');
    assert.equal(lodash.ord(112), 'th');
});

test('round-trips UTF-8 byte strings and rejects malformed input', function() {
    ['plain text', '✈', '複雜', '\uD834\uDF06'].forEach(function(value) {
        assert.equal(lodash.utf8_decode(lodash.utf8_encode(value)), value);
    });
    assert.throws(function() {
        lodash.utf8_decode('\uFFFF');
    }, URIError);
});

test('generates cryptographically random version 4 UUID-shaped values', function() {
    var values = new Set();
    var pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    var originalRandom = Math.random;

    Math.random = function() {
        throw new Error('Math.random must not be used for UUIDs');
    };

    try {
        for (var index = 0; index < 1000; index += 1) {
            var value = lodash.uuid();
            assert.match(value, pattern);
            values.add(value);
        }
    } finally {
        Math.random = originalRandom;
    }

    assert.equal(values.size, 1000);
});

test('compares semantic versions used by the legacy API', function() {
    assert.equal(lodash.version('1.2.3+build.1', '=', '1.2.3+build.2'), true);
    assert.equal(lodash.version('1.2.3', '<', '2.0.0'), true);
    assert.equal(lodash.version('1.0.10', '>=', '1.0.2'), true);
    assert.equal(lodash.version('1.2.3-alpha', '<', '1.2.3-alpha.1'), true);
    assert.equal(lodash.version('1.2.3-rc.1', '<', '1.2.3'), true);
    assert.equal(lodash.version('1.0.0-0', '<', '1.0.0-1'), true);
    assert.equal(lodash.version('1.0.0-alpha', '=', '1.0.0-amber'), false);
    assert.equal(lodash.version('1.0.0-alpha', '<', '1.0.0-amber'), true);
    assert.equal(lodash.version('not-semver', '<', '1.0.0'), false);
    assert.equal(lodash.version('1.0.0-01', '<', '1.0.0-1'), false);
    assert.equal(lodash.version('1.0.0', '!=', '2.0.0'), false);
});

test('reads the browser query string lazily', function() {
    global.window = {
        location: {
            search: '?a=b&foo=bar'
        }
    };

    try {
        assert.deepEqual(lodash.getQuery(), {a: 'b', foo: 'bar'});
        assert.equal(lodash.getQuery('a'), 'b');
        assert.equal(lodash.getQuery('missing', 'fallback'), 'fallback');
        assert.equal(lodash.getQuery('toString', 'fallback'), 'fallback');
        assert.equal(lodash.getQuery('__proto__', 'fallback'), 'fallback');
    } finally {
        delete global.window;
    }
});
