import { IDriftFE } from '../interfaces';
import { rangeFillColor, distributeFormat } from '../excel/commom';
import Excel from 'exceljs';

export async function initDrift(worksheet: Excel.Worksheet) {
  worksheet.mergeCells('A1:B1');
  worksheet.getCell('A1').value = '楼层信息';
  worksheet.getCell('A2').value = '层号';
  worksheet.getCell('B2').value = '塔号';

  worksheet.mergeCells('C1:R1');
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
  worksheet.getCell('O2').value = 'CWX+';
  worksheet.getCell('P2').value = 'CWX-';
  worksheet.getCell('Q2').value = 'CWY+';
  worksheet.getCell('R2').value = 'CWY-';

  worksheet.mergeCells('S1:AH1');
  worksheet.getCell('S1').value = '层间位移角';
  worksheet.getCell('S2').value = 'EX';
  worksheet.getCell('T2').value = 'EXY';
  worksheet.getCell('U2').value = 'EX+';
  worksheet.getCell('V2').value = 'EX-';
  worksheet.getCell('W2').value = 'EY';
  worksheet.getCell('X2').value = 'EYX';
  worksheet.getCell('Y2').value = 'EY+';
  worksheet.getCell('Z2').value = 'EY-';
  worksheet.getCell('AA2').value = 'WX+';
  worksheet.getCell('AB2').value = 'WX-';
  worksheet.getCell('AC2').value = 'WY+';
  worksheet.getCell('AD2').value = 'WY-';
  worksheet.getCell('AE2').value = 'CWX+';
  worksheet.getCell('AF2').value = 'CWX-';
  worksheet.getCell('AG2').value = 'CWY+';
  worksheet.getCell('AH2').value = 'CWY-';

  worksheet.mergeCells('AI1:AV1');
  worksheet.getCell('AI1').value = '位移比';
  worksheet.getCell('AI2').value = 'EX';
  worksheet.getCell('AJ2').value = 'EX+';
  worksheet.getCell('AK2').value = 'EX-';
  worksheet.getCell('AL2').value = 'EY';
  worksheet.getCell('AM2').value = 'EY+';
  worksheet.getCell('AN2').value = 'EY-';
  worksheet.getCell('AO2').value = 'WX+';
  worksheet.getCell('AP2').value = 'WX-';
  worksheet.getCell('AQ2').value = 'WY+';
  worksheet.getCell('AR2').value = 'WY-';
  worksheet.getCell('AS2').value = 'CWX+';
  worksheet.getCell('AT2').value = 'CWX-';
  worksheet.getCell('AU2').value = 'CWY+';
  worksheet.getCell('AV2').value = 'CWY-';

  worksheet.mergeCells('AW1:BJ1');
  worksheet.getCell('AW1').value = '层间位移比';
  worksheet.getCell('AW2').value = 'EX';
  worksheet.getCell('AX2').value = 'EX+';
  worksheet.getCell('AY2').value = 'EX-';
  worksheet.getCell('AZ2').value = 'EY';
  worksheet.getCell('BA2').value = 'EY+';
  worksheet.getCell('BB2').value = 'EY-';
  worksheet.getCell('BC2').value = 'WX+';
  worksheet.getCell('BD2').value = 'WX-';
  worksheet.getCell('BE2').value = 'WY+';
  worksheet.getCell('BF2').value = 'WY-';
  worksheet.getCell('BG2').value = 'CWX+';
  worksheet.getCell('BH2').value = 'CWX-';
  worksheet.getCell('BI2').value = 'CWY+';
  worksheet.getCell('BJ2').value = 'CWY-';
}

export async function writeDrift(drift: IDriftFE, worksheet: Excel.Worksheet) {
  // write storey
  const count: number = drift.ratioSeismicX.storeyID.length;
  for (let i = 0; i < count; i++) {
    worksheet.getCell(`A${3 + i}`).value = drift.ratioSeismicX.storeyID[i];
    worksheet.getCell(`B${3 + i}`).value = drift.ratioSeismicX.towerID[i];

    // write displacement
    worksheet.getCell(`C${3 + i}`).value = drift.driftSeismicX.displacement[i];
    worksheet.getCell(`D${3 + i}`).value =
      drift.driftSeismicTwoWayX.displacement[i];
    worksheet.getCell(`E${3 + i}`).value =
      drift.driftSeismicXEccP.displacement[i];
    worksheet.getCell(`F${3 + i}`).value =
      drift.driftSeismicXEccN.displacement[i];
    worksheet.getCell(`G${3 + i}`).value = drift.driftSeismicY.displacement[i];
    worksheet.getCell(`H${3 + i}`).value =
      drift.driftSeismicTwoWayY.displacement[i];
    worksheet.getCell(`I${3 + i}`).value =
      drift.driftSeismicYEccP.displacement[i];
    worksheet.getCell(`J${3 + i}`).value =
      drift.driftSeismicYEccN.displacement[i];
    worksheet.getCell(`K${3 + i}`).value = drift.driftWindXP.displacement[i];
    worksheet.getCell(`L${3 + i}`).value = drift.driftWindXN.displacement[i];
    worksheet.getCell(`M${3 + i}`).value = drift.driftWindYP.displacement[i];
    worksheet.getCell(`N${3 + i}`).value = drift.driftWindYN.displacement[i];
    worksheet.getCell(`O${3 + i}`).value =
      drift.driftCrossWindXP.displacement[i];
    worksheet.getCell(`P${3 + i}`).value =
      drift.driftCrossWindXN.displacement[i];
    worksheet.getCell(`Q${3 + i}`).value =
      drift.driftCrossWindYP.displacement[i];
    worksheet.getCell(`R${3 + i}`).value =
      drift.driftCrossWindYN.displacement[i];

    // write drift
    worksheet.getCell(`S${3 + i}`).value = drift.driftSeismicX.drift[i];
    worksheet.getCell(`T${3 + i}`).value = drift.driftSeismicTwoWayX.drift[i];
    worksheet.getCell(`U${3 + i}`).value = drift.driftSeismicXEccP.drift[i];
    worksheet.getCell(`V${3 + i}`).value = drift.driftSeismicXEccN.drift[i];
    worksheet.getCell(`W${3 + i}`).value = drift.driftSeismicY.drift[i];
    worksheet.getCell(`X${3 + i}`).value = drift.driftSeismicTwoWayY.drift[i];
    worksheet.getCell(`Y${3 + i}`).value = drift.driftSeismicYEccP.drift[i];
    worksheet.getCell(`Z${3 + i}`).value = drift.driftSeismicYEccN.drift[i];
    worksheet.getCell(`AA${3 + i}`).value = drift.driftWindXP.drift[i];
    worksheet.getCell(`AB${3 + i}`).value = drift.driftWindXN.drift[i];
    worksheet.getCell(`AC${3 + i}`).value = drift.driftWindYP.drift[i];
    worksheet.getCell(`AD${3 + i}`).value = drift.driftWindYN.drift[i];
    worksheet.getCell(`AE${3 + i}`).value = drift.driftCrossWindXP.drift[i];
    worksheet.getCell(`AF${3 + i}`).value = drift.driftCrossWindXN.drift[i];
    worksheet.getCell(`AG${3 + i}`).value = drift.driftCrossWindYP.drift[i];
    worksheet.getCell(`AH${3 + i}`).value = drift.driftCrossWindYN.drift[i];

    // write displacement ratio
    worksheet.getCell(`AI${3 + i}`).value = drift.ratioSeismicX.ratio[i];
    worksheet.getCell(`AJ${3 + i}`).value = drift.ratioSeismicXEccP.ratio[i];
    worksheet.getCell(`AK${3 + i}`).value = drift.ratioSeismicXEccN.ratio[i];
    worksheet.getCell(`AL${3 + i}`).value = drift.ratioSeismicY.ratio[i];
    worksheet.getCell(`AM${3 + i}`).value = drift.ratioSeismicYEccP.ratio[i];
    worksheet.getCell(`AN${3 + i}`).value = drift.ratioSeismicYEccN.ratio[i];
    worksheet.getCell(`AO${3 + i}`).value = drift.driftWindXP.ratio[i];
    worksheet.getCell(`AP${3 + i}`).value = drift.driftWindXN.ratio[i];
    worksheet.getCell(`AQ${3 + i}`).value = drift.driftWindYP.ratio[i];
    worksheet.getCell(`AR${3 + i}`).value = drift.driftWindYN.ratio[i];
    worksheet.getCell(`AS${3 + i}`).value = drift.driftCrossWindXP.ratio[i];
    worksheet.getCell(`AT${3 + i}`).value = drift.driftCrossWindXN.ratio[i];
    worksheet.getCell(`AU${3 + i}`).value = drift.driftCrossWindYP.ratio[i];
    worksheet.getCell(`AV${3 + i}`).value = drift.driftCrossWindYN.ratio[i];

    // write storey displacement ratio
    worksheet.getCell(`AW${3 + i}`).value = drift.ratioSeismicX.ratioD[i];
    worksheet.getCell(`AX${3 + i}`).value = drift.ratioSeismicXEccP.ratioD[i];
    worksheet.getCell(`AY${3 + i}`).value = drift.ratioSeismicXEccN.ratioD[i];
    worksheet.getCell(`AZ${3 + i}`).value = drift.ratioSeismicY.ratioD[i];
    worksheet.getCell(`BA${3 + i}`).value = drift.ratioSeismicYEccP.ratioD[i];
    worksheet.getCell(`BB${3 + i}`).value = drift.ratioSeismicYEccN.ratioD[i];
    worksheet.getCell(`BC${3 + i}`).value = drift.driftWindXP.ratioD[i];
    worksheet.getCell(`BD${3 + i}`).value = drift.driftWindXN.ratioD[i];
    worksheet.getCell(`BE${3 + i}`).value = drift.driftWindYP.ratioD[i];
    worksheet.getCell(`BF${3 + i}`).value = drift.driftCrossWindYN.ratioD[i];
    worksheet.getCell(`BG${3 + i}`).value = drift.driftCrossWindXP.ratioD[i];
    worksheet.getCell(`BH${3 + i}`).value = drift.driftCrossWindXN.ratioD[i];
    worksheet.getCell(`BI${3 + i}`).value = drift.driftCrossWindYP.ratioD[i];
    worksheet.getCell(`BJ${3 + i}`).value = drift.driftCrossWindYN.ratioD[i];
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
  rangeFillColor(worksheet, 1, 3, 2, 18, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 19, 2, 34, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 35, 2, 48, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 49, 2, 62, 'solid', '00F0FFF0', '00FFFFFF');

  worksheet.views = [{ state: 'frozen', xSplit: 2, ySplit: 2 }];
}
