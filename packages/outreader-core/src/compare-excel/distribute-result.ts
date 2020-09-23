import { IDistributeResultFE, IStructureFrontEnd } from '../interfaces';
import { rangeFillColor } from '../excel/commom';
import { compareDistributeFormat } from './commom';
import Excel from 'exceljs';

export async function initDistributeResult(
  worksheet: Excel.Worksheet,
  nums: number,
) {
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

  for (let i = 0; i < nums; i++) {
    worksheet.mergeCells(2, 2 + 4 * i, 2, 5 + 4 * i);
    worksheet.getCell(2, 2 + 4 * i).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 4 * i).value = '层高\nm';
    worksheet.getCell(3, 3 + 4 * i).value = '累计高度\nm';
    worksheet.getCell(3, 4 + 4 * i).value = '面积\nm^2';
    worksheet.getCell(3, 5 + 4 * i).value = '墙地比\n%';

    worksheet.mergeCells(2, 2 + 2 * i + 4 * nums, 2, 3 + 2 * i + 4 * nums);
    worksheet.getCell(2, 2 + 2 * i + 4 * nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 2 * i + 4 * nums).value = '质量比';
    worksheet.getCell(3, 3 + 2 * i + 4 * nums).value = '单位\n质量比';

    worksheet.mergeCells(2, 2 + 4 * i + 6 * nums, 2, 5 + 4 * i + 6 * nums);
    worksheet.getCell(2, 2 + 4 * i + 6 * nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 4 * i + 6 * nums).value = 'X向';
    worksheet.getCell(3, 3 + 4 * i + 6 * nums).value = 'Y向';
    worksheet.getCell(3, 4 + 4 * i + 6 * nums).value = 'X向\n层高修正';
    worksheet.getCell(3, 5 + 4 * i + 6 * nums).value = 'Y向\n层高修正';

    worksheet.mergeCells(2, 2 + 2 * i + 10 * nums, 2, 3 + 2 * i + 10 * nums);
    worksheet.getCell(2, 2 + 2 * i + 10 * nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 2 * i + 10 * nums).value = 'X向';
    worksheet.getCell(3, 3 + 2 * i + 10 * nums).value = 'Y向';

    worksheet.mergeCells(2, 2 + 2 * i + 12 * nums, 2, 3 + 2 * i + 12 * nums);
    worksheet.getCell(2, 2 + 2 * i + 12 * nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 2 * i + 12 * nums).value = 'X向';
    worksheet.getCell(3, 3 + 2 * i + 12 * nums).value = 'Y向';

    worksheet.mergeCells(2, 2 + 4 * i + 14 * nums, 2, 5 + 4 * i + 14 * nums);
    worksheet.getCell(2, 2 + 4 * i + 14 * nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 4 * i + 14 * nums).value = 'X向柱';
    worksheet.getCell(3, 3 + 4 * i + 14 * nums).value = 'X向\n短肢墙';
    worksheet.getCell(3, 4 + 4 * i + 14 * nums).value = 'Y向柱';
    worksheet.getCell(3, 5 + 4 * i + 14 * nums).value = 'Y向\n短肢墙';

    worksheet.mergeCells(2, 2 + 2 * i + 18 * nums, 2, 3 + 2 * i + 18 * nums);
    worksheet.getCell(2, 2 + 2 * i + 18 * nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 2 * i + 18 * nums).value = 'X向柱';
    worksheet.getCell(3, 3 + 2 * i + 18 * nums).value = 'Y向柱';
  }
}

export async function writeDistributeResult(
  structures: IStructureFrontEnd[],
  worksheet: Excel.Worksheet,
) {
  const nums = structures.length;
  let storeyID: number[] = [];
  for (let i = 0; i < nums; i++) {
    if (
      (
        structures[i].distributeResult.storey ||
        structures[i].distributeResult.columnShear
      ).storeyID.length > storeyID.length
    ) {
      storeyID = (
        structures[i].distributeResult.storey ||
        structures[i].distributeResult.columnShear
      ).storeyID;
    }
  }
  const count = storeyID.length;

  for (let j = 0; j < count; j++) {
    // write storey
    worksheet.getCell(4 + j, 1).value = storeyID[j];
  }

  for (let i = 0; i < nums; i++) {
    const distribute: IDistributeResultFE = structures[i].distributeResult;
    const diff =
      count - (distribute.storey || distribute.columnShear).storeyID.length;

    for (let j = 0; j < count; j++) {
      // write storey
      worksheet.getCell(4 + j, 2 + 4 * i).value =
        distribute.storey.height[j - diff] || '';
      worksheet.getCell(4 + j, 3 + 4 * i).value =
        distribute.storey.heightToGround[j - diff] || '';
      worksheet.getCell(4 + j, 4 + 4 * i).value =
        distribute.storey.area[j - diff] || '';
      worksheet.getCell(4 + j, 5 + 4 * i).value = {
        formula: `round(${
          distribute.storey.wallSectionAreaRatio[j - diff] || 0
        },3)`,
        date1904: false,
      };

      // write mass ratio
      worksheet.getCell(4 + j, 2 + 2 * i + 4 * nums).value =
        distribute.massRatio.ratio[j - diff] || '';
      worksheet.getCell(4 + j, 3 + 2 * i + 4 * nums).value =
        distribute.massRatio.massPerAreaRatio[j - diff] || '';

      // write stiffness
      worksheet.getCell(4 + j, 2 + 4 * i + 6 * nums).value =
        distribute.stiffness.ratx1[j - diff] || '';
      worksheet.getCell(4 + j, 3 + 4 * i + 6 * nums).value =
        distribute.stiffness.raty1[j - diff] || '';
      worksheet.getCell(4 + j, 4 + 4 * i + 6 * nums).value =
        distribute.stiffness.ratx2[j - diff] || '';
      worksheet.getCell(4 + j, 5 + 4 * i + 6 * nums).value =
        distribute.stiffness.raty2[j - diff] || '';

      // write shear capacity check
      worksheet.getCell(4 + j, 2 + 2 * i + 10 * nums).value =
        distribute.shearCapacityCheck.ratioX[j - diff] || '';
      worksheet.getCell(4 + j, 3 + 2 * i + 10 * nums).value =
        distribute.shearCapacityCheck.ratioY[j - diff] || '';

      // write shear weight ratio
      worksheet.getCell(4 + j, 2 + 2 * i + 12 * nums).value =
        distribute.shearWeightRatio.factorX[j - diff] || '';
      worksheet.getCell(4 + j, 3 + 2 * i + 12 * nums).value =
        distribute.shearWeightRatio.factorY[j - diff] || '';

      // write moment distribute
      worksheet.getCell(4 + j, 2 + 4 * i + 14 * nums).value =
        distribute.momentPercent.percentColumnX[j - diff] || '';
      worksheet.getCell(4 + j, 3 + 4 * i + 14 * nums).value =
        distribute.momentPercent.percentWallX[j - diff] || '';
      worksheet.getCell(4 + j, 4 + 4 * i + 14 * nums).value =
        distribute.momentPercent.percentColumnY[j - diff] || '';
      worksheet.getCell(4 + j, 5 + 4 * i + 14 * nums).value =
        distribute.momentPercent.percentWallY[j - diff] || '';

      // write column shear distribute
      worksheet.getCell(4 + j, 2 + 2 * i + 18 * nums).value =
        distribute.columnShear.percentColumnX[j - diff] || '';
      worksheet.getCell(4 + j, 3 + 2 * i + 18 * nums).value =
        distribute.columnShear.percentColumnY[j - diff] || '';
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
