_.mixin({
    /**
     * Get a deep value on an Object safely (optionally with a default value).
     * {@link http://jsperf.com/deepget-vs-steeltoe/3#run|Run jsperf test}
     *
     * @function module:undermore.get
     * @param {object} obj The object to traverse
     * @param {mixed} chain A string/array path to use for finding the end item (e.g. 'prop.child.end' or ['prop','child','end'])
     * @param {mixed} defaultValue The default value to return if key does not exist
     * @return {mixed} the last item in the ks or the defaultValue
     * @example
     *  var obj = {
     *     prop: 1
     *  };
     *  _.get(obj,'prop','blarg') === 1
     *  _.get(obj,'prop.child','blarg') === 'blarg'
     *  _.get(obj,'thing','blarg') === 'blarg'
     *  _.get(obj) === obj
     */
    get: function (obj, chain, defaultValue) {
        if (typeof chain === 'undefined' || chain === null) {
            return obj;
        }

        var path = normalizePath(chain);
        if (path === null) {
            return defaultValue;
        }

        var current = obj;
        for (var index = 0; index < path.length; index += 1) {
            if (current === null || typeof current === 'undefined') {
                return defaultValue;
            }

            var container = Object(current);
            if (!hasOwn(container, path[index])) {
                return defaultValue;
            }

            current = container[path[index]];
        }

        return typeof current === 'undefined' ? defaultValue : current;
    }
});
