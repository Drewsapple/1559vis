<script>
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { MOUSE, TOUCH } from 'three';
</script>

<T.PerspectiveCamera makeDefault position={[-5, 2.5, 2]} fov={35} let:ref={camera}>
	<OrbitControls
		enableZoom={true}
		enableRotate={true}
		screenSpacePanning={false}
		maxDistance={20}
		minDistance={2}
		mouseButtons={{
			LEFT: MOUSE.PAN,
			RIGHT: MOUSE.ROTATE
		}}
		touches={{
			ONE: TOUCH.PAN
		}}
		on:change={(e) => {
			camera.position.x = -5;
			camera.position.y = 2.5;
			e.target.target.x = 0.25;
			e.target.target.y = 1;
		}}
		target={[0.25, 1, 0]}
		enableDamping
	/>
</T.PerspectiveCamera>
