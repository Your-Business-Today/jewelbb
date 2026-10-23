import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Massing } from '$lib/calculator/massing';
import { houseMeshes, type HousePalette } from '$lib/calculator/houseMeshes';

export interface HouseView {
	show(massing: Massing): void;
	resize(width: number, height: number): void;
	dispose(): void;
}

const CameraSettings = { fieldOfView: 40, near: 0.1, far: 1000, distanceFactor: 1.6, elevation: 0.6 } as const;

const LightSettings = { ambient: 1.6, sun: 2.4, sunHeight: 30, sunOffset: 20 } as const;

function paletteFromPage(): HousePalette {
	const style = getComputedStyle(document.documentElement);
	const colour = (token: string) => new THREE.Color(style.getPropertyValue(token).trim());
	return { walls: colour('--paper'), roof: colour('--ink-600'), edges: colour('--orange-500'), ground: colour('--tint') };
}

function addLights(scene: THREE.Scene): void {
	scene.add(new THREE.AmbientLight(undefined, LightSettings.ambient));
	const sun = new THREE.DirectionalLight(undefined, LightSettings.sun);
	sun.position.set(LightSettings.sunOffset, LightSettings.sunHeight, LightSettings.sunOffset);
	scene.add(sun);
}

function emptied(house: THREE.Group): void {
	house.traverse((part) => {
		if (part instanceof THREE.Mesh || part instanceof THREE.LineSegments) part.geometry.dispose();
	});
	house.clear();
}

function frame(camera: THREE.PerspectiveCamera, controls: OrbitControls, massing: Massing): void {
	const height = massing.wallHeight + massing.ridgeRise;
	const distance = Math.max(massing.length, height) * CameraSettings.distanceFactor;
	camera.position.set(distance, distance * CameraSettings.elevation, distance);
	controls.target.set(0, height / 2, 0);
	controls.update();
}

export function createHouseView(canvas: HTMLCanvasElement): HouseView {
	const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(CameraSettings.fieldOfView, 1, CameraSettings.near, CameraSettings.far);
	const controls = new OrbitControls(camera, canvas);
	const palette = paletteFromPage();
	const house = new THREE.Group();
	scene.add(house);
	addLights(scene);
	renderer.setAnimationLoop(() => renderer.render(scene, camera));
	return {
		show(massing) {
			emptied(house);
			house.add(...houseMeshes(massing, palette));
			frame(camera, controls, massing);
		},
		resize(width, height) {
			renderer.setSize(width, height, false);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		},
		dispose() {
			renderer.setAnimationLoop(null);
			controls.dispose();
			renderer.dispose();
		}
	};
}
