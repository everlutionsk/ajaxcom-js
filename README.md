# About Ajaxcom

todo

# Usage

`ajaxcom` library will handle all links except links containing `data-ajaxcom-ignore` and links which contains `target="_blank"` by default. It automatically handles also all form submissions except forms containing `data-ajaxcom-ignore`. When server error occurs the generic message is shown via JavaScript alert.

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
require('@everlutionsk/ajaxcom').ajaxcom({
    complete: function () {
        console.log('Yet another page rendered via ajaxcom');
    },
    error: function (e) {
        console.error(e);
    }
});
```

# Development

## Install dependencies

```bash
docker run --rm -it -v $(pwd):/app -w /app node npm install
```

## Compilation

```bash
docker run --rm -it -v $(pwd):/app -w /app node npm run build
docker run --rm -it -v $(pwd):/app -w /app node npm run watch
```

## Linting

```bash
docker run --rm -it -v $(pwd):/app -w /app node npm run lint # shows you the problems
docker run --rm -it -v $(pwd):/app -w /app node npm run lint-fix # fix the majority problems for you
```

## Publish

```bash
docker run --rm -it -v ~/.composer/:/root/.composer/ -v $(pwd):/app -w /app node bash
npm login
npm version patch|minor|major
npm publish . --tag @everlutionsk/ajaxcom@x.y.z --access public
```
