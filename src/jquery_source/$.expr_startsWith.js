/**
 * finds elements that contain text starting with string
 * 
 * @function module:jQuery.startsWith
 * @example
 *  $(':startsWith(text)')
 * @return {object} selection of elements that have text starting with given string
 */
$.expr[":"].startsWith = function(elem, i, match) {
    return ( elem.textContent || elem.innerText || '' ).indexOf( match[3] ) === 0;
};