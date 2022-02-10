
export interface IArtTreeNode {
    id: number;
    name: string;
    type: string;
    collection?: IArtTreeNode[];
}