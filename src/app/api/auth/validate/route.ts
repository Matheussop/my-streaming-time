import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@lib/tokenService";
import { validateToken } from "@api/auth";

export async function GET(request: NextRequest) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json(
        { error: "Token não fornecido" },
        { status: 401 },
      );
    }

    const responseValidateToken = await validateToken();

    return NextResponse.json(responseValidateToken);
  } catch (error) {
    console.error("Erro ao validar token:", error);
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
