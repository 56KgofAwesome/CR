import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarTareaPage } from './agregar-tarea';

@NgModule({
  declarations: [
    AgregarTareaPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarTareaPage),
  ],
})
export class AgregarTareaPageModule {}
