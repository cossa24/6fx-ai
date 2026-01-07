import { Redis } from "@upstash/redis";

// Upstash Redis client using REST API
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Helper functions for common operations

/**
 * Set a key with optional expiration
 * @param key - Redis key
 * @param value - Value to store (will be JSON stringified)
 * @param expirationSeconds - Optional TTL in seconds
 */
export async function setCache<T>(
  key: string,
  value: T,
  expirationSeconds?: number
): Promise<void> {
  if (expirationSeconds) {
    await redis.setex(key, expirationSeconds, JSON.stringify(value));
  } else {
    await redis.set(key, JSON.stringify(value));
  }
}

/**
 * Get a value from cache
 * @param key - Redis key
 * @returns Parsed value or null if not found
 */
export async function getCache<T>(key: string): Promise<T | null> {
  const value = await redis.get(key);
  if (!value) return null;

  try {
    return JSON.parse(value as string) as T;
  } catch {
    return value as T;
  }
}

/**
 * Delete a key from cache
 * @param key - Redis key
 */
export async function deleteCache(key: string): Promise<void> {
  await redis.del(key);
}

/**
 * Check if a key exists
 * @param key - Redis key
 * @returns true if key exists
 */
export async function hasCache(key: string): Promise<boolean> {
  const exists = await redis.exists(key);
  return exists === 1;
}

/**
 * Increment a counter
 * @param key - Redis key
 * @returns New value after increment
 */
export async function incrementCounter(key: string): Promise<number> {
  return await redis.incr(key);
}

/**
 * Set expiration on an existing key
 * @param key - Redis key
 * @param seconds - TTL in seconds
 */
export async function setExpiration(key: string, seconds: number): Promise<void> {
  await redis.expire(key, seconds);
}
