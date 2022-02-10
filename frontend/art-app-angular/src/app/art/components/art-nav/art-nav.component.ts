import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { IAppState } from "src/app/app.state";
import { filterCollection, getCollection } from "../../store/art.actions";
import { selectCollection } from "../../store/art.selectors";


@Component({
    selector: 'app-art-nav',
    templateUrl: './art-nav.component.html',
    styleUrls: ['./art-nav.component.scss']
})
export class ArtNavComponent implements OnInit, OnDestroy {

    collection$ = this.store.pipe(select(selectCollection));

    filterForm!: FormGroup;

    formChangeSubcription!: Subscription;

    constructor(private fb: FormBuilder, private store: Store<IAppState>) { }

    ngOnInit(): void {
        this.initializeForm();
        this.loadCollection();
        this.changeSubscribe();
    }

    ngOnDestroy(): void {
        this.formChangeSubcription.unsubscribe();
    }

    initializeForm() {
        this.filterForm = this.fb.group({
            artType: 'all',
            query: ''
        });
    }

    loadCollection() {
        this.store.dispatch(getCollection());
    }

    changeSubscribe() {
        this.formChangeSubcription = this.filterForm.valueChanges.
            subscribe(data => this.store.dispatch(
                filterCollection({ artType: data.artType, query: data.query })));
    }
}