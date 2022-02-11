{#if open}
  <Panel {posX} {posY} {style} ></Panel>
{/if}

<script lang="ts">
  import browser from "webextension-polyfill";
  import Panel from "./Panel.svelte";
  import { generateShorthand, removeRootStyles } from "../lib/shorthand";
  let active: boolean;
  let pointerX: number, pointerY: number;
  let style: Record<string, string>;
  let open = false;
  let posX: number, posY: number;

  const clothoOutline = "clotho-picker-outline";

  // Previous dom, that we want to track, so we can remove the previous styling.
  let prevTarget: HTMLElement = null;

  browser.storage.onChanged.addListener((changes) => {
    if (changes.active) {
      console.log("active changed", changes.active.newValue);
      
      open = false;
      active = changes.active.newValue;
      if (active) add();
      else remove();
      prevTarget.classList.remove(clothoOutline);
      prevTarget = null;
    }
    if (changes.remove) {
      // remove();
      console.log('adjknajdbasjdb');
      
      open = false;
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
    if (target.closest("#clotho-picker-panel") == null) {
      open = true;
      posX = pointerX;
      posY = pointerY;

      const dummy = document.createElement("div");
      dummy.setAttribute("id", "clotho-dummy-element");
      document.body.appendChild(dummy);

      let fontSize: number;
      [style, fontSize] = removeRootStyles(target, dummy);
      dummy.remove();
      style = generateShorthand(style, fontSize);
    }
  }

  function onMouseMove(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.closest("#clotho-picker-panel") == null) {
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