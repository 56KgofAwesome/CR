import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Calendar } from '@ionic-native/calendar';
import { AgregarTareaPage } from '../agregar-tarea/agregar-tarea';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  public eventList: any = [];
  public selectedEvent: any;
  public isSelected = true;


  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  task:any;
  userid:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private usuarioProvider: UsuarioProvider,
    private calendar: Calendar,
    private storage: Storage
    ) {

      this.monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      this.date = new Date();
  }


  ionViewDidEnter(){

    this.storage.get('usuario').then(data=>{
      var promise = this.usuarioProvider.getTask(data);

      promise.subscribe(data=>{
        this.getDaysOfMonth();
        this.eventList = data.json().data;
        this.task = data.json().data;
      });
    });


  }


  loadEventThisMonth() {

    this.eventList = new Array();

    var startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    var endDate   = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);



    this.calendar.listEventsInRange(startDate, endDate).then(
      (msg) => {
        msg.forEach(item => {
  
          this.eventList.push(item);
        });
      },
      (err) => {
      }
    );
  
  }

  selectDate(day) {

    var addd= '';
    var add = '';

    if (day < 10) {
      addd = '0';
    }

    if (this.date.getMonth() < 10 ){
      add= '0';
    }

    this.isSelected = false;
    this.selectedEvent = new Array();
    var thisDate1 = this.date.getFullYear() + "-" + add + (this.date.getMonth() + 1) + "-" + addd+ day + "";
    var thisDate2 = this.date.getFullYear() + "-" + add + (this.date.getMonth() + 1) + "-" + addd+  day + "";
    this.eventList.forEach(event => {
      
      if (((event.startdate >= thisDate1) && (event.startdate <= thisDate2)) || ((event.finishdate >= thisDate1) && (event.finishdate <= thisDate2))) {
        this.isSelected = true;
        this.selectedEvent.push(event);
      }

    });
  }

  checkEvent(day) {

    var hasEvent = false;
    var add= '';
    var addd= '';
    if (this.date.getMonth() < 10 ){
      add= '0';
    }

    if (day < 10) {
      addd = '0';
    }

    var thisDate1 = this.date.getFullYear() + "-" + add + (this.date.getMonth() + 1) + "-" + addd + day + "";
    var thisDate2 = this.date.getFullYear() + "-" + add + (this.date.getMonth() + 1) + "-" + addd + day + "";
  

    this.task.forEach(event => {
      if (((event.startdate >= thisDate1) && (event.startdate <= thisDate2)) || ((event.finishdate >= thisDate1) && (event.finishdate <= thisDate2))) {
        hasEvent = true;
   
      }
    });

    return hasEvent;
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }
  
    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }
  
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i+1);
    }
  
    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var i = 0; i < (6-lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i+1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth();
  }

  addEvent() {
    this.navCtrl.push(AgregarTareaPage);
  }



}
