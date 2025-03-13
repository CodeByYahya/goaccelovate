import { prisma } from "./PrismaClient";

export async function getUserIdByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
  console.log("i am user ",user)
    return user?.id;
  }