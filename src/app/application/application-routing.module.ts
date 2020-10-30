import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ApplicationListComponent } from './pages/application-list/application-list.component'
import { ApplicationInstanceComponent } from './pages/application-instance/application-instance.component'

const routes: Routes = [
  {
    path: '',
    component: ApplicationListComponent,
  },
  {
    path: 'applicationInstance/:id',
    component: ApplicationInstanceComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule { }
