import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'

import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'

import { AuthenticationModule } from './authentication/authentication.module'
import { PageNotFoundModule } from './page-not-found/page-not-found.module'

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { LayoutComponent } from './pages/layout/layout.component'
import { HomeComponent } from './pages/home/home.component'

@NgModule({
  declarations: [
    AppComponent,

    LayoutComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,

    MatCardModule,
    MatButtonModule,
    MatToolbarModule,

    AppRoutingModule,

    AuthenticationModule,
    PageNotFoundModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
