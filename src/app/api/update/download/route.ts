import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const licenseKey = searchParams.get("license");

  if (!licenseKey) {
    return new NextResponse("Missing license", { status: 403 });
  }

  // NOTE: Phase 3 will validate license properly.
  // For Phase 2, allow any non-empty license.

  const releaseRes = await fetch(
    "https://api.github.com/repos/bhupindersb/affilixwp/releases/latest",
    {
      headers: {
        "Accept": "application/vnd.github+json",
        "User-Agent": "beveez-tech-updater",
        "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      cache: "no-store",
    }
  );

  if (!releaseRes.ok) {
    const text = await releaseRes.text();
    console.error("GitHub release fetch failed:", text);
    return new NextResponse("Release fetch failed", { status: 500 });
  }

  const release = await releaseRes.json();

  const zipAsset = release.assets.find(
    (asset: any) =>
      asset.name.startsWith("affilixwp-") &&
      asset.name.endsWith(".zip")
  );

  if (!zipAsset) {
    console.error("ZIP asset not found in release");
    return new NextResponse("ZIP not found", { status: 404 });
  }

  // 🔥 THIS IS IMPORTANT: WordPress can follow redirects
  return NextResponse.redirect(zipAsset.browser_download_url);
}
