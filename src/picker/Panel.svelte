<script lang="ts">
  import Picker from "../components/Picker.svelte";
  import Showroom from "../components/Showroom.svelte";
  import Wrapper from "../components/Wrapper.svelte";

  export let posY, posX;
  export let style;
  export let view;
</script>

<main
  id="clotho-picker-panel"
  class="clotho-picker-panel"
  style:top="{posY}px"
  style:left="{posX}px"
> 
<Wrapper style={style} clicked={view}>
  {#if !view}
    <Showroom />
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

