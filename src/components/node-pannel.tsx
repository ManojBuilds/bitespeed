import { MessageCircleIcon } from "lucide-react";
import { DraggableNode } from "./draggable-node";

export const NodePannel = () => {
  return (
    <div className="grid grid-cols-2 gap-6 p-4">
      <DraggableNode icon={MessageCircleIcon} label="Message" type="text" />
    </div>
  );
};
