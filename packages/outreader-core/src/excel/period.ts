import { IPeriodFE } from '../interfaces';
import { rangeFillColor, distributeFormat } from './commom';
import Excel from 'exceljs';

export async function initPeriod(worksheet: Excel.Worksheet) {
  worksheet.getCell('A2').value = '振型';

  worksheet.mergeCells('B1:F1');
  worksheet.getCell('B1').value = '考虑扭转耦联时的动力特性';
  worksheet.getCell('B2').value = '周期';
  worksheet.getCell('C2').value = '转角';
  worksheet.getCell('D2').value = '平动系数X';
  worksheet.getCell('E2').value = '平动系数Y';
  worksheet.getCell('F2').value = '扭转系数Z';

  worksheet.mergeCells('G1:K1');
  worksheet.getCell('G1').value = '地震最大作用方向的动力特性';
  worksheet.getCell('G2').value = '周期';
  worksheet.getCell('H2').value = '转角';
  worksheet.getCell('I2').value = '平动系数X';
  worksheet.getCell('J2').value = '平动系数Y';
  worksheet.getCell('K2').value = '扭转系数Z';

  worksheet.mergeCells('L1:N1');
  worksheet.getCell('L1').value = '质量参与系数';
  worksheet.getCell('L2').value = 'X';
  worksheet.getCell('M2').value = 'Y';
  worksheet.getCell('N2').value = 'Z';
}

export async function writePeriod(
  period: IPeriodFE,
  worksheet: Excel.Worksheet,
) {
  let modeCount: number = period.modeCoupling.modeID.length;
  for (let i = 0; i < modeCount; i++) {
    // write mode
    worksheet.getCell(`A${3 + i}`).value = period.modeCoupling.modeID[i];

    // write coupling period
    worksheet.getCell(`B${3 + i}`).value = period.modeCoupling.period[i];
    worksheet.getCell(`C${3 + i}`).value = period.modeCoupling.angle[i];
    worksheet.getCell(`D${3 + i}`).value = period.modeCoupling.factorX[i];
    worksheet.getCell(`E${3 + i}`).value = period.modeCoupling.factorY[i];
    worksheet.getCell(`F${3 + i}`).value = period.modeCoupling.factorZ[i];

    // write seismic period
    worksheet.getCell(`G${3 + i}`).value = period.modeSeismic.period[i];
    worksheet.getCell(`H${3 + i}`).value = period.modeSeismic.angle[i];
    worksheet.getCell(`I${3 + i}`).value = period.modeSeismic.factorX[i];
    worksheet.getCell(`J${3 + i}`).value = period.modeSeismic.factorY[i];
    worksheet.getCell(`K${3 + i}`).value = period.modeSeismic.factorZ[i];

    // write mode mass
    worksheet.getCell(`L${3 + i}`).value = period.modeMass.factorX[i];
    worksheet.getCell(`M${3 + i}`).value = period.modeMass.factorY[i];
    worksheet.getCell(`N${3 + i}`).value = period.modeMass.factorZ[i];
  }
}

export async function formatPeriod(worksheet: Excel.Worksheet) {
  distributeFormat(worksheet);

  rangeFillColor(worksheet, 1, 1, 2, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 2, 2, 6, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 7, 2, 11, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 12, 2, 14, 'solid', '00F0FFFF', '00FFFFFF');

  worksheet.views = [{ state: 'frozen', xSplit: 1, ySplit: 2 }];
}
