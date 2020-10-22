import { IFactorFE } from '../interfaces';
import { rangeFillColor, distributeFormat } from './commom';
import Excel from 'exceljs';

export async function initFactor(worksheet: Excel.Worksheet) {
  worksheet.mergeCells('A1:B1');
  worksheet.getCell('A1').value = '楼层信息';
  worksheet.getCell('A2').value = '层号';
  worksheet.getCell('B2').value = '塔号';

  worksheet.getCell('C1').value = '薄弱层剪力';
  worksheet.getCell('C2').value = '放大系数';

  worksheet.mergeCells('D1:E1');
  worksheet.getCell('D1').value = '剪重比调整系数';
  worksheet.getCell('D2').value = 'X向';
  worksheet.getCell('E2').value = 'Y向';

  worksheet.mergeCells('F1:G1');
  worksheet.getCell('F1').value = '0.2V0调整系数';
  worksheet.getCell('F2').value = 'X向';
  worksheet.getCell('G2').value = 'Y向';
}

export async function writeFactor(
  factor: IFactorFE,
  worksheet: Excel.Worksheet,
) {
  const storeyID =
    factor.shearWeightRatioModify.storeyID ||
    factor.stiffness.storeyID ||
    factor.v02qFactor.storeyID;
  const towerID =
    factor.shearWeightRatioModify.towerID ||
    factor.stiffness.towerID ||
    factor.v02qFactor.towerID;

  for (let i = 0; i < storeyID.length; i++) {
    // write storey
    worksheet.getCell(`A${3 + i}`).value = storeyID[i];
    worksheet.getCell(`B${3 + i}`).value = towerID[i];
  }

  for (let i = 0; i < factor.shearWeightRatioModify.storeyID.length; i++) {
    // write wesk storey shear factor
    worksheet.getCell(`C${3 + i}`).value = factor.stiffness.weakStoreyFactor[i];

    // write shear weight ratio factor
    worksheet.getCell(`D${3 + i}`).value =
      factor.shearWeightRatioModify.factorX[i];
    worksheet.getCell(`E${3 + i}`).value =
      factor.shearWeightRatioModify.factorY[i];
  }

  for (let i = 0; i < factor.v02qFactor.storeyID.length; i++) {
    // write storey
    worksheet.getCell(`F${3 + i}`).value = factor.v02qFactor.factorX[i];
    worksheet.getCell(`G${3 + i}`).value = factor.v02qFactor.factorY[i];
  }
}

export async function formatFactor(worksheet: Excel.Worksheet) {
  distributeFormat(worksheet);

  rangeFillColor(worksheet, 1, 1, 2, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(
    worksheet,
    3,
    2,
    worksheet.rowCount,
    2,
    'solid',
    '00F0FFF0',
    '00FFFFFF',
  );
  rangeFillColor(worksheet, 1, 3, 2, 3, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 4, 2, 5, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 6, 2, 7, 'solid', '00F0FFFF', '00FFFFFF');

  worksheet.views = [{ state: 'frozen', xSplit: 2, ySplit: 2 }];
}
