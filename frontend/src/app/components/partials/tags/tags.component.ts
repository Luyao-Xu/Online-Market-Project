import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags?:Tag[];

  constructor(productService:ProductService) {
    productService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
    }) ;
   }

  ngOnInit(): void {
  }

}
