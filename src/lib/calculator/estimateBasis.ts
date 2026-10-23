import { ProjectTypes, SpecLevels } from '$lib/calculator/options';
import type { VisitorDetails } from '$lib/calculator/estimate';

export function estimateBasis(details: VisitorDetails): string {
	const projectType = ProjectTypes.find((option) => option.value === details.projectType);
	const specLevel = SpecLevels.find((option) => option.value === details.specLevel);
	const finish = specLevel?.label.toLowerCase();
	return `${projectType?.label}, ${finish} finish, ${details.floorArea} m²`;
}

export function estimateQuery(details: VisitorDetails): string {
	const query = new URLSearchParams({
		project_type: details.projectType,
		spec_level: details.specLevel,
		floor_area: String(details.floorArea)
	});
	return query.toString();
}
