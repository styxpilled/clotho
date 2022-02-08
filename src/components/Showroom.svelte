<script lang="ts">
  import { getStyles } from "../lib/helpers";
  import { createStyleList } from "../lib/shorthand";
  // export let style = {};
  let styles = getStyles();
</script>

{#await styles}
  {styles}
{:then newstyles}
<code>
  {#each Object.entries(newstyles) as [property, value]}
    <p style={createStyleList(value)}>TEST</p>
    {`.${property} {`}<br />
    {#each Object.entries(value) as [prop, val]}
      {#if val.length > 50}
        <prop>{prop}</prop>:
        <val>{val.slice(0, val.slice(0, 50).lastIndexOf(" "))}</val>...;<br>
      {:else}
        <prop>{prop}</prop>: <val>{val}</val>;<br>
      {/if}
    {/each}
    <br />
  {/each}
  {"}"}
</code>
{/await}

<style>
  code {
    font-family: "Courier New", Tahoma, Geneva, Verdana, sans-serif;
    font-size: medium;
    font-weight: 700;
    color: #eeeeee;
    white-space: nowrap;
  }
  p {
    align-self: center;
  }
  prop {
    color: #4fc3f7;
    margin-left: 1rem;
  }
  val {
    color: #ba68c8;
  }
  /* preview {
    display: inline-block;
    height: 1rem;
    width: 1rem;
    border-radius: 0.5rem;
    border-style: solid;
  } */
</style>
