/**
 * Capitalizes the first letter of a string and downcases all the others.
 *
 * @function external:String.prototype.capitalize
 * @return {string}
 * @example
 *  'hello'.capitalize() === 'Hello'
 *  'HELLO WORLD!'.capitalize() === 'Hello world!'
 */
String.prototype.capitalize = String.prototype.capitalize || function() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
};