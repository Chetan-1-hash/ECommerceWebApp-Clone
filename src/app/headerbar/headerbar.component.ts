import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBagShopping, faBasketShopping, faCartShopping, faSearch, faShoppingBag, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-headerbar',
  standalone: true,
  imports: [RouterModule,FontAwesomeModule],
  templateUrl: './headerbar.component.html',
  styleUrl: './headerbar.component.css'
})
export class HeaderbarComponent {

  constructor( private router:Router ){}

  faSearch = faSearch;
  faProfile = faUser;
  faFav = faHeart;
  faShopbag = faBagShopping;

  addedItems:any[] = [] ;

  ngOnInit(){
    let i = localStorage.getItem('itemsdata')!;
    i = JSON.parse(i);
    for(let j of i){
      this.addedItems.push(j)
    }
    this.displayBagIconCount();
  }

  GoToCart(){
    this.router.navigate(['/cart']);
  }

  displayBagIconCount() {
    const bagItemCountElement = document.querySelector('#bag_item_count') as HTMLElement;
    if (bagItemCountElement) {
      if (this.addedItems.length > 0) {
        bagItemCountElement.style.visibility = 'visible';
        bagItemCountElement.innerText = this.addedItems.length.toString();
      } else {
        bagItemCountElement.style.visibility = 'hidden';
      }
    }
  }

  GoToAdmin(){
    localStorage.setItem("OpenAdminData","false");
    // console.log(localStorage.getItem("OpenAdminData"))
    this.router.navigate(['/profile'])
  }

}
