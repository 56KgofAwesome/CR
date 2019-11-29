import { BrowserModule      } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen       } from '@ionic-native/splash-screen';
import { StatusBar          } from '@ionic-native/status-bar';
import { ContactosPage      } from '../pages/contactos/contactos';
import { MyApp              } from './app.component';
import { HomePage           } from '../pages/home/home';
import { TabsPage           } from '../pages/tabs/tabs';
import { Tabs2Page          } from '../pages/tabs2/tabs2';
import { EmailComposer      } from '@ionic-native/email-composer';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import {
  PropertiesPage,
  InventoryPage,
  BuscarPage,
  DestinosPage,
  FormularioPage,
  InfoPage,
  LoginPage,
  ResultadosPage,
  VerDesarrolloPage,
  VerPropiedadPage,
  VerContactoPage,
  TabsUsuarioPage,
  UsuarioPage,
  RegistrarPage,
  AgregarContactoPage,
  SeguimientoPage,
  FiltroResultadosPage,
  AgregarCompradoresPage,
  SharingPage,
  CalendarPage,
  AgregarTareaPage,
  LeadPickeadPickPage,
  DocumentsPage,
  GeneralFormPage,
  PropertyPickeadPickPage
} from "../pages/index.paginas";
// plugin para compartir en rede sociales
import { SocialSharing          } from "@ionic-native/social-sharing";
// plugin para llamar numeros
import { CallNumber             } from '@ionic-native/call-number';
import { UsuarioProvider        } from '../providers/usuario/usuario';
import { HttpClient             } from '@angular/common/http';
import { HttpModule             } from '@angular/http';
import { PropiedadesProvider    } from '../providers/propiedades/propiedades';
import { HttpClientModule       } from '@angular/common/http';
import { FormulariosProvider    } from '../providers/formularios/formularios';
import { Network                } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';
import { ContactosProvider } from '../providers/contactos/contactos';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Calendar } from '@ionic-native/calendar';
import { ApiProvider } from '../providers/api/api';
import { ElementEnablerProvider } from '../providers/element-enabler/element-enabler';


@NgModule({
  declarations: [
    PropertiesPage,
    InventoryPage,
    MyApp,
    HomePage,
    BuscarPage,
    DestinosPage,
    FormularioPage,
    InfoPage,
    LoginPage,
    ResultadosPage,
    ContactosPage,
    VerDesarrolloPage,
    VerPropiedadPage,
    TabsPage,
    Tabs2Page,
    VerContactoPage,
    TabsUsuarioPage,
    UsuarioPage,
    RegistrarPage,
    AgregarContactoPage,
    SeguimientoPage,
    FiltroResultadosPage,
    AgregarCompradoresPage,
    SharingPage,
    CalendarPage,
    AgregarTareaPage,
    LeadPickeadPickPage,
    DocumentsPage,
    GeneralFormPage,
    PropertyPickeadPickPage
  ],
  imports: [
    ionicGalleryModal.GalleryModalModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    PropertiesPage,
    InventoryPage,
    MyApp,
    HomePage,
    BuscarPage,
    DestinosPage,
    FormularioPage,
    InfoPage,
    LoginPage,
    ResultadosPage,
    ContactosPage,
    VerDesarrolloPage,
    VerPropiedadPage,
    TabsPage,
    Tabs2Page,
    VerContactoPage,
    TabsUsuarioPage,
    UsuarioPage,
    RegistrarPage,
    AgregarContactoPage,
    SeguimientoPage,
    FiltroResultadosPage,
    AgregarCompradoresPage,
    SharingPage,
    CalendarPage,
    AgregarTareaPage,
    LeadPickeadPickPage,
    DocumentsPage,
    GeneralFormPage,
    PropertyPickeadPickPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    CallNumber,
    Calendar,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    PropiedadesProvider,
    FormulariosProvider,
    Network,
    NetworkProvider,
    ContactosProvider,
    Geolocation,
    ApiProvider,
    ElementEnablerProvider
  ]
})
export class AppModule {}
