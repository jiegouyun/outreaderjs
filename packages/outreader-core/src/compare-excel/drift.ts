import { IDriftFE, IStructureFrontEnd } from '../interfaces';
import { rangeFillColor } from '../excel/commom';
import { compareDistributeFormat } from './commom';
import Excel from 'exceljs';

export async function initDrift(worksheet: Excel.Worksheet, nums: number) {
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

  for (let i = 0; i < nums; i++) {
    worksheet.mergeCells(2, 2 + 6 * i, 2, 7 + 6 * i);
    worksheet.getCell(2, 2 + 6 * i).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 6 * i).value = 'EX';
    worksheet.getCell(3, 3 + 6 * i).value = 'EY';
    worksheet.getCell(3, 4 + 6 * i).value = 'WX+';
    worksheet.getCell(3, 5 + 6 * i).value = 'WY+';
    worksheet.getCell(3, 6 + 6 * i).value = 'CWX+';
    worksheet.getCell(3, 7 + 6 * i).value = 'CWX-';

    worksheet.mergeCells(2, 2 + 6 * i + 6 * nums, 2, 7 + 6 * i + 6 * nums);
    worksheet.getCell(2, 2 + 6 * i + 6 * nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 6 * i + 6 * nums).value = 'EX';
    worksheet.getCell(3, 3 + 6 * i + 6 * nums).value = 'EY';
    worksheet.getCell(3, 4 + 6 * i + 6 * nums).value = 'WX+';
    worksheet.getCell(3, 5 + 6 * i + 6 * nums).value = 'WY+';
    worksheet.getCell(3, 6 + 6 * i + 6 * nums).value = 'CWX+';
    worksheet.getCell(3, 7 + 6 * i + 6 * nums).value = 'CWX-';

    worksheet.mergeCells(2, 2 + 4 * i + 12 * nums, 2, 5 + 4 * i + 12 * nums);
    worksheet.getCell(2, 2 + 4 * i + 12 * nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 4 * i + 12 * nums).value = 'EX+';
    worksheet.getCell(3, 3 + 4 * i + 12 * nums).value = 'EX-';
    worksheet.getCell(3, 4 + 4 * i + 12 * nums).value = 'EY+';
    worksheet.getCell(3, 5 + 4 * i + 12 * nums).value = 'EY-';

    worksheet.mergeCells(2, 2 + 4 * i + 16 * nums, 2, 5 + 4 * i + 16 * nums);
    worksheet.getCell(2, 2 + 4 * i + 16 * nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 4 * i + 16 * nums).value = 'EX+';
    worksheet.getCell(3, 3 + 4 * i + 16 * nums).value = 'EX-';
    worksheet.getCell(3, 4 + 4 * i + 16 * nums).value = 'EY+';
    worksheet.getCell(3, 5 + 4 * i + 16 * nums).value = 'EY-';
  }
}

export async function writeDrift(
  structures: IStructureFrontEnd[],
  worksheet: Excel.Worksheet,
) {
  const nums = structures.length;
  let storeyID: number[] = [];
  for (let i = 0; i < nums; i++) {
    if (structures[i].drift.driftSeismicX.storeyID.length > storeyID.length) {
      storeyID = structures[i].drift.driftSeismicX.storeyID;
    }
  }
  const count = storeyID.length;

  for (let j = 0; j < count; j++) {
    // write storey
    worksheet.getCell(4 + j, 1).value = storeyID[j];
  }

  for (let i = 0; i < nums; i++) {
    const drift: IDriftFE = structures[i].drift;
    const diff = count - drift.driftSeismicX.storeyID.length;

    for (let j = 0; j < count; j++) {
      // write displacement
      worksheet.getCell(4 + j, 2 + 6 * i).value =
        drift.driftSeismicX.displacement[j - diff] || '';
      worksheet.getCell(4 + j, 3 + 6 * i).value =
        drift.driftSeismicY.displacement[j - diff] || '';
      worksheet.getCell(4 + j, 4 + 6 * i).value =
        drift.driftWindXP.displacement[j - diff] || '';
      worksheet.getCell(4 + j, 5 + 6 * i).value =
        drift.driftWindYP.displacement[j - diff] || '';
      worksheet.getCell(4 + j, 6 + 6 * i).value =
        drift.driftCrossWindXP.displacement[j - diff] || '';
      worksheet.getCell(4 + j, 7 + 6 * i).value =
        drift.driftCrossWindYP.displacement[j - diff] || '';

      // write drift
      worksheet.getCell(4 + j, 2 + 6 * i + 6 * nums).value =
        drift.driftSeismicX.drift[j - diff] || '';
      worksheet.getCell(4 + j, 3 + 6 * i + 6 * nums).value =
        drift.driftSeismicY.drift[j - diff] || '';
      worksheet.getCell(4 + j, 4 + 6 * i + 6 * nums).value =
        drift.driftWindXP.drift[j - diff] || '';
      worksheet.getCell(4 + j, 5 + 6 * i + 6 * nums).value =
        drift.driftWindYP.drift[j - diff] || '';
      worksheet.getCell(4 + j, 6 + 6 * i + 6 * nums).value =
        drift.driftCrossWindXP.drift[j - diff] || '';
      worksheet.getCell(4 + j, 7 + 6 * i + 6 * nums).value =
        drift.driftCrossWindYP.drift[j - diff] || '';

      // write displacement ratio
      worksheet.getCell(4 + j, 2 + 4 * i + 12 * nums).value =
        drift.ratioSeismicXEccP.ratio[j - diff] || '';
      worksheet.getCell(4 + j, 3 + 4 * i + 12 * nums).value =
        drift.ratioSeismicXEccN.ratio[j - diff] || '';
      worksheet.getCell(4 + j, 4 + 4 * i + 12 * nums).value =
        drift.ratioSeismicYEccP.ratio[j - diff] || '';
      worksheet.getCell(4 + j, 5 + 4 * i + 12 * nums).value =
        drift.ratioSeismicYEccN.ratio[j - diff] || '';

      // write storey displacement ratio
      worksheet.getCell(4 + j, 2 + 4 * i + 16 * nums).value =
        drift.ratioSeismicXEccP.ratioD[j - diff] || '';
      worksheet.getCell(4 + j, 3 + 4 * i + 16 * nums).value =
        drift.ratioSeismicXEccN.ratioD[j - diff] || '';
      worksheet.getCell(4 + j, 4 + 4 * i + 16 * nums).value =
        drift.ratioSeismicYEccP.ratioD[j - diff] || '';
      worksheet.getCell(4 + j, 5 + 4 * i + 16 * nums).value =
        drift.ratioSeismicYEccN.ratioD[j - diff] || '';
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
