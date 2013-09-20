/*jslint jquery:true,browser:true */
/*global test,module,deepEqual,equal,ok,notEqual,_*/
(function() {
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
        setup: function() {
        }
    });
    
    test('curry',function(){
        // create a curry fn
        // this function takes whatever arguments are passed and adds them together
          var adder = function() {
            var n = 0, args = [].slice.call(arguments);

            for (var i = 0, len = args.length; i < len; i++) {
              n += args[i];
            }   

            return n;
          };

          equal(adder(2,2),4,'test basic adder with 2 args');

          // curry adder for later application
          var addTwelve = _.curry(adder, 12);

          equal(addTwelve(3),15,'test add twelve to 3 for 15');
          
          equal(addTwelve(3,6,4),25,'test add twelve with 3 args');
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
    
    test('uuid',function(){
        var uuid1 = _.uuid(),
            uuid2 = _.uuid(),
            parts = uuid1.split('-'),
            limited = uuid1.charAt(19),
            cache = {},
            i,
            uuid;
            
        notEqual(uuid1,uuid2,'two different uuids generated: '+uuid1+' and '+uuid2);
        
        equal(parts.length,5,'uuid has correct number of segments');
        
        equal(parts[0].length,8,'1st segment length is 8');
        equal(parts[1].length,4,'2nd segment length is 4');
        equal(parts[2].length,4,'3rd segment length is 4');
        equal(parts[3].length,4,'4th segment length is 4');
        equal(parts[4].length,12,'5th segment length is 12');
        
        equal(parts[2].charAt(0),'4','3rd segment begins with a 4');
        
        
        ok((/[^cdef0-7]/).test(limited),'4th segment begins with 8-b ('+limited+')');
        
        // now let's generate a ton of them and make sure they are unique
        
        for(i=0;i<10000;i++){
            uuid = _.uuid();
            limited = uuid.charAt(19);
            
            ok(!cache[uuid] && (/[89ab]/).test(limited),uuid+' is unique and 4th segment begins with 8-b ('+limited+')');
            
            cache[uuid] = 1;
        }
        
    });

})();
