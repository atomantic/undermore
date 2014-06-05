/**
 * empty event handler function, which simply prevents default handling
 *
 * @function module:undermore.eFn
 * @example
 *  $('#thing').on('click',this.conf.onClick||_.eFn)
 */
eFn: function(e) {
    e.preventDefault();
}