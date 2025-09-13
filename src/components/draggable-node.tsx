import { LucideIcon } from "lucide-react";
import { DragEvent } from "react";

export const DraggableNode = ({
  type,
  label,
  icon: Icon,
}: {
  type: string;
  label: string;
  icon: LucideIcon;
}) => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    const appData = { nodeType };
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.style.cursor = "grabbing";
    }
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.style.cursor = "grab";
    }
  };

  return (
    <div
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      draggable
      className="cursor-grab items-center justify-center rounded bg-muted flex-col flex p-4"
    >
      <Icon className="w-5 h-5 text-muted-foreground" />
      <h4 className="font-medium text-muted-foreground">{label}</h4>
    </div>
  );
};
