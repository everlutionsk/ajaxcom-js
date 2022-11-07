export function scrollToElement(hash: string): void {
  if (hash.length < 1) {
    return;
  }

  const element =
    document.querySelector(hash) || document.querySelector(`[name=${hash.substring(1)}]`);
  if (element == null) {
    return;
  }

  element.scrollIntoView();
}
