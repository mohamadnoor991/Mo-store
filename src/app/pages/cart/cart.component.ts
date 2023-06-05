import { HttpClient } from '@angular/common/http';
import { CartItem } from './../../models/cart.model';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl:'./cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {
  cart: Cart ={items: [{
    product: 'https://via.placeholder.com/150',
    name: 'sport track',
    price: 20 ,
    quantity: 5,
    id: 1252,},
    {
      product: 'https://via.placeholder.com/150',
      name: ' car',
      price: 555 ,
      quantity: 15,
      id: 12452,},
      {
        product: 'https://via.placeholder.com/150',
        name: 'sport car',
        price: 2000 ,
        quantity: 15,
        id: 12452,}
  ]};
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<String> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService, private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    // ????
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }
  getTotal(items: Array<CartItem>): number { 
    return  this.cartService.getTotal(items);
}
onClearCart(): void {
  this.cartService.clearCart();
}

onRemoveFromCart(item: CartItem): void {
  this.cartService.removeFromCart(item);
}

onRemoveQuantity(item: CartItem): void {
 this.cartService.removeQuantity(item);

}

onAddQuantity(item: CartItem): void {
  this.cartService.addToCart(item);

}
onCheckout(): void {
  this.http.post('http://localhost:4242/checkout', {
    items: this.cart.items}).subscribe(async(res:any)=> {
      let stripe = await loadStripe('pk_test_51NFYgSCc1p2HyaPwE4fZhspbJlR3HHuqvUYZqzgK7XQMOIqxXsBznOFh6yUXxegQ0ZuBALDLRsHMvCEwOU3QqQZU00Dh24cbEo');
      stripe?.redirectToCheckout({
        sessionId: res.id

      })
    });
  }


}
