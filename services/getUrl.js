import prisma from "../lib/prisma.js";
import redis from "../lib/redis.js";

export default async function getUrl(req, res) {
  const { shortId } = req.params;

  console.log(shortId);
  try {
    const urlRecord = await prisma.url.findUnique({
      where: { shortId: shortId },
    });
    console.log(urlRecord);
    if (!urlRecord) {
      return res.status(404).json({ error: "Short URL Not found" });
    }

    const isExpired =
      urlRecord.expiresAt && new Date(urlRecord.expiresAt) < new Date();
    if (isExpired) {
      return res
        .status(410)
        .json({ error: "Short URL expired, please create a new one!" });
    }

    return res.redirect(302, urlRecord.originalUrl);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
