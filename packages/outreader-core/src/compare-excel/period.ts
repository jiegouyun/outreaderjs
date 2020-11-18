import { IPeriodFE, IStructureFrontEnd } from '../interfaces';
import { rangeFillColor } from '../excel/commom';
import { compareDistributeFormat } from './commom';
import Excel from 'exceljs';

export async function initPeriod(worksheet: Excel.Worksheet, nums: number) {
  worksheet.getCell('A2').value = '模型';
  worksheet.getCell('A3').value = '振型';

  worksheet.mergeCells(1, 2, 1, 1 + 2 * nums);
  worksheet.getCell(1, 2).value = '考虑扭转耦联时的动力特性';
  worksheet.mergeCells(1, 2 + 2 * nums, 1, 1 + 4 * nums);
  worksheet.getCell(1, 2 + 2 * nums).value = '地震最大作用方向的动力特性';
  worksheet.mergeCells(1, 2 + 4 * nums, 1, 1 + 7 * nums);
  worksheet.getCell(1, 2 + 4 * nums).value = '质量参与系数';

  for (let i = 0; i < nums; i++) {
    worksheet.mergeCells(2, 2 + 2 * i, 2, 3 + 2 * i);
    worksheet.getCell(2, 2 + 2 * i).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 2 * i).value = '周期';
    worksheet.getCell(3, 3 + 2 * i).value = '转角';

    worksheet.mergeCells(2, 2 + 2 * i + 2 * nums, 2, 3 + 2 * i + 2 * nums);
    worksheet.getCell(2, 2 + 2 * i + 2 * nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 2 * i + 2 * nums).value = '周期';
    worksheet.getCell(3, 3 + 2 * i + 2 * nums).value = '转角';

    worksheet.mergeCells(2, 2 + 3 * i + 4 * nums, 2, 4 + 3 * i + 4 * nums);
    worksheet.getCell(2, 2 + 3 * i + 4 * nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 3 * i + 4 * nums).value = 'X';
    worksheet.getCell(3, 3 + 3 * i + 4 * nums).value = 'Y';
    worksheet.getCell(3, 4 + 3 * i + 4 * nums).value = 'Z';
  }
}

export async function writePeriod(
  structures: IStructureFrontEnd[],
  worksheet: Excel.Worksheet,
) {
  const nums = structures.length;

  let modeID: number[] = [];
  for (let i = 0; i < nums; i++) {
    if (structures[i].period.modeCoupling.modeID.length > modeID.length) {
      modeID = structures[i].period.modeCoupling.modeID;
    }
  }

  const count = modeID.length;

  for (let j = 0; j < count; j++) {
    // write mode
    worksheet.getCell(4 + j, 1).value = modeID[j];
  }

  for (let i = 0; i < nums; i++) {
    const period: IPeriodFE = structures[i].period;

    for (let j = 0; j < period.modeMass.modeID.length; j++) {
      // write coupling period
      worksheet.getCell(4 + j, 2 + 2 * i).value = period.modeCoupling.period[j];
      worksheet.getCell(4 + j, 3 + 2 * i).value = period.modeCoupling.angle[j];

      // write seismic period
      worksheet.getCell(4 + j, 2 + 2 * i + 2 * nums).value =
        period.modeSeismic.period[j];
      worksheet.getCell(4 + j, 3 + 2 * i + 2 * nums).value =
        period.modeSeismic.angle[j];

      // write mode mass
      worksheet.getCell(4 + j, 2 + 3 * i + 4 * nums).value =
        period.modeMass.factorX[j];
      worksheet.getCell(4 + j, 3 + 3 * i + 4 * nums).value =
        period.modeMass.factorY[j];
      worksheet.getCell(4 + j, 4 + 3 * i + 4 * nums).value =
        period.modeMass.factorZ[j];
    }
  }
}

export async function formatPeriod(worksheet: Excel.Worksheet, nums: number) {
  compareDistributeFormat(worksheet);

  rangeFillColor(worksheet, 1, 1, 3, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(
    worksheet,
    1,
    2,
    3,
    1 + 2 * nums,
    'solid',
    '00F0FFFF',
    '00FFFFFF',
  );
  rangeFillColor(
    worksheet,
    1,
    2 + 2 * nums,
    3,
    1 + 4 * nums,
    'solid',
    '00F0FFF0',
    '00FFFFFF',
  );
  rangeFillColor(
    worksheet,
    1,
    2 + 4 * nums,
    3,
    1 + 7 * nums,
    'solid',
    '00F0FFFF',
    '00FFFFFF',
  );

  worksheet.views = [{ state: 'frozen', xSplit: 1, ySplit: 3 }];
}
