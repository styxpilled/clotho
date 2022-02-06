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

export function rgbToHex(value: string) {
  const matches = String(value).match(/rgb\((\d+),\s?(\d+),\s?(\d+)\)/);
  if (matches) {
    return `#${matches.slice(1).map(x => x.length === 1 ? `0${x}` : x).map(x => parseInt(x, 10).toString(16)).join('')}`;
  } else {
    return value;
  }
};