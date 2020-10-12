import { IColCbFE } from '../interfaces';
import { rangeFillColor, distributeFormat } from '../excel/commom';
import Excel from 'exceljs';

export async function initColVCapacity(
  worksheet: Excel.Worksheet,
  nums: number,
) {
  worksheet.getCell('A1').value = '柱名';
  worksheet.getCell('A2').value = '层号';

  for (let i = 0; i < nums; i++) {
    worksheet.mergeCells(1, 2 + 2 * i, 1, 3 + 2 * i);
    worksheet.getCell(2, 2 + 2 * i).value = 'X向';
    worksheet.getCell(2, 3 + 2 * i).value = 'Y向';
  }
}

export async function writeColVCapacity(
  col: IColCbFE,
  worksheet: Excel.Worksheet,
) {
  // write storey
  const count = col.storeyID.length;
  const nums = col.colName.length;
  for (let j = 0; j < count; j++) {
    // write storey
    worksheet.getCell(3 + j, 1).value = col.storeyID[j];
  }

  for (let i = 0; i < nums; i++) {
    worksheet.getCell(1, 2 + 2 * i).value = `C-${col.colName[i]}`;
    for (let j = 0; j < count; j++) {
      // write displacement
      worksheet.getCell(3 + j, 2 + 2 * i).value = col.cbX[i][j];
      worksheet.getCell(3 + j, 3 + 2 * i).value = col.cbY[i][j];
    }
  }
}

export async function formatColVCapacity(
  worksheet: Excel.Worksheet,
  nums: number,
) {
  distributeFormat(worksheet);

  rangeFillColor(worksheet, 1, 1, 2, 1, 'solid', '00F0FFF0', '00FFFFFF');
  for (let i = 0; i < nums; i++) {
    if (i % 2 === 0) {
      rangeFillColor(
        worksheet,
        1,
        2 + 2 * i,
        2,
        3 + 2 * i,
        'solid',
        '00F0FFFF',
        '00FFFFFF',
      );
    } else {
      rangeFillColor(
        worksheet,
        1,
        2 + 2 * i,
        2,
        3 + 2 * i,
        'solid',
        '00F0FFF0',
        '00FFFFFF',
      );
    }
  }

  worksheet.views = [{ state: 'frozen', xSplit: 1, ySplit: 2 }];
}
