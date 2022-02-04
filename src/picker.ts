import browser from 'webextension-polyfill';

let active: boolean;
let pointerX: number, pointerY: number;

// Unique ID for the className.
const clothoOutline = 'clotho-picker-outline';

// Previous dom, that we want to track, so we can remove the previous styling.
let prevTarget: HTMLElement = null;
let panel: HTMLElement = null;
let fontSize: number = 16;

browser.storage.onChanged.addListener((changes) => {
  if (changes.active) {
    active = changes.active.newValue;
    prevTarget.classList.remove(clothoOutline);
    prevTarget = null;
    panel.remove();
  }
});


// Mouse listener for any move event on the current document.
document.addEventListener('mousemove', (event) => {
  pointerX = event.pageX;
  pointerY = event.pageY;
  if (active) {
    const target = event.target as HTMLElement;
    if (prevTarget != target) {
      if (prevTarget != null) {
        prevTarget.classList.remove(clothoOutline);
      }
      target.classList.add(clothoOutline);
      prevTarget = target;
    }
  }
}, false);

document.addEventListener('click', (event) => {
  if (active) {
    const target = event.target as HTMLElement;
    const dummy = document.createElement('div');
    dummy.setAttribute('id', 'clotho-dummy-element');
    document.body.appendChild(dummy);

    const diff = removeRootStyles(target, dummy);
    dummy.remove();

    if (panel != null) {
      panel.remove();
    }

    createPanel(diff);
  }
}, false);

function removeRootStyles(target: HTMLElement, dummy: HTMLElement): Object {
  let componentStyle = window.getComputedStyle(target);
  let windowStyle = window.getComputedStyle(dummy);

  let lastProp: string = '';
  let diff = {};
  for (const prop in componentStyle) {
    if (componentStyle[prop] !== windowStyle[prop] && !prop.startsWith('-')) {
      diff[prop] = componentStyle[prop];
    } else if (prop === 'font-size') {
      fontSize = parseInt(componentStyle[prop]);
    }  
    if (prop.replace(/-/g, '').toLowerCase() === lastProp.replace(/-/g, '').toLowerCase()) {
      delete diff[lastProp];
    }
    lastProp = prop;
  }
  return diff;
}

function createPanel(diff: Object) {
  panel = document.createElement('div');
  panel.setAttribute('id', 'clotho-picker-panel');
  panel.setAttribute('class', 'clotho-picker-panel');

  const p = document.createElement('p');
  p.innerText = `fontsize: ${fontSize}`;
  panel.appendChild(p);

  for (const prop in diff) {
    const p = document.createElement('p');
    p.innerText = `${prop}: ${diff[prop]}`;
    panel.appendChild(p);
  }
  panel.style.position = "absolute";
  panel.style.top = `${pointerY}px`;
  
  document.body.appendChild(panel);
  if (pointerX + panel.clientWidth > document.body.clientWidth) {
    panel.style.left = (pointerX - panel.offsetWidth) + 'px';
  } else {
    panel.style.left = (pointerX) + 'px';
  }
}