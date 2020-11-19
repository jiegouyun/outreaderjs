import { IDriftFE, IStructureFrontEnd } from '../interfaces';
import { rangeFillColor } from '../excel/commom';
import { compareDistributeFormat } from './commom';
import Excel from 'exceljs';

export async function initDrift(worksheet: Excel.Worksheet, towers: number[]) {
  const nums = towers.reduce((a, b) => a + b);

  worksheet.getCell('A2').value = '模型';
  worksheet.getCell('A3').value = '层号';

  worksheet.mergeCells(1, 2, 1, 1 + 6 * nums);
  worksheet.getCell(1, 2).value = '位移';
  worksheet.mergeCells(1, 2 + 6 * nums, 1, 1 + 12 * nums);
  worksheet.getCell(1, 2 + 6 * nums).value = '层间位移角';
  worksheet.mergeCells(1, 2 + 12 * nums, 1, 1 + 16 * nums);
  worksheet.getCell(1, 2 + 12 * nums).value = '位移比';
  worksheet.mergeCells(1, 2 + 16 * nums, 1, 1 + 20 * nums);
  worksheet.getCell(1, 2 + 16 * nums).value = '层间位移比';

  for (let i = 0, m = 0; i < towers.length; i++) {
    for (let k = 0; k < towers[i]; k++) {
      worksheet.mergeCells(2, 2 + 6 * m, 2, 7 + 6 * m);
      worksheet.getCell(2, 2 + 6 * m).value =
        towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`;
      worksheet.getCell(3, 2 + 6 * m).value = 'EX';
      worksheet.getCell(3, 3 + 6 * m).value = 'EY';
      worksheet.getCell(3, 4 + 6 * m).value = 'WX+';
      worksheet.getCell(3, 5 + 6 * m).value = 'WY+';
      worksheet.getCell(3, 6 + 6 * m).value = 'CWX+';
      worksheet.getCell(3, 7 + 6 * m).value = 'CWX-';

      worksheet.mergeCells(2, 2 + 6 * m + 6 * nums, 2, 7 + 6 * m + 6 * nums);
      worksheet.getCell(2, 2 + 6 * m + 6 * nums).value =
        towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`;
      worksheet.getCell(3, 2 + 6 * m + 6 * nums).value = 'EX';
      worksheet.getCell(3, 3 + 6 * m + 6 * nums).value = 'EY';
      worksheet.getCell(3, 4 + 6 * m + 6 * nums).value = 'WX+';
      worksheet.getCell(3, 5 + 6 * m + 6 * nums).value = 'WY+';
      worksheet.getCell(3, 6 + 6 * m + 6 * nums).value = 'CWX+';
      worksheet.getCell(3, 7 + 6 * m + 6 * nums).value = 'CWX-';

      worksheet.mergeCells(2, 2 + 4 * m + 12 * nums, 2, 5 + 4 * m + 12 * nums);
      worksheet.getCell(2, 2 + 4 * m + 12 * nums).value =
        towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`;
      worksheet.getCell(3, 2 + 4 * m + 12 * nums).value = 'EX+';
      worksheet.getCell(3, 3 + 4 * m + 12 * nums).value = 'EX-';
      worksheet.getCell(3, 4 + 4 * m + 12 * nums).value = 'EY+';
      worksheet.getCell(3, 5 + 4 * m + 12 * nums).value = 'EY-';

      worksheet.mergeCells(2, 2 + 4 * m + 16 * nums, 2, 5 + 4 * m + 16 * nums);
      worksheet.getCell(2, 2 + 4 * m + 16 * nums).value =
        towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`;
      worksheet.getCell(3, 2 + 4 * m + 16 * nums).value = 'EX+';
      worksheet.getCell(3, 3 + 4 * m + 16 * nums).value = 'EX-';
      worksheet.getCell(3, 4 + 4 * m + 16 * nums).value = 'EY+';
      worksheet.getCell(3, 5 + 4 * m + 16 * nums).value = 'EY-';

      m++;
    }
  }
}

export async function writeDrift(
  structures: IStructureFrontEnd[],
  worksheet: Excel.Worksheet,
) {
  const n = structures.length;
  let count = 0;
  const towers = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    towers[i] = new Set([...structures[i].drift.driftWindXP.towerID]).size;

    count =
      structures[i].drift.driftWindXP.storeyID[0] > count
        ? structures[i].drift.driftWindXP.storeyID[0]
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
      let drift: any = {
        driftSeismicX: {
          storeyID: [],
          displacement: [],
          drift: [],
        },
        driftSeismicY: {
          displacement: [],
          drift: [],
        },
        driftWindXP: {
          displacement: [],
          drift: [],
        },
        driftWindYP: {
          displacement: [],
          drift: [],
        },
        driftCrossWindXP: {
          displacement: [],
          drift: [],
        },
        driftCrossWindYP: {
          displacement: [],
          drift: [],
        },
        ratioSeismicXEccP: {
          ratio: [],
          ratioD: [],
        },
        ratioSeismicXEccN: {
          ratio: [],
          ratioD: [],
        },
        ratioSeismicYEccP: {
          ratio: [],
          ratioD: [],
        },
        ratioSeismicYEccN: {
          ratio: [],
          ratioD: [],
        },
      };
      if (towers[i] > 1) {
        structures[i].drift.driftWindXP.towerID.forEach((val, index) => {
          if (val === k + 1) {
            drift.driftSeismicX.storeyID.push(
              structures[i].drift.driftWindXP.storeyID[index],
            );

            drift.driftSeismicX.displacement.push(
              structures[i].drift.driftSeismicX.displacement[index],
            );
            drift.driftSeismicY.displacement.push(
              structures[i].drift.driftSeismicY.displacement[index],
            );
            drift.driftWindXP.displacement.push(
              structures[i].drift.driftWindXP.displacement[index],
            );
            drift.driftWindYP.displacement.push(
              structures[i].drift.driftWindYP.displacement[index],
            );
            drift.driftCrossWindXP.displacement.push(
              structures[i].drift.driftCrossWindXP.displacement[index],
            );
            drift.driftCrossWindYP.displacement.push(
              structures[i].drift.driftCrossWindYP.displacement[index],
            );

            drift.driftSeismicX.drift.push(
              structures[i].drift.driftSeismicX.drift[index],
            );
            drift.driftSeismicY.drift.push(
              structures[i].drift.driftSeismicY.drift[index],
            );
            drift.driftWindXP.drift.push(
              structures[i].drift.driftWindXP.drift[index],
            );
            drift.driftWindYP.drift.push(
              structures[i].drift.driftWindYP.drift[index],
            );
            drift.driftCrossWindXP.drift.push(
              structures[i].drift.driftCrossWindXP.drift[index],
            );
            drift.driftCrossWindYP.drift.push(
              structures[i].drift.driftCrossWindYP.drift[index],
            );

            drift.ratioSeismicXEccP.ratio.push(
              structures[i].drift.ratioSeismicXEccP.ratio[index],
            );
            drift.ratioSeismicXEccN.ratio.push(
              structures[i].drift.ratioSeismicXEccN.ratio[index],
            );
            drift.ratioSeismicYEccP.ratio.push(
              structures[i].drift.ratioSeismicYEccP.ratio[index],
            );
            drift.ratioSeismicYEccN.ratio.push(
              structures[i].drift.ratioSeismicYEccN.ratio[index],
            );

            drift.ratioSeismicXEccP.ratioD.push(
              structures[i].drift.ratioSeismicXEccP.ratioD[index],
            );
            drift.ratioSeismicXEccN.ratioD.push(
              structures[i].drift.ratioSeismicXEccN.ratioD[index],
            );
            drift.ratioSeismicYEccP.ratioD.push(
              structures[i].drift.ratioSeismicYEccP.ratioD[index],
            );
            drift.ratioSeismicYEccN.ratioD.push(
              structures[i].drift.ratioSeismicYEccN.ratioD[index],
            );
          }
        });
      } else {
        drift = structures[i].drift;
      }

      for (let j = 0; j < drift.driftSeismicX.storeyID.length; j++) {
        const index = count - drift.driftSeismicX.storeyID[j];
        // write displacement
        worksheet.getCell(4 + index, 2 + 6 * m).value =
          drift.driftSeismicX.displacement[j];
        worksheet.getCell(4 + index, 3 + 6 * m).value =
          drift.driftSeismicY.displacement[j];
        worksheet.getCell(4 + index, 4 + 6 * m).value =
          drift.driftWindXP.displacement[j];
        worksheet.getCell(4 + index, 5 + 6 * m).value =
          drift.driftWindYP.displacement[j];
        worksheet.getCell(4 + index, 6 + 6 * m).value =
          drift.driftCrossWindXP.displacement[j];
        worksheet.getCell(4 + index, 7 + 6 * m).value =
          drift.driftCrossWindYP.displacement[j];

        // write drift
        worksheet.getCell(4 + index, 2 + 6 * m + 6 * nums).value =
          drift.driftSeismicX.drift[j];
        worksheet.getCell(4 + index, 3 + 6 * m + 6 * nums).value =
          drift.driftSeismicY.drift[j];
        worksheet.getCell(4 + index, 4 + 6 * m + 6 * nums).value =
          drift.driftWindXP.drift[j];
        worksheet.getCell(4 + index, 5 + 6 * m + 6 * nums).value =
          drift.driftWindYP.drift[j];
        worksheet.getCell(4 + index, 6 + 6 * m + 6 * nums).value =
          drift.driftCrossWindXP.drift[j];
        worksheet.getCell(4 + index, 7 + 6 * m + 6 * nums).value =
          drift.driftCrossWindYP.drift[j];

        // write displacement ratio
        worksheet.getCell(4 + index, 2 + 4 * m + 12 * nums).value =
          drift.ratioSeismicXEccP.ratio[j];
        worksheet.getCell(4 + index, 3 + 4 * m + 12 * nums).value =
          drift.ratioSeismicXEccN.ratio[j];
        worksheet.getCell(4 + index, 4 + 4 * m + 12 * nums).value =
          drift.ratioSeismicYEccP.ratio[j];
        worksheet.getCell(4 + index, 5 + 4 * m + 12 * nums).value =
          drift.ratioSeismicYEccN.ratio[j];

        // write storey displacement ratio
        worksheet.getCell(4 + index, 2 + 4 * m + 16 * nums).value =
          drift.ratioSeismicXEccP.ratioD[j];
        worksheet.getCell(4 + index, 3 + 4 * m + 16 * nums).value =
          drift.ratioSeismicXEccN.ratioD[j];
        worksheet.getCell(4 + index, 4 + 4 * m + 16 * nums).value =
          drift.ratioSeismicYEccP.ratioD[j];
        worksheet.getCell(4 + index, 5 + 4 * m + 16 * nums).value =
          drift.ratioSeismicYEccN.ratioD[j];
      }
      m++;
    }
  }
}

export async function formatDrift(worksheet: Excel.Worksheet, nums: number) {
  compareDistributeFormat(worksheet);

  rangeFillColor(worksheet, 1, 1, 3, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(
    worksheet,
    1,
    2,
    3,
    1 + 6 * nums,
    'solid',
    '00F0FFFF',
    '00FFFFFF',
  );
  rangeFillColor(
    worksheet,
    1,
    2 + 6 * nums,
    3,
    1 + 12 * nums,
    'solid',
    '00F0FFF0',
    '00FFFFFF',
  );
  rangeFillColor(
    worksheet,
    1,
    2 + 12 * nums,
    3,
    1 + 16 * nums,
    'solid',
    '00F0FFFF',
    '00FFFFFF',
  );
  rangeFillColor(
    worksheet,
    1,
    2 + 16 * nums,
    3,
    1 + 20 * nums,
    'solid',
    '00F0FFF0',
    '00FFFFFF',
  );

  worksheet.views = [{ state: 'frozen', xSplit: 1, ySplit: 3 }];
}
