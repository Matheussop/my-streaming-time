import { NextRequest, NextResponse } from "next/server";
import { setAuthTokens } from "@lib/tokenService";

export async function POST(request: NextRequest) {
  const { token, refreshToken } = await request.json();
  await setAuthTokens(token, refreshToken);
  return NextResponse.json({ ok: true });
}
