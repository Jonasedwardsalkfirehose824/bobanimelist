import type { JikanImages } from '../common';

export interface AnimeStaff {
	person: {
		mal_id: number;
		url: string;
		images: JikanImages;
		name: string;
	};
	positions: string[];
}

export interface AnimeStreaming {
	name: string;
	url: string;
}
