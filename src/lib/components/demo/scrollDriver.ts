import { clamp } from './buildProgress';

export type BuildElements = { track: HTMLElement; stage: HTMLElement; svg: SVGSVGElement };

const narrowSceneWidth = 640;

function fitSceneToScreen({ track, svg }: BuildElements) {
	const header = document.querySelector('header');
	const headerHeight = header ? Math.round(header.getBoundingClientRect().height) : 0;
	track.style.setProperty('--hdr', `${headerHeight}px`);
	const isNarrow = svg.getBoundingClientRect().width < narrowSceneWidth;
	svg.setAttribute('viewBox', isNarrow ? '190 60 820 690' : '120 0 1110 720');
	svg.setAttribute('preserveAspectRatio', isNarrow ? 'xMidYMax meet' : 'xMidYMid meet');
}

function showFinishedHouse(elements: BuildElements, render: (progress: number) => void) {
	const { track } = elements;
	fitSceneToScreen(elements);
	track.classList.add('build--static');
	render(1);
}

function listenForScroll(elements: BuildElements, render: (progress: number) => void) {
	const { track, stage } = elements;
	let lastProgress = -1;
	let isTicking = false;
	const update = () => {
		isTicking = false;
		const rect = track.getBoundingClientRect();
		const total = track.offsetHeight - stage.offsetHeight;
		const progress = total > 0 ? clamp(-rect.top / total) : 1;
		if (progress === lastProgress) return;
		lastProgress = progress;
		render(progress);
	};
	const onScroll = () => {
		if (isTicking) return;
		isTicking = true;
		requestAnimationFrame(update);
	};
	const onResize = () => {
		fitSceneToScreen(elements);
		lastProgress = -1;
		onScroll();
	};

	fitSceneToScreen(elements);
	render(0);
	update();
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onResize);
	return () => {
		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('resize', onResize);
	};
}

export function driveBuildByScroll(elements: BuildElements, render: (progress: number) => void) {
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion) return showFinishedHouse(elements, render);
	return listenForScroll(elements, render);
}
