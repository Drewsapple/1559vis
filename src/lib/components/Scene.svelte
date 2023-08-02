<script lang="ts">
	import { client } from '$lib/client';
	import { T } from '@threlte/core';
	import { ContactShadows } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Block } from 'viem';
	import Blocks from './Blocks.svelte';
	import Camera from './Camera.svelte';

	const blocks = writable<Block[]>([]);

	onMount(() => {
		return client.watchBlocks({
			emitOnBegin: true,
			emitMissed: true,
			onBlock: (block) => {
				console.log(block);
				blocks.update((blocks) => {
					blocks.unshift(block);
					return blocks;
				});
			}
		});
	});
</script>

<Camera />

<T.DirectionalLight intensity={0.8} position.x={5} position.y={10} />
<T.AmbientLight intensity={0.2} />
<ContactShadows scale={10} blur={1} far={2.5} opacity={0.5} />

<Blocks blocks={$blocks} />
