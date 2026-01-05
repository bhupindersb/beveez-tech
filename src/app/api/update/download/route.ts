import { NextResponse } from "next/server";

const GITHUB_RELEASE_API =
  "https://api.github.com/repos/bhupindersb/affilixwp/releases/latest";

async function getLatestZipUrl() {
  const res = await fetch(GITHUB_RELEASE_API, {
    headers: {
      "Accept": "application/vnd.github+json",
      "User-Agent": "beveez-tech-updater",
      "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub release");
  }

  const release = await res.json();

  const zipAsset = release.assets.find(
    (asset: any) =>
      asset.name.startsWith("affilixwp-") &&
      asset.name.endsWith(".zip")
  );

  if (!zipAsset) {
    throw new Error("ZIP asset not found");
  }

  return zipAsset.browser_download_url;
}

/**
 * WordPress sends HEAD first
 */
export async function HEAD() {
  try {
    const zipUrl = await getLatestZipUrl();

    return new NextResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Location": zipUrl,
      },
    });
  } catch (e) {
    return new NextResponse(null, { status: 404 });
  }
}

/**
 * WordPress then sends GET
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const licenseKey = searchParams.get("license");

  if (!licenseKey) {
    return new NextResponse("Missing license", { status: 403 });
  }

  try {
    const zipUrl = await getLatestZipUrl();

    // Redirect WordPress to the ZIP
    return NextResponse.redirect(zipUrl);
  } catch (e) {
    return new NextResponse("Download failed", { status: 404 });
  }
}
