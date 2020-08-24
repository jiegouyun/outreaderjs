import { IForceFE, IStructureFrontEnd } from '../interfaces';
import { rangeFillColor } from '../excel/commom';
import { compareDistributeFormat } from './commom';
import Excel from 'exceljs';

export async function initForce(worksheet: Excel.Worksheet, nums: number) {
  worksheet.getCell('A2').value = '模型';
  worksheet.getCell('A3').value = '层号';

  worksheet.mergeCells(1, 2, 1, 1 + 8 * nums);
  worksheet.getCell(1, 2).value = '风荷载';
  worksheet.mergeCells(1, 2 + 8 * nums, 1, 1 + 12 * nums);
  worksheet.getCell(1, 2 + 8 * nums).value = '地震作用';

  for (let i = 0; i < nums; i++) {
    worksheet.mergeCells(2, 2 + 8 * i, 2, 9 + 8 * i);
    worksheet.getCell(2, 2 + 8 * i).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 8 * i).value = '顺风剪力X\nkN';
    worksheet.getCell(3, 3 + 8 * i).value = '顺风弯矩X\nkNm';
    worksheet.getCell(3, 4 + 8 * i).value = '顺风剪力Y\nkN';
    worksheet.getCell(3, 5 + 8 * i).value = '顺风弯矩Y\nkNm';
    worksheet.getCell(3, 6 + 8 * i).value = '横风剪力X\nkN';
    worksheet.getCell(3, 7 + 8 * i).value = '横风弯矩X\nkNm';
    worksheet.getCell(3, 8 + 8 * i).value = '横风剪力Y\nkN';
    worksheet.getCell(3, 9 + 8 * i).value = '横风弯矩Y\nkNm';

    worksheet.mergeCells(2, 2 + 4 * i + 8 * nums, 2, 5 + 4 * i + 8 * nums);
    worksheet.getCell(2, 2 + 4 * i + 8 * nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 4 * i + 8 * nums).value = '剪力X\nkN';
    worksheet.getCell(3, 3 + 4 * i + 8 * nums).value = '弯矩X\nkNm';
    worksheet.getCell(3, 4 + 4 * i + 8 * nums).value = '剪力Y\nkN';
    worksheet.getCell(3, 5 + 4 * i + 8 * nums).value = '弯矩Y\nkNm';
  }
}

export async function writeForce(
  structures: IStructureFrontEnd[],
  worksheet: Excel.Worksheet,
) {
  const nums = structures.length;
  let storeyID: number[] = [];
  for (let i = 0; i < nums; i++) {
    if (
      (structures[i].force.wind || structures[i].force.seismic).storeyID
        .length > storeyID.length
    ) {
      storeyID = (structures[i].force.wind || structures[i].force.seismic)
        .storeyID;
    }
  }
  const count = storeyID.length;

  for (let j = 0; j < count; j++) {
    // write storey
    worksheet.getCell(4 + j, 1).value = storeyID[j];
  }

  for (let i = 0; i < nums; i++) {
    const force: IForceFE = structures[i].force;
    const diff = count - (force.wind.storeyID || force.seismic.storeyID).length;
    for (let j = 0; j < count; j++) {
      // write wind force
      worksheet.getCell(4 + j, 2 + 8 * i).value =
        force.wind.shearAlongX[j - diff] || '';
      worksheet.getCell(4 + j, 3 + 8 * i).value =
        force.wind.momentAlongX[j - diff] || '';
      worksheet.getCell(4 + j, 4 + 8 * i).value =
        force.wind.shearAlongY[j - diff] || '';
      worksheet.getCell(4 + j, 5 + 8 * i).value =
        force.wind.momentAlongY[j - diff] || '';
      worksheet.getCell(4 + j, 6 + 8 * i).value =
        force.wind.shearCrossX[j - diff] || '';
      worksheet.getCell(4 + j, 7 + 8 * i).value =
        force.wind.momentCrossX[j - diff] || '';
      worksheet.getCell(4 + j, 8 + 8 * i).value =
        force.wind.shearCrossY[j - diff] || '';
      worksheet.getCell(4 + j, 9 + 8 * i).value =
        force.wind.momentCrossY[j - diff] || '';

      // write seismic force
      worksheet.getCell(4 + j, 2 + 4 * i + 8 * nums).value =
        force.seismic.shearX[j - diff] || '';
      worksheet.getCell(4 + j, 3 + 4 * i + 8 * nums).value =
        force.seismic.momentX[j - diff] || '';
      worksheet.getCell(4 + j, 4 + 4 * i + 8 * nums).value =
        force.seismic.shearY[j - diff] || '';
      worksheet.getCell(4 + j, 5 + 4 * i + 8 * nums).value =
        force.seismic.momentY[j - diff] || '';
    }
  }
}

export async function formatForce(worksheet: Excel.Worksheet, nums: number) {
  compareDistributeFormat(worksheet);

  worksheet.getRow(3).height = 30;

  rangeFillColor(worksheet, 1, 1, 3, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(
    worksheet,
    4,
    1,
    worksheet.rowCount,
    1,
    'solid',
    '00F0FFF0',
    '00FFFFFF',
  );
  rangeFillColor(
    worksheet,
    1,
    2,
    3,
    1 + 8 * nums,
    'solid',
    '00F0FFFF',
    '00FFFFFF',
  );
  rangeFillColor(
    worksheet,
    1,
    2 + 8 * nums,
    3,
    1 + 12 * nums,
    'solid',
    '00F0FFF0',
    '00FFFFFF',
  );

  worksheet.views = [{ state: 'frozen', xSplit: 1, ySplit: 3 }];
}
