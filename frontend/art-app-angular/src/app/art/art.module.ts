import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from "@ngrx/store";
import { MaterialModule } from "../shared/modules/material.module";
import { EffectsModule } from "@ngrx/effects";
import { ArtEffects } from "./store/art.effects";

import { ArtDetailComponent } from "./components/art-detail/art-detail.component";
import { ArtEditComponent } from "./components/art-edit/art-edit.component";
import { ArtMainComponent } from "./components/art-main/art-main.component";
import { ArtNavComponent } from "./components/art-nav/art-nav.component";
import { ArtNavTreeComponent } from "./components/art-nav-tree/art-nav-tree.component";
import { artReducer } from "./store/art.reducers";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        component: ArtMainComponent
    }
]

@NgModule({
    declarations: [
        ArtMainComponent,
        ArtDetailComponent,
        ArtNavComponent,
        ArtNavTreeComponent,
        ArtEditComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('art', artReducer),
        EffectsModule.forFeature([ArtEffects])
    ]
})
export class ArtModule {

}