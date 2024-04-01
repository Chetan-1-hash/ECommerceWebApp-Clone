import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor( private router : Router ){}

  isBtn:boolean = true;
  isPanel:boolean = false;
  OpenAdminData!:boolean;

  faSubmit = faArrowAltCircleRight;

  ngOnInit(){
    
    this.OpenAdminData = localStorage.getItem("OpenAdminData") === "true" ? true:false;
    console.log(this.OpenAdminData);
  }

  openLoginPanel(){
    this.isBtn = false;
    this.isPanel = true;
  }

  openAdminData(){
    this.OpenAdminData = true;
    localStorage.setItem("OpenAdminData",this.OpenAdminData.toString());
    this.router.navigateByUrl('/profile/admindata');
  }

}
