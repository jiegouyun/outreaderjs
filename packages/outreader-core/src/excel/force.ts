import { IForceFE } from '../interfaces';
import { rangeFillColor, distributeFormat } from './commom';
import Excel from 'exceljs';

export async function initForce(worksheet: Excel.Worksheet) {
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

export async function writeForce(force: IForceFE, worksheet: Excel.Worksheet) {
  const storeyID = force.seismic.storeyID || force.wind.storeyID;
  const towerID = force.seismic.towerID || force.wind.towerID;

  for (let i = 0; i < storeyID.length; i++) {
    // write storey
    worksheet.getCell(`A${3 + i}`).value = storeyID[i];
    worksheet.getCell(`B${3 + i}`).value = towerID[i];
  }

  for (let i = 0; i < force.wind.storeyID.length; i++) {
    // write wind force
    worksheet.getCell(`C${3 + i}`).value = force.wind.forceAlongX[i];
    worksheet.getCell(`D${3 + i}`).value = force.wind.shearAlongX[i];
    worksheet.getCell(`E${3 + i}`).value = force.wind.momentAlongX[i];
    worksheet.getCell(`F${3 + i}`).value = force.wind.forceAlongY[i];
    worksheet.getCell(`G${3 + i}`).value = force.wind.shearAlongY[i];
    worksheet.getCell(`H${3 + i}`).value = force.wind.momentAlongY[i];
    worksheet.getCell(`I${3 + i}`).value = force.wind.forceCrossX[i];
    worksheet.getCell(`J${3 + i}`).value = force.wind.shearCrossX[i];
    worksheet.getCell(`K${3 + i}`).value = force.wind.momentCrossX[i];
    worksheet.getCell(`L${3 + i}`).value = force.wind.forceCrossY[i];
    worksheet.getCell(`M${3 + i}`).value = force.wind.shearCrossY[i];
    worksheet.getCell(`N${3 + i}`).value = force.wind.momentCrossY[i];
  }

  for (let i = 0; i < force.seismic.storeyID.length; i++) {
    // write seismic force
    worksheet.getCell(`O${3 + i}`).value = force.seismic.forceX[i];
    worksheet.getCell(`P${3 + i}`).value = force.seismic.shearX[i];
    worksheet.getCell(`Q${3 + i}`).value = force.seismic.momentX[i];
    worksheet.getCell(`R${3 + i}`).value = force.seismic.forceY[i];
    worksheet.getCell(`S${3 + i}`).value = force.seismic.shearY[i];
    worksheet.getCell(`T${3 + i}`).value = force.seismic.momentY[i];
  }
}

export async function formatForce(worksheet: Excel.Worksheet) {
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

  worksheet.views = [{ state: 'frozen', xSplit: 2, ySplit: 2 }];
}
