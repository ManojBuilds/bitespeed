import { cn } from "@/lib/utils";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { MessageCircleIcon, MailIcon } from "lucide-react";

interface TextNodeData {
  [key: string]: unknown;
  text?: string;
}

interface TextNodeProps extends NodeProps {
  data: TextNodeData;
}

export const TextNode = ({ id, data, selected }: TextNodeProps) => {
  return (
    <div
      className={cn(
        "shadow-2xl w-full min-w-xs max-w-lg rounded-lg overflow-hidden border",
        selected && "ring-2 ring-amber-600",
      )}
    >
      <header className="flex items-center justify-between bg-purple-500 text-white p-2">
        <div className="flex items-center gap-2 flex-1">
          <MailIcon className="w-5 h-5" />
          <p>Send Message</p>
        </div>
        <div>
          <MessageCircleIcon className="w-5 h-5" />
        </div>
      </header>
      <div className="p-4 bg-white min-h-20 flex items-center">
        <p className="text-gray-700">{data?.text || "Text message"}</p>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-message`}
        className="!w-3 !h-3 !rounded-full !bg-blue-500 !ring-2 !ring-blue-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-message`}
        className="!w-3 !h-3 !rounded-full !bg-blue-500 !ring-2 !ring-blue-300"
      />
    </div>
  );
};
