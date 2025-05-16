export class Product{
    id!:string;
    name!:string;
    price!:number;
    tags?:string[];
    imageUrl!:string;
    seller!:string;
    sold!: boolean; 
}