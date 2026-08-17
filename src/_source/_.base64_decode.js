_.mixin({
    /**
     * Decode a Base64-encoded UTF-8 string.
     *
     * @function module:undermore.base64_decode
     * @param {string} str The string to decode
     * @return {string}
     * @example _.base64_decode('4pyI') => '✈'
     */
    base64_decode: function(str) {
        if (typeof str !== 'string') {
            throw new TypeError('Base64 input must be a string');
        }

        var normalized = str.replace(/[\t\n\f\r ]/g, '');
        var paddingIndex = normalized.indexOf('=');
        var paddingLength = paddingIndex === -1 ? 0 : normalized.length - paddingIndex;

        if (
            !/^[A-Za-z0-9+/]*={0,2}$/.test(normalized) ||
            normalized.length % 4 === 1 ||
            (paddingLength > 0 && normalized.length % 4 !== 0) ||
            (paddingLength === 1 && paddingIndex % 4 !== 3) ||
            (paddingLength === 2 && paddingIndex % 4 !== 2)
        ) {
            throw new TypeError('Invalid Base64 input');
        }

        if (paddingLength === 0) {
            normalized += '='.repeat((4 - normalized.length % 4) % 4);
        }

        var buffer = Buffer.from(normalized, 'base64');
        if (buffer.toString('base64') !== normalized) {
            throw new TypeError('Invalid Base64 input');
        }

        return _.utf8_decode(buffer.toString('latin1'));
    }
});
