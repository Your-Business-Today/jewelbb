export type HouseParts = ReturnType<typeof findHouseParts>;

function findLayers(svg: SVGSVGElement) {
	const layer = (name: string) => svg.querySelector(`[data-layer="${name}"]`) as SVGGElement | null;
	return {
		sky: layer('sky'),
		far: layer('far'),
		back: layer('back'),
		house: layer('house'),
		land: layer('land'),
		fore: layer('fore')
	};
}

export function findHouseParts(svg: SVGSVGElement) {
	const one = <T extends Element>(selector: string) => svg.querySelector(selector) as T | null;
	const all = <T extends Element>(selector: string) => Array.from(svg.querySelectorAll(selector)) as T[];

	return {
		svg,
		layers: findLayers(svg),
		trench: all<SVGPathElement>('[data-draw="trench"]'),
		footings: one<SVGGElement>('#footings'),
		cutaway: one<SVGGElement>('#cutaway'),
		frame: all<SVGPathElement>('[data-draw="frame"]'),
		frameGroup: one<SVGGElement>('#frame'),
		wallWipe: one<SVGRectElement>('#wipe-walls-rect'),
		roofWipe: one<SVGRectElement>('#wipe-roof-rect'),
		windows: all<SVGGElement>('[data-window]'),
		finishes: all<SVGElement>('[data-finish]'),
		plants: all<SVGElement>('[data-plant]'),
		lawn: one<SVGRectElement>('#lawn'),
		drive: one<SVGPolygonElement>('#drive'),
		dusk: one<SVGRectElement>('#dusk'),
		glows: all<SVGRectElement>('[data-glow]'),
		stars: one<SVGGElement>('#stars')
	};
}
