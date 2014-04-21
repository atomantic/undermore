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