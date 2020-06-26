import { IStructure } from '@outreader/core';
import { rangeSetBorder, rangeFillColor, distributeFormat } from './commom';
import Excel from 'exceljs';

export function initForce(worksheet: Excel.Worksheet): void {
  worksheet.mergeCells('A1:B1');
  worksheet.getCell('A1').value = '楼层信息';
  worksheet.getCell('A2').value = '层号';
  worksheet.getCell('B2').value = '塔号';

  worksheet.mergeCells('C1:N1');
  worksheet.getCell('C1').value = '风荷载';
  worksheet.getCell('C2').value = '顺风外力X\nkN';
  worksheet.getCell('D2').value = '顺风剪力X\nkN';
  worksheet.getCell('E2').value = '顺风弯矩X\nkNm';
  worksheet.getCell('F2').value = '顺风外力Y\nkN';
  worksheet.getCell('G2').value = '顺风剪力Y\nkN';
  worksheet.getCell('H2').value = '顺风弯矩Y\nkNm';
  worksheet.getCell('I2').value = '横风外力X\nkN';
  worksheet.getCell('J2').value = '横风剪力X\nkN';
  worksheet.getCell('K2').value = '横风弯矩X\nkNm';
  worksheet.getCell('L2').value = '横风外力Y\nkN';
  worksheet.getCell('M2').value = '横风剪力Y\nkN';
  worksheet.getCell('N2').value = '横风弯矩Y\nkNm';

  worksheet.mergeCells('O1:T1');
  worksheet.getCell('O1').value = '地震作用';
  worksheet.getCell('O2').value = '外力X\nkN';
  worksheet.getCell('P2').value = '剪力X\nkN';
  worksheet.getCell('Q2').value = '弯矩X\nkNm';
  worksheet.getCell('R2').value = '外力Y\nkN';
  worksheet.getCell('S2').value = '剪力Y\nkN';
  worksheet.getCell('T2').value = '弯矩Y\nkNm';
}

export function writeForce(
  structure: IStructure,
  worksheet: Excel.Worksheet,
): void {
  // write storey
  for (
    let i = 0;
    i < (structure.wmass?.storey.storeyID as number[]).length;
    i++
  ) {
    worksheet.getCell(`A${3 + i}`).value =
      structure.wmass?.storey.storeyID[i] || '';
    worksheet.getCell(`B${3 + i}`).value =
      structure.wmass?.storey.towerID[i] || '';
  }

  let ref: number;

  // write wind force
  ref = (structure.wmass?.storey.storeyID as number[]).indexOf(
    (structure.wmass?.wind.storeyID as number[])[0],
  );
  for (
    let i = 0;
    i < (structure.wmass?.wind.storeyID as number[]).length;
    i++
  ) {
    worksheet.getCell(`C${3 + ref + i}`).value =
      structure.wmass?.wind.forceAlongX[i] || '';
    worksheet.getCell(`D${3 + ref + i}`).value =
      structure.wmass?.wind.shearAlongX[i] || '';
    worksheet.getCell(`E${3 + ref + i}`).value =
      structure.wmass?.wind.momentAlongX[i] || '';
    worksheet.getCell(`F${3 + ref + i}`).value =
      structure.wmass?.wind.forceAlongY[i] || '';
    worksheet.getCell(`G${3 + ref + i}`).value =
      structure.wmass?.wind.shearAlongY[i] || '';
    worksheet.getCell(`H${3 + ref + i}`).value =
      structure.wmass?.wind.momentAlongY[i] || '';
    worksheet.getCell(`I${3 + ref + i}`).value =
      structure.wmass?.wind.forceCrossX[i] || '';
    worksheet.getCell(`J${3 + ref + i}`).value =
      structure.wmass?.wind.shearCrossX[i] || '';
    worksheet.getCell(`K${3 + ref + i}`).value =
      structure.wmass?.wind.momentCrossX[i] || '';
    worksheet.getCell(`L${3 + ref + i}`).value =
      structure.wmass?.wind.forceCrossY[i] || '';
    worksheet.getCell(`M${3 + ref + i}`).value =
      structure.wmass?.wind.shearCrossY[i] || '';
    worksheet.getCell(`N${3 + ref + i}`).value =
      structure.wmass?.wind.momentCrossY[i] || '';
  }

  // write seismic force
  ref = (structure.wmass?.storey.storeyID as number[]).indexOf(
    (structure.wzq?.seismicForce.storeyID as number[])[0],
  );
  for (
    let i = 0;
    i < (structure.wzq?.seismicForce.storeyID as number[]).length;
    i++
  ) {
    worksheet.getCell(`O${3 + ref + i}`).value =
      structure.wzq?.seismicForce.forceX[i] || '';
    worksheet.getCell(`P${3 + ref + i}`).value =
      structure.wzq?.seismicForce.shearX[i] || '';
    worksheet.getCell(`Q${3 + ref + i}`).value =
      structure.wzq?.seismicForce.momentX[i] || '';
    worksheet.getCell(`R${3 + ref + i}`).value =
      structure.wzq?.seismicForce.forceY[i] || '';
    worksheet.getCell(`S${3 + ref + i}`).value =
      structure.wzq?.seismicForce.shearY[i] || '';
    worksheet.getCell(`T${3 + ref + i}`).value =
      structure.wzq?.seismicForce.momentY[i] || '';
  }
}

export function formatForce(worksheet: Excel.Worksheet): void {
  distributeFormat(worksheet);

  worksheet.getRow(2).height = 30;

  rangeFillColor(worksheet, 1, 1, 2, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(
    worksheet,
    3,
    2,
    worksheet.rowCount,
    2,
    'solid',
    '00F0FFF0',
    '00FFFFFF',
  );
  rangeFillColor(worksheet, 1, 3, 2, 14, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 15, 2, 20, 'solid', '00F0FFF0', '00FFFFFF');
}
