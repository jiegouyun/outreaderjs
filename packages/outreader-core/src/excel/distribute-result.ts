import { IDistributeResultFE } from '../interfaces';
import { rangeFillColor, distributeFormat } from './commom';
import Excel from 'exceljs';

export async function initDistributeResult(worksheet: Excel.Worksheet) {
  worksheet.mergeCells('A1:B1');
  worksheet.getCell('A1').value = '楼层信息';
  worksheet.getCell('A2').value = '层号';
  worksheet.getCell('B2').value = '塔号';

  worksheet.mergeCells('C1:J1');
  worksheet.getCell('C1').value = '楼层属性';
  worksheet.getCell('C2').value = '属性\n标准层';
  worksheet.getCell('D2').value = '层高\nm';
  worksheet.getCell('E2').value = '累计高度\nm';
  worksheet.getCell('F2').value = '面积\nm^2';
  worksheet.getCell('G2').value = 'X向墙面积\nm^2';
  worksheet.getCell('H2').value = 'Y向墙面积\nm^2';
  worksheet.getCell('I2').value = '墙面积\nm^2';
  worksheet.getCell('J2').value = '墙地比\n%';

  worksheet.mergeCells('K1:N1');
  worksheet.getCell('K1').value = '质量比';
  worksheet.getCell('K2').value = '楼层质量\nkg';
  worksheet.getCell('L2').value = '质量比';
  worksheet.getCell('M2').value = '单位质量\nkg/m^2';
  worksheet.getCell('N2').value = '单位\n质量比';

  worksheet.mergeCells('O1:X1');
  worksheet.getCell('O1').value = '刚度比';
  worksheet.getCell('O2').value = 'Ratx1';
  worksheet.getCell('P2').value = 'Ratx2';
  worksheet.getCell('Q2').value = 'RJX1';
  worksheet.getCell('R2').value = 'RJX3';
  worksheet.getCell('S2').value = 'Raty1';
  worksheet.getCell('T2').value = 'Raty2';
  worksheet.getCell('U2').value = 'RJY1';
  worksheet.getCell('V2').value = 'RJY3';
  worksheet.getCell('W2').value = 'RJZ1';
  worksheet.getCell('X2').value = 'RJZ3';

  worksheet.mergeCells('Y1:Z1');
  worksheet.getCell('Y1').value = '剪重比';
  worksheet.getCell('Y2').value = 'X向';
  worksheet.getCell('Z2').value = 'Y向';

  worksheet.mergeCells('AA1:AD1');
  worksheet.getCell('AA1').value = '楼层抗剪承载力验算';
  worksheet.getCell('AA2').value = '承载力X';
  worksheet.getCell('AB2').value = 'RatioX';
  worksheet.getCell('AC2').value = '承载力Y';
  worksheet.getCell('AD2').value = 'RatioY';

  worksheet.mergeCells('AE1:AN1');
  worksheet.getCell('AE1').value = '规定水平力下倾覆力矩分配';
  worksheet.getCell('AE2').value = 'X向柱';
  worksheet.getCell('AF2').value = 'X向\n短肢墙';
  worksheet.getCell('AG2').value = 'Y向柱';
  worksheet.getCell('AH2').value = 'Y向\n短肢墙';
  worksheet.getCell('AI2').value = 'X向长墙\n百分比';
  worksheet.getCell('AJ2').value = 'X向扁柱框架\n百分比';
  worksheet.getCell('AK2').value = 'X向框架\n百分比';
  worksheet.getCell('AL2').value = 'Y向长墙\n百分比';
  worksheet.getCell('AM2').value = 'Y向扁柱框架\n百分比';
  worksheet.getCell('AN2').value = 'Y向框架\n百分比';

  worksheet.mergeCells('AO1:BB1');
  worksheet.getCell('AO1').value = '地震作用下剪力分配';
  worksheet.getCell('AO2').value = 'X向柱';
  worksheet.getCell('AP2').value = 'X向墙';
  worksheet.getCell('AQ2').value = 'X向\n总剪力';
  worksheet.getCell('AR2').value = 'X向柱\n百分比';
  worksheet.getCell('AS2').value = 'Y向柱';
  worksheet.getCell('AT2').value = 'Y向墙';
  worksheet.getCell('AU2').value = 'Y向\n总剪力';
  worksheet.getCell('AV2').value = 'Y向柱\n百分比';
  worksheet.getCell('AW2').value = 'X向长墙\n百分比';
  worksheet.getCell('AX2').value = 'X向扁柱框架\n百分比';
  worksheet.getCell('AY2').value = 'X向框架\n百分比';
  worksheet.getCell('AZ2').value = 'Y向长墙\n百分比';
  worksheet.getCell('BA2').value = 'Y向扁柱框架\n百分比';
  worksheet.getCell('BB2').value = 'Y向框架\n百分比';
}

export async function writeDistributeResult(
  distribute: IDistributeResultFE,
  worksheet: Excel.Worksheet,
) {
  const storeyID =
    distribute.storey.storeyID ||
    distribute.shearWeightRatio.storeyID ||
    distribute.columnShear.storeyID;
  const towerID =
    distribute.storey.towerID ||
    distribute.shearWeightRatio.towerID ||
    distribute.columnShear.towerID;

  for (let i = 0; i < storeyID.length; i++) {
    // write storey
    worksheet.getCell(`A${3 + i}`).value = storeyID[i];
    worksheet.getCell(`B${3 + i}`).value = towerID[i];
  }

  for (let i = 0; i < distribute.storey.storeyID.length; i++) {
    // write storey
    worksheet.getCell(`C${3 + i}`).value = distribute.storey.attribute[i];
    worksheet.getCell(`D${3 + i}`).value = distribute.storey.height[i];
    worksheet.getCell(`E${3 + i}`).value = distribute.storey.heightToGround[i];
    worksheet.getCell(`F${3 + i}`).value = distribute.storey.area[i];
    worksheet.getCell(`G${3 + i}`).value =
      distribute.storey.wallSectionAreaX[i];
    worksheet.getCell(`H${3 + i}`).value =
      distribute.storey.wallSectionAreaY[i];
    worksheet.getCell(`I${3 + i}`).value =
      distribute.storey.wallSectionAreaStorey[i];
    worksheet.getCell(`J${3 + i}`).value = {
      formula: `round(${distribute.storey.wallSectionAreaRatio[i]},3)`,
      date1904: false,
    };

    // write mass ratio
    worksheet.getCell(`K${3 + i}`).value = distribute.massRatio.storeyMass[i];
    worksheet.getCell(`L${3 + i}`).value = distribute.massRatio.ratio[i];
    worksheet.getCell(`M${3 + i}`).value = distribute.massRatio.massPerArea[i];
    worksheet.getCell(`N${3 + i}`).value =
      distribute.massRatio.massPerAreaRatio[i];

    // write stiffness
    worksheet.getCell(`O${3 + i}`).value = distribute.stiffness.ratx1[i];
    worksheet.getCell(`P${3 + i}`).value = distribute.stiffness.ratx2[i];
    worksheet.getCell(`Q${3 + i}`).value = distribute.stiffness.rjx1[i];
    worksheet.getCell(`R${3 + i}`).value = distribute.stiffness.rjx3[i];
    worksheet.getCell(`S${3 + i}`).value = distribute.stiffness.raty1[i];
    worksheet.getCell(`T${3 + i}`).value = distribute.stiffness.raty2[i];
    worksheet.getCell(`U${3 + i}`).value = distribute.stiffness.rjy1[i];
    worksheet.getCell(`V${3 + i}`).value = distribute.stiffness.rjy3[i];
    worksheet.getCell(`W${3 + i}`).value = distribute.stiffness.rjz1[i];
    worksheet.getCell(`X${3 + i}`).value = distribute.stiffness.rjz3[i];

    // write shear capacity check
    worksheet.getCell(`AA${3 + i}`).value =
      distribute.shearCapacityCheck.capacityX[i];
    worksheet.getCell(`AB${3 + i}`).value =
      distribute.shearCapacityCheck.ratioX[i];
    worksheet.getCell(`AC${3 + i}`).value =
      distribute.shearCapacityCheck.capacityY[i];
    worksheet.getCell(`AD${3 + i}`).value =
      distribute.shearCapacityCheck.ratioY[i];
  }

  for (let i = 0; i < distribute.shearWeightRatio.storeyID.length; i++) {
    // write shear weight ratio
    worksheet.getCell(`Y${3 + i}`).value =
      distribute.shearWeightRatio.factorX[i];
    worksheet.getCell(`Z${3 + i}`).value =
      distribute.shearWeightRatio.factorY[i];
  }

  for (let i = 0; i < distribute.momentPercent.storeyID.length; i++) {
    // write moment distribute
    worksheet.getCell(`AE${3 + i}`).value =
      distribute.momentPercent.percentColumnX[i];
    worksheet.getCell(`AF${3 + i}`).value =
      distribute.momentPercent.percentWallX[i];
    worksheet.getCell(`AG${3 + i}`).value =
      distribute.momentPercent.percentColumnY[i];
    worksheet.getCell(`AH${3 + i}`).value =
      distribute.momentPercent.percentWallY[i];
    worksheet.getCell(`AI${3 + i}`).value =
      distribute.momentPercent.percentWallXX[i];
    worksheet.getCell(`AJ${3 + i}`).value =
      distribute.momentPercent.percentWallYX[i];
    worksheet.getCell(`AK${3 + i}`).value =
      distribute.momentPercent.percentEdgeX[i];
    worksheet.getCell(`AL${3 + i}`).value =
      distribute.momentPercent.percentWallYY[i];
    worksheet.getCell(`AM${3 + i}`).value =
      distribute.momentPercent.percentWallXY[i];
    worksheet.getCell(`AN${3 + i}`).value =
      distribute.momentPercent.percentEdgeY[i];

    // write column shear distribute
    worksheet.getCell(`AO${3 + i}`).value = distribute.columnShear.columnX[i];
    worksheet.getCell(`AP${3 + i}`).value = distribute.columnShear.wallX[i];
    worksheet.getCell(`AQ${3 + i}`).value = distribute.columnShear.totalX[i];
    worksheet.getCell(`AR${3 + i}`).value =
      distribute.columnShear.percentColumnX[i];
    worksheet.getCell(`AS${3 + i}`).value = distribute.columnShear.columnY[i];
    worksheet.getCell(`AT${3 + i}`).value = distribute.columnShear.wallY[i];
    worksheet.getCell(`AU${3 + i}`).value = distribute.columnShear.totalY[i];
    worksheet.getCell(`AV${3 + i}`).value =
      distribute.columnShear.percentColumnY[i];
    worksheet.getCell(`AW${3 + i}`).value =
      distribute.columnShear.percentWallXX[i];
    worksheet.getCell(`AX${3 + i}`).value =
      distribute.columnShear.percentWallYX[i];
    worksheet.getCell(`AY${3 + i}`).value =
      distribute.columnShear.percentEdgeX[i];
    worksheet.getCell(`AZ${3 + i}`).value =
      distribute.columnShear.percentWallYY[i];
    worksheet.getCell(`BA${3 + i}`).value =
      distribute.columnShear.percentWallXY[i];
    worksheet.getCell(`BB${3 + i}`).value =
      distribute.columnShear.percentEdgeY[i];
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
  rangeFillColor(worksheet, 1, 3, 2, 10, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 11, 2, 14, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 15, 2, 24, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 25, 2, 26, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 27, 2, 30, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 31, 2, 40, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 41, 2, 54, 'solid', '00F0FFFF', '00FFFFFF');

  worksheet.views = [{ state: 'frozen', xSplit: 2, ySplit: 2 }];
}
