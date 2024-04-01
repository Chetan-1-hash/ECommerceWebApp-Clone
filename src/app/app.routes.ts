import { Routes } from '@angular/router';
import { MensComponent } from './mens/mens.component';
import { MainComponent } from './main/main.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDataComponent } from './admin/admin-data/admin-data.component';

export const routes: Routes = [
    { path: "main", component: MainComponent },
    { path:"cart", component:CartComponent },
    { path: "mens", component: MensComponent },
    { path: "profile", component: AdminComponent, children: [
        { path: "admindata", component: AdminDataComponent },
    ] },
    { path: "**", component: MainComponent },
];
