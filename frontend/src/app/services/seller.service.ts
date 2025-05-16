import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Seller } from '../shared/models/Seller';
import { ISellerLogin } from '../shared/interfaces/ISellerLogin';
import { SELLER_LOGIN_URL, SELLER_REGISTER_URL } from '../shared/constants/urls';
import { ISellerRegister } from '../shared/interfaces/ISellerRegister';


const SELLER_KEY = 'Seller';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private sellerSubject = new BehaviorSubject<Seller>(this.getSellerFromLocalStorage());
  public sellerObservable:Observable<Seller>;
  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.sellerObservable = this.sellerSubject.asObservable();
  }

  public get currentSeller():Seller{
    return this.sellerSubject.value;
  }

  login(sellerLogin:ISellerLogin):Observable<Seller>{
    return this.http.post<Seller>(SELLER_LOGIN_URL, sellerLogin).pipe(
      tap({
        next: (seller) =>{
          this.setSellerToLocalStorage(seller);
          this.sellerSubject.next(seller);
          this.toastrService.success(
            `Welcome to the Online Market ${seller.name}!`,
            'Login Successfully'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }

  
  register(sellerRegiser:ISellerRegister): Observable<Seller>{
    return this.http.post<Seller>(SELLER_REGISTER_URL, sellerRegiser).pipe(
      tap({
        next: (seller) => {
          this.setSellerToLocalStorage(seller);
          this.sellerSubject.next(seller);
          this.toastrService.success(
            `Welcome to the Online Market ${seller.name}`,
            'Registered Successfully'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Register Failed')
        }
      })
    )
  }

  logout(){
    this.sellerSubject.next(new Seller());
    localStorage.removeItem(SELLER_KEY);
    window.location.reload();
  }

  private setSellerToLocalStorage(seller:Seller){
    localStorage.setItem(SELLER_KEY,JSON.stringify(seller));
  }

  private getSellerFromLocalStorage():Seller{
    const sellerJson = localStorage.getItem(SELLER_KEY);
    if(sellerJson) return JSON.parse(sellerJson) as Seller;
    return new Seller();
  }
}