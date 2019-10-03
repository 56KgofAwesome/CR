import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ContactosProvider } from '../../providers/contactos/contactos';
import { Storage } from '@ionic/storage';
import { FormulariosProvider } from '../../providers/formularios/formularios';
import { DocumentsPage } from '../documents/documents';


/**
 * Generated class for the GeneralFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-general-form',
  templateUrl: 'general-form.html',
})
export class GeneralFormPage {
  mail: any;
  name: any;
  type: any = '';
  formActivateVisit: FormGroup;
  formActivateBuyer:  FormGroup;
  formNewBilling:     FormGroup;
  dateActivateVisit: any = [];
  dateActivateBuyer: any = [];
  dateNewBilling:    any  =   [];
  fullname:any;
  visitid:any;
  agentesDeOficina    : any = [];
  phases    : any = [];
  operations:any = [];
  activities:any = [];
  logData:any = [];
  keyWord:any;
  folio:any = 1;
  namePropertie:any = '';
  count:any = 0;
  involucrados:any = [];
  involucrado:any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public formularioProvider: FormulariosProvider,
    public contactoProvider: ContactosProvider,
    private alertCtrl: AlertController) {
      this.dateNewBilling.user = '';
      this.dateNewBilling.tipo  = '';
      this.dateNewBilling.com = '';
      this.storage.get('usuario').then(data=>{
        this.dateActivateVisit.creatorid = data;
        this.dateActivateVisit.userid = data;
        this.dateActivateBuyer.creatorid = data;
        this.dateActivateBuyer.folio = data;
        this.dateNewBilling.creatorid = data;
        this.dateNewBilling.folio = data;
      });

      this.storage.get('data').then(data=>{
        this.logData = data;
        this.dateActivateBuyer.companyid = data.companyid;
        this.dateActivateBuyer.office = data.officeid;
        //var agentesO = this.formularioProvider.listaDeAgentes(this.logData.officeid);
        /*agentesO.subscribe(data=>{
          this.agentesDeOficina = data.json().data;
        });

        var agentesO = this.formularioProvider.listaDePhases('');
        agentesO.subscribe(data=>{
          this.phases = data.json().data;
        });

        var agentesO = this.formularioProvider.listaDeOperaciones();
        agentesO.subscribe(data=>{
          this.operations = data.json().data;
        });

        var agentesO = this.formularioProvider.listaDeActividades();
        agentesO.subscribe(data=>{
          this.activities = data.json().data;
        });*/
      });

    this.type = this.navParams.get('id');
    this.fullname = this.navParams.get('fullname');
    this.visitid = this.navParams.get('visitid');
    this.formActivateVisit = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      nacionalidad: ['', [Validators.required]]
    });

    this.formActivateBuyer = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      asesor: ['', [Validators.required]],
      concepto: ['', [Validators.required]],
      fase: ['', [Validators.required]],
      concepto1: ['', [Validators.required]],
      moneda: ['', [Validators.required]],
      comision: ['', [Validators.required]],
      propiedad: ['', [Validators.required]],
      keyword: ['', [Validators.required]],
      certeza: ['', [Validators.required]],
      cierre: ['', [Validators.required]],
      operacion: ['', [Validators.required]],
      comentario: ['', [Validators.required]]
    })

    this.formNewBilling = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      propiedad: ['', [Validators.required]],
      cierre: ['', [Validators.required]],
      operacion: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      moneda: ['', [Validators.required]],
      cambio: ['', [Validators.required]],
      comision: ['', [Validators.required]],
      keyword: ['', [Validators.required]]
    })


  }


  turnPage() {
    this.viewCtrl.dismiss({ 'data': this.mail, 'name': this.name })
  }

  close() {

    let alert = this.alertCtrl.create({
      title: 'Atención',
      message: 'Se perderá la información del formulario',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salir',
          handler: () => {

            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();

  }

  activate() {
    if (this.type == 'r') {
      this.dateActivateVisit.visitid = this.navParams.get('visitid');
      if (!this.formActivateVisit.get('mail').hasError('required') && !this.formActivateVisit.get('nacionalidad').hasError('required') && this.dateActivateVisit.busca_c || this.dateActivateVisit.busca_r || this.dateActivateVisit.listar_v || this.dateActivateVisit.listar_r) {
        var loader = this.loadingCtrl.create({
          dismissOnPageChange: false
        });
        loader.present();
        if (this.dateActivateVisit.busca_c && this.dateActivateVisit.busca_r) {
          this.dateActivateVisit.lookfor = 'CR';
        } else if (this.dateActivateVisit.busca_c) {
          this.dateActivateVisit.lookfor = 'C';
        } else if (this.dateActivateVisit.busca_r) {
          this.dateActivateVisit.lookfor = 'R';
        }

        if (this.dateActivateVisit.listar_v && this.dateActivateVisit.listar_r) {
          this.dateActivateVisit.lookfor1 = 'VR';
        } else if (this.dateActivateVisit.listar_v) {
          this.dateActivateVisit.lookfor1 = 'V';
        } else if (this.dateActivateVisit.listar_r) {
          this.dateActivateVisit.lookfor1 = 'R';
        }


        var UrlData = '';
        var datos = this.dateActivateVisit;
        Object.keys(datos).forEach(function (key) {
          UrlData += '&' + key + '=' + datos[key];
        })

        var activarContacto = this.contactoProvider.activarVisita(UrlData);
        activarContacto.subscribe(data =>{

          if(data.status == 200){
            const alerta = this.alertCtrl.create({
              title: '',
              subTitle: 'Se hizo la activacion del contacto',
              buttons: ['ok']
            });
            loader.dismiss();
            alerta.present();
            this.navCtrl.pop();
          }


        })

      } else {
        const alerta = this.alertCtrl.create({
          title: '',
          subTitle: 'Todos los campos son obligatorios',
          buttons: ['ok']
        });
        alerta.present();
      }
    }else if(this.type == 'c'){
      this.dateActivateBuyer.visitid = this.navParams.get('visitid');

      var UrlData = '';
      var datos = this.dateActivateBuyer;
      Object.keys(datos).forEach(function (key) {
        UrlData += '&' + key + '=' + datos[key];
      })

      var potencial = this.contactoProvider.convertirPotencial(UrlData);
      potencial.subscribe(data =>{

        if(data.status == 200){
          const alerta = this.alertCtrl.create({
            title: '',
            subTitle: 'Se hizo la activacion del contacto',
            buttons: ['ok']
          });
          loader.dismiss();
          alerta.present();
          this.navCtrl.pop();
        }


      })


    }


  }

  searchPropertie(){

    this.navCtrl.push(DocumentsPage,{'type': 'prospect', 'keyword': this.keyWord}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        this.folio = data.folio;
        this.namePropertie = data.name;
        this.dateActivateBuyer.propiedad = data.folio;
        this.dateNewBilling.propiedad = data.folio;
        var element = document.getElementById('search');
        element.style.display = 'none';
      })
    })

  }

  openSearch(){

    var element = document.getElementById('search');
    element.style.display = 'block';

  }

  changeSlide(button){
    if(button == 1){
      if(this.count == 1){
        var seccion = document.getElementById('seccion1');
        var seccion1 = document.getElementById('seccion2');
        seccion.classList.add('block');
        seccion1.classList.add('none');
        seccion.classList.remove('none');
        seccion1.classList.remove('block');
        this.count = this.count - 1;
      }
    }else{
      if(this.count == 0){
        var seccion = document.getElementById('seccion1');
        var seccion1 = document.getElementById('seccion2');
        seccion.classList.add('none');
        seccion1.classList.add('block');
        seccion.classList.remove('block');
        seccion1.classList.remove('none');
        this.count = this.count + 1;
      }
    }

  }

  addAgent(){
    this.dateNewBilling.visitid = this.navParams.get('visitid');
    this.involucrados.push({'name': this.involucrado.name, 'activity': this.involucrado.activity, 'comision': this.involucrado.comision});
    this.dateNewBilling.user += this.involucrado.name + ',';
    this.dateNewBilling.tipo += this.involucrado.activity + ',';
    this.dateNewBilling.com += this.involucrado.comision + ',';
  }

  controlFact(){
    var loader = this.loadingCtrl.create({
      dismissOnPageChange: false
    });
    loader.present();
    var UrlData = '';
    var datos = this.dateNewBilling;
    Object.keys(datos).forEach(function (key) {
      UrlData += '&' + key + '=' + datos[key];
    })

    var control = this.contactoProvider.controlFacturacion(UrlData);
    control.subscribe(data =>{

      if(data.status == 200){
        const alerta = this.alertCtrl.create({
          title: '',
          subTitle: 'Se hizo la activacion del contacto',
          buttons: ['ok']
        });
        loader.dismiss();
        alerta.present();
        this.navCtrl.pop();
      }


    })

  }

}
