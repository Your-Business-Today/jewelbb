const millisecondsPerDay = 86_400_000;
const londonTimeZone = 'Europe/London';

export function whenReceived(iso: string): string {
	const d = new Date(iso);
	const now = new Date();
	const days = Math.floor((now.getTime() - d.getTime()) / millisecondsPerDay);
	const time = d.toLocaleString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		timeZone: londonTimeZone
	});
	if (days === 0) return `Today · ${time}`;
	if (days === 1) return `Yesterday · ${time}`;
	return d.toLocaleString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZone: londonTimeZone
	});
}

export function initials(first: string, last: string): string {
	return `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase();
}
