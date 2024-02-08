import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {TimelineComponent} from './components/timeline/timeline.component';


const routes: Routes = [
  { path: '', redirectTo: '/timeline', pathMatch: 'full' },
  { path: 'timeline', component: TimelineComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
