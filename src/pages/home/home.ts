import { Component, ChangeDetectorRef, Input,  OnInit   } from '@angular/core';
import { NavController, NavParams, Refresher   } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {CartProvider} from '../../providers/cart/cart.service';
import {Product} from '../../models';
import 'rxjs/add/operator/toPromise';
import { ProductdetailsPage } from '../productdetails/productdetails';
import { SocialSharing } from '@ionic-native/social-sharing';
import {CartItem} from '../../models';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Common} from "../../providers/common";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    animations: [
        trigger('cartBadge', [
            state('idle', style({
                opacity: '0.3',
                transform: 'scale(1)'
            })),
            state('adding', style({
                opacity: '1',
                transform: 'scale(1.3)'
            })),
            transition('idle <=> adding', animate('300ms linear')),
            transition('void => *', [
                style({
                    transform: 'translateX(200%)'
                }),
                animate('300ms ease-in-out')
            ])
        ]),
        trigger('addButton', [
            state('idle', style({
                opacity: '0.3'
            })),
            state('adding', style({
                opacity: '1',
                fontWeight: 'bold'
            })),
            transition('idle <=> adding', animate('300ms linear')),
            transition('void => *', [
                style({
                    transform: 'translateX(200%)'
                }),
                animate('300ms ease-in-out')
            ])
        ])
    ]
})
export class HomePage implements OnInit {
    public items_a: Array<any>;
    public options: any;
    title: string;
    products: Product[] = [];
    loading: boolean;
    productSource: Product[] = [];
    @Input() search: string = "";
    cart: CartItem[] = [];
   // public userDetails : any;
    public resposeData : any;
    public dataProduct :any;
    itemProductData = {
    "token": ""
     };
    constructor(private navCtrl: NavController,
        private changeDetector: ChangeDetectorRef,
        private cartService: CartProvider,
        public navParams: NavParams,
        private socialSharing: SocialSharing,
        public authService : AuthServiceProvider,
        public common: Common
    ) {
           const data = JSON.parse(localStorage.getItem('userData'));
            //  this.userDetails = data.userData;
             // this.itemProductData.user_id = this.userDetails.user_id;
             // this.itemProductData.token = this.userDetails.token;
              this.getProduct();
      this.items_a = [
      { gameTitle: 'Title1', gameImage: 'assets/imgs/1.jpeg' },
      { gameTitle: 'Title2', gameImage: 'assets/imgs/1.jpeg' },
      { gameTitle: 'Title3', gameImage: 'assets/imgs/1.jpeg' },
      { gameTitle: 'Title4', gameImage: 'assets/imgs/1.jpeg' },
      { gameTitle: 'Title5', gameImage: 'assets/imgs/1.jpeg' },
      { gameTitle: 'Title6', gameImage: 'assets/imgs/1.jpeg' },
      { gameTitle: 'Title7', gameImage: 'assets/imgs/1.jpeg' },
      { gameTitle: 'Title8', gameImage: 'assets/imgs/1.jpeg' },
      { gameTitle: 'Title9', gameImage: 'assets/imgs/1.jpeg' }
    ];
    this.options = {
      height: 100,
      slidesPerView: 6,
      spaceBetween: 5
    }
    }
    //Add to Cart product
    addToCart($event,  product: Product) {
        this.changeDetector.detectChanges();
        $event.stopPropagation();
        this.cartService.addCartItem(product);

    }
   //get Product Data with Api 
   getProduct() {
    this.common.presentLoading();
    this.authService.getData(this.itemProductData, "getProduct")
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
    ngOnInit(): void {
          this.cart = this.cartService.getCart();
    }
    //go to cart page
    goToCart() {
        this.navCtrl.push(CartPage);
    }
    //product id
    openProduct(product):void {
        this.navCtrl.push(ProductdetailsPage, product);
     }
    //Share Info
    shareInfo() {
        this.socialSharing.share("demo message", "Demo subject", "", "https://suryaapp.000webhostapp.com/").
        then(() => {
            alert("Sharing success");
            // Success!
        }).catch(() => {
            // Error!
            alert("Share failed");
        });
    }
    //Three Slides    
    slides = [
        {
            image: "assets/imgs/slides/slide_1.jpg",
        },
        {
            image: "assets/imgs/slides/slide_2.jpg",
        },
        {
            image: "assets/imgs/slides/slide_3.jpg",
        }
    ];
}