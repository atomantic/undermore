/*jslint browser:true*/
/*global console*/

/**
* console safety
* @module core
* @see {@link http://patik.com/blog/complete-cross-browser-console-log/ Console.log}
*/

/**
 * make it safe to use console.log always
 * 
 * @function module:core.console
 */
(function(a) {
    function b() {}
    for (
        var c = 'assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn'.split(','), 
        d; !! (d = c.pop());
    ) {
        a[d] = a[d] || b;
    }
})((function() {
    try {
        console.log();
        return window.console;
    } catch (a) {
        return (window.console = {});
    }
}()));