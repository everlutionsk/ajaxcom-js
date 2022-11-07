import { MakeRequest } from '../ajaxcom';
import { scrollToElement } from './scroll';

export function toClickHandler(props: { linksSelector: string; makeRequest: MakeRequest }) {
  return (event: MouseEvent) => {
    const link = getHTMLAnchorElement(event);
    if (link == null) return;

    // todo: review
    if (link.matches("[href^='#']")) {
      // Unlike Chrome, in Firefox, window.location.hash = ''; would result in actual appending of '#' to
      // current URL, which will trigger window.popstate event. From inside our popstate handler we have no
      // way to detect this and differentiate empty location hash from navigating to current URL (without hash).
      if (link.hash) {
        window.location.hash = link.hash;
      }
      scrollToElement(link.hash);
      return;
    }

    if (!link.matches(props.linksSelector)) {
      return;
    }
    if (isNotSamePageClick(event)) {
      return;
    }
    if (isExternalLink(link)) {
      return;
    }
    if (isNotAnchorOnSamePage(link)) {
      return;
    }
    if (isAnchorEmpty(link)) {
      return;
    }

    event.preventDefault();

    props.makeRequest({
      request: {
        body: undefined,
        headers: new Headers(),
        method: 'GET',
        url: link.href
      },
      target: event.target,
      fragment: link.hash
    });
  };
}

function isNotSamePageClick(event: MouseEvent): boolean {
  return event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function isHTMLAnchorElement(link: EventTarget): link is HTMLAnchorElement {
  return link instanceof HTMLAnchorElement && link.tagName.toUpperCase() === 'A';
}

function isExternalLink(link: HTMLAnchorElement): boolean {
  return link.hostname !== location.hostname || link.protocol !== location.protocol;
}

// todo: review and test
function isNotAnchorOnSamePage(link: HTMLAnchorElement): boolean {
  return (
    link.hash.trim() !== '' &&
    link.href.replace(link.hash, '') === location.href.replace(location.hash, '')
  );
}

function isAnchorEmpty(link: HTMLAnchorElement): boolean {
  return link.href === location.href + '#';
}

function getHTMLAnchorElement(event: MouseEvent) {
  const link = event.target;
  if (link == null) return null;
  if (isHTMLAnchorElement(link)) return link;

  if (link instanceof Element) return link.closest('a');

  return null;
}
