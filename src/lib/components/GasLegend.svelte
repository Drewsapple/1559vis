<script lang="ts">
	import { T } from '@threlte/core';
	import { Vector3, type BufferGeometry } from 'three';

	let minLine: BufferGeometry | undefined;
	let targetLine: BufferGeometry | undefined;
	let maxLine: BufferGeometry | undefined;

	$: line = [new Vector3(0, 0, -1), new Vector3(0, 0, 0.5)];

	$: minLine?.setFromPoints(line);
	$: targetLine?.setFromPoints(line);
	$: maxLine?.setFromPoints(line);
</script>

<T.Line>
	<T.LineBasicMaterial color="#0059BA" />
	<T.BufferGeometry bind:ref={minLine} />
</T.Line>

<T.Line position.x={0.5}>
	<T.LineBasicMaterial color="#00ff00" />
	<T.BufferGeometry bind:ref={targetLine} />
</T.Line>

<T.Line position.x={1}>
	<T.LineBasicMaterial color="#ff0025" />
	<T.BufferGeometry bind:ref={maxLine} />
</T.Line>
