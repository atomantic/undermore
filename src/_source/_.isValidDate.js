/**
 * By default, underscore returns true for: _.isDate(SOME_INVALID_DATE) :facepalm: 
 *
 * @function module:undermore.isValidDate
 * @param {date} dateVal The date to test
 * @return {bool} Whether or not the date is valid
 * @example:
 *  _.isValidDate(new Date()) === true
 *  _.isValidDate(new Date('foobar')) === false
 *  _.isValidDate('1234') === false
 */
isValidDate: function (dateVal) {
    //return !(_.isNaN(dateVal.valueOf()));
    
    // underscore
    /*
		_.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
			_['is' + name] = function(obj) {
			  return toString.call(obj) == '[object ' + name + ']';
			};
		});
     */
    // lodash:
    /*
	    var dateClass = '[object Date]';
	    function isDate(value) {
	      return (value && typeof value == 'object' && toString.call(value) == dateClass) || false;
	    }
    */
    return _.isDate(dateVal) && !_.isNaN(dateVal.getTime());
}