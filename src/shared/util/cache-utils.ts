/**
 * Cache utilities for API response caching
 */

// Cache entry interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

// Cache storage using localStorage
class CacheStore {
  private readonly prefix: string;

  constructor(prefix: string = 'jikan_api_cache') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}:${key}`;
  }

  get<T>(key: string): T | null {
    try {
      const cacheKey = this.getKey(key);
      const cached = localStorage.getItem(cacheKey);
      
      if (!cached) return null;

      const entry: CacheEntry<T> = JSON.parse(cached);
      const now = Date.now();

      // Check if the cache is still valid (not expired)
      if (now - entry.timestamp < entry.ttl) {
        console.log(`[Cache] Cache HIT for key: ${key} (cached at: ${new Date(entry.timestamp).toISOString()})`);
        return entry.data;
      } else {
        console.log(`[Cache] Cache EXPIRED for key: ${key} (was cached at: ${new Date(entry.timestamp).toISOString()})`);
        this.remove(key);
        return null;
      }
    } catch (error) {
      console.error(`[Cache] Error getting cache for key: ${key}`, error);
      return null;
    }
  }

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void { // Default to 5 minutes
    try {
      const cacheKey = this.getKey(key);
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        ttl,
      };

      localStorage.setItem(cacheKey, JSON.stringify(entry));
      console.log(`[Cache] Cache SET for key: ${key} (ttl: ${ttl}ms)`);
    } catch (error) {
      console.error(`[Cache] Error setting cache for key: ${key}`, error);
    }
  }

  remove(key: string): void {
    try {
      const cacheKey = this.getKey(key);
      localStorage.removeItem(cacheKey);
      console.log(`[Cache] Removed cache for key: ${key}`);
    } catch (error) {
      console.error(`[Cache] Error removing cache for key: ${key}`, error);
    }
  }

  clear(): void {
    try {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      }
      console.log(`[Cache] Cleared all cache entries with prefix: ${this.prefix}`);
    } catch (error) {
      console.error(`[Cache] Error clearing cache`, error);
    }
  }

  // Check if cache exists and is not expired without returning data
  hasValidCache(key: string): boolean {
    try {
      const cacheKey = this.getKey(key);
      const cached = localStorage.getItem(cacheKey);
      
      if (!cached) return false;

      const entry: CacheEntry<unknown> = JSON.parse(cached);
      const now = Date.now();

      return (now - entry.timestamp < entry.ttl);
    } catch (error) {
      console.error(`[Cache] Error checking cache validity for key: ${key}`, error);
      return false;
    }
  }
}

// Create a global cache instance for Jikan API
export const jikanCache = new CacheStore();

/**
 * Utility function to get cached data or fetch fresh data
 */
export async function getCachedData<T>(
  cacheKey: string,
  fetchFn: () => Promise<T>,
  ttl: number = 5 * 60 * 1000 // 5 minutes default TTL
): Promise<T> {
  // First, check if we have valid cache
  const cachedData = jikanCache.get<T>(cacheKey);
  
  if (cachedData !== null) {
    console.log(`[API] Using cached data for: ${cacheKey}`);
    return cachedData;
  }

  console.log(`[API] Cache MISS for: ${cacheKey}, fetching fresh data...`);
  
  // If no valid cache, fetch fresh data
  const freshData = await fetchFn();
  
  // Store the fresh data in cache
  jikanCache.set(cacheKey, freshData, ttl);
  
  return freshData;
}

/**
 * Simple delay function for debouncing
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounce function to limit API calls
 */
export function debounce<T extends (...args: never[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeout: NodeJS.Timeout;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function executedFunction(this: any, ...args: Parameters<T>): Promise<ReturnType<T>> {
    return new Promise((resolve, reject) => {
      const later = () => {
        clearTimeout(timeout);
        Promise.resolve(func.apply(this, args))
          .then(resolve as (value: unknown) => void)
          .catch(reject);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    });
  };
}