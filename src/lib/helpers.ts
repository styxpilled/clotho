import browser from 'webextension-polyfill';

export const toggle = (active: boolean) => {
  browser.storage.local.set({
    active: !active
  });
  return !active;
};

export function pxToRem(px: string, fontSize: number) {
  // regex that matches any amount digits + px
  try {
    const pxRegex = /\d+px/g;
    const matches = px.match(pxRegex);
    let result: string;
    if (matches) {
      result = matches.map(match => {
        const px = parseFloat(match.replace(/px/, ''));
        return `${(px / fontSize).toFixed(2)}rem`;
      }).join(' ');
    } else {
      result = px;
    }
    return result;
  } catch (e) {
    console.log(e);
    return "0";
  }
};

export const remToPx = (rem: number, fontSize: number) => `${rem * fontSize}px`;