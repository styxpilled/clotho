import { pxToRem, rgbToHex } from "./helpers";

export function generateShorthand(longhand: Record<string, string>, fontSize: number) {
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
}

export function removeRootStyles(target: HTMLElement, dummy: HTMLElement): [Record<string, string>, number] {
  const componentStyle = window.getComputedStyle(target);
  const windowStyle = window.getComputedStyle(dummy);
  let fontSize = 16;
  let lastProp = '';
  const style = {};
  for (const prop in componentStyle) {
    if (componentStyle[prop] !== windowStyle[prop] && !prop.startsWith('-') && isNaN(parseInt(prop))) {
      style[prop] = componentStyle[prop];
    } else if (prop === 'font-size') {
      fontSize = parseInt(componentStyle[prop]);
    }
    if (prop.replace(/-/g, '').toLowerCase() === lastProp.replace(/-/g, '').toLowerCase()) {
      delete style[lastProp];
    }
    lastProp = prop;
  }
  return [style, fontSize];
}

export function createStyleList(style: Record<string, string>): string {
  let stylelist = '';
  for (const property in style) {
    if (Object.prototype.hasOwnProperty.call(style, property)) {
      const element = style[property];
      stylelist += `${property}: ${element};`;
    }
  }
  return stylelist;
}