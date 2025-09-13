"use client";

import { useFlowStore } from "@/store/useFlowStore";
import { FlowCanvas } from "./flow-canvas";
import { NodePannel } from "./node-pannel";
import { Button } from "./ui/button";
import { SettingPannel } from "./setting-pannel";
import { toast } from "sonner";

export const FlowBuilder = () => {
  const selectedNode = useFlowStore((state) => state.selectedNode);
  const nodes = useFlowStore((state) => state.nodes);
  const getNodesWithEmptyTargetHandles = useFlowStore(
    (state) => state.getNodesWithEmptyTargetHandles,
  );

  const handleSave = () => {
    // Check if there are more than one nodes and more than one node has empty target handles
    if (nodes.length > 1) {
      const nodesWithEmptyTargetHandles = getNodesWithEmptyTargetHandles();

      if (nodesWithEmptyTargetHandles.length > 1) {
        toast.error("Cannot save flow", {
          description:
            "More than one node has empty target handles. Please connect all nodes except the starting node.",
        });
        return;
      }
    }

    // If validation passes, show success message
    toast.success("Flow saved successfully!");
  };

  return (
    <div className="flex flex-col w-full h-svh">
      {/*Header*/}
      <header className="bg-secondary p-4 border-b flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </header>
      <div className="flex flex-1">
        <div className="flex-1">
          {/*Canvas*/}
          <FlowCanvas />
        </div>
        <div className="w-96 border-l bg-white h-full">
          {selectedNode ? <SettingPannel /> : <NodePannel />}
          {/*Sidebar*/}
        </div>
      </div>
    </div>
  );
};
