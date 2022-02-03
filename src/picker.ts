// Unique ID for the className.
const clothoOutline = 'clotho-picker-outline';

// Previous dom, that we want to track, so we can remove the previous styling.
let prevTarget: HTMLElement = null;

// Mouse listener for any move event on the current document.
document.addEventListener('mousemove', (event) => {
  const target = event.target as HTMLElement;
  if (prevTarget != target) {
    if (prevTarget != null) {
      prevTarget.classList.remove(clothoOutline);
    }
    target.classList.add(clothoOutline);
    prevTarget = target;
  }
}, false);

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  let dummy = document.createElement('clotho-dummy-element');
  document.body.appendChild(dummy);

  let style = window.getComputedStyle(target);
  let defaultStyle = window.getComputedStyle(dummy);
  let regex = /[A-Z]/g;

  let diff = {};
  for (let prop in style) {
    if (style[prop] !== defaultStyle[prop] && !prop.match(regex)) {
      diff[prop] = style[prop];
    }
  }
  dummy.remove();
  console.log(diff);
  console.log(style);
  
}, false);