import { Component, ViewChild } from '@angular/core';
import { App,  Nav, Platform, ToastController, MenuController,  ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import 'rxjs/add/operator/distinctUntilChanged';
import {AboutModalComponent} from '../components/about/about-modal.component';
import { HomePage } from '../pages/home/home';
import { ProductsPage } from '../pages/products/products';
import {CartProvider} from '../providers/cart/cart.service';
import { LoginPage } from '../pages/login/login';
import { BlogPage } from '../pages/blog/blog';
import { CategoriesPage } from '../pages/categories/categories';
import { OrdersPage } from '../pages/orders/orders';
import { SettingPage } from '../pages/setting/setting';
import { TicketsPage } from '../pages/tickets/tickets';
import { WhishlistPage } from '../pages/whishlist/whishlist';
import { HomesliderPage } from '../pages/homeslider/homeslider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  cartItemCount = 0;
  toastDuration = 2000;
  rootPage: any = HomesliderPage;
 //  public userDetails : any;
  // public resposeData : any;
  // itemProductData = {
   //  "user_id": "",
   // "token": "",
   //  };
  pages: Array<{title: string, component: any, icon:string}>;
    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private cartService: CartProvider,
    public menu: MenuController,
    public app: App
    ) {
     // const data = JSON.parse(localStorage.getItem('userData'));
     // this.userDetails = data.userData;
     // this.itemProductData.user_id = this.userDetails.user_id;
      //this.itemProductData.token = this.userDetails.token;
       this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Products', component: ProductsPage, icon:'basket' },
      { title: 'Blog', component: BlogPage, icon:'chatboxes' },
      { title: 'Orders', component: OrdersPage, icon:'list-box' },
      { title: 'Setting', component: SettingPage, icon:'settings' },
      { title: 'Categories', component: CategoriesPage, icon:'list-box' },
      { title: 'whishlist', component: WhishlistPage, icon:'heart' },
      { title: 'Tickets', component: TicketsPage, icon:'chatboxes' }

    ];
  }
  openAboutModal() {
    const modal = this.modalCtrl.create(AboutModalComponent);
    modal.present()
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // subscribe to cart changes
      this.cartService.statusChanged.subscribe(data => {
          this.cartItemCount = data.totalCount;
          const toastText = data.type === 'add' ? '' : 'Product is Deleted';
           const toast = this.toastCtrl.create({
            message: toastText,
            duration: this.toastDuration
          });
          toast.present();
        });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openHome() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(HomePage);
  }
  openPagePush(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
  //Logged out
 logout(){
   //Api Token Logout 
    this.nav.setRoot(LoginPage);
    this.presentToast("Logged Out");
    localStorage.clear();
  // this.menu.close();
    this.menu.enable(false);
   // var nav = this.app.getRootNav();
    setTimeout('1000');
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
