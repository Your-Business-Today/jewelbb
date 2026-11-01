import { stageStarts } from './buildStages';

export const clamp = (value: number, lowest = 0, highest = 1) => Math.min(highest, Math.max(lowest, value));

export const progressBetween = (progress: number, start: number, end: number) => clamp((progress - start) / (end - start));

export const easeInOut = (time: number) => (time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time);

export function stageIndexAt(progress: number) {
	let index = 0;
	for (let candidate = 0; candidate < stageStarts.length; candidate++) if (progress >= stageStarts[candidate]) index = candidate;
	return index;
}

export function percentComplete(progress: number) {
	return Math.round(progressBetween(progress, stageStarts[1], stageStarts[8]) * 100);
}

export function setStyle(element: Element | null, name: string, value: string | number) {
	if (element) (element as HTMLElement).style.setProperty(name, String(value));
}
