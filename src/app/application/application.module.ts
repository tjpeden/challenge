import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTreeModule } from '@angular/material/tree';

import { TextMaskModule } from 'angular2-text-mask';

import { ApplicationRoutingModule } from './application-routing.module';

import { ApplicationListComponent } from './pages/application-list/application-list.component';
import { ApplicationInstanceComponent } from './pages/application-instance/application-instance.component';


@NgModule({
  declarations: [
    ApplicationListComponent,
    ApplicationInstanceComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatStepperModule,
    MatTreeModule,

    TextMaskModule,

    ApplicationRoutingModule,
  ],
})
export class ApplicationModule { }
