import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
//import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable()
export class ExcelService {
  constructor() { }


  public JsonParaTabela(json: any[]): any[] {
    if (json.length == 0)
      return null;

    let campos = Object.keys(json[0]);


    let retorno = [];
    retorno.push(Object.keys(json[0]));


    for(let i = 0 ; i< json.length;i++)
    {
      let item = [];
      campos.forEach(element => {
        item.push(json[i][element])
      });
      retorno.push(item);
    }

    return retorno;
  }




  public exportAsExcelFile(colunas: any[], dados: any[], excelFileName: string): void {

    let teste = this.JsonParaTabela(dados);

    const title = 'Car Sell Report';
    const header = teste[0];
    const data = teste.slice(1, teste.length)

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Car Data');

    let headerRow = worksheet.addRow(header);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      
    });

    data.forEach(d => {
      let row = worksheet.addRow(d);
      // let qty = row.getCell(5);
      // let color = 'FF99FF99';
      // if (+qty.value < 500) {
      //   color = 'FF9999'
      // }
      // qty.fill = {
      //   type: 'pattern',
      //   pattern: 'solid',
      //   fgColor: { argb: color }
      // }
    }
    );

    // worksheet.autoFilter = {
    //   from: 'A1',
    //   to: 'AZ1',
    // }

    for (let i = 0; i < worksheet.columns.length; i += 1) { 
      let dataMax = 0;
      const column = worksheet.columns[i];
      for (let j = 1; j < column.values.length; j += 1) {
        const columnLength = column.values[j].toString().length;
        if (columnLength > dataMax) {
          dataMax = columnLength;
        }
      }
      column.width = dataMax < 15 ? 15 : dataMax;
    }

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, excelFileName + '_export_' + new Date().getTime() + '.xlsx');
    });
  }
  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
  //   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  // }
}