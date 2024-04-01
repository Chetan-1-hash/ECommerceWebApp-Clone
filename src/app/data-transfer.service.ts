import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { feedbackData } from './mens/mens.component';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }

  private data = new BehaviorSubject<feedbackData[]>([]);
  value = this.data.asObservable();

  sendData(array:feedbackData[]){
    this.data.next(array);
  }

}
