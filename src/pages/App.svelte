<script lang="ts">
  import { onMount } from 'svelte'
  import { toggle } from '../lib/helpers';
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
  const toggleClotho = () => active = toggle(active);
  
  const openOptions = () =>  {
    browser.runtime.openOptionsPage().then();
  };
</script>

<h1>Welcome to Clotho {counter}</h1>
<button on:click="{openOptions}">Open Options</button>
<button on:click="{toggleClotho}">Toggle Clotho</button>
<p>This is an early beta</p>

<style>
  h1 {
    background-color: black;
  }
</style>