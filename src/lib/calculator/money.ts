const poundsFormat = new Intl.NumberFormat('en-GB', {
	style: 'currency',
	currency: 'GBP',
	maximumFractionDigits: 0
});

export function inPounds(amount: number): string {
	return poundsFormat.format(amount);
}
