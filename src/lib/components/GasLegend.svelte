<script lang="ts">
	import { T } from '@threlte/core';
	import { Vector3, type BufferGeometry } from 'three';
	import type { Block } from 'viem';

	let lineBuffer: BufferGeometry | undefined;
	let lineBuffer2: BufferGeometry | undefined;

	export let blocks: Block[];

	$: line = [new Vector3(0, 0, 0), new Vector3(0, 0, -2 * blocks.length)];

	$: lineBuffer?.setFromPoints(line);
	$: lineBuffer2?.setFromPoints(line);
</script>

<T.Line>
	<T.LineBasicMaterial color="#0059BA" />
	<T.BufferGeometry bind:ref={lineBuffer} />
</T.Line>

<T.Line position.x={-1}>
	<T.LineBasicMaterial color="#ff0025" />
	<T.BufferGeometry bind:ref={lineBuffer2} />
</T.Line>
