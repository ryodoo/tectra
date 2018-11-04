
export class globaldata {
    host="http://tracema.annonce.pub/apimobile/";//"http://192.168.1.22/tracematecc/apimobile/";
    linkCheckiemiExiste=this.host+"getuser";
    linkLogin=this.host+"login";
    emei="00";
    linkgetdata=this.host+"getreclamations/"+this.emei;
    linkSetRapport=this.host+"setrapport/";
    linkSetDebutRapport=this.host+"setdebutrapport/";
    reclamations = [];
    user="";



  }
