import { renderMarkdown } from '$lib/markdown';
import privacyNoticeMarkdown from './privacy-notice.md?raw';

export const privacyNoticeHtml = renderMarkdown(privacyNoticeMarkdown);
