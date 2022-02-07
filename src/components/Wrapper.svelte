<div class="wrapper">
  <div class="container">
    <button>save</button>
    <button>cancel</button>
    <button>view</button>
  </div>
  <div class="panel">
    <button>close</button>
    <slot />
  </div>
</div>

<style>
  button {
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    padding: 0.2rem 1rem;
    margin: 0.5rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    /* put the button at the end using flex */
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
