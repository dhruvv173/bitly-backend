import prisma from "../lib/prisma.js";
import redis from "../lib/redis.js";
import generateId from "../lib/generateId.js";

export default async function createUrl(req, res) {
  const { originalUrl } = req.body;

  if (!originalUrl || !originalUrl.startsWith("https://")) {
    return res.status(400).json({ error: "URL Missing" });
  }

  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  const shortId = generateId();
  console.log("Data being passed to Prisma:", {
    shortId,
    originalUrl,
    expiresAt: oneYearFromNow,
  });
  try {
    await prisma.url.create({
      data: {
        shortId: shortId,
        originalUrl: originalUrl,
        expiresAt: oneYearFromNow,
      },
    });

    console.log("Setting to Redis:", { shortId, originalUrl });
    await redis.set(shortId, originalUrl);
    const shortUrl = `${process.env.BASE_URL}/${shortId}`;
    return res.status(201).json({ shortUrl });
  } catch (error) {
    console.error("Error details:", error);
    return res.status(500).json({ error: "Error while creating Short URL" });
  }
}
