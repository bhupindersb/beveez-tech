import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const licenseKey = searchParams.get("license");

  if (!licenseKey) {
    return new NextResponse("Missing license", { status: 403 });
  }

  // TODO (Phase 3): Validate license properly
  // For now, allow any non-empty license
  // Later: check Redis / DB, domain, expiry, etc.

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
    return new NextResponse("Failed to fetch release", { status: 500 });
  }

  const release = await releaseRes.json();

  const zipAsset = release.assets.find(
    (asset: any) =>
      asset.name.startsWith("affilixwp-") && asset.name.endsWith(".zip")
  );

  if (!zipAsset) {
    return new NextResponse("ZIP not found", { status: 404 });
  }

  // Redirect WordPress to the ZIP
  return NextResponse.redirect(zipAsset.browser_download_url);
}
