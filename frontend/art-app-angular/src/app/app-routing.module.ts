import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtMainComponent } from './art/components/art-main/art-main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'art',
    pathMatch: 'full'
  },
  {
    path: 'art',
    loadChildren: () => import('./art/art.module').then(m => m.ArtModule)
  },
  {
    path: '**',
    redirectTo: 'art'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
