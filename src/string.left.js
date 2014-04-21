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