import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import i18n from '../../i18n'; // Impor i18n kita

const JIKAN_API_BASE_URL = 'https://api.jikan.moe/v4';

// Custom base query with 429 error handling and monitoring
const baseQuery = fetchBaseQuery({
    baseUrl: JIKAN_API_BASE_URL,
    prepareHeaders: (headers) => {
        // Ambil bahasa dari i18n
        const currentLng = i18n.language;

        // Mapping bahasa untuk header Accept-Language
        // 'id' di i18n kita -> 'id-ID' atau 'in' untuk header (walaupun 'in' tidak resmi, beberapa API memakainya)
        // 'jp' di i18n kita -> 'ja-JP'
        // 'en' di i18n kita -> 'en-US' atau 'en-GB', 'en'
        let acceptLanguageValue = 'en-US'; // Default ke en-US

        if (currentLng === 'jp') {
            acceptLanguageValue = 'ja-JP';
        } else if (currentLng === 'id') {
            // Header Accept-Language sering menggunakan 'in' untuk Indonesia, meskipun kode bahasa ISO adalah 'id'
            // Kita bisa coba keduanya, atau hanya 'id'. Mari coba 'id' dulu.
            acceptLanguageValue = 'id-ID';
            // Jika API tidak merespon dengan konten bahasa Indonesia, kita bisa coba 'in'
            // acceptLanguageValue = 'in';
        }
        // Jika currentLng === 'en', biarkan default 'en-US'

        headers.set('Accept-Language', acceptLanguageValue);
        return headers;
    }
});

// Custom query function with 429 handling and monitoring
// The function signature now properly matches RTK Query's expected format: (args, api, extraOptions)
const baseQueryWith429Handling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {}
> = async (args, api, extraOptions) => {
    const startTime = Date.now();
    
    // Extract endpoint for logging - handle both string and object args
    let endpoint = 'unknown';
    if (typeof args === 'string') {
        endpoint = args.split('?')[0];
    } else if (args && typeof args === 'object' && 'url' in args) {
        endpoint = (args as { url: string }).url.split('?')[0];
    }
    
    console.log(`[API] Request started for: ${endpoint} at ${new Date(startTime).toISOString()}`);
    
    let retryCount = 0;
    const maxRetries = 1; // Reduced to avoid excessive retries on 429
    let result = await baseQuery(args, api, extraOptions);

    // Monitor and handle 429 errors with retry logic
    while (result.error?.status === 429 && retryCount < maxRetries) {
        console.warn(`[API] 429 Too Many Requests for endpoint: ${endpoint}, attempt ${retryCount + 1}. Waiting before retry...`);
        
        // Wait for a random duration between 1-3 seconds to reduce collision
        const waitTime = Math.floor(Math.random() * 2000) + 1000; 
        await new Promise(resolve => setTimeout(resolve, waitTime));
        
        result = await baseQuery(args, api, extraOptions);
        retryCount++;
    }

    const endTime = Date.now();
    console.log(`[API] Request completed for: ${endpoint} in ${endTime - startTime}ms, success: ${!result.error}`);

    return result;
};

export const jikanApi = createApi({
    reducerPath: 'jikanApi',
    baseQuery: baseQueryWith429Handling,
    endpoints: () => ({}),
    keepUnusedDataFor: 60 * 60,
    refetchOnMountOrArgChange: 60 * 60
});