import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { CanDeactivateRouteService } from './services/can-deactivate-route.service';
import { PolicyModule } from './modules/policy/module';
import { SharedModule } from './components/module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    PolicyModule,
    SharedModule,
  ],
  providers: [
    ApiService,
    CanDeactivateRouteService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
