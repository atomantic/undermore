/**
 * utf8 decode a string
 *
 * @function module:undermore.utf8_decode
 * @link http://monsur.hossa.in/2012/07/20/utf-8-in-javascript.html
 * @param {string} str The string to decode
 * @return {string}
 */
utf8_decode: function(str) {
    return decodeURIComponent(escape(str));
}