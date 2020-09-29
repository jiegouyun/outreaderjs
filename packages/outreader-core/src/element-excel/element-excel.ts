import { saveAs } from 'file-saver';
import { initColDef, writeColDef, formatColDef } from './column-definition';
import { initColUc, writeColUc, formatColUc } from './column-axial-comp-ratio';
import { initColRs, writeColRs, formatColRs } from './column-reinforcement';
import {
  initColVCapacity,
  writeColVCapacity,
  formatColVCapacity,
} from './column-shear-capacity';
import { IElement, IColumnPj } from '../interfaces';
import Excel from 'exceljs';
import path from 'path';

/**
 * @description export data into a excel file.
 * @param element IElement, element data.
 */
export async function exportElementExcel(element: IElement, dir?: string) {
  // initial workbook.
  const workbook = new Excel.Workbook();
  const colNums = element.wpj?.column.colName.length || 0;

  // write worksheet column definition.
  const sheetColDef = workbook.addWorksheet('柱定义信息');
  await initColDef(sheetColDef, colNums);
  await writeColDef(element.wpj?.column as IColumnPj, sheetColDef);
  await formatColDef(sheetColDef, colNums);

  // write worksheet column axial compression ratio.
  const sheetColUc = workbook.addWorksheet('柱轴压比');
  await initColUc(sheetColUc, colNums);
  await writeColUc(element.wpj?.column as IColumnPj, sheetColUc);
  await formatColUc(sheetColUc, colNums);

  // write worksheet column reinforcement.
  const sheetColRs = workbook.addWorksheet('柱配筋率');
  await initColRs(sheetColRs, colNums);
  await writeColRs(element.wpj?.column as IColumnPj, sheetColRs);
  await formatColRs(sheetColRs, colNums);

  // write worksheet column shear capacity.
  const sheetColVCapacity = workbook.addWorksheet('柱抗剪承载力');
  await initColVCapacity(sheetColVCapacity, colNums);
  await writeColVCapacity(element.wpj?.column as IColumnPj, sheetColVCapacity);
  await formatColVCapacity(sheetColVCapacity, colNums);

  // write xlsx file.
  // const filename = path.join(dir ? dir : element.dir, 'Element.xlsx');
  // await workbook.xlsx.writeFile(filename);
  const buffer = await workbook.xlsx.writeBuffer();
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const blob = new Blob([buffer], { type: fileType });
  saveAs(blob, 'Element.xlsx');

  return true;
}
