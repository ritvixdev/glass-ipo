import { IPO } from '@/types/ipo';
import { IPOCacheService } from '@/services/ipoCache';
import { useEffect, useState, useCallback } from 'react';

interface UseIPOCacheReturn {
  cachedIPOs: IPO[] | null;
  cacheIPOs: (ipos: IPO[]) => void;
  getCachedIPO: (ipoId: string) => IPO | null;
  cacheIPO: (ipoId: string, ipo: IPO) => void;
  favorites: string[];
  addToFavorites: (ipoId: string) => void;
  removeFromFavorites: (ipoId: string) => void;
  isFavorite: (ipoId: string) => boolean;
  watchlist: string[];
  addToWatchlist: (ipoId: string) => void;
  removeFromWatchlist: (ipoId: string) => void;
  isInWatchlist: (ipoId: string) => boolean;
  clearCache: () => void;
  cleanExpiredCache: () => void;
}

export const useIPOCache = (): UseIPOCacheReturn => {
  const [cachedIPOs, setCachedIPOs] = useState<IPO[] | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    const loadInitialData = () => {
      const cached = IPOCacheService.getCachedIPOs();
      setCachedIPOs(cached);
      
      const favs = IPOCacheService.getFavorites();
      setFavorites(favs);
      
      const watch = IPOCacheService.getWatchlist();
      setWatchlist(watch);

      IPOCacheService.cleanExpiredCache();
    };

    loadInitialData();
  }, []);

  const cacheIPOs = useCallback((ipos: IPO[]) => {
    IPOCacheService.cacheIPOs(ipos);
    setCachedIPOs(ipos);
  }, []);

  const getCachedIPO = useCallback((ipoId: string): IPO | null => {
    return IPOCacheService.getCachedIPODetails(ipoId);
  }, []);

  const cacheIPO = useCallback((ipoId: string, ipo: IPO) => {
    IPOCacheService.cacheIPODetails(ipoId, ipo);
  }, []);

  const addToFavorites = useCallback((ipoId: string) => {
    IPOCacheService.addToFavorites(ipoId);
    const updatedFavorites = IPOCacheService.getFavorites();
    setFavorites(updatedFavorites);
  }, []);

  const removeFromFavorites = useCallback((ipoId: string) => {
    IPOCacheService.removeFromFavorites(ipoId);
    const updatedFavorites = IPOCacheService.getFavorites();
    setFavorites(updatedFavorites);
  }, []);

  const isFavorite = useCallback((ipoId: string): boolean => {
    return favorites.includes(ipoId);
  }, [favorites]);

  const addToWatchlist = useCallback((ipoId: string) => {
    IPOCacheService.addToWatchlist(ipoId);
    const updatedWatchlist = IPOCacheService.getWatchlist();
    setWatchlist(updatedWatchlist);
  }, []);

  const removeFromWatchlist = useCallback((ipoId: string) => {
    IPOCacheService.removeFromWatchlist(ipoId);
    const updatedWatchlist = IPOCacheService.getWatchlist();
    setWatchlist(updatedWatchlist);
  }, []);

  const isInWatchlist = useCallback((ipoId: string): boolean => {
    return watchlist.includes(ipoId);
  }, [watchlist]);

  const clearCache = useCallback(() => {
    IPOCacheService.clearCache();
    setCachedIPOs(null);
  }, []);

  const cleanExpiredCache = useCallback(() => {
    IPOCacheService.cleanExpiredCache();
    const cached = IPOCacheService.getCachedIPOs();
    setCachedIPOs(cached);
  }, []);

  return {
    cachedIPOs,
    cacheIPOs,
    getCachedIPO,
    cacheIPO,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    clearCache,
    cleanExpiredCache,
  };
};