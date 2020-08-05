import { IQuantityFE } from '../interfaces';
import { rangeFillColor, distributeFormat } from './commom';
import Excel from 'exceljs';

export async function initQuantity(worksheet: Excel.Worksheet) {
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
  worksheet.getCell('Z2').value = '板';
  worksheet.getCell('AA2').value = '合计';

  worksheet.mergeCells('AB1:AF1');
  worksheet.getCell('AB1').value = '钢筋含量（kg/m^2）';
  worksheet.getCell('AB2').value = '墙';
  worksheet.getCell('AC2').value = '柱';
  worksheet.getCell('AD2').value = '梁';
  worksheet.getCell('AE2').value = '板';
  worksheet.getCell('AF2').value = '合计';
}

export async function writeQuantity(
  quantity: IQuantityFE,
  worksheet: Excel.Worksheet,
) {
  // write storey
  for (let i = 0; i < quantity.storeyID.length; i++) {
    // write storey
    worksheet.getCell(`A${3 + i}`).value = quantity.storeyID[i];
    worksheet.getCell(`B${3 + i}`).value = {
      formula: `round(${quantity.area[i]},0)`,
      date1904: false,
    };
  }

  // write concrete
  for (let i = 0; i < quantity.concrete.storeyID.length; i++) {
    // write concrete
    worksheet.getCell(`C${3 + i}`).value = {
      formula: `round(${quantity.concrete.wall[i]},0)`,
      date1904: false,
    };
    worksheet.getCell(`D${3 + i}`).value = {
      formula: `round(${quantity.concrete.column[i]},0)`,
      date1904: false,
    };
    worksheet.getCell(`E${3 + i}`).value = {
      formula: `round(${quantity.concrete.beam[i]},0)`,
      date1904: false,
    };
    worksheet.getCell(`F${3 + i}`).value = {
      formula: `round(${quantity.concrete.floor[i]},0)`,
      date1904: false,
    };
    worksheet.getCell(`G${3 + i}`).value = {
      formula: `round(${quantity.concrete.storey[i]},0)`,
      date1904: false,
    };

    // write concrete pre area
    worksheet.getCell(`H${3 + i}`).value = {
      formula: `round(${quantity.unitConcrete.wall[i]},2)`,
      date1904: false,
    };
    worksheet.getCell(`I${3 + i}`).value = {
      formula: `round(${quantity.unitConcrete.column[i]},2)`,
      date1904: false,
    };
    worksheet.getCell(`J${3 + i}`).value = {
      formula: `round(${quantity.unitConcrete.beam[i]},2)`,
      date1904: false,
    };
    worksheet.getCell(`K${3 + i}`).value = {
      formula: `round(${quantity.unitConcrete.floor[i]},2)`,
      date1904: false,
    };
    worksheet.getCell(`L${3 + i}`).value = {
      formula: `round(${quantity.unitConcrete.storey[i]},2)`,
      date1904: false,
    };
  }

  // write steel
  for (let i = 0; i < quantity.steel.storeyID.length; i++) {
    // write steel
    worksheet.getCell(`M${3 + i}`).value = {
      formula: `round(${quantity.steel.wall[i]},0)`,
      date1904: false,
    };
    worksheet.getCell(`N${3 + i}`).value = {
      formula: `round(${quantity.steel.column[i]},0)`,
      date1904: false,
    };
    worksheet.getCell(`O${3 + i}`).value = {
      formula: `round(${quantity.steel.beam[i]},0)`,
      date1904: false,
    };
    worksheet.getCell(`P${3 + i}`).value = {
      formula: `round(${quantity.steel.floor[i]},0)`,
      date1904: false,
    };
    worksheet.getCell(`Q${3 + i}`).value = {
      formula: `round(${quantity.steel.storey[i]},0)`,
      date1904: false,
    };

    // write steel pre area
    worksheet.getCell(`R${3 + i}`).value = {
      formula: `round(${quantity.unitSteel.wall[i]} * 1000,2)`,
      date1904: false,
    };
    worksheet.getCell(`S${3 + i}`).value = {
      formula: `round(${quantity.unitSteel.column[i]} * 1000,2)`,
      date1904: false,
    };
    worksheet.getCell(`T${3 + i}`).value = {
      formula: `round(${quantity.unitSteel.beam[i]} * 1000,2)`,
      date1904: false,
    };
    worksheet.getCell(`U${3 + i}`).value = {
      formula: `round(${quantity.unitSteel.floor[i]} * 1000,2)`,
      date1904: false,
    };
    worksheet.getCell(`V${3 + i}`).value = {
      formula: `round(${quantity.unitSteel.storey[i]} * 1000,2)`,
      date1904: false,
    };
  }

  // write rebar
  for (let i = 0; i < quantity.rebar.storeyID.length; i++) {
    // write rebar
    worksheet.getCell(`W${3 + i}`).value = {
      formula: `round(${quantity.rebar.wall[i]} / 1000,2)`,
      date1904: false,
    };
    worksheet.getCell(`X${3 + i}`).value = {
      formula: `round(${quantity.rebar.column[i]} / 1000,2)`,
      date1904: false,
    };
    worksheet.getCell(`Y${3 + i}`).value = {
      formula: `round(${quantity.rebar.beam[i]} / 1000,2)`,
      date1904: false,
    };
    worksheet.getCell(`Z${3 + i}`).value = {
      formula: `round(${quantity.rebar.floor[i]} / 1000,2)`,
      date1904: false,
    };
    worksheet.getCell(`AA${3 + i}`).value = {
      formula: `round(${quantity.rebar.storey[i]} / 1000,2)`,
      date1904: false,
    };

    // write rebar pre area
    worksheet.getCell(`AB${3 + i}`).value = {
      formula: `round(${quantity.unitRebar.wall[i]},2)`,
      date1904: false,
    };
    worksheet.getCell(`AC${3 + i}`).value = {
      formula: `round(${quantity.unitRebar.column[i]},2)`,
      date1904: false,
    };
    worksheet.getCell(`AD${3 + i}`).value = {
      formula: `round(${quantity.unitRebar.beam[i]},2)`,
      date1904: false,
    };
    worksheet.getCell(`AE${3 + i}`).value = {
      formula: `round(${quantity.unitRebar.floor[i]},2)`,
      date1904: false,
    };
    worksheet.getCell(`AF${3 + i}`).value = {
      formula: `round(${quantity.unitRebar.storey[i]},2)`,
      date1904: false,
    };
  }
}

export async function formatQuantity(worksheet: Excel.Worksheet) {
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
