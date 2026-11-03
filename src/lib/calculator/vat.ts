import type { ProjectType } from '$lib/calculator/options';

const VatPercent = { standard: 20, zeroRated: 0 } as const;

const vatPercentByProjectType: Record<ProjectType, number> = {
	new_build: VatPercent.zeroRated,
	extension: VatPercent.standard,
	renovation: VatPercent.standard,
	conversion: VatPercent.standard
};

const percent = 100;

export function vatPercentFor(projectType: ProjectType): number {
	return vatPercentByProjectType[projectType];
}

export function includingVat(amount: number, vatPercent: number): number {
	return amount * (1 + vatPercent / percent);
}

export function vatNote(vatPercent: number): string {
	const isZeroRated = vatPercent === VatPercent.zeroRated;
	if (isZeroRated) return 'New homes are usually zero-rated for VAT, so no VAT is added.';
	return `Including VAT at ${vatPercent}%.`;
}
