<script lang="ts">
  import { copyToClipboard, saveStyle, getStyles, getHexLightness } from "../lib/helpers";
  import Showroom from "./Showroom.svelte";

  export let style = {};
  let view = false;
  let styles = getStyles();
</script>

<div class="wrapper">
  <div class="container">
    <button on:click={() => copyToClipboard("test")}>copy</button>
    <button on:click={() => saveStyle(style, 'newstyle')}>save</button>
    <button>cancel</button>
    <button on:click={() => view = !view}>view</button>
  </div>
  <div class="panel">
    <button>close</button>
    {#if view}
      <Showroom />
    {:else}
      <slot />
    {/if}
  </div>
</div>

<style>
  button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 0.2rem 0.5rem;
    margin: 0.5rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    align-self: flex-end;
    width: 100%
  }
  .wrapper {
    display: flex;
    flex-direction: row;
  }
  .container {
    display: flex;
    flex-direction: column;
    width: 4.5rem;
  }
  .panel {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
</style>
