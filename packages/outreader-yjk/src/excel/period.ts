import { IStructure } from '@outreader/core';
import { rangeSetBorder, rangeFillColor, distributeFormat } from './commom';
import Excel from 'exceljs';

export function initPeriod(worksheet: Excel.Worksheet): void {
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

export function writePeriod(
  structure: IStructure,
  worksheet: Excel.Worksheet,
): void {
  let modeCount: number = (structure.wzq?.modeCoupling.modeID as number[])
    .length;
  for (let i = 0; i < modeCount; i++) {
    // write mode
    worksheet.getCell(`A${3 + i}`).value =
      structure.wzq?.modeCoupling.modeID[i] || '';

    // write coupling period
    worksheet.getCell(`B${3 + i}`).value =
      structure.wzq?.modeCoupling.period[i] || '';
    worksheet.getCell(`C${3 + i}`).value =
      structure.wzq?.modeCoupling.angle[i] || '';
    worksheet.getCell(`D${3 + i}`).value =
      structure.wzq?.modeCoupling.factorX[i] || '';
    worksheet.getCell(`E${3 + i}`).value =
      structure.wzq?.modeCoupling.factorY[i] || '';
    worksheet.getCell(`F${3 + i}`).value =
      structure.wzq?.modeCoupling.factorZ[i] || '';

    // write seismic period
    worksheet.getCell(`G${3 + i}`).value =
      structure.wzq?.modeSeismic.period[i] || '';
    worksheet.getCell(`H${3 + i}`).value =
      structure.wzq?.modeSeismic.angle[i] || '';
    worksheet.getCell(`I${3 + i}`).value =
      structure.wzq?.modeSeismic.factorX[i] || '';
    worksheet.getCell(`J${3 + i}`).value =
      structure.wzq?.modeSeismic.factorY[i] || '';
    worksheet.getCell(`K${3 + i}`).value =
      structure.wzq?.modeSeismic.factorZ[i] || '';

    // write mode mass
    worksheet.getCell(`L${3 + i}`).value =
      structure.wzq?.modeMass.factorX[i] || '';
    worksheet.getCell(`M${3 + i}`).value =
      structure.wzq?.modeMass.factorY[i] || '';
    worksheet.getCell(`N${3 + i}`).value =
      structure.wzq?.modeMass.factorZ[i] || '';
  }
}

export function formatPeriod(worksheet: Excel.Worksheet): void {
  distributeFormat(worksheet);
  // let rowCount: number = worksheet.rowCount;
  // let colCount: number = worksheet.columnCount;
  // for (let col = 1; col <= colCount; col++) {
  //   worksheet.getColumn(col).width = 10;
  //   worksheet.getColumn(col).alignment = {
  //     horizontal: 'center',
  //     vertical: 'middle',
  //   };
  //   worksheet.getColumn(col).font = { name: 'Arial', size: 10 };
  // }

  // for (let row = 1; row <= rowCount; row++) {
  //   worksheet.getRow(row).height = 20;
  // }

  // rangeSetBorder(
  //   worksheet,
  //   1,
  //   1,
  //   rowCount,
  //   colCount,
  //   'thin',
  //   'thin',
  //   'thin',
  //   'thin',
  // );
  // rangeSetBorder(
  //   worksheet,
  //   1,
  //   2,
  //   1,
  //   colCount - 1,
  //   'medium',
  //   'thin',
  //   'thin',
  //   'thin',
  // );
  // rangeSetBorder(
  //   worksheet,
  //   2,
  //   1,
  //   rowCount - 1,
  //   1,
  //   'thin',
  //   'medium',
  //   'thin',
  //   'thin',
  // );
  // rangeSetBorder(
  //   worksheet,
  //   rowCount,
  //   2,
  //   rowCount,
  //   colCount - 1,
  //   'thin',
  //   'thin',
  //   'medium',
  //   'thin',
  // );
  // rangeSetBorder(
  //   worksheet,
  //   2,
  //   colCount,
  //   rowCount - 1,
  //   colCount,
  //   'thin',
  //   'thin',
  //   'thin',
  //   'medium',
  // );
  // rangeSetBorder(worksheet, 1, 1, 1, 1, 'medium', 'medium', 'thin', 'thin');
  // rangeSetBorder(
  //   worksheet,
  //   rowCount,
  //   1,
  //   rowCount,
  //   1,
  //   'thin',
  //   'medium',
  //   'medium',
  //   'thin',
  // );
  // rangeSetBorder(
  //   worksheet,
  //   rowCount,
  //   colCount,
  //   rowCount,
  //   colCount,
  //   'thin',
  //   'thin',
  //   'medium',
  //   'medium',
  // );
  // rangeSetBorder(
  //   worksheet,
  //   1,
  //   colCount,
  //   1,
  //   colCount,
  //   'medium',
  //   'thin',
  //   'thin',
  //   'medium',
  // );
  // rangeSetBorder(
  //   worksheet,
  //   2,
  //   2,
  //   2,
  //   colCount - 1,
  //   'thin',
  //   'thin',
  //   'medium',
  //   'thin',
  // );
  // rangeSetBorder(worksheet, 2, 1, 2, 1, 'thin', 'medium', 'medium', 'thin');
  // rangeSetBorder(
  //   worksheet,
  //   2,
  //   colCount,
  //   2,
  //   colCount,
  //   'thin',
  //   'thin',
  //   'medium',
  //   'medium',
  // );

  rangeFillColor(worksheet, 1, 1, 2, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 2, 2, 6, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 7, 2, 11, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 12, 2, 14, 'solid', '00F0FFFF', '00FFFFFF');
}
