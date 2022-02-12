<script lang="ts">
  import { getHexLightness } from "../lib/helpers";
  import { createStyleList } from "../lib/shorthand"
  export let style: Record<string, string>;
</script>

  <p style={createStyleList(style)}>TEST</p>
  <code>
    {".style {"}<br />
    {#each Object.entries(style) as [property, value]}
      {#if value.length > 50}
        <property>{property}</property>: <value>{value.slice(0, value.slice(0, 50).lastIndexOf(' '))}</value>...;
      {:else}
        <property>{property}</property>: <value>{value}</value>;
      {/if}
      {#if value.includes("#")}
        <preview
          style:background-color={value}
          style:border-color={getHexLightness(value) ? "#fff" : "#000"}
        />
      {/if}
      <br />
    {/each}
    {"}"}
  </code>

<style>
  @import "preview.css";
</style>
