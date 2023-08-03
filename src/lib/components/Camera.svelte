<script>
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { MOUSE, TOUCH } from 'three';
	import { clamp } from 'three/src/math/MathUtils';
</script>

<T.PerspectiveCamera makeDefault position={[-2, 3, 0]} fov={50} let:ref={camera}>
	<OrbitControls
		enableZoom={false}
		enableRotate={true}
		screenSpacePanning={false}
		maxDistance={20}
		minDistance={2}
		mouseButtons={{
			LEFT: MOUSE.PAN,
			MIDDLE: MOUSE.DOLLY,
			RIGHT: MOUSE.ROTATE
		}}
		touches={{
			ONE: TOUCH.PAN,
			TWO: TOUCH.DOLLY_ROTATE
		}}
		on:change={(e) => {
			camera.position.x = clamp(camera.position.x, -5, -0.001);
			camera.position.y = 3;
			e.target.target.x = 0;
		}}
		target={[0, 0, 0]}
		enableDamping
	/>
</T.PerspectiveCamera>
