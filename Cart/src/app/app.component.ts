import { Component, OnInit } from '@angular/core';
import { ShoppingCartItemModel } from './shared/models/shopping-cart-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-cart-project';

  items: ShoppingCartItemModel[] = [];

  totalPrice: number = 0;

  onDeleteEvent($cartItemId: number) {
    const index = this.items.findIndex( item => item.id === $cartItemId);
    this.items.splice(index , 1);
  }

  onCountUpdatedEvent($event: ShoppingCartItemModel) {
    const index = this.items.findIndex( item => item.id === $event.id);
  }

  refresh() {
    let sumPrice: number = 0;
    this.items.forEach(item => {
      const price: number = item.price ?? 0;
      sumPrice += ( price * (item.count ?? 0 ));
    });
    this.totalPrice = sumPrice;

    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  initCart() {
    this.items = [
      { id: 1, count: 0, image:'assets/images/w6.jpg', name:"nice women's watch", price: 100 },
      { id: 2, count: 0, image:'assets/images/w7.jpg', name:"nice women's watch", price: 98 },
      { id: 3, count: 0, image:'assets/images/w19.jpg', name:"nice women's watch", price:80 },
      { id: 4, count: 0, image:'assets/images/w18.jpg', name:"nice women's watch", price: 120 }
    ];
    this.refresh();
  }

  ngOnInit(): void {
    this.initFromLocalStorage();
  }

  private initFromLocalStorage() {
    var data = localStorage.getItem("cart");
    if(data) {
      this.items = JSON.parse(data);
      this.refresh();
    }
  }
}
