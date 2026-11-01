import { stageStarts as cut } from './buildStages';
import { clamp, easeInOut, progressBetween, setStyle } from './buildProgress';
import type { HouseParts } from './houseParts';

export function renderParallax({ svg, layers }: HouseParts, progress: number) {
	setStyle(layers.sky, 'transform', `translateY(${-progress * 28}px)`);
	setStyle(layers.far, 'transform', `translateY(${-progress * 46}px)`);
	setStyle(layers.back, 'transform', `translateY(${-progress * 18}px)`);
	setStyle(layers.house, 'transform', `translateY(${-progress * 10}px)`);
	setStyle(layers.land, 'transform', `translateY(${progress * 6}px)`);
	setStyle(layers.fore, 'transform', `translateY(${progress * 70}px)`);
	setStyle(svg, 'transform', `scale(${1.06 - 0.06 * easeInOut(progress)})`);
}

export function renderGroundworks(parts: HouseParts, progress: number) {
	const groundworks = progressBetween(progress, cut[1], cut[2]);
	for (const element of parts.trench) setStyle(element, 'stroke-dashoffset', 1 - clamp(groundworks * 1.4));
	setStyle(parts.footings, 'opacity', progressBetween(groundworks, 0.45, 1));
	const cutawayShown = progressBetween(progress, cut[1] - 0.01, cut[1] + 0.05);
	const cutawayHidden = progressBetween(progress, cut[7], cut[7] + 0.06);
	setStyle(parts.cutaway, 'opacity', cutawayShown * (1 - cutawayHidden));
}

export function renderStructure({ frame, frameGroup }: HouseParts, progress: number) {
	const structure = progressBetween(progress, cut[2], cut[3]);
	frame.forEach((element, position) => {
		const delay = position / Math.max(1, frame.length - 1);
		setStyle(element, 'stroke-dashoffset', 1 - progressBetween(structure, delay * 0.45, delay * 0.45 + 0.55));
	});
	setStyle(frameGroup, 'opacity', 1 - 0.9 * progressBetween(progress, cut[4], cut[5]));
}

export function renderEnvelope({ wallWipe }: HouseParts, progress: number) {
	const walls = easeInOut(progressBetween(progress, cut[3], cut[4] + 0.04));
	if (!wallWipe) return;
	wallWipe.setAttribute('y', String(520 - 330 * walls));
	wallWipe.setAttribute('height', String(330 * walls));
}

export function renderRoof({ roofWipe }: HouseParts, progress: number) {
	const roof = easeInOut(progressBetween(progress, cut[4], cut[5]));
	if (!roofWipe) return;
	roofWipe.setAttribute('y', String(350 - 230 * roof));
	roofWipe.setAttribute('height', String(230 * roof));
}
