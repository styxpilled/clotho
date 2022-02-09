import browser from 'webextension-polyfill';

export async function toggle() {
  browser.storage.local.get('active').then((result) => {
    const active = result.active || false;
    browser.storage.local.set({
      active: !active,
      remove: true,
    });
  });
};

export function onceOn() {
  browser.storage.local.set({
    active: true,
    remove: false,
  });
  return true;
};

export function onceOff() {
  browser.storage.local.set({
    active: true,
    remove: true,
  });
  return true;
};

export function saveStyle(style: Object, name: string) {
  browser.storage.local.get('styles').then((result) => {
    const styles = result.styles || {};
    styles[name] = style;
    browser.storage.local.set({
      styles,
    });
  });
}

export async function getStyles() {
  const result = await browser.storage.local.get('styles');
  return result.styles || {};
}

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

export function getHexLightness(hex: string) {
  const color = hex.substring(1);
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const luma = Math.round((r * 299 + g * 587 + b * 114) / 1000);

  return luma > 125 ? true : false;
}

export const copyToClipboard = str => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(str);
  return Promise.reject('The Clipboard API is not available.');
};