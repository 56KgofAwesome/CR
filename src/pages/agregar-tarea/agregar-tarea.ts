import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, ViewController } from 'ionic-angular';
import { Calendar , CalendarOptions} from '@ionic-native/calendar';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Storage } from '@ionic/storage';
import { FormGroup } from  '@angular/forms';
import { LeadPickeadPickPage } from './../index.paginas';

@IonicPage()
@Component({
  selector: 'page-agregar-tarea',
  templateUrl: 'agregar-tarea.html',
})
export class AgregarTareaPage {
  public event = { user: 0, folio: 0, subject: "", startDate: "", startTime: "", endDate: "", endTime: "", reDate: "", reTime: "", descripcion: ""  };
  
  contactUser:FormGroup;
  public client  = false;
  public nameClient = '';
  public date : any;
  public time : any;
  public myDate : any;
  public monthName : any ;
  public shortMonthName: any;
  public subjet : any =[];
  public calendars : any ;
  public calendarId = 2 ;
  public phoneCalendar = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController,
    private calendar: Calendar,
    public platform : Platform,
    private usuarioProvider: UsuarioProvider,
    public viewCtrl: ViewController
    ) {

      this.storage.get('usuario').then(data=>{
        this.event.user = data;
      });


      this.myDate = new Date().toISOString();    


      this.date = this.myDate.substring(0,10);
      this.time = this.myDate.substring(11,16);
      this.event.startDate = this.myDate.substring(0, 10);
  
  
      this.monthName = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',  'Noviembre', 'Diciembre' ];
      this.shortMonthName = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'];
      this.subjet = ['0', 'Cita', 'Llamada', 'Guardia' , 'Vista de la Propiedad' ,'Inspección' ,'Domiciliaria' ,'Otros',  'Seguimiento'];
      
      this.platform.ready().then(() => {
        this.calendar.listCalendars().then(data => {
  
          this.calendars = data;
            
          this.calendars.forEach((value, key, index) => { 
            if(value.isPrimary){
            this.calendarId = value.id;
            }
          });
  
  
        });
      })

  }



  save() {

    var body = '';
    var $this = this;
    Object.keys(this.event).forEach(function (key) {
      body += key + '=' + $this.event[key] + '&';
    }); 
    body += 'm=addTask';


    var promise = this.usuarioProvider.addTask(body);

    promise.subscribe(data => {
      if(data.json().status == 200){

        var opt: CalendarOptions = {
          calendarId: this.calendarId,
          firstReminderMinutes: 60,
          id: this.calendarId + ""
        };

        var opts = { calendarId: this.calendarId, firstReminderMinutes: 120, id: this.calendarId + "" };

        if(this.phoneCalendar){
          this.calendar.createEventInteractivelyWithOptions(this.subjet[this.event.subject], this.nameClient, this.event.descripcion, new Date(this.event.startDate), new Date(this.event.endDate), opts).then(
            (msg) => {

              let alert = this.alertCtrl.create({
                title: 'Exito',
                subTitle: 'La tarea se agendo correctamente',
                buttons: ['OK']
              });
              alert.present();
              this.navCtrl.pop();

            },
            (err) => {
              let alert = this.alertCtrl.create({
                title: 'Exito',
                subTitle: 'La tarea se agendo correctamente en el sistema, pero tuvimos problemas al sincronizar con el calendario de tu telefono.',
                buttons: ['OK']
              });
              alert.present();
              this.navCtrl.pop();
            }
          );
        }else{

          let alert = this.alertCtrl.create({
            title: 'Exito',
            subTitle: 'La tarea se agendo correctamente',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.pop();
        }

      }else{

        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Ocurrio un problema, intenta mas tarde.',
          buttons: ['OK']
        });

        alert.present();
        this.navCtrl.pop();
      }

      

    });

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

            this.viewCtrl.dismiss();
          }
        }
      ]
    });

    alert.present();

  }


  goCliente(){        

    this.navCtrl.push(LeadPickeadPickPage, 'lead').then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        if(data){
          this.client = true;
          this.nameClient= data.fullname;
          this.event.folio = data.folio;
        }else{
          this.client = false;
        }
      });
    });

  }


}
