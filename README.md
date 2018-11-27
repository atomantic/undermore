[min]: https://raw.github.com/atomantic/undermore/master/dist/undermore.min.js
[max]: https://raw.github.com/atomantic/undermore/master/dist/undermore.js
[docs]: http://atomantic.github.io/undermore/#docs
[build]: http://atomantic.github.io/undermore/#download
[tests]: http://atomantic.github.io/undermore/test/undermore.html

## Undermore (mo-dash)
### vetted, tested, documented mixins, polyfills and extensions to JS

[![Build Status](https://travis-ci.org/atomantic/undermore.png?branch=dev)](https://travis-ci.org/atomantic/undermore)
[![NPM version](https://badge.fury.io/js/undermore.svg)](http://badge.fury.io/js/undermore)

## About

We've all seen this happen:

A developer needs a generic function that isn't a part of the language spec. Let's use Base64 transcoding as an example. So you need to base64 encode/decode some data, but javascript btoa and atob isn't even an ecmascript standard it's an HTML spec and is only supported by IE10+ (and all other browsers--with spotty mobile support). Since you have to support old IE versions and mobile, you have to find or write a polyfill. So what does a developer do? Google it, of course. So you find something to fit the need, it's a pretty big chunk of code (unless you find some tiny code-golf version that might have bugs), but you figure it's like a library, so you just drop it into your codebase in a /libs folder and load a new Base64 object as a global namespace. Over time, you've collected a whole lot of these and it's not clear what is available to a developer and what isn't. To make matters worse, if you are developing modular code across teams, you likely don't know that another team has a copy of the same Base64 function (or worse, that they've grabbed another version from a different stack overflow answer and one of these versions has a bug or misses a usecase). It isn't part of underscore.js/lodash.js or any other library in your system, so you both implement it as a standalone. I have a product right now with several teams contributing that contains 3 copies of a Base64 function o_9

So let's be honest: web standards can't keep up with innovation. While I may make devil's-advocate and practical arguments against some of the complaints in [Zed Shaw's talk](http://vimeo.com/43380467), he still makes a lot of great points regarding the speed (or lack thereof) in standards adoption.

If web standards were implemented as quickly as they should be:

* we wouldn't have to write out ```Math.floor( Math.random() * (10-1+1) ) + 1``` in order to choose a number between 1 and 10!
* we wouldn't have to create a tool to format the date in a sensible, readable way (and there wouldn't be 30 different libraries and standards for doing it).
* we wouldn't have to provide our own ellipsis method for truncating strings
* our own UUID generating function
* etc...

Most of these utilities are small and in standard use throughout the industry anyway--but you shouldn't have to hunt google, stackoverflow or 140byt.es to find these. And wouldn't you like them to come with an [automated build](https://travis-ci.org/atomantic/undermore), [unit tests][tests] and auto-generated [documentation][docs].

[underscore.js](http://underscorejs.org/) and [lo-dash](http://lodash.com/) have a lot of extra tools and specs for javascript that are either implemented in edge versions of ecmascript or on the way in the future, but there are still utilities that haven't made it into lo-dash or underscore that you will use in your product. If you are using underscore.js or lodash.js in your project, this is an additional library to help you collect things like _.base64, so you don't end up with a lot of global namespace pollution, duplication, and google copied code with potential bugs.

Additionally, this library provides a selection of String methods in patient anticipation of the next ecmascript standard, hoping it might have some of these methods: http://wiki.ecmascript.org/doku.php?id=harmony%3astring_extras

We've also added some jQuery expression add-ons. But you can custom build any parts you like in or out of the library :)

If you want polyfills for ES6, I highly recommend using [the es6-shim](https://github.com/paulmillr/es6-shim) in tandem with underscore/lo-dash + undermore. You can even include the es6-shim with your [custom build][build]!

## Core Principles

* No additional global/obtuse functions or variables
* Passes jshint
* Includes jsdocs
* Unit tested
* Peer vetted (not randomly chosen from google/stack-overflow answers)
* Provide shims for the latest standards (and proposals)
* Build on lo-dash (preferred over underscore)
* Perf test (jstest)
* Customized build


## Getting Started
### On the server
If you are using node.js, we are published in NPM!
Install the module with: `npm install undermore`

```javascript
var _ = require('lodash');
mixin(require('undermore'));

// get a random uuid
var uuid = _.uuid();
```

### In the browser
Download the [production version][min] or the [development version][max].

In your web page:

```html
<script src="libs/lodash/dist/lodash-min.js"></script>
<!--include the full minified undermore library (or your custom build)-->
<script src="dist/undermore.min.js"></script>
<script>
// get a random uuid
var uuid = _.uuid();
</script>
```

## Documentation
You can view the documentation generated via gulp:docbuild on github: [http://atomantic.github.io/undermore/docs/module-undermore.html][docs]

## Tests
You can [run the QUnit tests][tests]

## Custom Build
Create your own [custom build][build]!

## Contributing

* Fork the project
* Clone your fork
* run
```
git checkout dev;
npm install;
```
* create a branch (from dev)
* add your qunit test to test/undermore_test.js
* create an undermore mixin in src/\_source/\_.YOURMIXIN.js
* run
```
gulp test;
```
* once your tests pass, commit/push your branch and pull-request your branch back to 'dev'

In lieu of a formal styleguide, take care to maintain the existing coding style.
Please note that the codebase uses 4 spaces (not 2) instead of tabs--and uses the comma pattern for declaring sets of new variables.
Add unit tests for any new or changed functionality.
Lint, build and test your code using [Gulp](http://gulpjs.com/).

_Also, please note that aside from the index.html (custom build tool) the "dist" subdirectory is generated via Gulp. You'll find source code in the "src" subdirectory :)_

## Release History

### <sup>v1.9.1</sup>
 * using `require('lodash').runInContext();` to not pollute lodash

### <sup>v1.9.0</sup>
 * _.alphabetize - sorts an object's keys alphabetically

### <sup>v1.8.5</sup>
 * Gulp replaces Grunt
 * fix _.base64 methods for node.js

### <sup>v1.8.0</sup>
 * fixed node.js support :)

### <sup>v1.7.0</sup>
 * _.getQuery(name)
```
// URL: http://foo.com?a=b&foo=bar
_.getQuery() === { a: 'b', foo: 'bar' }
_.getQuery('a') === 'b'
_.getQuery('b') === undefined
_.getQuery('c', 'd') === 'd'
_.getQuery('a', 'baz') === 'b'
```

### <sup>v1.6.0</sup>
 * _.set(obj,chain,value) - a deep object setter, shorthand for _.extend where the chain to set on an object may not exist and may be defined by variable names: e.g.
```
// we've got some vars that define the object key path
var varName = 'myKey';

// we can suffer this with _.extend
var extendObj = {prop:{}};
extendObj.prop[varName] = {key:value};
_.extend(obj, extendObj);

// or set it in one line with _.set
_.set(obj, 'prop.'+varName+'.key', value);
```

### <sup>v1.5.2</sup>
 * _.version now fully supports [Semantic Versioning Standard](http://semver.org/)

### <sup>v1.5.1</sup>
 * _.version
 * undermore.js default build now only includes _.mixins (not even console safety)

### <sup>v1.5.0</sup>
 * _.version
 * undermore.js default build now only includes safe.js and _.mixins

### <sup>v1.4.0</sup>
 * _.isValidDate
 * _.get (faster version of steelToe get method)

### <sup>v1.3.1</sup>
 * Removing _.curry method
     * it conflicted with lo-dash _.curry, implementing lo-dash _.partial rather than lo-dash _.curry as documented
     * old undermore _.curry functionality exists by using _.partial instead

### <sup>v0.3.0</sup>
 * Including jquery extensions and tiny $.fn methods
 * :containsI - case insensitive version of $(':contains(...)')
 * :startsWith - select elements with text that begins with value
 * $.fn.formToObject (get name:value object from html form elements)

### <sup>v0.2.0</sup>
 * Undermore is now split into _source/*.js for customizing undermore builds

### <sup>v0.1.3</sup>
 * String.prototype.contains(searchString, position)
 * es6-shim as a build include option
 * update docs to include lo-dash as preferred foundation

### <sup>v0.1.2</sup>

 * \_.utf8_encode(str)
 * \_.utf8_decode(str)
 * \_.base64_encode(str)
 * \_.base64_decode(str)

### <sup>v0.1.1</sup>

 * Grunt build system
 * jsdoc documentation
 * qunit unit tests
 * \_.curry(fn)
 * \_.uuid()
 * safe console.log
 * added some basic methods: \_.fn, \_.eFn, \_.fnMore, \_.ord
 * String.prototype.capitalize()
 * String.prototype.endsWith(suffix)
 * String.prototype.left(size)
 * String.prototype.right(size)
 * String.prototype.startsWith(prefix)
 * String.prototype.trunc(len, suffix)

## License
Copyright (c) 2013-2014 Adam Eivy (@antic)
Licensed under the MIT license.