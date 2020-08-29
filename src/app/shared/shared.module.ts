import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormataDataPipe } from './pipe/formata-data.pipe';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';
import { TituloComponent } from './titulo/titulo.component';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
//import { ChartModule } from 'primeng/chart';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
// import { ListboxModule } from 'primeng/listbox';

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
  ],
})
export class SharedModule { }
