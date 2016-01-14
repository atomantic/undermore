_.mixin({
    /**
     * get a new function, which runs two functions serially within a given context
     *
     * @function module:undermore.fnMore
     * @param {function} originalFn The original function to run
     * @param {function} moreFn The extra function to run in the same context after the first
     * @param {object} scope The context in which to run the fn
     * @return {function} the new function which will serially call the given functions in the given scope
     * @example
     *   var fn = _.fnMore(oldFn,newFn,someObj);
     *   fn();
     *   // runs oldFn, then newFn in the context of someObj
     */
    fnMore: function(originalFn, moreFn, scope) {
        return scope ?
            function() {
                originalFn.apply(scope, arguments);
                moreFn.apply(scope, arguments);
        } : function() {
            originalFn();
            moreFn();
        };
    }
});
