import { createSelector } from "@ngrx/store";
import { IAppState } from "src/app/app.state";
import { IArtState } from "./art.state";


export const selectArt = (state: IAppState) => state.art;


export const selectArtType = createSelector(
    selectArt, (state: IArtState) => state.artType
)

export const selectSearchString = createSelector(
    selectArt, (state: IArtState) => state.query
)

export const selectCollection = createSelector(
    selectArt, (state: IArtState) => state.collection
)

export const selectArtPiece = createSelector(
    selectArt, (state: IArtState) => state.selectedArtPiece
);

export const selectIsEditing = createSelector(
    selectArt, (state: IArtState) => state.isEditing
)