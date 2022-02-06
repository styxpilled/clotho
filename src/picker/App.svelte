<script lang="ts">
  import browser from "webextension-polyfill";
  import Picker from './Picker.svelte';
  import { onceOff } from '../lib/helpers';
  import { generateShorthand, removeRootStyles } from '../lib/shorthand';
  export let name;
  let active: boolean;
  let once: boolean = false;
  let pointerX: number, pointerY: number;
  let diff;
  let clicked: boolean = false;
  let staticPointerX: number, staticPointerY: number;

  const clothoOutline = "clotho-picker-outline";

  // Previous dom, that we want to track, so we can remove the previous styling.
  let prevTarget: HTMLElement = null;

  browser.storage.onChanged.addListener((changes) => {
    if (changes.once && changes.once.newValue) {
      once = changes.once.newValue;
    }
    if (changes.active) {
      active = changes.active.newValue;
      // clicked = false;
      if (active) add();
      else remove();
      prevTarget.classList.remove(clothoOutline);
      prevTarget = null;
    }
  });

  function add() {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("click", onMouseClick), false;
  }

  function remove() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("click", onMouseClick);
  }

  function onMouseClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    clicked = true;
    staticPointerX = pointerX;
    staticPointerY = pointerY;
    console.log(target.style);
    
    if (target.closest('clotho-picker-panel') == null) {
      const dummy = document.createElement('div');
      dummy.setAttribute('id', 'clotho-dummy-element');
      document.body.appendChild(dummy);
      let fontSize: number;
      [diff, fontSize] = removeRootStyles(target, dummy);
      diff = generateShorthand(diff, fontSize);
      dummy.remove();
      console.log(diff);
      
    if (once) {
      onceOff();
    }
    }
  }

  function onMouseMove(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      !(
        target.parentElement?.classList.contains("clotho-picker-panel") ||
        (target.classList.contains("clotho-picker-panel") &&
          prevTarget != target)
      )
    ) {
      pointerX = event.pageX;
      pointerY = event.pageY;
      if (prevTarget != null) {
        prevTarget.classList.remove(clothoOutline);
      }
      target.classList.add(clothoOutline);
      prevTarget = target;
    }
  }
</script>
{#if clicked}
  <Picker name={name} style={diff} pointerX={staticPointerX} pointerY={staticPointerY} />
{/if}