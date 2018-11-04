import { Firebase } from '@ionic-native/firebase';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { globaldata } from '../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  data: Observable<any>;
  authForm: FormGroup;
  token: string;

  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams,
    public global: globaldata, private formBuilder: FormBuilder, private alertCtrl: AlertController
    ,public firebase: Firebase) {
  }

  ngOnInit() {
    this.firebase.getToken()
      .then(token => {
        console.log(`The token is ${token}`);
        this.token = token;
      })
      .catch(error => console.error('Error getting token', error));
    this.initForm();
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }



  onSubmitForm() {
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    let url = this.global.linkLogin;
    let datasend = new FormData();
    datasend.append("data[User][username]", email);
    datasend.append("data[User][password]", password);
    const iemi = this.global.emei;
    datasend.append("data[User][iemi]", iemi);
    datasend.append("data[User][token]", this.token);
    this.data = this.http.post(url, datasend);
    this.data.subscribe(dataa => {
      console.log(dataa["message"]);
      if (dataa["message"] != "Merci") {
        let alert = this.alertCtrl.create({
          title: 'Connexion',
          subTitle: dataa["message"],
          buttons: ['OK']
        });
        alert.present();
      }
      else {
        this.navCtrl.push(HomePage);
      }
    });


  }



}
