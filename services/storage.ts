import { MMKV } from 'react-native-mmkv';

class StorageService {
  private storage: MMKV;

  constructor() {
    this.storage = new MMKV({
      id: 'glass-ipo-storage',
      encryptionKey: 'glass_ipo_encryption_key_2024',
    });
  }

  set<T>(key: string, value: T): void {
    try {
      if (typeof value === 'string') {
        this.storage.set(key, value);
      } else {
        this.storage.set(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error storing data for key ${key}:`, error);
    }
  }

  get<T>(key: string, defaultValue?: T): T | undefined {
    try {
      const value = this.storage.getString(key);
      if (value === undefined) {
        return defaultValue;
      }

      if (typeof defaultValue === 'string') {
        return value as T;
      }

      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Error retrieving data for key ${key}:`, error);
      return defaultValue;
    }
  }

  getBoolean(key: string, defaultValue = false): boolean {
    try {
      return this.storage.getBoolean(key) ?? defaultValue;
    } catch (error) {
      console.error(`Error retrieving boolean for key ${key}:`, error);
      return defaultValue;
    }
  }

  setBoolean(key: string, value: boolean): void {
    try {
      this.storage.set(key, value);
    } catch (error) {
      console.error(`Error storing boolean for key ${key}:`, error);
    }
  }

  getNumber(key: string, defaultValue = 0): number {
    try {
      return this.storage.getNumber(key) ?? defaultValue;
    } catch (error) {
      console.error(`Error retrieving number for key ${key}:`, error);
      return defaultValue;
    }
  }

  setNumber(key: string, value: number): void {
    try {
      this.storage.set(key, value);
    } catch (error) {
      console.error(`Error storing number for key ${key}:`, error);
    }
  }

  remove(key: string): void {
    try {
      this.storage.delete(key);
    } catch (error) {
      console.error(`Error removing key ${key}:`, error);
    }
  }

  contains(key: string): boolean {
    try {
      return this.storage.contains(key);
    } catch (error) {
      console.error(`Error checking key ${key}:`, error);
      return false;
    }
  }

  clear(): void {
    try {
      this.storage.clearAll();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  getAllKeys(): string[] {
    try {
      return this.storage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }

  getSize(): number {
    try {
      return this.storage.size;
    } catch (error) {
      console.error('Error getting storage size:', error);
      return 0;
    }
  }
}

export const storage = new StorageService();