/*jslint jquery:true,browser:true */
/*global _,QUnit,test,module,deepEqual,equal,define,ok,notEqual*/

// In order to test _.getQuery(), we need to assure we have a query string
var targetQuery = '?a=b&foo=bar';
if (window.location.search !== targetQuery) {
    window.location.search = targetQuery;
}

define(['../src/_.build.js', '../src/safe.js'], function() {
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
    Test assertions:`
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
    */

    module('undermore', {
        // This will run before each test in this module.
        setup: function() {}
    });


    test('base64_encode', function() {
        equal(_.base64_encode(''), '', '');
        equal(_.base64_encode('f'), 'Zg==', '');
        equal(_.base64_encode('fo'), 'Zm8=', '');
        equal(_.base64_encode('foo'), 'Zm9v', '');
        equal(_.base64_encode('quux'), 'cXV1eA==', '');
        equal(_.base64_encode('!"#$%'), 'ISIjJCU=', '');
        equal(_.base64_encode("&'()*+"), 'JicoKSor', '');
        equal(_.base64_encode(',-./012'), 'LC0uLzAxMg==', '');
        equal(_.base64_encode('3456789:'), 'MzQ1Njc4OTo=', '');
        equal(_.base64_encode(';<=>?@ABC'), 'Ozw9Pj9AQUJD', '');
        equal(_.base64_encode('DEFGHIJKLM'), 'REVGR0hJSktMTQ==', '');
        equal(_.base64_encode('NOPQRSTUVWX'), 'Tk9QUVJTVFVWV1g=', '');
        equal(_.base64_encode('YZ[\\]^_`abc'), 'WVpbXF1eX2BhYmM=', '');
        equal(_.base64_encode('defghijklmnop'), 'ZGVmZ2hpamtsbW5vcA==', '');
        equal(_.base64_encode('qrstuvwxyz{|}~'), 'cXJzdHV2d3h5ent8fX4=', '');

        // non-ascii input
        equal(_.base64_encode('複雜'), '6KSH6Zuc', 'complex traditional chinese');
        equal(_.base64_encode('✈'), '4pyI', 'airplane');
    });

    test('base64_decode', function() {
        equal(_.base64_decode(''), '', '');
        equal(_.base64_decode('Zg=='), 'f', '');
        equal(_.base64_decode('Zm8='), 'fo', '');
        equal(_.base64_decode('Zm9v'), 'foo', '');
        equal(_.base64_decode('cXV1eA=='), 'quux', '');
        equal(_.base64_decode('ISIjJCU='), '!"#$%', '');
        equal(_.base64_decode('JicoKSor'), "&'()*+", '');
        equal(_.base64_decode('LC0uLzAxMg=='), ',-./012', '');
        equal(_.base64_decode('MzQ1Njc4OTo='), '3456789:', '');
        equal(_.base64_decode('Ozw9Pj9AQUJD'), ';<=>?@ABC', '');
        equal(_.base64_decode('REVGR0hJSktMTQ=='), 'DEFGHIJKLM', '');
        equal(_.base64_decode('Tk9QUVJTVFVWV1g='), 'NOPQRSTUVWX', '');
        equal(_.base64_decode('WVpbXF1eX2BhYmM='), 'YZ[\\]^_`abc', '');
        equal(_.base64_decode('ZGVmZ2hpamtsbW5vcA=='), 'defghijklmnop', '');
        equal(_.base64_decode('cXJzdHV2d3h5ent8fX4='), 'qrstuvwxyz{|}~', '');

        equal(_.base64_decode('6KSH6Zuc'), '複雜', 'complex traditional chinese');
        equal(_.base64_decode('4pyI'), '✈', 'airplane');
    });

    test('alphabetize',function(){
        var data = {
            c: 1,
            b: {
                thing: 2,
                another: 1
            },
            a: {
                'funky-key':{
                    child: 'woot',
                    a: 1
                },
                another: 1
            },
            d: null,
            e: 'string'
        };

        equal(JSON.stringify(_.alphabetize(data)), '{"a":{"another":1,"funky-key":{"a":1,"child":"woot"}},"b":{"another":1,"thing":2},"c":1,"d":null,"e":"string"}');
    });

    test('get',function(){
        var data = {
            prop: 1,
            deep: {
                thing: 2
            },
            and:{
                'funky-key':{
                    child: 'woot'
                }
            },
            bad: null,
            str: 'string'
        };

        equal(_.get(data,'prop'),1);
        equal(_.get(data,'prop.foo','default'),'default');
        deepEqual(_.get(data,'deep'),{"thing":2});
        equal(_.get(data,'deep.thing'),2);
        equal(_.get(data,'deep.thing.foo','default'),'default');
        equal(_.get(data,'bad','default'),null);
        equal(_.get(data,'bad.foo','default'),'default');
        equal(_.get(data,'str','default'),'string');
        equal(_.get(data,'str.foo','default'),'default');
        equal(_.get(data,'and.funky-key.child'),'woot');
    });

    test('set',function(){
        var data = {
            prop: {}
        };

        deepEqual(_.set(data, 'prop', 1), _.extend(data, {prop:1}) );
        deepEqual(_.set(data, 'doo.foo', 'fooVal'),  _.extend(data, {doo:{foo:'fooVal'}}) );
        deepEqual(_.set(data, 'newKey', 'newVal'),  _.extend(data, {newKey:'newVal'}) );
        deepEqual(_.set(data, 'deep.key.that.does.not.exist', 'deepVal'),  _.extend(data, {
            deep: {
                key:{
                    that:{
                        does:{
                            not:{
                                exist:'deepVal'
                            }
                        }
                    }
                }
            }
        }));
    });

    test('utf8', function() {
        var data = [
            // 1-byte
            {
                'codePoint': 0x0000,
                'decoded': '\0',
                'encoded': '\0'
            }, {
                'codePoint': 0x005C,
                'decoded': '\x5C',
                'encoded': '\x5C'
            }, {
                'codePoint': 0x007F,
                'decoded': '\x7F',
                'encoded': '\x7F'
            },

            // 2-byte
            {
                'codePoint': 0x0080,
                'decoded': '\x80',
                'encoded': '\xC2\x80'
            }, {
                'codePoint': 0x05CA,
                'decoded': '\u05CA',
                'encoded': '\xD7\x8A'
            }, {
                'codePoint': 0x07FF,
                'decoded': '\u07FF',
                'encoded': '\xDF\xBF'
            },

            // 3-byte
            {
                'codePoint': 0x0800,
                'decoded': '\u0800',
                'encoded': '\xE0\xA0\x80'
            }, {
                'codePoint': 0x2C3C,
                'decoded': '\u2C3C',
                'encoded': '\xE2\xB0\xBC'
            }, {
                'codePoint': 0xFFFF,
                'decoded': '\uFFFF',
                'encoded': '\xEF\xBF\xBF'
            },

            // 4-byte
            {
                'codePoint': 0x010000,
                'decoded': '\uD800\uDC00',
                'encoded': '\xF0\x90\x80\x80'
            }, {
                'codePoint': 0x01D306,
                'decoded': '\uD834\uDF06',
                'encoded': '\xF0\x9D\x8C\x86'
            }, {
                'codePoint': 0x10FFF,
                'decoded': '\uDBFF\uDFFF',
                'encoded': '\xF4\x8F\xBF\xBF'
            }
        ];

        // `throws` is a reserved word in ES3; alias it to avoid errors
        var raises = QUnit.assert['throws'];

        _.each(data, function(object) {
            var description = object.description || 'U+' + object.codePoint.toString(16).toUpperCase();
            equal(
                object.encoded,
                _.utf8_encode(object.decoded),
                'Encoding: ' + description
            );
            equal(
                object.decoded,
                _.utf8_decode(object.encoded),
                'Decoding: ' + description
            );
        });

        // Error handling
        raises(
            function() {
                _.utf8_decode('\uFFFF');
            },
            Error,
            'Error: invalid UTF-8 detected'
        );
        raises(
            function() {
                _.utf8_decode('\xE9\x00\x00');
            },
            Error,
            'Error: invalid continuation byte (4-byte sequence expected)'
        );
        raises(
            function() {
                _.utf8_decode('\xC2\uFFFF');
            },
            Error,
            'Error: invalid continuation byte'
        );
        raises(
            function() {
                _.utf8_decode('\xF0\x9D');
            },
            Error,
            'Error: invalid byte index'
        );
    });

    test('ord', function() {
        var i, str, ones, tens, ord;

        for (i = 1; i < 120; i++) {
            str = i.toString();
            ones = str.slice(-1);
            tens = str.length > 1 ? str.slice(-2).charAt(0) : 0;
            ord = 'th';
            if (ones === '1' && tens !== '1') {
                ord = 'st';
            }
            if (ones === '2' && tens !== '1') {
                ord = 'nd';
            }
            if (ones === '3' && tens !== '1') {
                ord = 'rd';
            }
            equal(_.ord(i), ord, 'for ' + i + ', ones is ' + ones + ' and tens is ' + tens + ' so the ord is ' + ord + '.');

        }
    });

    test('fnMore', function() {
        var fn1 = function(fnArg) {
            this.fn1Arg = fnArg;
            this.fn1Prop = 'fn1';
        },
            fn2 = function(fnArg) {
                this.fn2Arg = fnArg;
                this.fn2Prop = 'fn2';
            },
            obj = {
                name: 'obj'
            },
            fnMore = _.fnMore(fn1, fn2, obj);

        deepEqual(obj, {
            name: 'obj'
        }, 'unmutated object');

        fnMore('an arg');

        deepEqual(
            obj, {
                name: 'obj',
                fn1Arg: 'an arg',
                fn1Prop: 'fn1',
                fn2Prop: 'fn2',
                fn2Arg: 'an arg'
            }, 'mutated object');

    });

    test('isValidDate', function() {
        equal(_.isValidDate(new Date()), true,
            'new Date instance for current time is good'
        );
        equal(_.isValidDate(new Date('12/12/12')), true,
            'new instance with arbitrary date is good'
        );
        equal(_.isValidDate(new Date('foobar')), false,
            'foobar is not a date'
        );
        // there's more :)
        equal(_.isValidDate('12/12/12'), false,
            'a string is not a date'
        );
        equal(_.isValidDate(121212), false,
            'a number is not a date'
        );
        equal(_.isValidDate({}), false,
            'a plain object is not a date'
        );
    });

    test('uuid', function() {
        var uuid1 = _.uuid(),
            uuid2 = _.uuid(),
            parts = uuid1.split('-'),
            limited = uuid1.charAt(19),
            cache = {},
            i,
            uuid;

        notEqual(uuid1, uuid2, 'two different uuids generated: ' + uuid1 + ' and ' + uuid2);

        equal(parts.length, 5, 'uuid has correct number of segments');

        equal(parts[0].length, 8, '1st segment length is 8');
        equal(parts[1].length, 4, '2nd segment length is 4');
        equal(parts[2].length, 4, '3rd segment length is 4');
        equal(parts[3].length, 4, '4th segment length is 4');
        equal(parts[4].length, 12, '5th segment length is 12');

        equal(parts[2].charAt(0), '4', '3rd segment begins with a 4');


        ok((/[^cdef0-7]/).test(limited), '4th segment begins with 8-b (' + limited + ')');

        // now let's generate a ton of them and make sure they are unique

        for (i = 0; i < 1000; i++) {
            uuid = _.uuid();
            limited = uuid.charAt(19);

            ok(!cache[uuid] && (/[89ab]/).test(limited), uuid + ' is unique and 4th segment begins with 8-b (' + limited + ')');

            cache[uuid] = 1;
        }

    });

    test('version',function(){
        ok(_.version('1.2.3+20130313144700','=','1.2.3+asdf1123'), 'build metadata is ignored');
        ok(_.version('1.2.3','<','2.0.0'), 'major version is smaller');
        ok(_.version('1.1.0','<','1.2.0'), 'minor version is smaller');
        ok(!_.version('1.1.0','>','1.2.0'), 'minor version is smaller');
        ok(_.version('1.0.10','>=','1.0.2'), 'patch version 10 is greater than or equal to 2');
        ok(_.version('1.2.3-alpha','<','1.2.3-alpha.1'));
        ok(_.version('1.2.3-alpha.1','<','1.2.3-alpha.beta'));
        ok(_.version('1.2.3-alpha.beta','<','1.2.3-beta'));
        ok(_.version('1.2.3-beta','<','1.2.3-beta.2'));
        ok(_.version('1.2.3-beta.2','<','1.2.3-beta.11'));
        ok(_.version('1.2.3-beta.11','<','1.2.3-rc.1'));
        ok(_.version('1.2.3-rc.1','<','1.2.3'));
    });

    test('getQuery', function () {
        var data = { a: 'b', foo: 'bar' };
        var params = _.getQuery();

        for (var k in data) {
            if (data.hasOwnProperty(k)) {
                ok(params.hasOwnProperty(k), 'Parameter "' + k + '" should exist in query string');
                equal(params[k], data[k], 'Parameter "' + k + '" should equal "' + data[k] + '"');
            }
        }

        // These tests are directly out of the example code from the definition file
        equal(_.getQuery('a'), 'b', 'Query parameter "a" should be "b"');
        equal(_.getQuery('b'), undefined, 'Query parameter "b" should be undefined');
        equal(_.getQuery('c', 'd'), 'd', 'Undefined query parameter should result in default value, if present');
        equal(_.getQuery('a', 'baz'), 'b', 'Default value should not override existing query string value');
    });
});
