import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KSSwiperModule } from 'angular2-swiper';
import { SplitPane } from '../providers/split-pane';
import { Common } from '../providers/common';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { LinkyModule } from 'angular-linky';
import { MomentModule } from 'angular2-moment';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';
import { ProductsPage } from '../pages/products/products';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProductdetailsPage } from '../pages/productdetails/productdetails';
import { CartProvider } from '../providers/cart/cart.service';
import { AboutModalComponent } from '../components/about/about-modal.component';
import { CartIndicatorComponent } from '../components/cart-indicator/cart-indicator.component';
import { ProductSearchPipe } from '../pipes';
import { CheckoutPage } from '../pages/checkout/checkout';
import { PaymentPage } from '../pages/payment/payment';
import { BlogPage } from '../pages/blog/blog';
import { CategoriesPage } from '../pages/categories/categories';
import { OrdersPage } from '../pages/orders/orders';
import { SettingPage } from '../pages/setting/setting';
import { TicketsPage } from '../pages/tickets/tickets';
import { WhishlistPage } from '../pages/whishlist/whishlist';
import { PdPage } from '../pages/pd/pd';
import { HomesliderPage } from '../pages/homeslider/homeslider';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BlogPage,
    CategoriesPage,
    OrdersPage,
    SettingPage,
    TicketsPage,
    WhishlistPage,
    CartPage,
    LoginPage,
    SignupPage,
    ProductsPage,
    ProductdetailsPage,
    AboutModalComponent,
    CartIndicatorComponent,
    ProductSearchPipe,
    CheckoutPage,
    PaymentPage,
    PdPage,
    HomesliderPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    LinkyModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule, 
    BrowserAnimationsModule,
    KSSwiperModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CartPage,
    LoginPage,
    SignupPage,
    ProductsPage,
    ProductdetailsPage,
    AboutModalComponent,
    CartIndicatorComponent,
    CheckoutPage,
    BlogPage,
    CategoriesPage,
    OrdersPage,
    SettingPage,
    TicketsPage,
    WhishlistPage,
    PaymentPage,
    PdPage,
    HomesliderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CartProvider,
    SplashScreen,
    Common,
    AuthServiceProvider,
    SplitPane
  ]
})
export class AppModule {}
