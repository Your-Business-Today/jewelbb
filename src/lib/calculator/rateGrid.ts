import { ProjectTypes, SpecLevels, type ProjectType, type SpecLevel } from '$lib/calculator/options';

type ProjectTypeOption = (typeof ProjectTypes)[number];

type SpecLevelOption = (typeof SpecLevels)[number];

export interface RateCell {
	projectType: ProjectType;
	specLevel: SpecLevel;
	fieldName: string;
	label: string;
}

export interface RateGridRow {
	label: string;
	cells: RateCell[];
}

function cellFor(projectType: ProjectTypeOption, specLevel: SpecLevelOption): RateCell {
	return {
		projectType: projectType.value,
		specLevel: specLevel.value,
		fieldName: `rate_${projectType.value}_${specLevel.value}`,
		label: `${projectType.label}, ${specLevel.label}`
	};
}

function rowFor(projectType: ProjectTypeOption): RateGridRow {
	return { label: projectType.label, cells: SpecLevels.map((specLevel) => cellFor(projectType, specLevel)) };
}

export const rateGridRows: RateGridRow[] = ProjectTypes.map(rowFor);

export const rateCells: RateCell[] = rateGridRows.flatMap((row) => row.cells);
