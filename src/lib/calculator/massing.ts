export interface Massing {
	length: number;
	depth: number;
	wallHeight: number;
	ridgeRise: number;
}

const MassingProportions = {
	storeyHeight: 2.7,
	lengthToDepth: 1.4,
	roofPitchDegrees: 35
} as const;

const degreesInHalfTurn = 180;

const half = 2;

export function massingFor(floorArea: number, storeys: number): Massing {
	const footprint = floorArea / storeys;
	const depth = Math.sqrt(footprint / MassingProportions.lengthToDepth);
	const length = footprint / depth;
	const pitch = (MassingProportions.roofPitchDegrees * Math.PI) / degreesInHalfTurn;
	const ridgeRise = (depth / half) * Math.tan(pitch);
	return { length, depth, wallHeight: storeys * MassingProportions.storeyHeight, ridgeRise };
}
