import { IDistributeResultFE, IStructureFrontEnd } from '../interfaces';
import { rangeFillColor } from '../excel/commom';
import { compareDistributeFormat } from './commom';
import Excel from 'exceljs';

export async function initDistributeResult(
  worksheet: Excel.Worksheet,
  towers: number[],
) {
  const nums = towers.reduce((a, b) => a + b);

  worksheet.getCell('A2').value = '模型';
  worksheet.getCell('A3').value = '层号';

  worksheet.mergeCells(1, 2, 1, 1 + 4 * nums);
  worksheet.getCell(1, 2).value = '楼层属性';
  worksheet.mergeCells(1, 2 + 4 * nums, 1, 1 + 6 * nums);
  worksheet.getCell(1, 2 + 4 * nums).value = '质量比';
  worksheet.mergeCells(1, 2 + 6 * nums, 1, 1 + 10 * nums);
  worksheet.getCell(1, 2 + 6 * nums).value = '刚度比';
  worksheet.mergeCells(1, 2 + 10 * nums, 1, 1 + 12 * nums);
  worksheet.getCell(1, 2 + 10 * nums).value = '剪重比';
  worksheet.mergeCells(1, 2 + 12 * nums, 1, 1 + 14 * nums);
  worksheet.getCell(1, 2 + 11 * nums).value = '抗剪承载力比';
  worksheet.mergeCells(1, 2 + 14 * nums, 1, 1 + 18 * nums);
  worksheet.getCell(1, 2 + 14 * nums).value = '规定水平力下倾覆力矩分配';
  worksheet.mergeCells(1, 2 + 18 * nums, 1, 1 + 20 * nums);
  worksheet.getCell(1, 2 + 18 * nums).value = '地震作用下剪力分配';

  for (let i = 0, m = 0; i < towers.length; i++) {
    for (let k = 0; k < towers[i]; k++) {
      worksheet.mergeCells(2, 2 + 4 * m, 2, 5 + 4 * m);
      worksheet.getCell(2, 2 + 4 * m).value =
        towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`;
      worksheet.getCell(3, 2 + 4 * m).value = '层高\nm';
      worksheet.getCell(3, 3 + 4 * m).value = '累计高度\nm';
      worksheet.getCell(3, 4 + 4 * m).value = '面积\nm^2';
      worksheet.getCell(3, 5 + 4 * m).value = '墙地比\n%';

      worksheet.mergeCells(2, 2 + 2 * m + 4 * nums, 2, 3 + 2 * m + 4 * nums);
      worksheet.getCell(2, 2 + 2 * m + 4 * nums).value =
        towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`;
      worksheet.getCell(3, 2 + 2 * m + 4 * nums).value = '质量比';
      worksheet.getCell(3, 3 + 2 * m + 4 * nums).value = '单位\n质量比';

      worksheet.mergeCells(2, 2 + 4 * m + 6 * nums, 2, 5 + 4 * m + 6 * nums);
      worksheet.getCell(2, 2 + 4 * m + 6 * nums).value =
        towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`;
      worksheet.getCell(3, 2 + 4 * m + 6 * nums).value = 'X向';
      worksheet.getCell(3, 3 + 4 * m + 6 * nums).value = 'Y向';
      worksheet.getCell(3, 4 + 4 * m + 6 * nums).value = 'X向\n层高修正';
      worksheet.getCell(3, 5 + 4 * m + 6 * nums).value = 'Y向\n层高修正';

      worksheet.mergeCells(2, 2 + 2 * m + 10 * nums, 2, 3 + 2 * m + 10 * nums);
      worksheet.getCell(2, 2 + 2 * m + 10 * nums).value =
        towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`;
      worksheet.getCell(3, 2 + 2 * m + 10 * nums).value = 'X向';
      worksheet.getCell(3, 3 + 2 * m + 10 * nums).value = 'Y向';

      worksheet.mergeCells(2, 2 + 2 * m + 12 * nums, 2, 3 + 2 * m + 12 * nums);
      worksheet.getCell(2, 2 + 2 * m + 12 * nums).value =
        towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`;
      worksheet.getCell(3, 2 + 2 * m + 12 * nums).value = 'X向';
      worksheet.getCell(3, 3 + 2 * m + 12 * nums).value = 'Y向';

      worksheet.mergeCells(2, 2 + 4 * m + 14 * nums, 2, 5 + 4 * m + 14 * nums);
      worksheet.getCell(2, 2 + 4 * m + 14 * nums).value =
        towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`;
      worksheet.getCell(3, 2 + 4 * m + 14 * nums).value = 'X向柱';
      worksheet.getCell(3, 3 + 4 * m + 14 * nums).value = 'X向\n短肢墙';
      worksheet.getCell(3, 4 + 4 * m + 14 * nums).value = 'Y向柱';
      worksheet.getCell(3, 5 + 4 * m + 14 * nums).value = 'Y向\n短肢墙';

      worksheet.mergeCells(2, 2 + 2 * m + 18 * nums, 2, 3 + 2 * m + 18 * nums);
      worksheet.getCell(2, 2 + 2 * m + 18 * nums).value =
        towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`;
      worksheet.getCell(3, 2 + 2 * m + 18 * nums).value = 'X向柱';
      worksheet.getCell(3, 3 + 2 * m + 18 * nums).value = 'Y向柱';

      m++;
    }
  }
}

export async function writeDistributeResult(
  structures: IStructureFrontEnd[],
  worksheet: Excel.Worksheet,
) {
  const n = structures.length;
  let count = 0;
  const towers = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    towers[i] = new Set([
      ...structures[i].distributeResult.storey.towerID,
      ...structures[i].distributeResult.columnShear.towerID,
      ...structures[i].distributeResult.shearWeightRatio.towerID,
    ]).size;

    count =
      Math.max(
        structures[i].distributeResult.storey.storeyID[0],
        structures[i].distributeResult.columnShear.storeyID[0],
      ) > count
        ? Math.max(
            structures[i].distributeResult.storey.storeyID[0] ||
              structures[i].distributeResult.columnShear.storeyID[0],
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
      let distribute: any = {
        storey: {
          storeyID: [],
          height: [],
          heightToGround: [],
          area: [],
          wallSectionAreaRatio: [],
        },
        massRatio: {
          ratio: [],
          massPerAreaRatio: [],
        },
        stiffness: {
          ratx1: [],
          raty1: [],
          ratx2: [],
          raty2: [],
        },
        shearCapacityCheck: {
          ratioX: [],
          ratioY: [],
        },
        shearWeightRatio: {
          factorX: [],
          factorY: [],
        },
        momentPercent: {
          percentColumnX: [],
          percentWallX: [],
          percentColumnY: [],
          percentWallY: [],
        },
        columnShear: {
          percentColumnX: [],
          percentColumnY: [],
        },
      };
      if (towers[i] > 1) {
        structures[i].distributeResult.storey.towerID.forEach((val, index) => {
          if (val === k + 1) {
            distribute.storey.storeyID.push(
              structures[i].distributeResult.storey.storeyID[index],
            );
            distribute.storey.height.push(
              structures[i].distributeResult.storey.height[index],
            );
            distribute.storey.heightToGround.push(
              structures[i].distributeResult.storey.heightToGround[index],
            );
            distribute.storey.area.push(
              structures[i].distributeResult.storey.area[index],
            );
            distribute.storey.wallSectionAreaRatio.push(
              structures[i].distributeResult.storey.wallSectionAreaRatio[index],
            );

            distribute.massRatio.ratio.push(
              structures[i].distributeResult.massRatio.ratio[index],
            );
            distribute.massRatio.massPerAreaRatio.push(
              structures[i].distributeResult.massRatio.massPerAreaRatio[index],
            );

            distribute.stiffness.ratx1.push(
              structures[i].distributeResult.stiffness.ratx1[index],
            );
            distribute.stiffness.raty1.push(
              structures[i].distributeResult.stiffness.raty1[index],
            );
            distribute.stiffness.ratx2.push(
              structures[i].distributeResult.stiffness.ratx2[index],
            );
            distribute.stiffness.raty2.push(
              structures[i].distributeResult.stiffness.raty2[index],
            );

            distribute.shearCapacityCheck.ratioX.push(
              structures[i].distributeResult.shearCapacityCheck.ratioX[index],
            );
            distribute.shearCapacityCheck.ratioY.push(
              structures[i].distributeResult.shearCapacityCheck.ratioY[index],
            );

            distribute.shearWeightRatio.factorX.push(
              structures[i].distributeResult.shearWeightRatio.factorX[index],
            );
            distribute.shearWeightRatio.factorY.push(
              structures[i].distributeResult.shearWeightRatio.factorY[index],
            );

            distribute.momentPercent.percentColumnX.push(
              structures[i].distributeResult.momentPercent.percentColumnX[
                index
              ],
            );
            distribute.momentPercent.percentWallX.push(
              structures[i].distributeResult.momentPercent.percentWallX[index],
            );
            distribute.momentPercent.percentColumnY.push(
              structures[i].distributeResult.momentPercent.percentColumnY[
                index
              ],
            );
            distribute.momentPercent.percentWallY.push(
              structures[i].distributeResult.momentPercent.percentWallY[index],
            );

            distribute.columnShear.percentColumnX.push(
              structures[i].distributeResult.columnShear.percentColumnX[index],
            );
            distribute.columnShear.percentColumnY.push(
              structures[i].distributeResult.columnShear.percentColumnY[index],
            );
          }
        });
      } else {
        distribute = structures[i].distributeResult;
      }

      for (let j = 0; j < distribute.storey.storeyID.length; j++) {
        const index = count - distribute.storey.storeyID[j];
        // write storey
        worksheet.getCell(4 + index, 2 + 4 * m).value =
          distribute.storey.height[j];
        worksheet.getCell(4 + index, 3 + 4 * m).value =
          distribute.storey.heightToGround[j];
        worksheet.getCell(4 + index, 4 + 4 * m).value =
          distribute.storey.area[j];
        worksheet.getCell(4 + index, 5 + 4 * m).value = {
          formula: `round(${distribute.storey.wallSectionAreaRatio[j]},3)`,
          date1904: false,
        };

        // write mass ratio
        worksheet.getCell(4 + index, 2 + 2 * m + 4 * nums).value =
          distribute.massRatio.ratio[j];
        worksheet.getCell(4 + index, 3 + 2 * m + 4 * nums).value =
          distribute.massRatio.massPerAreaRatio[j];

        // write stiffness
        worksheet.getCell(4 + index, 2 + 4 * m + 6 * nums).value =
          distribute.stiffness.ratx1[j];
        worksheet.getCell(4 + index, 3 + 4 * m + 6 * nums).value =
          distribute.stiffness.raty1[j];
        worksheet.getCell(4 + index, 4 + 4 * m + 6 * nums).value =
          distribute.stiffness.ratx2[j];
        worksheet.getCell(4 + index, 5 + 4 * m + 6 * nums).value =
          distribute.stiffness.raty2[j];

        // write shear capacity check
        worksheet.getCell(4 + index, 2 + 2 * m + 10 * nums).value =
          distribute.shearCapacityCheck.ratioX[j];
        worksheet.getCell(4 + index, 3 + 2 * m + 10 * nums).value =
          distribute.shearCapacityCheck.ratioY[j];

        // write shear weight ratio
        worksheet.getCell(4 + index, 2 + 2 * m + 12 * nums).value =
          distribute.shearWeightRatio.factorX[j];
        worksheet.getCell(4 + index, 3 + 2 * m + 12 * nums).value =
          distribute.shearWeightRatio.factorY[j];

        // write moment distribute
        worksheet.getCell(4 + index, 2 + 4 * m + 14 * nums).value =
          distribute.momentPercent.percentColumnX[j];
        worksheet.getCell(4 + index, 3 + 4 * m + 14 * nums).value =
          distribute.momentPercent.percentWallX[j];
        worksheet.getCell(4 + index, 4 + 4 * m + 14 * nums).value =
          distribute.momentPercent.percentColumnY[j];
        worksheet.getCell(4 + index, 5 + 4 * m + 14 * nums).value =
          distribute.momentPercent.percentWallY[j];

        // write column shear distribute
        worksheet.getCell(4 + index, 2 + 2 * m + 18 * nums).value =
          distribute.columnShear.percentColumnX[j];
        worksheet.getCell(4 + index, 3 + 2 * m + 18 * nums).value =
          distribute.columnShear.percentColumnY[j];
      }
      m++;
    }
  }
}

export async function formatDistributeResult(
  worksheet: Excel.Worksheet,
  nums: number,
) {
  compareDistributeFormat(worksheet);

  worksheet.getRow(3).height = 30;

  rangeFillColor(worksheet, 1, 1, 3, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(
    worksheet,
    1,
    2,
    1,
    1 + 4 * nums,
    'solid',
    '00F0FFFF',
    '00FFFFFF',
  );
  rangeFillColor(
    worksheet,
    1,
    2 + 4 * nums,
    1,
    1 + 6 * nums,
    'solid',
    '00F0FFF0',
    '00FFFFFF',
  );
  rangeFillColor(
    worksheet,
    1,
    2 + 6 * nums,
    1,
    1 + 10 * nums,
    'solid',
    '00F0FFFF',
    '00FFFFFF',
  );
  rangeFillColor(
    worksheet,
    1,
    2 + 10 * nums,
    1,
    1 + 12 * nums,
    'solid',
    '00F0FFF0',
    '00FFFFFF',
  );
  rangeFillColor(
    worksheet,
    1,
    2 + 12 * nums,
    1,
    1 + 14 * nums,
    'solid',
    '00F0FFFF',
    '00FFFFFF',
  );
  rangeFillColor(
    worksheet,
    1,
    2 + 14 * nums,
    1,
    1 + 18 * nums,
    'solid',
    '00F0FFF0',
    '00FFFFFF',
  );
  rangeFillColor(
    worksheet,
    1,
    2 + 18 * nums,
    1,
    1 + 20 * nums,
    'solid',
    '00F0FFFF',
    '00FFFFFF',
  );

  worksheet.views = [{ state: 'frozen', xSplit: 1, ySplit: 3 }];
}
