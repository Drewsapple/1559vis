<script lang="ts">
	import { client } from '$lib/client';
	import { T } from '@threlte/core';
	import { ContactShadows } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Block } from 'viem';
	import Blocks from './Blocks.svelte';
	import Camera from './Camera.svelte';

	const percentiles = [
		5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95
	] as const;

	const blocks = writable<
		(Block & {
			rewards: bigint[];
		})[]
	>([]);

	onMount(() => {
		const stopWatching = client.watchBlocks({
			emitOnBegin: true,
			emitMissed: true,
			onBlock: async (block) => {
				const fullBlockPromise = client.getBlock({ blockHash: block.hash });
				const feeHistoryPromise = client.getFeeHistory({
					blockNumber: block.number!,
					blockCount: 1,
					rewardPercentiles: [...percentiles]
				});

				const [fullBlock, feeHistory] = await Promise.all([fullBlockPromise, feeHistoryPromise]);
				const rewards = feeHistory.reward![0];
				blocks.update((blocks) => {
					const oldId = blocks.findIndex((b) => b.number === fullBlock.number);
					if (oldId !== -1) {
						blocks[oldId] = { ...fullBlock, rewards };
						return blocks;
					} else {
						blocks.push({ ...fullBlock, rewards });
						return blocks;
					}
				});
			}
		});

		return () => {
			stopWatching();
		};
	});
</script>

<Camera />
<Blocks blocks={$blocks} />
