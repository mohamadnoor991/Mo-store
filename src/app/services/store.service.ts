import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

const STORE_BASE_URL = 'http://fakestoreapi.com'
// const STORE_BASE_URL =  'https://dummyjson.com'
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit = '12', sort = 'decs', category?: string): Observable <Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}/products${
        category ? '/category/' + category : ''
      }?sort=${sort}&limit=${limit}`
    )
  }

  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}/products/categories`
    )


  }
}
