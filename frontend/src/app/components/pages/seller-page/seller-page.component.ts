import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css']
})
export class SellerPageComponent implements OnInit {
  productName: string = '';
  productPrice: number = 0;
  productImage: string = '';
  sellerName: string = '';
  productTags: string[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  addProduct(): void {
    if (!this.productName || !this.productPrice || !this.productImage || !this.sellerName || !this.productTags) {
      alert('Please provide product name, price, image URL, and seller name.');
      return;
    }
  
    const newProduct: Product = {
      id: '',
      name: this.productName,
      price: this.productPrice,
      tags:this.productTags,
      imageUrl: this.productImage,
      seller: this.sellerName,
      sold: false
    };
  
    this.productService.addProduct(newProduct).subscribe(
      (response) => {
        console.log('Product added successfully:', response);
        this.productName = '';
        this.productPrice = 0;
        this.productImage = '';
        this.sellerName = '';
      },
      (error) => {
        console.error('Error adding product:', error);
        alert('Failed to add product. Please try again.');
      }
    );
  }
}
