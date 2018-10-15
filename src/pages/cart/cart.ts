import { Component, OnInit } from '@angular/core';
import {  NavController, NavParams, AlertController } from 'ionic-angular';
import {CartItem} from '../../models';
import {CartProvider} from '../../providers/cart/cart.service';
import { CheckoutPage } from '../checkout/checkout';
//import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage implements OnInit {
    product:any;
    public index:number;
    public myAtta: string;
    public p_qty:number;
    id:string;
    product_name:string;
    product_price:string;
    public hideCart : boolean = false;
    cart: CartItem[] = [];
    constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartProvider,
    private  alertCtrl:AlertController,
    //public authServiceProvider:AuthServiceProvider
    )
    {
    this.p_qty= 1;
    this.myAtta = navParams.get('myAtta');
    console.log(this.myAtta);
    localStorage.getItem('id');
    localStorage.getItem('product_name');
    localStorage.getItem('product_price');
    }

   ionViewDidLoad() {
    //this.p_id = this.navParams.data;
    //console.log(this.navParams.p_id)
    //console.log(this.myParam);
   }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();

  }
  ionViewDidEnter(): void {
    if (this.cart.length) {
      return ;
    }
    else{
      let alert = this.alertCtrl.create({
        title: '<b>No item in your Cart</b>',
        subTitle: 'Please  Add Items in cart.',
      buttons: ['OK']
    });
    alert.present();
    // If the request was successful notify the Cart
    this.hideCart  =  true;
    }
  }
  calcTotalSum() {
    console.log('running')
    return this.cartService.calcTotalSum();
  }
  removeFromCart(index:any): void {
    this.cartService.removeCartItem(index);
     this.index -= 1;
     sessionStorage.clear();
  }
  //increement item
  incQty(){
    //this.cart.p_qty + 1;
    this.p_qty +=  1;
    console.log(this.p_qty)
  }
  // decreement item
  decQty(){
    if(this.p_qty-1 < 1){
      this.p_qty = 1;
      console.log(this.p_qty+1)
    }
    else{
      this.p_qty -= 1;
      console.log('2->' + this.p_qty);
    }
  }
  goCheckout(){
    console.log(this.cart)
    this.navCtrl.push(CheckoutPage, this.cart);
  }

}
