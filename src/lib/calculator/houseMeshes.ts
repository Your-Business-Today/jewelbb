import * as THREE from 'three';
import type { Massing } from '$lib/calculator/massing';

export interface HousePalette {
	walls: THREE.Color;
	roof: THREE.Color;
	edges: THREE.Color;
	ground: THREE.Color;
}

const quarterTurn = Math.PI / 2;

const groundSizeFactor = 4;

const half = 2;

function outlined(geometry: THREE.BufferGeometry, fill: THREE.Color, edges: THREE.Color): THREE.Mesh {
	const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: fill }));
	mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ color: edges })));
	return mesh;
}

function walls(massing: Massing, palette: HousePalette): THREE.Mesh {
	const geometry = new THREE.BoxGeometry(massing.length, massing.wallHeight, massing.depth);
	geometry.translate(0, massing.wallHeight / half, 0);
	return outlined(geometry, palette.walls, palette.edges);
}

function gableShape(massing: Massing): THREE.Shape {
	const halfDepth = massing.depth / half;
	const shape = new THREE.Shape();
	shape.moveTo(-halfDepth, 0);
	shape.lineTo(halfDepth, 0);
	shape.lineTo(0, massing.ridgeRise);
	shape.closePath();
	return shape;
}

function roof(massing: Massing, palette: HousePalette): THREE.Mesh {
	const geometry = new THREE.ExtrudeGeometry(gableShape(massing), { depth: massing.length, bevelEnabled: false });
	geometry.translate(0, 0, -massing.length / half);
	geometry.rotateY(quarterTurn);
	geometry.translate(0, massing.wallHeight, 0);
	return outlined(geometry, palette.roof, palette.edges);
}

function ground(massing: Massing, palette: HousePalette): THREE.Mesh {
	const size = Math.max(massing.length, massing.depth) * groundSizeFactor;
	const geometry = new THREE.PlaneGeometry(size, size);
	geometry.rotateX(-quarterTurn);
	return new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: palette.ground }));
}

export function houseMeshes(massing: Massing, palette: HousePalette): THREE.Object3D[] {
	return [ground(massing, palette), walls(massing, palette), roof(massing, palette)];
}
