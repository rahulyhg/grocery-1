import { Component, Input, OnInit } from '@angular/core';
import {  NavController, ToastController, MenuController, Refresher  } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ProductdetailsPage } from '../productdetails/productdetails';
import { CartPage } from '../cart/cart';
import {CartItem} from '../../models';
import {Observable} from 'rxjs/Observable';
import {CartProvider} from '../../providers/cart/cart.service';
import {Product} from '../../models';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Common} from "../../providers/common";


@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage  implements OnInit {
  products: Product[] = [];
  loading: boolean;
  productSource: Product[] = [];
  @Input() search: string = "";
  cart: CartItem[] = [];
  public userDetails : any;
  public resposeData : any;
  public dataProduct :any;
  itemProductData = {
     "user_id": "",
    "token": "",
    "p_name": "",   
    "p_id":""
     };
  constructor(public navCtrl: NavController,
    public menu: MenuController, 
    public http: HttpClient, 
    private toastCtrl: ToastController,
    private cartService: CartProvider,
    public authService : AuthServiceProvider,
    public common: Common
    )
      {         
      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;
      this.itemProductData.user_id = this.userDetails.user_id;
      this.itemProductData.token = this.userDetails.token;
      this.getProduct();
      }
   ionViewWillEnter() : void
    {}
    ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
    }

   //Create Toast
     presentToast(msg) {
      let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
   toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
   }
   goToPage(){
    this.navCtrl.push(CartPage);
   }
   //get Product Data with Api 
   getProduct() {
    this.common.presentLoading();
    this.authService.postData(this.itemProductData, "product")
      .then((result) => {
        this.resposeData = result;
        if (this.resposeData.productData) {
              this.common.closeLoading();
          this.products = this.resposeData.productData;
          console.log(this.products);

        } else {
          console.log("No access");
        }

      }, (err) => {
        //Connection failed message
      });
  }
  ngOnInit():void {
   this.cart = this.cartService.getCart();

  }
  openProduct(product) {
    this.navCtrl.push(ProductdetailsPage, product);
  }
  openCart() {
    this.navCtrl.push(CartPage);
  }
  addToCart($event, product: Product) {
    $event.stopPropagation();
    this.cartService.addCartItem(product);
  }

}

