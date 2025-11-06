import type { JikanImages } from '../common';

export interface MangaCharacter {
	character: {
		mal_id: number;
		url: string;
		images: JikanImages;
		name: string;
	};
	role: string;
}
