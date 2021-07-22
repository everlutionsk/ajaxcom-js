import { IAjaxcomCallbacks } from './options/callbacks';
import { toHandleClick } from './handler/click';
import { request } from './handler/request';
import { toHandleSubmit } from './handler/submit';
import { IFetchOptions } from './options/fetchOptions';
import { IAjaxcomSelectors } from './options/selectors';

const defaultCallbacks = {
  beforeSend: () => Promise.resolve(),
  complete: () => undefined,
  error: onError,
  success: () => Promise.resolve()
};

export function initialize(options: Partial<IAjaxcomSelectors & IAjaxcomCallbacks>) {
  const ajaxcomOptions = {
    ...defaultCallbacks,
    formsSelector: 'form:not([data-ignore-ajaxcom])',
    linksSelector: 'a:not([target=_blank]):not([data-ignore-ajaxcom])',
    ...options
  };

  document.addEventListener('click', toHandleClick(ajaxcomOptions));
  document.addEventListener('submit', toHandleSubmit(ajaxcomOptions));

  window.onpopstate = (event: PopStateEvent) => {
    const link = (event.target || event.srcElement) as Window;

    if (link.location.hash && hasEmptyHash(link)) {
      return;
    }

    if (typeof event.state !== 'object' || event.state === null) {
      window.location.reload();
    }
    window.location.href = event.state.url;
  };

  function hasEmptyHash(link: Window) {
    return (
      link.location.href.replace(link.location.hash, '') ===
      location.href.replace(location.hash, '')
    );
  }
}

export async function fetch(
  requestOptions: IFetchOptions,
  ajaxcomCallbacks: Partial<IAjaxcomCallbacks>
): Promise<void> {
  const options = {
    method: 'GET',
    ...defaultCallbacks,
    ...ajaxcomCallbacks,
    ...requestOptions
  } as Partial<IAjaxcomCallbacks & IFetchOptions>;

  request(options);
}

function onError() {
  alert('Server cannot handle your request. Please try it again or contact the administrator.');
}
