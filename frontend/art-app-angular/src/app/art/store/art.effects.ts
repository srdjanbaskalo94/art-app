import { Injectable } from "@angular/core";
import { ArtService } from "../services/art.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { artPieceLoad, collectionLoad, filterCollection, getArtPiece, getCollection, saveArtPiece } from "./art.actions";
import { switchMap, map } from "rxjs";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/app.state";


@Injectable()
export class ArtEffects {

    constructor(
        private artService: ArtService,
        private actions$: Actions, private store: Store<IAppState>) { }

    getCollection$ = createEffect(() => this.actions$.pipe(
        ofType(getCollection),
        switchMap(() => this.artService.getCollection('all').pipe(
            map(response => collectionLoad({ collection: response }))
        ))
    ));

    filterCollection$ = createEffect(() => this.actions$.pipe(
        ofType(filterCollection),
        switchMap(action =>
            this.artService.getCollection(action.artType, action.query).pipe(
                map(response => collectionLoad({ collection: response }))
            ))
    ));

    getArtPiece$ = createEffect(() => this.actions$.pipe(
        ofType(getArtPiece),
        switchMap(action =>
            this.artService.getItemById(action.id).pipe(
                map(response => artPieceLoad({ artPiece: response }))
            ))
    ));

    saveArtPiece$ = createEffect(() => this.actions$.pipe(
        ofType(saveArtPiece),
        switchMap(action =>
            this.artService.updateItem(action.artPiece).pipe(
                map(response => {
                    this.store.dispatch(getCollection());
                    return artPieceLoad({ artPiece: response });
                })
            ))
    ));
}