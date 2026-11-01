import { elementById } from './rtwPage';

const savedMessage = (saved: number) =>
	'Saved to the register log (' + saved + (saved === 1 ? ' row' : ' rows') + '). Still paste the row into the group register.';

export function createRegisterLog() {
	let lastSavedKey = '';
	return function saveToLog(entries: Record<string, unknown>[]) {
		const s = elementById('saveStatus');
		const key = JSON.stringify(entries);
		if (key === lastSavedKey) {
			s.textContent = 'Already saved to the register log.';
			return;
		}
		s.textContent = 'Saving to the register log…';
		fetch('/rtw/submit', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ entries })
		})
			.then((r) => (r.ok ? r.json() : Promise.reject()))
			.then((d) => {
				lastSavedKey = key;
				s.textContent = savedMessage(d.saved);
			})
			.catch(() => {
				s.textContent =
					'Could not save to the register log - copy the row into the register as usual and tell the site admin.';
			});
	};
}
