import type { JikanImages } from '../common';

export interface CharacterVoiceActorData {
	language: string;
	person: {
		mal_id: number;
		url: string;
		images: JikanImages;
		name: string;
	};
}
