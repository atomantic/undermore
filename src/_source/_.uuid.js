_.mixin({
    /**
     * generate a random v4 UUID of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx,
     * where each x is replaced with a random hexadecimal digit from 0 to f,
     * and y is replaced with a random hexadecimal digit from 8 to b.
     *
     * @function module:undermore.uuid
     * @link http://www.ietf.org/rfc/rfc4122.txt
     * @return {string} random uuid
     * @example
     *  var uuid = _.uuid();
     */
    uuid: function() {
        var d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
});
