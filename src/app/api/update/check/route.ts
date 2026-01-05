import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { slug, version, licenseKey, domain } = await req.json();

  if (!licenseKey) {
    return NextResponse.json({ error: "Invalid license" }, { status: 403 });
  }

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
    return NextResponse.json({ error: "GitHub fetch failed" }, { status: 500 });
  }

  const release = await releaseRes.json();

  // ✅ DEFINE latestVersion (THIS WAS MISSING)
  const latestVersion = release.tag_name.replace(/^v/, "");

  const zipAsset = release.assets.find(
    (asset: any) =>
      asset.name === `affilixwp-${latestVersion}.zip`
  );


  if (!zipAsset) {
    return NextResponse.json({ error: "ZIP not found" }, { status: 404 });
  }

  return NextResponse.json({
    new_version: latestVersion,
    homepage: "https://www.beveez.tech/affilixwp",
    download_url: zipAsset.browser_download_url, // ← GITHUB ZIP
  });

}
