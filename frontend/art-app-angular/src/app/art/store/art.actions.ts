import { createAction, props } from "@ngrx/store";
import { IArtPiece } from "../models/art-piece.interface";
import { IArtTreeNode } from "../models/art-tree-node.interface";


export const GET_COLLECTION = '[ART] Get Collection';
export const FILTER_COLLECTION = '[ART] Filter Collection';
export const COLLECTION_LOAD = '[ART] Collection Load'

export const GET_ART_PIECE = '[ART] Get Art Piece'
export const EDIT_ART_PIECE = '[ART] Edit Art Piece';
export const PREVIEW_ART_PIECE = '[ART] Preview Art Piece';
export const SAVE_ART_PIECE = '[ART] Save Art Piece';
export const ART_PIECE_LOAD = '[ART] Art Piece Load';


export const getCollection = createAction(GET_COLLECTION);
export const filterCollection = createAction(FILTER_COLLECTION, props<{ artType: string, query: string}>());
export const collectionLoad = createAction(COLLECTION_LOAD, props<{ collection: IArtTreeNode[]}>());

export const getArtPiece = createAction(GET_ART_PIECE, props<{id: number}>());
export const editArtPiece = createAction(EDIT_ART_PIECE);
export const previewArtPiece = createAction(PREVIEW_ART_PIECE, props<{name: string, url:string, description:string}>());
export const saveArtPiece = createAction(SAVE_ART_PIECE, props<{ artPiece: IArtPiece }>());
export const artPieceLoad = createAction(ART_PIECE_LOAD, props<{ artPiece: IArtPiece }>());