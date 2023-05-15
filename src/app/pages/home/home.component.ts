import { Product } from './../../models/product.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROW_HEIGHT: {[id:number]:number} = {1:400,3:335,4:350};
@Component({
  selector: 'app-home',
  templateUrl:  './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  columsNumber = 3;
  rowHeight = ROW_HEIGHT[this.columsNumber];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productSubscription: Subscription | undefined;

  constructor(private cartService: CartService , private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category).subscribe(
      (_products) => {
        this.products = _products;
      }
    );
  }

  onColumsCountChange(newColumsNumber: number): void {
    this.columsNumber = newColumsNumber;
    this.rowHeight = ROW_HEIGHT[this.columsNumber];
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();

  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id

    })
    
  }
  ngOnDestroy(): void {
      
  if(this.productSubscription)
  this.productSubscription.unsubscribe;
  }



  onSortChange(newSore: string): void{
    this.sort = newSore;
    this.getProducts();

  }

  onItemsCountChange(newCount: number): void {

    this.count = newCount.toString();
    this.getProducts();
  }
}
