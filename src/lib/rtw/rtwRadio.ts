import { elementById } from './rtwPage';

function createOptions(box: HTMLElement, items: string[], attr: string) {
	return items.map((t) => {
		const d = document.createElement('div');
		d.className = 'radio-opt';
		d.textContent = t;
		d.setAttribute(attr, t);
		box.appendChild(d);
		return d;
	});
}

export function radio(
	containerId: string,
	items: string[],
	attr: string,
	onPick: (v: string) => void,
	refresh: () => void
) {
	const box = elementById(containerId);
	const opts: HTMLElement[] = items.length
		? createOptions(box, items, attr)
		: Array.from(box.querySelectorAll<HTMLElement>('.radio-opt'));
	opts.forEach((d) => {
		d.onclick = () => {
			opts.forEach((o) => o.classList.remove('on'));
			d.classList.add('on');
			onPick(d.getAttribute(attr) ?? '');
			refresh();
		};
	});
}
