import { Base64 } from '@ionic-native/base64';
import { Camera } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, normalizeURL } from 'ionic-angular';
import { globaldata } from '../../../services/data.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';



@Component({
  selector: 'page-rapport',
  templateUrl: 'rapport.html',
})
export class rapportPage {

  data: Observable<any>;
  authForm: FormGroup;
  urlimage0: string;
  urlimage1: string;
  urlimage2: string;
  urlimage3: string;
  urlDocument0: string;
  urlDocument1: string;
  urlDocument2: string;
  urlDocument3: string;
  type: string;
  latitude: number;
  longitude: number;
  reclamation_id :string;


  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams,
    public global: globaldata, private formBuilder: FormBuilder, private geolocation: Geolocation,
    private alertCtrl: AlertController, public camera: Camera, public toast: ToastController,
    public locationAccuracy: LocationAccuracy, public base64: Base64) {
    this.type = "non";
  }

  ngOnInit() {
    this.reclamation_id = this.navParams.get('reclamation_id');
    this.initForm();
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if (canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => console.log('Request successful'),
          error => console.log('Error requesting location permissions', error)
        );
      }

    });
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      console.log(resp);
      console.log("laltutude" + resp.coords.latitude + " long" + resp.coords.longitude);
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('hé ra erreur yah ', error);
    });
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      diagnostic: ['', Validators.required],
      produit: ['', Validators.required],
      pieces: this.formBuilder.array([]),
      ramassage: '',
      main: ''
    });
  }


  setType(type: string) {
    this.type = type;
    console.log(type);
  }
  getType() {
    if (this.type == "non")
      return false;
    else
      return true;
  }




  //---------------------Pieces---------------------//

  get getPiecesArray() {
    return this.authForm.get('pieces') as FormArray;
  }

  addPiece() {

    const piece = this.formBuilder.group({
      piece: [],
      prix: [],
    })

    this.getPiecesArray.push(piece);
  }

  deletePiece(i) {
    this.getPiecesArray.removeAt(i)
  }

  //---------------------------------Fin Pieces----------------------------//
  //----------------------------------Images-------------------------//
  onTakePhoto(index: number) {
    this.camera.getPicture({
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }).then(
      (data) => {
        if (data) {
          if (index == 0)
            this.urlimage0 = normalizeURL(data);
          if (index == 1)
            this.urlimage1 = normalizeURL(data);
          if (index == 2)
            this.urlimage2 = normalizeURL(data);
          if (index == 3)
            this.urlimage3 = normalizeURL(data);
        }
      }
    ).catch(
      (error) => {
        this.toast.create({
          message: error.message,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    )
  }
  //--------------------------------------Fin images--------------------------//

  //----------------------------------Documents-------------------------//
  onTakeDocument(index: number) {
    this.camera.getPicture({
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }).then(
      (data) => {
        if (data) {
          if (index == 0)
            this.urlDocument0 = normalizeURL(data);
          if (index == 1)
            this.urlDocument1 = normalizeURL(data);
          if (index == 2)
            this.urlDocument2 = normalizeURL(data);
          if (index == 3)
            this.urlDocument3 = normalizeURL(data);
        }
      }
    ).catch(
      (error) => {
        this.toast.create({
          message: error.message,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    )
  }
  //--------------------------------------Fin documents--------------------------//





  onSubmitForm() {
    const diagnostic = this.authForm.get('diagnostic').value;
    const produit = this.authForm.get('produit').value;
    const main = this.authForm.get('main').value;
    const ramassage = this.authForm.get('ramassage').value;
    let pieces = "";
    let from = this.authForm.get('pieces') as FormArray;
    for (let control of from.controls) {
      //console.log(control.value.piece);
      pieces = pieces + control.value.piece + "||" + control.value.prix + "&&&";
    }
    let datasend = new FormData();
    datasend.append("data[Intervention][reclamation_id]", this.reclamation_id);
    datasend.append("data[Intervention][produit]", produit);
    datasend.append("data[Intervention][ref_pieces]", pieces);
    datasend.append("data[Intervention][diagnostic]", diagnostic);
    datasend.append("data[Intervention][main_doeuvre]", main);
    datasend.append("data[Intervention][prix_ramassage]", ramassage);
    datasend.append("data[Intervention][type]", this.type);
    datasend.append("data[Intervention][latitude]", this.latitude + "");
    datasend.append("data[Intervention][longitude]", this.longitude + "");
    datasend.append("data[Intervention][date_fin]", this.datenow());
    datasend.append("data[Intervention][iemi]", this.global.emei);
    let go = 1;
    console.log(go);
    if (this.urlimage0 != null) {

      this.base64.encodeFile(this.urlimage0).then((base64File: string) => {
        datasend.append("data[Intervention][image0]", base64File);
        go = this.send(datasend, go);
      }, (err) => {
        console.log(err);
      });
    }
    else
    {
      go++;
    }
    if (this.urlimage1 != null) {
      this.base64.encodeFile(this.urlimage1).then((base64File: string) => {
        datasend.append("data[Intervention][image1]", base64File);
        go = this.send(datasend, go);
      }, (err) => {
        console.log(err);
      });
    }
    else
      go++;
    if (this.urlimage2 != null) {
      this.base64.encodeFile(this.urlimage2).then((base64File: string) => {
        datasend.append("data[Intervention][image2]", base64File);
        go = this.send(datasend, go);
      }, (err) => {
        console.log(err);
      });
    }
    else
      go++;
    if (this.urlimage3 != null) {
      this.base64.encodeFile(this.urlimage3).then((base64File: string) => {
        datasend.append("data[Intervention][image3]", base64File);
        go = this.send(datasend, go);
      }, (err) => {
        console.log(err);
      });
    }
    else
      go++;

    //-------------------------------Document-----------------//
    if (this.urlDocument0 != null) {
      this.base64.encodeFile(this.urlDocument0).then((base64File: string) => {
        datasend.append("data[Intervention][document0]", base64File);
        go = this.send(datasend, go);
      }, (err) => {
        console.log(err);
      });
    }
    else
      go++;
    if (this.urlDocument1 != null) {
      this.base64.encodeFile(this.urlDocument1).then((base64File: string) => {
        datasend.append("data[Intervention][document1]", base64File);
        go = this.send(datasend, go);
      }, (err) => {
        console.log(err);
      });
    }
    else
      go++;
    if (this.urlDocument2 != null) {
      this.base64.encodeFile(this.urlDocument2).then((base64File: string) => {
        datasend.append("data[Intervention][document2]", base64File);
        go = this.send(datasend, go);
      }, (err) => {
        console.log(err);
      });
    }
    else
      go++;
    if (this.urlDocument3 != null) {
      this.base64.encodeFile(this.urlDocument3).then((base64File: string) => {
        datasend.append("data[Intervention][document3]", base64File);
        go = this.send(datasend, go);
      }, (err) => {
        console.log(err);
      });
    }
    else
      go++;



  }
  send(datasend: FormData, go: number) {
    console.log(go+" hé ana ldakhel");
    if (go == 8) {
      let url = this.global.linkSetRapport;
      this.data = this.http.post(url, datasend);
      this.data.subscribe(dataa => {
        console.log(dataa["message"]);
        let alert = this.alertCtrl.create({
          title: 'Rapport envoyé',
          subTitle: "Merci",
          buttons: ['OK']
        });
        alert.present();
      });
    }
    else
      return go + 1;
  }

  datenow() {
    var date = new Date(); // had to remove the colon (:) after the T in order to make it work
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    var myFormattedDate = year + "-" + (monthIndex + 1) + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return myFormattedDate;

  }



}
