import browser from 'webextension-polyfill';
import { pxToRem, remToPx, onceOff } from './lib/helpers';

let active: boolean;
let once: boolean = false;
let pointerX: number, pointerY: number;

// Unique ID for the className.
const clothoOutline = 'clotho-picker-outline';

// Previous dom, that we want to track, so we can remove the previous styling.
let prevTarget: HTMLElement = null;
let panel: HTMLElement = null;
let fontSize: number = 16;

browser.storage.onChanged.addListener((changes) => {
  if (changes.remove.newValue && panel != null) panel.remove();
  if (changes.once && changes.once.newValue) {
    once = changes.once.newValue;
  }
  if (changes.active) {
    active = changes.active.newValue;
    if (active) add()
    else remove()
    prevTarget.classList.remove(clothoOutline);
    prevTarget = null;
  }
});

function add() {
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('click', onMouseClick), false;
}

function remove() {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('click', onMouseClick);
}

function onMouseMove(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!(
    target.parentElement?.classList.contains('clotho-picker-panel') ||
    target.classList.contains('clotho-picker-panel') &&
    prevTarget != target)) {
    pointerX = event.pageX;
    pointerY = event.pageY;
    if (prevTarget != null) {
      prevTarget.classList.remove(clothoOutline);
    }
    target.classList.add(clothoOutline);
    prevTarget = target;
  }
}

function onMouseClick(event: MouseEvent) {
  const target = event.target as HTMLElement;

  if (target.closest('clotho-picker-panel') == null) {
    const dummy = document.createElement('div');
    dummy.setAttribute('id', 'clotho-dummy-element');
    document.body.appendChild(dummy);

    const diff = removeRootStyles(target, dummy);
    dummy.remove();

    if (panel != null) {
      panel.remove();
    }

    createPanel(diff);
    if (once) {
      onceOff();
    }
  }
}
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

  let btn = document.createElement("button");
  btn.innerHTML = "Save";
  btn.onclick = function () {
    alert("Button is clicked");
  };
  panel.appendChild(btn);

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
  // for (const prop in diff) {
  //   const element = diff[prop];
  //   console.log(element);
  //   console.log(pxToRem(element, fontSize));
  //   console.log(remToPx(element, fontSize));
  // }
}