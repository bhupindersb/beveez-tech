import { NextResponse } from "next/server";

const GITHUB_RELEASE_API =
  "https://api.github.com/repos/bhupindersb/affilixwp/releases/latest";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { version } = body;

    const res = await fetch(GITHUB_RELEASE_API, {
      headers: {
        "Accept": "application/vnd.github+json",
        "User-Agent": "beveez-tech-updater",
        "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({}, { status: 200 });
    }

    const release = await res.json();
    const latestVersion = release.tag_name.replace(/^v/, "");

    if (!latestVersion || version === latestVersion) {
      return NextResponse.json({}, { status: 200 });
    }

    const zipAsset = release.assets.find(
      (asset: any) =>
        asset.name === `affilixwp-${latestVersion}.zip`
    );

    if (!zipAsset) {
      return NextResponse.json({}, { status: 200 });
    }

    return NextResponse.json({
      new_version: latestVersion,
      homepage: "https://www.beveez.tech/affilixwp",
      download_url: zipAsset.browser_download_url,
    });
  } catch (err) {
    return NextResponse.json({}, { status: 200 });
  }
}
