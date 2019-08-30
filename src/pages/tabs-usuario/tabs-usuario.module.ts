import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsUsuarioPage } from './tabs-usuario';

@NgModule({
  declarations: [
    TabsUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsUsuarioPage),
  ],
})
export class TabsUsuarioPageModule {}
