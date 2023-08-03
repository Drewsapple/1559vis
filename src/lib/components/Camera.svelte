<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { MOUSE, TOUCH } from 'three';
</script>

<T.Group>
	<T.DirectionalLight intensity={0.8} position.x={5} position.y={10} />
	<T.AmbientLight intensity={0.2} />
</T.Group>

<T.PerspectiveCamera makeDefault position={[-3, 4, 1]} fov={40} let:ref={camera}>
	<OrbitControls
		enableZoom={false}
		enableRotate={true}
		enablePan={true}
		maxDistance={20}
		minDistance={2}
		mouseButtons={{
			LEFT: MOUSE.PAN,
			RIGHT: MOUSE.ROTATE
		}}
		touches={{
			ONE: TOUCH.PAN,
			TWO: TOUCH.DOLLY_ROTATE
		}}
		on:change={(e) => {
			camera.position.x = -3;
			camera.position.y = 4;

			e.target.target.x = 0;
			e.target.target.y = 1;
			e.target.target.z = 0;
		}}
		target={[0, 1, 0]}
		enableDamping
	/>
</T.PerspectiveCamera>
