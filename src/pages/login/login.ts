import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
//import {Common} from "../../providers/common";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
   resposeData : any;
   username: string = '';
   userData = {"username":"", "password":""};
    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public authServiceProvider: AuthServiceProvider,
      private toastCtrl:ToastController,
      public menu: MenuController,
      //public common: Common
      )
      {
      if(localStorage.getItem('userData')){
         this.navCtrl.setRoot(HomePage);
       }
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //auth  login
  login(){
       if(this.userData.username && this.userData.password){
        this.authServiceProvider.postData(this.userData, "login").then((result) =>{
        this.resposeData = result;
        //this.common.presentLoading();
        console.log(this.resposeData);
        if(this.resposeData.userData){
         localStorage.setItem('userData', JSON.stringify(this.resposeData));
         this.menu.enable(true);
         this.navCtrl.setRoot(HomePage);
         //this.common.closeLoading();
         this.presentToast('user is successfully Login');
      }
      else{
        this.presentToast("Username Or Password is Wrong");
      }
        }, (err) => {
          //Connection  failed message
        });
       }
       else{
        if (this.username != '') {
        this.presentToast("Please Enter f User bjb and Password");
          console.log(this.username);
        }
        else{
          this.presentToast("Please Enter User and Password");
        }
       }
      }
      presentToast(msg) {
        let toast = this.toastCtrl.create({
          message: msg,
          duration: 2000
        });
        toast.present();
      }

      //go to signup page
      signup(){
      	this.navCtrl.push(SignupPage);
      }
  
}
