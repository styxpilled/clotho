<script lang="ts">
  import { onMount } from 'svelte'
  import browser from 'webextension-polyfill';
  let counter = 0;
  let active = false;

  onMount(() => {
    const u = setInterval(() => {
      counter = counter + 1
    }, 1000)

    return () => {
      clearInterval(u)
    }
  })
  const openOptions = () =>  {
    browser.runtime.openOptionsPage().then();
  };
  const toggle = () => {
    browser.storage.local.set({
      active: !active
    });
    active = !active;
  };
</script>

<h1>Welcome to Clotho {counter}</h1>
<button on:click="{openOptions}">Open Options</button>
<button on:click="{toggle}">Toggle Clotho</button>
<p>This is an early beta</p>

<style>
  h1 {
    background-color: black;
  }
</style>