import type { JikanImages } from '../common';

export interface PersonVoiceRole {
	role: string;
	anime: {
		mal_id: number;
		url: string;
		images: JikanImages;
		title: string;
	};
	character: {
		mal_id: number;
		url: string;
		images: JikanImages;
		name: string;
	};
}
