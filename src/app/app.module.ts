import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
// Step1: import { HttpClientModule } from '@angular/common/http'; in app.module.ts
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroeComponent } from './components/heroe/heroe.component';
import { HeroesComponent } from './components/heroes/heroes.component';
//prevent the submit forms, `cause angular control the forms right now
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, HeroeComponent, HeroesComponent],
  //step2: add: HttpClientModule in Imports
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
