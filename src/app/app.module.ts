import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './_helpers/auth.interceptor';


@NgModule({
  imports: [ 
    BrowserModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule                        
],
  declarations: [ 
    AppComponent, 
    // NavigationComponent
  ],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  // ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }