import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxModule} from '@angular/material/checkbox';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataElaborationComponent } from './data-elaboration/data-elaboration.component';
import { MinimiCostiComponent } from './minimi-costi/minimi-costi.component';
import { VogelComponent } from './vogel/vogel.component';

@NgModule({
  declarations: [
    AppComponent,
    DataElaborationComponent,
    MinimiCostiComponent,
    VogelComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  exports: [
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
