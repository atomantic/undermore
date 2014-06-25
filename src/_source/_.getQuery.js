_.mixin({
    /**
     * Get the requested key from the query string.
     * If no key is provided, return a map of all
     * query string values.
     *
     * @param {string} key The key to retrieve from the query string
     * @param {*} defaultValue The default value to return if key does not exist
     * @example:
     *  // URL: http://foo.com?a=b&foo=bar
     *  _.getQuery() === { a: 'b', foo: 'bar' }
     *  _.getQuery('a') === 'b'
     *  _.getQuery('b') === undefined
     *  _.getQuery('c', 'd') === 'd'
     *  _.getQuery('a', 'baz') === 'b'
     */
    getQuery: (function () {
        var o;
        var parseIt = function () {
            o = {};
            var query = (function (query) {
                if (query && query.length > 0) {
                    return query.replace(/^\?/, '').split('&');
                }
                return [];
            })(window.location.search);

            _.map(query, function (item) {
                var param = item.split('=');
                if (param.length === 2) {
                    o[param[0]] = param[1];
                }
            });
        };

        return function (key, defaultValue) {
            if (typeof o === 'undefined') {
                parseIt();
            }

            return typeof key === 'undefined' ? o : (typeof o[key] === 'undefined' ? defaultValue : o[key]);
        };
    })()
});