import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, Input } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/app.state";
import { IArtTreeNode } from "../../models/art-tree-node.interface";
import { getArtPiece } from "../../store/art.actions";


@Component({
    selector: 'app-art-nav-tree',
    templateUrl: './art-nav-tree.component.html',
    styleUrls: ['./art-nav-tree.component.scss']
})
export class ArtNavTreeComponent {

    treeControl = new NestedTreeControl<IArtTreeNode>(node => node.collection);

    dataSource = new MatTreeNestedDataSource<IArtTreeNode>();

    _collection!: IArtTreeNode[];

    @Input()
    set collection(value: IArtTreeNode[]) {
        this._collection = value;
        this.dataSource.data = this.collection;
    }

    get collection(): IArtTreeNode[] {
        return this._collection;
    }

    constructor(private store: Store<IAppState>) { }

    hasChild = (_: number, node: IArtTreeNode) => !!node.collection && node.collection.length > 0;

    openArt(id: number) {
        this.store.dispatch(getArtPiece({ id }));
    }
}