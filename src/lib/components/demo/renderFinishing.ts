import { stageStarts as cut } from './buildStages';
import { easeInOut, progressBetween, setStyle } from './buildProgress';
import type { HouseParts } from './houseParts';

function fadeInStaggered(elements: Element[], progress: number, start: number, stagger: number) {
	elements.forEach((element, position) => {
		const appearsAt = start + position * stagger;
		setStyle(element, 'opacity', progressBetween(progress, appearsAt, appearsAt + 0.05));
	});
}

export function renderGlazing({ windows }: HouseParts, progress: number) {
	fadeInStaggered(windows, progress, cut[5], 0.009);
}

export function renderFinishes({ finishes }: HouseParts, progress: number) {
	fadeInStaggered(finishes, progress, cut[6], 0.007);
}

export function renderLandscape(parts: HouseParts, progress: number) {
	setStyle(parts.lawn, 'opacity', progressBetween(progress, cut[7], cut[7] + 0.05));
	setStyle(parts.drive, 'opacity', progressBetween(progress, cut[7] + 0.02, cut[7] + 0.07));
	parts.plants.forEach((element, position) => {
		const appearsAt = cut[7] + 0.02 + position * 0.012;
		const growth = easeInOut(progressBetween(progress, appearsAt, appearsAt + 0.06));
		setStyle(element, 'transform', `scale(${0.2 + 0.8 * growth})`);
		setStyle(element, 'opacity', growth);
	});
}

export function renderEvening(parts: HouseParts, progress: number) {
	const evening = progressBetween(progress, cut[7] + 0.06, cut[8] + 0.02);
	setStyle(parts.dusk, 'opacity', evening * 0.95);
	setStyle(parts.stars, 'opacity', 0.9 - 0.5 * evening);
	const glow = 0.6 * progressBetween(progress, cut[7] + 0.09, cut[8] + 0.03);
	for (const element of parts.glows) setStyle(element, 'opacity', glow);
}
