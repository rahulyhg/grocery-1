import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage  {
    
    resposeData : any;
    userData = {"username": "", "password": "",  "name": "", "email": ""};
    signupform : FormGroup;

     constructor(public navCtrl: NavController,
         public navParams: NavParams,
         public authServiceProvider : AuthServiceProvider,
         public toastCtrl:ToastController,
         private formBuilder: FormBuilder         )
         {
          let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
          this.signupform = this.formBuilder.group({
            username : ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]],
            password : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
            name : ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]],
            email : ['', [Validators.required, Validators.pattern(EMAILPATTERN)]]
          });
          
         }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');

  }
  
//auth signup
signup() {
  if(this.userData.username && this.userData.password && this.userData.name && this.userData.email){
     this.authServiceProvider.postData(this.userData, "signup").then((result) =>{
     this.resposeData = result;
     console.log(this.resposeData);
      if(this.resposeData.userData){
         //localStorage.setItem('userData', JSON.stringify(this.resposeData));
         this.navCtrl.setRoot(LoginPage);
         this.presentToast(' User is successfully created');
      }
      else{
        this.presentToast("username has already been taken");
      }
        }, (err) => {
          //alert('failed message');
          //Connection  failed message
        });
       }
       else{
          this.presentToast("Please Enter User and Password");
        }
    }

  //Create Toast
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  //go to login page
      login(){
        this.navCtrl.setRoot(LoginPage);
      }
}
