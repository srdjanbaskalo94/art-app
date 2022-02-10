import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/app.state";
import { previewArtPiece, saveArtPiece } from "../../store/art.actions";
import { IArtPiece } from "../../models/art-piece.interface";
import { selectArtPiece } from "../../store/art.selectors";
import { Subscription } from "rxjs";


@Component({
    selector: 'app-art-edit',
    templateUrl: './art-edit.component.html',
    styleUrls: ['./art-edit.component.scss']
})
export class ArtEditComponent implements OnInit {

  
    @Input()
    artPiece!: IArtPiece;

    editForm!: FormGroup;

    constructor(private fb: FormBuilder, private store: Store<IAppState>) { }
    
    ngOnInit(): void {
        this.initializeForm();
    }

   

    initializeForm() {
       
        this.editForm = this.fb.group({
            title: [this.artPiece.name],
            url: [this.artPiece.url],
            description: [this.artPiece.description]
        });
    }

    onPreview(){
        this.store.dispatch(previewArtPiece({
            name: this.editForm.value.title, 
            url: this.editForm.value.url,
            description: this.editForm.value.description
        }));
    }

    onSave(){
        this.store.dispatch(saveArtPiece({ artPiece: {
            id: this.artPiece.id,
            name: this.editForm.value.title, 
            type: this.artPiece.type,
            url: this.editForm.value.url,
            description: this.editForm.value.description
            }
        }))
    }

}