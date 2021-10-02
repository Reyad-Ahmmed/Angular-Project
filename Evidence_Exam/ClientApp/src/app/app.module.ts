import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import { ViewBrandComponent } from './components/brand/view-brand/view-brand.component';
import { CreateBrandComponent } from './components/brand/create-brand/create-brand.component';
import { EditBrandComponent } from './components/brand/edit-brand/edit-brand.component';
import { MatModule } from './components/module/mat/mat.module';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './components/services/data.service';
import { NotificationService } from './components/services/notification.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteBrandComponent } from './components/brand/delete/delete.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewMobileComponent } from './components/mobile/view-mobile/view-mobile.component';
import { CreateMobileComponent } from './components/mobile/create-mobile/create-mobile.component';
import { EditMobileComponent } from './components/mobile/edit-mobile/edit-mobile.component';
import { DatePipe } from '@angular/common';
import { DeleteMobileComponent } from './components/mobile/delete-mobile/delete-mobile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ViewBrandComponent,
    CreateBrandComponent,
    EditBrandComponent,
    DeleteBrandComponent,
    ViewMobileComponent,
    CreateMobileComponent,
    EditMobileComponent,
    DeleteMobileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatModule,
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  entryComponents: [DeleteBrandComponent, DeleteMobileComponent],
  providers: [DataService, NotificationService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
