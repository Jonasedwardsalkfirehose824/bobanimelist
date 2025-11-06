import type { JikanImages } from '../common';

export interface CharacterMangaAppearance {
	role: string;
	manga: {
		mal_id: number;
		url: string;
		images: JikanImages;
		title: string;
	};
}
