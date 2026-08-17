_.mixin({
    /**
     * base64_encode encode a string. This is not a strict window.btoa polyfill
     * because it handles utf8 strings (unlike the window.btoa spec)
     *
     * Note: it might be work including an urlsafe flag
     * (see https://github.com/knowledgecode/base64.js)
     *
     * @function module:undermore.base64_encode
     * @link https://github.com/davidchambers/Base64.js
     * @param {string} str The string to encode
     * @return {string}
     * @example _.base64_decode('✈') => '4pyI'
     */
    base64_encode: function(str) {
        // allow node.js Buffer implementation if it exists
        if (typeof Buffer !== 'undefined') {
            var buffer = Buffer.isBuffer(str) ? str : Buffer.from(str.toString(), 'utf8');
            return buffer.toString('base64');
        }
        // allow browser implementation if it exists
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa
        if (typeof btoa !== 'undefined') {
            // first utf8 encode to keep from throwing an error if we are out of 0xFF
            return btoa(_.utf8_encode(str));
        }
        // now roll our own
        // [https://gist.github.com/999166] by [https://github.com/nignag]
        for (
            // initialize result and counter
            // note: chars is defined in the _.banner.tmpl
            var block, charCode, idx = 0, map = chars, output = '';
            // if the next input index does not exist:
            //   change the mapping table to "="
            //   check if d has no fractional digits
            str.charAt(idx | 0) || (map = '=', idx % 1);
            // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
            output += map.charAt(63 & block >> 8 - idx % 1 * 8)
        ) {
            charCode = str.charCodeAt(idx += 3 / 4);
            block = block << 8 | charCode;
        }
        return output;
    }
});
