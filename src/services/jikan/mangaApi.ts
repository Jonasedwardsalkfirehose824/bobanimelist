import { jikanApi } from './baseApi';
import type { Genre, JikanResponse, Manga, MangaSearchParams, MangaTopParams } from './models';

const MangaEndpoints = {
    topManga: '/top/manga',
    mangaFullById: '/manga/{id}/full',
    mangaGenres: 'genres/manga',
    mangaSearch: '/manga',
} as const;

export const mangaApi = jikanApi.injectEndpoints({
    endpoints: (builder) => ({
        getTopManga: builder.query<JikanResponse<Manga[]>, MangaTopParams>({
            query: ({ limit = 15, filter = 'bypopularity', type }) => {
                return {
                    url: MangaEndpoints.topManga,
                    params: {
                        limit,
                        filter,
                        type
                    },
                };
            },
            // Set stale time to 5 minutes to avoid refetching too often
            keepUnusedDataFor: 60 * 5, // 5 minutes
        }),

        getMangaById: builder.query<JikanResponse<Manga>, { id: number; }>({
            query: ({ id }) => ({
                url: MangaEndpoints.mangaFullById.replace('{id}', String(id)),
            }),
            keepUnusedDataFor: 60 * 30, // 30 minutes for detailed manga data
        }),

        getMangaGenres: builder.query<JikanResponse<Genre[]>, void>({
            query: () => {
                return {
                    url: MangaEndpoints.mangaGenres
                };
            },
            keepUnusedDataFor: 60 * 60, // 60 minutes for genres (rarely change)
        }),

        getMangaSearch: builder.query<JikanResponse<Manga[]>, MangaSearchParams>({
            query: (data) => {
                return {
                    url: MangaEndpoints.mangaSearch,
                    params: data,
                };
            },
            keepUnusedDataFor: 60 * 5, // 5 minutes for search results
        }),
    }),
});

export const {
    useGetTopMangaQuery,
    useGetMangaByIdQuery,
    useGetMangaGenresQuery,
    useGetMangaSearchQuery
} = mangaApi;