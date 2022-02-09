<script lang="ts">
  import Picker from "../components/Picker.svelte";
  import Gallery from "../components/Gallery.svelte";
  import Wrapper from "../components/Wrapper.svelte";

  export let posY, posX;
  export let style;
  let gallery;
</script>

<main
  id="clotho-picker-panel"
  class="clotho-picker-panel"
  style:top="{posY}px"
  style:left="{posX}px"
> 
<Wrapper {style} bind:gallery={gallery}>
  {#if gallery}
    <Gallery />
  {:else}
    <Picker style={style} />
  {/if}
</Wrapper>
</main>

<style>
  main {
    padding: 1rem;
    color: #9e9e9e;
    position: absolute;
    background-color: #212121;
    z-index: 9998!important;
  }
</style>

