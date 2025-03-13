import { getServerSession } from "next-auth/next";
import TodoPage, { Todo } from "@/components/todos/TodoList";
import { getUserIdByEmail } from "./lib/Auth";
import { redirect } from "next/navigation";
import { fetchTodos } from "./lib/Todos";
import { authOptions } from "./lib/AuthOptions";
export interface Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
}
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/login");
  }
  const userId = await getUserIdByEmail(session?.user?.email);
  const todos = await fetchTodos(userId as string);
  return (
    <TodoPage userId={userId!} todos={todos as Todo[]} session={session} />
  );
}
