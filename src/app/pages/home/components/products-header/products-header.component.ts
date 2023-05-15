import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  sort = 'Desc';
  itemsCount = 12 ;

  constructor() { }

  ngOnInit(): void {
  }

    onSortUpdated(newsort: string): void {
      this.sort = newsort;
      this.sortChange.emit(newsort);

    }

    onItemsUpdated(count: number): void {
      this.itemsCount = count;
      this.itemsCountChange.emit(count);
    }

    onColumsCountChange(columnNumbers: number): void {
      this.columsCountChange.emit(columnNumbers);
    }

}
