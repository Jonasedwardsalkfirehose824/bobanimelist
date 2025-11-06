import type { JikanImages } from '../common';

export interface MangaRecommendation {
	entry: {
		mal_id: number;
		url: string;
		images: JikanImages;
		title: string;
	};
	url: string;
	votes: number;
}
