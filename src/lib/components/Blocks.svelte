<script lang="ts">
	import type { Block as BlockData } from 'viem';
	import { T } from '@threlte/core';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import Block from './Block.svelte';

	export let blocks: (BlockData & {
		rewards: bigint[];
	})[];

	const feeScalar = 1 / 100;

	const histLength = tweened(blocks.length, {
		duration: 2000,
		easing: cubicOut
	});

	$: {
		histLength.set(blocks.length);
	}
</script>

<T.Group position.y={0.25} position.z={2 - $histLength * 1.5}>
	{#each blocks as block, i}
		<T.Group position.z={i * 1.5}>
			<Block {block} {feeScalar} />
		</T.Group>
	{/each}
</T.Group>
