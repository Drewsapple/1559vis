<script lang="ts">
	import { formatUnits, type Block, formatEther } from 'viem';
	import { T } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import GasLegend from './GasLegend.svelte';

	export let blocks: Block[];

	const feeScalar = 1 / 100;
</script>

<T.Group position.y={0.25} position.z={1}>
	<GasLegend {blocks} />
	{#each blocks as block, i}
		<T.Group position.z={-i * 1.5}>
			<T.Mesh
				position.x={Number((block.gasUsed * 1000n) / block.gasLimit) / 1000 / 2}
				position.y={(feeScalar * parseFloat(formatUnits(block.baseFeePerGas ?? 0n, 9))) / 2}
				position.z={-0.5}
			>
				<T.BoxGeometry
					args={[
						Number((block.gasUsed * 1000n) / block.gasLimit) / 1000,
						feeScalar * parseFloat(formatUnits(block.baseFeePerGas ?? 0n, 9)),
						1
					]}
				/>
				<T.MeshStandardMaterial color="#5599CA" opacity={0.75} transparent />
			</T.Mesh>
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
						BaseFee: {Number(formatUnits(block.baseFeePerGas ?? 0n, 9)).toFixed(2)} gwei
					</div>
					<div class="text-sm text-center">
						{Number(formatEther((block.baseFeePerGas ?? 0n) * block.gasUsed)).toPrecision(4)} ETH Burned
					</div>
				</div></HTML
			>
		</T.Group>
	{/each}
</T.Group>
