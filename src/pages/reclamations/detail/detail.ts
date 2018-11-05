import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Geolocation } from '@ionic-native/geolocation';
import { Intervention } from './../../../models/intervention';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { RdvPage } from './../rdv/rdv';
import { Reclamation } from './../../../models/reclamation';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { globaldata } from '../../../services/data.service';
import { rapportPage } from '../rapport/rapport';



@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class detailPage {

  reclamation: Reclamation;
  data: Observable<any>;
  hideMe=true;
  id :any;
  latitude: any;
  longitude: any;
  constructor(public global : globaldata,public navCtrl: NavController, public navParams: NavParams,
     public http: HttpClient , public alertCtrl: AlertController,private geolocation: Geolocation,
     public locationAccuracy: LocationAccuracy) {
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
    //console.log(this.global.reclamations);
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  ngOnInit()
  {
    this.reclamation = this.navParams.get('reclamation');
    console.log(this.reclamation);
    console.log(this.reclamation.interventions);
    let i=0;
    let countDownDate;
    for( let intervention  in this.reclamation.interventions)
    {
      if(this.reclamation.interventions[i].date_fin==null)
      {
        this.hideMe=false;
        countDownDate=new Date(Date.parse(this.reclamation.interventions[i].date_debut)) ;
        this.runTimer(countDownDate);
        break;
      }
      i++;
    }

  }

  runTimer(countDownDate:any)
  {
    console.log(" count "+countDownDate);
    // Update the count down every 1 second
    this.id = setInterval(function () {

      // Get todays date and time
      let now = new Date().getTime();
      console.log(now);

      // Find the distance between now and the count down date
      let distance =  now-countDownDate;
      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      document.getElementById("demo").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";


    }, 1000);
  }

  rapport(id)
  {
    this.ngOnDestroy();
    this.navCtrl.push(rapportPage, {reclamation_id: id});
  }
  rdv(id,client)
  {
    this.ngOnDestroy();
    this.navCtrl.push(RdvPage, {reclamation_id: id,client: client});
  }

  commancer(id)
  {
    this.hideMe=false;
    let url = this.global.linkSetDebutRapport + id+"/"+this.global.emei+"/"+this.latitude+"/"+this.longitude;
    console.log(url);
    this.data = this.http.get(url);
    this.data.subscribe(data => {
      this.runTimer(new Date().getTime());
      let i=0;
      let d = new Date();
      var y = d.getFullYear();
      var m=d.getMonth()+1;
      var j=d.getDate();
      var h=d.getHours();
      var ii=d.getMinutes();
      var s=d.getSeconds();
      var date=y+"-"+m+"-"+j+" "+h+":"+ii+":"+s;
      let inter = new Intervention("", date, null,null,null,null, null, null,null, null,null, null,null, null);
      for (let r in this.global.reclamations)
      {
        if(this.global.reclamations[i].id==this.reclamation.id)
        {
          this.global.reclamations[i].interventions.push(inter);
          break;
        }
      }
      let alert = this.alertCtrl.create({
        title: 'commencement des diagnostic activé ',
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
    });
  }








}
