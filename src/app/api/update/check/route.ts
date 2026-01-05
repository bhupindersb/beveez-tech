import { NextResponse } from "next/server";

const GITHUB_RELEASE_API =
  "https://api.github.com/repos/bhupindersb/affilixwp/releases/latest";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentVersion = body?.version ?? "0.0.0";

    const res = await fetch(GITHUB_RELEASE_API, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "beveez-tech-updater",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({
        new_version: null,
      });
    }

    const release = await res.json();

    if (!release?.tag_name || !release?.assets?.length) {
      return NextResponse.json({
        new_version: null,
      });
    }

    // Normalize version (v0.1.7 → 0.1.7)
    const latestVersion = release.tag_name.replace(/^v/, "");

    // If already on latest, tell WP nothing
    if (
      !latestVersion ||
      versionCompare(currentVersion, latestVersion) >= 0
    ) {
      return NextResponse.json({
        new_version: null,
      });
    }

    // Accept both:
    // - affilixwp.zip
    // - affilixwp-0.1.7.zip
    const zipAsset = release.assets.find((asset: any) =>
      asset.name === "affilixwp.zip" ||
      asset.name === `affilixwp-${latestVersion}.zip`
    );

    if (!zipAsset?.browser_download_url) {
      return NextResponse.json({
        new_version: null,
      });
    }

    return NextResponse.json({
      new_version: latestVersion,
      homepage: "https://www.beveez.tech/affilixwp",
      download_url: zipAsset.browser_download_url,
    });
  } catch (error) {
    // NEVER return non-200
    return NextResponse.json({
      new_version: null,
    });
  }
}

/**
 * Simple semantic version compare
 * returns:
 *  -1 if a < b
 *   0 if equal
 *   1 if a > b
 */
function versionCompare(a: string, b: string): number {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);

  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const na = pa[i] || 0;
    const nb = pb[i] || 0;
    if (na > nb) return 1;
    if (na < nb) return -1;
  }
  return 0;
}
