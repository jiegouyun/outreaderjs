import { IForceFE, IStructureFrontEnd } from '../interfaces';
import { rangeFillColor } from '../excel/commom';
import { compareDistributeFormat } from './commom';
import Excel from 'exceljs';

export async function initForce(worksheet: Excel.Worksheet, towers: number[]) {
  const nums = towers.reduce((a, b) => a + b);

  worksheet.getCell('A2').value = '模型';
  worksheet.getCell('A3').value = '层号';

  worksheet.mergeCells(1, 2, 1, 1 + 8 * nums);
  worksheet.getCell(1, 2).value = '风荷载';
  worksheet.mergeCells(1, 2 + 8 * nums, 1, 1 + 12 * nums);
  worksheet.getCell(1, 2 + 8 * nums).value = '地震作用';

  for (let i = 0, m = 0; i < towers.length; i++) {
    for (let k = 0; k < towers[i]; k++) {
      worksheet.mergeCells(2, 2 + 8 * m, 2, 9 + 8 * m);
      worksheet.getCell(2, 2 + 8 * m).value =
        towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`;
      worksheet.getCell(3, 2 + 8 * m).value = '顺风剪力X\nkN';
      worksheet.getCell(3, 3 + 8 * m).value = '顺风弯矩X\nkNm';
      worksheet.getCell(3, 4 + 8 * m).value = '顺风剪力Y\nkN';
      worksheet.getCell(3, 5 + 8 * m).value = '顺风弯矩Y\nkNm';
      worksheet.getCell(3, 6 + 8 * m).value = '横风剪力X\nkN';
      worksheet.getCell(3, 7 + 8 * m).value = '横风弯矩X\nkNm';
      worksheet.getCell(3, 8 + 8 * m).value = '横风剪力Y\nkN';
      worksheet.getCell(3, 9 + 8 * m).value = '横风弯矩Y\nkNm';

      worksheet.mergeCells(2, 2 + 4 * m + 8 * nums, 2, 5 + 4 * m + 8 * nums);
      worksheet.getCell(2, 2 + 4 * m + 8 * nums).value =
        towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`;
      worksheet.getCell(3, 2 + 4 * m + 8 * nums).value = '剪力X\nkN';
      worksheet.getCell(3, 3 + 4 * m + 8 * nums).value = '弯矩X\nkNm';
      worksheet.getCell(3, 4 + 4 * m + 8 * nums).value = '剪力Y\nkN';
      worksheet.getCell(3, 5 + 4 * m + 8 * nums).value = '弯矩Y\nkNm';

      m++;
    }
  }
}

export async function writeForce(
  structures: IStructureFrontEnd[],
  worksheet: Excel.Worksheet,
) {
  const n = structures.length;
  let count = 0;
  const towers = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    towers[i] = new Set([
      ...structures[i].force.wind.towerID,
      ...structures[i].force.seismic.towerID,
    ]).size;

    count =
      Math.max(
        structures[i].force.wind.storeyID[0],
        structures[i].force.seismic.storeyID[0],
      ) > count
        ? Math.max(
            structures[i].force.wind.storeyID[0],
            structures[i].force.seismic.storeyID[0],
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
      let force: any = {
        wind: {
          storeyID: [],
          shearAlongX: [],
          momentAlongX: [],
          shearAlongY: [],
          momentAlongY: [],
          shearCrossX: [],
          momentCrossX: [],
          shearCrossY: [],
          momentCrossY: [],
        },
        seismic: {
          storeyID: [],
          shearX: [],
          momentX: [],
          shearY: [],
          momentY: [],
        },
      };
      if (towers[i] > 1) {
        structures[i].force.wind.towerID.forEach((val, index) => {
          if (val === k + 1) {
            force.wind.storeyID.push(structures[i].force.wind.storeyID[index]);
            force.wind.shearAlongX.push(
              structures[i].force.wind.shearAlongX[index],
            );
            force.wind.momentAlongX.push(
              structures[i].force.wind.momentAlongX[index],
            );
            force.wind.shearAlongY.push(
              structures[i].force.wind.shearAlongY[index],
            );
            force.wind.momentAlongY.push(
              structures[i].force.wind.momentAlongY[index],
            );
            force.wind.shearCrossX.push(
              structures[i].force.wind.shearCrossX[index],
            );
            force.wind.momentCrossX.push(
              structures[i].force.wind.momentCrossX[index],
            );
            force.wind.shearCrossY.push(
              structures[i].force.wind.shearCrossY[index],
            );
            force.wind.momentCrossY.push(
              structures[i].force.wind.momentCrossY[index],
            );
          }
        });
        structures[i].force.seismic.towerID.forEach((val, index) => {
          if (val === k + 1) {
            force.seismic.storeyID.push(
              structures[i].force.seismic.storeyID[index],
            );
            force.seismic.shearX.push(
              structures[i].force.seismic.shearX[index],
            );
            force.seismic.momentX.push(
              structures[i].force.seismic.momentX[index],
            );
            force.seismic.shearY.push(
              structures[i].force.seismic.shearY[index],
            );
            force.seismic.momentY.push(
              structures[i].force.seismic.momentY[index],
            );
          }
        });
      } else {
        force = structures[i].force;
      }

      for (let j = 0; j < force.wind.storeyID.length; j++) {
        const index = count - force.wind.storeyID[j];
        // write wind force
        worksheet.getCell(4 + index, 2 + 8 * m).value =
          force.wind.shearAlongX[j];
        worksheet.getCell(4 + index, 3 + 8 * m).value =
          force.wind.momentAlongX[j];
        worksheet.getCell(4 + index, 4 + 8 * m).value =
          force.wind.shearAlongY[j];
        worksheet.getCell(4 + index, 5 + 8 * m).value =
          force.wind.momentAlongY[j];
        worksheet.getCell(4 + index, 6 + 8 * m).value =
          force.wind.shearCrossX[j];
        worksheet.getCell(4 + index, 7 + 8 * m).value =
          force.wind.momentCrossX[j];
        worksheet.getCell(4 + index, 8 + 8 * m).value =
          force.wind.shearCrossY[j];
        worksheet.getCell(4 + index, 9 + 8 * m).value =
          force.wind.momentCrossY[j];
      }
      for (let j = 0; j < force.seismic.storeyID.length; j++) {
        const index = count - force.seismic.storeyID[j];
        // write seismic force
        worksheet.getCell(4 + index, 2 + 4 * m + 8 * nums).value =
          force.seismic.shearX[j];
        worksheet.getCell(4 + index, 3 + 4 * m + 8 * nums).value =
          force.seismic.momentX[j];
        worksheet.getCell(4 + index, 4 + 4 * m + 8 * nums).value =
          force.seismic.shearY[j];
        worksheet.getCell(4 + index, 5 + 4 * m + 8 * nums).value =
          force.seismic.momentY[j];
      }
      m++;
    }
  }
}

export async function formatForce(worksheet: Excel.Worksheet, nums: number) {
  compareDistributeFormat(worksheet);

  worksheet.getRow(3).height = 30;

  rangeFillColor(worksheet, 1, 1, 3, 1, 'solid', '00F0FFF0', '00FFFFFF');
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
