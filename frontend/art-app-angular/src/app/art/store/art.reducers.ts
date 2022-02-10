import { createReducer, on } from "@ngrx/store";
import { artPieceLoad, collectionLoad, editArtPiece, filterCollection, getCollection, previewArtPiece, saveArtPiece } from "./art.actions";
import { IArtState } from './art.state'

const initialState: IArtState = {
    collection: [],
    selectedArtPiece: {
        id: 111,
        name: 'English Vase',
        url: 'https://images.metmuseum.org/CRDImages/ad/mobile-large/DP-14161-261.jpg',
        type: 'potery', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    },
    name: '',
    artType: 'all',
    query: '',
    isEditing: false
}

export const artReducer = createReducer<IArtState>(initialState,
    on(filterCollection, (state, action) => ({
        ...state, artType: action.artType,
        searchString: action.query
    })),
    on(collectionLoad, (state, action) => ({
        ...state, collection: action.collection
    })),
    on(editArtPiece, (state) => ({ ...state, isEditing: true })),
    on(previewArtPiece, (state, action) => ({
        ...state,
        selectedArtPiece: {
            id: state.selectedArtPiece.id,
            name: action.name,
            type: state.selectedArtPiece.type,
            url: action.url,
            description: action.description
        }
    })),
    on(saveArtPiece, (state) => ({ ...state, isEditing: false })),
    on(artPieceLoad, (state, action) => ({
        ...state, selectedArtPiece: action.artPiece
    }))
)