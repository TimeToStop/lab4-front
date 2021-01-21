import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GreetingComponent } from './greeting/greeting.component';
import { ResultsComponent } from './results/results.component';

const routes : Routes = [
  { path: 'greeting', component: GreetingComponent },
  { path: 'results', component: ResultsComponent },
  { path: '',   redirectTo: '/greeting', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
