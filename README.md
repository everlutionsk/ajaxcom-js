# About Ajaxcom

Ajaxcom is JavaScript library which can be used for DOM manipulation called via Ajax from any backend you want. If you are using PHP you can easily use it with [Ajaxcom PHP Library](https://github.com/everlutionsk/ajaxcom-php). If you use Symfony framework, you can start using [Ajaxcom Symfony bundle](https://github.com/everlutionsk/ajaxcom-bundle).

Ajaxcom uses `fetch` and `Promise` functions. When you have problems with older browsers, please use [`fetch`](https://github.com/github/fetch) and [`Promise`](https://www.npmjs.com/package/promise-polyfill) polyfills.

# Usage

`ajaxcom` library will handle all links except links containing `data-ignore-ajaxcom` and links which contains `target="_blank"` by default. It automatically handles also all form submissions except forms containing `data-ignore-ajaxcom`. When server error occurs the generic message is shown via JavaScript alert.

You can override all of the default options when initializing `ajaxcom` library and you can setup few callbacks as well.

## Options

You can specify following options when initializing the library - you will pass an object as only argument to `ajaxcom()` function:

- `beforeSend` (function which returns promise) - this function will be called before each Ajax request
- `success` - (function which returns promise) - this function will be called after the request from backend has been successful
- `error` - (simple function) - this function will be called when error occurs on server eg. when server returns non 200 OK response
- `complete` - (simple function) - this function is called after `ajaxcom` handles the request eg. after all DOM manipulations
- `linksSelector` - (string CSS selector) - you can specify which links should be handled via `ajaxcom`
- `formsSelector` - (string CSS selector) - you can specify which forms should be handled via `ajaxcom`

Example:

```typescript
// initialization
const ajaxcom = require('@everlutionsk/ajaxcom');
ajaxcom.initialize({
  complete: function () {
    console.log('Yet another page rendered via ajaxcom');
  },
  error: function (e) {
    console.error(e);
  }
});

// usage of Ajaxcom request
ajaxcom.fetch({
  url: 'https://some.url',
  method: 'POST', // defaults to 'GET'
  body: JSON.stringify({ data: 'you', want: 'to', pass: 'to backend' }) // optional
  // optionally you can provide callbacks such as beforeSend, success, error and complete
});
```

# Development

Install the **latest** [yarn](https://yarnpkg.com/en/docs/install).

Install all dependencies via yarn:

```
yarn install
```

## Compilation

```bash
yarn build
yarn watch
```

## Linting

```bash
yarn checkup
```

## Publish

```bash
npm login
npm version patch|minor|major
npm publish . --access public
```
