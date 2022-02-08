import { pxToRem, rgbToHex } from "./helpers";

export function generateShorthand(longhand: Object, fontSize: number) {
  const shorthand = {};
  for (const [style, property] of Object.entries(longhand)) {
    if (String(property).replace(/px$/, '') !== '0') {
      shorthand[style] = property;
      shorthand[style] = pxToRem(shorthand[style], fontSize);
      shorthand[style] = rgbToHex(shorthand[style]);
      if (shorthand[style] === '0' || shorthand[style] === '0.00rem') {
        delete shorthand[style];
      }
    }
  }

  return shorthand;
};

export function removeRootStyles(target: HTMLElement, dummy: HTMLElement): [Object, number] {
  let componentStyle = window.getComputedStyle(target);
  let windowStyle = window.getComputedStyle(dummy);
  let fontSize: number = 16;
  let lastProp: string = '';
  let diff = {};
  for (const prop in componentStyle) {
    if (componentStyle[prop] !== windowStyle[prop] && !prop.startsWith('-') && isNaN(parseInt(prop))) {
      diff[prop] = componentStyle[prop];
    } else if (prop === 'font-size') {
      fontSize = parseInt(componentStyle[prop]);
    }
    if (prop.replace(/-/g, '').toLowerCase() === lastProp.replace(/-/g, '').toLowerCase()) {
      delete diff[lastProp];
    }
    lastProp = prop;
  }
  return [diff, fontSize];
}

export function createStyleList(style: Object): string {
  let stylelist = '';
  for (const property in style) {
    if (Object.prototype.hasOwnProperty.call(style, property)) {
      const element = style[property];
      stylelist += `${property}: ${element};`;
    }
  }
  return stylelist;
}