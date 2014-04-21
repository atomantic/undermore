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