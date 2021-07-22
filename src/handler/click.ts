import { IAjaxcomCallbacks } from '../options/callbacks';
import { IFetchOptions } from '../options/fetchOptions';
import { IAjaxcomSelectors } from '../options/selectors';
import { addFragmentOptions } from './fragmentOptions';
import { request } from './request';
import { scrollToElement } from './scroll';

export function toHandleClick(options: Partial<IAjaxcomSelectors & IAjaxcomCallbacks>) {
  return (event: MouseEvent) => {
    const link = getLink(event);
    if (link.matches("[href^='#']")) {
      event.preventDefault();
      // Unlike Chrome, in Firefox, window.location.hash = ''; would result in actual appending of '#' to
      // current URL, which will trigger window.popstate event. From inside our popstate handler we have no
      // way to detect this and differentiate empty location hash from navigating to current URL (without hash).
      if (link.hash) {
        window.location.hash = link.hash;
      }
      scrollToElement(link.hash);
      return;
    }

    if (!link.matches(options.linksSelector)) {
      return;
    }
    if (isNonAjaxcomCall(event)) {
      return;
    }
    if (isInvalid(link)) {
      return;
    }

    event.preventDefault();
    const fetchOptions = {
      ...options,
      method: 'GET',
      url: link.href
    } as Partial<IAjaxcomCallbacks & IFetchOptions>;

    request(addFragmentOptions(fetchOptions, link.hash));
  };
}

function isInvalid(link: Element): boolean {
  return [isNotAnchor, isExternalLink, isNotAnchorOnSamePage, isAnchorEmpty].some(f => f(link));
}

function isNonAjaxcomCall(event: MouseEvent) {
  return event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function isNotAnchor(link: Element) {
  return link.tagName.toUpperCase() !== 'A';
}

function isExternalLink(link: HTMLAnchorElement) {
  return link.hostname !== location.hostname || link.protocol !== location.protocol;
}

function isNotAnchorOnSamePage(link: HTMLAnchorElement) {
  return link.hash && link.href.replace(link.hash, '') === location.href.replace(location.hash, '');
}

function isAnchorEmpty(link: HTMLAnchorElement) {
  return link.href === location.href + '#';
}

function getLink(event: MouseEvent) {
  const link = (event.target || event.srcElement) as HTMLAnchorElement;

  if (isNotAnchor(link)) {
    return link.parentElement as HTMLAnchorElement;
  }

  return link;
}
