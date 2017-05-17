import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';


import { AppComponent }  from './app.component';
import { GeneratorComponent }  from './components/generator.component';



@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent,GeneratorComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }