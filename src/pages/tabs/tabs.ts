import { Component } from '@angular/core';
import { ReclamationsPage } from '../reclamations/reclamations';
import { HomePage } from '../home/home';

import { NavController, NavParams } from 'ionic-angular';
import { globaldata } from '../../services/data.service';
import { detailPage } from '../reclamations/detail/detail';
import { rapportPage } from '../reclamations/rapport/rapport';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage{
  homePage = HomePage;
  detail = detailPage;
  rapport=rapportPage;
  recmationsPage = ReclamationsPage;
   myIndex: number;

constructor(public global : globaldata,public navCtrl: NavController, public navParams: NavParams){
    this.myIndex = navParams.data.tabIndex || 0;
}
countreclamation() {
  return this.global.reclamations.length;
}

}