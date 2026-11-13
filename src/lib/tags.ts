export type Tag = 'Content' | 'Design' | 'Engineering' | 'Research' | 'Marketing';

// Matched lightness (OKLCH L≈0.6) so no tag looks heavier or more washed out than the others; Engineering stays the brand coral.
export const tagColors: Record<Tag, string> = {
	Research: '#7676c5',
	Engineering: '#e76f51',
	Content: '#b4608b',
	Design: '#578f63',
	Marketing: '#b56c2d'
};
