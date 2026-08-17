_.mixin({
    /**
     * Base64-encode a UTF-8 string or Buffer.
     *
     * @function module:undermore.base64_encode
     * @param {string|Buffer} str The value to encode
     * @return {string}
     * @example _.base64_decode('✈') => '4pyI'
     */
    base64_encode: function(str) {
        var buffer = Buffer.isBuffer(str) ? str : Buffer.from(String(str), 'utf8');
        return buffer.toString('base64');
    }
});
