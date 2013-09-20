/**
 * Capitalizes the first letter of a string and downcases all the others.
 *
 * @function external:String.prototype.capitalize
 * @return {string}
 * @example
 *  'hello'.capitalize() === 'Hello'
 *  'HELLO WORLD!'.capitalize() === 'Hello world!'
 */
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
};

/**
 * see if a string ends with a given string
 * 
 * Once ecmascript adds this natively, you should build core.js without this method:
 * @link http://wiki.ecmascript.org/doku.php?id=harmony%3astring_extras
 * @link http://jsperf.com/string-prototype-endswith/3
 * @function external:String.prototype.endsWith
 * @param {string} A substring expected to be in the beginning of this string
 * @return {boolean}
  * @example
  *  'some string'.endsWith('g') === true;
  *  'some string'.endsWith('string') === true;
  *  'some string'.endsWith('!') === false;
 */
String.prototype.endsWith = function (suffix){ 
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

/**
 * get a substring of a particular length from the left
 * 
 * @function external:String.prototype.left
 * @param {number}     n     The lenth of the string to return
 * @return {string}
 * @example
 *  'foobar'.left(3) === 'foo'
 */
String.prototype.left = function(n) {
	return this.substr(0,n);
};

/**
 * get a substring of a particular length from the right
 * 
 * @function external:String.prototype.right
 * @param {number}     n     The lenth of the string to return
 * @return {string}
 * @example
 *  'foobar'.right(3) === 'bar'
 */
String.prototype.right = function(n) {
	return this.substr((this.length-n),this.length);
};


/**
 * see if a string begins with a given string
 * 
 * Once ecmascript adds this natively, you should build core.js without this method:
 * @link http://wiki.ecmascript.org/doku.php?id=harmony%3astring_extras
 * @function external:String.prototype.startsWith
 * @param {string} A substring expected to be in the beginning of this string
 * @return {boolean}
  * @example
  *  'some string'.startsWith('s') === true;
 */
String.prototype.startsWith = function (prefix){
    return this.slice(0, prefix.length) === prefix;
};

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
String.prototype.trunc = function(len,suffix) {
    return this.length > len ? this.slice(0, len) + (suffix||'&hellip;') : this;
};