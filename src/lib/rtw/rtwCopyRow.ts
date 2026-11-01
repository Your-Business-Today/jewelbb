import { elementById, inputById } from './rtwPage';

const copiedLabelMilliseconds = 1600;

function copyText(text: string) {
	const { clipboard } = navigator;
	if (clipboard && clipboard.writeText) {
		clipboard.writeText(text).then(() => {}).catch(() => {});
		return;
	}
	try {
		document.execCommand('copy');
	} catch {
		/* no-op */
	}
}

export function copyRow() {
	const ta = inputById('rowOutput');
	ta.select();
	ta.setSelectionRange(0, 999999);
	copyText(ta.value);
	const b = elementById('copyBtn');
	b.textContent = 'Copied';
	setTimeout(() => {
		b.textContent = 'Copy row';
	}, copiedLabelMilliseconds);
}
