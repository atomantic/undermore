_.mixin({
    /**
     * generate a cryptographically random v4 UUID of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx,
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
        return nodeCrypto.randomUUID();
    }
});
