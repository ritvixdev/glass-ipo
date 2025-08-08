import { IPO } from '@/types/ipo';
import { storage } from './storage';

interface CachedData<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export class IPOCacheService {
  private static readonly CACHE_PREFIX = 'ipo_cache_';
  private static readonly DEFAULT_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private static readonly FAVORITES_KEY = 'favorite_ipos';
  private static readonly WATCHLIST_KEY = 'watchlist_ipos';
  private static readonly USER_PREFERENCES_KEY = 'user_preferences';

  private static getCacheKey(key: string): string {
    return `${this.CACHE_PREFIX}${key}`;
  }

  static cacheIPOs(ipos: IPO[], cacheDuration = this.DEFAULT_CACHE_DURATION): void {
    const cachedData: CachedData<IPO[]> = {
      data: ipos,
      timestamp: Date.now(),
      expiresAt: Date.now() + cacheDuration,
    };
    storage.set(this.getCacheKey('all_ipos'), cachedData);
  }

  static getCachedIPOs(): IPO[] | null {
    const cachedData = storage.get<CachedData<IPO[]>>(this.getCacheKey('all_ipos'));
    
    if (!cachedData) return null;
    
    if (Date.now() > cachedData.expiresAt) {
      storage.remove(this.getCacheKey('all_ipos'));
      return null;
    }
    
    return cachedData.data;
  }

  static cacheIPODetails(ipoId: string, ipo: IPO, cacheDuration = this.DEFAULT_CACHE_DURATION): void {
    const cachedData: CachedData<IPO> = {
      data: ipo,
      timestamp: Date.now(),
      expiresAt: Date.now() + cacheDuration,
    };
    storage.set(this.getCacheKey(`ipo_${ipoId}`), cachedData);
  }

  static getCachedIPODetails(ipoId: string): IPO | null {
    const cachedData = storage.get<CachedData<IPO>>(this.getCacheKey(`ipo_${ipoId}`));
    
    if (!cachedData) return null;
    
    if (Date.now() > cachedData.expiresAt) {
      storage.remove(this.getCacheKey(`ipo_${ipoId}`));
      return null;
    }
    
    return cachedData.data;
  }

  static addToFavorites(ipoId: string): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(ipoId)) {
      favorites.push(ipoId);
      storage.set(this.FAVORITES_KEY, favorites);
    }
  }

  static removeFromFavorites(ipoId: string): void {
    const favorites = this.getFavorites();
    const filtered = favorites.filter(id => id !== ipoId);
    storage.set(this.FAVORITES_KEY, filtered);
  }

  static getFavorites(): string[] {
    return storage.get<string[]>(this.FAVORITES_KEY, []) || [];
  }

  static isFavorite(ipoId: string): boolean {
    return this.getFavorites().includes(ipoId);
  }

  static addToWatchlist(ipoId: string): void {
    const watchlist = this.getWatchlist();
    if (!watchlist.includes(ipoId)) {
      watchlist.push(ipoId);
      storage.set(this.WATCHLIST_KEY, watchlist);
    }
  }

  static removeFromWatchlist(ipoId: string): void {
    const watchlist = this.getWatchlist();
    const filtered = watchlist.filter(id => id !== ipoId);
    storage.set(this.WATCHLIST_KEY, filtered);
  }

  static getWatchlist(): string[] {
    return storage.get<string[]>(this.WATCHLIST_KEY, []) || [];
  }

  static isInWatchlist(ipoId: string): boolean {
    return this.getWatchlist().includes(ipoId);
  }

  static setUserPreferences(preferences: any): void {
    storage.set(this.USER_PREFERENCES_KEY, preferences);
  }

  static getUserPreferences<T>(defaultPreferences: T): T {
    return storage.get<T>(this.USER_PREFERENCES_KEY, defaultPreferences) || defaultPreferences;
  }

  static clearCache(): void {
    const allKeys = storage.getAllKeys();
    const cacheKeys = allKeys.filter(key => key.startsWith(this.CACHE_PREFIX));
    cacheKeys.forEach(key => storage.remove(key));
  }

  static getCacheStats(): { totalKeys: number; cacheSize: number; } {
    const allKeys = storage.getAllKeys();
    const cacheKeys = allKeys.filter(key => key.startsWith(this.CACHE_PREFIX));
    
    return {
      totalKeys: cacheKeys.length,
      cacheSize: storage.getSize(),
    };
  }

  static cleanExpiredCache(): void {
    const allKeys = storage.getAllKeys();
    const cacheKeys = allKeys.filter(key => key.startsWith(this.CACHE_PREFIX));
    
    cacheKeys.forEach(key => {
      const cachedData = storage.get<CachedData<any>>(key);
      if (cachedData && Date.now() > cachedData.expiresAt) {
        storage.remove(key);
      }
    });
  }
}