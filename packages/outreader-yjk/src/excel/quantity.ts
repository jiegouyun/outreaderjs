import { IStructure } from '@outreader/core';
import { rangeSetBorder, rangeFillColor, distributeFormat } from './commom';
import Excel from 'exceljs';

export function initQuantity(worksheet: Excel.Worksheet): void {
  worksheet.mergeCells('A1:B1');
  worksheet.getCell('A1').value = '楼层信息';
  worksheet.getCell('A2').value = '层号';
  worksheet.getCell('B2').value = '面积（m^2）';

  worksheet.mergeCells('C1:G1');
  worksheet.getCell('C1').value = '砼用量（m^3）';
  worksheet.getCell('C2').value = '墙';
  worksheet.getCell('D2').value = '柱';
  worksheet.getCell('E2').value = '梁';
  worksheet.getCell('F2').value = '板';
  worksheet.getCell('G2').value = '合计';

  worksheet.mergeCells('H1:L1');
  worksheet.getCell('H1').value = '砼含量（m^3/m^2）';
  worksheet.getCell('H2').value = '墙';
  worksheet.getCell('I2').value = '柱';
  worksheet.getCell('J2').value = '梁';
  worksheet.getCell('K2').value = '板';
  worksheet.getCell('L2').value = '合计';

  worksheet.mergeCells('M1:Q1');
  worksheet.getCell('M1').value = '型钢用量（t）';
  worksheet.getCell('M2').value = '墙';
  worksheet.getCell('N2').value = '柱';
  worksheet.getCell('O2').value = '梁';
  worksheet.getCell('P2').value = '板';
  worksheet.getCell('Q2').value = '合计';

  worksheet.mergeCells('R1:V1');
  worksheet.getCell('R1').value = '型钢含量（kg/m^2）';
  worksheet.getCell('R2').value = '墙';
  worksheet.getCell('S2').value = '柱';
  worksheet.getCell('T2').value = '梁';
  worksheet.getCell('U2').value = '板';
  worksheet.getCell('V2').value = '合计';

  worksheet.mergeCells('W1:AA1');
  worksheet.getCell('W1').value = '钢筋用量（t）';
  worksheet.getCell('W2').value = '墙';
  worksheet.getCell('X2').value = '柱';
  worksheet.getCell('Y2').value = '梁';
  worksheet.getCell('ZA2').value = '板';
  worksheet.getCell('AA2').value = '合计';

  worksheet.mergeCells('AB1:AF1');
  worksheet.getCell('AB1').value = '钢筋含量（kg/m^2）';
  worksheet.getCell('AB2').value = '墙';
  worksheet.getCell('AC2').value = '柱';
  worksheet.getCell('AD2').value = '梁';
  worksheet.getCell('AE2').value = '板';
  worksheet.getCell('AF2').value = '合计';
}

export function writeQuantity(
  structure: IStructure,
  worksheet: Excel.Worksheet,
): void {
  // write storey
  for (
    let i = 0;
    i < (structure.wmass?.storey.storeyID as number[]).length;
    i++
  ) {
    // write storey
    worksheet.getCell(`A${3 + i}`).value =
      structure.wmass?.storey.storeyID[i] || '';
    worksheet.getCell(`B${3 + i}`).value =
      Math.round(structure.wmass?.storey.area[i] as number) || '';
  }

  // write concrete
  for (
    let i = 0;
    i < (structure.concreteSteel?.concrete.storeyID as number[]).length;
    i++
  ) {
    // write concrete
    worksheet.getCell(`C${3 + i}`).value =
      Math.round(structure.concreteSteel?.concrete.wall[i] as number) || '';
    worksheet.getCell(`D${3 + i}`).value =
      Math.round(structure.concreteSteel?.concrete.column[i] as number) || '';
    worksheet.getCell(`E${3 + i}`).value =
      Math.round(structure.concreteSteel?.concrete.beam[i] as number) || '';
    worksheet.getCell(`F${3 + i}`).value =
      Math.round(structure.concreteSteel?.concrete.floor[i] as number) || '';
    worksheet.getCell(`G${3 + i}`).value =
      Math.round(structure.concreteSteel?.concrete.storey[i] as number) || '';

    // write concrete pre area
    worksheet.getCell(`H${3 + i}`).value = {
      formula: `round(C${3 + i}/B${3 + i},2)`,
      date1904: false,
    };
    worksheet.getCell(`I${3 + i}`).value = {
      formula: `round(D${3 + i}/B${3 + i},2)`,
      date1904: false,
    };
    worksheet.getCell(`J${3 + i}`).value = {
      formula: `round(E${3 + i}/B${3 + i},2)`,
      date1904: false,
    };
    worksheet.getCell(`K${3 + i}`).value = {
      formula: `round(F${3 + i}/B${3 + i},2)`,
      date1904: false,
    };
    worksheet.getCell(`L${3 + i}`).value = {
      formula: `round(G${3 + i}/B${3 + i},2)`,
      date1904: false,
    };
  }

  // write steel
  for (
    let i = 0;
    i < (structure.concreteSteel?.steel.storeyID as number[]).length;
    i++
  ) {
    // write steel
    worksheet.getCell(`M${3 + i}`).value =
      Math.round(structure.concreteSteel?.steel.wall[i] as number) || '';
    worksheet.getCell(`N${3 + i}`).value =
      Math.round(structure.concreteSteel?.steel.column[i] as number) || '';
    worksheet.getCell(`O${3 + i}`).value =
      Math.round(structure.concreteSteel?.steel.beam[i] as number) || '';
    worksheet.getCell(`P${3 + i}`).value =
      Math.round(structure.concreteSteel?.steel.floor[i] as number) || '';
    worksheet.getCell(`Q${3 + i}`).value =
      Math.round(structure.concreteSteel?.steel.storey[i] as number) || '';

    // write steel pre area
    worksheet.getCell(`R${3 + i}`).value = {
      formula: `round(M${3 + i}/B${3 + i},2)`,
      date1904: false,
    };
    worksheet.getCell(`S${3 + i}`).value = {
      formula: `round(N${3 + i}/B${3 + i},2)`,
      date1904: false,
    };
    worksheet.getCell(`T${3 + i}`).value = {
      formula: `round(O${3 + i}/B${3 + i},2)`,
      date1904: false,
    };
    worksheet.getCell(`U${3 + i}`).value = {
      formula: `round(P${3 + i}/B${3 + i},2)`,
      date1904: false,
    };
    worksheet.getCell(`V${3 + i}`).value = {
      formula: `round(Q${3 + i}/B${3 + i},2)`,
      date1904: false,
    };
  }

  // write rebar
  for (
    let i = 0;
    i < (structure.rebar?.area.storeyID as number[]).length;
    i++
  ) {
    // write rebar
    worksheet.getCell(`W${3 + i}`).value =
      Math.round((structure.rebar?.wallRebar.storey[i] as number) / 1000) || '';
    worksheet.getCell(`X${3 + i}`).value =
      Math.round((structure.rebar?.columnRebar.storey[i] as number) / 1000) ||
      '';
    worksheet.getCell(`Y${3 + i}`).value =
      Math.round((structure.rebar?.beamRebar.storey[i] as number) / 1000) || '';
    worksheet.getCell(`Z${3 + i}`).value =
      Math.round((structure.rebar?.floorRebar.storey[i] as number) / 1000) ||
      '';
    worksheet.getCell(`AA${3 + i}`).value = {
      formula: `sum(W${3 + i}:Z${3 + i})`,
      date1904: false,
    };

    // write rebar pre area
    worksheet.getCell(`AB${3 + i}`).value =
      structure.rebar?.wallRebar.perArea[i] || '';
    worksheet.getCell(`AC${3 + i}`).value =
      structure.rebar?.columnRebar.perArea[i] || '';
    worksheet.getCell(`AD${3 + i}`).value =
      structure.rebar?.beamRebar.perArea[i] || '';
    worksheet.getCell(`AE${3 + i}`).value =
      structure.rebar?.floorRebar.perArea[i] || '';
    worksheet.getCell(`AF${3 + i}`).value = {
      formula: `sum(AB${3 + i}:AE${3 + i})`,
      date1904: false,
    };
  }
}

export function formatQuantity(worksheet: Excel.Worksheet): void {
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
  rangeFillColor(worksheet, 1, 3, 2, 7, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 8, 2, 12, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 13, 2, 17, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 18, 2, 22, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 1, 23, 2, 27, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 1, 28, 2, 32, 'solid', '00F0FFF0', '00FFFFFF');

  worksheet.views = [{ state: 'frozen', xSplit: 2, ySplit: 2 }];
}
