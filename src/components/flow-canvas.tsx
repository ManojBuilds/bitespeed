"use client";
import { useFlowStore } from "@/store/useFlowStore";
import {
  Background,
  ConnectionLineType,
  Controls,
  MiniMap,
  Node,
  ReactFlow,
  ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TextNode } from "./nodes/text-node";
import { useCallback, useRef, useState } from "react";

const nodeTypes = {
  text: TextNode,
};
const gridSize = 20;

export const FlowCanvas = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange);
  const onConnect = useFlowStore((state) => state.onConnect);
  const onSelectionChange = useFlowStore((state) => state.onSelectionChange);
  const addNode = useFlowStore((state) => state.addNode);
  const getNodeID = useFlowStore((state) => state.getNodeID);

  const getInitNodeData = (nodeID: string, type: string) => {
    const nodeData = {
      id: nodeID,
      nodeType: `${type}`,
      text: `Text message ${nodeID}`,
    };
    return nodeData;
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      console.log("dropped", event);

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow"),
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance?.screenToFlowPosition({
          x: event.clientX - (reactFlowBounds?.left || 0),
          y: event.clientY - (reactFlowBounds?.top || 0),
        });

        const nodeID = getNodeID(type);
        const newNode: Node = {
          id: nodeID,
          type,
          position: position || { x: 0, y: 0 },
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, addNode, getNodeID],
  );
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        snapGrid={[gridSize, gridSize]}
        connectionLineType={ConnectionLineType.SmoothStep}
        onSelectionChange={onSelectionChange}
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
