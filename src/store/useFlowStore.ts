import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  MarkerType,
  OnSelectionChangeFunc,
} from "@xyflow/react";

interface FlowStore {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  onNodesChange: OnNodesChange<Node>;
  onEdgesChange: OnEdgesChange<Edge>;
  onConnect: OnConnect;
  nodeIDs: Record<string, number>;
  addNode: (node: Node) => void;
  getNodeID: (type: string) => string;
  onSelectionChange: OnSelectionChangeFunc;
  clearSelection: () => void;
  updateNodeField: (id: string, field: string, value: unknown) => void;
  getNodesWithEmptyTargetHandles: () => Node[];
}

export const useFlowStore = create<FlowStore>()(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      nodeIDs: {},
      selectedNode: null,
      getNodeID: (type: string) => {
        const newIDs = { ...get().nodeIDs };
        if (newIDs[type] === undefined) {
          newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({ nodeIDs: newIDs });
        return `${type}-${newIDs[type]}`;
      },
      addNode: (node: Node) => {
        set({
          nodes: [...get().nodes, node],
        });
      },
      onNodesChange: (changes) => {
        set({ nodes: applyNodeChanges(changes, get().nodes) });
      },
      onEdgesChange: (changes) => {
        set({ edges: applyEdgeChanges(changes, get().edges) });
      },
      onConnect: (connection) => {
        // Check if there's already an edge from this source handle
        const edges = get().edges;
        const existingEdgeFromSource = edges.find(
          (edge) =>
            edge.source === connection.source &&
            edge.sourceHandle === connection.sourceHandle
        );

        // If there's already an edge from this source handle, don't add a new one
        if (existingEdgeFromSource) {
          return;
        }

        set({
          edges: addEdge(
            {
              ...connection,
              type: "smoothstep",
              animated: true,
              markerEnd: {
                type: MarkerType.Arrow,
                height: 20,
                width: 20,
              },
            },
            edges,
          ),
        });
      },
      clearSelection: () => {
        set({ selectedNode: null });
      },
      onSelectionChange: ({ nodes }) => {
        if (nodes.length > 0) {
          const selectedNode = nodes[0];
          set({ selectedNode });
        } else {
          set({ selectedNode: null });
        }
      },
      updateNodeField: (nodeId: string, fieldName: string, fieldValue: unknown) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              node.data = { ...node.data, [fieldName]: fieldValue };
            }

            return node;
          }),
        });
      },
      getNodesWithEmptyTargetHandles: () => {
        const { nodes, edges } = get();
        
        // For each node, check if it has any incoming edges (connected to its target handle)
        return nodes.filter(node => {
          // Find if there's any edge that has this node as target
          const hasIncomingEdge = edges.some(edge => edge.target === node.id);
          return !hasIncomingEdge;
        });
      },
    }),
    {
      name: "flow-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
