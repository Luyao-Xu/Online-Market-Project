import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/Product';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product!: Product;
  isSeller: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private userService: UserService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.productService.getProductById(params["id"]).subscribe(serverProduct => {
          this.product = serverProduct;
        });
      }
    });

    this.userService.userObservable.subscribe((user: User) => {
      this.isSeller = user.type === 'seller';
    });
    
  }

  ngOnInit(): void {
  }

  addToCart() {
    if (this.isSeller) {
      return;
    }
    this.cartService.addToCart(this.product);
    this.router.navigateByUrl('/cart-page');
  }
}
