import type { HouseParts } from './houseParts';
import { renderEnvelope, renderGroundworks, renderParallax, renderRoof, renderStructure } from './renderShell';
import { renderEvening, renderFinishes, renderGlazing, renderLandscape } from './renderFinishing';

const stageRenderers = [
	renderParallax,
	renderGroundworks,
	renderStructure,
	renderEnvelope,
	renderRoof,
	renderGlazing,
	renderFinishes,
	renderLandscape,
	renderEvening
];

export function renderBuild(parts: HouseParts, progress: number) {
	for (const renderStage of stageRenderers) renderStage(parts, progress);
}
