import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

interface EditDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
  editText: string;
  setEditText: (value: string) => void;
  handleEditTodo: (id: number) => void;
  todoId: number;
}
function EditDialog({
  isDialogOpen,
  setIsDialogOpen,
  editText,
  setEditText,
  handleEditTodo,
  todoId,
}: EditDialogProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEditTodo(todoId);
            }}
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button disabled={isPending} onClick={()=>startTransition(() => handleEditTodo(todoId))}>
            {isPending && <Loader2 className="animate-spin"/>  } Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditDialog;
