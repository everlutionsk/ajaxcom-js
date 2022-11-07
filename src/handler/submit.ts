import { MakeRequest } from '../ajaxcom';
import { FetchOptions } from './request';

export function toSubmitHandler(props: { formsSelector: string; makeRequest: MakeRequest }) {
  return (event: SubmitEvent) => {
    const form = event.target as HTMLFormElement;

    if (form.matches(props.formsSelector) === false) {
      return;
    }
    if (form.tagName.toUpperCase() !== 'FORM') {
      return;
    }
    event.preventDefault();

    const hashPosition = form.action.indexOf('#');
    const fragment = hashPosition < 0 ? undefined : form.action.substring(hashPosition);

    props.makeRequest({
      request: toRequest(form, {
        body: undefined,
        headers: new Headers(),
        method: form.method,
        url: form.action ? form.action : window.location.href
      }),
      target: event.target,
      fragment
    });
  };
}

function toRequest(form: HTMLFormElement, options: FetchOptions): FetchOptions {
  const data = new FormData(form);

  if (form.method.toUpperCase() === 'POST') {
    return {
      ...options,
      body: data
    };
  }

  if (form.method.toUpperCase() === 'GET') {
    const query = [...data.entries()]
      .map(pair => `${encodeURIComponent(pair[0])}=${pair[1]}`)
      .join('&');
    const glue = options.url.indexOf('?') === -1 ? '?' : '&';

    return {
      ...options,
      url: [options.url, glue, query].join('')
    };
  }

  throw Error(`Unexpected form method: ${form.method.toUpperCase()}`);
}
