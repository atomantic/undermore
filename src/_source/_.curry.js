/**
  * create a partial application function (curry)
  * 
  * @function module:undermore.curry
  * @link http://stackoverflow.com/questions/113780/javascript-curry-what-are-the-practical-applications
  * @param {function} fnBase The function to curry or partially apply
  * @return {function}
  * @example
     var adder = function() {
         var n = 0, args = [].slice.call(arguments);
         for (var i = 0, len = args.length; i < len; i++) {
             n += args[i];
         }   
         return n;
     };
     adder(2,2) === 4;
     // curry adder for later application as a partial
     var addTwelve = _.curry(adder, 12);
     addTwelve(5,3) === 20;
  */
curry: function(fnBase) {
    // convert arguments to an array and store reference upward of return closure
    var args = [].slice.call(arguments, 1);
    return function() {
        // apply the original function with old arguments combined with new arguments
        return fnBase.apply(this, args.concat(args.slice.call(arguments)));
    };
}