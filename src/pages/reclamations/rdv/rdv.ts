import { ReclamationsPage } from './../reclamations';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Observable } from 'rxjs/Observable';
import { globaldata } from './../../../services/data.service';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { OnInit, Component } from '@angular/core';


@Component({
  selector: 'page-rdv',
  templateUrl: 'rdv.html',
})
export class RdvPage implements OnInit {

  data: Observable<any>;
  reclamation_id: string;
  client: string;
  date :string;
  heure:string;

  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams,
    public global: globaldata, public alertCtrl: AlertController,
    public localNotifications: LocalNotifications,public platform: Platform) {
  }

  ngOnInit() {
    this.reclamation_id = this.navParams.get('reclamation_id');
    this.client = this.navParams.get('client');
  }





  submit() {
    console.log(this.date);
    let date = new Date(this.date+" "+this.heure);
    console.log(date);
    this.localNotifications.schedule({
       text: 'Reclamation du client '+this.client,
       trigger: {at: date},
       led: 'FF0000',
       sound: this.setSound(),
    });
    let alert = this.alertCtrl.create({
      title: 'Rappel planifier',
      subTitle: 'Merci ',
      buttons: [
        {
          text: 'OK',
          role: 'OK',
          handler: () => {
            //this.navCtrl.push(ReclamationsPage);
          }
        }]
    });
    alert.present();
  }

  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }




}
