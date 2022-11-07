export interface ChangeUrlOptions {
  readonly method: string;
  readonly url: string;
  readonly wait?: number;
}

export function handleChangeUrl(options: ChangeUrlOptions) {
  switch (options.method) {
    case 'push':
      setTimeout(() => pushUrl(options), options.wait);
      break;
    case 'replace':
      setTimeout(() => replaceUrl(options), options.wait);
      break;
    case 'redirect':
      setTimeout(() => redirectToUrl(options), options.wait);
      break;
    default:
      throw new Error(`ChangeUrl method '${options.method}' is not supported`);
  }

  function pushUrl(options: ChangeUrlOptions) {
    const currentUrlHref = window.location.href + window.location.search;
    const currentUrlPath = window.location.pathname + window.location.search;

    if (currentUrlHref === options.url || currentUrlPath === options.url) {
      return;
    }

    history.pushState(options, '', options.url);
  }

  function replaceUrl(options: ChangeUrlOptions) {
    history.replaceState(options, '', options.url);
  }

  function redirectToUrl(options: ChangeUrlOptions) {
    window.location.href = options.url;
  }
}
