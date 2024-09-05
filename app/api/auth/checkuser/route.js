import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email } = await request.json();
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return NextResponse.json({ user: user.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ user: 0 }, { status: 200 });
  }
}
