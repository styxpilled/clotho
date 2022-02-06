<script>
	export let name;
  export let pointerX, pointerY;
</script>

<main style:top="{pointerY}px" style:left="{pointerX}px">
	<h1>LETS FUCKING {name}!</h1>
	<p>I AM A SVELTE COMPONENT.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
    position: absolute;
    background-color: gray;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>