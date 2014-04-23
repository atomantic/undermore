[min]: https://raw.github.com/atomantic/undermore/master/dist/undermore.min.js
[max]: https://raw.github.com/atomantic/undermore/master/dist/undermore.js
[docs]: http://atomantic.github.io/undermore/#docs
[build]: http://atomantic.github.io/undermore/#download

## Undermore (mo-dash): vetted, tested, documented mixins

[![Build Status](https://travis-ci.org/atomantic/undermore.png?branch=dev)](https://travis-ci.org/atomantic/undermore)

## About

We've all seen this happen:

A developer needs a generic function that isn't a part of the language spec. Let's use Base64 encoding as an example. So you need to base64 encode some data, but there's no base64 encode/decode in javascript. So what does a developer do? Google it, of course. So you find something to fit the need, it's a pretty big chunk of code, but you figure it's like a library, so you just drop it into your codebase in a /libs folder and call it as a global function. Over time, you've collected a whole lot of these and it's not clear what is available to a developer and what isn't. To make matters worse, if you are developing modular code across teams, you likely don't know that another team has a copy of the same base64 function, but it isn't part of underscore.js, so you both implement it. I have a product right now with several teams contributing that contains 3 copies of a Base64 function :(

So let's be honest: web standards can't keep up with innovation. While I may make devil's-advocate and practical arguments against some of the complaints in [Zed Shaw's talk](http://vimeo.com/43380467), he still makes a lot of great points regarding the speed (or lack thereof) in standards adoption.

If web standards were implemented as quickly as they should be:

* we wouldn't have to write out ```Math.floor( Math.random() * (10-1+1) ) + 1``` in order to choose a number between 1 and 10!
* we wouldn't have to create a tool to format the date in a sensible, readable way (and there wouldn't be 30 different libraries and standards for doing it).
* we wouldn't have to provide our own ellipsis method for truncating strings
* our own UUID generating function
* our own method to get the ordinal suffix of a number (1 => "st")
* etc...

Most of these utilities are small and in standard use throughout the industry anyway--but you shouldn't have to hunt google, stackoverflow or 140byt.es to find these. And wouldn't you like them to come with [unit tests](https://travis-ci.org/atomantic/undermore) and auto-generated [documentation][docs].

[underscore.js](http://underscorejs.org/) and [lo-dash](http://lodash.com/) have a lot of extra tools and specs for javascript that are either implemented in edge versions of ecmascript or on the way in the future, but there are still utilities that haven't made it into lo-dash or underscore that you will use in your product. If you are using underscore.js or lodash.js in your project, this is an additional library to help you collect things like _.base64, so you don't end up with a lot of global namespace pollution, duplication, and google copied code with potential bugs.

Additionally, this library provides a selection of String methods in patient anticipation of the next ecmascript standard, hoping it might have some of these methods: http://wiki.ecmascript.org/doku.php?id=harmony%3astring_extras

If you want polyfils for ES6, I highly recommend using [the es6-shim](https://github.com/paulmillr/es6-shim) in tandem with underscore/lo-dash + undermore. You can even include the es6-shim with your [custom build][build]!

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
var undermore = require('undermore');

// "get the english ordinal for a number"
var num = 345,
    ord = _.ord(num),
    out = 'your number is the '+num+ord;
// out is now 'your number is the 345th';
```

### In the browser
Download the [production version][min] or the [development version][max].

In your web page:

```html
<script src="libs/lodash/dist/lodash-min.js"></script>
<script src="dist/undermore.min.js"></script>
<script>
// "get the english ordinal for a number"
var num = 345,
    ord = _.ord(num);
    out = 'your number is the '+num+ord;
// out is now 'your number is the 345th';
</script>
```

## Documentation
You can view the documentation generated via grunt:jsdoc on github: [http://atomantic.github.io/undermore/docs/module-undermore.html][docs]

## Custom Build
Create your own [custom build][build]!

## Contributing

Start by downloading the project:

```
git clone git@github.com:atomantic/undermore.git
cd undermore;
git submodule update --init
```

In lieu of a formal styleguide, take care to maintain the existing coding style.
Please note that the codebase uses 4 spaces (not 2) instead of tabs--and uses the comma pattern for declaring sets of new variables. 
Add unit tests for any new or changed functionality. 
Lint, build and test your code using [Grunt](http://gruntjs.com/).

_Also, please note that aside from the index.html (custom build tool) the "dist" subdirectory is generated via Grunt. You'll find source code in the "src" subdirectory :)_

## Release History

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
