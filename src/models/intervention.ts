export class Intervention {
    
  
    constructor(public user: string , public date_debut: string , public date_fin: string , public produit: string ,
         public prix_piece: string , public main_doeuvre: string , public prix_ramassage: string , 
         public documents: string , public diagnostic: string , public ref_pieces: string , public images:string ,
          public latitude : string , public longitude: string , public type: string) {
    }
  }