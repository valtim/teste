import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from './menu/menu.component';
import { FormataDataPipe } from './pipe/formata-data.pipe';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';
import { TituloComponent } from './titulo/titulo.component';

import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
//import { ChartModule } from 'primeng/chart';

import {AutoCompleteModule} from 'primeng/autocomplete';
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
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PickListModule } from 'primeng/picklist';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {FieldsetModule} from 'primeng/fieldset';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [
    TituloComponent,
    ConfirmacaoComponent,
    FormataDataPipe,
    MenuComponent
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
    ProgressSpinnerModule,
    FieldsetModule,
    MessagesModule,
    MessageModule,
    TabViewModule,
    InputTextModule,
    AutoCompleteModule
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
    ProgressSpinnerModule,
    FieldsetModule,
    MessagesModule,
    MessageModule,
    TabViewModule,
    InputTextModule,
    AutoCompleteModule
  ],
})
export class SharedModule { }
