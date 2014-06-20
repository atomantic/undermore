/**
 * Set a deep value on an object (even if the key path doesn't exist)
 * this is a shorthand for _.extend(), which is useful in cases where you can't easily build the extension object
 * e.g. if you are building a path from variable names:
 * _.set(obj, 'prop.'+varName+'.key', value); // 1 line vs: 3 lines with _.extend
 * var extendObj = {prop:{}};
 * extendObj.prop[varName] = {key:value};
 * _.extend(obj, extendObj);
 *
 * @function module:undermore.set
 * @param {object} obj The object to traverse
 * @param {mixed} chain A string/array path to use for finding the end item (e.g. 'prop.child.end' or ['prop','child','end'])
 * @param {mixed} value The value to set the end key to
 * @return {mixed} The full new extended object
 * @example
 *  var data = {
 *          prop: {}
 *      };
 *
 *  deepEqual(_.set(data, 'prop', 1), _.extend(data, {prop:1}) );
 *  deepEqual(_.set(data, 'prop.foo', 'fooVal'),  _.extend(data, {prop:{foo:'fooVal'}}) );
 *  deepEqual(_.set(data, 'newKey', 'newVal'),  _.extend(data, {newKey:'newVal'}) );
 *  deepEqual(_.set(data, 'deep.key.that.does.not.exist', 'deepVal'),  _.extend(data, {
 *      deep: {
 *           key:{
 *               that:{
 *                   does:{
 *                       not:{
 *                           exist:'deepVal'
 *                       }
 *                   }
 *               }
 *           }
 *       }
 *  }));
 */
set: function(obj, chain, value) {
    if (typeof chain === 'string') {
        chain = chain.split('.');
    }
    var key = obj,
        length = chain.length - 1;

    for (var i = 0; i < length; i++) {
        if (typeof key[chain[i]] === 'undefined' || key[chain[i]] === null) {
            key[chain[i]] = {};
        }

        key = key[chain[i]];
    }

    key[chain[length]] = value;

    return obj;
}