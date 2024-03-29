import { TimespanPipe } from './pipe/timespan.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { MenuComponent } from './menu/menu.component';
import { FormataDataPipe } from './pipe/formata-data.pipe';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';
import { TituloComponent } from './titulo/titulo.component';

import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
//import { ChartModule } from 'primeng/chart';

import { AutoCompleteModule } from 'primeng/autocomplete';
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
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PickListModule } from 'primeng/picklist';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FieldsetModule } from 'primeng/fieldset';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { FileUploadModule } from 'primeng/fileupload';
import { ChipsModule } from 'primeng/chips';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import {SidebarModule} from 'primeng/sidebar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  declarations: [
    TituloComponent,
    ConfirmacaoComponent,
    FormataDataPipe,
    TimespanPipe,
    MenuComponent
  ],
  imports: [
    AccordionModule,
    AutoCompleteModule,
    BadgeModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    CommonModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    ChipsModule,
    FormsModule,
    HttpClientModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextareaModule,
    InputTextModule,
    ListboxModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OverlayPanelModule,
    PickListModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    RouterModule,
    StepsModule,
    TableModule,
    TabViewModule,
    ToastModule,
    ToolbarModule,
    RadioButtonModule,
    ChartModule,
    TooltipModule,
    SidebarModule,
    InputNumberModule,
    ConfirmPopupModule,
  ],
  exports: [
    AccordionModule,
    AutoCompleteModule,
    BadgeModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    CommonModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    ChipsModule,
    FormsModule,
    HttpClientModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextareaModule,
    InputTextModule,
    ListboxModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OverlayPanelModule,
    PickListModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    RouterModule,
    StepsModule,
    TableModule,
    TabViewModule,
    ToastModule,
    ToolbarModule,
    ChartModule,
    MenuComponent,
    TituloComponent,
    ConfirmacaoComponent,
    FormataDataPipe,
    TimespanPipe,
    RadioButtonModule,
    TooltipModule,
    SidebarModule,
    InputNumberModule,
    ConfirmPopupModule
    
  ],
})
export class SOLSharedModule { }
