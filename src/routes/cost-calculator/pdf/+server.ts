import { error } from '@sveltejs/kit';
import { printableEstimate } from '$lib/server/printableEstimate';
import { renderPrintPagePdf } from '$lib/server/pdf';
import type { RequestHandler } from './$types';

export const prerender = false;

const pdfRenderingSeconds = 60;

export const config = { maxDuration: pdfRenderingSeconds };

const HttpStatus = { ServerError: 500 } as const;

const estimateFilename = 'jewel-bespoke-build-estimate.pdf';

export const GET: RequestHandler = async ({ url }) => {
	await printableEstimate(url.searchParams);
	const printUrl = `${url.origin}/cost-calculator/print?${url.searchParams}`;
	try {
		const pdf = await renderPrintPagePdf(printUrl);
		return new Response(new Uint8Array(pdf), {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="${estimateFilename}"`
			}
		});
	} catch (failure) {
		console.error('Estimate PDF generation failed:', failure);
		error(HttpStatus.ServerError, 'PDF generation failed — please try again.');
	}
};
