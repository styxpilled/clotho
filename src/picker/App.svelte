<script lang="ts">
  import browser from "webextension-polyfill";
  import Picker from "./Picker.svelte";
  import { onceOff } from "../lib/helpers";
  import { generateShorthand, removeRootStyles } from "../lib/shorthand";
  let active: boolean;
  let once: boolean = false;
  let pointerX: number, pointerY: number;
  let diff;
  let w;
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
    if (target.closest("#clotho-picker-panel") == null) {
      clicked = true;
      staticPointerX = pointerX;
      staticPointerY = pointerY;

      const dummy = document.createElement("div");
      dummy.setAttribute("id", "clotho-dummy-element");
      document.body.appendChild(dummy);

      let fontSize: number;
      [diff, fontSize] = removeRootStyles(target, dummy);
      dummy.remove();
      diff = generateShorthand(diff, fontSize);

      if (once) {
        onceOff();
      }
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

{#if clicked}
  <main
    id="clotho-picker-panel"
    class="clotho-picker-panel"
    bind:clientWidth={w}
    style:top="{staticPointerY}px"
    style:left="{staticPointerX}px"
  >
    <Picker style={diff} />
  </main>
{/if}

<style>
  main {
    padding: 1rem;
    color: #9e9e9e;
    position: absolute;
    background-color: #212121;
  }
</style>
