import { NextResponse } from "next/server";

// TEMP in-memory licenses (replace with DB later)
const LICENSES: Record<string, any> = {
  "AFFILIXWP-TEST-1234": {
    status: "active",
    plan: "starter",
    max_sites: 1,
    expires_at: "2026-01-01",
    domains: [],
  },
};

export async function POST(req: Request) {
  try {
    const { license_key, domain } = await req.json();

    if (!license_key || !domain) {
      return NextResponse.json({ valid: false }, { status: 200 });
    }

    const license = LICENSES[license_key];

    if (!license) {
      return NextResponse.json({ valid: false }, { status: 200 });
    }

    if (license.status !== "active") {
      return NextResponse.json({
        valid: false,
        status: license.status,
      });
    }

    // Bind domain if not already bound
    if (!license.domains.includes(domain)) {
      if (license.domains.length >= license.max_sites) {
        return NextResponse.json({
          valid: false,
          status: "limit_reached",
        });
      }

      license.domains.push(domain);
    }

    return NextResponse.json({
      valid: true,
      status: "active",
      plan: license.plan,
      expires_at: license.expires_at,
    });
  } catch (e) {
    return NextResponse.json({ valid: false }, { status: 200 });
  }
}
