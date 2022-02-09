<script lang="ts">
  import { copyToClipboard, saveStyle, onceOn } from "../lib/helpers";
  import Icon from "@iconify/svelte";
  import download from "@iconify/icons-mdi/tray-arrow-down";
  import copy from "@iconify/icons-mdi/content-copy";
  import bookmark from "@iconify/icons-mdi/bookmark-outline";
  import crosshairs from "@iconify/icons-mdi/crosshairs-gps";
  import close from "@iconify/icons-mdi/close";
  export let style = {};
  export let gallery = false;
</script>

<div class="wrapper">
  <div class="container">
    <button on:click={() => copyToClipboard("test")}>
      <Icon class="icon" icon={copy} />
    </button>
    <button on:click={() => saveStyle(style, "newstyle")}>
      <Icon class="icon" icon={download} />
      </button>
    <button on:click={() => (gallery = !gallery)}>
      <Icon class="icon" icon={bookmark} />
    </button>
    <button><Icon class="icon" icon={crosshairs} /></button>
  </div>
  <div class="panel">
    <button on:click={() => onceOn()}>
      <Icon class="icon" icon={close} />
    </button>
    <slot />
  </div>
</div>

<style>
  button {
    font-size: 1.7rem;
    border: none;
    color: white;
    margin-bottom: 1rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    align-self: flex-end;
    background-color: #212121;
  }
  button:hover {
    color: #9780ff;
  }
  .wrapper {
    display: flex;
    flex-direction: row;
  }
  .container {
    display: flex;
    flex-direction: column;
    max-width: max-content;
  }
  .panel {
    display: flex;
    flex-direction: column;
    /* flex: 1; */
  }
</style>
