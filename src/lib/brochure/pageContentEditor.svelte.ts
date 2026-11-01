import type { Field } from './templates';

export type PickTarget = { key: string; index?: number; subKey?: string };

export class PageContentEditor {
	content = $state<Record<string, unknown>>({});

	constructor(initial: Record<string, unknown>) {
		this.content = JSON.parse(JSON.stringify(initial));
	}

	arrayOf(key: string): string[] {
		return Array.isArray(this.content[key]) ? [...(this.content[key] as string[])] : [];
	}

	listOf(key: string): Record<string, unknown>[] {
		return Array.isArray(this.content[key]) ? [...(this.content[key] as Record<string, unknown>[])] : [];
	}

	assignPicked({ key, index, subKey }: PickTarget, url: string) {
		if (subKey !== undefined && index !== undefined) return this.setPickedOnListItem(key, index, subKey, url);
		if (index !== undefined) return this.setImageAt(key, index, url);
		this.content[key] = url;
	}

	setPickedOnListItem(key: string, index: number, subKey: string, url: string) {
		const list = this.listOf(key);
		(list[index] as Record<string, unknown>)[subKey] = url;
		this.content[key] = list;
	}

	setImageAt(key: string, index: number, url: string) {
		const arr = this.arrayOf(key);
		if (index >= arr.length) arr.push(url);
		else arr[index] = url;
		this.content[key] = arr;
	}

	removeAt(key: string, index: number) {
		const arr = this.arrayOf(key);
		arr.splice(index, 1);
		this.content[key] = arr;
	}

	groupAdd(key: string, fields: { key: string }[]) {
		const list = this.listOf(key);
		list.push(Object.fromEntries(fields.map((f) => [f.key, ''])));
		this.content[key] = list;
	}

	groupRemove(key: string, index: number) {
		const list = this.listOf(key);
		list.splice(index, 1);
		this.content[key] = list;
	}

	groupMove(key: string, index: number, dir: -1 | 1) {
		const list = this.listOf(key);
		const target = index + dir;
		if (target < 0 || target >= list.length) return;
		[list[index], list[target]] = [list[target], list[index]];
		this.content[key] = list;
	}

	setListItemField(key: string, index: number, subKey: string, value: string) {
		const list = this.listOf(key);
		list[index] = { ...list[index], [subKey]: value };
		this.content[key] = list;
	}

	linesOf(key: string): string {
		return (Array.isArray(this.content[key]) ? (this.content[key] as string[]) : []).join('\n');
	}

	setLines(key: string, value: string) {
		this.content[key] = value
			.split('\n')
			.map((l) => l.trim())
			.filter(Boolean);
	}

	isFilled(f: Field): boolean {
		return f.type === 'image' && Boolean(this.content[f.key]);
	}
}
