import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IArtPiece } from "../models/art-piece.interface";
import { IArtTreeNode } from "../models/art-tree-node.interface";

@Injectable({
    providedIn: 'root'
})
export class ArtService {

    baseUrl = 'https://localhost:7136/art/';
    collectionUrl = this.baseUrl + 'collection';
    artPieceUrl = this.baseUrl + 'piece'

    constructor(private http: HttpClient) { }

    getCollection(artType?: string, query?: string): Observable<IArtTreeNode[]> {

        const params = query ?
            new HttpParams().set('type', artType!).set('query', query!)
            : new HttpParams().set('type', artType!)

        return this.http.get<IArtTreeNode[]>(this.collectionUrl, { withCredentials: true, params });
    }

    getItemById(id: number): Observable<IArtPiece> {

        const params = new HttpParams().set('id', id);
        return this.http.get<IArtPiece>(this.artPieceUrl, { withCredentials: true, params });
    }

    updateItem(artPiece: IArtPiece): Observable<IArtPiece> {
        return this.http.post<IArtPiece>(this.artPieceUrl, { ...artPiece }, { withCredentials: true });
    }

}