import { authOptions } from "@/app/lib/AuthOptions";
import NextAuth from "next-auth";


const { handlers: { GET, POST } } = NextAuth(authOptions);

export { GET, POST };