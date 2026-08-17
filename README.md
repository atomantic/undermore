# Undermore

> [!CAUTION]
> Undermore is deprecated and no longer maintained. Do not use it for new projects. Version 2.0.0 is the final npm release; no further features, fixes, security updates, or support are planned.

Undermore is a historical collection of utility mixins for Lodash. It was useful when JavaScript and Lodash lacked many small conveniences that are now available directly in the language, the platform, or Lodash itself.

## What to use instead

Prefer maintained, focused APIs:

- Use [Lodash](https://lodash.com/) for object traversal and utility helpers such as `get` and `set`.
- Use `Buffer` in Node.js or `TextEncoder`, `TextDecoder`, `btoa`, and `atob` in browsers for Base64 and UTF-8 conversion.
- Use `crypto.randomUUID()` for UUID generation.
- Use native `String` methods such as `startsWith`, `endsWith`, and `includes`.
- Use a maintained semantic-version package when full SemVer behavior is required.

There is no one-for-one successor because Undermore grouped unrelated helpers. Migrate only the methods your application uses and add focused tests around their current behavior.

## Existing installations

The final package remains available so existing applications can make a controlled migration:

```sh
npm install undermore@2.0.0
```

The CommonJS API is unchanged:

```js
var _ = require('lodash');

_.mixin(require('undermore'));

var id = _.uuid();
```

Version 2.0.0 requires Node.js 20.19 or newer. It updates the runtime dependency, removes the obsolete Gulp/PhantomJS development stack and vendored browser site, adds current automated verification, and prevents prototype pollution through Undermore's `set` mixin. The old browser download builder, jQuery extensions, and prototype polyfills have been retired.

## Final verification

For historical maintenance or migration work:

```sh
npm ci
npm run verify
```

`npm run build` deterministically regenerates `src/_.build.js` and the published `bin/undermore.js` file from the mixins in `src/_source/`. Tests use Node's built-in test runner and run on supported Node releases in GitHub Actions.

## License

MIT © Adam Eivy. See [LICENSE-MIT](LICENSE-MIT).
