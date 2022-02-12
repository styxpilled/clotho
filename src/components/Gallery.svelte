<script lang="ts">
  import { getStyles } from "../lib/helpers";
  import { createStyleList } from "../lib/shorthand";
  let styles = getStyles();
</script>

{#await styles then newstyles}
  {#each Object.entries(newstyles) as [stylename, style]}
    <p style={createStyleList(style)}>TEST</p>
    <code>
    {`.${stylename} {`}<br />
    {#each Object.entries(style) as [property, value]}
      {#if value.length > 50}
        <property>{property}</property>:
        <value>{value.slice(0, value.slice(0, 50).lastIndexOf(" "))}</value>...;
      {:else}
        <property>{property}</property>: <value>{value}</value>;
      {/if}
      {#if String(value).includes("#")}
        <preview style:background-color={String(value)} />
      {/if}
      <br />
    {/each}
    {`}`}
    </code>
  {/each}
{/await}

<style>
  @import "preview.css";
</style>