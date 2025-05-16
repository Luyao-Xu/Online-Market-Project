import {Schema, model} from 'mongoose';

export interface Product{
    id:string;
    name:string;
    price:number;
    tags:string[];
    imageUrl:string;
    seller:string;
    sold:boolean;
}

export const ProductSchema = new Schema<Product>(
    {
        name:{type:String, required:true},
        price:{type:Number, required:true},
        tags:{type:[String]},
        imageUrl:{type:String, required:true},
        seller:{type:String, required:true},
        sold:{type:Boolean, required:false},
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
);

export const ProductModel = model<Product>('product', ProductSchema);