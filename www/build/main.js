webpackJsonp([26],{

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgregarContactoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_formularios_formularios__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_contactos_contactos__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_usuario_usuario__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AgregarContactoPage = /** @class */ (function () {
    function AgregarContactoPage(navCtrl, navParams, formBuilder, formularioProvider, storage, usuarioProvider, contactoProvider, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.formularioProvider = formularioProvider;
        this.storage = storage;
        this.usuarioProvider = usuarioProvider;
        this.contactoProvider = contactoProvider;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.look = false;
        this.flag = false;
        this.formulario = {};
        this.error = false;
        this.cliente_busca = [];
        this.mediosDeContacto = [];
        this.subMediosDeContactos = [];
        this.listaDeOficinas = [];
        this.agentesDeOficina = [];
        this.listaDeLenguajes = [];
        this.listaDeCiudades = [];
        this.listaDePaises = [];
        this.listaDeEstados = [];
        this.datosFG = {};
        this.datosMC = {};
        this.datosCB = {};
        this.datosAgregar = {};
        this.generalData = [];
        this.aux = [];
        this.storage.get('dataUser').then(function (data) {
            console.log(data);
            //this.generalData.user = data;
            //this.generalData.creatorid = data;
        });
        //Formulario datos generales
        this.generalForm = this.formBuilder.group({
            name: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            lastNameF: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            lastNameM: [''],
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].email, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            cellphone: [''],
            telephone: ['']
        });
        //Formulario Medio de Contacto
        this.contactForm = this.formBuilder.group({
            contactMedia: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            contactDetail: [''],
            comments: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]
        });
        //
        this.fAgente = this.formBuilder.group({
            officinaA: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            asesorA: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]
        });
        //Datos de Opcion: Referencias y Otro
        this.generalData.referid = '';
        this.generalData.emailRef = '';
        this.generalData.telefonoRef = '';
        this.generalData.agenciaRef = '';
        this.generalData.cel = '';
        this.generalData.ap_materno = '';
        this.generalData.subcontacto = '';
        this.generalData.online = 1;
        this.generalData.office = '';
        this.generalData.user = '';
        this.generalData.companyid = this.usuarioProvider.companyid;
    }
    //----------------------------------------------------------------------------
    //Obtiene antes de entrar a la página
    AgregarContactoPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        var offices = this.formularioProvider.listaDeOficinas(this.usuarioProvider.datos.id, this.usuarioProvider.datos.userToken);
        offices.subscribe(function (data) {
            _this.listaDeOficinas = data.json().data.userOffice;
        });
        //
        var cities = this.formularioProvider.listaDeCiudad(this.usuarioProvider.datos.companyid);
        cities.subscribe(function (data) {
            _this.listaDeCiudades = data.json().data;
        });
        //
        var contacts = this.formularioProvider.mediosDeContactos();
        contacts.subscribe(function (data) {
            _this.mediosDeContacto = data.json().data;
        });
        //
        var languages = this.formularioProvider.listaDeLenguajes();
        languages.subscribe(function (data) {
            _this.listaDeLenguajes = data.json().data;
        });
        //
        var countries = this.formularioProvider.listaDePaises();
        countries.subscribe(function (data) {
            _this.listaDePaises = data.json().data;
        });
    };
    //----------------------------------------------------------------------------
    //Valida la sección "Datos Generales"
    AgregarContactoPage.prototype.generalDataForm = function () {
        this.error = true;
        if (this.generalForm.get('email').hasError('required')) {
            this.flag = false;
        }
        else {
            this.flag = true;
        }
        if (!this.generalForm.get('name').hasError('required') && !this.generalForm.get('lastNameF').hasError('required') && this.generalForm.get('email').valid) {
            var contactoH = document.getElementById('contacto');
            var generalesH = document.getElementById('generales');
            contactoH.style.display = "block";
            generalesH.style.display = "none";
            this.error = false;
        }
        else { }
    };
    //----------------------------------------------------------------------------
    //Formulario Medios de contacto
    AgregarContactoPage.prototype.contactDataForm = function () {
        this.error = true;
        if ((this.contactForm.value.contactMedia == 3 || this.contactForm.value.contactMedia == 7)) {
            if (!this.contactForm.get('Nbroker').hasError('required') && !this.contactForm.get('Ebroker').hasError('email') && !this.contactForm.get('comments').hasError('required')) {
                var contactoH = document.getElementById('contacto');
                var clienteB = document.getElementById('busca');
                contactoH.style.display = "none";
                clienteB.style.display = "block";
                this.error = false;
            }
        }
        else if ((this.contactForm.value.contactMedia == 6)) {
            if (!this.contactForm.get('otro').hasError('required')) {
                var contactoH = document.getElementById('contacto');
                var clienteB = document.getElementById('busca');
                contactoH.style.display = "none";
                clienteB.style.display = "block";
                this.error = false;
            }
        }
        else {
            if (!this.contactForm.get('contactMedia').hasError('required') && !this.contactForm.get('contactMedia').hasError('required')) {
                var contactoH = document.getElementById('contacto');
                var clienteB = document.getElementById('busca');
                contactoH.style.display = "none";
                clienteB.style.display = "block";
                this.error = false;
            }
        }
    };
    //----------------------------------------------------------------------------
    //Actualiza el Select de Opciones de medio de contacto
    AgregarContactoPage.prototype.detailUpdate = function () {
        var _this = this;
        var subContactos = this.formularioProvider.subMediosDeContactos(this.contactForm.value.contactMedia);
        subContactos.subscribe(function (data) {
            _this.subMediosDeContactos = data.json().data;
        });
    };
    //----------------------------------------------------------------------------
    //Cambia la lista de detalles dependiendo del Medio de Contacto y Elimina FormControls innecesarios
    AgregarContactoPage.prototype.detailValidation = function () {
        this.media_extra = this.contactForm.value.contactMedia;
        if (this.media_extra == 3 || this.media_extra == 7) {
            this.contactForm.addControl('Nbroker', new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required));
            this.contactForm.addControl('Ebroker', new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].email));
            this.contactForm.addControl('Tbroker', new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](''));
            this.contactForm.addControl('Abroker', new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](''));
        }
        else if (this.media_extra == 6) {
            this.generalData.referid = '';
            this.generalData.emailRef = '';
            this.generalData.telefonoRef = '';
            this.generalData.agenciaRef = '';
            this.contactForm.removeControl('Nbroker');
            this.contactForm.removeControl('Ebroker');
            this.contactForm.removeControl('Tbroker');
            this.contactForm.removeControl('Abroker');
            this.contactForm.addControl('otro', new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required));
        }
        else {
            this.generalData.referid = '';
            this.generalData.emailRef = '';
            this.generalData.telefonoRef = '';
            this.generalData.agenciaRef = '';
            this.contactForm.removeControl('Nbroker');
            this.contactForm.removeControl('Ebroker');
            this.contactForm.removeControl('Tbroker');
            this.contactForm.removeControl('Abroker');
            this.contactForm.removeControl('otro');
        }
    };
    //----------------------------------------------------------------------------
    //Formulario de que busca el usuario
    AgregarContactoPage.prototype.lookingForForm = function () {
        var size = Object.keys(this.aux).length;
        if (size > 0) {
            if (this.aux.busca_c || this.aux.busca_r) {
                var clienteB = document.getElementById('busca');
                var compradores = document.getElementById('enlista');
                clienteB.style.display = "none";
                compradores.style.display = "block";
            }
            else {
                this.look = true;
            }
        }
        else {
            this.look = true;
        }
    };
    //----------------------------------------------------------------------------
    //Regresa a formularios anteriores
    AgregarContactoPage.prototype.goBack = function (index) {
        switch (index) {
            case "general": {
                break;
            }
            case "contact": {
                var contactoH = document.getElementById('contacto');
                var generalesH = document.getElementById('generales');
                contactoH.style.display = "none";
                generalesH.style.display = "block";
                break;
            }
            case "busca": {
                var clienteB = document.getElementById('busca');
                var contacto = document.getElementById('contacto');
                clienteB.style.display = "none";
                contacto.style.display = "block";
                break;
            }
            case "compradores": {
                var compradores = document.getElementById('compradores');
                var busca = document.getElementById('busca');
                compradores.style.display = "none";
                busca.style.display = "block";
                break;
            }
            case "financiera": {
                var financiera = document.getElementById('financiera');
                var compradores = document.getElementById('compradores');
                financiera.style.display = "none";
                compradores.style.display = "block";
                break;
            }
            case "inmueble": {
                var inmueble = document.getElementById('inmueble');
                var financiera = document.getElementById('financiera');
                inmueble.style.display = "none";
                financiera.style.display = "block";
                break;
            }
            case "enlista": {
                var enlista = document.getElementById('enlista');
                var inmueble = document.getElementById('busca');
                enlista.style.display = "none";
                inmueble.style.display = "block";
                break;
            }
        }
    };
    //----------------------------------------------------------------------------
    AgregarContactoPage.prototype.agregarContacto = function () {
        if (this.aux.busca_c && this.generalData.busca_r) {
            this.generalData.lookfor = 'CR';
        }
        else if (this.aux.busca_c) {
            this.generalData.lookfor = 'C';
        }
        else if (this.aux.busca_r) {
            this.generalData.lookfor = 'R';
        }
        if (this.aux.listar_v && this.aux.listar_r) {
            this.generalData.lookfor1 = 'VR';
        }
        else if (this.aux.listar_v) {
            this.generalData.lookfor1 = 'V';
        }
        else if (this.aux.listar_r) {
            this.generalData.lookfor1 = 'R';
        }
        if (this.generalData.office != '' && this.generalData.user != '') {
            var UrlData = '';
            var datos = this.generalData;
            Object.keys(datos).forEach(function (key) {
                UrlData += '&' + key + '=' + datos[key];
            });
            console.log(this.generalData);
            var loader = this.loadingCtrl.create({
                dismissOnPageChange: false
            });
            /*var agregarContacto = this.usuarioProvider.agregarPreregistro(this.generalData);
            agregarContacto.subscribe(data => {
              if(data.status == 200){
                loader.dismiss();
                const alerta = this.alertCtrl.create({
                  title: 'EXITO',
                  subTitle: 'El contacto ha sido agregado con éxito',
                  buttons: ['ok']
                });
                alerta.present();
                this.navCtrl.pop();
              }
            })
            */
        }
        else {
            var alerta = this.alertCtrl.create({
                title: '',
                subTitle: 'El campo Oficina y Asesor son obligatorios',
                buttons: ['ok']
            });
            alerta.present();
        }
    };
    AgregarContactoPage.prototype.actualizarAsesor = function () {
        var _this = this;
        var agentesO = this.formularioProvider.listaDeAgentes(this.fAgente.value.officinaA);
        agentesO.subscribe(function (data) {
            _this.agentesDeOficina = data.json().data;
        });
    };
    AgregarContactoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-agregar-contacto',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\agregar-contacto\agregar-contacto.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="header">\n\n    <ion-title>Agregar Visita</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <h1 class="cabecera"> Datos Generales </h1>\n\n  <div id="generales" padding class="generales">\n\n    <form (ngSubmit)="generalDataForm()" [formGroup]="generalForm">\n\n        <ion-item class="formulario">\n\n          <ion-label class="textoLabel" floating> Nombre <sup>*</sup></ion-label>\n\n          <ion-input [(ngModel)]="generalData.name" type="text" formControlName="name" name="name"></ion-input>\n\n        </ion-item>\n\n        <ion-item class="ErrorMensaje" *ngIf="generalForm.get(\'name\').errors && error">\n\n          <p color="danger" ion-text *ngIf="generalForm.get(\'name\').hasError(\'required\')">Este campo es necesario</p>\n\n        </ion-item>\n\n        <ion-item class="formulario">\n\n          <ion-label class="textoLabel" floating> Apellido Paterno <sup>*</sup></ion-label>\n\n          <ion-input [(ngModel)]="generalData.lastNameF" type="text" formControlName="lastNameF" name="lastNameF"></ion-input>\n\n        </ion-item>\n\n        <ion-item class="ErrorMensaje" *ngIf="generalForm.get(\'lastNameF\').errors && error">\n\n          <p color="danger" ion-text *ngIf="generalForm.get(\'lastNameF\').hasError(\'required\')"> Este campo es necesario </p>\n\n        </ion-item>\n\n        <ion-item class="formulario">\n\n          <ion-label class="textoLabel" floating> Apellido Materno </ion-label>\n\n          <ion-input [(ngModel)]="generalData.lastNameM" type="text" formControlName="lastNameM" name="lastNameM"></ion-input>\n\n        </ion-item>\n\n        <ion-item class="formulario">\n\n          <ion-label class="textoLabel" floating> Correo electrónico <sup>*</sup></ion-label>\n\n          <ion-input [(ngModel)]="generalData.email" type="email" formControlName="email" name="email"></ion-input>\n\n        </ion-item>\n\n          <ion-item class="ErrorMensaje" *ngIf="generalForm.get(\'email\').errors && error">\n\n            <p color="danger" ion-text *ngIf="generalForm.get(\'email\').hasError(\'required\')"> Este campo es necesario </p>\n\n            <p color="danger" ion-text *ngIf="!generalForm.get(\'email\').valid && flag"> Este no es un correo válido </p>\n\n          </ion-item>\n\n        <ion-item class="formulario">\n\n          <ion-label class="textoLabel" floating> Celular </ion-label>\n\n          <ion-input [(ngModel)]="generalData.cellphone" type="text" formControlName="cellphone" name="cellphone"></ion-input>\n\n        </ion-item>\n\n        <ion-item class="formulario">\n\n          <ion-label class="textoLabel" floating> Teléfono Casa / Oficina </ion-label>\n\n          <ion-input [(ngModel)]="generalData.telephone" type="text" formControlName="telephone" name="telephone"></ion-input>\n\n        </ion-item>\n\n      <div class="botones">\n\n        <button style="margin: 0px 5px" style="background-color: #44774d; margin: 5px 2px;" ion-button type="submit" block> Siguiente </button>\n\n      </div>\n\n  </form>\n\n</div>\n\n\n\n<!--____________________________________________________________-->\n\n\n\n<h1 class="cabecera"> Medio de Contacto </h1>\n\n<div padding id="contacto" class="contacto">\n\n  <form (ngSubmit)="contactDataForm()" [formGroup]="contactForm">\n\n\n\n      <ion-item class="formulario">\n\n        <ion-label class="textoLabel"> Medio de contacto <sup>*</sup></ion-label>\n\n        <ion-select [(ngModel)]="generalData.contacto" name="propiedad" (ionChange)="detailValidation()" formControlName="contactMedia" (ionChange)="detailUpdate()">\n\n          <ion-option *ngFor="let medio of mediosDeContacto" value="{{medio.contactmediaid}}" ([ngModel])="medioValor">{{medio.contactmedia}}</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n        <ion-item class="ErrorMensaje" *ngIf="contactForm.get(\'contactMedia\').errors && error">\n\n          <p color="danger" ion-text *ngIf="contactForm.get(\'contactMedia\').hasError(\'required\')">Este campo es necesario</p>\n\n        </ion-item>\n\n      <ion-item *ngIf="subMediosDeContactos != null" class="formulario">\n\n        <ion-label class="textoLabel"> Detalle </ion-label>\n\n        <ion-select [(ngModel)]="generalData.subcontacto" name="propiedad" formControlName="contactDetail">\n\n          <ion-option *ngFor="let subMedio of subMediosDeContactos" value="{{subMedio.subcontactmediaid}}">{{subMedio.subcontactmedia}}</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n\n\n      <div *ngIf="media_extra == 3 || media_extra == 7">\n\n        <ion-item class="formulario">\n\n          <ion-label class="textoLabel" floating> Nombre del broker <sup>*</sup></ion-label>\n\n          <ion-input [(ngModel)]="generalData.referid" type="text" formControlName="Nbroker" name="Nbroker"></ion-input>\n\n        </ion-item>\n\n        <ion-item class="ErrorMensaje" *ngIf="contactForm.get(\'Nbroker\').errors && error">\n\n          <p color="danger" ion-text *ngIf="contactForm.get(\'Nbroker\').hasError(\'required\')">Este campo es necesario</p>\n\n        </ion-item>\n\n        <ion-item class="formulario">\n\n          <ion-label class="textoLabel" floating> Correo electrónico broker </ion-label>\n\n          <ion-input [(ngModel)]="generalData.emailRef" type="text" formControlName="Ebroker" name="Ebroker"></ion-input>\n\n        </ion-item>\n\n          <ion-item class="ErrorMensaje" *ngIf="contactForm.get(\'Ebroker\').errors && error">\n\n            <p color="danger" ion-text *ngIf="contactForm.get(\'Ebroker\').hasError(\'required\')">Este campo es necesario</p>\n\n            <p color="danger" ion-text *ngIf="!contactForm.get(\'Ebroker\').valid && flag">Este no es un correo válido</p>\n\n          </ion-item>\n\n        <ion-item class="formulario">\n\n          <ion-label class="textoLabel" floating> Teléfono broker </ion-label>\n\n          <ion-input [(ngModel)]="generalData.telefonoRef" type="text" formControlName="Tbroker" name="Tbroker"></ion-input>\n\n        </ion-item>\n\n        <ion-item class="formulario">\n\n          <ion-label class="textoLabel" floating> Agencia broker </ion-label>\n\n          <ion-input [(ngModel)]="generalData.agenciaRef" type="text" formControlName="Abroker" name="Abroker"></ion-input>\n\n        </ion-item>\n\n      </div>\n\n      <div *ngIf="media_extra == 6">\n\n        <ion-item class="formulario">\n\n          <ion-label class="textoLabel" floating> Otro <sup>*</sup></ion-label>\n\n          <ion-input [(ngModel)]="generalData.otro_camp" type="text" formControlName="otro"  name="otro"></ion-input>\n\n        </ion-item>\n\n          <ion-item class="ErrorMensaje" *ngIf="contactForm.get(\'otro\').errors && error">\n\n            <p color="danger" ion-text *ngIf="contactForm.get(\'otro\').hasError(\'required\')">  Este campo es necesario </p>\n\n          </ion-item>\n\n      </div>\n\n      <ion-item>\n\n        <ion-label style="font-size: 13px" floating> Comentarios <sup>*</sup></ion-label>\n\n        <ion-textarea [(ngModel)]="generalData.comments" formControlName="comments" style="height: 60px;" name="comments" type="text"></ion-textarea>\n\n      </ion-item>\n\n        <ion-item class="ErrorMensaje" *ngIf="contactForm.get(\'comments\').errors && error">\n\n          <p color="danger" ion-text *ngIf="contactForm.get(\'comments\').hasError(\'required\')"> Este campo es necesario </p>\n\n        </ion-item>\n\n    <div class="botones">\n\n      <button style="margin: 0px 5px" style="background-color: #44774d; margin: 5px 2px;" ion-button type="submit" block> Siguiente </button>\n\n    </div>\n\n</form>\n\n<button style="margin: 0px 5px" style="background-color: #44774d; margin: 5px 2px;" ion-button type="submit" block (click)="goBack(\'contact\')"> Regresar </button>\n\n</div>\n\n\n\n<!--____________________________________________________________-->\n\n\n\n<h1 class="cabecera" color="dark"> Busco </h1>\n\n<div id="busca" padding class="busca">\n\n  <form (ngSubmit)="lookingForForm()" novalidate>\n\n    <ion-label>\n\n      Operación <sup>*</sup>\n\n    </ion-label>\n\n    <ion-label color="danger" *ngIf="this.look == true">\n\n      Seleccione por lo menos una Operación\n\n    </ion-label>\n\n    <div>\n\n      <ion-item class="formulario">\n\n        <ion-label class="textoLabel"> Comprar </ion-label>\n\n        <ion-checkbox [(ngModel)]="aux.busca_c" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n\n      </ion-item>\n\n      <ion-item class="formulario">\n\n        <ion-label class="textoLabel"> Rentar </ion-label>\n\n        <ion-checkbox [(ngModel)]="aux.busca_r" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n\n      </ion-item>\n\n      <ion-label>Otro</ion-label>\n\n      <ion-item class="formulario">\n\n        <ion-label class="textoLabel"> Listar Venta </ion-label>\n\n        <ion-checkbox [(ngModel)]="aux.listar_v" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n\n      </ion-item>\n\n      <ion-item class="formulario">\n\n        <ion-label class="textoLabel"> Listar Renta </ion-label>\n\n        <ion-checkbox [(ngModel)]="aux.listar_r" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n\n      </ion-item>\n\n      <ion-item class="formulario">\n\n        <ion-label class="textoLabel"> Exclusiva </ion-label>\n\n        <ion-checkbox [(ngModel)]="aux.exclusiva" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n\n      </ion-item>\n\n    </div>\n\n\n\n      <div class="botones">\n\n        <button style="margin: 0px 5px" style="background-color: #44774d; margin: 5px 2px;" ion-button type="submit" block>Siguiente</button>\n\n      </div>\n\n  </form>\n\n  <button style="margin: 0px 5px" style="background-color: #44774d; margin: 5px 2px;" ion-button type="submit" block (click)="goBack(\'busca\')"> Regresar </button>\n\n</div>\n\n\n\n<!--____________________________________________________________-->\n\n\n\n<h1 class="cabecera"> Agente que enlista </h1>\n\n<div id="enlista" padding class="enlista">\n\n  <form (ngSubmit)="agregarContacto()" [formGroup]="fAgente">\n\n\n\n      <ion-item class="formulario">\n\n        <ion-label class="textoLabel"> Officina <sup>*</sup></ion-label>\n\n        <ion-select [(ngModel)]="generalData.office" (ionChange)="actualizarAsesor()" name="propiedad" formControlName="officinaA">\n\n          <ion-option *ngFor="let oficina of listaDeOficinas" value="{{oficina.officeid}}">{{oficina.officename}}</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n      <ion-item class="formulario">\n\n        <ion-label class="textoLabel"> Asesor <sup>*</sup></ion-label>\n\n        <ion-select [(ngModel)]="generalData.user" name="propiedad" formControlName="asesorA">\n\n          <ion-option *ngFor="let agente of agentesDeOficina" value="{{agente.userid}}">{{agente.fullname}}</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n      <div class="botones">\n\n        <button style="margin: 0px 5px" style="background-color: #44774d; margin: 5px 2px;" ion-button type="submit" block> Agregar </button>\n\n      </div>\n\n  </form>\n\n  <button style="margin: 0px 5px" style="background-color: #44774d; margin: 5px 2px;" ion-button type="submit" block (click)="goBack(\'enlista\')"> Regresar </button>\n\n</div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\agregar-contacto\agregar-contacto.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__providers_formularios_formularios__["a" /* FormulariosProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_formularios_formularios__["a" /* FormulariosProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__providers_usuario_usuario__["a" /* UsuarioProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_usuario_usuario__["a" /* UsuarioProvider */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__providers_contactos_contactos__["a" /* ContactosProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_contactos_contactos__["a" /* ContactosProvider */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _j || Object])
    ], AgregarContactoPage);
    return AgregarContactoPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
}());

//# sourceMappingURL=agregar-contacto.js.map

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgregarTareaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_calendar__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__index_paginas__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AgregarTareaPage = /** @class */ (function () {
    function AgregarTareaPage(navCtrl, navParams, storage, alertCtrl, calendar, platform, usuarioProvider, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.calendar = calendar;
        this.platform = platform;
        this.usuarioProvider = usuarioProvider;
        this.viewCtrl = viewCtrl;
        this.event = { user: 0, folio: 0, subject: "", startDate: "", startTime: "", endDate: "", endTime: "", reDate: "", reTime: "", descripcion: "" };
        this.client = false;
        this.nameClient = '';
        this.subjet = [];
        this.calendarId = 2;
        this.phoneCalendar = false;
        this.storage.get('usuario').then(function (data) {
            _this.event.user = data;
        });
        this.myDate = new Date().toISOString();
        this.date = this.myDate.substring(0, 10);
        this.time = this.myDate.substring(11, 16);
        this.event.startDate = this.myDate.substring(0, 10);
        this.monthName = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        this.shortMonthName = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'];
        this.subjet = ['0', 'Cita', 'Llamada', 'Guardia', 'Vista de la Propiedad', 'Inspección', 'Domiciliaria', 'Otros', 'Seguimiento'];
        this.platform.ready().then(function () {
            _this.calendar.listCalendars().then(function (data) {
                _this.calendars = data;
                _this.calendars.forEach(function (value, key, index) {
                    if (value.isPrimary) {
                        _this.calendarId = value.id;
                    }
                });
            });
        });
    }
    AgregarTareaPage.prototype.save = function () {
        var _this = this;
        var body = '';
        var $this = this;
        Object.keys(this.event).forEach(function (key) {
            body += key + '=' + $this.event[key] + '&';
        });
        body += 'm=addTask';
        var promise = this.usuarioProvider.addTask(body);
        promise.subscribe(function (data) {
            if (data.json().status == 200) {
                var opt = {
                    calendarId: _this.calendarId,
                    firstReminderMinutes: 60,
                    id: _this.calendarId + ""
                };
                var opts = { calendarId: _this.calendarId, firstReminderMinutes: 120, id: _this.calendarId + "" };
                if (_this.phoneCalendar) {
                    _this.calendar.createEventInteractivelyWithOptions(_this.subjet[_this.event.subject], _this.nameClient, _this.event.descripcion, new Date(_this.event.startDate), new Date(_this.event.endDate), opts).then(function (msg) {
                        var alert = _this.alertCtrl.create({
                            title: 'Exito',
                            subTitle: 'La tarea se agendo correctamente',
                            buttons: ['OK']
                        });
                        alert.present();
                        _this.navCtrl.pop();
                    }, function (err) {
                        var alert = _this.alertCtrl.create({
                            title: 'Exito',
                            subTitle: 'La tarea se agendo correctamente en el sistema, pero tuvimos problemas al sincronizar con el calendario de tu telefono.',
                            buttons: ['OK']
                        });
                        alert.present();
                        _this.navCtrl.pop();
                    });
                }
                else {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Exito',
                        subTitle: 'La tarea se agendo correctamente',
                        buttons: ['OK']
                    });
                    alert_1.present();
                    _this.navCtrl.pop();
                }
            }
            else {
                var alert_2 = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Ocurrio un problema, intenta mas tarde.',
                    buttons: ['OK']
                });
                alert_2.present();
                _this.navCtrl.pop();
            }
        });
    };
    AgregarTareaPage.prototype.close = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Atención',
            message: 'Se perderá la información del formulario',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                },
                {
                    text: 'Salir',
                    handler: function () {
                        _this.viewCtrl.dismiss();
                    }
                }
            ]
        });
        alert.present();
    };
    AgregarTareaPage.prototype.goCliente = function () {
        var _this = this;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__index_paginas__["n" /* LeadPickeadPickPage */], 'lead').then(function () {
            _this.navCtrl.getActive().onDidDismiss(function (data) {
                if (data) {
                    _this.client = true;
                    _this.nameClient = data.fullname;
                    _this.event.folio = data.folio;
                }
                else {
                    _this.client = false;
                }
            });
        });
    };
    AgregarTareaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-agregar-tarea',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\agregar-tarea\agregar-tarea.html"*/'<ion-header>\n\n  <ion-navbar color="header">\n\n\n\n    <ion-title>Agendar tarea</ion-title>\n\n\n\n    <ion-buttons right>\n\n      <button *ngIf="!steps" ion-button icon-only (click)="close()">\n\n        <ion-icon color="whiteImmo" name="ios-close-circle"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n\n\n\n\n  <ion-item no-padding>\n\n    <h2>Agendar actividad</h2>\n\n    <p text-wrap>Desde aqui podras agendar una actividad con tus contactos</p>\n\n  </ion-item>\n\n  <br><br>\n\n\n\n\n\n  <ion-list class="slideTest" margin>\n\n    <form class="iform">\n\n      <ion-item>\n\n        <h2 *ngIf="client">{{nameClient}}</h2>\n\n        <h2 *ngIf="!client">Contacto <sup> *</sup></h2>\n\n\n\n        <button color="twitter" *ngIf="!client" ion-button item-end (click)="goCliente()"> Seleccionar</button>\n\n        <button color="twitter" *ngIf="client" ion-button item-end (click)="goCliente()"> Cambiar</button>\n\n\n\n      </ion-item>\n\n\n\n\n\n   \n\n          <ion-item>\n\n          \n\n            <ion-label>Asunto <sup> *</sup></ion-label>\n\n            <ion-select [(ngModel)]="event.subject" name="event.subject">\n\n              <ion-option value="1">Cita</ion-option>\n\n              <ion-option value="2">Llamada</ion-option>\n\n              <ion-option value="3">Guardia</ion-option>\n\n              <ion-option value="4">Vista de la Propiedad</ion-option>\n\n              <ion-option value="5">Inspección Domiciliaria</ion-option>\n\n              <ion-option value="7">Seguimiento</ion-option>\n\n              <ion-option value="6">Otros</ion-option>\n\n            </ion-select>\n\n          \n\n          </ion-item>\n\n\n\n            <ion-item>            \n\n              <ion-label>Sincronizar con el calendario del telefono </ion-label>\n\n              <ion-checkbox  [(ngModel)]="phoneCalendar" name="phoneCalendar"></ion-checkbox>            \n\n            </ion-item>\n\n\n\n\n\n\n\n\n\n\n\n\n\n      <ion-row>\n\n        <ion-col col-12>   \n\n            <p text-left no-margin-bottom no-padding-bottom style="margin-bottom: 0px">Fecha inicio <sup> *</sup></p>         \n\n        </ion-col>\n\n\n\n        <ion-col col-6 no-padding-top>\n\n          <ion-item>\n\n            <ion-label>Dia</ion-label>\n\n            <ion-datetime [min]="date" [monthShortNames]="monthName" [monthNames]="monthName"  max="2030-12-31" displayFormat="DD MMM YYYY" pickerFormat="DD/MMM/YYYY"\n\n              [(ngModel)]="event.startDate" name="event.startDate" value="event.startDate" ></ion-datetime>\n\n          </ion-item>\n\n        </ion-col>\n\n        <ion-col col-6 no-padding>\n\n\n\n\n\n          <ion-item no-padding-left>\n\n            <ion-label>Hora</ion-label>\n\n            <ion-datetime pickerFormat="h:mm a" [(ngModel)]="event.startTime" name="event.startTime"></ion-datetime>\n\n          </ion-item>\n\n\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n\n\n      <ion-row>\n\n        <ion-col col-12>\n\n          <p text-left no-margin-bottom no-padding-bottom style="margin-bottom: 0px">Fecha Fin <sup> *</sup></p>\n\n        </ion-col>\n\n        <ion-col col-6>\n\n          <ion-item>\n\n            <ion-label>Dia </ion-label>\n\n            <ion-datetime [min]="event.startDate" [monthShortNames]="monthName" [monthNames]="monthName"  max="2030-12-31" displayFormat="DD MMM YYYY" pickerFormat="DD/MMM/YYYY"\n\n              [(ngModel)]="event.endDate" name="event.endDate">\n\n            </ion-datetime>\n\n          </ion-item>\n\n        </ion-col>\n\n        <ion-col col-6>\n\n\n\n\n\n          <ion-item >\n\n            <ion-label>Hora</ion-label>\n\n            <ion-datetime pickerFormat="h:mm a" [(ngModel)]="event.endTime" name="event.endTime">\n\n            </ion-datetime>\n\n          </ion-item>\n\n\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n\n\n      <ion-row>\n\n        <ion-col col-12>\n\n          <p text-left no-margin-bottom no-padding-bottom style="margin-bottom: 0px">Recordatorio <sup> *</sup></p>\n\n        </ion-col>\n\n        <ion-col col-6>\n\n          <ion-item>\n\n            <ion-label>Dia</ion-label>\n\n            <ion-datetime [max]="event.startDate" [monthShortNames]="monthName" [monthNames]="monthName"  [min]="date" displayFormat="DD MMM YYYY" pickerFormat="DD/MMM/YYYY"\n\n              [(ngModel)]="event.reDate" name="event.endDate">\n\n            </ion-datetime>\n\n          </ion-item>\n\n        </ion-col>\n\n        <ion-col col-6>\n\n\n\n\n\n          <ion-item >\n\n            <ion-label>Hora</ion-label>\n\n            <ion-datetime pickerFormat="h:mm a" [(ngModel)]="event.reTime" name="event.reTime">\n\n            </ion-datetime>\n\n          </ion-item>\n\n\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n\n\n\n\n\n\n      <ion-item>\n\n        <ion-label >Descripcion <sup> *</sup></ion-label>\n\n        <ion-textarea type="text" [(ngModel)]="event.descripcion" name="event.descripcion"></ion-textarea>\n\n      </ion-item>\n\n\n\n\n\n      <ion-item>\n\n        <button color="green" ion-button (click)="save()" full>Guardar</button>\n\n      </ion-item>\n\n    </form>\n\n\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\agregar-tarea\agregar-tarea.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_calendar__["a" /* Calendar */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ViewController */]])
    ], AgregarTareaPage);
    return AgregarTareaPage;
}());

//# sourceMappingURL=agregar-tarea.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_paginas__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agregar_contacto_agregar_contacto__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_usuario_usuario__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_contactos_contactos__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ContactosPage = /** @class */ (function () {
    function ContactosPage(navCtrl, navParams, callNumber, usuarioProvider, contactosProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.callNumber = callNumber;
        this.usuarioProvider = usuarioProvider;
        this.contactosProvider = contactosProvider;
        this.tipo = 'compradores';
    }
    ContactosPage.prototype.ionViewCanEnter = function () {
        this.showContactsList();
        this.showReferedContactsList();
        this.showPotencialContactsList();
    };
    ContactosPage.prototype.callContact = function (numero) {
        this.callNumber.callNumber(numero, true)
            .then(function (res) { return console.log('llamando', res); })
            .catch(function (err) { return console.log('error de llamada', err); });
    };
    ContactosPage.prototype.verContacto = function (id, tipo) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__index_paginas__["w" /* VerContactoPage */], { 'id': id, 'tipo': tipo });
    };
    ContactosPage.prototype.agregarContacto = function () {
        var modal = document.getElementById("modal");
        modal.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    };
    ContactosPage.prototype.onInput = function ($event) {
        var contactos = document.getElementsByClassName('contactos');
        for (var i = 0; i < contactos.length; i++) {
            var item = contactos[i].getAttribute('name');
            if (item == this.myInput) {
            }
        }
    };
    ContactosPage.prototype.onCancel = function ($event) {
    };
    ContactosPage.prototype.refreshPage = function (refresher) {
        this.showContactsList();
        this.showReferedContactsList();
        this.showPotencialContactsList();
        setTimeout(function () {
            refresher.complete();
        }, 2000);
    };
    ContactosPage.prototype.buscar = function (palabra) {
        var filtro, palabras, item;
        filtro = palabra.target.value.toUpperCase();
        item = document.getElementById("myUL");
        palabras = item.getElementsByTagName("ion-item");
        for (var i = 0; i < palabras.length; i++) {
            if (palabras[i].innerText.toUpperCase().indexOf(filtro) > -1) {
                palabras[i].style.display = "";
            }
            else {
                palabras[i].style.display = "none";
            }
        }
    };
    ContactosPage.prototype.onSearch = function (event) {
    };
    ContactosPage.prototype.agregarTipo = function () {
        if (this.agrC == 1) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__agregar_contacto_agregar_contacto__["a" /* AgregarContactoPage */]);
            var modal = document.getElementById("modal");
            modal.style.display = "none";
            this.agrC = 0;
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__index_paginas__["a" /* AgregarCompradoresPage */]);
            var modal = document.getElementById("modal");
            modal.style.display = "none";
            this.agrC = 0;
        }
    };
    ContactosPage.prototype.cerrarModal = function () {
        var modal = document.getElementById("modal");
        modal.style.display = "none";
    };
    //----------------------------------------------------------------------------
    //Método para obtener la lista de contactos
    ContactosPage.prototype.showContactsList = function () {
        var _this = this;
        var promise = this.contactosProvider.getContactsList(this.usuarioProvider.datos.id, this.usuarioProvider.datos.userToken);
        promise.subscribe(function (data) {
            _this.contactos = data.json().data;
        });
    };
    //----------------------------------------------------------------------------
    //Método para obtener la lista de contactos referidos
    ContactosPage.prototype.showReferedContactsList = function () {
        var _this = this;
        var promise = this.contactosProvider.getReferedContactsList(this.usuarioProvider.datos.id, this.usuarioProvider.datos.userToken);
        promise.subscribe(function (data) {
            _this.referidos = data.json().data;
        });
    };
    //----------------------------------------------------------------------------
    //Método para obtener la lista potenciales compradores
    ContactosPage.prototype.showPotencialContactsList = function () {
        var _this = this;
        var promise = this.contactosProvider.getPotencialContactsList(this.usuarioProvider.datos.id, this.usuarioProvider.datos.userToken);
        promise.subscribe(function (data) {
            _this.potenciales = data.json().data;
        });
    };
    ContactosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contactos',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\contactos\contactos.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="header">\n\n    <div class="header">\n\n      <ion-searchbar class="buscador" (keyup)="buscar($event)">\n\n      </ion-searchbar>\n\n      <ion-icon class="agregar" name="add" (click)="agregarContacto()"></ion-icon>\n\n    </div>\n\n  </ion-navbar>\n\n</ion-header>\n\n  <ion-content class="fondo">\n\n    <ion-refresher (ionRefresh)="refreshPage($event)">\n\n      <ion-refresher-content></ion-refresher-content>\n\n    </ion-refresher>\n\n\n\n\n\n\n\n\n\n<div [(ngSwitch)]="tipo">\n\n  <ion-list *ngSwitchCase="\'compradores\'" id="myUL">\n\n\n\n    <ion-item-sliding  *ngFor="let contacto of contactos" class="contactos">\n\n      <ion-item class="fondo" (click)="verContacto(contacto.folio, \'c\')">\n\n        <ion-avatar item-start>\n\n          <img src="assets/imgs/usuario.png">\n\n        </ion-avatar>\n\n        <h2 style="font-size: 10px;">{{contacto.fullname}}</h2>\n\n        <h2 style="font-size: 10px;" *ngIf="contacto.email != 0">{{contacto.email}}</h2>\n\n        <h2 style="font-size: 10px;" *ngIf="contacto.email == 0">No Disponible</h2>\n\n        <h2 style="font-size: 8px;">folio: {{contacto.folio}} -\n\n          <span *ngIf="contacto.lastcomment > 7" style="background-color: red; border-radius: 5px 5px 5px 5px; padding: 2px 8px; color: white">vencido {{contacto.lastcomment}} días</span>\n\n          <span *ngIf="contacto.lastcomment >= 3 && contacto.lastcomment <= 6" style="background-color: #f84b00; border-radius: 5px 5px 5px 5px; padding: 2px 8px; color: white">por vencer {{contacto.lastcomment}} días</span>\n\n          <span *ngIf="contacto.lastcomment >= 0 && contacto.lastcomment <= 2" style="background-color:  green; border-radius: 5px 5px 5px 5px; padding: 2px 8px; color: white">a tiempo {{contacto.lastcomment}} días</span>\n\n        </h2>\n\n        <ion-avatar item-end>\n\n          <ion-icon style="padding-top: 12px; padding-left: 15px;" name="arrow-back"></ion-icon>\n\n        </ion-avatar>\n\n      </ion-item>\n\n      <ion-item-options class="fondo" side="right">\n\n        <button *ngIf="contacto.cellphone != 0" ion-button color="secondary" (click)="callContact(contacto.cellphone)">\n\n          <ion-icon style="font-size: 35px;" name="ios-call-outline"></ion-icon>\n\n        </button>\n\n        <button ion-button color="botones" (click)="verContacto(contacto.folio, \'c\')">\n\n          <ion-icon style="font-size: 35px;" name="ios-mail-outline"></ion-icon>\n\n        </button>\n\n      </ion-item-options>\n\n    </ion-item-sliding>\n\n\n\n  </ion-list>\n\n\n\n  <ion-list *ngSwitchCase="\'referidos\'" id="myUL">\n\n\n\n    <ion-item-sliding  *ngFor="let referido of referidos" class="contactos fondo">\n\n      <ion-item class="fondo" (click)="verContacto(referido.folio, \'r\')">\n\n        <ion-avatar item-start>\n\n          <img src="assets/imgs/usuario.png">\n\n        </ion-avatar>\n\n        <h2 style="font-size: 10px;">{{referido.fullname}}</h2>\n\n        <h2 style="font-size: 10px;" *ngIf="referido.email != 0">{{referido.email}}</h2>\n\n        <h2 style="font-size: 10px;" *ngIf="referido.email == 0">No Disponible</h2>\n\n        <h2 style="font-size: 8px;">folio: {{referido.folio}} -\n\n          <span *ngIf="referido.lastcomment > 7" style="background-color: red; border-radius: 5px 5px 5px 5px; padding: 2px 8px; color: white">vencido {{referido.lastcomment}} días</span>\n\n          <span *ngIf="referido.lastcomment >= 3 && referido.lastcomment <= 6" style="background-color: #f84b00; border-radius: 5px 5px 5px 5px; padding: 2px 8px; color: white">por vencer {{referido.lastcomment}} días</span>\n\n          <span *ngIf="referido.lastcomment >= 0 && referido.lastcomment <= 2" style="background-color:  green; border-radius: 5px 5px 5px 5px; padding: 2px 8px; color: white">a tiempo {{referido.lastcomment}} días</span>\n\n        </h2>\n\n        <ion-avatar item-end>\n\n          <ion-icon style="padding-top: 12px; padding-left: 15px;" name="arrow-back"></ion-icon>\n\n        </ion-avatar>\n\n      </ion-item>\n\n      <ion-item-options class="fondo" side="right">\n\n        <button *ngIf="referido.cellphone != 0" ion-button color="secondary" (click)="llamar(referido.cellphone)">\n\n          <ion-icon style="font-size: 35px;" name="ios-call-outline"></ion-icon>\n\n        </button>\n\n        <button ion-button color="botones" (click)="verContacto(referido.folio, \'r\')">\n\n          <ion-icon style="font-size: 35px;" name="ios-mail-outline"></ion-icon>\n\n        </button>\n\n      </ion-item-options>\n\n    </ion-item-sliding>\n\n\n\n  </ion-list>\n\n\n\n  <ion-list *ngSwitchCase="\'potenciales\'" id="myUL">\n\n\n\n    <ion-item-sliding  *ngFor="let potencial of potenciales" class="contactos fondo">\n\n      <ion-item class="fondo" (click)="verContacto(potencial.folio, \'p\')">\n\n        <ion-avatar item-start>\n\n          <img src="assets/imgs/usuario.png">\n\n        </ion-avatar>\n\n        <h2 style="font-size: 10px;">{{potencial.fullname}}</h2>\n\n        <h2 style="font-size: 10px;" *ngIf="potencial.email != 0">{{potencial.email}}</h2>\n\n        <h2 style="font-size: 10px;" *ngIf="potencial.email == 0">No Disponible</h2>\n\n        <h2 style="font-size: 8px;">folio: {{potencial.folio}} -\n\n          <span *ngIf="potencial.lastcomment > 7" style="background-color: red; border-radius: 5px 5px 5px 5px; padding: 2px 8px; color: white">vencido {{potencial.lastcomment}} días</span>\n\n          <span *ngIf="potencial.lastcomment >= 3 && potencial.lastcomment <= 6" style="background-color: #f84b00; border-radius: 5px 5px 5px 5px; padding: 2px 8px; color: white">por vencer {{potencial.lastcomment}} días</span>\n\n          <span *ngIf="potencial.lastcomment >= 0 && potencial.lastcomment <= 2" style="background-color:  green; border-radius: 5px 5px 5px 5px; padding: 2px 8px; color: white">a tiempo {{potencial.lastcomment}} días</span>\n\n        </h2>\n\n        <ion-avatar item-end>\n\n          <ion-icon style="padding-top: 12px; padding-left: 15px;" name="arrow-back"></ion-icon>\n\n        </ion-avatar>\n\n      </ion-item>\n\n      <ion-item-options class="fondo" side="right">\n\n        <button *ngIf="potencial.cellphone != 0" ion-button color="secondary" (click)="llamar(potencial.cellphone)">\n\n          <ion-icon style="font-size: 35px;" name="ios-call-outline"></ion-icon>\n\n        </button>\n\n        <button ion-button color="botones" (click)="verContacto(potencial.folio, \'r\')">\n\n          <ion-icon style="font-size: 35px;" name="ios-mail-outline"></ion-icon>\n\n        </button>\n\n      </ion-item-options>\n\n    </ion-item-sliding>\n\n\n\n  </ion-list>\n\n</div>\n\n\n\n</ion-content>\n\n\n\n<div id="modal" class="modal">\n\n  <div class="modal-content">\n\n    <span class="close" (click)="cerrarModal($event)">&times;</span>\n\n    <ion-list radio-group [(ngModel)]="agrC">\n\n      <ion-item>\n\n        <ion-label>Agregar Visita</ion-label>\n\n        <ion-radio (ionSelect)="agregarTipo()" value="1"></ion-radio>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label>Agregar Compradores</ion-label>\n\n        <ion-radio (ionSelect)="agregarTipo()" value="2"></ion-radio>\n\n      </ion-item>\n\n    </ion-list>\n\n  </div>\n\n</div>\n\n\n\n\n\n<ion-footer>\n\n  <ion-segment [(ngModel)]="tipo">\n\n    <ion-segment-button value="referidos">\n\n      Visitas\n\n    </ion-segment-button>\n\n    <ion-segment-button value="compradores">\n\n      Prospectos\n\n    </ion-segment-button>\n\n    <!--<ion-segment-button value="potenciales">\n\n      Potenciales\n\n    </ion-segment-button>-->\n\n  </ion-segment>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\contactos\contactos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_5__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_contactos_contactos__["a" /* ContactosProvider */]])
    ], ContactosPage);
    return ContactosPage;
}());

//# sourceMappingURL=contactos.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SeguimientoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_contactos_contactos__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SeguimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SeguimientoPage = /** @class */ (function () {
    function SeguimientoPage(navCtrl, navParams, storage, contactoProvider, loadingCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.contactoProvider = contactoProvider;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.datosEnvio = [];
        this.datos = this.navParams.get('contacto');
        this.tipo = this.navParams.get('tipo');
        this.datosEnvio.mode = 'visit';
        if (this.tipo == 'c') {
            this.datosEnvio.f = 'A';
        }
        else {
            this.datosEnvio.f = 'B';
        }
        this.datosEnvio.name = this.datos.fullname;
        this.datosEnvio.folio = this.datos.visitid;
        this.datosEnvio.email = this.datos.email;
        this.datosEnvio.officename = this.datos.officename;
        this.datosEnvio.office = this.datos.office;
        this.datosEnvio.type = 'lead';
        this.storage.get('usuario').then(function (data) {
            _this.datosEnvio.userid = data;
        });
        this.storage.get('folio').then(function (data) {
            _this.datosEnvio.company = data;
        });
    }
    SeguimientoPage.prototype.agregarSeguimiento = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            dismissOnPageChange: false
        });
        loader.present();
        var UrlData = '';
        var datos = this.datosEnvio;
        Object.keys(datos).forEach(function (key) {
            UrlData += '&' + key + '=' + datos[key];
        });
        var promise = this.contactoProvider.agregarComentario(UrlData);
        promise.subscribe(function (data) {
            loader.dismiss();
            if (data.status == 200) {
                var alerta = _this.alertCtrl.create({
                    title: 'AGREGADO',
                    subTitle: 'El seguimiento fue agregado exitosamente',
                    buttons: ['ok']
                });
                alerta.present();
                _this.navCtrl.pop();
            }
            else {
                var alerta = _this.alertCtrl.create({
                    title: 'ERROR',
                    subTitle: 'Hubo un error',
                    buttons: ['ok']
                });
                alerta.present();
            }
        });
    };
    SeguimientoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-seguimiento',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\seguimiento\seguimiento.html"*/'<!--\n\n  Generated template for the SeguimientoPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="header">\n\n    <ion-title>seguimiento</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-list>\n\n    \n\n    <ion-item class="title">\n\n      <ion-avatar item-start>\n\n        <h1>J</h1>\n\n      </ion-avatar>\n\n      <h2>{{datos.fullname}}</h2>\n\n      <h3>Folio: {{datos.visitid}}</h3>\n\n    </ion-item>\n\n\n\n\n\n    <ion-item>\n\n      <h2>oficina de resgistro</h2>\n\n      <h3>{{datos.officename}}</h3>\n\n    </ion-item>\n\n\n\n\n\n    <ion-item>\n\n      <h2>correo electronico</h2>\n\n      <h3 *ngIf="datos.email2 != 0">{{datos.email2}}</h3>\n\n      <h3 *ngIf="datos.email2 == 0">No Disponible</h3>\n\n    </ion-item>\n\n\n\n\n\n    <ion-item class="textarea">\n\n      <ion-textarea [(ngModel)]="datosEnvio.comment" placeholder="comentario"></ion-textarea>\n\n    </ion-item>\n\n\n\n    <ion-item class="title">\n\n      <ion-buttons right>\n\n        <button (click)="agregarSeguimiento()" color="success" ion-button icon-only>\n\n          <ion-icon name="ios-add-outline"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n    </ion-item>\n\n\n\n\n\n\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\seguimiento\seguimiento.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_contactos_contactos__["a" /* ContactosProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SeguimientoPage);
    return SeguimientoPage;
}());

//# sourceMappingURL=seguimiento.js.map

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeneralFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_contactos_contactos__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_formularios_formularios__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__documents_documents__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the GeneralFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GeneralFormPage = /** @class */ (function () {
    function GeneralFormPage(navCtrl, navParams, viewCtrl, formBuilder, storage, loadingCtrl, formularioProvider, contactoProvider, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.formularioProvider = formularioProvider;
        this.contactoProvider = contactoProvider;
        this.alertCtrl = alertCtrl;
        this.type = '';
        this.dateActivateVisit = [];
        this.dateActivateBuyer = [];
        this.dateNewBilling = [];
        this.agentesDeOficina = [];
        this.phases = [];
        this.operations = [];
        this.activities = [];
        this.logData = [];
        this.folio = 1;
        this.namePropertie = '';
        this.count = 0;
        this.involucrados = [];
        this.involucrado = [];
        this.dateNewBilling.user = '';
        this.dateNewBilling.tipo = '';
        this.dateNewBilling.com = '';
        this.storage.get('usuario').then(function (data) {
            _this.dateActivateVisit.creatorid = data;
            _this.dateActivateVisit.userid = data;
            _this.dateActivateBuyer.creatorid = data;
            _this.dateActivateBuyer.folio = data;
            _this.dateNewBilling.creatorid = data;
            _this.dateNewBilling.folio = data;
        });
        this.storage.get('data').then(function (data) {
            _this.logData = data;
            _this.dateActivateBuyer.companyid = data.companyid;
            _this.dateActivateBuyer.office = data.officeid;
            var agentesO = _this.formularioProvider.listaDeAgentes(_this.logData.officeid);
            agentesO.subscribe(function (data) {
                _this.agentesDeOficina = data.json().data;
            });
            var agentesO = _this.formularioProvider.listaDePhases('');
            agentesO.subscribe(function (data) {
                _this.phases = data.json().data;
            });
            var agentesO = _this.formularioProvider.listaDeOperaciones();
            agentesO.subscribe(function (data) {
                _this.operations = data.json().data;
            });
            var agentesO = _this.formularioProvider.listaDeActividades();
            agentesO.subscribe(function (data) {
                _this.activities = data.json().data;
            });
        });
        this.type = this.navParams.get('id');
        this.fullname = this.navParams.get('fullname');
        this.visitid = this.navParams.get('visitid');
        this.formActivateVisit = this.formBuilder.group({
            nombre: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            mail: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            nacionalidad: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]]
        });
        this.formActivateBuyer = this.formBuilder.group({
            nombre: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            asesor: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            concepto: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            fase: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            concepto1: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            moneda: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            comision: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            propiedad: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            keyword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            certeza: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            cierre: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            operacion: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            comentario: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]]
        });
        this.formNewBilling = this.formBuilder.group({
            nombre: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            propiedad: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            cierre: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            operacion: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            monto: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            moneda: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            cambio: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            comision: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            keyword: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]]
        });
    }
    GeneralFormPage.prototype.turnPage = function () {
        this.viewCtrl.dismiss({ 'data': this.mail, 'name': this.name });
    };
    GeneralFormPage.prototype.close = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Atención',
            message: 'Se perderá la información del formulario',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                },
                {
                    text: 'Salir',
                    handler: function () {
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    };
    GeneralFormPage.prototype.activate = function () {
        var _this = this;
        if (this.type == 'r') {
            this.dateActivateVisit.visitid = this.navParams.get('visitid');
            if (!this.formActivateVisit.get('mail').hasError('required') && !this.formActivateVisit.get('nacionalidad').hasError('required') && this.dateActivateVisit.busca_c || this.dateActivateVisit.busca_r || this.dateActivateVisit.listar_v || this.dateActivateVisit.listar_r) {
                var loader = this.loadingCtrl.create({
                    dismissOnPageChange: false
                });
                loader.present();
                if (this.dateActivateVisit.busca_c && this.dateActivateVisit.busca_r) {
                    this.dateActivateVisit.lookfor = 'CR';
                }
                else if (this.dateActivateVisit.busca_c) {
                    this.dateActivateVisit.lookfor = 'C';
                }
                else if (this.dateActivateVisit.busca_r) {
                    this.dateActivateVisit.lookfor = 'R';
                }
                if (this.dateActivateVisit.listar_v && this.dateActivateVisit.listar_r) {
                    this.dateActivateVisit.lookfor1 = 'VR';
                }
                else if (this.dateActivateVisit.listar_v) {
                    this.dateActivateVisit.lookfor1 = 'V';
                }
                else if (this.dateActivateVisit.listar_r) {
                    this.dateActivateVisit.lookfor1 = 'R';
                }
                var UrlData = '';
                var datos = this.dateActivateVisit;
                Object.keys(datos).forEach(function (key) {
                    UrlData += '&' + key + '=' + datos[key];
                });
                var activarContacto = this.contactoProvider.activarVisita(UrlData);
                activarContacto.subscribe(function (data) {
                    if (data.status == 200) {
                        var alerta = _this.alertCtrl.create({
                            title: '',
                            subTitle: 'Se hizo la activacion del contacto',
                            buttons: ['ok']
                        });
                        loader.dismiss();
                        alerta.present();
                        _this.navCtrl.pop();
                    }
                });
            }
            else {
                var alerta = this.alertCtrl.create({
                    title: '',
                    subTitle: 'Todos los campos son obligatorios',
                    buttons: ['ok']
                });
                alerta.present();
            }
        }
        else if (this.type == 'c') {
            this.dateActivateBuyer.visitid = this.navParams.get('visitid');
            var UrlData = '';
            var datos = this.dateActivateBuyer;
            Object.keys(datos).forEach(function (key) {
                UrlData += '&' + key + '=' + datos[key];
            });
            var potencial = this.contactoProvider.convertirPotencial(UrlData);
            potencial.subscribe(function (data) {
                if (data.status == 200) {
                    var alerta = _this.alertCtrl.create({
                        title: '',
                        subTitle: 'Se hizo la activacion del contacto',
                        buttons: ['ok']
                    });
                    loader.dismiss();
                    alerta.present();
                    _this.navCtrl.pop();
                }
            });
        }
    };
    GeneralFormPage.prototype.searchPropertie = function () {
        var _this = this;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__documents_documents__["a" /* DocumentsPage */], { 'type': 'prospect', 'keyword': this.keyWord }).then(function () {
            _this.navCtrl.getActive().onDidDismiss(function (data) {
                _this.folio = data.folio;
                _this.namePropertie = data.name;
                _this.dateActivateBuyer.propiedad = data.folio;
                _this.dateNewBilling.propiedad = data.folio;
                var element = document.getElementById('search');
                element.style.display = 'none';
            });
        });
    };
    GeneralFormPage.prototype.openSearch = function () {
        var element = document.getElementById('search');
        element.style.display = 'block';
    };
    GeneralFormPage.prototype.changeSlide = function (button) {
        if (button == 1) {
            if (this.count == 1) {
                var seccion = document.getElementById('seccion1');
                var seccion1 = document.getElementById('seccion2');
                seccion.classList.add('block');
                seccion1.classList.add('none');
                seccion.classList.remove('none');
                seccion1.classList.remove('block');
                this.count = this.count - 1;
            }
        }
        else {
            if (this.count == 0) {
                var seccion = document.getElementById('seccion1');
                var seccion1 = document.getElementById('seccion2');
                seccion.classList.add('none');
                seccion1.classList.add('block');
                seccion.classList.remove('block');
                seccion1.classList.remove('none');
                this.count = this.count + 1;
            }
        }
    };
    GeneralFormPage.prototype.addAgent = function () {
        this.dateNewBilling.visitid = this.navParams.get('visitid');
        this.involucrados.push({ 'name': this.involucrado.name, 'activity': this.involucrado.activity, 'comision': this.involucrado.comision });
        this.dateNewBilling.user += this.involucrado.name + ',';
        this.dateNewBilling.tipo += this.involucrado.activity + ',';
        this.dateNewBilling.com += this.involucrado.comision + ',';
    };
    GeneralFormPage.prototype.controlFact = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            dismissOnPageChange: false
        });
        loader.present();
        var UrlData = '';
        var datos = this.dateNewBilling;
        Object.keys(datos).forEach(function (key) {
            UrlData += '&' + key + '=' + datos[key];
        });
        var control = this.contactoProvider.controlFacturacion(UrlData);
        control.subscribe(function (data) {
            if (data.status == 200) {
                var alerta = _this.alertCtrl.create({
                    title: '',
                    subTitle: 'Se hizo la activacion del contacto',
                    buttons: ['ok']
                });
                loader.dismiss();
                alerta.present();
                _this.navCtrl.pop();
            }
        });
    };
    GeneralFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-general-form',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\general-form\general-form.html"*/'<ion-header *ngIf="type == \'r\'">\n\n  <ion-toolbar color="primary">\n\n    <ion-title>Activar Visita #{{visitid}}</ion-title>\n\n    <ion-buttons right>\n\n      <button ion-button icon-only (click)="close()">\n\n        <ion-icon color="whiteImmo" name="ios-close-circle"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-header *ngIf="type == \'c\'">\n\n  <ion-toolbar color="primary">\n\n    <ion-title>Convertir a Potencial #{{visitid}}</ion-title>\n\n    <ion-buttons right>\n\n      <button ion-button icon-only (click)="close()">\n\n        <ion-icon color="whiteImmo" name="ios-close-circle"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-header *ngIf="type == \'p\'">\n\n  <ion-toolbar color="primary">\n\n    <ion-title>Control de facturación #{{visitid}}</ion-title>\n\n    <ion-buttons right>\n\n      <button ion-button icon-only (click)="close()">\n\n        <ion-icon color="whiteImmo" name="ios-close-circle"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content *ngIf="type == \'pop\'">\n\n  <ion-list>\n\n    <ion-item>\n\n      <h2>Ingresa el correo electronico</h2>\n\n    </ion-item>\n\n\n\n    <ion-item class="textarea">\n\n      <ion-label floating>Nombre y apellidos</ion-label>\n\n      <ion-input [(ngModel)]="name"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item class="textarea">\n\n      <ion-label floating>E-Mail</ion-label>\n\n      <ion-input [(ngModel)]="mail"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item no-lines class="title">\n\n      <ion-buttons right>\n\n        <button (click)="turnPage()" color="success" ion-button icon-only>\n\n          <ion-icon name="redo"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n\n\n<ion-content padding *ngIf="type == \'r\'">\n\n  <form (ngSubmit)="activate()" [formGroup]="formActivateVisit">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-12>\n\n          <ion-item>\n\n            <ion-label color="primary">Nombre</ion-label>\n\n            <ion-input formControlName="nombre" disabled value="{{fullname}}"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="ErrorMensaje fondo" *ngIf="formActivateVisit.get(\'nombre\').errors && error">\n\n            <!-- <ion-icon color="whiteImmo" name="ios-person" item-start></ion-icon> -->\n\n            <p color="danger" ion-text *ngIf="formActivateVisit.get(\'nombre\').hasError(\'required\')">Este campo es necesario</p>\n\n          </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col col-10>\n\n          <ion-item>\n\n            <ion-label color="primary" stacked>E-mail</ion-label>\n\n            <ion-input [(ngModel)]="dateActivateVisit.email" type="email" formControlName="mail"></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col col-10>\n\n          <ion-item>\n\n            <ion-label color="primary" stacked>Nacionalidad</ion-label>\n\n            <ion-input [(ngModel)]="dateActivateVisit.nacionalidad" formControlName="nacionalidad"></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n    <h2>El Cliente Busca</h2>\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-6>\n\n          <ion-item no-lines class="formulario fondo">\n\n            <ion-label class="textoLabel">Comprar</ion-label>\n\n            <ion-checkbox [(ngModel)]="dateActivateVisit.busca_c" [checked]="false" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n\n          </ion-item>\n\n        </ion-col>\n\n        <ion-col col-6>\n\n          <ion-item no-lines class="formulario fondo">\n\n            <ion-label class="textoLabel">Rentar</ion-label>\n\n            <ion-checkbox [(ngModel)]="dateActivateVisit.busca_r" [checked]="false" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n\n          </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col col-6>\n\n          <ion-item text-wrap no-lines class="formulario fondo">\n\n            <ion-label class="textoLabel">Listar Venta</ion-label>\n\n            <ion-checkbox [(ngModel)]="dateActivateVisit.listar_v" [checked]="false" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n\n          </ion-item>\n\n        </ion-col>\n\n        <ion-col col-6>\n\n          <ion-item text-wrap no-lines class="formulario fondo">\n\n            <ion-label class="textoLabel">Listar Renta</ion-label>\n\n            <ion-checkbox [(ngModel)]="dateActivateVisit.listar_r" [checked]="false" [ngModelOptions]="{standalone: true}"></ion-checkbox>\n\n          </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-4>\n\n        </ion-col>\n\n        <ion-col col-4>\n\n          <button ion-button type="submit" color="primary">Activar</button>\n\n        </ion-col>\n\n        <ion-col col-4>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </form>\n\n</ion-content>\n\n\n\n\n\n\n\n<ion-content padding *ngIf="type == \'c\'">\n\n  <form (ngSubmit)="activate()" [formGroup]="formActivateBuyer">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-12>\n\n          <ion-item padding-bottom>\n\n            <ion-label color="primary">Nombre</ion-label>\n\n            <ion-input [(ngModel)]="dateActivateBuyer.nombre" formControlName="nombre" disabled value="{{fullname}}"></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col col-6>\n\n          <ion-item padding-bottom class="formulario fondo">\n\n            <ion-label class="textoLabel" stacked>Asesor <sup>*</sup></ion-label>\n\n            <ion-select [(ngModel)]="dateActivateBuyer.asesor" formControlName="asesor" name="propiedad" >\n\n              <ion-option *ngFor="let agente of agentesDeOficina" value="{{agente.userid}}">{{agente.fullname}}</ion-option>\n\n            </ion-select>\n\n          </ion-item> \n\n        </ion-col>\n\n        <ion-col col-6>\n\n          <ion-item padding-bottom>\n\n            <ion-label color="primary" stacked>concepto</ion-label>\n\n            <ion-input [(ngModel)]="dateActivateBuyer.concepto" formControlName="concepto"></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col col-12>\n\n          <ion-item padding-bottom class="formulario fondo">\n\n            <ion-label class="textoLabel" stacked>Fase<sup>*</sup></ion-label>\n\n            <ion-select [(ngModel)]="dateActivateBuyer.fase" formControlName="fase" name="propiedad" >\n\n              <ion-option *ngFor="let phase of phases" value="{{phase.id}}">{{phase.phase}}</ion-option>\n\n            </ion-select>\n\n          </ion-item> \n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col col-4>\n\n          <ion-item padding-bottom>\n\n            <ion-label color="primary" stacked>Monto</ion-label>\n\n            <ion-input [(ngModel)]="dateActivateBuyer.monto" formControlName="concepto1"></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n        <ion-col col-4>\n\n          <ion-item padding-bottom class="formulario fondo">\n\n            <ion-label class="textoLabel" stacked>Moneda<sup>*</sup></ion-label>\n\n            <ion-select [(ngModel)]="dateActivateBuyer.moneda" formControlName="moneda" name="propiedad" >\n\n              <ion-option value="1">MXN</ion-option>\n\n              <ion-option value="2">USD</ion-option>\n\n              <ion-option value="3">EUR</ion-option>\n\n            </ion-select>\n\n          </ion-item> \n\n        </ion-col>\n\n        <ion-col col-4>\n\n          <ion-item padding-bottom>\n\n            <ion-label color="primary" stacked>% comisión</ion-label>\n\n            <ion-input [(ngModel)]="dateActivateBuyer.comision" formControlName="comision"></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col col-8>\n\n          <ion-item padding-bottom>\n\n            <ion-label color="primary" stacked>Propiedad</ion-label>\n\n            <ion-input formControlName="propiedad" value="{{namePropertie}}" disabled></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n        <ion-col col-4>\n\n          <ion-item padding-bottom no-lines>\n\n            <div ion-button color="primary" (click)="openSearch()">Buscar</div>\n\n          </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row class="none" id="search">\n\n        <ion-col col-8>\n\n          <ion-item padding-bottom>\n\n            <ion-label color="primary" stacked>Palabra Clave</ion-label>\n\n            <ion-input [(ngModel)]="keyWord" formControlName="keyword"></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n        <ion-col col-4>\n\n          <ion-item padding-bottom no-lines>\n\n            <div ion-button color="primary" (click)="searchPropertie()">Buscar</div>\n\n          </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col col-4>\n\n          <ion-item padding-bottom>\n\n            <ion-label color="primary" stacked>Certeza</ion-label>\n\n            <ion-input [(ngModel)]="dateActivateBuyer.certeza" formControlName="certeza"></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n        <ion-col col-4>\n\n            <ion-item padding-bottom>\n\n                <ion-label color="primary" stacked>Cierre</ion-label>\n\n                <ion-datetime [(ngModel)]="dateActivateBuyer.cierre_fecha" formControlName="cierre" displayFormat="MM/DD/YYYY"></ion-datetime>\n\n            </ion-item>\n\n        </ion-col>\n\n        <ion-col col-4>\n\n          <ion-item padding-bottom class="formulario fondo">\n\n            <ion-label class="textoLabel" stacked>Operación<sup>*</sup></ion-label>\n\n            <ion-select [(ngModel)]="dateActivateBuyer.operacionT" formControlName="operacion" name="propiedad" >\n\n              <ion-option *ngFor="let operation of operations" value="{{operation.id}}">{{operation.operationtype}}</ion-option>\n\n            </ion-select>\n\n          </ion-item> \n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col>\n\n            <ion-item padding-bottom>\n\n                <ion-label color="primary" stacked>Comentario</ion-label>\n\n              <ion-textarea [(ngModel)]="dateActivateBuyer.comentarios" formControlName="comentario" placeholder="Ingresa comentarios..."></ion-textarea>\n\n            </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-4>\n\n        </ion-col>\n\n        <ion-col col-4>\n\n          <button ion-button type="submit" color="primary">Convertir</button>\n\n        </ion-col>\n\n        <ion-col col-4>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </form>\n\n</ion-content>\n\n\n\n\n\n<ion-content padding *ngIf="type == \'p\'">\n\n  <form (ngSubmit)="controlFact()" [formGroup]="formNewBilling">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-12>\n\n          <ion-item>\n\n            <ion-label color="primary">Nombre</ion-label>\n\n            <ion-input [(ngModel)]="dateNewBilling.folios" formControlName="nombre" disabled value="{{visitid}}"></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n    <div id="seccion1">\n\n      <h2>Seleccionar propiedad</h2>\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col col-8>\n\n            <ion-item padding-bottom>\n\n              <ion-label color="primary" stacked>Propiedad</ion-label>\n\n              <ion-input disabled value="{{namePropertie}}"formControlName="propiedad"></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n          <ion-col col-4>\n\n            <ion-item padding-bottom no-lines>\n\n              <div ion-button color="primary" (click)="openSearch()">Buscar</div>\n\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row class="none" id="search">\n\n          <ion-col col-8>\n\n            <ion-item padding-bottom>\n\n              <ion-label color="primary" stacked>Palabra Clave</ion-label>\n\n              <ion-input [(ngModel)]="keyWord" formControlName="keyword"></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n          <ion-col col-4>\n\n            <ion-item padding-bottom no-lines>\n\n              <div ion-button color="primary" (click)="searchPropertie()">Buscar</div>\n\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n      <h2>Datos Generales</h2>\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col col-6>\n\n              <ion-item>\n\n                  <ion-label color="primary" stacked>Cierre</ion-label>\n\n                  <ion-datetime [(ngModel)]="dateNewBilling.fecha" formControlName="cierre" displayFormat="MM/DD/YYYY"></ion-datetime>\n\n              </ion-item>\n\n          </ion-col>\n\n          <ion-col col-6>\n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel" stacked>Operación<sup>*</sup></ion-label>\n\n              <ion-select [(ngModel)]="dateNewBilling.operacion" formControlName="operacion" name="propiedad" >\n\n                <ion-option *ngFor="let operation of operations" value="{{operation.id}}">{{operation.operationtype}}</ion-option>\n\n              </ion-select>\n\n            </ion-item> \n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col>\n\n            <ion-col col-6>\n\n              <ion-item>\n\n                <ion-label color="primary" stacked>Monto operación</ion-label>\n\n                <ion-input [(ngModel)]="dateNewBilling.monto" formControlName="monto"></ion-input>\n\n                <ion-input class="none" [(ngModel)]="dateNewBilling.oportunidad" value="0" formControlName="monto"></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-col>\n\n          <ion-col col-6>\n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel" stacked>Moneda<sup>*</sup></ion-label>\n\n              <ion-select [(ngModel)]="dateNewBilling.moneda" formControlName="moneda" name="propiedad" >\n\n                <ion-option value="1">MXN</ion-option>\n\n                <ion-option value="2">USD</ion-option>\n\n                <ion-option value="3">EUR</ion-option>\n\n              </ion-select>\n\n            </ion-item> \n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-6>\n\n            <ion-col col-6>\n\n              <ion-item>\n\n                <ion-label color="primary" stacked>Tipo de cambio</ion-label>\n\n                <ion-input [(ngModel)]="dateNewBilling.cambio" formControlName="cambio"></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-col>\n\n          <ion-col col-4>\n\n            <ion-item>\n\n              <ion-label color="primary" stacked>% comisión</ion-label>\n\n              <ion-input [(ngModel)]="dateNewBilling.comision" formControlName="comision"></ion-input>\n\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </div>\n\n    <div class="none" id="seccion2">\n\n      <h2>Involucrados</h2>\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col col-6>\n\n              <ion-item padding-bottom class="formulario fondo">\n\n                  <ion-label class="textoLabel" stacked>Involucrado <sup>*</sup></ion-label>\n\n                  <ion-select [(ngModel)]="involucrado.name" name="propiedad" [ngModelOptions]="{standalone: true}">\n\n                    <ion-option *ngFor="let agente of agentesDeOficina" value="{{agente.userid}}">{{agente.fullname}}</ion-option>\n\n                  </ion-select>\n\n                </ion-item> \n\n          </ion-col>\n\n          <ion-col col-6>\n\n              <ion-item padding-bottom class="formulario fondo">\n\n                  <ion-label class="textoLabel" stacked>Tipo de actividad <sup>*</sup></ion-label>\n\n                  <ion-select [(ngModel)]="involucrado.activity" name="propiedad" [ngModelOptions]="{standalone: true}">\n\n                    <ion-option *ngFor="let activity of activities" value="{{activity.id}}">{{activity.papelname}}</ion-option>\n\n                  </ion-select>\n\n                </ion-item> \n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-6>\n\n              <ion-item>\n\n                <ion-label color="primary" stacked>% comisión</ion-label>\n\n                <ion-input [(ngModel)]="involucrado.comision" [ngModelOptions]="{standalone: true}"></ion-input>\n\n              </ion-item>\n\n          </ion-col>\n\n          <ion-col col-4>\n\n            <ion-item padding-bottom no-lines>\n\n              <div ion-button color="primary" (click)="addAgent()">agregar</div>\n\n            </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-5>\n\n            <p>agente</p>\n\n          </ion-col>\n\n          <ion-col col-4>\n\n            <p>actividad</p>\n\n          </ion-col>\n\n          <ion-col col-3>\n\n            <p>comisión</p>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row *ngFor="let inv of involucrados">\n\n            <ion-col col-5>\n\n              <p>{{inv.name}}</p>\n\n            </ion-col>\n\n            <ion-col col-4>\n\n              <p>{{inv.activity}}</p>\n\n            </ion-col>\n\n            <ion-col col-3>\n\n              <p>{{inv.comision}}</p>\n\n            </ion-col>\n\n          </ion-row>\n\n        <ion-row>\n\n          <ion-col>\n\n              <ion-item>\n\n                <ion-label color="primary" stacked>Total de comisión %, claculado en base a involucrados</ion-label>\n\n                <ion-input disabled></ion-input>\n\n              </ion-item>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col col-4>\n\n          </ion-col>\n\n          <ion-col col-4>\n\n            <button ion-button type="submit" color="primary">Crear Control</button>\n\n          </ion-col>\n\n          <ion-col col-4>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n\n\n    </div>\n\n  </form>\n\n</ion-content>\n\n<ion-footer *ngIf="type == \'p\'">\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col class="center" col-2 (click)="changeSlide(1)">\n\n          <ion-icon name="arrow-dropleft-circle"></ion-icon>\n\n      </ion-col>\n\n      <ion-col col-8>\n\n      </ion-col>\n\n      <ion-col class="center" col-2 (click)="changeSlide(0)">\n\n          <ion-icon name="arrow-dropright-circle"></ion-icon>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\general-form\general-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_formularios_formularios__["a" /* FormulariosProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_contactos_contactos__["a" /* ContactosProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], GeneralFormPage);
    return GeneralFormPage;
}());

//# sourceMappingURL=general-form.js.map

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsUsuarioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the TabsUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TabsUsuarioPage = /** @class */ (function () {
    function TabsUsuarioPage(navCtrl, navParams, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.log = false;
        events.subscribe('user:logOut', function (user, time) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
        });
        console.log("estoy en tabs");
        this.tab5 = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["v" /* UsuarioPage */];
        this.tab6 = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["d" /* BuscarPage */];
        this.tab7 = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["g" /* DestinosPage */];
        this.tab8 = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["e" /* CalendarPage */];
        this.tab9 = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["f" /* ContactosPage */];
    }
    TabsUsuarioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs-usuario',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\tabs-usuario\tabs-usuario.html"*/'<ion-tabs color="tabs">\n\n  <ion-tab tabIcon="ios-person" tabTitle="Datos" [root]="tab5"></ion-tab>\n\n  <ion-tab tabIcon="ios-search" tabTitle="Buscar" [root]="tab6"></ion-tab>\n\n  <!--<ion-tab tabIcon="ios-map" tabTitle="Destinos" [root]="tab7"></ion-tab>-->\n\n  <ion-tab tabIcon="ios-calendar" tabTitle="Tareas" [root]="tab8"></ion-tab>\n\n  <ion-tab tabIcon="ios-contact" tabTitle="Contactos" [root]="tab9"></ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\tabs-usuario\tabs-usuario.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */]])
    ], TabsUsuarioPage);
    return TabsUsuarioPage;
}());

//# sourceMappingURL=tabs-usuario.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tabs2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_paginas__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { MyApp } from '../../app/app.component';

/**
 * Generated class for the Tabs2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Tabs2Page = /** @class */ (function () {
    function Tabs2Page(navCtrl, navParams, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.storage.get('usuario').then(function (data) {
            if (data == null) {
            }
            else {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__index_paginas__["u" /* TabsUsuarioPage */]);
            }
        });
        this.tab1 = __WEBPACK_IMPORTED_MODULE_3__index_paginas__["l" /* HomePage */];
        this.tab2 = __WEBPACK_IMPORTED_MODULE_3__index_paginas__["o" /* LoginPage */];
        this.tab3 = __WEBPACK_IMPORTED_MODULE_3__index_paginas__["d" /* BuscarPage */];
        this.tab4 = __WEBPACK_IMPORTED_MODULE_3__index_paginas__["g" /* DestinosPage */];
        this.tab5 = __WEBPACK_IMPORTED_MODULE_3__index_paginas__["m" /* InfoPage */];
    }
    Tabs2Page.prototype.ionViewDidLoad = function () {
    };
    Tabs2Page.prototype.cambiarRoot = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
        this.navCtrl.popToRoot();
    };
    Tabs2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs2',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\tabs2\tabs2.html"*/'<ion-tabs (click)="cambiarRoot()" color="tabs">\n\n    <ion-tab style="font-size: 10px" tabIcon="ios-person"  class="tab" tabTitle="Login" [root]="tab1"></ion-tab>\n\n    <ion-tab tabIcon="ios-search" tabTitle="Buscar"></ion-tab>\n\n    <!--<ion-tab tabIcon="ios-map" tabTitle="Destinos" ></ion-tab>-->\n\n    <ion-tab tabIcon="ios-list-box" tabTitle="Nosotros" ></ion-tab>\n\n</ion-tabs>\n\n\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\tabs2\tabs2.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], Tabs2Page);
    return Tabs2Page;
}());

//# sourceMappingURL=tabs2.js.map

/***/ }),

/***/ 163:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 163;

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuarioProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_api__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interfaces_datosContacto__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UsuarioProvider = /** @class */ (function () {
    function UsuarioProvider(http, apiProvider, alertCtrl, storage, events, loadingCtrl) {
        this.http = http;
        this.apiProvider = apiProvider;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.url = 'http://www.immosystem.com.mx/appImmov2/immoApp2.php';
        this.companyid = 4;
        this.companyurl = 'http://crrivieramaya.com';
        this.companyUser = 1671;
        this.companyOffice = 227;
        this.datos = {};
    }
    //------------------------------------------------------------------------------------------------------------
    //Login del usuario
    UsuarioProvider.prototype.login = function (username, password) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            dismissOnPageChange: false
        });
        loader.present();
        return new Promise(function (resolve) {
            var body = 'm=login' + '&email=' + username + '&password=' + password;
            _this.apiProvider.post(body)
                .subscribe(function (data) {
                var answerLogin = data.json().status;
                var dataLogin = data.json().data;
                loader.dismiss();
                if (data.status == 200) {
                    if (answerLogin == 501) {
                        resolve(false);
                    }
                    else if ((answerLogin == 200 && dataLogin.companyid == _this.companyid) || dataLogin.companyid == 27) {
                        _this.storage.set('userToken', dataLogin.token);
                        _this.storage.set('dataUser', dataLogin);
                        resolve(true);
                    }
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    //-------------------------------------------------------------------------------------------------------------
    //Obtener los datos del usuario
    UsuarioProvider.prototype.getUserData = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get('dataUser').then(function (data) {
                _this.datos = {
                    'id': data['userid'],
                    'nombre': data['fullname'],
                    'imagen': data['image'],
                    'logo': data['logo'],
                    'compania': data['company'],
                    'companyid': data['companyid'],
                    'mail': data['email'],
                    'telefono': data['cellphone'],
                    'celular': data['phone'],
                    'userToken': data['token']
                };
                console.log(data['token']);
                resolve(_this.datos);
            });
        });
    };
    //-------------------------------------------------------------------------------------------------------------
    //Método para cargar los destinos
    UsuarioProvider.prototype.cargarDestino = function () {
        var body = 'm=developments&folio=' + __WEBPACK_IMPORTED_MODULE_4__interfaces_datosContacto__["a" /* companyid */] + '&states=1';
        return this.apiProvider.post(body);
    };
    //-------------------------------------------------------------------------------------------------------------
    //Método para agregar un preregistro
    UsuarioProvider.prototype.agregarPreregistro = function (datos) {
        var body = 'm=addBuyerPreregister';
        var datos = datos;
        Object.keys(datos).forEach(function (key) {
            body += '&' + key + '=' + datos[key];
        });
        return this.apiProvider.post(body);
    };
    //-------------------------------------------------------------------------------------------------------------
    //Método para enviar un mail
    UsuarioProvider.prototype.enviarPropiedadMail = function (datos) {
        var body = 'm=notifications&property=' + datos.property + '&name=' + datos.name + '&email=' + datos.email + '&phone=' + datos.phone + '&message=' + datos.message + '&agent=true';
        return this.apiProvider.post(body);
    };
    //-------------------------------------------------------------------------------------------------------------
    //Método para enviar un mail de desarrollo
    UsuarioProvider.prototype.enviarDesarrolloMail = function (datos) {
        var body = 'm=notifications&development=' + datos.development + '&name=' + datos.name + '&email=' + datos.email + '&phone=' + datos.phone + '&message=' + datos.message + '&agent=true';
        return this.apiProvider.post(body);
    };
    //-------------------------------------------------------------------------------------------------------------
    //Método para guardar mail en DB
    UsuarioProvider.prototype.guardarMailDB = function (datos) {
        var body = 'm=contact&fullname=' + datos.fullname + '&email=' + datos.email + '&phone=' + datos.phone + '&message=' + datos.message + '&contacttype=' + datos.contacttype + '&propertyid=' + datos.propertyid + '&folio=' + datos.folio + '&soldagentid=' + datos.soldagentid;
        return this.apiProvider.post(body);
    };
    //-------------------------------------------------------------------------------------------------------------
    //Método para obtener tarea
    UsuarioProvider.prototype.getTask = function (id) {
        var body = 'm=task&user=' + id;
        return this.apiProvider.post(body);
    };
    //-------------------------------------------------------------------------------------------------------------
    //Método para añadir tarea
    UsuarioProvider.prototype.addTask = function (data) {
        var body = data;
        return this.apiProvider.post(body);
    };
    //-------------------------------------------------------------------------------------------------------------
    //Método para leads
    UsuarioProvider.prototype.getLeads = function (data) {
        var body = 'function=loadLocations' + data, header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: header });
        //OTRO URL
        return this.http.post('http://www.immosystem.com.mx/appImmo/immoApp.php', body, options);
    };
    UsuarioProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_0__api_api__["a" /* ApiProvider */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["g" /* Events */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["o" /* LoadingController */]])
    ], UsuarioProvider);
    return UsuarioProvider;
}());

//# sourceMappingURL=usuario.js.map

/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/agregar-compradores/agregar-compradores.module": [
		452,
		25
	],
	"../pages/agregar-contacto/agregar-contacto.module": [
		453,
		24
	],
	"../pages/agregar-tarea/agregar-tarea.module": [
		454,
		23
	],
	"../pages/buscar/buscar.module": [
		455,
		22
	],
	"../pages/calendar/calendar.module": [
		456,
		21
	],
	"../pages/contactos/contactos.module": [
		459,
		20
	],
	"../pages/destinos/destinos.module": [
		457,
		19
	],
	"../pages/documents/documents.module": [
		458,
		18
	],
	"../pages/filtro-resultados/filtro-resultados.module": [
		460,
		17
	],
	"../pages/formulario/formulario.module": [
		461,
		16
	],
	"../pages/general-form/general-form.module": [
		462,
		15
	],
	"../pages/info/info.module": [
		463,
		14
	],
	"../pages/lead-pickead-pick/lead-pickead-pick.module": [
		464,
		13
	],
	"../pages/login/login.module": [
		465,
		12
	],
	"../pages/property-pickead-pick/property-pickead-pick.module": [
		466,
		11
	],
	"../pages/registrar/registrar.module": [
		467,
		10
	],
	"../pages/resultados/resultados.module": [
		468,
		9
	],
	"../pages/seguimiento/seguimiento.module": [
		469,
		8
	],
	"../pages/sharing/sharing.module": [
		470,
		7
	],
	"../pages/tabs-usuario/tabs-usuario.module": [
		471,
		6
	],
	"../pages/tabs/tabs.module": [
		472,
		4
	],
	"../pages/tabs2/tabs2.module": [
		473,
		5
	],
	"../pages/usuario/usuario.module": [
		474,
		3
	],
	"../pages/ver-contacto/ver-contacto.module": [
		475,
		2
	],
	"../pages/ver-desarrollo/ver-desarrollo.module": [
		476,
		1
	],
	"../pages/ver-propiedad/ver-propiedad.module": [
		477,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 205;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, events) {
        this.navCtrl = navCtrl;
        this.events = events;
    }
    HomePage.prototype.irAPagina = function (destino) {
        if (destino === 'login') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["o" /* LoginPage */]);
        }
        else if (destino === 'buscar') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["d" /* BuscarPage */]);
        }
        else if (destino === 'destinos') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["g" /* DestinosPage */]);
        }
        else if (destino === 'nosotros') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["m" /* InfoPage */]);
        }
        else if (destino === 'contactos') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["f" /* ContactosPage */]);
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\home\home.html"*/'<ion-content padding>\n\n  \n\n    <img class="center" width="100%" style="margin-top: 70%" src="assets/imgs/logo.png">\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buscar_buscar__ = __webpack_require__(271);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__buscar_buscar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__destinos_destinos__ = __webpack_require__(272);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_1__destinos_destinos__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__formulario_formulario__ = __webpack_require__(273);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_2__formulario_formulario__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(208);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_3__home_home__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__info_info__ = __webpack_require__(274);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_4__info_info__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(275);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_5__login_login__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__resultados_resultados__ = __webpack_require__(276);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_6__resultados_resultados__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__contactos_contactos__ = __webpack_require__(149);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_7__contactos_contactos__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ver_desarrollo_ver_desarrollo__ = __webpack_require__(277);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_8__ver_desarrollo_ver_desarrollo__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ver_propiedad_ver_propiedad__ = __webpack_require__(278);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __WEBPACK_IMPORTED_MODULE_9__ver_propiedad_ver_propiedad__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ver_contacto_ver_contacto__ = __webpack_require__(279);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_10__ver_contacto_ver_contacto__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__tabs_usuario_tabs_usuario__ = __webpack_require__(152);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_11__tabs_usuario_tabs_usuario__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__usuario_usuario__ = __webpack_require__(280);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_12__usuario_usuario__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__registrar_registrar__ = __webpack_require__(281);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_13__registrar_registrar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__agregar_contacto_agregar_contacto__ = __webpack_require__(147);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_14__agregar_contacto_agregar_contacto__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__seguimiento_seguimiento__ = __webpack_require__(150);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_15__seguimiento_seguimiento__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__filtro_resultados_filtro_resultados__ = __webpack_require__(282);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_16__filtro_resultados_filtro_resultados__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__agregar_compradores_agregar_compradores__ = __webpack_require__(270);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_17__agregar_compradores_agregar_compradores__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__sharing_sharing__ = __webpack_require__(283);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_18__sharing_sharing__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__calendar_calendar__ = __webpack_require__(284);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_19__calendar_calendar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__agregar_tarea_agregar_tarea__ = __webpack_require__(148);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_20__agregar_tarea_agregar_tarea__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__lead_pickead_pick_lead_pickead_pick__ = __webpack_require__(285);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_21__lead_pickead_pick_lead_pickead_pick__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__documents_documents__ = __webpack_require__(79);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_22__documents_documents__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__general_form_general_form__ = __webpack_require__(151);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_23__general_form_general_form__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__property_pickead_pick_property_pickead_pick__ = __webpack_require__(286);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_24__property_pickead_pick_property_pickead_pick__["a"]; });

























//# sourceMappingURL=index.paginas.js.map

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ConnectionStatusEnum */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ConnectionStatusEnum;
(function (ConnectionStatusEnum) {
    ConnectionStatusEnum[ConnectionStatusEnum["Online"] = 0] = "Online";
    ConnectionStatusEnum[ConnectionStatusEnum["Offline"] = 1] = "Offline";
})(ConnectionStatusEnum || (ConnectionStatusEnum = {}));
var NetworkProvider = /** @class */ (function () {
    function NetworkProvider(alertCtrl, network, eventCtrl, platform, http) {
        this.alertCtrl = alertCtrl;
        this.network = network;
        this.eventCtrl = eventCtrl;
        this.platform = platform;
        this.http = http;
        this.url = 'http://www.immosystem.com.mx/appImmov2/immoApp2.php';
        this.previousStatus = ConnectionStatusEnum.Online;
    }
    NetworkProvider.prototype.initializeNetworkEvents = function () {
        var _this = this;
        this.network.onDisconnect().subscribe(function () {
            //if (this.previousStatus === ConnectionStatusEnum.Online) {
            _this.eventCtrl.publish('network:offline');
            //}
            //this.previousStatus = ConnectionStatusEnum.Offline;
        });
        this.network.onConnect().subscribe(function () {
            //if (this.previousStatus === ConnectionStatusEnum.Offline) {
            _this.eventCtrl.publish('network:online');
            //}
            //this.previousStatus = ConnectionStatusEnum.Online;
        });
    };
    NetworkProvider.prototype.ping = function () {
        var body = '', header = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ headers: header });
        return this.http.post(this.url, body, options);
    };
    NetworkProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
    ], NetworkProvider);
    return NetworkProvider;
}());

//# sourceMappingURL=network.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgregarCompradoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_formularios_formularios__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_contactos_contactos__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_usuario_usuario__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the AgregarCompradoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AgregarCompradoresPage = /** @class */ (function () {
    function AgregarCompradoresPage(navCtrl, navParams, formBuilder, formularioProvider, storage, contactoProvider, loadingCtrl, alertCtrl, usuarioProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.formularioProvider = formularioProvider;
        this.storage = storage;
        this.contactoProvider = contactoProvider;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.usuarioProvider = usuarioProvider;
        this.flag = false;
        this.formulario = {};
        this.error = false;
        this.cliente_busca = [];
        this.mediosDeContacto = [];
        this.subMediosDeContactos = [];
        this.listaDeOficinas = [];
        this.agentesDeOficina = [];
        this.listaDeLenguajes = [];
        this.listaDeCiudades = [];
        this.listaDePaises = [];
        this.listaDeEstados = [];
        this.datosFG = {};
        this.datosMC = {};
        this.datosCB = {};
        this.datosAgregar = {};
        this.datosGenerales = [];
        this.fGeneral = this.formBuilder.group({
            nombre: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            apellidoP: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]],
            apellidoM: [''],
            email1: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].email]],
            email2: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].email]],
            rfc: [''],
            nac: ['']
        });
        //9984069591
        this.fContacto = this.formBuilder.group({
            medioC: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            detalle: [''],
            comentarios: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]
        });
        this.fAgente = this.formBuilder.group({
            officinaA: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required],
            asesorA: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required]
        });
        this.fDelContacto = this.formBuilder.group({
            fdcDir1: [''],
            fdcDir2: [''],
            fdcPostal: [''],
            fdcPais: [''],
            fdcCiudad: [''],
            fdcNacionalidad: [''],
            fdcIdioma: [''],
            fdcTelC: [''],
            fdcTelO: [''],
            fdcFax: [''],
            fdcCelL: [''],
            fdcNextel: [''],
            fdcNoFam: [''],
            fdcProf: [''],
            fdcCivil: [''],
            fdcEmpresa: [''],
            fdcWeb: [''],
            fdcComentarios: ['']
        });
        this.storage.get('usuario').then(function (data) {
            _this.datosGenerales.user = data;
        });
        this.datosGenerales.ap_materno = '';
        this.datosGenerales.ap_paterno = '';
        this.datosGenerales.busca_c = false;
        this.datosGenerales.busca_r = false;
        this.datosGenerales.listar_v = false;
        this.datosGenerales.listar_r = false;
        this.datosGenerales.exclusiva = false;
        this.datosGenerales.cel_tel = '';
        this.datosGenerales.ciudad = '';
        this.datosGenerales.codigo_p = '';
        this.datosGenerales.comentarios = '';
        this.datosGenerales.contacto = '';
        this.datosGenerales.country = '';
        this.datosGenerales.direccion = '';
        this.datosGenerales.direccion2 = '';
        this.datosGenerales.email = '';
        this.datosGenerales.email2 = '';
        this.datosGenerales.empresa = '';
        this.datosGenerales.fax_tel = '';
        this.datosGenerales.idioma = '';
        this.datosGenerales.ingreso_anual = '';
        this.datosGenerales.nacimiento = '';
        this.datosGenerales.nacionalidad = '';
        this.datosGenerales.nextel_tel = '';
        this.datosGenerales.nombre = '';
        this.datosGenerales.num_familia = '';
        this.datosGenerales.num_visitas = '';
        this.datosGenerales.office = '';
        this.datosGenerales.oficina_tel = '';
        this.datosGenerales.profecion = '';
        this.datosGenerales.rfc = '';
        this.datosGenerales.sitio_web = '';
        this.datosGenerales.subcontacto = '';
        this.datosGenerales.tel = '';
        this.datosGenerales.companyid = this.usuarioProvider.companyid;
        this.datosGenerales.online = 1;
    }
    AgregarCompradoresPage.prototype.ionViewCanEnter = function () {
        /*this.storage.get('usuario').then(data=>{
           this.idUsuario = data;
    
           var oficinas = this.formularioProvider.listaDeOficinas(this.idUsuario);
           oficinas.subscribe(data=>{
             this.listaDeOficinas = data.json().data;
           });
        });*/
        var _this = this;
        this.storage.get('folio').then(function (data) {
            var ciudad = _this.formularioProvider.listaDeCiudad(data);
            ciudad.subscribe(function (data) {
                _this.listaDeCiudades = data.json().data;
            });
        });
        var contactos = this.formularioProvider.mediosDeContactos();
        contactos.subscribe(function (data) {
            _this.mediosDeContacto = data.json().data;
        });
        /*var oficinas = this.formularioProvider.listaDeOficinas(this.idUsuario);
        oficinas.subscribe(data=>{
          this.listaDeOficinas = data.json().data;
        });*/
        var subContactos = this.formularioProvider.subMediosDeContactos(this.medioValor);
        subContactos.subscribe(function (data) {
            _this.subMediosDeContactos = data.json().data;
        });
        var lenguajes = this.formularioProvider.listaDeLenguajes();
        lenguajes.subscribe(function (data) {
            _this.listaDeLenguajes = data.json().data;
        });
        var paises = this.formularioProvider.listaDePaises();
        paises.subscribe(function (data) {
            _this.listaDePaises = data.json().data;
        });
        var ciudades = this.formularioProvider.listaDeCiudad(this.idUsuario);
        ciudades.subscribe(function (data) {
            _this.listaDeCiudades = data.json().data;
        });
    };
    AgregarCompradoresPage.prototype.formularioGeneral = function () {
        this.error = true;
        if (this.fGeneral.get('email1').hasError('required')) {
            this.flag = false;
        }
        else {
            this.flag = true;
        }
        if (!this.fGeneral.get('nombre').hasError('required') && !this.fGeneral.get('apellidoP').hasError('required') && !this.fGeneral.get('email1').hasError('required') && !this.fGeneral.get('email1').hasError('email')) {
            var contactoH = document.getElementById('contacto');
            var generalesH = document.getElementById('generales');
            contactoH.style.display = "block";
            generalesH.style.display = "none";
            this.error = false;
        }
    };
    AgregarCompradoresPage.prototype.formularioContacto = function () {
        this.error = true;
        if (this.fContacto.value.medioC == 3 || this.fContacto.value.medioC == 7) {
            if (!this.fContacto.get('Nbroker').hasError('required')) {
                var contactoH = document.getElementById('contacto');
                var clienteB = document.getElementById('busca');
                contactoH.style.display = "none";
                clienteB.style.display = "block";
                this.error = false;
            }
        }
        else if (this.fContacto.value.medioC == 6) {
            if (!this.fContacto.get('otro').hasError('required')) {
                var contactoH = document.getElementById('contacto');
                var clienteB = document.getElementById('busca');
                contactoH.style.display = "none";
                clienteB.style.display = "block";
                this.error = false;
            }
        }
        else {
            if (!this.fContacto.get('medioC').hasError('required') && !this.fContacto.get('medioC').hasError('required')) {
                var contactoH = document.getElementById('contacto');
                var clienteB = document.getElementById('busca');
                contactoH.style.display = "none";
                clienteB.style.display = "block";
                this.error = false;
            }
        }
    };
    AgregarCompradoresPage.prototype.formularioBusca = function () {
        if (this.datosGenerales.busca_c || this.datosGenerales.busca_r) {
            var clienteB = document.getElementById('busca');
            var compradores = document.getElementById('compradores');
            clienteB.style.display = "none";
            compradores.style.display = "block";
        }
        else {
            var elemento = document.getElementById('operacionMensaje').innerHTML = '<div><p style="color: red;">este campo es obligatorio</p></div>';
        }
    };
    AgregarCompradoresPage.prototype.formularioCompradores = function () {
        if (!this.fDelContacto.get('fdcNacionalidad').hasError('required')) {
            var contactoH = document.getElementById('compradores');
            var financiera = document.getElementById('financiera');
            contactoH.style.display = "none";
            financiera.style.display = "block";
        }
    };
    AgregarCompradoresPage.prototype.formularioFinanciera = function () {
        var financiera = document.getElementById('financiera');
        var inmueble = document.getElementById('inmueble');
        financiera.style.display = "none";
        inmueble.style.display = "block";
    };
    AgregarCompradoresPage.prototype.formularioInmueble = function () {
        var inmueble = document.getElementById('inmueble');
        var enlista = document.getElementById('enlista');
        inmueble.style.display = "none";
        enlista.style.display = "block";
    };
    AgregarCompradoresPage.prototype.validarDetalle = function () {
        this.media_extra = this.fContacto.value.medioC;
        if (this.fContacto.value.medioC == 3 || this.fContacto.value.medioC == 7) {
            this.fContacto.addControl('Nbroker', new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required));
            this.fContacto.addControl('Ebroker', new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](''));
            this.fContacto.addControl('Tbroker', new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](''));
            this.fContacto.addControl('Abroker', new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](''));
        }
        else if (this.fContacto.value.medioC == 6) {
            this.fContacto.addControl('otro', new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required));
        }
    };
    AgregarCompradoresPage.prototype.agregarContacto = function () {
        if (this.datosGenerales.busca_c && this.datosGenerales.busca_r) {
            this.datosGenerales.lookfor = 'CR';
        }
        else if (this.datosGenerales.busca_c) {
            this.datosGenerales.lookfor = 'C';
        }
        else if (this.datosGenerales.busca_r) {
            this.datosGenerales.lookfor = 'R';
        }
        if (this.datosGenerales.listar_v && this.datosGenerales.listar_r) {
            this.datosGenerales.lookfor1 = 'VR';
        }
        else if (this.datosGenerales.listar_v) {
            this.datosGenerales.lookfor1 = 'V';
        }
        else if (this.datosGenerales.listar_r) {
            this.datosGenerales.lookfor1 = 'R';
        }
        if (this.datosGenerales.office != '' && this.datosGenerales.user != '') {
            var UrlData = '';
            var datos = this.datosGenerales;
            Object.keys(datos).forEach(function (key) {
                UrlData += '&' + key + '=' + datos[key];
            });
            var loader = this.loadingCtrl.create({
                dismissOnPageChange: false
            });
            loader.present();
            /*var agregarContacto = this.contactoProvider.agergarContactosComp(UrlData);
            agregarContacto.subscribe(data => {
              if(data.status == 200){
                loader.dismiss();
                const alerta = this.alertCtrl.create({
                  title: 'EXITO',
                  subTitle: 'El contacto ha sido agregado con éxito',
                  buttons: ['ok']
                });
                alerta.present();
                this.navCtrl.pop();
              }
      
            })*/
        }
        else {
            var alerta = this.alertCtrl.create({
                title: '',
                subTitle: 'El campo Oficina y Asesor son obligatorios',
                buttons: ['ok']
            });
            alerta.present();
        }
    };
    AgregarCompradoresPage.prototype.actualizarDetalle = function () {
        var _this = this;
        var subContactos = this.formularioProvider.subMediosDeContactos(this.fContacto.value.medioC);
        subContactos.subscribe(function (data) {
            _this.subMediosDeContactos = data.json().data;
        });
    };
    AgregarCompradoresPage.prototype.actualizarAsesor = function () {
        var _this = this;
        var agentesO = this.formularioProvider.listaDeAgentes(this.fAgente.value.officinaA);
        agentesO.subscribe(function (data) {
            _this.agentesDeOficina = data.json().data;
        });
    };
    AgregarCompradoresPage.prototype.actualizarCiudades = function () {
    };
    AgregarCompradoresPage.prototype.actualizarEstado = function () {
        var _this = this;
        var estado = this.formularioProvider.listaDeEstados(this.datosGenerales.country);
        estado.subscribe(function (data) {
            _this.listaDeEstados = data.json().data;
        });
    };
    AgregarCompradoresPage.prototype.regresar = function (index) {
        switch (index) {
            case "general": {
                break;
            }
            case "contact": {
                var contactoH = document.getElementById('contacto');
                var generalesH = document.getElementById('generales');
                contactoH.style.display = "none";
                generalesH.style.display = "block";
                break;
            }
            case "busca": {
                var clienteB = document.getElementById('busca');
                var contacto = document.getElementById('contacto');
                clienteB.style.display = "none";
                contacto.style.display = "block";
                break;
            }
            case "compradores": {
                var compradores = document.getElementById('compradores');
                var busca = document.getElementById('busca');
                compradores.style.display = "none";
                busca.style.display = "block";
                break;
            }
            case "financiera": {
                var financiera = document.getElementById('financiera');
                var compradores = document.getElementById('compradores');
                financiera.style.display = "none";
                compradores.style.display = "block";
                break;
            }
            case "inmueble": {
                var inmueble = document.getElementById('inmueble');
                var financiera = document.getElementById('financiera');
                inmueble.style.display = "none";
                financiera.style.display = "block";
                break;
            }
            case "enlista": {
                var enlista = document.getElementById('enlista');
                var inmueble = document.getElementById('inmueble');
                enlista.style.display = "none";
                inmueble.style.display = "block";
                break;
            }
        }
    };
    AgregarCompradoresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-agregar-compradores',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\agregar-compradores\agregar-compradores.html"*/'<!--\n\n  Generated template for the AgregarCompradoresPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="header">\n\n    <ion-title>Agregar Comprador</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content class="fondo">\n\n<!-- Acomoda tu html -->\n\n\n\n      <!--<form (ngSubmit)="submit()" [formGroup]="datos">-->\n\n          <h1 class="cabecera" color="dark" >DATOS GENERALES</h1>\n\n      <div id="generales" padding class="generales">\n\n        <form (ngSubmit)="formularioGeneral()" [formGroup]="fGeneral">\n\n\n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel" floating>Nombre <sup>*</sup></ion-label>\n\n              <ion-input [(ngModel)]="datosGenerales.nombre" type="text" formControlName="nombre"></ion-input>\n\n            </ion-item>\n\n            <ion-item class="ErrorMensaje fondo" *ngIf="fGeneral.get(\'nombre\').errors && error">\n\n              <!-- <ion-icon color="whiteImmo" name="ios-person" item-start></ion-icon> -->\n\n              <p color="danger" ion-text *ngIf="fGeneral.get(\'nombre\').hasError(\'required\')">Este campo es necesario</p>\n\n            </ion-item>\n\n            <!--<ion-item class="ErrorMensaje" *ngIf="flagN">\n\n              <p color="danger" ion-text>Este campo es necesario</p>\n\n            </ion-item>-->\n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel" floating>Apellido paterno <sup>*</sup></ion-label>\n\n              <ion-input [(ngModel)]="datosGenerales.ap_paterno" type="text" formControlName="apellidoP" name="celular"></ion-input>\n\n            </ion-item>\n\n            <ion-item class="ErrorMensaje fondo" *ngIf="fGeneral.get(\'apellidoP\').errors && error">\n\n              <!-- <ion-icon color="whiteImmo" name="ios-person" item-start></ion-icon> -->\n\n              <p color="danger" ion-text *ngIf="fGeneral.get(\'apellidoP\').hasError(\'required\')">Este campo es necesario</p>\n\n            </ion-item>\n\n            <!--<ion-item class="ErrorMensaje" *ngIf="flagA">\n\n              <p color="danger" ion-text>Este campo es necesario</p>\n\n            </ion-item>-->\n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel" floating>Apellido Materno</ion-label>\n\n              <ion-input [(ngModel)]="datosGenerales.ap_materno" type="text" formControlName="apellidoM" name="ap_materno"></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel" floating>E-mail principal<sup>*</sup></ion-label>\n\n              <ion-input [(ngModel)]="datosGenerales.email" type="email" formControlName="email1" name="email1"></ion-input>\n\n            </ion-item>\n\n            <ion-item class="ErrorMensaje fondo" *ngIf="fGeneral.get(\'email1\').errors && error">\n\n              <p color="danger" ion-text *ngIf="fGeneral.get(\'email1\').hasError(\'required\')">Este campo es necesario</p>\n\n              <p color="danger" ion-text *ngIf="fGeneral.get(\'email1\').hasError(\'email\') && flag">Este no es un correo valido</p>\n\n            </ion-item>\n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel" floating>E-mail secundario</ion-label>\n\n              <ion-input [(ngModel)]="datosGenerales.email2" type="email" formControlName="email2" name="email2"></ion-input>\n\n            </ion-item>\n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel" floating>RFC</ion-label>\n\n              <ion-input [(ngModel)]="datosGenerales.rfc" type="text" formControlName="rfc" name="rfc"></ion-input>\n\n            </ion-item>\n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel" floating>Fecha de nacimiento</ion-label>\n\n              <ion-input [(ngModel)]="datosGenerales.nacimiento" type="text" formControlName="nac" name="nac"></ion-input>\n\n            </ion-item>\n\n          <div class="botones">\n\n            <button style="margin: 0px 5px" color="botones" style="margin: 5px 2px;" ion-button type="submit" block>Siguiente</button>\n\n          </div>\n\n      </form>\n\n    </div>\n\n\n\n      <h1 class="cabecera" color="dark" >MEDIO DE CONTACTO</h1>\n\n      <div padding id="contacto" class="contacto">\n\n        <form (ngSubmit)="formularioContacto()" [formGroup]="fContacto">\n\n\n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel">Medio de contacto <sup>*</sup></ion-label>\n\n              <ion-select [(ngModel)]="datosGenerales.contacto" name="propiedad" (ionChange)="validarDetalle()" formControlName="medioC" (ionChange)="actualizarDetalle()">\n\n                <ion-option *ngFor="let medio of mediosDeContacto" value="{{medio.contactmediaid}}" ([ngModel])="medioValor">{{medio.contactmedia}}</ion-option>\n\n              </ion-select>\n\n            </ion-item> \n\n            <ion-item class="ErrorMensaje fondo" *ngIf="fContacto.get(\'medioC\').errors && error">\n\n              <!-- <ion-icon color="whiteImmo" name="ios-person" item-start></ion-icon> -->\n\n              <p color="danger" ion-text *ngIf="fContacto.get(\'medioC\').hasError(\'required\')">Este campo es necesario</p>\n\n            </ion-item>\n\n            <ion-item *ngIf="subMediosDeContactos != null" class="formulario fondo">\n\n              <ion-label class="textoLabel">Detalle</ion-label>\n\n              <ion-select [(ngModel)]="datosGenerales.subcontacto" name="propiedad" formControlName="detalle">\n\n                <ion-option *ngFor="let subMedio of subMediosDeContactos" value="{{subMedio.subcontactmediaid}}">{{subMedio.subcontactmedia}}</ion-option>\n\n              </ion-select>\n\n            </ion-item> \n\n\n\n            <div *ngIf="media_extra == 3 || media_extra == 7">\n\n              <ion-item class="formulario fondo">\n\n                <ion-label class="textoLabel" floating>Nombre del broker <sup>*</sup></ion-label>\n\n                <ion-input [(ngModel)]="datosGenerales.referred" type="text" formControlName="Nbroker" name="Nbroker"></ion-input>\n\n              </ion-item>\n\n              <ion-item class="ErrorMensaje fondo" *ngIf="fContacto.get(\'Nbroker\').errors && error">\n\n                <!-- <ion-icon color="whiteImmo" name="ios-person" item-start></ion-icon> -->\n\n                <p color="danger" ion-text *ngIf="fContacto.get(\'Nbroker\').hasError(\'required\')">Este campo es necesario</p>\n\n              </ion-item>\n\n              <ion-item class="formulario fondo">\n\n                <ion-label class="textoLabel" floating>E-mail broker</ion-label>\n\n                <ion-input [(ngModel)]="datosGenerales.referral_email" type="text" formControlName="Ebroker" name="Ebroker"></ion-input>\n\n              </ion-item>\n\n              <ion-item class="formulario fondo">\n\n                <ion-label class="textoLabel" floating>Telefono broker</ion-label>\n\n                <ion-input [(ngModel)]="datosGenerales.referral_phone" type="text" formControlName="Tbroker" name="Tbroker"></ion-input>\n\n              </ion-item>\n\n              <ion-item class="formulario fondo">\n\n                <ion-label class="textoLabel" floating>Agencia broker</ion-label>\n\n                <ion-input [(ngModel)]="datosGenerales.referral_agency" type="text" formControlName="Abroker" name="Abroker"></ion-input>\n\n              </ion-item>\n\n            </div>\n\n            <div *ngIf="media_extra == 6">\n\n              <ion-item class="formulario fondo">\n\n                <ion-label class="textoLabel" floating>Otro <sup>*</sup></ion-label>\n\n                <ion-input [(ngModel)]="datosGenerales.otro_camp" type="text" formControlName="otro"  name="otro"></ion-input>\n\n              </ion-item>\n\n              <ion-item class="ErrorMensaje fondo" *ngIf="fContacto.get(\'otro\').errors && error">\n\n                <!-- <ion-icon color="whiteImmo" name="ios-person" item-start></ion-icon> -->\n\n                <p color="danger" ion-text *ngIf="fContacto.get(\'otro\').hasError(\'required\')">Este campo es necesario</p>\n\n              </ion-item>\n\n            </div>\n\n\n\n            <ion-item class="fondo">\n\n              <ion-label style="font-size: 13px" floating>Comentarios <sup>*</sup></ion-label>\n\n              <ion-textarea [(ngModel)]="datosGenerales.comentarios" formControlName="comentarios" style="height: 60px;" name="comentario" type="text"></ion-textarea>\n\n            </ion-item>\n\n            <ion-item class="ErrorMensaje fondo" *ngIf="fContacto.get(\'comentarios\').errors && error">\n\n              <!-- <ion-icon color="whiteImmo" name="ios-person" item-start></ion-icon> -->\n\n              <p color="danger" ion-text *ngIf="fContacto.get(\'comentarios\').hasError(\'required\')">Este campo es necesario</p>\n\n            </ion-item>\n\n          \n\n          <div class="botones">\n\n            <button style="margin: 0px 5px" color="botones" style="margin: 5px 2px;" ion-button type="submit" block>Siguiente</button>\n\n          </div>\n\n      </form>\n\n      <button style="margin: 0px 5px" color="botones" style="margin: 5px 2px;" ion-button type="submit" block (click)="regresar(\'contact\')" >Regresar</button>\n\n    </div>\n\n\n\n\n\n\n\n      <h1 class="cabecera">CLIENTE BUSCA</h1>\n\n      <div id="busca" padding class="busca">\n\n        <form (ngSubmit)="formularioBusca()" novalidate>\n\n          <ion-label>\n\n            Operacion <sup>*</sup>\n\n          </ion-label>\n\n          <div>\n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel">Comprar</ion-label>\n\n              <ion-checkbox [(ngModel)]="datosGenerales.busca_c" [ngModelOptions]="{standalone: true}" [checked]="false"></ion-checkbox>\n\n            </ion-item>\n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel">Rentar</ion-label>\n\n              <ion-checkbox [(ngModel)]="datosGenerales.busca_r" [ngModelOptions]="{standalone: true}" [checked]="false"></ion-checkbox>\n\n            </ion-item>\n\n            <div id="operacionMensaje">\n\n            </div>\n\n            <ion-label>Otro</ion-label>\n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel">Listar Venta</ion-label>\n\n              <ion-checkbox [(ngModel)]="datosGenerales.listar_v" [ngModelOptions]="{standalone: true}" [checked]="false"></ion-checkbox>\n\n            </ion-item>\n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel">Listar Renta</ion-label>\n\n              <ion-checkbox [(ngModel)]="datosGenerales.listar_r" [ngModelOptions]="{standalone: true}" [checked]="false"></ion-checkbox>\n\n            </ion-item>\n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel">Exclusiva</ion-label>\n\n              <ion-checkbox [(ngModel)]="datosGenerales.exclusiva" [ngModelOptions]="{standalone: true}" [checked]="false"></ion-checkbox>\n\n            </ion-item>\n\n          </div>\n\n          <ion-item class="fondo">\n\n            <ion-label>Tipo</ion-label>\n\n            <ion-select [(ngModel)]="datosGenerales.tipo_busca" [ngModelOptions]="{standalone: true}">\n\n              <ion-option value="C" >Casa</ion-option>\n\n              <ion-option value="D" >Depto</ion-option>\n\n              <ion-option value="T" >Terreno</ion-option>\n\n              <ion-option value="L" >Oficina</ion-option>\n\n              <ion-option value="B" >Bodega</ion-option>\n\n              <ion-option value="P" >Desarrollo</ion-option>\n\n              <ion-option value="O" >Otro</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n          <ion-item class="fondo" *ngIf="datosGenerales.tipo_busca == \'O\'">\n\n            <ion-label>Otro</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.nota_busca" [ngModelOptions]="{standalone: true}" type="text"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="fondo">\n\n            <ion-label>Monto Inversión</ion-label>\n\n            <ion-select [(ngModel)]="datosGenerales.presupuesto" [ngModelOptions]="{standalone: true}">\n\n              <ion-option value="1">100,000 USD - 200,000 USD</ion-option>\n\n              <ion-option value="2">200,000 USD - 300,000 USD</ion-option>\n\n              <ion-option value="3">300,000 USD - 500,000 USD</ion-option>\n\n              <ion-option value="15">350,000 USD - 500,000 USD</ion-option>\n\n              <ion-option value="4">500,000 USD - 800,000 USD</ion-option>\n\n              <ion-option value="16">500,000 USD - 750,000 USD</ion-option>\n\n              <ion-option value="5">800,000 USD - 1 Million USD</ion-option>\n\n              <ion-option value="6">1 Million USD and Plus</ion-option>\n\n              <ion-option value="7">Otro - Other</ion-option>\n\n              <ion-option value="8">Menos de 500,000 MXN</ion-option>\n\n              <ion-option value="9">500,000 MXN - 1,000,000 MXN </ion-option>\n\n              <ion-option value="10">1,000,000 MXN - 1,500,000 MXN </ion-option>\n\n              <ion-option value="11">1,500,000 MXN - 2,000,000 MXN </ion-option>\n\n              <ion-option value="12">2,000,000 MXN - 2,500,000 MXN </ion-option>\n\n              <ion-option value="13">3,000,000 MXN - 3,500,000 MXN </ion-option>\n\n              <ion-option value="17">4,000,000 MXN - 4,500,000 MXN </ion-option>\n\n              <ion-option value="18">5,000,000 MXN - 5,500,000 MXN </ion-option>\n\n              <ion-option value="19">6,000,000 MXN - 6,500,000 MXN </ion-option>\n\n              <ion-option value="20">10 Millones MXN y Más </ion-option>\n\n              <ion-option value="14">Otro - Other </ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n          <ion-item class="fondo">\n\n            <ion-label floating>Otro presupuesto</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.otro_presupuesto" type="text" [ngModelOptions]="{standalone: true}"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="fondo">\n\n            <ion-label floating>Enganche</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.enganche" [ngModelOptions]="{standalone: true}" type="number"></ion-input>\n\n          </ion-item>\n\n\n\n            <div class="botones">\n\n              <button style="margin: 0px 5px" color="botones" style="margin: 5px 2px;" ion-button type="submit" block>Siguiente</button>\n\n            </div>\n\n        </form>\n\n        <button style="margin: 0px 5px" color="botones" ion-button type="submit" block (click)="regresar(\'busca\')" >Regresar</button>\n\n      </div>\n\n\n\n      <h1 class="cabecera">INFORMACION DEL CONTACTO</h1>\n\n      <div id="compradores" padding class="compradores">\n\n        <form (ngSubmit)="formularioCompradores()" [formGroup]="fDelContacto">\n\n          <ion-item class="formulario fondo">\n\n            <ion-label floating>Direccion principal</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.direccion" type="text" formControlName="fdcDir1"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo"> \n\n            <ion-label floating>Segunda direccion</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.direccion2" type="text" formControlName="fdcDir2"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label floating>Codigo postal</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.codigo_p" type="text" formControlName="fdcPostal"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label floating>Pais</ion-label>\n\n            <ion-select [(ngModel)]="datosGenerales.country" (ionChange)="actualizarEstado()" formControlName="fdcPais">\n\n              <ion-option *ngFor="let pais of listaDePaises" value="{{pais.countryid}}">{{pais.country}}</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n          <ion-item class="fondo">\n\n            <ion-label floating>Estado</ion-label>\n\n            <ion-select [(ngModel)]="datosGenerales.state" [ngModelOptions]="{standalone: true}" >\n\n              <ion-option *ngFor="let estado of listaDeEstados" value="{{estado.stateid}}">{{estado.state}}</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label floating>ciudad</ion-label>\n\n            <ion-select [(ngModel)]="datosGenerales.ciudad" (ionChange)="actualizarCiudades()" formControlName="fdcCiudad">\n\n              <ion-option *ngFor="let ciudad of listaDeCiudades" value="{{ciudad.city}}">{{ciudad.city}}</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label floating>Nacionalidad</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.nacionalidad" type="text" formControlName="fdcNacionalidad"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="fondo" *ngIf="fDelContacto.get(\'fdcNacionalidad\').errors && error">\n\n            <p color="danger" *ngIf="fDelContacto.get(\'fdcNacionalidad\').hasError(\'required\')">Este campo es necesario</p>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label floating>Idioma</ion-label>\n\n            <ion-select [(ngModel)]="datosGenerales.idioma" formControlName="fdcIdioma">\n\n              <ion-option *ngFor="let lenguaje of listaDeLenguajes" value="{{lenguaje.languageid}}">{{lenguaje.language}}</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label floating>Telefono de casa</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.tel" type="text" formControlName="fdcTelC"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label floating>Telefono de oficina</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.oficina_tel" type="text" formControlName="fdcTelO"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label floating>Fax</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.fax_tel" type="text" formControlName="fdcFax"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label floating>Celular con lada</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.cel_tel" type="text" formControlName="fdcCelL"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label floating>Nextel</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.nextel_tel" type="text" formControlName="fdcNextel"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label floating>No. Fam</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.num_familia" type="number" formControlName="fdcNoFam"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label floating>profesión</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.profecion" type="text" formControlName="fdcProf"></ion-input>\n\n          </ion-item>\n\n          <ion-list class="fondo" radio-group [(ngModel)]="datosGenerales.status_civil" [ngModelOptions]="{standalone: true}" >\n\n            <ion-label>Estado civil</ion-label>\n\n              <ion-item class="formulario fondo">\n\n                <ion-label class="textoLabel">Soltero(a)</ion-label>\n\n                <ion-checkbox value="1" checked></ion-checkbox>\n\n              </ion-item>\n\n              <ion-item class="formulario fondo">\n\n                <ion-label class="textoLabel">Casado(a)</ion-label>\n\n                <ion-checkbox value="0" ></ion-checkbox>\n\n              </ion-item>\n\n            </ion-list>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label floating>Empresa</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.empresa" type="text" formControlName="fdcEmpresa"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label floating>Website</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.sitio_web" type="text" formControlName="fdcWeb"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label stacked>¿Cuántas veces ha visitado este destino turístico?</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.num_visitas" formControlName="fdcComentarios"></ion-input>\n\n          </ion-item>\n\n          <div class="botones">\n\n            <button style="margin: 0px 5px" color="botones" style="margin: 5px 2px;" ion-button type="submit" block>Siguiente</button>\n\n          </div>\n\n        </form>\n\n        <button style="margin: 0px 5px" color="botones" style="margin: 5px 2px;" ion-button type="submit" block (click)="regresar(\'compradores\')" >Regresar</button>\n\n      </div>\n\n\n\n      <h1 class="cabecera">INFORMACION FINANCIERA</h1>\n\n      <div id="financiera" padding class="financiera">\n\n        <form (ngSubmit)="formularioFinanciera()">\n\n          <ion-list class="fondo" radio-group [(ngModel)]="datosGenerales.ingreso_anual" [ngModelOptions]="{standalone: true}" >\n\n              <ion-label>Ingreso anual</ion-label>\n\n              <ion-item class="fondo">\n\n                <ion-label>50-100,000</ion-label>\n\n                <ion-radio value="50-100,000"></ion-radio>\n\n              </ion-item>\n\n    \n\n              <ion-item class="fondo">\n\n                <ion-label>100-250,000</ion-label>\n\n                <ion-radio value="100-250,000"></ion-radio>\n\n              </ion-item>\n\n    \n\n              <ion-item class="fondo">\n\n                <ion-label>+250,000</ion-label>\n\n                <ion-radio value="+250,000"></ion-radio>\n\n              </ion-item>\n\n    \n\n              <ion-item class="fondo">\n\n                <ion-label>+1,000,000</ion-label>\n\n                <ion-radio value="+1,000,000"></ion-radio>\n\n              </ion-item>\n\n    \n\n              <ion-item class="fondo">\n\n                <ion-label >+5,000,000</ion-label>\n\n                <ion-radio value="+5,000,000"></ion-radio>\n\n              </ion-item>\n\n    \n\n              <ion-item class="fondo">\n\n                <ion-label >+10,000,000</ion-label>\n\n                <ion-radio value="+10,000,000"></ion-radio>\n\n              </ion-item>\n\n    \n\n              <ion-item class="fondo">\n\n                <ion-label >+15,000,000</ion-label>\n\n                <ion-radio value="+15,000,000"></ion-radio>\n\n              </ion-item>\n\n    \n\n              <ion-item class="fondo">\n\n                <ion-label >+20,000,000</ion-label>\n\n                <ion-radio value="+20,000,000"></ion-radio>\n\n              </ion-item>\n\n    \n\n              <ion-item class="fondo">\n\n                <ion-label >+30,000,000</ion-label>\n\n                <ion-radio value="+30,000,000"></ion-radio>\n\n              </ion-item>\n\n          </ion-list>\n\n\n\n          <div class="botones">\n\n            <button style="margin: 0px 5px" color="botones" style="margin: 5px 2px;" ion-button type="submit" block>Siguiente</button>\n\n          </div>\n\n        </form>\n\n        <button style="margin: 0px 5px" color="botones" style="margin: 5px 2px;" ion-button type="submit" block (click)="regresar(\'financiera\')" >Regresar</button>\n\n      </div>\n\n\n\n      <h1 class="cabecera">USO DEL INMUEBLE</h1>\n\n      <div id="inmueble" class="inmueble">\n\n        <form (ngSubmit)="formularioInmueble()">\n\n          <ion-list class="fondo" radio-group [(ngModel)]="datosGenerales.uso_propiedad" [ngModelOptions]="{standalone: true}">\n\n            <ion-label>Uso de la propiedad</ion-label>\n\n\n\n            <ion-item class="fondo">\n\n              <ion-label >Vivir</ion-label>\n\n              <ion-radio value="V"></ion-radio>\n\n            </ion-item>\n\n\n\n            <ion-item class="fondo">\n\n              <ion-label >Inversión</ion-label>\n\n              <ion-radio value="I"></ion-radio>\n\n            </ion-item>\n\n\n\n            <ion-item class="fondo">\n\n              <ion-label >Rentarla</ion-label>\n\n              <ion-radio value="R"></ion-radio>\n\n            </ion-item>\n\n          </ion-list>\n\n\n\n          <ion-list class="fondo" radio-group [(ngModel)]="datosGenerales.forma_pago" [ngModelOptions]="{standalone: true}">\n\n            <ion-label>Forma de pago</ion-label>\n\n\n\n            <ion-item class="fondo">\n\n              <ion-label>Contado</ion-label>\n\n              <ion-radio value="C"></ion-radio>\n\n            </ion-item>\n\n\n\n            <ion-item class="fondo">\n\n              <ion-label>Crédito bancario</ion-label>\n\n              <ion-radio value="E"></ion-radio>\n\n            </ion-item>\n\n\n\n            <ion-item class="fondo">\n\n              <ion-label>Crédito hipotecario</ion-label>\n\n              <ion-radio value="F"></ion-radio>\n\n            </ion-item>\n\n\n\n            <ion-item class="fondo">\n\n              <ion-label>Otro</ion-label>\n\n              <ion-radio value="O"></ion-radio>\n\n            </ion-item>\n\n          </ion-list>\n\n\n\n          <ion-item class="fondo">\n\n            <ion-label floating>Hotel</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.num_hotel" [ngModelOptions]="{standalone: true}"></ion-input>\n\n          </ion-item>\n\n\n\n          <ion-item class="fondo">\n\n            <ion-label floating>No Hab</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.cuarto_hotel" [ngModelOptions]="{standalone: true}"></ion-input>\n\n          </ion-item>\n\n\n\n          <ion-item class="fondo">\n\n            <ion-label floating>Salida</ion-label>\n\n            <ion-input [(ngModel)]="datosGenerales.salida" [ngModelOptions]="{standalone: true}"></ion-input>\n\n          </ion-item>          \n\n\n\n          <ion-item class="fondo">\n\n            <ion-textarea [(ngModel)]="datosGenerales.coment_financiera" placeholder="Comentarios" [ngModelOptions]="{standalone: true}"></ion-textarea>\n\n          </ion-item>\n\n\n\n          <ion-item class="fondo">\n\n            <ion-label stacked>¿Le interesaría recibir información acerca de oportunidades de inversión en bienes raíces?</ion-label>\n\n            <ion-select [(ngModel)]="datosGenerales.de_acuerdo_info" [ngModelOptions]="{standalone: true}">\n\n              <ion-option value="0" slected="true">No</ion-option>\n\n              <ion-option value="1">Si</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n\n\n          <div class="botones">\n\n            <button style="margin: 0px 5px" color="botones" style="margin: 5px 2px;" ion-button type="submit" block>Siguiente</button>\n\n          </div>\n\n        </form>\n\n        <button style="margin: 0px 5px" color="botones" style="margin: 5px 2px;" ion-button type="submit" block (click)="regresar(\'inmueble\')" >Regresar</button>\n\n      </div>\n\n\n\n\n\n\n\n      <h1 class="cabecera">AGENTE QUE ENLISTA</h1>\n\n      <div id="enlista" padding class="enlista">\n\n        <form (ngSubmit)="agregarContacto()" [formGroup]="fAgente">\n\n\n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel">Officina <sup>*</sup></ion-label>\n\n              <ion-select [(ngModel)]="datosGenerales.office" (ionChange)="actualizarAsesor()" name="propiedad" formControlName="officinaA">\n\n                <ion-option *ngFor="let oficina of listaDeOficinas" value="{{oficina.officeid}}">{{oficina.officename}}</ion-option>\n\n              </ion-select>\n\n            </ion-item> \n\n            <ion-item class="formulario fondo">\n\n              <ion-label class="textoLabel">Asesor <sup>*</sup></ion-label>\n\n              <ion-select [(ngModel)]="datosGenerales.user" name="propiedad" formControlName="asesorA">\n\n                <ion-option *ngFor="let agente of agentesDeOficina" value="{{agente.userid}}">{{agente.fullname}}</ion-option>\n\n              </ion-select>\n\n            </ion-item> \n\n            <div class="botones">\n\n              <button style="margin: 0px 5px" color="botones" style="margin: 5px 2px;" ion-button type="submit" block>Agregar</button>\n\n            </div>\n\n        </form>\n\n        <button style="margin: 0px 5px" color="botones" style="margin: 5px 2px;" ion-button type="submit" block (click)="regresar(\'enlista\')" >Regresar</button>\n\n      </div>\n\n\n\n        <!--</form>-->\n\n\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\agregar-compradores\agregar-compradores.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_formularios_formularios__["a" /* FormulariosProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__providers_contactos_contactos__["a" /* ContactosProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_usuario_usuario__["a" /* UsuarioProvider */]])
    ], AgregarCompradoresPage);
    return AgregarCompradoresPage;
}());

//# sourceMappingURL=agregar-compradores.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuscarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the BuscarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BuscarPage = /** @class */ (function () {
    function BuscarPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    BuscarPage_1 = BuscarPage;
    BuscarPage.prototype.irAresultado = function (destino) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["j" /* FormularioPage */], { 'destino': destino }); //----- nav para llegar al buscador-----
        //this.navCtrl.push(ResultadosPage, {'destino':null,'tipo':destino});
    };
    BuscarPage.prototype.irAPagina = function (destino) {
        if (destino === 'login') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["o" /* LoginPage */]);
        }
        else if (destino === 'buscar') {
            this.navCtrl.push(BuscarPage_1);
        }
        else if (destino === 'destinos') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["g" /* DestinosPage */]);
        }
        else if (destino === 'nosotros') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["m" /* InfoPage */]);
        }
        else if (destino === 'contactos') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["f" /* ContactosPage */]);
        }
    };
    BuscarPage = BuscarPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-buscar',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\buscar\buscar.html"*/'<!-- SI NO LO VAS A USAR, NO LO COMENTES!!!!!!!!!!!!!!! -->\n\n<!-- BORRALOOOOOOOOOOOO!!!!!!!!! -->\n\n<!-- Yo si lo comento por que son los cambios sugeridos :3 -->\n\n\n\n<!-- <ion-header no-border> -->\n\n<ion-header no-border>\n\n<!-- <ion-navbar transparent> -->\n\n  <ion-navbar color="header">\n\n    <ion-title>Buscador</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n<!--jeje>-->\n\n<!-- <ion-content fullscreen style="background-color: #eee;"> -->\n\n<ion-content style="background-color: #eee;" class="card-background-page">\n\n\n\n  <ion-card  (click)="irAresultado(\'desarrollos\')">\n\n    <img src="assets/imgs/desarrollos.jpg" />\n\n    <div class="card-title">PRIVADAS</div>\n\n  \n\n  </ion-card>\n\n\n\n  <ion-card (click)="irAresultado(\'propiedades\')">\n\n    <img src="assets/imgs/propiedades2.jpeg" />\n\n    <div class="card-title">MODELOS</div>\n\n  \n\n  </ion-card>\n\n  \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\buscar\buscar.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]])
    ], BuscarPage);
    return BuscarPage;
    var BuscarPage_1;
}());

//# sourceMappingURL=buscar.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DestinosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DestinosPage = /** @class */ (function () {
    function DestinosPage(navCtrl, navParams, usuarioProvider, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.usuarioProvider = usuarioProvider;
        this.loadingCtrl = loadingCtrl;
        this.respuesta = false;
    }
    DestinosPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        if (this.destinos == null) {
            var loader_1 = this.loadingCtrl.create({
                dismissOnPageChange: false
            });
            loader_1.present();
            var promise = this.usuarioProvider.cargarDestino();
            promise.subscribe(function (data) {
                if (data.status == 200) {
                    if (data.json().status == 200) {
                        _this.destinos = data.json().data;
                        _this.length = _this.destinos.length;
                        if (_this.length != 0) {
                            setTimeout(function () {
                                var destinos = document.getElementById("destinos");
                                destinos.classList.add("aparecer");
                                destinos.classList.remove("ocultar");
                            }, 1000);
                            //this.respuesta = true;
                        }
                        else {
                            setTimeout(function () {
                                var mensaje = document.getElementById("destinos");
                                mensaje.classList.add("aparecer");
                                mensaje.classList.remove("ocultar");
                                document.getElementById("destinos").innerHTML = '<p>No hay registros</p>';
                            }, 1000);
                        }
                    }
                    else {
                    }
                }
                else {
                }
            });
            setTimeout(function () {
                loader_1.dismiss();
            }, 1000);
        }
    };
    DestinosPage.prototype.irApagina = function (destino) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["r" /* ResultadosPage */], { destino: destino, 'tipo': 'desarrollo' });
    };
    DestinosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-destinos',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\destinos\destinos.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="header">\n\n    <ion-title>Destinos</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content id="result" class="fondo">\n\n  <div style="text-align: center;" id="destinos" class="ocultar">\n\n    <div *ngIf="length != 0">\n\n      <ion-card class="banner" *ngFor="let destino of destinos">\n\n        <img src="{{destino.smallfile}}" (click)="irApagina(destino.stateid)">\n\n        <div class="texto-encima" id="{{destino.stateid}}">\n\n          <h1 style="color: #fff; text-align: center; margin-top: 10px; opacity: 1!important;">{{destino.state}} <br/> <p style="font-size: 13px; color: #fff;">{{destino.units}} Desarrollos</p></h1>\n\n        </div>\n\n      </ion-card>\n\n    </div>\n\n  </div>\n\n    \n\n\n\n</ion-content>\n\n\n\n\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\destinos\destinos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */]])
    ], DestinosPage);
    return DestinosPage;
}());

//# sourceMappingURL=destinos.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormularioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FormularioPage = /** @class */ (function () {
    //rango = {'lower': 18, 'upper': 100}
    function FormularioPage(navCtrl, navParams, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.activo = false;
        this.datos = {
            'lower': 0,
            'upper': 50000000
        };
        this.metros = {
            'lower': 0,
            'upper': 10000
        };
        this.metroslot = {
            'lower': 0,
            'upper': 10000
        };
        this.tipoFormulario = this.navParams.get('destino');
        this.storage.get('usuario').then(function (data) {
            _this.$_SESSION = data;
        });
    }
    FormularioPage.prototype.ionViewDidLoad = function () {
        if (this.tipoFormulario == 'propiedades') {
            var elementoPropiedad = document.getElementById("Fpropiedades");
            elementoPropiedad.classList.add("visible");
            elementoPropiedad.classList.remove("invisible");
        }
        else {
            var elementoPropiedad = document.getElementById("Fdesarrollos");
            elementoPropiedad.classList.add("visible");
            elementoPropiedad.classList.remove("invisible");
        }
    };
    FormularioPage.prototype.logForm = function (tipo) {
        if (tipo == 'propiedad') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["r" /* ResultadosPage */], { 'datos': this.datos, tipo: tipo, 'metros': this.metros, 'metroslot': this.metroslot });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["r" /* ResultadosPage */], { 'datos': this.datos, tipo: tipo });
        }
    };
    FormularioPage.prototype.avanzado = function () {
        if (this.activo == false) {
            var elemento = document.getElementById("avanzado");
            elemento.classList.add("visible");
            elemento.classList.remove("invisible");
            this.activo = true;
        }
        else {
            var elemento = document.getElementById("avanzado");
            elemento.classList.add("invisible");
            elemento.classList.remove("visible");
            this.activo = false;
        }
    };
    FormularioPage.prototype.avanzado2 = function () {
        if (this.activo == false) {
            var elemento = document.getElementById("avanzado2");
            elemento.classList.add("visible");
            elemento.classList.remove("invisible");
            this.activo = true;
        }
        else {
            var elemento = document.getElementById("avanzado2");
            elemento.classList.add("invisible");
            elemento.classList.remove("visible");
            this.activo = false;
        }
    };
    FormularioPage.prototype.setPrecioVista = function () {
        this.formatoLower = new Intl.NumberFormat('en-ES').format(this.datos.lower);
        this.formatoUpper = new Intl.NumberFormat('en-ES').format(this.datos.upper);
    };
    FormularioPage.prototype.setMetrosVista = function () {
        this.formatoLower2 = new Intl.NumberFormat('en-ES').format(this.metros.lower);
        this.formatoLower2 = new Intl.NumberFormat('en-ES').format(this.metros.upper);
    };
    FormularioPage.prototype.setMetroslotVista = function () {
        this.formatoLower2 = new Intl.NumberFormat('en-ES').format(this.metroslot.lower);
        this.formatoLower2 = new Intl.NumberFormat('en-ES').format(this.metroslot.upper);
    };
    FormularioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-formulario',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\formulario\formulario.html"*/'<ion-header no-border>\n\n\n\n  <ion-navbar color="header"> \n\n    <ion-title>Filtros</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content class="fondo">\n\n  <div id="Fpropiedades" class="invisible">\n\n    <form (ngSubmit)="logForm(\'propiedad\')">\n\n        <!--<ion-item class="formulario">\n\n          <ion-label>tipo de operacion</ion-label>\n\n          <ion-select name="operacion" [(ngModel)]="datos.operacion">\n\n            <ion-option value="1">Venta</ion-option>\n\n            <ion-option value="2">Renta</ion-option>\n\n            <ion-option value="3">Renta vacacional</ion-option>\n\n          </ion-select>\n\n        </ion-item>-->\n\n        <ion-item class="formulario fondo">\n\n          <ion-label>Tipo de propiedad</ion-label>\n\n          <ion-select name="propiedad" [(ngModel)]="datos.propiedad">\n\n            <ion-option value="1">Casa</ion-option>\n\n            <ion-option value="2">Departamento</ion-option>\n\n            <ion-option value="3">Local comercial</ion-option>\n\n            <ion-option value="4">Terreno</ion-option>\n\n            <ion-option value="5">Oficina</ion-option>\n\n            <ion-option value="6">Conjunto</ion-option>\n\n            <ion-option value="7">Rancho</ion-option>\n\n            <ion-option value="8">Membresia</ion-option>\n\n            <ion-option value="9">Hotel</ion-option>\n\n            <ion-option value="10">Marina</ion-option>\n\n            <ion-option value="11">Inversiones</ion-option>\n\n            <ion-option value="12">Bodega</ion-option>\n\n            <ion-option value="13">Edificio</ion-option>\n\n          </ion-select>\n\n        </ion-item>   \n\n        <ion-item class="fondo" *ngIf="$_SESSION">\n\n          <ion-label style="margin: 0px;">precio desde ${{formatoLower}} - {{formatoUpper}}</ion-label><ion-badge>${{formatoLower}} - ${{formatoUpper}}</ion-badge>\n\n          <ion-range style="padding: 0px 5px;" name="rangos" min="0" max="50000000" dualKnobs="true" pin="false" (ionChange)="setPrecioVista()" [(ngModel)]="datos" color="danger">\n\n          <ion-label range-left name="minimo" value="0">$0</ion-label>\n\n          <ion-label range-right name="maximo" value="50000000"></ion-label>\n\n          </ion-range>\n\n        </ion-item>\n\n        <ion-item class="fondo">\n\n          <ion-label>Metros cuadrados de construcción</ion-label>\n\n          <ion-label style="margin: 0px;">desde {{metros.lower}} m<SUP>2</SUP> - {{metros.upper}} m<SUP>2</SUP> </ion-label>\n\n          <ion-range style="padding: 0px 5px;" name="rangos" min="0" max="10000" dualKnobs="true" pin="false" (ionChange)="setMetrosVista()" [(ngModel)]="metros" color="danger">\n\n          <ion-label range-left name="minimo" value="0">0 m<SUP>2</SUP></ion-label>\n\n          <ion-label range-right name="maximo" value="10000">10000 m<SUP>2</SUP></ion-label>\n\n          </ion-range>\n\n        </ion-item>\n\n        <div id="avanzado" class="invisible">\n\n          <ion-item class="fondo">\n\n              <ion-label class="textoLabel" floating>Folio</ion-label>\n\n            <ion-input name="folio" [(ngModel)]="datos.folios" type="number"></ion-input>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label>Estacionamientos</ion-label>\n\n            <ion-select name="parking" [(ngModel)]="datos.parking">\n\n              <ion-option value="0">0</ion-option>\n\n              <ion-option value="1">1</ion-option>\n\n              <ion-option value="2">2</ion-option>\n\n              <ion-option value="3">3</ion-option>\n\n              <ion-option value="4">4</ion-option>\n\n              <ion-option value="5">5</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label>Recámaras</ion-label>\n\n            <ion-select name="recamaras" [(ngModel)]="datos.recamaras">\n\n              <ion-option value="0">0+</ion-option>\n\n              <ion-option value="1">1+</ion-option>\n\n              <ion-option value="2">2+</ion-option>\n\n              <ion-option value="3">3+</ion-option>\n\n              <ion-option value="4">4+</ion-option>\n\n              <ion-option value="5">5+</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n          <ion-item class="formulario fondo">\n\n            <ion-label>Baños</ion-label>\n\n            <ion-select name="banos" [(ngModel)]="datos.banos">\n\n              <ion-option value="0">0+</ion-option>\n\n              <ion-option value="1">1+</ion-option>\n\n              <ion-option value="2">2+</ion-option>\n\n              <ion-option value="3">3+</ion-option>\n\n              <ion-option value="4">4+</ion-option>\n\n              <ion-option value="5">5+</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n          <ion-item class="fondo">\n\n            <ion-label>Metros cuadrados de terreno</ion-label>\n\n            <ion-label style="margin: 0px;">desde {{metroslot.lower}} m<SUP>2</SUP> - {{metroslot.upper}} m<SUP>2</SUP> </ion-label>\n\n            <ion-range style="padding: 0px 5px;" name="rangos" min="0" max="10000" dualKnobs="true" pin="false" (ionChange)="setMetroslotVista()" [(ngModel)]="metroslot" color="danger">\n\n            <ion-label range-left name="minimo" value="0">0 m<SUP>2</SUP></ion-label>\n\n            <ion-label range-right name="maximo" value="10000">10000 m<SUP>2</SUP></ion-label>\n\n            </ion-range>\n\n          </ion-item>\n\n        </div>\n\n        <div class="botones">\n\n          <button style="margin: 0px 5px" color="botones" ion-button type="submit" style="margin: 5px 2px;" block>buscar</button>\n\n        </div>\n\n      </form>\n\n      <button style="margin: 0px 5px" color="botones" ion-button style="margin: 5px 2px;" (click)="avanzado()" block>Avanzado</button>\n\n    </div>\n\n\n\n\n\n\n\n\n\n    <div id="Fdesarrollos" class="invisible">\n\n      <form (ngSubmit)="logForm(\'desarrollo\')">\n\n          <!--<ion-item class="formulario">\n\n              <ion-label>tipo de operacion</ion-label>\n\n              <ion-select name="operacion" [(ngModel)]="datos.operacion">\n\n                <ion-option value="1">Venta</ion-option>\n\n                <ion-option value="2">Preventa</ion-option>\n\n              </ion-select>\n\n            </ion-item>-->\n\n            <ion-item class="formulario fondo">\n\n              <ion-label>Tipo de desarrollo</ion-label>\n\n              <ion-select name="desarrollo" [(ngModel)]="datos.desarrollo">\n\n                <ion-option value="0">Corporativo</ion-option>\n\n                <ion-option value="0">Comercial</ion-option>\n\n                <ion-option value="0">Residencial</ion-option>\n\n                <ion-option value="0">Industrial</ion-option>\n\n                <ion-option value="0">Mixto</ion-option>\n\n                <ion-option value="0">Multi-Familiar</ion-option>\n\n                <ion-option value="0">Condominal</ion-option>\n\n                <ion-option value="0">Villas</ion-option>\n\n              </ion-select>\n\n            </ion-item>\n\n            <ion-item class="fondo" *ngIf="$_SESSION">\n\n              <ion-label style="margin: 0px;">precio desde ${{formatoLower}} - ${{formatoUpper}}</ion-label>\n\n              <ion-range style="padding: 0px 5px;" name="rangos" min="0" max="50000000" dualKnobs="true" pin="true" (ionChange)="setPrecioVista()" [(ngModel)]="datos" color="danger">\n\n              <ion-label range-left name="minimo" value="0">$0</ion-label>\n\n              <ion-label range-right name="maximo" value="50000000">50,000,000</ion-label>\n\n              </ion-range>\n\n            </ion-item>\n\n            <ion-item class="fondo">\n\n              <ion-label class="textoLabel" floating>Folio</ion-label>\n\n              <ion-input name="folio" type="number"></ion-input>\n\n            </ion-item>\n\n          <div id="avanzado2" class="invisible">\n\n                <ion-item class="formulario fondo">\n\n                  <ion-label>Recámaras</ion-label>\n\n                  <ion-select name="recamaras">\n\n                    <ion-option value="1">1+</ion-option>\n\n                    <ion-option value="2">2+</ion-option>\n\n                    <ion-option value="3">3+</ion-option>\n\n                    <ion-option value="4">4+</ion-option>\n\n                    <ion-option value="5">5+</ion-option>\n\n                  </ion-select>\n\n                </ion-item>\n\n                <ion-item class="formulario fondo">\n\n                  <ion-label>Estacionamientos</ion-label>\n\n                  <ion-select name="parking" [(ngModel)]="datos.parking">\n\n                    <ion-option value="0">0</ion-option>\n\n                    <ion-option value="1">1</ion-option>\n\n                    <ion-option value="2">2</ion-option>\n\n                    <ion-option value="3">3</ion-option>\n\n                    <ion-option value="4">4</ion-option>\n\n                    <ion-option value="5">5</ion-option>\n\n                  </ion-select>\n\n                </ion-item>\n\n                <ion-item class="formulario fondo">\n\n                  <ion-label>Baños</ion-label>\n\n                  <ion-select name="banos" [(ngModel)]="datos.banos">\n\n                    <ion-option value="1">1+</ion-option>\n\n                    <ion-option value="2">2+</ion-option>\n\n                    <ion-option value="3">3+</ion-option>\n\n                    <ion-option value="4">4+</ion-option>\n\n                    <ion-option value="5">5+</ion-option>\n\n                  </ion-select>\n\n                </ion-item>\n\n          </div>\n\n          <div class="botones">\n\n            <button color="botones" style="margin: 0px 5px" style="margin: 5px 2px;" ion-button type="submit" block>buscar</button>\n\n          </div>\n\n          \n\n        </form>\n\n        <button color="botones" style="margin: 0px 5px" style="margin: 5px 2px;" ion-button (click)="avanzado2()" block>Avanzado</button>\n\n      </div>\n\n    \n\n</ion-content>\n\n\n\n\n\n  \n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\formulario\formulario.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], FormularioPage);
    return FormularioPage;
}());

//# sourceMappingURL=formulario.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InfoPage = /** @class */ (function () {
    function InfoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    InfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-info',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\info\info.html"*/'<!--\n\n  Generated template for the InfoPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="header">\n\n    <ion-title>info</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <h2>\n\n    Desde 1972\n\n  </h2>\n\n  <h2>\n\n    CONSTRUYENDO CONFIANZA\n\n  </h2>\n\n  <p>\n\n    Nuestras labores se orientan al diseño, la construcción, operación y comercialización de desarrollos inmobiliarios de carácter habitacional, comercial, industrial y de almacenamiento\n\n  </p>\n\n  <p>\n\n    Damos valor especial a cada proyecto, al realizar un estudio detallado del entorno para descubrir la auténtica vocación del desarrollo a construir, así mismo cuidamos las características del suelo, su localización, vías de acceso, servicios y principalmente el armonizar con el paisaje y concepto arquitectónico de las privadas y sus casas.\n\n  </p>\n\n  <p>\n\n    De igual manera compaginamos los espacios, diseños y detalles a las necesidades, deseos y gustos del mercado, procurando sobrepasar sus expectativas.\n\n  </p>\n\n  <p>\n\n    Donde construye Grupo Santa Rita está el desarrollo... frase que confirma, el ser pioneros en la construcción de polos habitacionales, que se han convertido en centros productivos para el crecimiento social y económico de la población y de la ciudad misma.\n\n  </p>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\info\info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]])
    ], InfoPage);
    return InfoPage;
}());

//# sourceMappingURL=info.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { RegistrarPage } from "../index.paginas";


var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, events, loadingCtrl, modalCtrl, usuario, storage, alertCtrl, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.usuario = usuario;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.datos = [];
        //Valida el formato del formulario
        this.loginForm = this.formBuilder.group({
            username: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required)
        });
    }
    //----------------------------------------------------------------------------
    //Login del usuario
    LoginPage.prototype.loginUser = function () {
        var _this = this;
        Promise.all([
            this.usuario.login(this.username, this.password)
        ]).then(function (data) {
            if (data[0] == true) {
                _this.events.publish('user:created', Date.now());
            }
            else {
                _this.incorrectAlert();
            }
        });
    };
    //----------------------------------------------------------------------------
    LoginPage.prototype.irABuscar = function () {
    };
    //---------------------------------------------------------------------------------------------------------------
    //Alerta de Datos incorrectos
    LoginPage.prototype.incorrectAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Datos incorrectos',
            message: 'Revisa bien los datos ingresados',
        });
        alert.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\login\login.html"*/'<ion-content padding class="animated fadeIn login auth-page">\n\n  <div class="login-content">\n\n      <!-- Logo -->\n\n    <div padding-horizontal text-center class="animated fadeInDown">\n\n      <div class="logo">\n\n        <img class="center" width="100%" style="margin: 10px auto;" src="assets/imgs/logoN.png">\n\n      </div>\n\n    </div>\n\n      <!-- Login form -->\n\n    <div>\n\n      <form [formGroup]="loginForm">\n\n          <ion-item>\n\n            <ion-label floating>\n\n              <ion-icon name="mail" item-start class="text-primary"></ion-icon>\n\n              Email\n\n            </ion-label>\n\n            <ion-input type="email" formControlName="username" [(ngModel)]="username" value="hponce@immosystem.com.mx"></ion-input>\n\n          </ion-item>\n\n\n\n          <ion-item>\n\n            <ion-label floating>\n\n              <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n\n              Password\n\n            </ion-label>\n\n            <ion-input type="password" formControlName="password" [(ngModel)]="password" value="RgxOfmci48"></ion-input>\n\n          </ion-item>\n\n        <div>\n\n          <button ion-button icon-start block color="botones" tappable [disabled]="!loginForm.valid" (click)="loginUser()">\n\n            <ion-icon name="log-in"></ion-icon>\n\n            INICIAR SESIÓN\n\n          </button>\n\n        </div>\n\n      </form>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\login\login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultadosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_propiedades_propiedades__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__documents_documents__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ResultadosPage = /** @class */ (function () {
    function ResultadosPage(navCtrl, navParams, propiedadesProvider, loadingCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.propiedadesProvider = propiedadesProvider;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.destino = null;
        this.tipo = null;
        this.destino = this.navParams.get('destino');
        this.tipo = this.navParams.get('tipo');
        this.storage.get('usuario').then(function (data) {
            _this.$_SESSION = data;
        });
    }
    ResultadosPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        if (this.resultados == null) {
            var loader = this.loadingCtrl.create({
                dismissOnPageChange: false
            });
            loader.present();
            if (this.destino == null) {
                if (this.tipo == 'propiedad') {
                    this.datosFiltrados = this.navParams.get('datos');
                    this.metros = this.navParams.get('metros');
                    this.metroslot = this.navParams.get('metroslot');
                    var promise = this.propiedadesProvider.filtrarPropiedad(this.datosFiltrados, this.metros, this.metroslot);
                    promise.subscribe(function (data) {
                        if (data.json().status == 200) {
                            _this.resultados = data.json().data;
                            var result = document.getElementById('resultados');
                            result.classList.add("aparecer");
                            result.classList.remove("ocultar");
                        }
                        else {
                        }
                        loader.dismiss();
                    });
                }
                else {
                    this.datosFiltrados = this.navParams.get('datos');
                    var promise = this.propiedadesProvider.filtrarDesarrollo(this.datosFiltrados);
                    promise.subscribe(function (data) {
                        if (data.json().status == 200) {
                            _this.resultados = data.json().data;
                            var result = document.getElementById('resultados');
                            result.classList.add("aparecer");
                            result.classList.remove("ocultar");
                        }
                        else {
                        }
                        loader.dismiss();
                    });
                }
            }
            else {
                var promise = this.propiedadesProvider.cargarPorCiudad(this.destino);
                promise.subscribe(function (data) {
                    _this.resultados = data.json().data;
                    var result = document.getElementById('resultados');
                    result.classList.add("aparecer");
                    result.classList.remove("ocultar");
                    loader.dismiss();
                });
            }
        }
    };
    ResultadosPage.prototype.irAPropiedad = function (index) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["y" /* VerPropiedadPage */], { index: index });
    };
    ResultadosPage.prototype.irADesarrollo = function (index) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["x" /* VerDesarrolloPage */], { index: index });
        //this.navCtrl.push(VerPropiedadPage, {index});
    };
    ResultadosPage.prototype.obtenerSlider = function (slider) {
        for (var i = 0; i < slider.length; i++) {
        }
    };
    ResultadosPage.prototype.getDocuments = function (idDevelopment) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__documents_documents__["a" /* DocumentsPage */], { 'development': idDevelopment, 'user': this.$_SESSION });
        /*var promise = this.propiedadesProvider.getDocuments(idDevelopment, this.$_SESSION);
        promise.subscribe(data=>{
          //console.log(data.json().data);
    
          console.log(data.json());
          console.log("datos");
        });*/
    };
    ResultadosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-resultados',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\resultados\resultados.html"*/'<ion-header no-border>\n\n\n\n  <ion-navbar color="header"> \n\n    <ion-title>Resultados</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content fullscreen class="fondo">\n\n  <div class="ocultar" id="resultados">\n\n    <div class="targetas" *ngIf="tipo == \'propiedad\'">\n\n      <ion-card style="margin: 20px 0px;" class="contenedor" *ngFor="let propiedad of resultados">\n\n        <ion-card-header style="padding: 0px;">\n\n          <div class="imagen">\n\n            <img src="{{propiedad.largephoto}}">\n\n          </div>\n\n\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n          <ion-grid>\n\n            <ion-row>\n\n              <ion-col col-12>\n\n                  <p style="font-size: 15px;"> <strong>{{propiedad.namePropertyEs}}</strong></p>\n\n              </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-9>\n\n                    <ion-row>\n\n                        <p>{{propiedad.address}}</p>\n\n                    </ion-row>\n\n                  </ion-col>\n\n                  <ion-col col-3>\n\n                    <ion-row>\n\n                        <p>{{propiedad.operation}}</p>\n\n                    </ion-row>\n\n                  </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-4 *ngIf="propiedad.m2c != 0">\n\n                    <ion-row>\n\n                        <p><ion-icon ios="ios-home" md="md-home"></ion-icon> {{propiedad.m2c}} m<SUP>2</SUP></p>\n\n                    </ion-row>\n\n                  </ion-col>\n\n                  <ion-col col-4 *ngIf="propiedad.mlot != 0">\n\n                    <ion-row>\n\n                        <p><ion-icon ios="ios-home" md="md-home"></ion-icon> {{propiedad.mlot}} m<SUP>2</SUP></p>\n\n                    </ion-row>\n\n                  </ion-col>\n\n                  <ion-col col-4>\n\n                    <ion-row>\n\n                      <p><ion-icon ios="ios-attach" md="md-attach"></ion-icon> {{propiedad.folio}}</p>\n\n                    </ion-row>\n\n                  </ion-col>\n\n            </ion-row>\n\n          </ion-grid>\n\n          <ion-row>\n\n            <ion-col col-6 *ngIf="$_SESSION">\n\n                <p style="font-size: 15px;" *ngIf="propiedad.price != \'0\'"> <strong>{{propiedad.price}}</strong></p>\n\n            </ion-col>\n\n            <ion-col text-capitalize text-right col-6>\n\n              <button ion-button outline icon-start item-end small (click)="irAPropiedad(propiedad.folio)">\n\n                <ion-icon name=\'ios-list-box\'></ion-icon> \n\n                 Mas información\n\n              </button>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </div>\n\n    <div class="targetas" *ngIf="tipo == \'desarrollo\'">\n\n      <ion-card style="margin: 20px 0px;" class="contenedor" *ngFor="let propiedad of resultados">\n\n        <ion-card-header style="padding: 0px;">\n\n          <div class="imagen">\n\n            <img src="{{propiedad.image.smallphoto}}">\n\n            <div class="texto-encima">\n\n              <!--<p style="color: black; font-weight: bold;">desde: {{propiedad.priceFrom}}</p>-->\n\n              <img src="{{propiedad.office_image}}" alt="">\n\n            </div>\n\n          </div>\n\n\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n          <ion-grid>\n\n            <ion-row>\n\n                <ion-col col-12>\n\n                  <!--<img src="{{propiedad.office_image}}" alt="">-->\n\n                    <!--<p style="font-size: 15px;"> <strong>{{propiedad.developmentNameEs}}</strong></p>-->\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n                <ion-col col-9>\n\n                  <ion-row>\n\n                      <p>{{propiedad.address}}</p>\n\n                  </ion-row>\n\n                </ion-col>\n\n                  <ion-col col-3>\n\n                  <ion-row>\n\n                      <p><ion-icon ios="ios-attach" md="md-attach"></ion-icon> {{propiedad.folio}}</p>\n\n                  </ion-row>\n\n                </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n              <ion-col col-6 *ngIf="propiedad.m2c != 0">\n\n                <ion-row>\n\n                    <p><ion-icon ios="ios-home" md="md-home"></ion-icon> Unidades: {{propiedad.units}}</p>\n\n                </ion-row>\n\n              </ion-col>\n\n              <ion-col col-6 *ngIf="propiedad.mlot != 0">\n\n                <ion-row>\n\n                    <p><ion-icon ios="ios-home" md="md-home"></ion-icon> Disponibles: {{propiedad.unitsAviable}}</p>\n\n                </ion-row>\n\n              </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n              <ion-col col-9 *ngIf="propiedad.m2c != 0">\n\n                <ion-row>\n\n                  <p><ion-icon ios="ios-home" md="md-home"></ion-icon> Unidades vendidas: {{propiedad.soldUnits}}</p>\n\n                </ion-row>\n\n              </ion-col>\n\n            </ion-row>\n\n          </ion-grid>\n\n          <ion-row>\n\n              <ion-col text-capitalize text-right>\n\n                <button ion-button outline icon-start item-end small (click)="getDocuments(propiedad.folio)">\n\n                  <ion-icon name=\'ios-list-box\'></ion-icon> \n\n                   Ver inventario\n\n                </button>\n\n              </ion-col> \n\n            <ion-col text-capitalize text-right>\n\n              <button ion-button outline icon-start item-end small (click)="irADesarrollo(propiedad.folio)">\n\n                <ion-icon name=\'ios-list-box\'></ion-icon> \n\n                 Mas información\n\n              </button>\n\n            </ion-col> \n\n          </ion-row>\n\n        </ion-card-content>\n\n      </ion-card>    \n\n    </div>\n\n\n\n\n\n  </div>\n\n\n\n  </ion-content>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\resultados\resultados.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_propiedades_propiedades__["a" /* PropiedadesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], ResultadosPage);
    return ResultadosPage;
}());

//# sourceMappingURL=resultados.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerDesarrolloPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_social_sharing__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_ionic_native_email_composer__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_propiedades_propiedades__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_usuario_usuario__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__index_paginas__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var VerDesarrolloPage = /** @class */ (function () {
    function VerDesarrolloPage(navCtrl, navParams, socialSharing, callNumber, emailComposer, propiedadesProvider, storage, plt, formBuilder, usuarioProvider, params, ref, alertCtrl, geolocation, loadingCtrl, popoverCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socialSharing = socialSharing;
        this.callNumber = callNumber;
        this.emailComposer = emailComposer;
        this.propiedadesProvider = propiedadesProvider;
        this.storage = storage;
        this.plt = plt;
        this.formBuilder = formBuilder;
        this.usuarioProvider = usuarioProvider;
        this.params = params;
        this.ref = ref;
        this.alertCtrl = alertCtrl;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.popoverCtrl = popoverCtrl;
        this.mapView = true;
        this.datos = [];
        this.agente = [];
        this.slider = [];
        this.tipo = 'amenidades';
        this.comentarios = {};
        this.comentariosMail = {};
        this.idUsuario = null;
        this.errorM = false;
        this.datosMailDB = {};
        this.URL = '';
        this.showToolbar = false;
        this.dataSession = {};
        this.item = params.data.item;
        if (this.servicios != undefined) {
            this.tipo = 'servicios';
        }
        else if (this.amenidades != undefined) {
            this.tipo = 'amenidades';
        }
        this.fMail = this.formBuilder.group({
            nombre: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required],
            apellido: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required],
            telefono: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required],
            correo: ['', [__WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].email]],
            comentario: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required]
        });
        this.storage.get('usuario').then(function (data) {
            _this.idUsuario = data;
        });
    }
    VerDesarrolloPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var $this = this;
        this.folio = this.navParams.get('index');
        var promise = this.propiedadesProvider.cargarDesarrollo(this.folio);
        promise.subscribe(function (data) {
            _this.datos = data.json().data;
            _this.mapLat = _this.datos.latitude;
            _this.mapLong = _this.datos.longitude;
            _this.agente = data.json().data.agent;
            _this.slider = data.json().data.images;
            _this.servicios = data.json().data;
            _this.servicios = data.json().data.services;
            _this.amenidades = data.json().data.amenities;
            _this.URL = 'http://www.santarita.immosystem.com.mx/desarrollo-' + _this.datos.folio;
            var urlParam = _this.datos.developmentNameEs.split(" ");
            for (var _i = 0, urlParam_1 = urlParam; _i < urlParam_1.length; _i++) {
                var data_1 = urlParam_1[_i];
                _this.URL += '-' + data_1;
            }
            _this.loadMap();
            _this.storage.get('data').then(function (data) {
                _this.dataSession = data;
                if (data == null) {
                    _this.agenteNombre = _this.agente.fullname;
                    _this.agenteMail = _this.agente.email;
                }
                else {
                    _this.agenteNombre = _this.dataSession.fullname;
                    _this.agenteMail = _this.dataSession.email;
                }
            });
        });
    };
    VerDesarrolloPage.prototype.compartir = function (plataforma, folio) {
        var _this = this;
        this.URL += folio;
        this.plt.ready().then(function () {
            if (_this.plt.is('android')) {
                if (plataforma == 'facebook') {
                    _this.socialSharing.shareViaFacebook(null, null, _this.URL);
                }
                else if (plataforma == 'twitter') {
                    _this.socialSharing.shareViaTwitter(null, null, _this.URL);
                }
                else if (plataforma == 'whatsapp') {
                    _this.socialSharing.shareViaWhatsApp(null, null, _this.URL);
                }
                else if (plataforma == 'instagram') {
                    _this.socialSharing.shareViaInstagram(_this.URL, _this.slider[0].largefile);
                }
                else if (plataforma == 'pinterest') {
                    _this.socialSharing.shareVia('com.pinterest', null, null, null, _this.URL);
                }
                else if (plataforma == 'googleplus') {
                    _this.socialSharing.shareVia('com.google.android.apps.plus', _this.URL, null, null);
                }
            }
            else {
                if (plataforma == 'facebook') {
                    _this.socialSharing.shareViaFacebook(null, _this.slider[0], 'http://immomexico.com/propiedades/hermosa-casa-en-cancun-16530');
                }
                else if (plataforma == 'twitter') {
                    _this.socialSharing.shareViaTwitter('twitter a compartir');
                }
                else if (plataforma == 'whatsapp') {
                    _this.socialSharing.shareViaWhatsApp('mensaje');
                }
                else if (plataforma == 'instagram') {
                    _this.socialSharing.shareViaInstagram('compartir', 'œremtur');
                }
                else if (plataforma == 'pinterest') {
                    _this.socialSharing.share('', '');
                }
                else if (plataforma == 'googleplus') {
                    _this.socialSharing.canShareViaEmail();
                }
            }
        });
    };
    VerDesarrolloPage.prototype.llamar = function (num) {
        this.callNumber.callNumber(num, true)
            .then(function (res) { return console.log('llamando', res); })
            .catch(function (err) { return console.log('error de llamada', err); });
    };
    VerDesarrolloPage.prototype.mensajear = function () {
        var modal = document.getElementById("modal");
        //let span = document.getElementsByClassName("close");
        modal.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
        /*this.emailComposer.isAvailable().then((available: boolean) => {
          if(available){
            console.log('disponible');
          }
        });
    
        let email = {
          to: 'crhis.vazquez@gmail.com',
          cc: 'jorgesdfgfdg@gmail.com',
          bcc: ['john@doe.com', 'jane@doe.com'],
          subject: 'Cordova Icons',
          body: 'How are you? Nice greetings from Leipzig',
          isHtml: true
        };
    
        this.emailComposer.open(email);*/
    };
    VerDesarrolloPage.prototype.enviarCorreo = function () {
        var _this = this;
        if (this.fMail.value.nombre == "") {
            this.errorM = true;
        }
        if (this.fMail.value.telefono == "") {
            this.errorM = true;
        }
        if (this.fMail.value.correo == "") {
            this.errorM = true;
        }
        if (this.fMail.value.comentario == "") {
            this.errorM = true;
        }
        if (this.fMail.value.apellido == "") {
            this.errorM = true;
        }
        if (!this.errorM) {
            this.comentarios = {
                'contacto': 25,
                'nombre': this.fMail.value.nombre,
                'ap_paterno': this.fMail.value.apellido,
                'cel': this.fMail.value.telefono,
                'email': this.fMail.value.correo,
                'comentarios': this.fMail.value.comentario,
                'office': this.usuarioProvider.companyOffice,
                'creatorid': this.usuarioProvider.companyid,
                'user': this.usuarioProvider.companyUser,
                'companyid': this.usuarioProvider.companyUser,
                'online': 1,
                'sedMailApp': true
            };
            this.comentariosMail = {
                'development': this.datos.folio,
                'name': this.fMail.value.nombre,
                'email': this.fMail.value.correo,
                'phone': this.fMail.value.telefono,
                'message': this.fMail.value.comentario
            };
            var promise = this.usuarioProvider.agregarPreregistro(this.comentarios);
            promise.subscribe(function (data) {
                if (data.status == 200) {
                    var promiseMail = _this.usuarioProvider.enviarDesarrolloMail(_this.comentariosMail);
                    promiseMail.subscribe(function (data) {
                        _this.cerrarModal();
                    });
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Exitoso',
                        message: 'El envio del correo fue exitoso',
                        buttons: [
                            {
                                text: 'ok',
                                role: 'cancel'
                            }
                        ]
                    });
                    alert_1.present();
                    /*var promise2 = this.usuarioProvider.guardarMailDB(this.datosMailDB);
                    promise2.subscribe(data=>{
                      console.log(data);
                    })*/
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'problema',
                        message: 'Hubo un problema en el envio del correo',
                        buttons: [
                            {
                                text: 'ok',
                                role: 'cancel'
                            }
                        ]
                    });
                    alert_2.present();
                }
            });
        }
    };
    VerDesarrolloPage.prototype.cerrarModal = function () {
        var modal = document.getElementById("modal");
        modal.style.display = "none";
        modal = document.getElementById("modalImagen");
        modal.style.display = "none";
    };
    // imo300px.png
    VerDesarrolloPage.prototype.loadMap = function () {
        if (this.datos.latitude == '0' && this.datos.longitude == '0') {
            this.mapView = false;
        }
        else {
            this.mapView = true;
            this.mapstyle = [{
                    featureType: "poi.business",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                }];
            var LatLng = new google.maps.LatLng(this.mapLat, this.mapLong);
            this.mapProp = {
                streetViewControl: false,
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                setMyLocationEnabled: false,
                setCompassEnabled: true,
                styles: this.mapstyle,
                zoom: 14,
                center: LatLng
            };
            var mapEle = document.getElementById('mapa');
            this.map = new google.maps.Map(mapEle, this.mapProp);
            new google.maps.Marker({ position: LatLng, map: this.map, title: '' });
        }
        this.geolocation.getCurrentPosition().then(function (resp) {
        }).catch(function (error) {
        });
        var watch = this.geolocation.watchPosition();
        watch.subscribe(function (data) {
            // data can be a set of coordinates, or an error (if an error occurred).
            // data.coords.latitude
            // data.coords.longitude
        });
    };
    //setDirections(address){
    //}
    VerDesarrolloPage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 80;
        this.ref.detectChanges();
    };
    VerDesarrolloPage.prototype.sharingwhats = function () {
        this.socialSharing.shareViaWhatsAppToReceiver('4921730905', 'hola, ', '', '');
    };
    VerDesarrolloPage.prototype.presentPopover = function (myEvent) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_10__index_paginas__["k" /* GeneralFormPage */], { 'id': 'pop' }, { cssClass: 'content-popover' });
        popover.present();
        popover.onDidDismiss(function (data) {
            if (data.data != null && data.name) {
                var loader = _this.loadingCtrl.create({
                    dismissOnPageChange: false
                });
                loader.present();
                var promise = _this.propiedadesProvider.compartirDesarrollo(_this.datos.folio, _this.idUsuario, '', data.name, data.data);
                promise.subscribe(function (data) {
                    if (data.status = 200) {
                        setTimeout(function () {
                            loader.dismiss();
                        }, 1000);
                        var alerta_1 = _this.alertCtrl.create({
                            title: 'ENVIADO',
                            subTitle: 'La información del desarrollo a sido enviado',
                            buttons: ['ok']
                        });
                        setTimeout(function () {
                            alerta_1.present();
                            _this.navCtrl.pop();
                        }, 1000);
                    }
                    else {
                        setTimeout(function () {
                            loader.dismiss();
                        }, 1000);
                        var alerta_2 = _this.alertCtrl.create({
                            title: 'ERROR',
                            subTitle: 'intente mas tarde',
                            buttons: ['ok']
                        });
                        setTimeout(function () {
                            alerta_2.present();
                            _this.navCtrl.pop();
                        }, 1000);
                    }
                });
            }
        });
    };
    VerDesarrolloPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_8__angular_core__["m" /* Component */])({
            selector: 'page-ver-desarrollo',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\ver-desarrollo\ver-desarrollo.html"*/'\n\n<ion-header shadow no-border [class.opaque]="showToolbar">\n\n\n\n    <ion-navbar color="header">\n\n      <ion-title [hidden]="!showToolbar">Desarrollo</ion-title>\n\n    </ion-navbar>\n\n    \n\n  </ion-header>\n\n  \n\n  \n\n  <ion-content fullscreen class="fondo">\n\n      <!--<div class="slider">-->\n\n        <ion-card style="margin: 0px 0px 15px 0px !important; width: 100%;">\n\n          <ion-card-header style="padding: 0px 0px 5px 0px">\n\n            <ion-slides style="max-height: 190px;" loop="true" slidesPerView="1">\n\n  \n\n              <ion-slide style="max-height: 190px; width: 100%;" *ngFor="let slide of slider">\n\n                <img style="height: auto;" src="{{slide.largefile}}" imageViewer />\n\n              </ion-slide>\n\n            </ion-slides>\n\n          </ion-card-header>\n\n      <!--</div>-->\n\n      \n\n          <ion-card-content style="padding-top: 10px;">\n\n          <!--<ion-card-header>-->\n\n            <h6 style="margin: auto; text-align: center; margin-bottom: 5px;">{{datos.develomentNameSpa}}</h6>\n\n          <!--</ion-card-header>-->\n\n          \n\n            <div>\n\n              <div class="description">\n\n                  <p style="margin-bottom: 10px">Descripción</p>\n\n                  <p class="texto">{{datos.descriptionEs}}</p><br><br>\n\n              </div>\n\n              <div>\n\n                <p style="font-size: 11px"></p>\n\n              </div>\n\n              <ion-list>\n\n                <ion-item class="lista">\n\n                    <ion-icon ios="ios-attach" md="md-attach" item-start style="font-size: 20px;"></ion-icon>\n\n                    <p class="texto">Folio: {{datos.folio}}</p>\n\n                </ion-item>\n\n                <ion-item *ngIf="datos.priceFrom != 0 && $_SESSION" class="lista">\n\n                    <ion-icon ios="ios-pricetag-outline" md="ios-pricetag-outline" item-start style="font-size: 20px"></ion-icon>\n\n                    <p class="texto">Desde: {{datos.priceFrom}}</p>\n\n                </ion-item>\n\n                <ion-item class="lista" text-wrap>\n\n                    <ion-icon ios="ios-pin-outline" md="ios-pin-outline" item-start style="font-size: 20px"></ion-icon>\n\n                    <p class="texto">{{datos.location}} <br/> {{datos.address}}</p>\n\n                </ion-item>\n\n                <ion-item *ngIf="datos.bathTo != 0" class="lista">\n\n                    <ion-icon ios="ios-bookmark-outline" md="md-bookmark" item-start style="font-size: 20px"></ion-icon>\n\n                    <p class="texto">Desde: {{datos.m2cFrom}} m<SUP>2</SUP> - Hasta: {{datos.m2cTo}} m<SUP>2</SUP></p>\n\n                </ion-item>\n\n                <ion-item *ngIf="datos.bedTo != 0" class="lista">\n\n                    <ion-icon ios="ios-checkmark-outline" md="md-checkmark" item-start style="font-size: 20px"></ion-icon>\n\n                    <p class="texto">Cuartos: desde {{datos.bedFrom}} - Hasta {{datos.bedTo}}</p>\n\n                </ion-item>\n\n                <ion-item *ngIf="datos.bathTo != 0" class="lista">\n\n                    <ion-icon ios="ios-checkmark-outline" md="md-checkmark" item-start style="font-size: 20px"></ion-icon>\n\n                    <p class="texto">Baños: DESDE {{datos.bathFrom}} - Hasta {{datos.bathTo}}</p>\n\n                </ion-item>\n\n                <ion-item *ngIf="datos.parking != 0" class="lista">\n\n                    <ion-icon ios="ios-car-outline" md="ios-car-outline" item-start style="font-size: 20px;"></ion-icon>\n\n                    <p class="texto">Estacionamientos: {{datos.parking}}</p>\n\n                </ion-item>\n\n                <ion-item *ngIf="datos.parking == 0" class="lista">\n\n                    <ion-icon ios="ios-car-outline" md="ios-car-outline" item-start style="font-size: 20px;"></ion-icon>\n\n                    <p class="texto">Eestacionamientos: No disponible</p>\n\n                </ion-item>\n\n                <ion-item class="lista">\n\n                    <ion-icon ios="ios-home-outline" md="ios-home-outline" item-start style="font-size: 20px;"></ion-icon>\n\n                    <p class="texto">Unidades totales: {{datos.units}}</p>\n\n                </ion-item>\n\n                <ion-item class="lista">\n\n                    <ion-icon ios="ios-home-outline" md="ios-home-outline" item-start style="font-size: 20px;"></ion-icon>\n\n                    <p class="texto">Unidades vendidas: {{datos.soldUnits}}</p>\n\n                </ion-item>\n\n                <ion-item *ngIf="datos.unitsAviable > 0" class="lista">\n\n                    <ion-icon ios="ios-home-outline" md="ios-home-outline" item-start style="font-size: 20px;"></ion-icon>\n\n                    <p class="texto">Unidades disponibles: {{datos.unitsAviable}}</p>\n\n                </ion-item>\n\n              </ion-list>\n\n            </div>\n\n          </ion-card-content>\n\n        </ion-card>\n\n        <div>\n\n\n\n            <div *ngIf="mapView == true" style="width: 100%;   height: 180px;" id="mapa">\n\n\n\n              </div>\n\n\n\n        </div>\n\n\n\n\n\n\n\n        <div class="contenedor">\n\n  \n\n          <div>\n\n              <ion-card *ngIf="servicios != null || amenidades != null" style="margin: 0px 0px 15px 0px !important; width: 100%;">\n\n                  <div padding>\n\n                      <ion-segment [(ngModel)]="tipo">\n\n                        <ion-segment-button *ngIf="servicios != undefined" value="servicios">\n\n                          Servicios\n\n                        </ion-segment-button>\n\n                        <ion-segment-button *ngIf="amenidades != undefined" value="amenidades">\n\n                          Amenidades\n\n                        </ion-segment-button>\n\n                      </ion-segment>\n\n                    </div>\n\n  \n\n                    <div [ngSwitch]="tipo">\n\n                        <ion-list *ngSwitchCase="\'servicios\'">\n\n                          <ion-item>\n\n                              <div class="caracteristicas">\n\n                                <div *ngFor="let servicio of servicios" class="caracteristica">\n\n                                    <p class="texto"><ion-icon ios="ios-checkmark-outline" md="ios-checkmark-outline"></ion-icon>  {{servicio}}</p>\n\n                                </div>\n\n                              </div>\n\n                          </ion-item>\n\n                        </ion-list>\n\n                      \n\n                        <ion-list *ngSwitchCase="\'amenidades\'">\n\n                          <ion-item>\n\n                              <div class="caracteristicas">\n\n                                <div *ngFor="let amenidad of amenidades" class="caracteristica">\n\n                                    <p class="texto"><ion-icon ios="ios-checkmark-outline" md="ios-checkmark-outline"></ion-icon>  {{amenidad}}</p>\n\n                                </div>\n\n                              </div>\n\n                          </ion-item>\n\n                        </ion-list>\n\n                      </div>\n\n              </ion-card>\n\n                \n\n              <ion-card class="o_row" style="margin: 0px 0px 0px 0px !important; width: 100%;">\n\n                \n\n                  <ion-avatar item-start style="width: 55px; height: 55px; margin: 10px 8px 0px 8px">\n\n                    <img src="assets/imgs/user.png" style="margin-right: 20px;">\n\n                  </ion-avatar>                \n\n                \n\n                <div style="width: 80%; padding-top: 10px; margin-left: 5px;">\n\n                  <p style="font-size: 10px;">{{agenteNombre}}</p>\n\n                  <p style="font-size: 10px;">{{agenteMail}}</p>\n\n                </div>\n\n                <div class="o_row1">\n\n                  <div (click)="llamar(agente.cellphone)" style="margin-right: 20px; margin-top: 15px;">\n\n                    <ion-icon style="font-size: 25px;" name="call"></ion-icon>\n\n                  </div>\n\n                  <div (click)="mensajear()" style="margin-right: 20px; margin-top: 15px;">\n\n                    <ion-icon style="font-size: 25px;" name="mail"></ion-icon>\n\n                  </div>\n\n                  <div (click)="sharingwhats()" style="margin-right: 20px; margin-top: 15px;">\n\n                      <ion-icon style="font-size: 25px" name="logo-whatsapp"></ion-icon>\n\n                  </div>\n\n                </div>\n\n              </ion-card>\n\n          </div>\n\n  \n\n  \n\n  \n\n      </div>\n\n      <ion-fab right top>\n\n          <button ion-fab mini color="tabs"><ion-icon name="md-share"></ion-icon></button>\n\n          <ion-fab-list side="down">\n\n            <button ion-fab mini (click)="compartir(\'facebook\', datos.folio)"><ion-icon name="logo-facebook"></ion-icon></button>\n\n            <button ion-fab mini (click)="compartir(\'twitter\', datos.folio)"><ion-icon name="logo-twitter"></ion-icon></button>\n\n            <button ion-fab mini (click)="compartir(\'whatsapp\', datos.folio)"><ion-icon name="logo-whatsapp"></ion-icon></button>\n\n            <button ion-fab mini (click)="compartir(\'instagram\', datos.folio)"><ion-icon name="logo-instagram"></ion-icon></button>\n\n            <button ion-fab mini (click)="compartir(\'pinterest\', datos.folio)"><ion-icon name="logo-pinterest"></ion-icon></button>\n\n            <!--<button ion-fab mini (click)="presentPopover($event)"><ion-icon ios="ios-mail" md="md-mail"></ion-icon></button>-->\n\n          </ion-fab-list>\n\n        </ion-fab>\n\n  </ion-content>\n\n  \n\n  <div id="modal" class="modal">\n\n    <div class="modal-content">\n\n      <span class="close" (click)="cerrarModal($event)">&times;</span>\n\n      <form (ngSubmit)="enviarCorreo()" [formGroup]="fMail">\n\n        <ion-item>\n\n          <ion-label style="font-size: 13px" floating>Nombre</ion-label>\n\n          <ion-input style="height: 26px; margin: 0px;" name="nombre" formControlName="nombre" type="text"></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label style="font-size: 13px" floating>Apellido</ion-label>\n\n          <ion-input style="height: 26px; margin: 0px;" name="apellido" formControlName="apellido" type="text"></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label style="font-size: 13px" floating>Telefono</ion-label>\n\n          <ion-input style="height: 26px;" name="telefono" formControlName="telefono" type="text"></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label style="font-size: 13px" floating>Correo Electronico</ion-label>\n\n          <ion-input style="height: 26px;" name="correo" formControlName="correo" type="email"></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label style="font-size: 13px" floating>Comentario</ion-label>\n\n          <ion-textarea style="height: 60px;" name="comentario" formControlName="comentario" type="text"></ion-textarea>\n\n        </ion-item>\n\n        <button style="height: 25px;" ion-button round type="submit">enviar</button>\n\n      </form>\n\n    </div>\n\n  </div>\n\n\n\n  <div id="modalImagen" class="modalImagen">\n\n      <span class="close" (click)="cerrarModal()">&times;</span>\n\n    <!--<ion-slides style="height: 100%;">\n\n  \n\n      <ion-slide style="height: 100%;" *ngFor="let slide of slider">\n\n        <img style="width: 100%; height: 100%;" (click)="verImagen(slide.largefile)" src="{{slide.largefile}}" />\n\n      </ion-slide>\n\n    </ion-slides>-->\n\n    <img src="{{ImagenSlide}}" alt="">\n\n  </div>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\ver-desarrollo\ver-desarrollo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_3__node_modules_ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_4__providers_propiedades_propiedades__["a" /* PropiedadesProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["t" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_7__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_8__angular_core__["j" /* ChangeDetectorRef */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["u" /* PopoverController */]])
    ], VerDesarrolloPage);
    return VerDesarrolloPage;
}());

//# sourceMappingURL=ver-desarrollo.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerPropiedadPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_ionic_native_email_composer__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_propiedades_propiedades__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_usuario_usuario__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__index_paginas__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var VerPropiedadPage = /** @class */ (function () {
    function VerPropiedadPage(navCtrl, navParams, socialSharing, callNumber, emailComposer, propiedadesProvider, storage, plt, formBuilder, usuarioProvider, alertCtrl, ref, geolocation, loadingCtrl, popoverCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socialSharing = socialSharing;
        this.callNumber = callNumber;
        this.emailComposer = emailComposer;
        this.propiedadesProvider = propiedadesProvider;
        this.storage = storage;
        this.plt = plt;
        this.formBuilder = formBuilder;
        this.usuarioProvider = usuarioProvider;
        this.alertCtrl = alertCtrl;
        this.ref = ref;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.popoverCtrl = popoverCtrl;
        this.mapView = true;
        this.datos = [];
        this.agente = [];
        this.slider = [];
        this.tipo = 'interiores';
        this.comentarios = {};
        this.comentariosMail = {};
        this.idUsuario = null;
        this.precios = {};
        this.operacion = {};
        this.exteriores = [];
        this.interiores = [];
        this.aux = {};
        this.aux2 = {};
        this.URL = '';
        this.errorM = false;
        this.datosMailDB = {};
        this.showToolbar = false;
        this.dataSession = {};
        if (this.interiores != undefined) {
            this.tipo = 'interiores';
        }
        else if (this.exteriores != undefined) {
            this.tipo = 'exteriores';
        }
        this.fMail = this.formBuilder.group({
            nombre: ['', __WEBPACK_IMPORTED_MODULE_7__angular_forms__["g" /* Validators */].required],
            apellido: ['', __WEBPACK_IMPORTED_MODULE_7__angular_forms__["g" /* Validators */].required],
            telefono: ['', __WEBPACK_IMPORTED_MODULE_7__angular_forms__["g" /* Validators */].required],
            correo: ['', [__WEBPACK_IMPORTED_MODULE_7__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_7__angular_forms__["g" /* Validators */].email]],
            comentario: ['', __WEBPACK_IMPORTED_MODULE_7__angular_forms__["g" /* Validators */].required]
        });
        this.geolocation.getCurrentPosition().then(function (resp) {
        }).catch(function (error) {
        });
        var watch = this.geolocation.watchPosition();
        watch.subscribe(function (data) {
            // data can be a set of coordinates, or an error (if an error occurred).
            // data.coords.latitude
            // data.coords.longitude
        });
        this.storage.get('usuario').then(function (data) {
            _this.idUsuario = data;
        });
    }
    VerPropiedadPage.prototype.ionViewWillEnter = function () {
        //console.log('ionViewDidLoad VerPropiedadPage');
        var _this = this;
        this.folio = this.navParams.get('index');
        var promise = this.propiedadesProvider.cargarPropiedad(this.folio);
        promise.subscribe(function (data) {
            _this.datos = data.json().data;
            _this.mapLat = _this.datos.latitude;
            _this.mapLong = _this.datos.longitude;
            _this.precios = _this.datos.prices;
            _this.operacion = _this.datos.operation;
            if (_this.operacion.sold)
                _this.operacion.sold = _this.operacion.sold.toUpperCase();
            if (_this.operacion.opportunity_sold)
                _this.operacion.opportunity_sold = _this.operacion.opportunity_sold.toUpperCase();
            if (_this.operacion.rent)
                _this.operacion.rent = _this.operacion.rent.toUpperCase();
            if (_this.operacion.vacation_rent)
                _this.operacion.vacation_rent = _this.operacion.vacation_rent.toUpperCase();
            _this.agente = data.json().data.agent;
            _this.slider = data.json().data.images;
            _this.servicios = data.json().data;
            _this.servicios = data.json().data.services;
            _this.amenidades = data.json().data.amenities;
            //this.exteriores = data.json().data.exterior;
            _this.aux2 = data.json().data.exterior;
            for (var key in _this.aux2) {
                _this.exteriores.push(_this.aux2[key]);
            }
            _this.aux = data.json().data.interiores;
            for (var key in _this.aux) {
                _this.interiores.push(_this.aux[key]);
            }
            _this.loadMap();
            _this.URL = 'http://www.santarita.immosystem.com.mx/propiedad-' + _this.datos.folio;
            var urlParam = _this.datos.propertyNameEs.split(" ");
            /*urlParam.array.forEach(element => {
              this.URL += '-' + element;
            });*/
            for (var _i = 0, urlParam_1 = urlParam; _i < urlParam_1.length; _i++) {
                var data_1 = urlParam_1[_i];
                _this.URL += '-' + data_1;
            }
            _this.storage.get('data').then(function (data) {
                _this.dataSession = data;
                if (data == null) {
                    _this.agenteNombre = _this.agente.fullname;
                    _this.agenteMail = _this.agente.email;
                }
                else {
                    _this.agenteNombre = _this.dataSession.fullname;
                    _this.agenteMail = _this.dataSession.email;
                }
            });
        });
        //console.log(this.datos);
    };
    VerPropiedadPage.prototype.compartir = function (plataforma, folio) {
        var _this = this;
        this.URL += folio;
        this.plt.ready().then(function () {
            if (_this.plt.is('android')) {
                if (plataforma == 'facebook') {
                    _this.socialSharing.shareViaFacebook(null, null, _this.URL);
                }
                else if (plataforma == 'twitter') {
                    _this.socialSharing.shareViaTwitter(null, null, _this.URL);
                }
                else if (plataforma == 'whatsapp') {
                    _this.socialSharing.shareViaWhatsApp(null, null, _this.URL);
                }
                else if (plataforma == 'instagram') {
                    _this.socialSharing.shareViaInstagram(_this.URL, _this.slider[0].largefile);
                }
                else if (plataforma == 'pinterest') {
                    _this.socialSharing.shareVia('com.pinterest', null, null, null, _this.URL);
                }
                else if (plataforma == 'googleplus') {
                    _this.socialSharing.shareVia('com.google.android.apps.plus', _this.URL, null, null);
                }
            }
            else {
                if (plataforma == 'facebook') {
                    _this.socialSharing.shareViaFacebookWithPasteMessageHint('hola!', null, _this.URL);
                }
                else if (plataforma == 'twitter') {
                    _this.socialSharing.shareViaTwitter('twitter a compartir');
                }
                else if (plataforma == 'whatsapp') {
                    _this.socialSharing.shareViaWhatsApp('mensaje')
                        .then(function () {
                    }).catch(function () {
                    });
                }
                else if (plataforma == 'instagram') {
                    _this.socialSharing.shareViaInstagram('compartir', 'œremtur');
                }
                else if (plataforma == 'pinterest') {
                    _this.socialSharing.share('', '');
                }
                else if (plataforma == 'googleplus') {
                    _this.socialSharing.shareWithOptions({
                        message: 'titulo'
                    });
                }
            }
        });
    };
    VerPropiedadPage.prototype.llamar = function (num) {
        this.callNumber.callNumber(num, true)
            .then(function (res) { return console.log('llamando', res); })
            .catch(function (err) { return console.log('error de llamada', err); });
    };
    VerPropiedadPage.prototype.mensajear = function () {
        var modal = document.getElementById("modal");
        modal.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
        /*this.emailComposer.isAvailable().then((available: boolean) => {
          if(available){
            console.log('disponible');
          }
        });
    
        let email = {
          to: 'crhis.vazquez@gmail.com',
          cc: 'jorgesdfgfdg@gmail.com',
          bcc: ['john@doe.com', 'jane@doe.com'],
          subject: 'Cordova Icons',
          body: 'How are you? Nice greetings from Leipzig',
          isHtml: true
        };
    
        this.emailComposer.open(email);*/
    };
    VerPropiedadPage.prototype.enviarCorreo = function () {
        var _this = this;
        if (this.fMail.value.nombre == "") {
            this.errorM = true;
        }
        if (this.fMail.value.telefono == "") {
            this.errorM = true;
        }
        if (this.fMail.value.correo == "") {
            this.errorM = true;
        }
        if (this.fMail.value.comentario == "") {
            this.errorM = true;
        }
        if (this.fMail.value.apellido == "") {
            this.errorM = true;
        }
        if (!this.errorM) {
            this.comentarios = {
                'contacto': 25,
                'nombre': this.fMail.value.nombre,
                'ap_paterno': this.fMail.value.apellido,
                'cel': this.fMail.value.telefono,
                'email': this.fMail.value.correo,
                'comentarios': this.fMail.value.comentario,
                'creatorid': 1994,
                'user': 1994,
                'companyid': this.usuarioProvider.companyid,
                'online': 1,
                'sendMailApp': true
            };
            this.comentariosMail = {
                'property': this.datos.folio,
                'name': this.fMail.value.nombre,
                'email': this.fMail.value.correo,
                'phone': this.fMail.value.telefono,
                'message': this.fMail.value.comentario
            };
            var promise = this.usuarioProvider.agregarPreregistro(this.comentarios);
            promise.subscribe(function (data) {
                if (data.status == 200) {
                    var promiseMail = _this.usuarioProvider.enviarPropiedadMail(_this.comentariosMail);
                    promiseMail.subscribe(function (data) {
                    });
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Exitoso',
                        message: 'El envio del correo fue exitoso',
                        buttons: [
                            {
                                text: 'ok',
                                role: 'cancel'
                            }
                        ]
                    });
                    alert_1.present();
                    /*var promise2 = this.usuarioProvider.guardarMailDB(this.datosMailDB);
                    promise2.subscribe(data=>{
                      console.log(data);
                    })*/
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'problema',
                        message: 'Hubo un problema en el envio del correo',
                        buttons: [
                            {
                                text: 'ok',
                                role: 'cancel'
                            }
                        ]
                    });
                    alert_2.present();
                }
            });
        }
    };
    VerPropiedadPage.prototype.cerrarModal = function () {
        var modal = document.getElementById("modal");
        modal.style.display = "none";
        modal = document.getElementById("modalImagen");
        modal.style.display = "none";
    };
    VerPropiedadPage.prototype.loadMap = function () {
        if (this.datos.latitude == '0' && this.datos.longitude == '0') {
            this.mapView = false;
        }
        else {
            this.mapView = true;
            this.mapstyle = [{
                    featureType: "poi.business",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                }];
            var LatLng = new google.maps.LatLng(this.datos.latitude, this.datos.longitude);
            this.mapProp = {
                streetViewControl: false,
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                setMyLocationEnabled: false,
                setCompassEnabled: true,
                styles: this.mapstyle,
                zoom: 14,
                center: LatLng
            };
            var mapEle = document.getElementById('mapa');
            this.map = new google.maps.Map(mapEle, this.mapProp);
            new google.maps.Marker({ position: LatLng, map: this.map, title: '' });
        }
    };
    VerPropiedadPage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 80;
        this.ref.detectChanges();
    };
    VerPropiedadPage.prototype.sharingwhats = function () {
        this.socialSharing.shareViaWhatsAppToReceiver('4921730905', 'hola, ', '', '');
    };
    VerPropiedadPage.prototype.presentPopover = function (myEvent) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_10__index_paginas__["k" /* GeneralFormPage */], { 'id': 'pop' }, { cssClass: 'content-popover' });
        popover.present();
        popover.onDidDismiss(function (data) {
            if (data.data != null && data.name) {
                var loader = _this.loadingCtrl.create({
                    dismissOnPageChange: false
                });
                loader.present();
                var promise = _this.propiedadesProvider.compartirPropiedad(_this.datos.folio, _this.idUsuario, '', data.name, data.data);
                promise.subscribe(function (data) {
                    if (data.status = 200) {
                        setTimeout(function () {
                            loader.dismiss();
                        }, 1000);
                        var alerta_1 = _this.alertCtrl.create({
                            title: 'ENVIADO',
                            subTitle: 'La información del desarrollo a sido enviado',
                            buttons: ['ok']
                        });
                        setTimeout(function () {
                            alerta_1.present();
                            _this.navCtrl.pop();
                        }, 1000);
                    }
                    else {
                        setTimeout(function () {
                            loader.dismiss();
                        }, 1000);
                        var alerta_2 = _this.alertCtrl.create({
                            title: 'ERROR',
                            subTitle: 'intente mas tarde',
                            buttons: ['ok']
                        });
                        setTimeout(function () {
                            alerta_2.present();
                            _this.navCtrl.pop();
                        }, 1000);
                    }
                });
            }
        });
    };
    VerPropiedadPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ver-propiedad',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\ver-propiedad\ver-propiedad.html"*/'<ion-header no-border>\n\n\n\n  <ion-navbar color="header">\n\n    <ion-title>Propiedad</ion-title>\n\n  </ion-navbar>\n\n  \n\n</ion-header>\n\n\n\n\n\n<ion-content fullscreen class="fondo">\n\n    <!--<div class="slider">-->\n\n      <ion-card style="margin: 0px 0px 15px 0px !important; width: 100%;">\n\n        <ion-card-header style="padding: 0px 0px 5px 0px">\n\n          <ion-slides style="max-height: 300px;" loop="true" slidesPerView="1">\n\n            <ion-slide style="max-height: 300px;" *ngFor="let slide of slider">\n\n              <img style="height: auto;" src="{{slide.largefile}}" class="thumb-img" imageViewer />\n\n            </ion-slide>\n\n          </ion-slides>\n\n        </ion-card-header>\n\n    <!--</div>-->\n\n    \n\n        <ion-card-content style="padding-top: 10px;">\n\n        <!--<ion-card-header>-->\n\n          <h6 style="margin: auto; text-align: center; margin-bottom: 5px;">{{datos.propertyNameEs}}</h6>\n\n        <!--</ion-card-header>-->\n\n        \n\n          <div>\n\n            <div>\n\n              <p style="font-size: 11px"></p>\n\n            </div>\n\n            <ion-list>\n\n              <ion-item class="lista">\n\n                <ion-icon ios="ios-attach" md="md-attach" item-start style="font-size: 20px"></ion-icon>\n\n                  <p class="texto">Folio: {{datos.folio}}</p>\n\n              </ion-item>\n\n              <ion-item *ngIf="precios.opportunity_sold != 0 && $_SESSION" class="lista">\n\n                <ion-icon ios="ios-pricetag-outline" md="ios-pricetag-outline" item-start style="font-size: 20px"></ion-icon>\n\n                  <p class="texto">{{operacion.opportunity_sold}}: {{precios.opportunity_sold}}</p>\n\n              </ion-item>\n\n              <ion-item *ngIf="precios.sold != 0 && $_SESSION" class="lista">\n\n                <ion-icon ios="ios-pricetag-outline" md="ios-pricetag-outline" item-start style="font-size: 20px"></ion-icon>\n\n                <p class="texto">{{operacion.sold}}: {{precios.sold}}</p>\n\n              </ion-item>\n\n              <ion-item *ngIf="precios.rent != 0 && $_SESSION" class="lista">\n\n                <ion-icon ios="ios-pricetag-outline" md="ios-pricetag-outline" item-start style="font-size: 20px"></ion-icon>\n\n                <p class="texto">{{operacion.rent}}: {{precios.rent}}</p>\n\n              </ion-item>\n\n              <ion-item *ngIf="precios.opportunity_rent != 0 && $_SESSION" class="lista">\n\n                <ion-icon ios="ios-pricetag-outline" md="ios-pricetag-outline" item-start style="font-size: 20px"></ion-icon>\n\n                <p class="texto">{{operacion.opportunity_rent}}: {{precios.opportunity_rent}}</p>\n\n              </ion-item>\n\n              <ion-item *ngIf="precios.vacation_rent != 0 && $_SESSION" class="lista">\n\n                <ion-icon ios="ios-pricetag-outline" md="ios-pricetag-outline" item-start style="font-size: 20px"></ion-icon>\n\n                <p class="texto">{{operacion.vacation_rent}}: {{precios.vacation_rent}}</p>\n\n              </ion-item>\n\n              <ion-item class="lista">\n\n                <ion-icon ios="ios-pin-outline" md="ios-pin-outline" item-start style="font-size: 20px"></ion-icon>\n\n                  <p class="texto">{{datos.address}}</p>\n\n              </ion-item>\n\n              <ion-item *ngIf="datos.m2c != 0" class="lista">\n\n                  <ion-icon name="ios-checkbox-outline" item-start style="font-size: 20px"></ion-icon>\n\n                  <p class="texto">Metros de construcciòn: {{datos.m2c}} m<SUP>2</SUP></p>\n\n              </ion-item>\n\n              <ion-item *ngIf="datos.mlot != 0" class="lista">\n\n                <ion-icon name="ios-checkbox-outline" item-start style="font-size: 20px"></ion-icon>\n\n                <p class="texto">Tamaño de terreno: {{datos.mlot}} m<SUP>2</SUP></p>\n\n              </ion-item>\n\n              <ion-item *ngIf="datos.bedrooms != 0" class="lista">\n\n                <ion-icon ios="ios-checkmark-outline" md="ios-checkmark-outline" item-start style="font-size: 20px"></ion-icon>\n\n                  <p class="texto">Cuartos: {{datos.bedrooms}}</p>\n\n              </ion-item>\n\n              <ion-item *ngIf="datos.bathrooms != 0" class="lista">\n\n                <ion-icon ios="ios-checkmark-outline" md="ios-checkmark-outline" item-start style="font-size: 20px"></ion-icon>\n\n                  <p class="texto">Baños: {{datos.bathrooms}}</p>\n\n              </ion-item>\n\n            </ion-list>\n\n          </div>\n\n        </ion-card-content>\n\n      </ion-card>\n\n\n\n\n\n      <div>\n\n\n\n        <div *ngIf="mapView == true" style="width: 100%;   height: 180px;" id="mapa">\n\n\n\n          </div>\n\n\n\n    </div>\n\n\n\n\n\n      <div class="contenedor">\n\n\n\n        <div>\n\n            <ion-card *ngIf="interiores != undefined || exteriores != undefined" style="margin: 0px 0px 15px 0px !important; width: 100%;">\n\n                <div padding>\n\n                    <ion-segment [(ngModel)]="tipo">\n\n                      <ion-segment-button *ngIf="interiores != undefined" value="interiores">\n\n                        Interiores\n\n                      </ion-segment-button>\n\n                      <ion-segment-button *ngIf="exteriores != undefined" value="exteriores">\n\n                        Exteriores\n\n                      </ion-segment-button>\n\n                    </ion-segment>\n\n                  </div>\n\n                  <div [ngSwitch]="tipo">\n\n                      <ion-list *ngSwitchCase="\'interiores\'">\n\n                        <ion-item *ngIf="interiores != null">\n\n                            <div class="caracteristicas">\n\n                              <!--<div  class="caracteristica" *ngIf="interiores.ctoServBaño != null">\n\n                                  <p class="texto"><ion-icon name="ios-checkbox-outline">{{interiores.ctoServBaño}}</ion-icon> </p>\n\n                              </div>-->\n\n                              <div *ngFor="let interior of interiores"  class="caracteristica">\n\n                                  <p class="texto"><ion-icon name="ios-checkbox-outline">  {{interior}}</ion-icon> </p>\n\n                              </div>\n\n                            </div>\n\n                        </ion-item>\n\n                      </ion-list>\n\n                      <ion-list *ngSwitchCase="\'exteriores\'">\n\n                        <ion-item *ngIf="exteriores != null">\n\n                            <div class="caracteristicas">\n\n                              <div class="caracteristica" *ngFor="let exterior of exteriores">\n\n                                  <p class="texto"><ion-icon name="ios-checkbox-outline">   {{exterior}}</ion-icon> </p>\n\n                              </div>\n\n                            </div>\n\n                        </ion-item>\n\n                      </ion-list>\n\n                    </div>\n\n              </ion-card>\n\n              \n\n            <ion-card class="o_row" style="margin: 0px 0px 0px 0px !important; width: 100%;">\n\n              \n\n                <ion-avatar item-start style="width: 55px; height: 55px; margin: 10px 8px 0px 8px">\n\n                  <img src="assets/imgs/user.png" style="margin-right: 20px;">\n\n                </ion-avatar>                \n\n              \n\n              <div style="width: 80%; padding-top: 15px; margin-left: 5px;">\n\n                <p style="font-size: 10px;">{{agenteNombre}}</p>\n\n                <p style="font-size: 10px;">{{agenteMail}}</p>\n\n                \n\n              </div>\n\n              <div class="o_row1">\n\n                <div (click)="llamar(agente.cellphone)" style="margin-right: 20px; margin-top: 15px;">\n\n                  <ion-icon style="font-size: 30px;" name="call"></ion-icon>\n\n                </div>\n\n                <div (click)="mensajear()" style="margin-right: 20px; margin-top: 15px;">\n\n                  <ion-icon style="font-size: 30px;" name="mail"></ion-icon>\n\n                </div>\n\n                <div (click)="sharingwhats()" style="margin-right: 20px; margin-top: 15px;">\n\n                  <!--<a href="https://api.whatsapp.com/send?phone={{agente.cellphone}}">--><ion-icon style="font-size: 25px" name="logo-whatsapp"></ion-icon><!--</a>-->\n\n                </div>\n\n              </div>\n\n            </ion-card>\n\n        </div>\n\n\n\n\n\n\n\n    </div>\n\n    <ion-fab right top>\n\n        <button ion-fab mini color="tabs"><ion-icon name="md-share"></ion-icon></button>\n\n        <ion-fab-list side="down">\n\n          <button ion-fab mini (click)="compartir(\'facebook\', folio)"><ion-icon name="logo-facebook"></ion-icon></button>\n\n          <button ion-fab mini (click)="compartir(\'twitter\', folio)"><ion-icon name="logo-twitter"></ion-icon></button>\n\n          <button ion-fab mini (click)="compartir(\'whatsapp\', folio)"><ion-icon name="logo-whatsapp"></ion-icon></button>\n\n          <button ion-fab mini (click)="compartir(\'instagram\', folio)"><ion-icon name="logo-instagram"></ion-icon></button>\n\n          <button ion-fab mini (click)="compartir(\'pinterest\', folio)"><ion-icon name="logo-pinterest"></ion-icon></button>\n\n          <!--<button ion-fab mini (click)="presentPopover($event)"><ion-icon ios="ios-mail" md="md-mail"></ion-icon></button>-->\n\n        </ion-fab-list>\n\n      </ion-fab>\n\n</ion-content>\n\n\n\n<div id="modal" class="modal">\n\n  <div class="modal-content">\n\n    <span class="close" (click)="cerrarModal($event)">&times;</span>\n\n    <form (ngSubmit)="enviarCorreo()" [formGroup]="fMail">\n\n      <ion-item>\n\n        <ion-label style="font-size: 13px" floating>Nombre</ion-label>\n\n        <ion-input style="height: 26px; margin: 0px;" name="nombre" formControlName="nombre" type="text"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label style="font-size: 13px" floating>Apellido</ion-label>\n\n        <ion-input style="height: 26px; margin: 0px;" name="apellido" formControlName="apellido" type="text"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label style="font-size: 13px" floating>Telefono</ion-label>\n\n        <ion-input style="height: 26px;" name="telefono" formControlName="telefono" type="text"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label style="font-size: 13px" floating>Correo Electronico</ion-label>\n\n        <ion-input style="height: 26px;" name="correo" formControlName="correo" type="email"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label style="font-size: 13px" floating>Comentario</ion-label>\n\n        <ion-textarea style="height: 60px;" name="comentario" formControlName="comentario" type="text"></ion-textarea>\n\n      </ion-item>\n\n      <button style="height: 25px;" ion-button round type="submit">enviar</button>\n\n    </form>\n\n  </div>\n\n</div>\n\n\n\n<div id="modalImagen" class="modalImagen">\n\n  <span class="close" (click)="cerrarModal()">&times;</span>\n\n<!--<ion-slides style="height: 100%;">\n\n\n\n  <ion-slide style="height: 100%;" *ngFor="let slide of slider">\n\n    <img style="width: 100%; height: 100%;" (click)="verImagen(slide.largefile)" src="{{slide.largefile}}" />\n\n  </ion-slide>\n\n</ion-slides>-->\n\n<img src="{{ImagenSlide}}" alt="">\n\n</div>'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\ver-propiedad\ver-propiedad.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_4__node_modules_ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_5__providers_propiedades_propiedades__["a" /* PropiedadesProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_8__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* PopoverController */]])
    ], VerPropiedadPage);
    return VerPropiedadPage;
}());

//# sourceMappingURL=ver-propiedad.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerContactoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_ionic_native_email_composer__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__seguimiento_seguimiento__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__index_paginas__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__general_form_general_form__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_contactos_contactos__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var VerContactoPage = /** @class */ (function () {
    function VerContactoPage(navCtrl, navParams, usuarioProvider, emailComposer, modalCtrl, contactosProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.usuarioProvider = usuarioProvider;
        this.emailComposer = emailComposer;
        this.modalCtrl = modalCtrl;
        this.contactosProvider = contactosProvider;
        this.activo1 = false;
        this.activo2 = false;
        this.activo3 = false;
        this.seccion = "datos";
        this.datos = [];
        this.comentarios = {};
    }
    VerContactoPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        this.contactId = this.navParams.get("id");
        this.tipo = this.navParams.get("tipo");
        if (this.tipo == 'c') {
            var promise = this.contactosProvider.getContactInfo(this.contactId, this.usuarioProvider.datos.id, this.usuarioProvider.datos.userToken);
            promise.subscribe(function (data) {
                _this.datos = data.json().data.visit;
                _this.comentarios = data.json().data.comments;
            });
        }
        else {
            var promise = this.contactosProvider.getReferedContactInfo(this.contactId, this.usuarioProvider.datos.id, this.usuarioProvider.datos.userToken);
            promise.subscribe(function (data) {
                _this.datos = data.json().data.visit;
                _this.comentarios = data.json().data.comments;
            });
        }
    };
    VerContactoPage.prototype.mensajear = function (correo) {
        this.emailComposer.isAvailable().then(function (available) {
            if (available) {
            }
        });
        var email = {
            to: correo,
            cc: '',
            bcc: [],
            subject: 'Asunto',
            body: 'Ingresa el mensaje',
            isHtml: true
        };
        this.emailComposer.open(email);
        /*let modal = document.getElementById("modal");
        //let span = document.getElementsByClassName("close");
    
        modal.style.display = "block";
    
        window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
        }*/
    };
    VerContactoPage.prototype.seguimiento = function () {
        if (this.tipo == 'c') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__seguimiento_seguimiento__["a" /* SeguimientoPage */], { 'contacto': this.datos, 'tipo': this.tipo });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__seguimiento_seguimiento__["a" /* SeguimientoPage */], { 'contacto': this.datos, 'tipo': this.tipo });
        }
    };
    VerContactoPage.prototype.sharing = function (tipo) {
        //if(tipo == 'propiedades'){
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__index_paginas__["t" /* SharingPage */], { 'tipo': tipo, 'nombre': this.datos.nombre + ' ' + this.datos.ap_paterno, 'mail': this.datos.email, 'folio': this.datos.visitid });
        /*}else{
          this.navCtrl.push(SharingPage,{'tipo': tipo, 'nombre': this.datos.nombre, 'mail': this.datos.email, 'folio': this.datos.visitid});
        }*/
    };
    VerContactoPage.prototype.cerrarModal = function () {
        var modal = document.getElementById("modal");
        modal.style.display = "none";
    };
    VerContactoPage.prototype.openForm = function (datos, nombre) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__general_form_general_form__["a" /* GeneralFormPage */], { 'id': this.tipo, 'visitid': datos, 'fullname': nombre });
        modal.present();
    };
    VerContactoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ver-contacto',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\ver-contacto\ver-contacto.html"*/'<!--\n\n  Generated template for the VerContactoPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="header">\n\n    <ion-title>Detalles de contacto</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content class="fondo">\n\n  <div class="contenedor">\n\n    <div class="logo">\n\n      <img width="90" height="90" src="assets/imgs/usuario.png">\n\n    </div>\n\n\n\n    <div padding>\n\n      <ion-segment [(ngModel)]="seccion">\n\n        <ion-segment-button value="datos">\n\n          DATOS\n\n        </ion-segment-button>\n\n        <ion-segment-button value="comentarios">\n\n          SEGUIMIENTOS\n\n        </ion-segment-button>\n\n        <!--<ion-segment-button value="opciones">\n\n          OPCIONES\n\n        </ion-segment-button>-->\n\n      </ion-segment>\n\n    </div>\n\n\n\n\n\n    <div [ngSwitch]="seccion">\n\n      <ion-list *ngSwitchCase="\'datos\'">\n\n        <ion-item class="fondo">\n\n          <p class="titulo">\n\n            <ion-icon ios="ios-contact" md="md-contact"></ion-icon>nombre completo</p>\n\n          <p class="datos">{{datos.nombre}} {{datos.ap_paterno}}\n\n            <span *ngIf="datos.ap_materno">{{datos.ap_materno}}</span>\n\n          </p>\n\n        </ion-item>\n\n        <ion-item class="fondo">\n\n          <p class="titulo">\n\n            <ion-icon ios="ios-calendar" md="md-calendar"></ion-icon>fecha y hora de registro</p>\n\n          <p class="datos">{{datos.createdate}}</p>\n\n        </ion-item>\n\n        <ion-item class="fondo">\n\n          <p class="titulo">\n\n            <ion-icon ios="ios-git-compare" md="md-git-compare"></ion-icon>Asesor reasignado</p>\n\n          <p class="datos" *ngIf="datos.nameAssing != 0">{{datos.nameAssing}}</p>\n\n          <p class="datos" *ngIf="datos.nameAssing == 0">No Disponible</p>\n\n        </ion-item>\n\n        <ion-item class="fondo">\n\n          <p class="titulo">Celular</p>\n\n          <p *ngIf="datos.cellphone != 0" class="datos">{{datos.cellphone}}</p>\n\n          <p *ngIf="datos.cellphone == 0" class="datos">\n\n            <ion-icon ios="ios-call" md="md-call"></ion-icon>No Disponible</p>\n\n          <button *ngIf="datos.cellphone != 0" class="apply" color="greenImmo" clear ion-button icon-only item-end small>\n\n            <ion-icon color="label" name="call"></ion-icon>\n\n            Llamar\n\n          </button>\n\n        </ion-item>\n\n        <ion-item class="fondo">\n\n          <p class="titulo">Nextel</p>\n\n          <p *ngIf="datos.nextel != 0" class="datos">\n\n            <ion-icon ios="ios-radio" md="md-radio"></ion-icon>{{datos.nextel}}</p>\n\n          <p *ngIf="datos.nextel == 0" class="datos">\n\n            <ion-icon ios="ios-radio" md="md-radio"></ion-icon>No Disponible</p>\n\n          <button *ngIf="datos.nextel != 0" class="apply" color="greenImmo" clear ion-button icon-only item-end small>\n\n            <ion-icon color="label" name="call"></ion-icon>\n\n            Llamar\n\n          </button>\n\n        </ion-item>\n\n        <ion-item class="fondo">\n\n          <p class="titulo">primer email</p>\n\n          <p *ngIf="datos.email != 0" class="datos">{{datos.email}}</p>\n\n          <p *ngIf="datos.email == 0" class="datos">No Disponible</p>\n\n          <button (click)="mensajear(datos.email)" *ngIf="datos.email != 0" class="apply" color="greenImmo" clear ion-button icon-only\n\n            item-end small>\n\n            <ion-icon color="label" name="mail"></ion-icon>\n\n            correo\n\n          </button>\n\n        </ion-item>\n\n        <ion-item class="fondo">\n\n          <p class="titulo">segundo email</p>\n\n          <p *ngIf="datos.email2 != 0" class="datos">{{datos.email2}}</p>\n\n          <p *ngIf="datos.email2 == 0" class="datos">No Disponible</p>\n\n          <button (click)="mensajear(datos.email2)" *ngIf="datos.email2 != 0" class="apply" color="greenImmo" clear ion-button icon-only\n\n            item-end small>\n\n            <ion-icon color="label" name="mail"></ion-icon>\n\n            correo\n\n          </button>\n\n        </ion-item>\n\n        <ion-item class="fondo">\n\n          <p class="titulo">Ultimo Seguimiento</p>\n\n          <p class="datos" text-wrap>{{datos.comment}}</p>\n\n          <button (click)="seguimiento()" class="apply" color="greenImmo" clear ion-button icon-only item-end small>\n\n            <ion-icon color="label" name="mail"></ion-icon>\n\n            Nuevo Seguimiento\n\n          </button>\n\n        </ion-item>\n\n        <ion-item class="fondo">\n\n          <p class="titulo">Enviar Flyer de propiedad</p>\n\n          <p class="datos" text-wrap>Envia por correo información de alguna propiedad</p>\n\n          <button (click)="sharing(\'propiedades\')" class="apply" color="greenImmo" clear ion-button icon-only item-end small>\n\n            <ion-icon name="share-alt"></ion-icon>\n\n          </button>\n\n        </ion-item>\n\n        <ion-item class="fondo">\n\n          <p class="titulo">Enviar Broshure de Desarrollo</p>\n\n          <p class="datos" text-wrap>Envia por correo información de algún desarrollo</p>\n\n          <button (click)="sharing(\'desarrollos\')" class="apply" color="greenImmo" clear ion-button icon-only item-end small>\n\n            <ion-icon name="share-alt"></ion-icon>\n\n          </button>\n\n        </ion-item>\n\n      </ion-list>\n\n\n\n      <ion-list *ngSwitchCase="\'comentarios\'">\n\n        <ion-card *ngFor="let comentario of comentarios">\n\n          <ion-card-header>\n\n            <p>\n\n              <ion-icon ios="ios-person" md="md-person"></ion-icon> {{comentario.fullname}}</p>\n\n          </ion-card-header>\n\n          <ion-card-content>\n\n            <p>\n\n              <ion-icon ios="ios-albums" md="md-albums"></ion-icon> DETALLES DE SEGUIMIENTO</p>\n\n            <br>\n\n            <p>{{comentario.comment}}</p>\n\n            <p>\n\n              <ion-icon ios="ios-filing" md="md-filing"></ion-icon>{{comentario.officename}}</p>\n\n            <p>\n\n              <ion-icon ios="ios-calendar" md="md-calendar"></ion-icon>{{comentario.datetime}}</p>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </ion-list>\n\n\n\n      <ion-list *ngSwitchCase="\'opciones\'">\n\n        <ion-item *ngIf="tipo == \'r\'" (click)="openForm(datos.visitid, datos.nombre)">\n\n          <ion-icon name="leaf" item-start></ion-icon>\n\n          Activar visita\n\n          <ion-icon name="checkmark" item-end></ion-icon>\n\n        </ion-item>\n\n        <ion-item *ngIf="tipo == \'c\'" (click)="openForm(datos.visitid, datos.nombre)">\n\n          <ion-icon name="leaf" item-start></ion-icon>\n\n          Convertir a potencial\n\n          <ion-icon name="checkmark" item-end></ion-icon>\n\n        </ion-item>\n\n        <ion-item *ngIf="tipo == \'p\'" (click)="openForm(datos.visitid, datos.nombre)">\n\n          <ion-icon name="leaf" item-start></ion-icon>\n\n          Crear Control de Facturación\n\n          <ion-icon name="checkmark" item-end></ion-icon>\n\n        </ion-item>\n\n      </ion-list>\n\n    </div>\n\n\n\n\n\n\n\n  </div>\n\n  <div id="modal" class="modal">\n\n    <div class="modal-content">\n\n      <span class="close" (click)="cerrarModal()">&times;</span>\n\n      <form (ngSubmit)="enviarCorreo()">\n\n        <ion-item>\n\n          <ion-label style="font-size: 13px" floating>Comentario</ion-label>\n\n          <ion-textarea style="height: 60px;" name="comentario" [(ngModel)]="comentarios.comentario" type="text"></ion-textarea>\n\n        </ion-item>\n\n      </form>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\ver-contacto\ver-contacto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_3__node_modules_ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_contactos_contactos__["a" /* ContactosProvider */]])
    ], VerContactoPage);
    return VerContactoPage;
}());

//# sourceMappingURL=ver-contacto.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuarioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { UsuarioProvider } from '../../providers/usuario/usuario';
//import { Tabs2Page } from '../tabs2/tabs2';
//import { TabsUsuarioPage } from '../tabs-usuario/tabs-usuario';

var UsuarioPage = /** @class */ (function () {
    function UsuarioPage(navCtrl, navParams, events, storage, usuario, statusBar) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.storage = storage;
        this.usuario = usuario;
        this.statusBar = statusBar;
        this.activo1 = false;
        this.activo2 = false;
        this.activo3 = false;
        this.datosUsuario = {};
        this.datos = [];
    }
    UsuarioPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        Promise.all([
            this.usuario.getUserData()
        ]).then(function (data) {
            _this.datosUsuario = data[0];
        });
    };
    UsuarioPage.prototype.ionViewCanEnter = function () {
        this.events.subscribe('user:created', function (data, time) {
        });
        /*this.storage.get('usuario').then(data => {
          if(data == null){
  
          }else{
          }
        });*/
    };
    UsuarioPage.prototype.ionViewDidLoad = function () {
    };
    UsuarioPage.prototype.cerrarSesion = function (user) {
        if (user === void 0) { user = 'cerraste sesion'; }
        this.events.publish('user:logOut', user, Date.now());
        this.storage.set('userToken', null);
        this.storage.set('dataUser', null);
    };
    UsuarioPage.prototype.desplegar = function (seccion) {
        if (seccion == 1) {
            if (this.activo1 == false) {
                var elemento = document.getElementById("seccion1");
                var icono = document.getElementById("icono1").removeAttribute('name');
                icono = document.getElementById("icono1").setAttribute("name", "arrow-up");
                elemento.classList.add("visible");
                elemento.classList.remove("invisible");
                this.activo1 = true;
            }
            else {
                var elemento = document.getElementById("seccion1");
                elemento.classList.add("invisible");
                elemento.classList.remove("visible");
                this.activo1 = false;
            }
        }
        else if (seccion == 2) {
            if (this.activo2 == false) {
                var elemento = document.getElementById("seccion2");
                elemento.classList.add("visible");
                elemento.classList.remove("invisible");
                this.activo2 = true;
            }
            else {
                var elemento = document.getElementById("seccion2");
                elemento.classList.add("invisible");
                elemento.classList.remove("visible");
                this.activo2 = false;
            }
        }
        else if (seccion == 3) {
            if (this.activo3 == false) {
                var elemento = document.getElementById("seccion3");
                elemento.classList.add("visible");
                elemento.classList.remove("invisible");
                this.activo3 = true;
            }
            else {
                var elemento = document.getElementById("seccion3");
                elemento.classList.add("invisible");
                elemento.classList.remove("visible");
                this.activo3 = false;
            }
        }
    };
    UsuarioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-usuario',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\usuario\usuario.html"*/'<ion-content padding>\n\n\n\n    <div class="contenedor">\n\n        <div style="margin-bottom: 10%">\n\n            <div *ngIf="datos.imagen != \'\'" class="logo alinear">\n\n                <img style="border-radius: 50px;" width="90px" src="{{datos.imagen}}">\n\n            </div>\n\n            <div *ngIf="datos.imagen == \'\'" class="logo alinear">\n\n                <img width="90px" src="assets/imgs/user.png">\n\n            </div>\n\n        </div>\n\n        <div>\n\n                <ion-list>\n\n                    <ion-item>\n\n                        <ion-icon item-start ios="ios-person-outline" md="ios-person-outline"></ion-icon>\n\n                        <p style="font-size: 15px;">{{datosUsuario.nombre}}</p>\n\n                    </ion-item>\n\n                    <ion-item *ngIf="datos.celular != 0">\n\n                        <ion-icon item-start ios="ios-phone-portrait-outline" md="ios-phone-portrait-outline"></ion-icon>\n\n                        <p>celular: {{datos.celular}}</p>\n\n                    </ion-item>\n\n                    <ion-item *ngIf="datos.celular == 0">\n\n                        <ion-icon item-start ios="ios-phone-portrait-outline" md="ios-phone-portrait-outline"></ion-icon>\n\n                        <p>celular: no disponible</p>\n\n                    </ion-item>\n\n                    <ion-item *ngIf="datos.telefono != 0">\n\n                        <ion-icon item-start ios="ios-call-outline" md="ios-call-outline"></ion-icon>\n\n                        <p style="font-size: 15px;">Telefono: {{datos.telefono}}</p>\n\n                    </ion-item>\n\n                    <ion-item *ngIf="datos.telefono == 0">\n\n                        <ion-icon item-start ios="ios-call-outline" md="ios-call-outline"></ion-icon>\n\n                        <p style="font-size: 15px;">Telefono: {{datos.telefono}}</p>\n\n                    </ion-item>\n\n                </ion-list>\n\n            <div>\n\n                <div class="logo alinear">\n\n                    <img width="90" src="{{datosUsuario.logo}}">\n\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n        <!--<div class="datosPersonales">\n\n          <div>\n\n            <div class="o_roW">\n\n                <div>\n\n\n\n                </div>\n\n            </div>\n\n          </div>\n\n          <div>\n\n            <ion-card class="menu" (click)="desplegar(1)"><p style="padding-top: 5px;">nombre de la seccion<ion-icon id="icono1" name="arrow-down"></ion-icon></p></ion-card>\n\n            <div id="seccion1" class="invisible" padding>\n\n              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis aliquid fugiat officiis ratione ducimus voluptas.</p>\n\n            </div>\n\n\n\n\n\n          </div>\n\n          <div>\n\n              <ion-card class="menu" (click)="desplegar(2)"><p style="padding-top: 5px;">nombre de la seccion<ion-icon id="icono2" name="arrow-down"></ion-icon></p></ion-card>\n\n              <div id="seccion2" class="invisible" padding>\n\n                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis aliquid fugiat officiis ratione ducimus voluptas.</p>\n\n              </div>\n\n\n\n          </div>\n\n          <div>\n\n              <ion-card class="menu" (click)="desplegar(3)"><p style="padding-top: 5px;">nombre de la seccion<ion-icon id="icono3" rigth name="arrow-down"></ion-icon></p></ion-card>\n\n              <div id="seccion3" class="invisible" padding>\n\n                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis aliquid fugiat officiis ratione ducimus voluptas.</p>\n\n              </div>\n\n\n\n          </div>\n\n\n\n\n\n        </div>-->\n\n\n\n\n\n\n\n\n\n    <button style="margin-top: 10px; font-size: 12px; color: botones;" class="center boton" ion-button color="botones" full (click)="cerrarSesion()">Cerrar Sesion</button>\n\n\n\n    <div text-center class="animated fadeInDown">\n\n      <div class="logo">\n\n        <img class="center" width="100%" style="margin: 20px auto;" src="assets/imgs/web.gif">\n\n      </div>\n\n    </div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\usuario\usuario.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */]])
    ], UsuarioPage);
    return UsuarioPage;
}());

//# sourceMappingURL=usuario.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegistrarPage = /** @class */ (function () {
    function RegistrarPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    RegistrarPage.prototype.regresar = function () {
        this.viewCtrl.dismiss();
    };
    RegistrarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registrar',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\registrar\registrar.html"*/'<!--\n\n  Generated template for the RegistrarPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="header">\n\n    <ion-title>registrar</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <form (ngSubmit)="regresar()">\n\n    <ion-item>\n\n      <ion-label floating>nombre</ion-label>\n\n      <ion-input type="text" [(ngModel)]="apellido" name="title"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label floating>apellido</ion-label>\n\n      <ion-input type="text" [(ngModel)]="nombre" name="title"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label floating>Description</ion-label>\n\n      <ion-textarea [(ngModel)]="descripcion" name="description"></ion-textarea>\n\n    </ion-item>\n\n    <button ion-button type="submit" block>registrar</button>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\registrar\registrar.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ViewController */]])
    ], RegistrarPage);
    return RegistrarPage;
}());

//# sourceMappingURL=registrar.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltroResultadosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_propiedades_propiedades__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the FiltroResultadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FiltroResultadosPage = /** @class */ (function () {
    function FiltroResultadosPage(navCtrl, navParams, propiedadesProvider, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.propiedadesProvider = propiedadesProvider;
        this.loadingCtrl = loadingCtrl;
        this.destino = null;
        this.tipo = null;
        this.destino = this.navParams.get('destino');
        this.tipo = this.navParams.get('tipo');
    }
    FiltroResultadosPage.prototype.ionViewCanEnter = function () {
    };
    FiltroResultadosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-filtro-resultados',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\filtro-resultados\filtro-resultados.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="header"> \n\n    <ion-title>resultados</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n\n\n<ion-content style="background-color: #eee;">\n\n  <div class="ocultar" id="resultados">\n\n    <div *ngIf="tipo == \'propiedad\'">\n\n      <ion-card style="margin: 20px 0px;" class="contenedor" *ngFor="let propiedad of resultados" (click)="irAPropiedad(propiedad.folio)">\n\n        <ion-card-header style="padding: 0px;">\n\n          <div class="imagen">\n\n            <img src="{{propiedad.largephoto}}">\n\n            <div class="texto-encima">\n\n              \n\n              <!-- Y SI LA API CAMBIA COMO REGRESA LOS DATOS ?  -->\n\n              <p style="color: #fff;" *ngIf="propiedad.prices != \'$0.00 \'">{{propiedad.prices}}</p>\n\n            </div>\n\n          </div>\n\n\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n          <p style="font-size: 15px;"> <strong>{{propiedad.alt}}</strong></p>\n\n          <p>{{propiedad.address}}</p>\n\n          <p>{{propiedad.toperation}}</p>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </div>\n\n    <div *ngIf="tipo == \'desarrollo\'">\n\n      <ion-card style="margin: 20px 0px;" class="contenedor" *ngFor="let propiedad of resultados" (click)="irADesarrollo(propiedad.folio)">\n\n        <ion-card-header style="padding: 0px;">\n\n          <div class="imagen">\n\n            <img src="{{propiedad.image.smallphoto}}">\n\n            <div class="texto-encima">\n\n              <p style="color: #fff;" *ngIf="propiedad.priceFrom != \'$0.00 \'">desde: {{propiedad.priceFrom}}</p>\n\n              <p style="color: #fff;" *ngIf="propiedad.priceFrom == \'$0.00 \'">No disponible</p>\n\n            </div>\n\n          </div>\n\n\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n          <p style="font-size: 15px;"> <strong>{{propiedad.develomentNameSpa}}</strong></p>\n\n          <p>{{propiedad.address}}</p>\n\n          <p>Folio: {{propiedad.folio}}</p>\n\n        </ion-card-content>\n\n      </ion-card>    \n\n    </div>\n\n\n\n\n\n  </div>\n\n\n\n  </ion-content>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\filtro-resultados\filtro-resultados.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_propiedades_propiedades__["a" /* PropiedadesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */]])
    ], FiltroResultadosPage);
    return FiltroResultadosPage;
}());

//# sourceMappingURL=filtro-resultados.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_propiedades_propiedades__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SharingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SharingPage = /** @class */ (function () {
    function SharingPage(navCtrl, navParams, propiedadesProvider, loadingCtrl, alertCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.propiedadesProvider = propiedadesProvider;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.tipo = null;
        this.storage.get('usuario').then(function (data) {
            _this.idUsuario = data;
        });
        this.tipo = this.navParams.get('tipo');
        this.nombreC = this.navParams.get('nombre');
        this.mailC = this.navParams.get('mail');
        this.folio = this.navParams.get('folio');
    }
    SharingPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        if (this.tipo == 'propiedades') {
            var loader = this.loadingCtrl.create({
                dismissOnPageChange: false
            });
            loader.present();
            var promise = this.propiedadesProvider.sharingPropiedad();
            promise.subscribe(function (data) {
                if (data.json().status == 200) {
                    _this.resultados = data.json().data;
                    setTimeout(function () {
                        var result = document.getElementById('resulta2');
                        result.classList.add("aparecer");
                        result.classList.remove("ocultar");
                    }, 1000);
                }
                else {
                }
            });
        }
        else {
            var loader = this.loadingCtrl.create({
                dismissOnPageChange: false
            });
            loader.present();
            var promise = this.propiedadesProvider.sharingDesarrollo();
            promise.subscribe(function (data) {
                if (data.json().status == 200) {
                    _this.resultados = data.json().data;
                    setTimeout(function () {
                        var result = document.getElementById('resulta2');
                        result.classList.add("aparecer");
                        result.classList.remove("ocultar");
                    }, 1000);
                }
                else {
                }
            });
        }
        setTimeout(function () {
            loader.dismiss();
        }, 1000);
    };
    SharingPage.prototype.share = function (id) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            dismissOnPageChange: false
        });
        loader.present();
        var promise = this.propiedadesProvider.compartirPropiedad(id, this.idUsuario, this.folio, this.nombreC, this.mailC);
        promise.subscribe(function (data) {
            if (data.status = 200) {
                setTimeout(function () {
                    loader.dismiss();
                }, 1000);
                var alerta_1 = _this.alertCtrl.create({
                    title: 'ENVIADO',
                    subTitle: 'La información de la propiedad a sido enviada',
                    buttons: ['ok']
                });
                setTimeout(function () {
                    alerta_1.present();
                    _this.navCtrl.pop();
                }, 1000);
            }
            else {
                setTimeout(function () {
                    loader.dismiss();
                }, 1000);
                var alerta_2 = _this.alertCtrl.create({
                    title: 'ERROR',
                    subTitle: 'intente mas tarde',
                    buttons: ['ok']
                });
                setTimeout(function () {
                    alerta_2.present();
                    _this.navCtrl.pop();
                }, 1000);
            }
        });
    };
    SharingPage.prototype.shareDev = function (id) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            dismissOnPageChange: false
        });
        loader.present();
        var promise = this.propiedadesProvider.compartirDesarrollo(id, this.idUsuario, this.folio, this.nombreC, this.mailC);
        promise.subscribe(function (data) {
            if (data.status = 200) {
                setTimeout(function () {
                    loader.dismiss();
                }, 1000);
                var alerta_3 = _this.alertCtrl.create({
                    title: 'ENVIADO',
                    subTitle: 'La información del desarrollo a sido enviado',
                    buttons: ['ok']
                });
                setTimeout(function () {
                    alerta_3.present();
                    _this.navCtrl.pop();
                }, 1000);
            }
            else {
                setTimeout(function () {
                    loader.dismiss();
                }, 1000);
                var alerta_4 = _this.alertCtrl.create({
                    title: 'ERROR',
                    subTitle: 'intente mas tarde',
                    buttons: ['ok']
                });
                setTimeout(function () {
                    alerta_4.present();
                    _this.navCtrl.pop();
                }, 1000);
            }
        });
    };
    SharingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sharing',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\sharing\sharing.html"*/'<ion-header no-border>\n\n\n\n  <ion-navbar color="header">\n\n    <ion-title>Resultados</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content fullscreen class="fondo">\n\n  <div class="ocultar" id="resulta2">\n\n    <div class="targetas" *ngIf="tipo == \'propiedades\'">\n\n      <ion-card style="margin: 20px 0px;" class="contenedor" *ngFor="let propiedad of resultados" (click)="share(propiedad.folio)">\n\n        <ion-card-header style="padding: 0px;">\n\n          <div class="imagen">\n\n            <img src="{{propiedad.largephoto}}">\n\n            <div class="texto-encima">\n\n                <!--<p style="color: black; font-weight: bold;" *ngIf="propiedad.price != \'0\'">{{propiedad.price}}</p>-->\n\n              <img src="{{propiedad.office_image}}" alt="">\n\n            </div>\n\n          </div>\n\n\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n          <ion-grid>\n\n            <ion-row>\n\n              <ion-col col-12>\n\n                <p style="font-size: 15px;">\n\n                  <strong>{{propiedad.namePropertyEs}}</strong>\n\n                </p>\n\n              </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n              <ion-col col-9>\n\n                <ion-row>\n\n                  <p>{{propiedad.address}}</p>\n\n                </ion-row>\n\n              </ion-col>\n\n              <ion-col col-3>\n\n                <ion-row>\n\n                  <p>{{propiedad.operation}}</p>\n\n                </ion-row>\n\n              </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n              <ion-col col-4 *ngIf="propiedad.m2c != 0">\n\n                <ion-row>\n\n                  <p>\n\n                    <ion-icon ios="ios-home" md="md-home"></ion-icon> {{propiedad.m2c}} m\n\n                    <SUP>2</SUP>\n\n                  </p>\n\n                </ion-row>\n\n              </ion-col>\n\n              <ion-col col-4 *ngIf="propiedad.mlot != 0">\n\n                <ion-row>\n\n                  <p>\n\n                    <ion-icon ios="ios-home" md="md-home"></ion-icon> {{propiedad.mlot}} m\n\n                    <SUP>2</SUP>\n\n                  </p>\n\n                </ion-row>\n\n              </ion-col>\n\n              <ion-col col-4>\n\n                <ion-row>\n\n                  <p>\n\n                    <ion-icon ios="ios-attach" md="md-attach"></ion-icon> {{propiedad.folio}}</p>\n\n                </ion-row>\n\n              </ion-col>\n\n            </ion-row>\n\n          </ion-grid>\n\n          <ion-row>\n\n            <ion-col col-6>\n\n              <p style="font-size: 15px;" *ngIf="propiedad.price != \'0\'">\n\n                <strong>{{propiedad.price}}</strong>\n\n              </p>\n\n            </ion-col>\n\n            <ion-col text-capitalize text-right col-6>\n\n              <button ion-button outline icon-start item-end small>\n\n                <ion-icon name="share-alt"></ion-icon>\n\n                Enviar Correo\n\n              </button>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </div>\n\n    <div class="targetas" *ngIf="tipo == \'desarrollos\'">\n\n      <ion-card style="margin: 20px 0px;" class="contenedor" *ngFor="let propiedad of resultados" (click)="shareDev(propiedad.folio)">\n\n        <ion-card-header style="padding: 0px;">\n\n          <div class="imagen">\n\n            <img src="{{propiedad.image.smallphoto}}">\n\n            <div class="texto-encima">\n\n                <!--<p style="color: black; font-weight: bold;" *ngIf="propiedad.price != \'0\'">{{propiedad.price}}</p>-->\n\n              <img src="{{propiedad.office_image}}" alt="">\n\n            </div>\n\n          </div>\n\n\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n          <ion-grid>\n\n            <ion-row>\n\n              <ion-col col-12>\n\n                <p style="font-size: 15px;">\n\n                  <strong>{{propiedad.developmentNameEs}}</strong>\n\n                </p>\n\n              </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n              <ion-col col-9>\n\n                <ion-row>\n\n                  <p>{{propiedad.address}}</p>\n\n                </ion-row>\n\n              </ion-col>\n\n              <ion-col col-3>\n\n                <ion-row>\n\n                  <p>\n\n                    <ion-icon ios="ios-attach" md="md-attach"></ion-icon> {{propiedad.folio}}</p>\n\n                </ion-row>\n\n              </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n              <ion-col col-6 *ngIf="propiedad.m2c != 0">\n\n                <ion-row>\n\n                  <p>\n\n                    <ion-icon ios="ios-home" md="md-home"></ion-icon> Unidades: {{propiedad.units}}</p>\n\n                </ion-row>\n\n              </ion-col>\n\n              <ion-col col-6 *ngIf="propiedad.mlot != 0">\n\n                <ion-row>\n\n                  <p>\n\n                    <ion-icon ios="ios-home" md="md-home"></ion-icon> Disponibles: {{propiedad.unitsAviable}}</p>\n\n                </ion-row>\n\n              </ion-col>\n\n            </ion-row>\n\n          </ion-grid>\n\n          <ion-row>\n\n            <ion-col text-capitalize text-right>\n\n              <button ion-button outline icon-start item-end small>\n\n                <ion-icon name="share-alt"></ion-icon>\n\n                Enviar Correo\n\n              </button>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </div>\n\n\n\n\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\sharing\sharing.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_propiedades_propiedades__["a" /* PropiedadesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], SharingPage);
    return SharingPage;
}());

//# sourceMappingURL=sharing.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_calendar__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agregar_tarea_agregar_tarea__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CalendarPage = /** @class */ (function () {
    function CalendarPage(navCtrl, navParams, usuarioProvider, calendar, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.usuarioProvider = usuarioProvider;
        this.calendar = calendar;
        this.storage = storage;
        this.eventList = [];
        this.isSelected = true;
        this.monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        this.date = new Date();
    }
    CalendarPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('usuario').then(function (data) {
            var promise = _this.usuarioProvider.getTask(data);
            promise.subscribe(function (data) {
                _this.getDaysOfMonth();
                _this.eventList = data.json().data;
                _this.task = data.json().data;
            });
        });
    };
    CalendarPage.prototype.loadEventThisMonth = function () {
        var _this = this;
        this.eventList = new Array();
        var startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
        var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
        this.calendar.listEventsInRange(startDate, endDate).then(function (msg) {
            msg.forEach(function (item) {
                _this.eventList.push(item);
            });
        }, function (err) {
        });
    };
    CalendarPage.prototype.selectDate = function (day) {
        var _this = this;
        var addd = '';
        var add = '';
        if (day < 10) {
            addd = '0';
        }
        if (this.date.getMonth() < 10) {
            add = '0';
        }
        this.isSelected = false;
        this.selectedEvent = new Array();
        var thisDate1 = this.date.getFullYear() + "-" + add + (this.date.getMonth() + 1) + "-" + addd + day + "";
        var thisDate2 = this.date.getFullYear() + "-" + add + (this.date.getMonth() + 1) + "-" + addd + day + "";
        this.eventList.forEach(function (event) {
            if (((event.startdate >= thisDate1) && (event.startdate <= thisDate2)) || ((event.finishdate >= thisDate1) && (event.finishdate <= thisDate2))) {
                _this.isSelected = true;
                _this.selectedEvent.push(event);
            }
        });
    };
    CalendarPage.prototype.checkEvent = function (day) {
        var hasEvent = false;
        var add = '';
        var addd = '';
        if (this.date.getMonth() < 10) {
            add = '0';
        }
        if (day < 10) {
            addd = '0';
        }
        var thisDate1 = this.date.getFullYear() + "-" + add + (this.date.getMonth() + 1) + "-" + addd + day + "";
        var thisDate2 = this.date.getFullYear() + "-" + add + (this.date.getMonth() + 1) + "-" + addd + day + "";
        this.task.forEach(function (event) {
            if (((event.startdate >= thisDate1) && (event.startdate <= thisDate2)) || ((event.finishdate >= thisDate1) && (event.finishdate <= thisDate2))) {
                hasEvent = true;
            }
        });
        return hasEvent;
    };
    CalendarPage.prototype.getDaysOfMonth = function () {
        this.daysInThisMonth = new Array();
        this.daysInLastMonth = new Array();
        this.daysInNextMonth = new Array();
        this.currentMonth = this.monthNames[this.date.getMonth()];
        this.currentYear = this.date.getFullYear();
        if (this.date.getMonth() === new Date().getMonth()) {
            this.currentDate = new Date().getDate();
        }
        else {
            this.currentDate = 999;
        }
        var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
        for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
            this.daysInLastMonth.push(i);
        }
        var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        for (var i = 0; i < thisNumOfDays; i++) {
            this.daysInThisMonth.push(i + 1);
        }
        var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
        var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();
        for (var i = 0; i < (6 - lastDayThisMonth); i++) {
            this.daysInNextMonth.push(i + 1);
        }
        var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
        if (totalDays < 36) {
            for (var i = (7 - lastDayThisMonth); i < ((7 - lastDayThisMonth) + 7); i++) {
                this.daysInNextMonth.push(i);
            }
        }
    };
    CalendarPage.prototype.goToLastMonth = function () {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        this.getDaysOfMonth();
    };
    CalendarPage.prototype.goToNextMonth = function () {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        this.getDaysOfMonth();
    };
    CalendarPage.prototype.addEvent = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__agregar_tarea_agregar_tarea__["a" /* AgregarTareaPage */]);
    };
    CalendarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-calendar',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\calendar\calendar.html"*/'<ion-header>\n\n  <ion-navbar color="header">\n\n\n\n    <ion-title>\n\n      Tareas agendadas\n\n    </ion-title>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="addEvent()">\n\n        <ion-icon color="white" name="add-circle"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="calendar-header">\n\n    <ion-row class="calendar-month">\n\n      <ion-col col-2 (click)="goToLastMonth()">\n\n        <ion-icon name="arrow-back"></ion-icon>\n\n      </ion-col>\n\n      <ion-col col-8>{{currentMonth}} de {{currentYear}}</ion-col>\n\n      <ion-col col-2 (click)="goToNextMonth()">\n\n        <ion-icon name="arrow-forward"></ion-icon>\n\n      </ion-col>\n\n    </ion-row>\n\n  </div>\n\n\n\n  <div class="calendar-body">\n\n    <ion-grid>\n\n      <ion-row class="calendar-weekday">\n\n        <ion-col>DO</ion-col>\n\n        <ion-col>LU</ion-col>\n\n        <ion-col>MA</ion-col>\n\n        <ion-col>MI</ion-col>\n\n        <ion-col>JU</ion-col>\n\n        <ion-col>VI</ion-col>\n\n        <ion-col>SA</ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row class="calendar-date">\n\n\n\n        <ion-col col-1 *ngFor="let lastDay of daysInLastMonth" class="last-month" (click)="goToLastMonth()">{{lastDay}}\n\n        </ion-col>\n\n\n\n        <ion-col col-1 *ngFor="let day of daysInThisMonth" (click)="selectDate(day)">\n\n          <span class="currentDate" *ngIf="currentDate === day; else otherDate">{{day}}</span>\n\n          <ng-template #otherDate class="otherDate">\n\n            {{day}}<br>\n\n            <div class="event-bullet" *ngIf="checkEvent(day)"></div>\n\n          </ng-template>\n\n        </ion-col>\n\n\n\n        <ion-col col-1 *ngFor="let nextDay of daysInNextMonth" class="next-month" (click)="goToNextMonth()">{{nextDay}}\n\n        </ion-col>\n\n\n\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n\n\n  <br>\n\n\n\n  <ion-list class="selected-event" *ngIf="isSelected">\n\n  \n\n    <ion-item *ngFor="let se of selectedEvent">\n\n  \n\n      \n\n      <h2>{{se.nameTask}} </h2>\n\n  \n\n   \n\n        <ion-item no-margin-bottom>\n\n          <span text-wrap> {{se.starTiString}} - {{se.endTiString}}</span>\n\n          <br>\n\n          <span text-wrap>Contacto #{{se.visitid}} | {{se.fullname}} {{se.apellido_pat}}</span>\n\n          <br>         \n\n          <span text-wrap>Nota: {{se.tasktext}} <br></span>\n\n          <br>\n\n        </ion-item>\n\n  \n\n  \n\n  \n\n  \n\n  \n\n    </ion-item>\n\n  \n\n  </ion-list>'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\calendar\calendar.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_calendar__["a" /* Calendar */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
    ], CalendarPage);
    return CalendarPage;
}());

//# sourceMappingURL=calendar.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeadPickeadPickPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_ionic_angular_components_loading_loading_controller__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the LeadPickeadPickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LeadPickeadPickPage = /** @class */ (function () {
    function LeadPickeadPickPage(navCtrl, navParams, loadingCtrl, usuarioProvider, storage, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.usuarioProvider = usuarioProvider;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        this.userInfo = [];
        this.empty = false;
        this.message = []; /** Mensaje de error o notificacion */
        this.storage.get('data').then(function (data) {
            _this.userInfo.usertype = data.usertype;
            _this.userInfo.userid = data.userid;
            _this.userInfo.companyid = data.companyid;
            _this.leads(false);
        });
    }
    LeadPickeadPickPage.prototype.leads = function (refresh) {
        var _this = this;
        var promise = this.usuarioProvider.getLeads('&type=lead&data=' + this.userInfo.usertype + '&userid=' + this.userInfo.userid + '&company=' + this.userInfo.companyid);
        var loading = this.loadingCtrl.create({
            content: "\n      <div class=\"custom-spinner-container\" style=\"background-color: black;\">\n        <div class=\"custom-spinner-box\" style=\"background-color: black;\">Cargando contactos</div>\n      </div>"
        });
        if (!refresh)
            loading.present();
        promise.subscribe(function (data) {
            var value;
            var offices = [];
            if (data.status === 200) {
                if (data.json().status == 200) {
                    Object.keys(data.json().data).forEach(function (key) {
                        value = data.json().data[key];
                        if (value.cellphone == 0) {
                            if (value.phone == 0) {
                                value.cellphone = 'Telefono no registrado';
                                value.btnphone = false;
                            }
                            else {
                                value.cellphone = value.phone;
                            }
                        }
                        else {
                            value.btnphone = true;
                        }
                        if (value.apellido_mat == '0') {
                            value.apellido_mat = '';
                        }
                        if (value.apellido_pat == '0') {
                            value.apellido_pat = '';
                        }
                        value.fullname += ' ' + value.apellido_pat + ' ' + value.apellido_mat;
                        if (value.email == 0) {
                            if (value.email2 == 0) {
                                value.email = 'Email no registrdo.';
                                value.btnemail = false;
                            }
                            else {
                                value.email = value.email2;
                            }
                        }
                        else {
                            value.btnemail = true;
                        }
                        value.first = value.fullname.substr(0, 1).toUpperCase();
                        if (value.first == ' ')
                            value.first = value.fullname.substr(1, 1).toUpperCase();
                        offices.push(value);
                    });
                    loading.dismiss();
                }
                else {
                    _this.empty = true;
                    _this.message.error = 'Aun no tienes contactos compradores.';
                    loading.dismiss();
                }
                _this.items = offices;
                _this.original = offices;
                offices = _this.items;
                if (refresh)
                    _this.refresher.complete();
            }
        });
    };
    LeadPickeadPickPage.prototype.view = function (fullname, visitid) {
        this.viewCtrl.dismiss({ data: 5, fullname: fullname, folio: visitid });
    };
    LeadPickeadPickPage.prototype.initializeItems = function () {
        this.items = this.original;
    };
    LeadPickeadPickPage.prototype.getItems = function (ev) {
        this.initializeItems();
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                return (item.fullname.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    LeadPickeadPickPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-lead-pickead-pick',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\lead-pickead-pick\lead-pickead-pick.html"*/'<ion-header>\n\n  <ion-navbar color="header" >\n\n		<ion-buttons left>\n\n			<button ion-button icon-only menuToggle>\n\n				<ion-icon   name="menu"></ion-icon>\n\n			</button>\n\n		</ion-buttons>\n\n    <ion-searchbar (ionInput)="getItems($event)" placeholder="Nombre, correo"></ion-searchbar>\n\n    \n\n    <ion-buttons right  (click)="deleteFiltre()">\n\n        <button ion-button icon-only>\n\n          <ion-icon  color="redImmo" name="ios-trash"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n\n\n\n\n<ion-content class="card-background-page" padding>\n\n   \n\n      \n\n\n\n\n\n  <ion-list class="ilist">\n\n\n\n\n\n    <ion-item *ngFor="let item of items">\n\n      <ion-item   (click)="view(item.fullname, item.visitid)">\n\n\n\n        <ion-avatar class="corange" item-start>\n\n          <h1>{{item.first}}</h1>\n\n        </ion-avatar>\n\n        \n\n        <h2 >{{item.fullname}}</h2> \n\n        <h3  >{{item.email}}</h3>\n\n        \n\n        <h3 >{{item.cellphone}}</h3>\n\n        <h3 >Folio: {{item.visitid}}</h3>\n\n      \n\n      </ion-item>\n\n\n\n    </ion-item>\n\n  </ion-list>  \n\n \n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\lead-pickead-pick\lead-pickead-pick.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__node_modules_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ViewController */]])
    ], LeadPickeadPickPage);
    return LeadPickeadPickPage;
}());

//# sourceMappingURL=lead-pickead-pick.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertyPickeadPickPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the PropertyPickeadPickPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PropertyPickeadPickPage = /** @class */ (function () {
    function PropertyPickeadPickPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PropertyPickeadPickPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-property-pickead-pick',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\property-pickead-pick\property-pickead-pick.html"*/'<!--\n\n  Generated template for the PropertyPickeadPickPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>propertyPickeadPick</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\property-pickead-pick\property-pickead-pick.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]])
    ], PropertyPickeadPickPage);
    return PropertyPickeadPickPage;
}());

//# sourceMappingURL=property-pickead-pick.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(295);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_contactos_contactos__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs2_tabs2__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_email_composer__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_geolocation__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_social_sharing__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_call_number__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_usuario_usuario__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_propiedades_propiedades__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__angular_common_http__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_formularios_formularios__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_network__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_network_network__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_contactos_contactos__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_ionic_gallery_modal__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ionic_img_viewer__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_calendar__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_api_api__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














// plugin para compartir en rede sociales

// plugin para llamar numeros













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["d" /* BuscarPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["g" /* DestinosPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["j" /* FormularioPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["m" /* InfoPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["o" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["r" /* ResultadosPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contactos_contactos__["a" /* ContactosPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["x" /* VerDesarrolloPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["y" /* VerPropiedadPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs2_tabs2__["a" /* Tabs2Page */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["w" /* VerContactoPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["u" /* TabsUsuarioPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["v" /* UsuarioPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["q" /* RegistrarPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["b" /* AgregarContactoPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["s" /* SeguimientoPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["i" /* FiltroResultadosPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["a" /* AgregarCompradoresPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["t" /* SharingPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["e" /* CalendarPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["c" /* AgregarTareaPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["n" /* LeadPickeadPickPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["h" /* DocumentsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["k" /* GeneralFormPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["p" /* PropertyPickeadPickPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_24_ionic_gallery_modal__["a" /* GalleryModalModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/agregar-compradores/agregar-compradores.module#AgregarCompradoresPageModule', name: 'AgregarCompradoresPage', segment: 'agregar-compradores', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/agregar-contacto/agregar-contacto.module#AgregarContactoPageModule', name: 'AgregarContactoPage', segment: 'agregar-contacto', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/agregar-tarea/agregar-tarea.module#AgregarTareaPageModule', name: 'AgregarTareaPage', segment: 'agregar-tarea', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/buscar/buscar.module#BuscarPageModule', name: 'BuscarPage', segment: 'buscar', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/calendar/calendar.module#CalendarPageModule', name: 'CalendarPage', segment: 'calendar', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/destinos/destinos.module#DestinosPageModule', name: 'DestinosPage', segment: 'destinos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/documents/documents.module#DocumentsPageModule', name: 'DocumentsPage', segment: 'documents', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/contactos/contactos.module#ContactosPageModule', name: 'ContactosPage', segment: 'contactos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/filtro-resultados/filtro-resultados.module#FiltroResultadosPageModule', name: 'FiltroResultadosPage', segment: 'filtro-resultados', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/formulario/formulario.module#FormularioPageModule', name: 'FormularioPage', segment: 'formulario', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/general-form/general-form.module#GeneralFormPageModule', name: 'GeneralFormPage', segment: 'general-form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/info/info.module#InfoPageModule', name: 'InfoPage', segment: 'info', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/lead-pickead-pick/lead-pickead-pick.module#LeadPickeadPickPageModule', name: 'LeadPickeadPickPage', segment: 'lead-pickead-pick', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/property-pickead-pick/property-pickead-pick.module#PropertyPickeadPickPageModule', name: 'PropertyPickeadPickPage', segment: 'property-pickead-pick', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/registrar/registrar.module#RegistrarPageModule', name: 'RegistrarPage', segment: 'registrar', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/resultados/resultados.module#ResultadosPageModule', name: 'ResultadosPage', segment: 'resultados', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/seguimiento/seguimiento.module#SeguimientoPageModule', name: 'SeguimientoPage', segment: 'seguimiento', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sharing/sharing.module#SharingPageModule', name: 'SharingPage', segment: 'sharing', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs-usuario/tabs-usuario.module#TabsUsuarioPageModule', name: 'TabsUsuarioPage', segment: 'tabs-usuario', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs2/tabs2.module#Tabs2PageModule', name: 'Tabs2Page', segment: 'tabs2', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/usuario/usuario.module#UsuarioPageModule', name: 'UsuarioPage', segment: 'usuario', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ver-contacto/ver-contacto.module#VerContactoPageModule', name: 'VerContactoPage', segment: 'ver-contacto', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ver-desarrollo/ver-desarrollo.module#VerDesarrolloPageModule', name: 'VerDesarrolloPage', segment: 'ver-desarrollo', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ver-propiedad/ver-propiedad.module#VerPropiedadPageModule', name: 'VerPropiedadPage', segment: 'ver-propiedad', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_17__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_19__angular_common_http__["a" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_25_ionic_img_viewer__["a" /* IonicImageViewerModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["d" /* BuscarPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["g" /* DestinosPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["j" /* FormularioPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["m" /* InfoPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["o" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["r" /* ResultadosPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_contactos_contactos__["a" /* ContactosPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["x" /* VerDesarrolloPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["y" /* VerPropiedadPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs2_tabs2__["a" /* Tabs2Page */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["w" /* VerContactoPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["u" /* TabsUsuarioPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["v" /* UsuarioPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["q" /* RegistrarPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["b" /* AgregarContactoPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["s" /* SeguimientoPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["i" /* FiltroResultadosPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["a" /* AgregarCompradoresPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["t" /* SharingPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["e" /* CalendarPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["c" /* AgregarTareaPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["n" /* LeadPickeadPickPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["h" /* DocumentsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["k" /* GeneralFormPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_index_paginas__["p" /* PropertyPickeadPickPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_calendar__["a" /* Calendar */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_email_composer__["a" /* EmailComposer */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_16__providers_usuario_usuario__["a" /* UsuarioProvider */],
                __WEBPACK_IMPORTED_MODULE_18__providers_propiedades_propiedades__["a" /* PropiedadesProvider */],
                __WEBPACK_IMPORTED_MODULE_20__providers_formularios_formularios__["a" /* FormulariosProvider */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_22__providers_network_network__["a" /* NetworkProvider */],
                __WEBPACK_IMPORTED_MODULE_23__providers_contactos_contactos__["a" /* ContactosProvider */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_27__providers_api_api__["a" /* ApiProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return companyid; });
var companyid = 126;
//# sourceMappingURL=datosContacto.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs2_tabs2__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_usuario_tabs_usuario__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_network__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_network_network__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_loading_loading_controller__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_usuario_usuario__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_api_api__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, storage, alertCtrl, networkProvider, network, events, loadingCtrl, usuario, apiProvider) {
        var _this = this;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.networkProvider = networkProvider;
        this.network = network;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.usuario = usuario;
        this.apiProvider = apiProvider;
        this.datos = {};
        this.storage.get('userToken').then(function (token) {
            if (token == null) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs2_tabs2__["a" /* Tabs2Page */];
            }
            else {
                //this.usuario.loginToken(token);
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_tabs_usuario_tabs_usuario__["a" /* TabsUsuarioPage */];
            }
        });
        platform.ready().then(function () {
            //statusBar.styleBlackOpaque();
            //if (platform.is('android')) {
            //statusBar.overlaysWebView(true);
            //statusBar.backgroundColorByHexString('#000000');
            //statusBar.styleLightContent();
            //}
            if (platform.is('ios')) {
                statusBar.overlaysWebView(false); /**La barra de estado se establece en estado fixed*/
                statusBar.styleBlackOpaque(); /**Use la barra de estado blackOpaque (texto claro, para fondos oscuros). */
                statusBar.backgroundColorByHexString('#1F2321'); /**Establece el color del status bar, SOLO IOS */
            }
            _this.networkProvider.initializeNetworkEvents();
            // Offline event
            _this.events.subscribe('network:offline', function () {
                _this.networkAlert();
            });
            // Online event
            _this.events.subscribe('network:online', function () {
                _this.finishNetworkAlert();
            });
            statusBar.styleDefault();
            var $this = _this;
            setTimeout(function () {
                $this.splashScreen.hide();
            }, 10000);
        });
        var promise = this.networkProvider.ping();
        promise.subscribe(function (data) {
            if (data.status == 200) {
            }
            else {
            }
        }, function (error) {
            _this.networkAlert();
        });
    }
    MyApp.prototype.networkAlert = function () {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: "\n      <div style=\"background-color: black;\">\n        <div style=\"background-color: black;\">no hay conexion a internet. <br> Conecte a internet</div>\n      </div>"
        });
        this.loading.present();
    };
    MyApp.prototype.finishNetworkAlert = function () {
        this.loading.dismiss();
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8__providers_network_network__["a" /* NetworkProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */],
            __WEBPACK_IMPORTED_MODULE_9_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_10__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_11__providers_api_api__["a" /* ApiProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactosProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_api__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContactosProvider = /** @class */ (function () {
    function ContactosProvider(http, apiProvider) {
        this.http = http;
        this.apiProvider = apiProvider;
        this.url = 'http://www.immosystem.com.mx/appImmov2/immoApp2.php';
    }
    //----------------------------------------------------------------------------
    //Método para cargar lista de contactos
    ContactosProvider.prototype.getContactsList = function (id, token) {
        var body = 'm=visits&user=' + id + '&token=' + token;
        return this.apiProvider.post(body);
    };
    //----------------------------------------------------------------------------
    //Método para cargar contactos referidos
    ContactosProvider.prototype.getReferedContactsList = function (id, token) {
        var body = 'm=visitsPreregister&user=' + id + '&token=' + token;
        return this.apiProvider.post(body);
    };
    //----------------------------------------------------------------------------
    //Cargar lista de contactos potenciales
    ContactosProvider.prototype.getPotencialContactsList = function (id, token) {
        var body = 'm=potentialBuyers&folio=' + 4 + '&user=' + id + '&token=' + token;
        return this.apiProvider.post(body);
    };
    //----------------------------------------------------------------------------
    //Método para ver a un contacto en específico
    ContactosProvider.prototype.getContactInfo = function (id, idUsuario, token) {
        var body = 'm=visit&user=' + idUsuario + '&visitid=' + id + '&token=' + token;
        return this.apiProvider.post(body);
    };
    //----------------------------------------------------------------------------
    //Método para ver un contacto referido
    ContactosProvider.prototype.getReferedContactInfo = function (id, idUsuario, token) {
        var body = 'm=visitPreregister&user=' + idUsuario + '&visitid=' + id + '&token=' + token;
        return this.apiProvider.post(body);
    };
    //----------------------------------------------------------------------------
    //Método para agregar contactos referidos
    //Modulo pendiente en la API
    ContactosProvider.prototype.agregarContactosRef = function (datos) {
        var body = 'm=addBuyerPreregistro' + datos, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        return this.http.post(this.url, body, options);
    };
    //----------------------------------------------------------------------------
    //Módulo para agregar un comprador
    ContactosProvider.prototype.agergarContactosComp = function (datos, token) {
        var body = 'm=addBuyer&f=A' + datos + '&token=' + token;
        return this.apiProvider.post(body);
    };
    //
    ContactosProvider.prototype.agregarComentario = function (datos) {
        var body = 'mode=visit&f=' + datos, type = "application/x-www-form-urlencoded; charset=UTF-8", headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'Content-Type': type }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: headers }), url = 'http://www.immosystem.com.mx/appImmov2/immoApp.php';
        var urlEnvio = url + body;
        return this.http.post(url, body, options);
    };
    ContactosProvider.prototype.activarVisita = function (datos) {
        var body = 'm=activateReferred&jash=jas' + datos, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        return this.http.post(this.url, body, options);
    };
    ContactosProvider.prototype.convertirPotencial = function (datos) {
        var body = 'm=addBuyerPotential&jash=jas' + datos, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        return this.http.post(this.url, body, options);
    };
    ContactosProvider.prototype.controlFacturacion = function (datos) {
        var body = 'm=controlFacturation&jash=jas' + datos, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        return this.http.post(this.url, body, options);
    };
    ContactosProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiProvider */]])
    ], ContactosProvider);
    return ContactosProvider;
}());

//# sourceMappingURL=contactos.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropiedadesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PropiedadesProvider = /** @class */ (function () {
    function PropiedadesProvider(http, usuarioProvider) {
        this.http = http;
        this.usuarioProvider = usuarioProvider;
        this.url = 'http://www.immosystem.com.mx/appImmov2/immoApp2.php';
        console.log('Hello PropiedadesProvider Provider');
    }
    PropiedadesProvider.prototype.cargarPorCiudad = function (idCiudad) {
        var body = 'm=developments&folio=' + this.usuarioProvider.companyid + '&state=' + idCiudad + '&app=1', header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        console.log(this.url + body);
        return this.http.post(this.url, body, options);
    };
    PropiedadesProvider.prototype.cargarPropiedad = function (folio) {
        console.log("el folio es: ");
        console.log(folio);
        var body = 'm=property&folio=' + folio, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        /*if(id != null){
          body += '&user=' + id;
          console.log('el usuario contioene informacion jiji: ' + id);
        }else{
          console.log('el usauario no contiene informacion es null jiji: ' + id);
        }*/
        return this.http.post(this.url, body, options);
    };
    PropiedadesProvider.prototype.cargarDesarrollo = function (folio) {
        console.log("el folio es: ");
        console.log(folio);
        var body = 'm=development&folio=' + folio, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        /*if(id != null){
          body += '&user=' + id;
          console.log('el usuario contioene informacion jiji: ' + id);
        }else{
          console.log('el usauario no contiene informacion es null jiji: ' + id);
        }*/
        return this.http.post(this.url, body, options);
    };
    // http://www.immosystem.com.mx/appImmov2/immoApp2.php?d=0&m=findProperty&folio=135&bedrooms=1&bathrooms=1&priceFrom=1&priceTo=1000000&m2From=1&m2To=371.540
    PropiedadesProvider.prototype.filtrarPropiedad = function (datos, metros, metroslot) {
        var body = 'm=findProperty&folio=' + this.usuarioProvider.companyid, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        console.log('el url es: ' + body);
        return this.http.post(this.url, body, options);
    };
    PropiedadesProvider.prototype.filtrarDesarrollo = function (datos) {
        var body = 'm=findDevelopment&folio=' + this.usuarioProvider.companyid, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        console.log(this.url + body);
        return this.http.post(this.url, body, options);
    };
    PropiedadesProvider.prototype.verInventario = function (dev, status, keyword) {
        var body = 'm=findProperty&folio=' + this.usuarioProvider.companyid + '&num_desarrollo=' + dev + '&statusId=' + status + '&kwEsp=' + keyword, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        console.log(this.url + '?d=0&' + body);
        return this.http.post(this.url, body, options);
    };
    PropiedadesProvider.prototype.sharingPropiedad = function () {
        var body = 'm=findProperty&folio=' + this.usuarioProvider.companyid, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        console.log("la respuesta");
        console.log(this.url + '?d=0&' + body);
        return this.http.post(this.url, body, options);
    };
    PropiedadesProvider.prototype.sharingDesarrollo = function () {
        var body = 'm=findDevelopment&folio=' + this.usuarioProvider.companyid, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        console.log(this.url + '?d=0&' + body);
        return this.http.post(this.url, body, options);
    };
    PropiedadesProvider.prototype.compartirDesarrollo = function (idDeveloment, idUser, idContact, nombreC, mailC) {
        var body = 'm=sharingInfo&folio=' + idDeveloment + '&idAgent=' + idUser + '&idContact=' + idContact + '&type=development&nombreC=' + nombreC + '&mailC=' + mailC, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        console.log(this.url + '?d=0&' + body);
        return this.http.post(this.url, body, options);
    };
    PropiedadesProvider.prototype.compartirPropiedad = function (idProperty, idUser, idContact, nombreC, mailC) {
        var body = 'm=sharingInfo&folio=' + idProperty + '&idAgent=' + idUser + '&idContact=' + idContact + '&type=property&nombreC=' + nombreC + '&mailC=' + mailC, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        console.log(this.url + '?d=0&' + body);
        return this.http.post(this.url, body, options);
    };
    PropiedadesProvider.prototype.getDocuments = function (idDevelopment, idUser) {
        var body = 'm=directory&folio=' + idDevelopment + '&user=' + idUser, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        console.log(this.url + '?d=0&' + body);
        return this.http.post(this.url, body, options);
    };
    PropiedadesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__["a" /* UsuarioProvider */]])
    ], PropiedadesProvider);
    return PropiedadesProvider;
}());

//# sourceMappingURL=propiedades.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { HttpClient } from '@angular/common/http';


var ApiProvider = /** @class */ (function () {
    function ApiProvider(http) {
        this.http = http;
        //url:any = 'http://www.immosystem.com.mx/appImmov2/immoApp2.php';
        this.url = 'http://api.immosystem.com.mx';
        this.header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        this.options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: this.header });
    }
    //Método POST
    ApiProvider.prototype.post = function (body) {
        return this.http.post(this.url, body, this.options);
    };
    ApiProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
    ], ApiProvider);
    return ApiProvider;
}());

//# sourceMappingURL=api.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormulariosProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_api__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FormulariosProvider = /** @class */ (function () {
    function FormulariosProvider(http, apiProvider) {
        this.http = http;
        this.apiProvider = apiProvider;
        this.url = 'http://www.immosystem.com.mx/appImmov2/immoApp2.php';
    }
    //----------------------------------------------------------------------------
    //Lista de Medios de Contactos
    FormulariosProvider.prototype.mediosDeContactos = function () {
        var body = 'm=contactMedias';
        return this.apiProvider.post(body);
    };
    //---------------------------------------------------------------------------
    //Lista de submedios de contacto pertenecientes al medio de contacto principal
    FormulariosProvider.prototype.subMediosDeContactos = function (contactMediaID) {
        var body = 'm=subContactMedias&media=' + contactMediaID;
        return this.apiProvider.post(body);
    };
    //----------------------------------------------------------------------------
    //Lista de Oficinas relacionadas al usuario
    FormulariosProvider.prototype.listaDeOficinas = function (idUser, token) {
        var body = 'm=offices&user=' + idUser + '&token=' + token;
        return this.apiProvider.post(body);
    };
    //----------------------------------------------------------------------------
    FormulariosProvider.prototype.listaDeAgentes = function (officeId) {
        var body = 'm=agents&office=' + officeId, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        return this.http.post(this.url, body, options);
    };
    //----------------------------------------------------------------------------
    //Lista de lenguajes disponbibles
    FormulariosProvider.prototype.listaDeLenguajes = function () {
        var body = 'm=languages';
        return this.apiProvider.post(body);
    };
    //----------------------------------------------------------------------------
    //Lista de países
    FormulariosProvider.prototype.listaDePaises = function () {
        var body = 'm=countries';
        return this.apiProvider.post(body);
    };
    //----------------------------------------------------------------------------
    FormulariosProvider.prototype.listaDeEstados = function (pais) {
        var body = 'm=states&country=' + pais, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        console.log(this.url + '?d=0' + body);
        return this.http.post(this.url, body, options);
    };
    //----------------------------------------------------------------------------
    //Lista de ciudades
    FormulariosProvider.prototype.listaDeCiudad = function (folio) {
        var body = 'm=cities&folio=' + folio;
        return this.apiProvider.post(body);
    };
    //----------------------------------------------------------------------------
    FormulariosProvider.prototype.listaDePhases = function (company) {
        var body = 'm=phases' + company, header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        return this.http.post(this.url, body, options);
    };
    FormulariosProvider.prototype.listaDeOperaciones = function () {
        var body = 'm=operation', header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        return this.http.post(this.url, body, options);
    };
    FormulariosProvider.prototype.listaDeActividades = function () {
        var body = 'm=activityType', header = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }), options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: header });
        return this.http.post(this.url, body, options);
    };
    FormulariosProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__api_api__["a" /* ApiProvider */]])
    ], FormulariosProvider);
    return FormulariosProvider;
}());

//# sourceMappingURL=formularios.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DocumentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_propiedades_propiedades__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the DocumentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DocumentsPage = /** @class */ (function () {
    function DocumentsPage(navCtrl, navParams, propiedadesProvider, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.propiedadesProvider = propiedadesProvider;
        this.viewCtrl = viewCtrl;
        this.section2 = 'images';
        this.idDevelopment = this.navParams.get('development');
        this.$_SESSION = this.navParams.get('user');
        this.type = this.navParams.get('type');
        this.keyword = this.navParams.get('keyword');
    }
    DocumentsPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        if (this.type == null) {
            var promise = this.propiedadesProvider.getDocuments(this.idDevelopment, this.$_SESSION);
            promise.subscribe(function (data) {
                _this.section = data.json().data;
                _this.plans = data.json().data.masterPlan;
            });
            var promise = this.propiedadesProvider.verInventario(this.idDevelopment, 6, '');
            promise.subscribe(function (data) {
                _this.solds = data.json().data;
            });
            var promise = this.propiedadesProvider.verInventario(this.idDevelopment, 1, '');
            promise.subscribe(function (data) {
                _this.availables = data.json().data;
            });
        }
        else if (this.type == 'prospect') {
            var promise = this.propiedadesProvider.verInventario('', 1, this.keyword);
            promise.subscribe(function (data) {
                _this.availables = data.json().data;
            });
        }
    };
    DocumentsPage.prototype.returnData = function (folio, name) {
        this.viewCtrl.dismiss({ folio: folio, name: name });
    };
    DocumentsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-documents',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\documents\documents.html"*/'<!--\n\n  Generated template for the DocumentsPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="header">\n\n    <ion-title>Inventario</ion-title>\n\n  </ion-navbar>\n\n  <ion-toolbar *ngIf="type == null" no-border-top>\n\n    <ion-segment [(ngModel)]="section2">\n\n      <ion-segment-button value="images">\n\n        Disponibles\n\n      </ion-segment-button>\n\n      <ion-segment-button value="units">\n\n        Vendidas\n\n      </ion-segment-button>\n\n      <ion-segment-button value="master">\n\n        Master Plan\n\n      </ion-segment-button>\n\n    </ion-segment>\n\n  </ion-toolbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content *ngIf="type == null" padding>\n\n  <div [ngSwitch]="section2">\n\n    <ion-list *ngSwitchCase="\'images\'">\n\n      <ion-item *ngFor="let available of availables">\n\n        <ion-thumbnail item-start>\n\n          <img src="{{available.largephoto}}">\n\n        </ion-thumbnail>\n\n        <h2>{{available.namePropertyEs}}</h2>\n\n        <h3>{{available.address}}</h3>\n\n        <p>Folio - {{available.folio}}</p>\n\n      </ion-item>\n\n    </ion-list>\n\n    <ion-list *ngSwitchCase="\'units\'">\n\n      <ion-item *ngFor="let sold of solds">\n\n        <ion-thumbnail item-start>\n\n          <img src="{{sold.largephoto}}">\n\n        </ion-thumbnail>\n\n        <h2>{{sold.namePropertyEs}}</h2>\n\n        <h3>{{sold.address}}</h3>\n\n        <p>Folio - {{sold.folio}}</p>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <ion-list *ngSwitchCase="\'master\'">\n\n      <ion-card *ngFor="let plan of plans">\n\n        <ion-card-header>\n\n          {{plan.title}}\n\n        </ion-card-header>\n\n\n\n        <ion-card-content>\n\n          <img src="{{plan.largefile}}" alt="">\n\n        </ion-card-content>\n\n\n\n      </ion-card>\n\n    </ion-list>\n\n\n\n  </div>\n\n</ion-content>\n\n\n\n<ion-content *ngIf="type == \'prospect\'">\n\n\n\n  <ion-list>\n\n    <ion-item *ngFor="let available of availables" (click)="returnData(available.folio,available.namePropertyEs)">\n\n      <ion-thumbnail item-start>\n\n        <img src="{{available.largephoto}}">\n\n      </ion-thumbnail>\n\n      <h2>{{available.namePropertyEs}}</h2>\n\n      <h3>{{available.address}}</h3>\n\n      <p>Folio - {{available.folio}}</p>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\documents\documents.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_propiedades_propiedades__["a" /* PropiedadesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ViewController */]])
    ], DocumentsPage);
    return DocumentsPage;
}());

//# sourceMappingURL=documents.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl, navParams, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.tab2 = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["o" /* LoginPage */];
        this.tab3 = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["d" /* BuscarPage */];
        this.tab4 = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["g" /* DestinosPage */];
        this.tab5 = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["m" /* InfoPage */];
        events.subscribe('user:created', function (user, time) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__index_paginas__["u" /* TabsUsuarioPage */]);
        });
    }
    TabsPage.prototype.ionViewDidLoad = function () {
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\tabs\tabs.html"*/'<ion-tabs color="tabs" style="position: relative!important; display: inline-block!important;">\n\n  <ion-tab tabIcon="ios-person" tabTitle="Login"  [root]="tab2" ></ion-tab>\n\n  <ion-tab tabIcon="ios-search" tabTitle="Buscar" [root]="tab3" ></ion-tab>\n\n  <ion-tab tabIcon="ios-map" tabTitle="Destinos" [root]="tab4" ></ion-tab>\n\n  <ion-tab tabIcon="ios-list-box" tabTitle="Nosotros" [root]="tab5" ></ion-tab>\n\n</ion-tabs>'/*ion-inline-end:"C:\Users\Sistemas IMMO\Desktop\APP_TEMPLATE\src\pages\tabs\tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ })

},[287]);
//# sourceMappingURL=main.js.map