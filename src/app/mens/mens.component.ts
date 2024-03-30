import { Component } from '@angular/core';
import { items } from './data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mens',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mens.component.html',
  styleUrl: './mens.component.css'
})
export class MensComponent {

  bagItems = items;
  addedItems : any[] = [];

  ngOnInit(){
    // let bagItemsStr = localStorage.getItem('bagItems');
    // this.bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  }


  addToBag(item:any) {
    this.addedItems.push(item);
    localStorage.setItem('itemsdata', JSON.stringify(this.addedItems));
  }

}
