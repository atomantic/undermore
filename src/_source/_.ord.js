_.mixin({
    /**
     * Get the english ordinal suffix for any number
     *
     * @function module:undermore.ord
     * @param {number} n number The number to evaluate
     * @return {string} The ordinal for that number
     * @example
     *  _.ord(1) === 'st'
     *  _.ord(345) === 'th'
     */
    ord: function(n) {
        var sfx = ['th', 'st', 'nd', 'rd'],
            v = n % 100;
        return sfx[(v - 20) % 10] || sfx[v] || sfx[0];
    }
});