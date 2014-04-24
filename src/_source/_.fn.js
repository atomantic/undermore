/**
 * Generic empty function to speed up supplying anon empty functions.
 * If you are using jQuery, you could use $.noop if returning undefined is desireable
 * but this one is useful for anything requiring a boolean true return
 *
 * @return {boolean} true
 * @example
 *  this.onComplete = conf.onComplete||_.fn;
 */
fn: function() {
    return true;
}