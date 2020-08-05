import { IDistributeResultFE } from '../interfaces';
import { rangeFillColor, distributeFormat } from './commom';
import Excel from 'exceljs';

export async function initDistributeResult(worksheet: Excel.Worksheet) {
  worksheet.mergeCells('A1:B1');
  worksheet.getCell('A1').value = '楼层信息';
  worksheet.getCell('A2').value = '层号';
  worksheet.getCell('B2').value = '塔号';

  worksheet.mergeCells('C1:F1');
  worksheet.getCell('C1').value = '楼层属性';
  worksheet.getCell('C2').value = '属性\n标准层';
  worksheet.getCell('D2').value = '层高\nm';
  worksheet.getCell('E2').value = '累计高度\nm';
  worksheet.getCell('F2').value = '面积\nm^2';

  worksheet.mergeCells('G1:J1');
  worksheet.getCell('G1').value = '质量比';
  worksheet.getCell('G2').value = '楼层质量\nkg';
  worksheet.getCell('H2').value = '质量比';
  worksheet.getCell('I2').value = '单位质量\nkg/m^2';
  worksheet.getCell('J2').value = '单位\n质量比';

  worksheet.mergeCells('K1:T1');
  worksheet.getCell('K1').value = '刚度比';
  worksheet.getCell('K2').value = 'Ratx1';
  worksheet.getCell('L2').value = 'Ratx2';
  worksheet.getCell('M2').value = 'RJX1';
  worksheet.getCell('N2').value = 'RJX3';
  worksheet.getCell('O2').value = 'Raty1';
  worksheet.getCell('P2').value = 'Raty2';
  worksheet.getCell('Q2').value = 'RJY1';
  worksheet.getCell('R2').value = 'RJY3';
  worksheet.getCell('S2').value = 'RJZ1';
  worksheet.getCell('T2').value = 'RJZ3';

  worksheet.mergeCells('U1:V1');
  worksheet.getCell('U1').value = '剪重比';
  worksheet.getCell('U2').value = 'X向';
  worksheet.getCell('V2').value = 'Y向';

  worksheet.mergeCells('W1:Z1');
  worksheet.getCell('W1').value = '楼层抗剪承载力验算';
  worksheet.getCell('W2').value = '承载力X';
  worksheet.getCell('X2').value = 'RatioX';
  worksheet.getCell('Y2').value = '承载力Y';
  worksheet.getCell('Z2').value = 'RatioY';

  worksheet.mergeCells('AA1:AD1');
  worksheet.getCell('AA1').value = '规定水平力下倾覆力矩分配';
  worksheet.getCell('AA2').value = 'X向柱';
  worksheet.getCell('AB2').value = 'X向\n短肢墙';
  worksheet.getCell('AC2').value = 'Y向柱';
  worksheet.getCell('AD2').value = 'Y向\n短肢墙';

  worksheet.mergeCells('AE1:AL1');
  worksheet.getCell('AE1').value = '地震作用下剪力分配';
  worksheet.getCell('AE2').value = 'X向柱';
  worksheet.getCell('AF2').value = 'X向墙';
  worksheet.getCell('AG2').value = 'X向\n总剪力';
  worksheet.getCell('AH2').value = 'X向柱\n百分比';
  worksheet.getCell('AI2').value = 'Y向柱';
  worksheet.getCell('AJ2').value = 'Y向墙';
  worksheet.getCell('AK2').value = 'Y向\n总剪力';
  worksheet.getCell('AL2').value = 'Y向柱\n百分比';
}

export async function writeDistributeResult(
  distribute: IDistributeResultFE,
  worksheet: Excel.Worksheet,
) {
  for (let i = 0; i < distribute.storey.storeyID.length; i++) {
    // write storey
    worksheet.getCell(`A${3 + i}`).value = distribute.storey.storeyID[i];
    worksheet.getCell(`B${3 + i}`).value = distribute.storey.towerID[i];
    worksheet.getCell(`C${3 + i}`).value = distribute.storey.attribute[i];
    worksheet.getCell(`D${3 + i}`).value = distribute.storey.height[i];
    worksheet.getCell(`E${3 + i}`).value = distribute.storey.heightToGround[i];
    worksheet.getCell(`F${3 + i}`).value = distribute.storey.area[i];

    // write mass ratio
    worksheet.getCell(`G${3 + i}`).value = distribute.massRatio.storeyMass[i];
    worksheet.getCell(`H${3 + i}`).value = distribute.massRatio.ratio[i];
    worksheet.getCell(`I${3 + i}`).value = distribute.massRatio.massPerArea[i];
    worksheet.getCell(`J${3 + i}`).value =
      distribute.massRatio.massPerAreaRatio[i];

    // write stiffness
    worksheet.getCell(`K${3 + i}`).value = distribute.stiffness.ratx1[i];
    worksheet.getCell(`L${3 + i}`).value = distribute.stiffness.ratx2[i];
    worksheet.getCell(`M${3 + i}`).value = distribute.stiffness.rjx1[i];
    worksheet.getCell(`N${3 + i}`).value = distribute.stiffness.rjx3[i];
    worksheet.getCell(`O${3 + i}`).value = distribute.stiffness.raty1[i];
    worksheet.getCell(`P${3 + i}`).value = distribute.stiffness.raty2[i];
    worksheet.getCell(`Q${3 + i}`).value = distribute.stiffness.rjy1[i];
    worksheet.getCell(`R${3 + i}`).value = distribute.stiffness.rjy3[i];
    worksheet.getCell(`S${3 + i}`).value = distribute.stiffness.rjz1[i];
    worksheet.getCell(`T${3 + i}`).value = distribute.stiffness.rjz3[i];

    // write shear capacity check
    worksheet.getCell(`W${3 + i}`).value =
      distribute.shearCapacityCheck.capacityX[i];
    worksheet.getCell(`X${3 + i}`).value =
      distribute.shearCapacityCheck.ratioX[i];
    worksheet.getCell(`Y${3 + i}`).value =
      distribute.shearCapacityCheck.capacityY[i];
    worksheet.getCell(`Z${3 + i}`).value =
      distribute.shearCapacityCheck.ratioY[i];
  }

  for (let i = 0; i < distribute.shearWeightRatio.storeyID.length; i++) {
    // write shear weight ratio
    worksheet.getCell(`U${3 + i}`).value =
      distribute.shearWeightRatio.factorX[i];
    worksheet.getCell(`V${3 + i}`).value =
      distribute.shearWeightRatio.factorY[i];
  }

  for (let i = 0; i < distribute.momentPercent.storeyID.length; i++) {
    // write moment distribute
    worksheet.getCell(`AA${3 + i}`).value =
      distribute.momentPercent.percentColumnX[i];
    worksheet.getCell(`AB${3 + i}`).value =
      distribute.momentPercent.percentWallX[i];
    worksheet.getCell(`AC${3 + i}`).value =
      distribute.momentPercent.percentColumnY[i];
    worksheet.getCell(`AD${3 + i}`).value =
      distribute.momentPercent.percentWallY[i];

    // write column shear distribute
    worksheet.getCell(`AE${3 + i}`).value = distribute.columnShear.columnX[i];
    worksheet.getCell(`AF${3 + i}`).value = distribute.columnShear.wallX[i];
    worksheet.getCell(`AG${3 + i}`).value = distribute.columnShear.totalX[i];
    worksheet.getCell(`AH${3 + i}`).value =
      distribute.columnShear.percentColumnX[i];
    worksheet.getCell(`AI${3 + i}`).value = distribute.columnShear.columnY[i];
    worksheet.getCell(`AJ${3 + i}`).value = distribute.columnShear.wallY[i];
    worksheet.getCell(`AK${3 + i}`).value = distribute.columnShear.totalY[i];
    worksheet.getCell(`AL${3 + i}`).value =
      distribute.columnShear.percentColumnY[i];
  }
}

export async function formatDistributeResult(worksheet: Excel.Worksheet) {
  distributeFormat(worksheet);

  worksheet.getRow(2).height = 30;

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
  rangeFillColor(worksheet, 1, 3, 2, 6, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 7, 2, 10, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 11, 2, 20, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 21, 2, 22, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 23, 2, 26, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 27, 2, 30, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 31, 2, 38, 'solid', '00F0FFFF', '00FFFFFF');

  worksheet.views = [{ state: 'frozen', xSplit: 2, ySplit: 2 }];
}
