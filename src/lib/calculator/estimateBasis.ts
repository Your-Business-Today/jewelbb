import { ProjectTypes, SpecLevels } from '$lib/calculator/options';
import type { VisitorDetails } from '$lib/calculator/estimate';

const singleStorey = 1;

export function estimateBasis(details: VisitorDetails): string {
	const projectType = ProjectTypes.find((option) => option.value === details.projectType);
	const specLevel = SpecLevels.find((option) => option.value === details.specLevel);
	const finish = specLevel?.label.toLowerCase();
	const storeys = details.storeys === singleStorey ? '1 storey' : `${details.storeys} storeys`;
	return `${projectType?.label}, ${finish} finish, ${details.floorArea} m² over ${storeys}`;
}

export function estimateQuery(details: VisitorDetails): string {
	const query = new URLSearchParams({
		project_type: details.projectType,
		spec_level: details.specLevel,
		floor_area: String(details.floorArea),
		storeys: String(details.storeys)
	});
	return query.toString();
}
