import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { items } from '../mens/data';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  bagItems :any[] = [];
  itemsdata:any[] = [];
  TotalBagItems:number = 0;
  TotalMRP:number = 0;
  TotalDiscount:number = 0;
  ConvenienceFee:number = 0;
  TotalAmount:number = 0;

  ngOnInit(){
    let item = localStorage.getItem('itemsdata')!;
    item = JSON.parse(item);

    for(let i=0;i<item.length;i++){
      this.itemsdata[i]=item[i];
    }
    this.showData();
    this.calculateAmount();
  }

  showData(){
    this.bagItems = this.itemsdata
  }

  calculateAmount(){
    this.TotalBagItems=this.bagItems.length;
    for(let i=0;i<this.bagItems.length;i++){
      this.TotalMRP += this.bagItems[i].original_price;
      this.TotalDiscount += this.bagItems[i].original_price - this.bagItems[i].current_price;
      this.TotalAmount = this.TotalMRP-this.TotalDiscount+this.ConvenienceFee
    }
  }

  remove(id:number){
    for(let i=0;i<this.bagItems.length;i++){
      if(id === this.bagItems[i].id){
        this.bagItems.splice(i,1);
        this.calculateAmount();
      }
    }
    localStorage.setItem('itemsdata',JSON.stringify(this.bagItems));
  }

}
