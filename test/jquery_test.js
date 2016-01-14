/*jslint jquery:true*/
/*global test,module,define,equal,deepEqual*/
define(['../src/safe.js', '../src/$.build.js'], function() {
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

    module('jQuery#undermore', {
        // This will run before each test in this module.
        setup: function() {
            this.elems = $('#qunit-fixture').children();
        }
    });

    test('formToObject', function() {
        var $form = $('#formToObject'),
            formObj = $form.formToObject();

        deepEqual(
        formObj, {
            someName: 'someValue',
            hiddenName: 'hiddenValue'
        }, 'Form convert to json object');
    });

    test(':containsI',function(){
        var $area = $('#containsI');
        equal($area.find(':containsI(CASE)').length,2,'found two element where text contains an insensitive match for "CASE"');
    });

    test(':startsWith',function(){
        var $area = $('#startsWith'),
            $startsWith_s = $area.find(':startsWith(s)'),
            $startsWith_last = $area.find(':startsWith(last)');

        equal($startsWith_s.length,2,'found two elements where text begins with "s"');
        equal($startsWith_last.length,1,'found one element where text begins with "last"');
        equal($area.find(':startsWith(foobar)').length,0,'found zero element where text begins with "foobar"');
    });
});
