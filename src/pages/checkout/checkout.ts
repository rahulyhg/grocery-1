import { Component , OnInit} from '@angular/core';
import {  NavController, NavParams, ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import {Validators, FormBuilder, FormGroup   } from '@angular/forms';
import { OrdersPage} from '../orders/orders';
import {CartItem} from '../../models';
import {CartProvider} from '../../providers/cart/cart.service';
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage implements OnInit {
  
  private contactForm : FormGroup;
  data:any = {};
  _body:any;
  value:any;
  public p_qty:number;
  public product :any;
  cart: CartItem[] = [];
  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public http : Http,
  private formBuilder: FormBuilder,
  private cartService: CartProvider,
  private toastCtrl:ToastController
  )
   {
   this.contactForm = this.formBuilder.group({
      fname: ['', Validators.required],
      email: ['', Validators.required],
      payment_mode:['', Validators.required],
      pin: ['', Validators.required],
      c_address:['', Validators.required],
      number: ['', Validators.required]
    });
        this.data = {};
        this.data.fname = '';
        this.data.email = '';
        this.data.c_address = '';
        this.data.pin = '';
        this.data.number = '';
        this.data.product_name='';
        this.data.product_price='';
        this.data.p_qty='';
        this.data.payment_mode = '';
        this.data.response = '';
        this.http = http;
  }
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }
  ionViewDidLoad() {
    console.log(this.navParams.data[0]);
    this.data=this.navParams.data[0];
   // console.log(this.navParams.data[0])
  }
   contactSubmit(){
   var link = 'http://webtesting.guru/contactapi/api/contact.php';
   var contactData = JSON.stringify({
     fname: this.data.fname,
     number: this.data.number,
     email: this.data.email,
     c_address: this.data.c_address,
     pin:this.data.pin,
     payment_mode:this.data.payment_mode,
     product_name: this.data.product_name,
     product_price:this.data.product_price,
     p_qty:this.data.p_qty
    });
     this.http.post(link, contactData)
     .subscribe(data => {
            //this.navCtrl.setRoot(OrdersPage);
            this.presentToast("Msg Sent successfully");
            this.data.response = data["_body"]; 
        }, error => {
            console.log("Oooops!");
        });
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
   onSubmitContactForm() {
    console.log(this.contactForm.value)
  }

}
