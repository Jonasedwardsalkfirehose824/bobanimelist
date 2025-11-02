import { jikanApi } from './baseApi';
import type { Character, CharacterFull, CharactersSearchParams, JikanPerson, JikanPersonFull, JikanResponse, PeopleSearchParams } from './models';

const EntityEndpoints = {
    topPeople: '/top/people',
    topCharacters: '/top/characters',
    characterFullById: 'characters/{id}/full',
    personFullById: '/people/{id}/full',
    characterSearch: '/characters',
    peopleSearch: '/people'
} as const;

export const entityApi = jikanApi.injectEndpoints({
    endpoints: (builder) => ({
        getTopPeople: builder.query<JikanResponse<JikanPerson[]>, { limit?: number; }>({
            query: ({ limit = 15 }) => {
                return {
                    url: EntityEndpoints.topPeople,
                    params: {
                        limit,
                    },
                };
            },
            // Set stale time to 5 minutes to avoid refetching too often
            keepUnusedDataFor: 60 * 5, // 5 minutes
        }),

        getTopCharacters: builder.query<JikanResponse<Character[]>, { limit?: number; }>({
            query: ({ limit = 15, }) => {
                return {
                    url: EntityEndpoints.topCharacters,
                    params: {
                        limit,
                    },
                };
            },
            // Set stale time to 5 minutes to avoid refetching too often
            keepUnusedDataFor: 60 * 5, // 5 minutes
        }),

        getCharacterById: builder.query<JikanResponse<CharacterFull>, { id: number; }>({
            query: ({ id }) => ({
                url: EntityEndpoints.characterFullById.replace('{id}', String(id)),
            }),
            keepUnusedDataFor: 60 * 30, // 30 minutes for detailed character data
        }),


        getPersonById: builder.query<JikanResponse<JikanPersonFull>, { id: number; }>({
            query: ({ id }) => ({
                url: EntityEndpoints.personFullById.replace('{id}', String(id)),
            }),
            keepUnusedDataFor: 60 * 30, // 30 minutes for detailed person data
        }),

        getCharacterSearch: builder.query<JikanResponse<Character[]>, CharactersSearchParams>({
            query: (params) => {
                return {
                    url: EntityEndpoints.characterSearch,
                    params
                };
            },
            keepUnusedDataFor: 60 * 5, // 5 minutes for search results
        }),

        getPeopleSearch: builder.query<JikanResponse<JikanPerson[]>, PeopleSearchParams>({
            query: (params) => {
                return {
                    url: EntityEndpoints.peopleSearch,
                    params
                };
            },
            keepUnusedDataFor: 60 * 5, // 5 minutes for search results
        }),
    }),
});

export const {
    useGetTopCharactersQuery,
    useGetTopPeopleQuery,
    useGetCharacterByIdQuery,
    useGetPersonByIdQuery,
    useGetCharacterSearchQuery,
    useGetPeopleSearchQuery
} = entityApi;