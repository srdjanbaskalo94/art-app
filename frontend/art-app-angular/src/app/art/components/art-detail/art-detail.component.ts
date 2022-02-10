import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/app.state";
import { IArtPiece } from "../../models/art-piece.interface";
import { editArtPiece, getArtPiece } from "../../store/art.actions";

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations'
import { selectArtPiece } from "../../store/art.selectors";
import { Subscription } from "rxjs";


@Component({
    selector: 'app-art-detail',
    templateUrl: './art-detail.component.html',
    styleUrls: ['./art-detail.component.scss'],
    animations: [
        trigger('popUpState', [
            state('show', style({
                opacity: 1
            })),
            state('hide', style({
                opacity: 0
            })),
            transition('show => hide', animate('600ms ease-out')),
            transition('hide => show', animate('600ms ease-in'))
        ])
    ]
})
export class ArtDetailComponent implements OnInit {

  
    @Input()
    artPiece! : IArtPiece;

    @Input()
    isEditing!: boolean;

    get editBtnState() {
        return this.isEditing ? 'hide' : 'show'
    }

    constructor(private store: Store<IAppState>) { }

    ngOnInit(): void {
        this.loadArtPiece();

    }

    loadArtPiece() {
        this.store.dispatch(getArtPiece({ id: 101 }));
    }

    onEdit() {
        this.store.dispatch(editArtPiece());
    }


}