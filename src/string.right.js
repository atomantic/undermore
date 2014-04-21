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