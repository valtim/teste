import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormataDataPipe } from './pipe/formata-data.pipe';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';
import { TituloComponent } from './titulo/titulo.component';
import { ListboxModule } from 'primeng-lts/listbox';
import { CalendarModule } from 'primeng-lts/calendar';
//import { ChartModule } from 'primeng-lts/chart';
import { ToolbarModule } from 'primeng-lts/toolbar';
import { ButtonModule } from 'primeng-lts/button';
import { DialogModule } from 'primeng-lts/dialog';
import { TableModule } from 'primeng-lts/table';
import { AccordionModule } from 'primeng-lts/accordion';
import { MultiSelectModule } from 'primeng-lts/multiselect';
import { DropdownModule } from 'primeng-lts/dropdown';
import { InputMaskModule } from 'primeng-lts/inputmask';
import { MenubarModule } from 'primeng-lts/menubar';
import { ToastModule } from 'primeng-lts/toast';
import { CheckboxModule } from 'primeng-lts/checkbox';
import { InputSwitchModule } from 'primeng-lts/inputswitch';
import { InputTextareaModule } from 'primeng-lts/inputtextarea';
import { CardModule } from 'primeng-lts/card';
import { OverlayPanelModule } from 'primeng-lts/overlaypanel';
import { PickListModule } from 'primeng-lts/picklist';
// import { ListboxModule } from 'primeng-lts/listbox';

@NgModule({
  declarations: [
    TituloComponent,
    ConfirmacaoComponent,
    FormataDataPipe, 
    // TituloComponent
  ],
  exports: [
    TituloComponent,
    ConfirmacaoComponent,
    FormataDataPipe,
    CardModule,
    ListboxModule,
    CalendarModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    TableModule,
    AccordionModule,
    MultiSelectModule,
    DropdownModule,
    InputMaskModule,
    ToastModule,
    MenubarModule,
    CheckboxModule,
    FormsModule,
    InputSwitchModule,
    InputTextareaModule,
    OverlayPanelModule,
    PickListModule,
  ],
  imports: [
    CommonModule,
    RouterModule,   
    CardModule,
    ListboxModule,
    CalendarModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    TableModule,
    AccordionModule,
    MultiSelectModule,
    DropdownModule,
    InputMaskModule,
    ToastModule,
    MenubarModule,
    CheckboxModule,
    FormsModule,
    InputSwitchModule,
    InputTextareaModule,
    OverlayPanelModule,
    PickListModule,
  ],
})
export class SharedModule { }
