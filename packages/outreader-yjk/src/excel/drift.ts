import { IStructure } from '@outreader/core';
import { rangeSetBorder, rangeFillColor, distributeFormat } from './commom';
import Excel from 'exceljs';

export async function initDrift(worksheet: Excel.Worksheet) {
  worksheet.mergeCells('A1:B1');
  worksheet.getCell('A1').value = '楼层信息';
  worksheet.getCell('A2').value = '层号';
  worksheet.getCell('B2').value = '塔号';

  worksheet.mergeCells('C1:N1');
  worksheet.getCell('C1').value = '位移';
  worksheet.getCell('C2').value = 'EX';
  worksheet.getCell('D2').value = 'EXY';
  worksheet.getCell('E2').value = 'EX+';
  worksheet.getCell('F2').value = 'EX-';
  worksheet.getCell('G2').value = 'EY';
  worksheet.getCell('H2').value = 'EYX';
  worksheet.getCell('I2').value = 'EY+';
  worksheet.getCell('J2').value = 'EY-';
  worksheet.getCell('K2').value = 'WX+';
  worksheet.getCell('L2').value = 'WX-';
  worksheet.getCell('M2').value = 'WY+';
  worksheet.getCell('N2').value = 'WY-';

  worksheet.mergeCells('O1:Z1');
  worksheet.getCell('O1').value = '层间位移角';
  worksheet.getCell('O2').value = 'EX';
  worksheet.getCell('P2').value = 'EXY';
  worksheet.getCell('Q2').value = 'EX+';
  worksheet.getCell('R2').value = 'EX-';
  worksheet.getCell('S2').value = 'EY';
  worksheet.getCell('T2').value = 'EYX';
  worksheet.getCell('U2').value = 'EY+';
  worksheet.getCell('V2').value = 'EY-';
  worksheet.getCell('W2').value = 'WX+';
  worksheet.getCell('X2').value = 'WX-';
  worksheet.getCell('Y2').value = 'WY+';
  worksheet.getCell('Z2').value = 'WY-';

  worksheet.mergeCells('AA1:AJ1');
  worksheet.getCell('AA1').value = '位移比';
  worksheet.getCell('AA2').value = 'EX';
  worksheet.getCell('AB2').value = 'EX+';
  worksheet.getCell('AC2').value = 'EX-';
  worksheet.getCell('AD2').value = 'EY';
  worksheet.getCell('AE2').value = 'EY+';
  worksheet.getCell('AF2').value = 'EY-';
  worksheet.getCell('AG2').value = 'WX+';
  worksheet.getCell('AH2').value = 'WX-';
  worksheet.getCell('AI2').value = 'WY+';
  worksheet.getCell('AJ2').value = 'WY-';

  worksheet.mergeCells('AK1:AT1');
  worksheet.getCell('AK1').value = '层间位移比';
  worksheet.getCell('AK2').value = 'EX';
  worksheet.getCell('AL2').value = 'EX+';
  worksheet.getCell('AM2').value = 'EX-';
  worksheet.getCell('AN2').value = 'EY';
  worksheet.getCell('AO2').value = 'EY+';
  worksheet.getCell('AP2').value = 'EY-';
  worksheet.getCell('AQ2').value = 'WX+';
  worksheet.getCell('AR2').value = 'WX-';
  worksheet.getCell('AS2').value = 'WY+';
  worksheet.getCell('AT2').value = 'WY-';
}

export async function writeDrift(
  structure: IStructure,
  worksheet: Excel.Worksheet,
) {
  // write storey
  for (
    let i = 0;
    i < (structure.wmass?.storey.storeyID as number[]).length;
    i++
  ) {
    worksheet.getCell(`A${3 + i}`).value =
      structure.wmass?.storey.storeyID[i] || '';
    worksheet.getCell(`B${3 + i}`).value =
      structure.wmass?.storey.towerID[i] || '';
  }

  for (
    let i = 0;
    i < (structure.wdisp?.driftSeismicX.storeyID as number[]).length;
    i++
  ) {
    // write displacement
    worksheet.getCell(`C${3 + i}`).value =
      structure.wdisp?.driftSeismicX.displacement[i] || '';
    worksheet.getCell(`D${3 + i}`).value =
      structure.wdisp?.driftSeismicTwoWayX.displacement[i] || '';
    worksheet.getCell(`E${3 + i}`).value =
      structure.wdisp?.driftSeismicXEccP.displacement[i] || '';
    worksheet.getCell(`F${3 + i}`).value =
      structure.wdisp?.driftSeismicXEccN.displacement[i] || '';
    worksheet.getCell(`G${3 + i}`).value =
      structure.wdisp?.driftSeismicY.displacement[i] || '';
    worksheet.getCell(`H${3 + i}`).value =
      structure.wdisp?.driftSeismicTwoWayY.displacement[i] || '';
    worksheet.getCell(`I${3 + i}`).value =
      structure.wdisp?.driftSeismicYEccP.displacement[i] || '';
    worksheet.getCell(`J${3 + i}`).value =
      structure.wdisp?.driftSeismicYEccN.displacement[i] || '';
    worksheet.getCell(`K${3 + i}`).value =
      structure.wdisp?.driftWindXP.displacement[i] || '';
    worksheet.getCell(`L${3 + i}`).value =
      structure.wdisp?.driftWindXN.displacement[i] || '';
    worksheet.getCell(`M${3 + i}`).value =
      structure.wdisp?.driftWindYP.displacement[i] || '';
    worksheet.getCell(`N${3 + i}`).value =
      structure.wdisp?.driftWindYN.displacement[i] || '';

    // write drift
    worksheet.getCell(`O${3 + i}`).value =
      structure.wdisp?.driftSeismicX.drift[i] || '';
    worksheet.getCell(`P${3 + i}`).value =
      structure.wdisp?.driftSeismicTwoWayX.drift[i] || '';
    worksheet.getCell(`Q${3 + i}`).value =
      structure.wdisp?.driftSeismicXEccP.drift[i] || '';
    worksheet.getCell(`R${3 + i}`).value =
      structure.wdisp?.driftSeismicXEccN.drift[i] || '';
    worksheet.getCell(`S${3 + i}`).value =
      structure.wdisp?.driftSeismicY.drift[i] || '';
    worksheet.getCell(`T${3 + i}`).value =
      structure.wdisp?.driftSeismicTwoWayY.drift[i] || '';
    worksheet.getCell(`U${3 + i}`).value =
      structure.wdisp?.driftSeismicYEccP.drift[i] || '';
    worksheet.getCell(`V${3 + i}`).value =
      structure.wdisp?.driftSeismicYEccN.drift[i] || '';
    worksheet.getCell(`W${3 + i}`).value =
      structure.wdisp?.driftWindXP.drift[i] || '';
    worksheet.getCell(`X${3 + i}`).value =
      structure.wdisp?.driftWindXN.drift[i] || '';
    worksheet.getCell(`Y${3 + i}`).value =
      structure.wdisp?.driftWindYP.drift[i] || '';
    worksheet.getCell(`Z${3 + i}`).value =
      structure.wdisp?.driftWindYN.drift[i] || '';

    // write displacement ratio
    worksheet.getCell(`AA${3 + i}`).value =
      structure.wdisp?.ratioSeismicX.ratio[i] || '';
    worksheet.getCell(`AB${3 + i}`).value =
      structure.wdisp?.ratioSeismicXEccP.ratio[i] || '';
    worksheet.getCell(`AC${3 + i}`).value =
      structure.wdisp?.ratioSeismicXEccN.ratio[i] || '';
    worksheet.getCell(`AD${3 + i}`).value =
      structure.wdisp?.ratioSeismicY.ratio[i] || '';
    worksheet.getCell(`AE${3 + i}`).value =
      structure.wdisp?.ratioSeismicYEccP.ratio[i] || '';
    worksheet.getCell(`AF${3 + i}`).value =
      structure.wdisp?.ratioSeismicYEccN.ratio[i] || '';
    worksheet.getCell(`AG${3 + i}`).value =
      structure.wdisp?.driftWindXP.ratio[i] || '';
    worksheet.getCell(`AH${3 + i}`).value =
      structure.wdisp?.driftWindXN.ratio[i] || '';
    worksheet.getCell(`AI${3 + i}`).value =
      structure.wdisp?.driftWindYP.ratio[i] || '';
    worksheet.getCell(`AJ${3 + i}`).value =
      structure.wdisp?.driftWindYN.ratio[i] || '';

    // write storey displacement ratio
    worksheet.getCell(`AK${3 + i}`).value =
      structure.wdisp?.ratioSeismicX.ratioD[i] || '';
    worksheet.getCell(`AL${3 + i}`).value =
      structure.wdisp?.ratioSeismicXEccP.ratioD[i] || '';
    worksheet.getCell(`AM${3 + i}`).value =
      structure.wdisp?.ratioSeismicXEccN.ratioD[i] || '';
    worksheet.getCell(`AN${3 + i}`).value =
      structure.wdisp?.ratioSeismicY.ratioD[i] || '';
    worksheet.getCell(`AO${3 + i}`).value =
      structure.wdisp?.ratioSeismicYEccP.ratioD[i] || '';
    worksheet.getCell(`AP${3 + i}`).value =
      structure.wdisp?.ratioSeismicYEccN.ratioD[i] || '';
    worksheet.getCell(`AQ${3 + i}`).value =
      structure.wdisp?.driftWindXP.ratioD[i] || '';
    worksheet.getCell(`AR${3 + i}`).value =
      structure.wdisp?.driftWindXN.ratioD[i] || '';
    worksheet.getCell(`AS${3 + i}`).value =
      structure.wdisp?.driftWindYP.ratioD[i] || '';
    worksheet.getCell(`AT${3 + i}`).value =
      structure.wdisp?.driftWindYN.ratioD[i] || '';
  }
}

export async function formatDrift(worksheet: Excel.Worksheet) {
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
  rangeFillColor(worksheet, 1, 3, 2, 14, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 15, 2, 26, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 27, 2, 36, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 37, 2, 46, 'solid', '00F0FFF0', '00FFFFFF');

  worksheet.views = [{ state: 'frozen', xSplit: 2, ySplit: 2 }];
}
