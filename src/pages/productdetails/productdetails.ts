import {Component, OnInit} from '@angular/core';
import {  NavController, NavParams, ToastController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import 'rxjs/add/operator/toPromise';
import {CartProvider} from '../../providers/cart/cart.service';
import {Product} from '../../models';
import { SocialSharing } from '@ionic-native/social-sharing';
import {CartItem} from '../../models';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Common} from "../../providers/common";

@Component({
  selector: 'page-productdetails',
  templateUrl: 'productdetails.html',
})
export class ProductdetailsPage  implements OnInit {
  
  myAtta: string = '';
  product: any;
  products: Product[] = [];
  cart: CartItem[] = [];
  resposeData : any;
  public index :number;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private cartService: CartProvider,
     public authService : AuthServiceProvider,
     private socialSharing: SocialSharing,
     public toastCtrl:ToastController
     )
     {}
  ionViewDidLoad() {
    this.product = this.navParams.data;
  }
   addToCart($event,  product: Product) {
    $event.stopPropagation();
    this.cartService.addCartItem(product);
    console.log(this.product);
    }
  ngOnInit(): void   {
   this.cart = this.cartService.getCart();
  }
  goToCart(){
    console.log();
    this.navCtrl.push(CartPage, { 'myAtta': this.myAtta });
   }
   shareInfo(){
    this.socialSharing.share("demo message", "Demo subject", "", "https://suryaapp.000webhostapp.com/").
   then(() => {
    alert("Sharing success");
     // Success!
     }).catch(() => {
    // Error!
    alert("Share failed");
    });
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
