_.mixin({
    /**
     * test if a value is a valid Date instance, with a valid date
     *
     * @function module:undermore.isValidDate
     * @param {object} value Something to test
     * @return {bool} Whether or not the date is valid
     * @example
     *   var d = new Date('foobar') => Invalid Date
     *   d.getTime() => NaN
     *   _.isDate(d) => true
     *   // even though this is a Date object instance,
     *   // it isn't a valid date... so:
     *   _.isValidDate(d) => false
     */
    isValidDate: function (value) {
        return _.isDate(value) && !(_.isNaN(value.valueOf()));
    }
});
