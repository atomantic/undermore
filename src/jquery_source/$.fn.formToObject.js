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