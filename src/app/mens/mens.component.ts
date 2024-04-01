import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { items } from './data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCloud, faMinus, faPallet, faPlus, faRuler, faShieldAlt, faShoppingBasket, faTshirt } from '@fortawesome/free-solid-svg-icons';
import { DataTransferService } from '../data-transfer.service';

@Component({
  selector: 'app-mens',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './mens.component.html',
  styleUrl: './mens.component.css'
})
export class MensComponent {

  constructor(private renderer: Renderer2, private df:DataTransferService) { }

  bagItems = items;
  addedItems: any[] = [];
  isOpened: boolean = false;
  activeModalId: number | null = null;
  isTerm:boolean = true;
  isPositive: boolean = false;
  isNegative: boolean = false;


  faFeedback = faHeart;
  faColor = faPallet;
  faSize = faRuler;
  faComfort = faCloud;
  faDurability = faShieldAlt;
  faStyle = faTshirt;
  faPositive = faPlus;
  faNegative = faMinus;

  feedbacks:feedbackData[] = [];

  ngOnInit() {
    // let bagItemsStr = localStorage.getItem('bagItems');
    // this.bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  }


  addToBag(item: any) {
    this.addedItems.push(item);
    localStorage.setItem('itemsdata', JSON.stringify(this.addedItems));
  }


  open(itemId: number) {
    if (this.isTerm) {
      this.isOpened = !this.isOpened;
      if (this.isOpened) {
        this.activeModalId = itemId;
      }
    }
    else {
      this.close();
    }
  }

  close() {
    this.isOpened = false;
    this.isTerm = true;
    this.isPositive= false;
    this.isNegative= false;
    this.activeModalId = null;
  }

  customer_feedback(id: number,termvalue:string, choice: string) {
    // console.log(id + " feedback is "+ val +" loves " + choice);
    const data : feedbackData = {
      fid:id,
      term:termvalue,
      choice:choice
    };
    this.feedbacks[this.feedbacks.length] = data;
    console.log(this.feedbacks);
    this.df.sendData(this.feedbacks);
    this.close();
  }
}

export class feedbackData {
  fid:number;
  term:string;
  choice:string;

  constructor(fid:number, term:string, choice:string){
    this.fid = fid;
    this.term = term;
    this.choice = choice;
  }
  
}
