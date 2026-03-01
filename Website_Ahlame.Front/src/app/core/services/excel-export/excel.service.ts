import { Injectable } from "@angular/core";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: "root",
})
export class ExcelService {
  constructor() {}

  public exportAsExcelFile(json: any[], headers: string[], excelFileName: string): void {
    // Create a new worksheet with headers
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([headers]);
  
    // Append the data rows starting from row 2
    XLSX.utils.sheet_add_json(worksheet, json, {
      skipHeader: true, // Skip adding JSON keys as headers
      origin: 'A2' // Data starts from row 2
    });
  
    // Apply styling to the header row
    const headerRange = XLSX.utils.decode_range(worksheet['!ref']!);
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
      const cell = worksheet[cellAddress];
      if (cell) {
        cell.s = {
          font: {
            bold: true,
            color: { rgb: "FFFFFF" } // White text color
          },
          fill: {
            fgColor: { rgb: "4F81BD" } // Background color (blue)
          },
          alignment: {
            horizontal: 'center',
            vertical: 'center'
          }
        };
      }
    }
  
    // Set worksheet direction to RTL (right-to-left)
    worksheet['!dir'] = 'rtl'; // Set the worksheet direction to RTL
    worksheet['!cols'] = headers.map(() => ({ wpx: 120 })); // Adjust column width
  
    // Create a workbook and add the worksheet
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array', cellStyles: true });
  
    // Save the workbook to a file
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + EXCEL_EXTENSION);
  }
  
}
