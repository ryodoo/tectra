import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { globaldata } from '../services/data.service';
import { ReclamationsPage } from '../pages/reclamations/reclamations';
import { TabsPage } from '../pages/tabs/tabs';
import { detailPage } from '../pages/reclamations/detail/detail';
import { rapportPage } from '../pages/reclamations/rapport/rapport';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import {AgmCoreModule} from '@agm/core';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Firebase } from '@ionic-native/firebase';
import { Base64 } from '@ionic-native/base64';
import { RdvPage } from '../pages/reclamations/rdv/rdv';
import { LocalNotifications } from '@ionic-native/local-notifications';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ReclamationsPage,
    TabsPage,
    detailPage,
    rapportPage,
    RdvPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBspmAlQ8YSqsICAN75o8fGI7SBUDZ3RLw'})

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ReclamationsPage,
    TabsPage,
    detailPage,
    rapportPage,
    RdvPage
  ],
  providers: [
    globaldata,
    StatusBar,
    SplashScreen,
    Uid,
    AndroidPermissions,
    Camera,
    Geolocation,
    LocationAccuracy,
    Firebase,
    Base64,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
