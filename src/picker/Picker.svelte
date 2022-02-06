<script lang="ts">
  export let name;
  export let pointerX: number, pointerY: number;
  export let style;
  let w;
</script>
<main bind:clientWidth={w} style:top="{pointerY}px" style:left="{pointerX}px">
  <p>size: {w}px</p>
	<h1>i am a {name}!</h1>
	<p>I AM A SVELTE COMPONENT.</p>
  <code>
    {#each Object.entries(style) as [stylename, property]}
      {stylename}: {property}<br>
    {/each}
  </code>
</main>
<style>
  main {
    position: absolute;
    background-color: gray;
  }
</style>
