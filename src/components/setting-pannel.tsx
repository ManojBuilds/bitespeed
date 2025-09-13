import { useFlowStore } from "@/store/useFlowStore";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export const SettingPannel = () => {
  const selectedNode = useFlowStore((state) => state.selectedNode);
  const clearSelection = useFlowStore((state) => state.clearSelection);
  const updateNodeField = useFlowStore((state) => state.updateNodeField);

  if (!selectedNode) return null;

  return (
    <div className="w-full h-full flex flex-col">
      <header className="flex items-center p-2 border-b">
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => clearSelection()}
        >
          <ArrowLeftIcon />
        </Button>
        <h3 className="flex-1 text-center">Message</h3>
      </header>
      <div className="p-4 flex-1">
        <div className="space-y-2">
          <Label>Text</Label>
          <Textarea
            value={(selectedNode.data?.text as string) || ""}
            onChange={(e) =>
              updateNodeField(selectedNode.id, "text", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};
