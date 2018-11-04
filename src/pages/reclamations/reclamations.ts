import { Reclamation } from './../../models/reclamation';
import { detailPage } from './detail/detail';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { globaldata } from '../../services/data.service';



@Component({
  selector: 'page-reclamations',
  templateUrl: 'reclamations.html',
})
export class ReclamationsPage {

  reclamations=this.global.reclamations;

  constructor(public global : globaldata,public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.global.reclamations);
  }

  detail(reclamation)
  {
    this.navCtrl.push(detailPage, {reclamation: reclamation});
  }



}
