var _ = require('lodash');
_.mixin(require('./bin/undermore'));

// get a random uuid
console.log(_.get({foo:{bar:1}},'foo.bar'));