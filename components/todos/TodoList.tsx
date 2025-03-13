"use client";

import { useState } from "react";
import { Check, Edit, LogOut, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import EditDialog from "./EditDialog";
import { AddTodo, DeleteTodo, EditTodo } from "@/app/lib/Todos";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "@/app/page";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoPage({
  userId,
  todos,
  session,
}: {
  userId: string;
  todos: Todo[];
  session: Session;
}) {
  const [localTodos, setLocalTodos] = useState<Todo[]>(todos);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [todoId, setTodoId] = useState<number>();

  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      toast("Please add todo first");
      return;
    }

    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    AddTodo(newTodo, userId);
    setLocalTodos([...todos, todo]);
    setNewTodo("");
  };



  const handleDeleteTodo = async (id: number) => {
    await DeleteTodo(id, userId);
    setLocalTodos(todos.filter((todo) => todo.id !== id));
  };

  const openEditDialog = (todo: Todo) => {
    setEditingTodo(todo);
    setEditText(todo.text);
    setTodoId(todo.id);
    setIsDialogOpen(true);
  };

  const handleEditTodo = async (todoId: number) => {
    if (editText.trim() === "" || !editingTodo) return;
    await EditTodo(todoId, userId, editText);
    setLocalTodos(
      todos.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, text: editText } : todo
      )
    );

    setIsDialogOpen(false);
    setEditingTodo(null);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 w-full">
      <div className="w-full max-w-2xl">
        <Card className="border-none shadow-xl mix-w-full max-w-full md:p-6">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-3 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-4 border-background">
                  <AvatarImage
                    src={session.user?.image ?? ""}
                    alt={"user Profile"}
                  />
                  <AvatarFallback>
                    {session.user?.name?.charAt(0)}
                    {session.user?.name?.split(" ")[1]?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{session.user?.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {session.user?.email}
                  </p>
                </div>
              </div>
              <Button
                className="cursor-pointer"
                variant="ghost"
                size="icon"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          </div>

          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-bold">My Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 mb-8">
              <Input
                placeholder="Add a new task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddTodo();
                }}
                className="flex-1"
              />
              <Button onClick={handleAddTodo} size="icon">
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4">
              {localTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between rounded-xl border p-2 md:p-4 shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={`text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        todo.completed
                          ? "text-muted-foreground line-through"
                          : ""
                      }`}
                    >
                      {todo.text}
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(todo)}
                      className="h-10 w-10 cursor-pointer text-slate-500 hover:text-slate-900"
                    >
                      <Edit className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="h-10 w-10 cursor-pointer text-slate-500 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}

              {todos.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <Check className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">All done!</h3>
                  <p className="text-base text-muted-foreground">
                    Add a new task to get started
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <EditDialog
        editText={editText}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        todoId={todoId!}
        setEditText={setEditText}
        handleEditTodo={handleEditTodo}
      />
    </div>
  );
}
