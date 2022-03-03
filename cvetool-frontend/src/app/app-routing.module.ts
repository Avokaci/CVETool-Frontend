import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CVEsComponent } from './home/cves/cves.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cves', component: CVEsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
