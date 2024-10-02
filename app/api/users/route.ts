import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const lookupId = request.nextUrl.searchParams.get("user_id");

  if (lookupId) {
    const existingUser = await prisma.user.findFirst({
      where: {
        id: lookupId
      }
    });

    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: null,
        payload: existingUser
      });
    }

    return NextResponse.json({
      success: false,
      message: "Пользователь с указанным идентификатором не существует",
      payload: null
    });
  }

  const existingUsers = await prisma.user.findMany();

  return NextResponse.json({
    success: true,
    message: null,
    payload: existingUsers
  });
}
