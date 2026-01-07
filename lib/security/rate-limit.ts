import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limit response structure
 */
export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Upstash Redis client for rate limiting
 */
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/**
 * Rate limiter instance
 * 10 requests per 60 seconds sliding window
 */
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "60 s"),
  analytics: true,
  prefix: "ratelimit:lead-submission",
});

/**
 * Check rate limit for a given identifier
 * Falls back to allowing requests if Redis is unavailable
 *
 * @param identifier - Unique identifier (e.g., IP hash)
 * @returns Promise<RateLimitResult>
 */
export async function checkRateLimit(
  identifier: string
): Promise<RateLimitResult> {
  try {
    const result = await ratelimit.limit(identifier);

    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    // Log error but allow request to proceed
    console.error("Rate limit check failed:", error);

    // Fallback: allow the request
    return {
      success: true,
      limit: 10,
      remaining: 10,
      reset: Date.now() + 60000,
    };
  }
}
