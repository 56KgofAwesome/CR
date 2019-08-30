import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LoadingController      } from '../../../node_modules/ionic-angular/components/loading/loading-controller';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LeadPickeadPickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lead-pickead-pick',
  templateUrl: 'lead-pickead-pick.html',
})
export class LeadPickeadPickPage {
  public userInfo     : any = [];
  private empty     = false;
  private message   : any= [];                      /** Mensaje de error o notificacion */
  public refresher : any;
  public original     : any ;
  public items        : any ;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private usuarioProvider: UsuarioProvider,
    private storage: Storage,
    public viewCtrl: ViewController
    ) {

      this.storage.get('data').then(data =>{
        this.userInfo.usertype    = data.usertype;
        this.userInfo.userid      = data.userid;
        this.userInfo.companyid   = data.companyid; 
        this.leads(false);
      });      

  }



  leads(refresh) {
    var promise = this.usuarioProvider.getLeads('&type=lead&data=' + this.userInfo.usertype + '&userid=' +this.userInfo.userid+ '&company=' +this.userInfo.companyid);
    
    let loading = this.loadingCtrl.create({
      content: `
      <div class="custom-spinner-container" style="background-color: black;">
        <div class="custom-spinner-box" style="background-color: black;">Cargando contactos</div>
      </div>`
    });
    if(!refresh)
    loading.present(); 
    promise.subscribe(data => {

 

      var value : any;
      var offices: any = [];
      if (data.status === 200) {
        if(data.json().status == 200) {
          Object.keys(data.json().data).forEach(function (key) {
            
            value = data.json().data[key];
            if(value.cellphone == 0){
              if(value.phone == 0){
                value.cellphone = 'Telefono no registrado';
                value.btnphone = false;
              }else {
                value.cellphone = value.phone;
              
              }
            }else{
              value.btnphone = true;
            }
            
            if(value.apellido_mat == '0'){
              value.apellido_mat = '';
            }
            if(value.apellido_pat == '0'){
              value.apellido_pat = '';
            }
            value.fullname += ' ' + value.apellido_pat + ' ' + value.apellido_mat;
  
  
            if(value.email == 0){
              if(value.email2 == 0){
                  value.email = 'Email no registrdo.';
                  value.btnemail = false;
              }else {
                  value.email = value.email2; 
                   
              }
            }else{
              value.btnemail = true;
            }
            
            value.first = value.fullname.substr(0,1).toUpperCase();
            if(value.first == ' ')value.first = value.fullname.substr(1,1).toUpperCase();
  
            offices.push(value);
  
  
          });
          loading.dismiss(); 
        }else{
          this.empty = true;
          this.message.error='Aun no tienes contactos compradores.';
          loading.dismiss(); 

        }
        this.items = offices;
        this.original = offices;
        offices = this.items;
        if(refresh)
        this.refresher.complete();
      }
    });
  } 


  view(fullname, visitid){

    this.viewCtrl.dismiss({ data: 5, fullname: fullname, folio : visitid});

  }


  initializeItems() {
    this.items = this.original;
  }

  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.fullname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }  




}
