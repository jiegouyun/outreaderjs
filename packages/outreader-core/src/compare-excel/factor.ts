import { IFactorFE, IStructureFrontEnd } from '../interfaces';
import { rangeFillColor } from '../excel/commom';
import { compareDistributeFormat } from './commom';
import Excel from 'exceljs';

export async function initFactor(worksheet: Excel.Worksheet, towers: number[]) {
  const nums = towers.reduce((a, b) => a + b);

  worksheet.getCell('A2').value = '模型';
  worksheet.getCell('A3').value = '层号';

  worksheet.mergeCells(1, 2, 1, 1 + nums);
  worksheet.getCell(1, 2).value = '薄弱层剪力放大';
  worksheet.mergeCells(1, 2 + nums, 1, 1 + 3 * nums);
  worksheet.getCell(1, 2 + nums).value = '剪重比调整';
  worksheet.mergeCells(1, 2 + 3 * nums, 1, 1 + 5 * nums);
  worksheet.getCell(1, 2 + 3 * nums).value = '0.2V0调整';

  for (let i = 0, m = 0; i < towers.length; i++) {
    for (let k = 0; k < towers[i]; k++) {
      worksheet.getCell(2, 2 + m).value =
        towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`;
      worksheet.getCell(3, 2 + m).value = '系数';

      worksheet.mergeCells(2, 2 + 2 * m + nums, 2, 3 + 2 * m + nums);
      worksheet.getCell(2, 2 + 2 * m + nums).value =
        towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`;
      worksheet.getCell(3, 2 + 2 * m + nums).value = 'X向';
      worksheet.getCell(3, 3 + 2 * m + nums).value = 'Y向';

      worksheet.mergeCells(2, 2 + 2 * m + 3 * nums, 2, 3 + 2 * m + 3 * nums);
      worksheet.getCell(2, 2 + 2 * m + 3 * nums).value =
        towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`;
      worksheet.getCell(3, 2 + 2 * m + 3 * nums).value = 'X向';
      worksheet.getCell(3, 3 + 2 * m + 3 * nums).value = 'Y向';

      m++;
    }
  }
}

export async function writeFactor(
  structures: IStructureFrontEnd[],
  worksheet: Excel.Worksheet,
) {
  const n = structures.length;
  let count = 0;
  const towers = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    towers[i] = new Set([
      ...structures[i].factor.stiffness.towerID,
      ...structures[i].factor.v02qFactor.towerID,
      ...structures[i].factor.shearWeightRatioModify.towerID,
    ]).size;

    count =
      Math.max(
        structures[i].factor.stiffness.storeyID[0],
        structures[i].factor.v02qFactor.storeyID[0],
        structures[i].factor.shearWeightRatioModify.storeyID[0],
      ) > count
        ? Math.max(
            structures[i].factor.stiffness.storeyID[0],
            structures[i].factor.v02qFactor.storeyID[0],
            structures[i].factor.shearWeightRatioModify.storeyID[0],
          )
        : count;
  }

  const nums = towers.reduce((a, b) => a + b);
  const storeyID = Array.from(Array(count).keys())
    .reverse()
    .map((val) => val + 1);

  for (let j = 0; j < count; j++) {
    // write storey
    worksheet.getCell(4 + j, 1).value = storeyID[j];
  }

  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      let factor: any = {
        stiffness: {
          storeyID: [],
          weakStoreyFactor: [],
        },
        shearWeightRatioModify: {
          factorX: [],
          factorY: [],
        },
        v02qFactor: {
          storeyID: [],
          factorX: [],
          factorY: [],
        },
      };
      if (towers[i] > 1) {
        structures[i].factor.stiffness.towerID.forEach((val, index) => {
          if (val === k + 1) {
            factor.stiffness.storeyID.push(
              structures[i].factor.stiffness.storeyID[index],
            );
            factor.stiffness.weakStoreyFactor.push(
              structures[i].factor.stiffness.weakStoreyFactor[index],
            );

            factor.shearWeightRatioModify.factorX.push(
              structures[i].factor.shearWeightRatioModify.factorX[index],
            );
            factor.shearWeightRatioModify.factorY.push(
              structures[i].factor.shearWeightRatioModify.factorY[index],
            );
          }
        });
        structures[i].factor.v02qFactor.towerID.forEach((val, index) => {
          if (val === k + 1) {
            factor.v02qFactor.storeyID.push(
              structures[i].factor.v02qFactor.storeyID[index],
            );
            factor.v02qFactor.factorX.push(
              structures[i].factor.v02qFactor.factorX[index],
            );
            factor.v02qFactor.factorY.push(
              structures[i].factor.v02qFactor.factorY[index],
            );
          }
        });
      } else {
        factor = structures[i].factor;
      }

      for (let j = 0; j < factor.stiffness.storeyID.length; j++) {
        const index = count - factor.stiffness.storeyID[j];
        // write wesk storey shear factor
        worksheet.getCell(4 + index, 2 + m).value =
          factor.stiffness.weakStoreyFactor[j];

        // write shear weight ratio factor
        worksheet.getCell(4 + index, 2 + 2 * m + nums).value =
          factor.shearWeightRatioModify.factorX[j];
        worksheet.getCell(4 + index, 3 + 2 * m + nums).value =
          factor.shearWeightRatioModify.factorY[j];
      }
      for (let j = 0; j < factor.v02qFactor.storeyID.length; j++) {
        const index = count - factor.v02qFactor.storeyID[j];
        // write storey
        worksheet.getCell(4 + index, 2 + 2 * m + 3 * nums).value =
          factor.v02qFactor.factorX[j];
        worksheet.getCell(4 + index, 3 + 2 * m + 3 * nums).value =
          factor.v02qFactor.factorY[j];
      }
      m++;
    }
  }
}

export async function formatFactor(worksheet: Excel.Worksheet, nums: number) {
  compareDistributeFormat(worksheet);

  rangeFillColor(worksheet, 1, 1, 3, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 2, 1, 1 + nums, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(
    worksheet,
    1,
    2 + nums,
    1,
    1 + 3 * nums,
    'solid',
    '00F0FFF0',
    '00FFFFFF',
  );
  rangeFillColor(
    worksheet,
    1,
    2 + 3 * nums,
    1,
    1 + 5 * nums,
    'solid',
    '00F0FFFF',
    '00FFFFFF',
  );

  worksheet.views = [{ state: 'frozen', xSplit: 1, ySplit: 3 }];
}
