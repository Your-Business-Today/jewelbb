const followupDaysBeforeExpiry = 28;

export function followupDate(iso: string): string {
	const p = iso.split('-');
	const dt = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
	dt.setUTCDate(dt.getUTCDate() - followupDaysBeforeExpiry);
	return dt.toISOString().slice(0, 10);
}

export function ukDate(iso: string): string {
	if (!iso) return '';
	const p = iso.split('-');
	return p[2] + '/' + p[1] + '/' + p[0];
}

export function todayISO(): string {
	const n = new Date();
	return (
		n.getFullYear() +
		'-' +
		String(n.getMonth() + 1).padStart(2, '0') +
		'-' +
		String(n.getDate()).padStart(2, '0')
	);
}
