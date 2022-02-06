// import browser from 'webextension-polyfill';
import App from './App.svelte';

// let active: boolean;
// let once: boolean = false;
// let pointerX: number, pointerY: number;

// // Unique ID for the className.
// const clothoOutline = 'clotho-picker-outline';

// // Previous dom, that we want to track, so we can remove the previous styling.
// let prevTarget: HTMLElement = null;

// browser.storage.onChanged.addListener((changes) => {
//   if (changes.remove.newValue && panel != null) panel.remove();
//   if (changes.once && changes.once.newValue) {
//     once = changes.once.newValue;
//   }
//   if (changes.active) {
//     active = changes.active.newValue;
//     if (active) add()
//     else remove()
//     prevTarget.classList.remove(clothoOutline);
//     prevTarget = null;
//   }
// });

// document.addEventListener('mousemove', onMouseMove);
// document.addEventListener('click', onMouseClick), false;

// function onMouseMove(event: MouseEvent) {
//   const target = event.target as HTMLElement;
//   if (!(
//     target.parentElement?.classList.contains('clotho-picker-panel') ||
//     target.classList.contains('clotho-picker-panel') &&
//     prevTarget != target)) {
//     pointerX = event.pageX;
//     pointerY = event.pageY;
//     if (prevTarget != null) {
//       prevTarget.classList.remove(clothoOutline);
//     }
//     target.classList.add(clothoOutline);
//     prevTarget = target;
//   }
// }

// function onMouseClick(event: MouseEvent) {
//   const target = event.target as HTMLElement;
//   const app = new App({
//     target: document.body,
//     props: {
//       name: 'svelte component',
//       pointerX: pointerX,
//       pointerY: pointerY,
//     }
//   });
// }

const app = new App({
  target: document.body,
  props: {
    name: 'svelte component',
    // pointerX: pointerX,
    // pointerY: pointerY,
  }
});