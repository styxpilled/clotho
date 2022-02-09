<script lang="ts">
  import { onMount } from "svelte";
  import { toggle, onceOn } from "../lib/helpers";
  import browser from "webextension-polyfill";
  let counter = 0;
  let active = false;

  onMount(() => {
    const u = setInterval(() => {
      counter = counter + 1;
    }, 1000);

    return () => {
      clearInterval(u);
    };
  });
</script>

<h1>Welcome to Clotho {counter}</h1>
<button on:click={() => browser.runtime.openOptionsPage().then()}>
  Open Options</button
>
<button on:click={() => toggle()}>Toggle Clotho</button>
<button on:click={() => (active = onceOn())}>Pick Style</button>
<p>This is an early beta</p>

<style>
  h1 {
    background-color: black;
  }
</style>
