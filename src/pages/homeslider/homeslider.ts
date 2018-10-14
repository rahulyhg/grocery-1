import { Component, ViewChild  } from '@angular/core';
import {  NavController, NavParams, Slides  } from 'ionic-angular';
import { LoginPage } from '../login/login';
//import { HomePage  } from '../home/home';
import { SignupPage } from '../signup/signup';
@Component({
  selector: 'page-homeslider',
  templateUrl: 'homeslider.html',
})
export class HomesliderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  @ViewChild(Slides) slidess: Slides;
  nextSlide() {
    this.slidess.slideTo(1, 500);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomesliderPage');
  } 
  slides = [
    {
      title: "Welcome to the Grocery!",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.",
      image: "assets/imgs/ica-slidebox-img-1.png",

    },
    {
      title: "Your delicious dish is coming!",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.",
      image: "assets/imgs/ica-slidebox-img-1.png",
    },
    {
      title: "What is Grocery ?",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.",
      image: "assets/imgs/ica-slidebox-img-1.png",
    }
  ];
   doSignup(){
    this.navCtrl.setRoot(SignupPage);
   }
   doLogin(){
     this.navCtrl.setRoot(LoginPage);
   }
   goHome(){
    this.navCtrl.setRoot(SignupPage);
  }

}
