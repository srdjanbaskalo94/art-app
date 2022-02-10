import { IArtPiece } from "../models/art-piece.interface";
import { IArtTreeNode } from "../models/art-tree-node.interface";

export interface IArtState {
    collection: IArtTreeNode[];
    selectedArtPiece: IArtPiece;
    name: string;
    artType: string;
    query: string;
    isEditing: boolean
}