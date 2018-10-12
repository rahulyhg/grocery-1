import { Component } from '@angular/core';
import {  NavController, NavParams , ToastController} from 'ionic-angular';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
  			  public toastCtrl:ToastController
  			  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  	payment(){
  		this.presentToast('Payment Method is Coming Soon');
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

}
