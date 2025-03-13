"use server"
import { prisma } from "@/app/lib/PrismaClient";


export async function AddTodo(text:string,userId:string){
     if (!text || !userId) {
        return { error: "Text and User ID are required" }
      }
    
      try {
        const newTodo = await prisma.todo.create({
          data: { text,userId },
        });
        return newTodo;
      } catch (error) {
        console.error("Failed to add todo:", error);
        return { error: "Failed to add todo" }
      }
}

export async function fetchTodos(userId: string) {
  if (!userId) {
    return { error: "User ID is required" };
  }

  try {
    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return todos;
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return { error: "Failed to fetch todos" };
  }
}
export async function EditTodo(id: number, userId: string, newText: string, completed?: boolean) {
  if (!id || !userId || !newText) {
    return { error: "Todo ID, User ID, and new text are required." };
  }

  try {
    const updatedTodo = await prisma.todo.updateMany({
      where: {
        id,
        userId, // Ensures only the owner can update
      },
      data: {
        text: newText,
        ...(completed !== undefined && { completed }), // Only update if 'completed' is provided
      },
    });

    if (updatedTodo.count === 0) {
      return { error: "Todo not found or you're not authorized to edit it." };
    }

    return { success: "Todo updated successfully." };
  } catch (error) {
    console.error("Failed to update todo:", error);
    return { error: "Failed to update todo." };
  }
}

export async function DeleteTodo(id: number, userId: string) {
  if (!id || !userId) {
    return { error: "Todo ID and User ID are required." };
  }

  try {
    const deletedTodo = await prisma.todo.deleteMany({
      where: {
        id,
        userId, // Ensures only the owner can delete
      },
    });

    if (deletedTodo.count === 0) {
      return { error: "Todo not found or you're not authorized to delete it." };
    }

    return { success: "Todo deleted successfully." };
  } catch (error) {
    console.error("Failed to delete todo:", error);
    return { error: "Failed to delete todo." };
  }
}
