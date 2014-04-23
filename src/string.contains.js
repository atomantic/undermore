/**
 * determines whether one string may be found within another string
 * 
 * Once ecmascript adds this natively, you should build core.js without this method:
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains
 * @function external:String.prototype.contains
 * @param {string} searchString A string to be searched for within this string.
 * @param {number} position The position in this string at which to begin searching for searchString; defaults to 0.
 * @return {boolean}
  * @example
  *  var str = "To be, or not to be, that is the question.";
  *  console.log(str.contains("To be"));       // true
  *  console.log(str.contains("question"));    // true
  *  console.log(str.contains("nonexistent")); // false
  *  console.log(str.contains("To be", 1));    // false
  *  console.log(str.contains("TO BE"));       // false
 */
String.prototype.contains = String.prototype.contains || function() {
    return String.prototype.indexOf.apply( this, arguments ) !== -1;
};