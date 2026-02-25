import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

export const subscribeIpLimiter =
  redis &&
  new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '10 m')
  });

export const subscribeEmailLimiter =
  redis &&
  new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '24 h')
  });
