import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBrandComponent } from './components/brand/create-brand/create-brand.component';
import { EditBrandComponent } from './components/brand/edit-brand/edit-brand.component';
import { ViewBrandComponent } from './components/brand/view-brand/view-brand.component';
import { HomeComponent } from './components/home/home.component';
import { CreateMobileComponent } from './components/mobile/create-mobile/create-mobile.component';
import { EditMobileComponent } from './components/mobile/edit-mobile/edit-mobile.component';
import { ViewMobileComponent } from './components/mobile/view-mobile/view-mobile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'view', component: ViewBrandComponent },
  { path: 'create', component: CreateBrandComponent },
  { path: 'edit/:id', component: EditBrandComponent },
  { path: 'view-mobile', component: ViewMobileComponent },
  { path: 'create-mobile', component: CreateMobileComponent },
  { path: 'edit-mobile/:id', component: EditMobileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
