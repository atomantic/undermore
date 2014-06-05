/**
 * Get a deep value on an Object safely (optionally with a default value)
 *
 * @function module:undermore.get
 * @param {object} obj The object to traverse
 * @return {string} ks The keystring to use for finding the item (e.g. 'prop.child.end')
 * @link http://jsperf.com/deepget-vs-steeltoe/2
 * @example:
 *  var obj = {
 *		"prop": 1
 *  };
 *  _.get(obj,'prop','blarg') === 1
 *  _.get(obj,'prop.child','blarg') === 'blarg'
 *  _.get(obj,'thing','blarg') === 'blarg'
 *  _.get(obj) === obj
 */
get: function (obj, ks, defaultValue) {
	if (typeof ks === 'string') {
		ks = ks.split('.');
	}

	// end of the line (found nothing)
	if (obj === undefined) {
		return defaultValue;
	}

	// end of the line (found self)
	if (ks.length === 0) {
		return obj;
	}

	// can't continue down the line any further (non-traversable)
	if (obj === null) {
		return defaultValue;
	}

	// keep traversing
	return _.get(obj[_.first(ks)], _.rest(ks), defaultValue);
}