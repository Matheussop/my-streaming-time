import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@lib/tokenService";
import { validateToken } from "@api/auth";

export async function GET(request: NextRequest) {
  try {
    // Obter o token dos cookies
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json(
        { error: "Token não fornecido" },
        { status: 401 },
      );
    }

    const responseValidateToken = await validateToken();

    // Retornar resposta de sucesso
    return NextResponse.json(responseValidateToken);
  } catch (error) {
    console.error("Erro ao validar token:", error);
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
