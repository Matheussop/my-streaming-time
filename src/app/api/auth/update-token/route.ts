import { NextRequest, NextResponse } from "next/server";
import { removeAuthTokens, setAuthTokens } from "@lib/tokenService";

export async function POST(request: NextRequest) {
  const { token, refreshToken } = await request.json();
  await setAuthTokens(token, refreshToken);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  await removeAuthTokens();
  return NextResponse.redirect(new URL("/landing", request.url));
}
