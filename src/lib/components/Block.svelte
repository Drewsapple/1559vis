<script lang="ts">
	import { formatUnits, type Block, formatEther } from 'viem';
	import { T } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import GasLegend from './GasLegend.svelte';

	export let block: Block & {
		rewards: bigint[];
	};
	export let feeScalar: number;

	const baseFee = Number(formatUnits(block.baseFeePerGas ?? 0n, 9));
	const usageRatio = Number((block.gasUsed * 1000n) / block.gasLimit) / 1000;
	const fee = feeScalar * parseFloat(formatUnits(block.baseFeePerGas ?? 0n, 9));
	const nextBlockPercent =
		Number(((block.gasUsed - 15_000_000n) * 100000n) / (15_000_000n * 8n)) / 1000;
</script>

<GasLegend />
<!-- Base Fees -->
<T.Group
	position.x={usageRatio / 2}
	position.y={fee / 2}
	position.z={-0.5}
	scale.x={usageRatio}
	scale.y={fee}
>
	<T.Mesh>
		<T.BoxGeometry />
		<T.MeshStandardMaterial color="#55b9CA" opacity={0.55} transparent />
	</T.Mesh>
</T.Group>
<!-- Priority Fees -->
<T.Group
	position.x={usageRatio / 2}
	position.y={fee}
	position.z={-1}
	scale.x={usageRatio}
	scale.y={fee}
>
	{#each block.rewards as reward, i}
		<T.Group
			position.y={(feeScalar * Number(formatUnits(reward, 9))) / 2}
			position.z={1 - i / block.rewards.length - 1 / (2 * block.rewards.length)}
			scale.y={feeScalar * Number(formatUnits(reward, 9))}
			scale.z={1 / block.rewards.length}
		>
			<T.Mesh>
				<T.BoxGeometry />
				<T.MeshStandardMaterial color="#95898A" opacity={0.55} transparent />
			</T.Mesh>
		</T.Group>
	{/each}
</T.Group>
<HTML
	position.z={-0.5}
	position.x={-0.625}
	position.y={-0.25}
	scale={0.25}
	rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
	transform
	pointerEvents={'none'}
>
	<div class="flex flex-col items-center justify-center w-full h-full p-2 space-y-2">
		<div class="text-2xl font-bold text-center">
			Block {block.number}
		</div>
		<div class="text-sm text-center">
			{new Date(Number((block.timestamp * 1000n).toString())).toLocaleString()}
		</div>
		<div class="text-sm text-center">
			{Number(formatUnits(block.gasUsed, 6)).toFixed(3)}M gas
		</div>
		<div class="text-sm text-center">
			BaseFee: {baseFee.toFixed(2)} gwei
		</div>
		<div class="text-sm text-center">
			{Number(formatEther((block.baseFeePerGas ?? 0n) * block.gasUsed)).toPrecision(4)} ETH Burned
		</div>
	</div></HTML
>
<HTML
	position.x={1}
	position.y={fee / 2 + 0.25}
	position.z={0.25}
	scale={0.25}
	rotation={[0, -Math.PI / 2, 0]}
	transform
>
	<div class="text-sm text-center w-min">
		{`BaseFee ${nextBlockPercent > 0 ? '+' : ''}${nextBlockPercent.toFixed(2)}% ${
			nextBlockPercent > 0 ? '+' : ''
		}${((nextBlockPercent / 100) * baseFee).toFixed(2)}gwei`}
	</div>
</HTML>
