/**
 * see if a string ends with a given string
 * 
 * Once ecmascript adds this natively, you should build core.js without this method:
 * @see {@link http://wiki.ecmascript.org/doku.php?id=harmony%3astring_extras Harmony String Extras}
 * @see {@link http://jsperf.com/string-prototype-endswith/3 JSPerf}
 * @function module:String.prototype.endsWith
 * @param {string} A substring expected to be in the beginning of this string
 * @return {boolean}
  * @example
  *  'some string'.endsWith('g') === true;
  *  'some string'.endsWith('string') === true;
  *  'some string'.endsWith('!') === false;
 */
String.prototype.endsWith = String.prototype.endsWith || function (suffix){ 
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};