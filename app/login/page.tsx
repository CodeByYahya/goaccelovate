import { getServerSession } from "next-auth/next";
import SignIn from "../../components/auth/Login";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/AuthOptions";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/"); 
  }
  return (
    <div>
     <SignIn/>
    </div>
  );
}
