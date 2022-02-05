import browser from 'webextension-polyfill';

export function toggle(active: boolean) {
  browser.storage.local.set({
    active: !active,
    once: false,
    remove: true,
  });
  return !active;
};

export function onceOn () {
  browser.storage.local.set({
    active: true,
    once: true,
    remove: false,
  });
  return true;
};

export function onceOff () {
  browser.storage.local.set({
    active: false,
    once: false,
    remove: false,
  });
  return true;
};

export function pxToRem(value: string, fontSize: number) {
  try {
    const matches = String(value).match(/\d+px/g);
    let result: string;
    if (matches) {
      result = matches.map(match => {
        const px = parseFloat(match.replace(/px/, ''));
        return `${(px / fontSize).toFixed(2)}rem`;
      }).join(' ');
    } else {
      result = value;
    }
    return result;
  } catch (e) {
    console.log(e);
    return "0";
  }
};

export function remToPx(value: string, fontSize: number) {
  try {
    const matches = String(value).match(/\d+rem/g);
    let result: string;
    if (matches) {
      result = matches.map(match => {
        const rem = parseFloat(match.replace(/rem/, ''));
        return `${(rem * fontSize).toFixed(2)}rem`;
      }).join(' ');
    } else {
      result = value;
    }
    return result;
  } catch (e) {
    console.log(e);
    return "0";
  }
};