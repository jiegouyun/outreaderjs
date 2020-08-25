import { IFactorFE, IStructureFrontEnd } from '../interfaces';
import { rangeFillColor } from '../excel/commom';
import { compareDistributeFormat } from './commom';
import Excel from 'exceljs';

export async function initFactor(worksheet: Excel.Worksheet, nums: number) {
  worksheet.getCell('A2').value = '模型';
  worksheet.getCell('A3').value = '层号';

  worksheet.mergeCells(1, 2, 1, 1 + nums);
  worksheet.getCell(1, 2).value = '薄弱层剪力放大';
  worksheet.mergeCells(1, 2 + nums, 1, 1 + 3 * nums);
  worksheet.getCell(1, 2 + nums).value = '剪重比调整';
  worksheet.mergeCells(1, 2 + 3 * nums, 1, 1 + 5 * nums);
  worksheet.getCell(1, 2 + 3 * nums).value = '0.2V0调整';

  for (let i = 0; i < nums; i++) {
    worksheet.getCell(2, 2 + i).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + i).value = '系数';

    worksheet.mergeCells(2, 2 + 2 * i + nums, 2, 3 + 2 * i + nums);
    worksheet.getCell(2, 2 + 2 * i + nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 2 * i + nums).value = 'X向';
    worksheet.getCell(3, 3 + 2 * i + nums).value = 'Y向';

    worksheet.mergeCells(2, 2 + 2 * i + 3 * nums, 2, 3 + 2 * i + 3 * nums);
    worksheet.getCell(2, 2 + 2 * i + 3 * nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 2 * i + 3 * nums).value = 'X向';
    worksheet.getCell(3, 3 + 2 * i + 3 * nums).value = 'Y向';
  }
}

export async function writeFactor(
  structures: IStructureFrontEnd[],
  worksheet: Excel.Worksheet,
) {
  const nums = structures.length;
  let storeyID: number[] = [];
  for (let i = 0; i < nums; i++) {
    if (
      (structures[i].factor.stiffness || structures[i].factor.v02qFactor)
        .storeyID.length > storeyID.length
    ) {
      storeyID = (
        structures[i].factor.stiffness || structures[i].factor.v02qFactor
      ).storeyID;
    }
  }
  const count = storeyID.length;

  for (let j = 0; j < count; j++) {
    // write storey
    worksheet.getCell(4 + j, 1).value = storeyID[j];
  }

  for (let i = 0; i < nums; i++) {
    const factor: IFactorFE = structures[i].factor;
    const diff =
      count - (factor.stiffness || factor.v02qFactor).storeyID.length;

    for (let j = 0; j < count; j++) {
      // write wesk storey shear factor
      worksheet.getCell(4 + j, 2 + i).value =
        factor.stiffness.weakStoreyFactor[j - diff] || '';

      // write shear weight ratio factor
      worksheet.getCell(4 + j, 2 + 2 * i + nums).value =
        factor.shearWeightRatioModify.factorX[j - diff] || '';
      worksheet.getCell(4 + j, 3 + 2 * i + nums).value =
        factor.shearWeightRatioModify.factorY[j - diff] || '';

      // write storey
      worksheet.getCell(4 + j, 2 + 2 * i + 3 * nums).value =
        factor.v02qFactor.factorX[j - diff] || '';
      worksheet.getCell(4 + j, 3 + 2 * i + 3 * nums).value =
        factor.v02qFactor.factorY[j - diff] || '';
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
