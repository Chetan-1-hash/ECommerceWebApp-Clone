import { Routes } from '@angular/router';
import { MensComponent } from './mens/mens.component';
import { MainComponent } from './main/main.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    { path: "main", component: MainComponent },
    { path:"cart", component:CartComponent },
    { path: "mens", component: MensComponent },
    { path: "**", component: MainComponent },
];
