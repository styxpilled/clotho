import { pxToRem, rgbToHex } from "./helpers";
import { roots, suffixes } from "./shorthands";

export function generateShorthand(longhand: Record<string, string>, fontSize: number) {
  const shorthand = {};
  longhand = Object.keys(longhand).sort().reduce((accumulator, currentValue) => {
    accumulator[currentValue] = longhand[currentValue];
    return accumulator;
  }, {});
  for (const [property, value] of Object.entries(longhand)) {
    if (String(property).replace(/px$/, '') !== '0') {
      shorthand[property] = value;
      shorthand[property] = pxToRem(shorthand[property], fontSize);
      shorthand[property] = rgbToHex(shorthand[property]);
      if (shorthand[property] === '0' || shorthand[property] === '0.00rem') {
        delete shorthand[property];
      }
    }
  }
  let lastProperty: string;
  console.log(suffixes);
  let lastIndex = -1;
  for (const [property, value] of Object.entries(shorthand)) {
    const rootIndex = roots.indexOf(property.split('-')[0]);
    const sufIndex = suffixes.indexOf(property.split('-')[1]);
    if (rootIndex !== -1) {
      const rootProperty = roots[rootIndex];
      // shorthand[property] = rootProperty;
    }
    if (sufIndex !== -1) {
      const rootProperty = suffixes[sufIndex];
      shorthand[property] = rootProperty;
    }
    lastIndex = rootIndex; 
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