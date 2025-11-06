import type { JikanImages } from '../common';

export interface PersonMangaWork {
	position: string;
	manga: {
		mal_id: number;
		url: string;
		images: JikanImages;
		title: string;
	};
}
