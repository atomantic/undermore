/**
 * :startsWith() returns a selection of elements that have text
 * starting with the given string
 * @example
 *  $(':startsWith(text)')
 */
$.expr[":"].startsWith = function(elem, i, match) {
    return ( elem.textContent || elem.innerText || '' ).indexOf( match[3] ) === 0;
};