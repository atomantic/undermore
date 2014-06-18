/**
 * Compare a semantic version number string to another (e.g. "2.0.10" > "2.0.2")
 * Note: does not differentiate "1.0.1-pre" and "1.0.1"
 * However, 1.2.3.rc1 or 1.2.3-rc1 will be evaluated as 1.2.3.1 (and resolve higher than 1.2.3)
 *
 * @function module:undermore.version
 * @param {string} left The left version
 * @param {string} oper The operator to use for comparison ('==','>=','<=','<','>')
 * @param {string} right The right version
 * @return {bool} whether or not the versions resolved true with the comparitor
 * @example)
 *  ok(_.version('1.0.0','<','2.0.0', 'major version is smaller');
 *  ok(_.version('1.0.10','>=','1.0.2'), 'patch version 10 is greater than or equal to 2');
 */
version: function(left, oper, right) {

	// is equal acceptable?
	var equal = oper.indexOf('=')!==-1;
	// see if we can bail early
	if(equal && left===right){
		// versions are exactly the same and that's good enough for us
		return true;
	}

	var regSplit = /[.-]/,
		regReplace = /\D*/,
		leftArray = left.split(regSplit),
		rightArray = right.split(regSplit),
		// how much do we need to loop (only need to compare to least specific)
		// "1.0.2" > "2" doesn't need to run 3 loop actions (just one)
		maxLen = Math.max(leftArray.length, rightArray.length),
		// 
		l,
		r,
		// once we hit a difference, kill the loop
		hit;

	for(var i=0;i<maxLen && !hit;i++){
		// handle case where index does not exist in one of the sets
		// in which case it will be less than whatever is in the other version
		// e.g. when comparing 1.2.3.4 with 1.2.3
		// we will convert the evaluation to 4 vs -1, leaving 4 as a higher version
		l = leftArray.length <= i ? -1 : parseInt(leftArray[i].replace(regReplace,''),10);
		r = rightArray.length <= i ? -1 : parseInt(rightArray[i].replace(regReplace,''),10);
		if(l!==r){
			hit = true;
			break;
		}
	}

	// at this point, l and r will be the first number in position that was not the same
	// or we will have made it through the loop and all were identical

	if(
		// equal
		(equal && l===r) ||
		// left is greater
		(oper.indexOf('>')!==-1 && l > r) ||
		// right is greater
		(oper.indexOf('<')!==-1 && l < r)
	){
		return true;
	}

	// not the droid we are looking for
	return false;
}