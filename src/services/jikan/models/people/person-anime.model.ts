import type { JikanImages } from '../common';

export interface PersonAnimeWork {
	position: string;
	anime: {
		mal_id: number;
		url: string;
		images: JikanImages;
		title: string;
	};
}
