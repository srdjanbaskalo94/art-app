import { Component, ComponentRef, ElementRef, OnDestroy, OnInit, ViewChild, ViewRef } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { select, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { IAppState } from "src/app/app.state";
import { getArtPiece } from "../../store/art.actions";
import { selectArtPiece, selectIsEditing } from "../../store/art.selectors";

import { 
    trigger,
    state,
    style,
    animate,
    transition
 } from '@angular/animations'
import { NONE_TYPE } from "@angular/compiler";

@Component({
    selector: 'app-art-main',
    templateUrl: './art-main.component.html',
    styleUrls: ['./art-main.component.scss'], 
})
export class ArtMainComponent implements OnInit, OnDestroy {

    artPiece$ = this.store.pipe(select(selectArtPiece));
    
    isEditing$ = this.store.pipe(select(selectIsEditing));

    editingSubscription!: Subscription;

    @ViewChild('sideNav') private sideNav!: MatSidenav;
 
    show: boolean = false;

    constructor(private store: Store<IAppState>) { }
    
    ngOnInit(): void { 
        this.editingSubscription = this.isEditing$.subscribe(_ => {       
            
            this.sideNav.toggle().then(_ => {
                this.show = !this.show;
                this.sideNav.toggle().then(_ => {  
                });
            });
        });
    }

    ngOnDestroy(): void {
       this.editingSubscription.unsubscribe();
    }

}