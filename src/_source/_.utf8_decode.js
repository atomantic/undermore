_.mixin({
    /*jshint -W100*/
    /**
     * utf8 decode a string
     *
     * @function module:undermore.utf8_decode
     * @link http://monsur.hossa.in/2012/07/20/utf-8-in-javascript.html
     * @param {string} str The string to decode
     * @return {string}
     * @example
     *  _.utf8_decode('asdf') === 'asdf';
     *  _.utf8_decode('è¤é') === '複雜';
     *  _.utf8_decode('â') === '✈';
     */
    /*jshint +W100*/
    utf8_decode: function(str) {
        return decodeURIComponent(escape(str));
    }
});
