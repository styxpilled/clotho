<script lang="ts">
  import { getHexLightness } from "../lib/helpers";
  import { createStyleList } from "../lib/shorthand"
  export let style: Object;
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
      {#if String(value).includes("#")}
        <preview
          style:background-color={String(value)}
          style:border-color={getHexLightness(String(value)) ? "#fff" : "#000"}
        />
      {/if}
      <br />
    {/each}
    {"}"}
  </code>

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
  property {
    color: #4fc3f7;
    margin-left: 1rem;
  }
  value {
    color: #ba68c8;
  }
  preview {
    display: inline-block;
    position: relative;
    height: 1rem;
    width: 1rem;
    border-radius: 0.5rem;
    border-style: solid;
    top: 0.15rem;
  }
</style>
