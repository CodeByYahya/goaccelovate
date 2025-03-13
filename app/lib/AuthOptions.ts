import { prisma } from "@/app/lib/PrismaClient";
import  { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export const authOptions: AuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      async signIn({ user }: { user: User }) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
  
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
            },
          });
        }
  
        return true;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  };