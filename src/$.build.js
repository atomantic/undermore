/*jslint jquery:true*/
/*global define*/
/**
 * The jQuery plugin namespace.
 * a set of standard mini jquery plugins and extensions
 * This set of extensions adds functionality to the jQuery.fn external library
 * @external jQuery
 * @see {@link http://docs.jquery.com/Plugins/Authoring The jQuery Plugin Guide}
 * @copyright 2013 Adam Eivy (@antic)
 * @license MIT
 */
 
(function(){
    'use strict';
    var plugin = function($) {
    /**
 * allows the query of elements containing case-insensitive text
 * works just like $(':contains(text)') but as $(':containsI(text)')
 * Additionally, allows regex searches:
 * 
 * @function external:jQuery.containsI
 * @example
 *  $("p:containsI('\\bup\\b')") (Matches "Up" or "up", but not "upper", "wakeup", etc.)
 *  $("p:containsCI('(?:Red|Blue) state')") (Matches "red state" or "blue state", but not "up state", etc.)
 *  $("p:containsCI('^\\s*Stocks?')") (Matches "stock" or "stocks", but only at the start of the paragraph (ignoring any leading whitespace).)
 * @return selection of elements containing string (insensitively)
 */
$.expr[":"].containsI = function(elem, i, match) {
    return (new RegExp (match[3], 'i')).test(elem.textContent || elem.innerText || '');
};

/**
 * finds elements that contain text starting with string
 * 
 * @function external:jQuery.startsWith
 * @example
 *  $(':startsWith(text)')
 * @return {object} selection of elements that have text starting with given string
 */
$.expr[":"].startsWith = function(elem, i, match) {
    return ( elem.textContent || elem.innerText || '' ).indexOf( match[3] ) === 0;
};

/**
 * convert a form's name/value pairs to a json object
 * 
 * @function external:jQuery.formToObject
 * @example 
 *  // captures the field/value set from #myform
 *  var formData = $('#myform').formToObject();
 * 
 * @return {object} a json representation of the form
 */
$.fn.formToObject = function() {
   var o = {},
       a = this.serializeArray(),
       name;
   $.each(a, function() {
     name = this.name;
       if (o[name] !== undefined) {
           if (!o[name].push) {
               o[name] = [o[name]];
           }
           o[name].push(this.value || '');
       } else {
           o[name] = this.value || '';
       }
   });
   return o;
};
    };
    // support for requirejs
    if ( typeof define === 'function' && define.amd ) {
        define(['jquery'], function ($) { 
            return plugin($); 
        } );
    } else {
        plugin(jQuery);
    } 
}());