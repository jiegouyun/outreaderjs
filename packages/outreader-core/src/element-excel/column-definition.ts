import { IColDefFE } from '../interfaces';
import { rangeFillColor, distributeFormat } from '../excel/commom';
import Excel from 'exceljs';

export async function initColDef(worksheet: Excel.Worksheet, nums: number) {
  worksheet.getCell('A1').value = '柱名';
  worksheet.getCell('A2').value = '层号';

  for (let i = 0; i < nums; i++) {
    worksheet.mergeCells(1, 2 + 7 * i, 1, 8 + 7 * i);
    worksheet.getCell(2, 2 + 7 * i).value = '编号';
    worksheet.getCell(2, 3 + 7 * i).value = '属性';
    worksheet.getCell(2, 4 + 7 * i).value = '起始端点';
    worksheet.getCell(2, 5 + 7 * i).value = '终止端点';
    worksheet.getCell(2, 6 + 7 * i).value = '截面类型';
    worksheet.getCell(2, 7 + 7 * i).value = '截面尺寸';
    worksheet.getCell(2, 8 + 7 * i).value = '转角';
  }
}

export async function writeColDef(col: IColDefFE, worksheet: Excel.Worksheet) {
  // write storey
  const count = col.storeyID.length;
  const nums = col.colName.length;
  for (let j = 0; j < count; j++) {
    // write storey
    worksheet.getCell(3 + j, 1).value = col.storeyID[j];
  }

  for (let i = 0; i < nums; i++) {
    worksheet.getCell(1, 2 + 7 * i).value = `C-${col.colName[i]}`;
    for (let j = 0; j < count; j++) {
      // write displacement
      worksheet.getCell(3 + j, 2 + 7 * i).value = col.colID[i][j];
      worksheet.getCell(3 + j, 3 + 7 * i).value = (
        col.colProps[i][j] || []
      ).join('，');
      worksheet.getCell(3 + j, 4 + 7 * i).value = col.startNode[i][j];
      worksheet.getCell(3 + j, 5 + 7 * i).value = col.endNode[i][j];
      worksheet.getCell(3 + j, 6 + 7 * i).value = col.secType[i][j];
      worksheet.getCell(3 + j, 7 + 7 * i).value = (
        col.section[i][j] || []
      ).join('x');
      worksheet.getCell(3 + j, 8 + 7 * i).value = col.ang[i][j];
    }
  }
}

export async function formatColDef(worksheet: Excel.Worksheet, nums: number) {
  distributeFormat(worksheet);

  rangeFillColor(worksheet, 1, 1, 2, 1, 'solid', '00F0FFF0', '00FFFFFF');
  for (let i = 0; i < nums; i++) {
    if (i % 2 === 0) {
      rangeFillColor(
        worksheet,
        1,
        2 + 7 * i,
        2,
        8 + 7 * i,
        'solid',
        '00F0FFFF',
        '00FFFFFF',
      );
    } else {
      rangeFillColor(
        worksheet,
        1,
        2 + 7 * i,
        2,
        8 + 7 * i,
        'solid',
        '00F0FFF0',
        '00FFFFFF',
      );
    }
  }

  worksheet.views = [{ state: 'frozen', xSplit: 1, ySplit: 2 }];
}
