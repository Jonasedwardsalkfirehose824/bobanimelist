import { jikanApi } from './baseApi';
import type { JikanResponse, Anime, AnimeTopParams, SeasonNowParams, JikanSeasonsParams, AnimeSearchParams, Genre } from './models';

const AnimeEndpoints = {
    // animeEpisodes: '/anime/{id}/episodes',
    // animeEpisodeById: '/anime/{id}/episodes/{episode}',
    // animeVideos: '/anime/{id}/videos',
    // animeVideosEpisodes: '/anime/{id}/videos/episodes',
    topAnime: '/top/anime',
    animeFullById: '/anime/{id}/full',
    animeSeasonsNow: '/seasons/now',
    animeSeasonsUpcoming: '/seasons/upcoming',
    animeSearch: '/anime',
    recentAnimeRecommendations: '/recommendations/anime',
    animeRecommendations: '/anime/{id}/recommendations',
    animeStatistics: '/anime/{id}/statistics',
    animeReviews: '/anime/{id}/reviews',
    animeCharacters: '/anime/{id}/characters',
    animeGenres: '/genres/anime'
} as const;

export const animeApi = jikanApi.injectEndpoints({
    endpoints: (builder) => ({
        getTopAnime: builder.query<JikanResponse<Anime[]>, AnimeTopParams>({
            query: ({ sfw = true, limit = 15, filter = 'bypopularity', type }) => {
                return {
                    url: AnimeEndpoints.topAnime,
                    params: {
                        sfw,
                        limit,
                        filter,
                        type
                    },
                };
            },
            // Set stale time to 5 minutes to avoid refetching too often
            keepUnusedDataFor: 60 * 5, // 5 minutes
        }),

        getAnimeById: builder.query<JikanResponse<Anime>, { id: number; }>({
            query: ({ id }) => ({
                url: AnimeEndpoints.animeFullById.replace('{id}', String(id)),
            }),
            keepUnusedDataFor: 60 * 30, // 30 minutes for detailed anime data
        }),

        getAnimeSeasonsNow: builder.query<JikanResponse<Anime[]>, SeasonNowParams>({
            query: ({ limit = 15, }) => {
                return {
                    url: AnimeEndpoints.animeSeasonsNow,
                    params: {
                        limit,
                    },
                };
            },
            keepUnusedDataFor: 60 * 10, // 10 minutes for seasonal data
        }),

        getAnimeSeasonsUpcoming: builder.query<JikanResponse<Anime[]>, JikanSeasonsParams>({
            query: ({ limit = 15 }) => {
                return {
                    url: AnimeEndpoints.animeSeasonsUpcoming,
                    params: {
                        limit
                    },
                };
            },
            keepUnusedDataFor: 60 * 10, // 10 minutes for seasonal data
        }),

        getAnimeSearch: builder.query<JikanResponse<Anime[]>, AnimeSearchParams>({
            query: (data) => {
                return {
                    url: AnimeEndpoints.animeSearch,
                    params: data,
                };
            },
            keepUnusedDataFor: 60 * 5, // 5 minutes for search results
        }),

        getRecentAnimeRecommendations: builder.query<JikanResponse<Anime[]>, { page?: number; }>({
            query: ({ page = 1 }) => {
                return {
                    url: AnimeEndpoints.recentAnimeRecommendations,
                    params: {
                        page
                    },
                };
            },
            keepUnusedDataFor: 60 * 10, // 10 minutes for recommendations
        }),

        // TODO: remove
        getAnimeGenres: builder.query<JikanResponse<Genre[]>, void>({
            query: () => {
                return {
                    url: AnimeEndpoints.animeGenres
                };
            },
            keepUnusedDataFor: 60 * 60, // 60 minutes for genres (rarely change)
        }),
        
        getRandomAnime: builder.query<JikanResponse<Anime[]>, { page?: number; limit?: number; sfw?: boolean; }>({
            query: ({ page = 1, limit = 25, sfw = true }) => {
                return {
                    url: AnimeEndpoints.animeSearch,
                    params: {
                        page,
                        limit,
                        sfw,
                        order_by: 'popularity', // Get popular anime and then shuffle on client
                        sort: 'desc'
                    },
                };
            },
            keepUnusedDataFor: 60 * 5, // 5 minutes for random anime
        })
    }),
});

export const {
    useGetTopAnimeQuery,
    useGetAnimeByIdQuery,
    useGetAnimeSeasonsNowQuery,
    useGetAnimeSeasonsUpcomingQuery,
    useGetAnimeSearchQuery,
    useGetRecentAnimeRecommendationsQuery,
    useGetAnimeGenresQuery,
    useGetRandomAnimeQuery
} = animeApi;