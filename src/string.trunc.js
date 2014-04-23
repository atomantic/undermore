/**
 * shorten a string, adding a suffix in place of excessive characters
 * default suffix is an html encoded ellipsis '&hellip;'
 * 
 * @function external:String.prototype.trunc
 * @param {number}     len     The lenth of the string to keep (not counting suffix)
 * @param {string}  suffix  The suffix to append (e.g. '...<a>read more</a>')
 * @return {string}
 * @example
 *  'this is a description that is too detailed'.trunc(10) === 'this is a &hellip;'
 */
String.prototype.trunc = String.prototype.trunc || function(len,suffix) {
    return this.length > len ? this.slice(0, len) + (suffix||'&hellip;') : this;
};