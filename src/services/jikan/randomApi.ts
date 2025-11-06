import { jikanApi } from './baseApi';
import type { JikanResponse, Anime } from './models';
import type { Manga } from './models/manga/manga.model';
import type { Character } from './models/character/character.model';
import type { JikanPerson } from './models/common/person.model';

const RandomEndpoints = {
	randomAnime: '/random/anime',
	randomManga: '/random/manga',
	randomCharacter: '/random/characters',
	randomPeople: '/random/people',
} as const;

export const randomApi = jikanApi.injectEndpoints({
	endpoints: (builder) => ({
		getRandomAnime: builder.query<JikanResponse<Anime>, void>({
			query: () => ({
				url: RandomEndpoints.randomAnime,
			}),
			// Don't cache random results - always fresh
			keepUnusedDataFor: 0,
		}),

		getRandomManga: builder.query<JikanResponse<Manga>, void>({
			query: () => ({
				url: RandomEndpoints.randomManga,
			}),
			keepUnusedDataFor: 0,
		}),

		getRandomCharacter: builder.query<JikanResponse<Character>, void>({
			query: () => ({
				url: RandomEndpoints.randomCharacter,
			}),
			keepUnusedDataFor: 0,
		}),

		getRandomPeople: builder.query<JikanResponse<JikanPerson>, void>({
			query: () => ({
				url: RandomEndpoints.randomPeople,
			}),
			keepUnusedDataFor: 0,
		}),
	}),
});

export const {
	useLazyGetRandomAnimeQuery,
	useLazyGetRandomMangaQuery,
	useLazyGetRandomCharacterQuery,
	useLazyGetRandomPeopleQuery,
} = randomApi;
