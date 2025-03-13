import { prisma } from "@/app/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { text, userId } = await request.json();

  if (!text || !userId) {
    return NextResponse.json({ error: "Text and User ID are required" }, { status: 400 });
  }

  try {
    const newTodo = await prisma.todo.create({
      data: { text, userId },
    });
    return NextResponse.json(newTodo);
  } catch (error) {
    console.error("Failed to add todo:", error);
    return NextResponse.json({ error: "Failed to add todo" }, { status: 500 });
  }
}
