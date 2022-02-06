<script lang="ts">
  export let name: string;
  export let pointerX: number, pointerY: number;
  export let style;
  let w: number;
</script>

<main bind:clientWidth={w} style:top="{pointerY}px" style:left="{pointerX}px">
  <p>size: {w}px</p>
	<h1>i am a {name}!</h1>
	<p>I AM A SVELTE COMPONENT.</p>
  <code>
    {'.style {'}<br>
    {#each Object.entries(style) as [property, value]}
      <property>{property}</property>: <value>{value}</value>;
      {#if String(value).includes('#')}
        <preview style:background-color={String(value)} />
      {/if}
      <br>
    {/each}
    {'}'}
  </code>  
</main>

<style>
  code {
    font-family: 'Courier New', Tahoma, Geneva, Verdana, sans-serif;
    font-size: medium;
    font-weight: 700;
    color: #EEEEEE;
    white-space: nowrap;
  }
  property {
    color: #4FC3F7;
    margin-left: 1rem;
  }
  value {
    color: #BA68C8;
  }
  preview {
    display: inline-block;
    height: 1rem;
    width: 1rem;
    border-radius: 0.5rem;
  }
  main {
    padding: 1rem;
    color: #9E9E9E;
    position: absolute;
    background-color: #212121;
  }
</style>
