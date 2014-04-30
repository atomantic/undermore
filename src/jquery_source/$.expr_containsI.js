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