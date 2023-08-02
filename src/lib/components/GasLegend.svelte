<script lang="ts">
	import { T } from '@threlte/core';
	import { Vector3, type BufferGeometry } from 'three';
	import type { Block } from 'viem';

	let lineBuffer: BufferGeometry | undefined;

	export let blocks: Block[];

	$: lineBuffer?.setFromPoints([new Vector3(0, 0, 0), new Vector3(0, 0, -2 * blocks.length)]);
</script>

<T.Line position.z={1.5}>
	<T.LineBasicMaterial color="#0059BA" />
	<T.BufferGeometry bind:ref={lineBuffer} />
</T.Line>
