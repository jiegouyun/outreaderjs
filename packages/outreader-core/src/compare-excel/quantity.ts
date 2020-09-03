import { IQuantityFE, IStructureFrontEnd } from '../interfaces';
import { rangeFillColor } from '../excel/commom';
import { compareDistributeFormat } from './commom';
import Excel from 'exceljs';

export async function initQuantity(worksheet: Excel.Worksheet, nums: number) {
  worksheet.getCell('A2').value = '模型';
  worksheet.getCell('A3').value = '层号';

  worksheet.mergeCells(1, 2, 1, 1 + nums);
  worksheet.getCell(1, 2).value = '面积';
  worksheet.mergeCells(1, 2 + nums, 1, 1 + 3 * nums);
  worksheet.getCell(1, 2 + nums).value = '砼';
  worksheet.mergeCells(1, 2 + 3 * nums, 1, 1 + 5 * nums);
  worksheet.getCell(1, 2 + 3 * nums).value = '型钢';
  worksheet.mergeCells(1, 2 + 5 * nums, 1, 1 + 7 * nums);
  worksheet.getCell(1, 2 + 5 * nums).value = '钢筋';

  for (let i = 0; i < nums; i++) {
    worksheet.getCell(2, 2 + i).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + i).value = '(m^2)';

    worksheet.mergeCells(2, 2 + 2 * i + nums, 2, 3 + 2 * i + nums);
    worksheet.getCell(2, 2 + 2 * i + nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 2 * i + nums).value = '用量\n（m^3）';
    worksheet.getCell(3, 3 + 2 * i + nums).value = '含量\n（m^3/m^2）';

    worksheet.mergeCells(2, 2 + 2 * i + 3 * nums, 2, 3 + 2 * i + 3 * nums);
    worksheet.getCell(2, 2 + 2 * i + 3 * nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 2 * i + 3 * nums).value = '用量\n（t）';
    worksheet.getCell(3, 3 + 2 * i + 3 * nums).value = '含量\n（kg/m^2）';

    worksheet.mergeCells(2, 2 + 2 * i + 5 * nums, 2, 3 + 2 * i + 5 * nums);
    worksheet.getCell(2, 2 + 2 * i + 5 * nums).value = `模型${i + 1}`;
    worksheet.getCell(3, 2 + 2 * i + 5 * nums).value = '用量\n（t）';
    worksheet.getCell(3, 3 + 2 * i + 5 * nums).value = '含量\n（kg/m^2）';
  }
}

export async function writeQuantity(
  structures: IStructureFrontEnd[],
  worksheet: Excel.Worksheet,
) {
  const nums = structures.length;
  let storeyID: number[] = [];
  for (let i = 0; i < nums; i++) {
    if (structures[i].quantity.storeyID.length > storeyID.length) {
      storeyID = structures[i].quantity.storeyID;
    }
  }
  const count = storeyID.length;

  for (let j = 0; j < count; j++) {
    // write storey
    worksheet.getCell(4 + j, 1).value = storeyID[j];
  }

  for (let i = 0; i < nums; i++) {
    const quantity: IQuantityFE = structures[i].quantity;
    const diff = count - quantity.storeyID.length;

    for (let j = 0; j < count; j++) {
      // write area
      worksheet.getCell(4 + j, 2 + i).value = {
        formula: `round(${quantity.area[j - diff] || 0},0)`,
        date1904: false,
      };

      // write concrete
      worksheet.getCell(4 + j, 2 + 2 * i + nums).value = {
        formula: `round(${quantity.concrete.storey[j - diff] || 0},0)`,
        date1904: false,
      };

      // write concrete pre area
      worksheet.getCell(4 + j, 3 + 2 * i + nums).value = {
        formula: `round(${quantity.unitConcrete.storey[j - diff] || 0},2)`,
        date1904: false,
      };

      // write steel
      worksheet.getCell(4 + j, 2 + 2 * i + 3 * nums).value = {
        formula: `round(${quantity.steel.storey[j - diff] || 0},0)`,
        date1904: false,
      };

      // write steel pre area
      worksheet.getCell(4 + j, 3 + 2 * i + 3 * nums).value = {
        formula: `round(${quantity.unitSteel.storey[j - diff] || 0} * 1000,2)`,
        date1904: false,
      };

      // write rebar
      worksheet.getCell(4 + j, 2 + 2 * i + 5 * nums).value = {
        formula: `round(${quantity.rebar.storey[j - diff] || 0} / 1000,0)`,
        date1904: false,
      };

      // write rebar pre area
      worksheet.getCell(4 + j, 3 + 2 * i + 5 * nums).value = {
        formula: `round(${quantity.unitRebar.storey[j - diff] || 0},2)`,
        date1904: false,
      };
    }
  }
}

export async function formatQuantity(worksheet: Excel.Worksheet, nums: number) {
  compareDistributeFormat(worksheet);

  worksheet.getRow(3).height = 30;

  rangeFillColor(worksheet, 1, 1, 3, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 2, 3, 1 + nums, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(
    worksheet,
    1,
    2 + nums,
    3,
    1 + 3 * nums,
    'solid',
    '00F0FFF0',
    '00FFFFFF',
  );
  rangeFillColor(
    worksheet,
    1,
    2 + 3 * nums,
    3,
    1 + 5 * nums,
    'solid',
    '00F0FFFF',
    '00FFFFFF',
  );
  rangeFillColor(
    worksheet,
    1,
    2 + 5 * nums,
    3,
    1 + 7 * nums,
    'solid',
    '00F0FFF0',
    '00FFFFFF',
  );

  worksheet.views = [{ state: 'frozen', xSplit: 1, ySplit: 3 }];
}
