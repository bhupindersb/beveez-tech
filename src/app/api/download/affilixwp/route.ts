import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return new NextResponse("Missing token", { status: 401 });
  }

  // Validate download token
  const record = await redis.get(`affilixwp:token:${token}`);

  if (!record) {
    return new NextResponse("Invalid or expired token", { status: 403 });
  }

  // Enforce one-time download
  await redis.del(`affilixwp:token:${token}`);

  // Fetch latest GitHub release (AUTHENTICATED)
  const releaseRes = await fetch(
    "https://api.github.com/repos/bhupindersb/affilixwp/releases/latest",
    {
      headers: {
        "Accept": "application/vnd.github+json",
        "User-Agent": "beveez-tech-download-service",
        "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      cache: "no-store",
    }
  );

  if (!releaseRes.ok) {
    const errorText = await releaseRes.text();
    console.error("❌ GitHub API error:", errorText);
    return new NextResponse("Failed to fetch release", { status: 500 });
  }

  const release = await releaseRes.json();

  // Prefer canonical ZIP name
  let zipAsset = release.assets.find(
    (asset: any) => asset.name === "affilixwp.zip"
  );

  // Fallback (older releases)
  if (!zipAsset) {
    zipAsset = release.assets.find(
      (asset: any) =>
        asset.name.startsWith("affilixwp-") &&
        asset.name.endsWith(".zip")
    );
  }

  if (!zipAsset) {
    return new NextResponse("Plugin ZIP not found", { status: 500 });
  }

  // Redirect user to the ZIP download
  return NextResponse.redirect(zipAsset.browser_download_url);
}
