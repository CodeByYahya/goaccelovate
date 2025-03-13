import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/[auth]/[...nextauth]/route";
import SignIn from "../../components/auth/Login";
import { redirect } from "next/navigation";

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
