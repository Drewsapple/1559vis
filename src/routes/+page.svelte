<script lang="ts">
	import App from '$lib/components/App.svelte';
</script>

<div class="w-screen h-[100dvh] overflow-clip">
	<h1>1559vis</h1>
	<div class="aspect-square object-contain w-full h-full">
		<App />
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
	}
</style>
