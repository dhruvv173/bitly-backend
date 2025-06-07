import dotenv from "dotenv";
import { Redis } from "ioredis";

dotenv.config();
if (!process.env.REDIS_URL) {
  throw new Error("❌ REDIS_URL is not defined in the environment variables.");
}

const redis = new Redis(process.env.REDIS_URL);

redis.on("error", (err) => {
  console.error("❌ Redis error: ", err);
});

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

export default redis;
