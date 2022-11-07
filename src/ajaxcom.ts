import { toClickHandler } from './handler/click';
import { FetchOptions, request } from './handler/request';
import { scrollToElement } from './handler/scroll';
import { toSubmitHandler } from './handler/submit';

export interface Config {
  readonly beforeSend: (target: EventTarget | null) => Promise<void>;
  readonly error: (reason: string, target: EventTarget | null) => void;
  readonly success: (target: EventTarget | null) => Promise<void>;
  readonly complete: (target: EventTarget | null) => void;
  readonly linksSelector: string;
  readonly formsSelector: string;
}
export interface MakeRequestProps {
  target: EventTarget | null;
  request: FetchOptions;
  fragment?: string;
}
export type MakeRequest = (props: MakeRequestProps) => Promise<void>;

export function initialize(config: Config) {
  const clickHandler = toClickHandler({
    linksSelector: config.linksSelector,
    makeRequest
  });
  const submitHandler = toSubmitHandler({
    formsSelector: config.formsSelector,
    makeRequest
  });

  document.addEventListener('click', clickHandler);
  document.addEventListener('submit', submitHandler);

  // todo: review
  window.onpopstate = (event: PopStateEvent) => {
    const { target } = event;
    if (!(target instanceof Window)) return;

    if (hasEmptyHash(target)) return;

    if (event.state.url == null) {
      window.location.reload();
    }

    window.location.href = event.state.url;
  };

  return {
    // todo: review
    fetch: makeRequest
  };

  function makeRequest(props: MakeRequestProps): Promise<void> {
    if (props.fragment != null) {
      props.request.headers.append('X-AjaxComFragment', props.fragment.substring(1));
    }

    return request({
      beforeSend: () => config.beforeSend(props.target),
      complete: () => {
        if (props.fragment != null) scrollToElement(props.fragment);
        config.complete(props.target);
      },
      error: (reason: string) => config.error(reason, props.target),
      success: () => config.success(props.target),
      request: props.request
    });
  }

  function hasEmptyHash(target: Window): boolean {
    if (target.location.hash == null) return true;

    return (
      target.location.href.replace(target.location.hash, '') ===
      location.href.replace(location.hash, '')
    );
  }
}
