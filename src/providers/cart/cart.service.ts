import { HttpClient } from '@angular/common/http';
import {CartItem, Product} from '../../models';
import {EventEmitter, Injectable} from '@angular/core';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
//import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {  ToastController} from 'ionic-angular';

@Injectable()
export class CartProvider {

  public cart: CartItem[] = [];
  constructor(public http: HttpClient,
              // public authServiceProvider: AuthServiceProvider
              private toastCtrl: ToastController,
              )
           {}

  public statusChanged = new EventEmitter<{type: string; totalCount: number}>();
  getCart(): CartItem[] {
    return this.cart;
  };
  addCartItem(product: Product): void {
      this.cart.push({
      product_id: product.product_id,
      product_name: product.product_name,
      product_price: product.product_price,
      product_image_id:product.product_image_id,
      product_description:product.product_description
     });
     this.presentToast('Product is Added'); 
    this.statusChanged.emit({
      type: 'add',
      totalCount: this.cart.length
    });
  };
  removeCartItem(index): void {
    this.cart.splice(index, 1);
    this.statusChanged.emit({
      type: 'remove',
      totalCount: this.cart && this.cart.length ? this.cart.length : 0
    });
  };

  //calculate cart Item 
  calcTotalSum(): number {
    let sum = 0;
    if (!this.cart || !this.cart.length) {
      return sum;
    }
    for (let i = 0; i < this.cart.length;  i = i + 1) {
      sum = sum + this.cart[i].product_price;
    }
    return sum;
  }

    //Create Toast
    presentToast(msg) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }

}
