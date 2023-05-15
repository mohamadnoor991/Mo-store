import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl:'./product-box.component.html',
  styles: [
  ]
})
export class ProductBoxComponent implements OnInit {
 @Input() fullWidthMode = false;
 @Input() product: Product | undefined;
 @Output() AddToCart = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(): void {
    this.AddToCart.emit(this.product);

  }
}
