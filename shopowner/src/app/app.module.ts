import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';   
import {AngularFireAuthModule} from 'angularfire2/auth';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import { AngularFireDatabaseModule } from 'angularfire2/database';



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';
import { ItemsesPage } from '../pages/itemses/itemses';
import { SignPage } from '../pages/sign/sign';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItemsesPage,
    AddPage,
    SignPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItemsesPage,
    AddPage,
    SignPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
