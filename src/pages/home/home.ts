import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LoginPage } from '../login/login';
import { globaldata } from '../../services/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Reclamation } from '../../models/reclamation';
import { Intervention } from '../../models/intervention';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  data: Observable<any>;
  result: string;
  loginPage = LoginPage;
  constructor(public navCtrl: NavController, private uid: Uid, private androidPermissions: AndroidPermissions,
    public global: globaldata, public http: HttpClient) {
  }

  ngOnInit() {


    this.global.emei = "00";
    let url = this.global.linkCheckiemiExiste + "/" + this.global.emei;
    this.data = this.http.get(url);
    this.data.subscribe(data => {
      this.result = data;
      console.log(this.result);
      if (this.result == "0")
        this.navCtrl.push(LoginPage);
      else
        console.log("yes");
    });
    //this.getImei();

    url = this.global.linkgetdata;
    this.http.get(url).subscribe(data => {
      let i = 0;
      for (let reclamation in data) {

        let j = 0;
        let inters = [];
        for (let intervention in data[i]["Intervention"]) {
          let kk = data[i]["Intervention"][j];
          let inter = new Intervention(kk["user"], kk["date_debut"], kk["date_fin"], kk["produit"], kk["prix_piece"],
            kk["main_doeuvre"], kk["main_doeuvre"], kk["documents"], kk["diagnostic"], kk["ref_pieces"],
            kk["images"], kk["latitude"], kk["longitude"], kk["type"]);
          console.log(inter);
          inters.push(inter);
          j++;
        }
        let rec = new Reclamation(data[i]["Reclamation"]["id"],data[i]["Reclamation"]["name"], data[i]["Reclamation"]["date"],
          data[i]["Reclamation"]["panne"], data[i]["Reclamation"]["ref"], data[i]["Reclamation"]["garantie"],
          data[i]["Reclamation"]["etat"], data[i]["Reclamation"]["client"], data[i]["Reclamation"]["telephone"],
          data[i]["Reclamation"]["adresse"], data[i]["Reclamation"]["ville"], data[i]["Reclamation"]["potentialite"],
          data[i]["Reclamation"]["latitude"], data[i]["Reclamation"]["longitude"], inters);
        this.global.reclamations.push(rec);
        console.log(rec);
        i++;
      }
    });
  }

  async getImei() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );

    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );

      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }

      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }
    console.log(this.uid.IMEI);
    return this.uid.IMEI
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

}
