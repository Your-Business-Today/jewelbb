export interface TestimonialRow {
	id: string;
	quote: string;
	author: string;
	context: string;
	is_visible: boolean;
	is_on_homepage: boolean;
	is_on_contact_page: boolean;
	is_in_brochure: boolean;
	sort_order: number;
}

export type TestimonialInput = Omit<TestimonialRow, 'id'>;

export const Placements = {
	homepage: { column: 'is_on_homepage', label: 'Homepage' },
	contactPage: { column: 'is_on_contact_page', label: 'Contact page' },
	brochure: { column: 'is_in_brochure', label: 'Brochure' }
} as const;

export type Placement = keyof typeof Placements;

export type PlacementColumn = (typeof Placements)[Placement]['column'];

export const placementList = Object.values(Placements);

export const testimonialsTable = 'testimonials';
