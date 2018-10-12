import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import 'rxjs/add/operator/toPromise';
import {CartProvider} from '../../providers/cart/cart.service';
import {Product} from '../../models';
import {CartItem} from '../../models';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-pd',
  templateUrl: 'pd.html',
})
export class PdPage {
  product :any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
    		      private cartService: CartProvider,
  	          public authService : AuthServiceProvider,
  	          )
              {}

  ionViewDidLoad() {
    this.product = this.navParams.data;
    console.log(this.navParams.data);
  }
  addToCart($event,  product):void {
    $event.stopPropagation();
    this.cartService.addCartItem(product);
  }

}
