import { HttpClient } from '@angular/common/http';
import { CartItem, Product } from '../../models';
import { EventEmitter, Injectable } from '@angular/core';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
//import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';

@Injectable()
export class CartProvider {

  total_qty = 0;

  public cart: CartItem[] = [];
  constructor(public http: HttpClient,
    // public authServiceProvider: AuthServiceProvider
    private toastCtrl: ToastController,
  ) {

  }
  public statusChanged = new EventEmitter<{ type: string; totalCount: number }>();
  getCart(): CartItem[] {
    return this.cart;
  };

  productExist(d, toCheck) {
    let flag = 0;
    console.log(toCheck);
    for (let i = 0; i < d.length; i++) {
      if (d[i].id == toCheck.id) {
        console.log(toCheck.id);
        flag = 1;
      }
    }

    if (flag === 0) {
      console.log('sending false');
      return false;
    } else {
      console.log('sending true');
      return true;
    }

  }
  addCartItem(product: Product): void {
    let check = JSON.parse(localStorage.getItem('cart'));
    if (check && check.length) {
    if (this.productExist(check, product)) {
      this.presentToast('Already existing');
    }
    else{
     this.cart.push(product);
      const final = JSON.stringify([product]);
      localStorage.setItem('cart', final);
      this.presentToast('Product is Added');
    }
   }
    else{
      this.cart.push(product);
      const final = JSON.stringify([product]);
      localStorage.setItem('cart', final);
      this.presentToast('Product is Added');
    }
  };
  quantityPlus(product){
        product.quantity += 1;
    }
  quantityMinus(product){
      product.quantity -= 1;
    }
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
    // let p_qty=1;
    if (!this.cart || !this.cart.length) {
      return sum;
    }
    for (let i = 0; i < this.cart.length; i = i + 1) {
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
