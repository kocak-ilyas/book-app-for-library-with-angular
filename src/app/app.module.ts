import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, AboutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: 'apiUrl',
      // useValue: 'https://demo.limantech.com/cards/public/api/cards',  // çalışıyor
      useValue: 'https://jsonplaceholder.typicode.com/posts',
      // useValue: 'http://demo.limantech.com/cards/public/api'
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
