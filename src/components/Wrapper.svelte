<script lang="ts">
  import { copyToClipboard, saveStyle, getStyles } from "../lib/helpers";

  export let style = {};
  let styles = {};

</script>

<div class="wrapper">
  <div class="container">
    <button on:click={() => copyToClipboard("test")}>copy</button>
    <button on:click={() => saveStyle(style, 'newstyle')}>save</button>
    <button>cancel</button>
    <button on:click={() => styles = getStyles()}>view</button>
  </div>
  <div class="panel">
    {#await styles}
      {styles}
    {:then newstyles} 
      {".style {"}<br />
    {#each Object.entries(newstyles) as [property, value]}
      {#each property as prop}
        {prop}
      {/each}
      {#each Object.entries(property) as [prop, val]}
        {prop} {val}
      {/each}
        <!-- <property>{property}</property> <value>{value}</value> -->
      <br />
    {/each}
    {"}"}
    {/await}
    <button>close</button>
    <slot />
  </div>
</div>

<style>
  button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 0.2rem 1rem;
    margin: 0.5rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    align-self: flex-end;
  }
  .wrapper {
    display: flex;
    flex-direction: row;
  }
  .container {
    display: flex;
    flex-direction: column;
    width: 4rem;
  }
  .panel {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
</style>
