import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';   
import {AngularFireAuthModule} from 'angularfire2/auth';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import { AngularFireDatabaseModule } from 'angularfire2/database';




import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BusketPage } from '../pages/busket/busket';
import { SearchPage } from '../pages/search/search';
import { CategoriesPage } from '../pages/categories/categories';
import { AllPage } from '../pages/all/all';
import { ItemsesPage } from '../pages/itemses/itemses';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AddressPage} from '../pages/address/address';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    BusketPage,
    SearchPage,
    CategoriesPage,
    AllPage,
    ItemsesPage,
    SigninPage,
    SignupPage,
    AddressPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    BusketPage,
    SearchPage,
    CategoriesPage,
    AllPage,
    ItemsesPage,
    SigninPage,
    SignupPage,
    AddressPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
