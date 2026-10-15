export type Tag = 'Content' | 'Design' | 'Dev' | 'Research' | 'Marketing';

// Matched lightness (OKLCH L≈0.6) so no tag looks heavier or more washed out than the others; Dev stays the brand coral.
export const tagColors: Record<Tag, string> = {
	Research: '#7676c5',
	Dev: '#e76f51',
	Content: '#b4608b',
	Design: '#578f63',
	Marketing: '#b56c2d'
};
