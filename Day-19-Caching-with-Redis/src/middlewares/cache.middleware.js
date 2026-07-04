import redis from "../utils/redis.js";

const cacheMiddleware = (expirySeconds = 3600) => {
  return async (req, res, next) => {
    try {
      // create unique key from route + query params
      const cacheKey = `cache:${req.originalUrl}`;

      // check if data exists in redis
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        console.log("Cache hit:", cacheKey);
        return res.status(200).json({
          statusCode: 200,
          data: cachedData,
          message: "Data fetched from cache",
          success: true,
          fromCache: true,
        });
      }

      // not in cache → store original json function
      console.log("Cache miss:", cacheKey);
      const originalJson = res.json.bind(res);

      // override res.json to cache the response
      res.json = async (body) => {
        // only cache successful responses
        if (body.success) {
          await redis.set(cacheKey, JSON.stringify(body.data), {
  ex: expirySeconds,
});
          console.log("Cached:", cacheKey, "for", expirySeconds, "seconds");
        }
        return originalJson(body);
      };

      next();
    } catch (error) {
      console.log("Cache error:", error.message);
      next(); // if cache fails → continue normally
    }
  };
};

// clear cache for a specific key
const clearCache = async (pattern) => {
  try {
    const keys = await redis.keys(`cache:${pattern}`);
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log("Cache cleared for:", pattern);
    }
  } catch (error) {
    console.log("Cache clear error:", error.message);
  }
};

export { cacheMiddleware, clearCache };