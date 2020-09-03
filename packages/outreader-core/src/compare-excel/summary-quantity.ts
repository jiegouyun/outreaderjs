import { ISummaryQuantityFE, IStructureFrontEnd } from '../interfaces';
import { rangeSetBorder, rangeFillColor } from '../excel/commom';
import Excel from 'exceljs';

export async function initSummaryQuantity(
  worksheet: Excel.Worksheet,
  nums: number,
) {
  worksheet.mergeCells('A1:B1');
  worksheet.getCell('A1').value = '模型';

  worksheet.mergeCells(2, 1, 2, 2 + nums);

  worksheet.mergeCells('A3:B3');
  worksheet.getCell('A3').value = '工程名称';
  worksheet.getCell('A4').value = '结构高度';
  worksheet.getCell('B4').value = 'm';
  worksheet.getCell('A5').value = '结构面积';
  worksheet.getCell('B5').value = 'm^2';
  worksheet.getCell('A6').value = '结构周期';
  worksheet.getCell('B6').value = 'T1/T2/T3';
  worksheet.getCell('A7').value = '层间位移角';
  worksheet.getCell('B7').value = '风/地震';
  worksheet.getCell('A8').value = '底层墙厚';
  worksheet.getCell('B8').value = 'X/Y mm';
  worksheet.getCell('A9').value = '底层柱截面';
  worksheet.getCell('B9').value = 'mm';

  worksheet.mergeCells(10, 1, 10, 2 + nums);

  worksheet.mergeCells('A11:B11');
  worksheet.getCell('A11').value = '含量';
  worksheet.mergeCells('A12:A16');
  worksheet.getCell('A12').value = '钢筋含量\nkg/m^2';
  worksheet.getCell('B12').value = '墙';
  worksheet.getCell('B13').value = '柱';
  worksheet.getCell('B14').value = '梁';
  worksheet.getCell('B15').value = '板';
  worksheet.getCell('B16').value = '合计';

  worksheet.mergeCells('A17:A21');
  worksheet.getCell('A17').value = '砼含量\nm^3/m^2';
  worksheet.getCell('B17').value = '墙';
  worksheet.getCell('B18').value = '柱';
  worksheet.getCell('B19').value = '梁';
  worksheet.getCell('B20').value = '板';
  worksheet.getCell('B21').value = '合计';

  worksheet.mergeCells('A22:A26');
  worksheet.getCell('A22').value = '型钢含量\nkg/m^2';
  worksheet.getCell('B22').value = '墙';
  worksheet.getCell('B23').value = '柱';
  worksheet.getCell('B24').value = '梁';
  worksheet.getCell('B25').value = '板';
  worksheet.getCell('B26').value = '合计';

  worksheet.mergeCells('A27:A30');
  worksheet.getCell('A27').value = '模板含量\nm^2/m^2';
  worksheet.getCell('B27').value = '墙';
  worksheet.getCell('B28').value = '柱';
  worksheet.getCell('B29').value = '梁、板';
  worksheet.getCell('B30').value = '压型钢板';

  worksheet.mergeCells('A31:A34');
  worksheet.getCell('A31').value = '涂料含量\nm^2/m^2';
  worksheet.getCell('B31').value = '墙';
  worksheet.getCell('B32').value = '柱';
  worksheet.getCell('B33').value = '梁、板';
  worksheet.getCell('B34').value = '压型钢板';

  worksheet.mergeCells(35, 1, 35, 2 + nums);

  worksheet.mergeCells('A36:B36');
  worksheet.getCell('A36').value = '总量';
  worksheet.mergeCells('A37:A41');
  worksheet.getCell('A37').value = '钢筋总量\nt';
  worksheet.getCell('B37').value = '墙';
  worksheet.getCell('B38').value = '柱';
  worksheet.getCell('B39').value = '梁';
  worksheet.getCell('B40').value = '板';
  worksheet.getCell('B41').value = '合计';

  worksheet.mergeCells('A42:A46');
  worksheet.getCell('A42').value = '砼总量\nm^3';
  worksheet.getCell('B42').value = '墙';
  worksheet.getCell('B43').value = '柱';
  worksheet.getCell('B44').value = '梁';
  worksheet.getCell('B45').value = '板';
  worksheet.getCell('B46').value = '合计';

  worksheet.mergeCells('A47:A51');
  worksheet.getCell('A47').value = '型钢总量\nt';
  worksheet.getCell('B47').value = '墙';
  worksheet.getCell('B48').value = '柱';
  worksheet.getCell('B49').value = '梁';
  worksheet.getCell('B50').value = '板';
  worksheet.getCell('B51').value = '合计';

  worksheet.mergeCells(52, 1, 52, 2 + nums);

  worksheet.mergeCells('A53:B53');
  worksheet.getCell('A53').value = '单价';
  worksheet.getCell('A54').value = '砼';
  worksheet.getCell('B54').value = '元/m^3';
  worksheet.getCell('A55').value = '钢筋';
  worksheet.getCell('B55').value = '元/t';
  worksheet.getCell('A56').value = '钢材';
  worksheet.getCell('B56').value = '元/t';
  worksheet.getCell('A57').value = '型钢';
  worksheet.getCell('B57').value = '元/t';
  worksheet.getCell('A58').value = '模板';
  worksheet.getCell('B58').value = '元/m^2';
  worksheet.getCell('A59').value = '涂料';
  worksheet.getCell('B59').value = '元/m^2';
  worksheet.getCell('A60').value = '压型钢板';
  worksheet.getCell('B60').value = '元/m^2';
}

export async function writeSummaryQuantity(
  structures: IStructureFrontEnd[],
  worksheet: Excel.Worksheet,
) {
  const n = structures.length;

  for (let i = 0; i < n; i++) {
    const summaryQuantity: ISummaryQuantityFE = structures[i].summaryQuantity;

    // write title
    worksheet.getCell(1, 3 + i).value = `模型${i + 1}`;

    // write basic information
    worksheet.getCell(3, 3 + i).value = summaryQuantity.structure.engineering;
    worksheet.getCell(4, 3 + i).value = summaryQuantity.structure.height;
    worksheet.getCell(5, 3 + i).value = summaryQuantity.structure.area;
    worksheet.getCell(6, 3 + i).value = summaryQuantity.structure.period;
    worksheet.getCell(7, 3 + i).value = summaryQuantity.structure.drift;

    // write rebar perarea
    worksheet.getCell(12, 3 + i).value = {
      formula: `round(${summaryQuantity.unitRebar.wall},2)`,
      date1904: false,
    };
    worksheet.getCell(13, 3 + i).value = {
      formula: `round(${summaryQuantity.unitRebar.column},2)`,
      date1904: false,
    };
    worksheet.getCell(14, 3 + i).value = {
      formula: `round(${summaryQuantity.unitRebar.beam},2)`,
      date1904: false,
    };
    worksheet.getCell(15, 3 + i).value = {
      formula: `round(${summaryQuantity.unitRebar.floor},2)`,
      date1904: false,
    };
    worksheet.getCell(16, 3 + i).value = {
      formula: `round(${summaryQuantity.unitRebar.total},2)`,
      date1904: false,
    };

    // wtite concrete perarea
    worksheet.getCell(17, 3 + i).value = {
      formula: `round(${summaryQuantity.unitConcrete.wall},2)`,
      date1904: false,
    };
    worksheet.getCell(18, 3 + i).value = {
      formula: `round(${summaryQuantity.unitConcrete.column},2)`,
      date1904: false,
    };
    worksheet.getCell(19, 3 + i).value = {
      formula: `round(${summaryQuantity.unitConcrete.beam},2)`,
      date1904: false,
    };
    worksheet.getCell(20, 3 + i).value = {
      formula: `round(${summaryQuantity.unitConcrete.floor},2)`,
      date1904: false,
    };
    worksheet.getCell(21, 3 + i).value = {
      formula: `round(${summaryQuantity.unitConcrete.total},2)`,
      date1904: false,
    };

    // wtite steel perarea
    worksheet.getCell(22, 3 + i).value = {
      formula: `round(${summaryQuantity.unitSteel.wall} * 1000,2)`,
      date1904: false,
    };
    worksheet.getCell(23, 3 + i).value = {
      formula: `round(${summaryQuantity.unitSteel.column} * 1000,2)`,
      date1904: false,
    };
    worksheet.getCell(24, 3 + i).value = {
      formula: `round(${summaryQuantity.unitSteel.beam} * 1000,2)`,
      date1904: false,
    };
    worksheet.getCell(25, 3 + i).value = {
      formula: `round(${summaryQuantity.unitSteel.floor} * 1000,2)`,
      date1904: false,
    };
    worksheet.getCell(26, 3 + i).value = {
      formula: `round(${summaryQuantity.unitSteel.total} * 1000,2)`,
      date1904: false,
    };

    // write rebar
    worksheet.getCell(37, 3 + i).value = {
      formula: `round(${summaryQuantity.rebar.wall} / 1000,0)`,
      date1904: false,
    };
    worksheet.getCell(38, 3 + i).value = {
      formula: `round(${summaryQuantity.rebar.column} / 1000,0)`,
      date1904: false,
    };
    worksheet.getCell(39, 3 + i).value = {
      formula: `round(${summaryQuantity.rebar.beam} / 1000,0)`,
      date1904: false,
    };
    worksheet.getCell(40, 3 + i).value = {
      formula: `round(${summaryQuantity.rebar.floor} / 1000,0)`,
      date1904: false,
    };
    worksheet.getCell(41, 3 + i).value = {
      formula: `round(${summaryQuantity.rebar.total} / 1000,0)`,
      date1904: false,
    };

    // write concrete
    worksheet.getCell(42, 3 + i).value = {
      formula: `round(${summaryQuantity.concrete.wall},0)`,
      date1904: false,
    };
    worksheet.getCell(43, 3 + i).value = {
      formula: `round(${summaryQuantity.concrete.column},0)`,
      date1904: false,
    };
    worksheet.getCell(44, 3 + i).value = {
      formula: `round(${summaryQuantity.concrete.beam},0)`,
      date1904: false,
    };
    worksheet.getCell(45, 3 + i).value = {
      formula: `round(${summaryQuantity.concrete.floor},0)`,
      date1904: false,
    };
    worksheet.getCell(46, 3 + i).value = {
      formula: `round(${summaryQuantity.concrete.total},0)`,
      date1904: false,
    };

    // write steel
    worksheet.getCell(47, 3 + i).value = {
      formula: `round(${summaryQuantity.steel.wall},0)`,
      date1904: false,
    };
    worksheet.getCell(48, 3 + i).value = {
      formula: `round(${summaryQuantity.steel.column},0)`,
      date1904: false,
    };
    worksheet.getCell(49, 3 + i).value = {
      formula: `round(${summaryQuantity.steel.beam},0)`,
      date1904: false,
    };
    worksheet.getCell(50, 3 + i).value = {
      formula: `round(${summaryQuantity.steel.floor},0)`,
      date1904: false,
    };
    worksheet.getCell(51, 3 + i).value = {
      formula: `round(${summaryQuantity.steel.total},0)`,
      date1904: false,
    };

    // write price
    worksheet.getCell('C54').value = 750;
    worksheet.getCell('C55').value = 6500;
    worksheet.getCell('C56').value = 13500;
    worksheet.getCell('C57').value = 10000;
    worksheet.getCell('C58').value = 55;
    worksheet.getCell('C59').value = 55;
    worksheet.getCell('C60').value = 65.7;
  }
}

export async function formatSummaryQuantity(
  worksheet: Excel.Worksheet,
  nums: number,
) {
  for (let col = 1; col <= worksheet.columnCount; col++) {
    worksheet.getColumn(col).width = 15;
    worksheet.getColumn(col).alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    worksheet.getColumn(col).font = { name: 'Arial', size: 10 };
  }

  for (let row = 1; row <= worksheet.rowCount; row++) {
    worksheet.getRow(row).height = 20;
  }

  rangeSetBorder(worksheet, 2, 2, 51, 1 + nums, 'thin', 'thin', 'thin', 'thin');
  rangeSetBorder(worksheet, 1, 1, 1, 1, 'medium', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 2, 1, 51, 1, 'thin', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 52, 1, 52, 1, 'thin', 'medium', 'medium', 'thin');
  rangeSetBorder(
    worksheet,
    52,
    2,
    52,
    1 + nums,
    'thin',
    'thin',
    'medium',
    'thin',
  );
  rangeSetBorder(
    worksheet,
    52,
    2 + nums,
    52,
    2 + nums,
    'thin',
    'thin',
    'medium',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    2,
    2 + nums,
    51,
    2 + nums,
    'thin',
    'thin',
    'thin',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    1,
    2 + nums,
    1,
    2 + nums,
    'medium',
    'thin',
    'thin',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    1,
    3,
    1,
    1 + nums,
    'medium',
    'thin',
    'thin',
    'thin',
  );
  rangeSetBorder(
    worksheet,
    2,
    1,
    2,
    2 + nums,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    10,
    1,
    10,
    2 + nums,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    35,
    1,
    35,
    2 + nums,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    52,
    1,
    52,
    2 + nums,
    'medium',
    'medium',
    'medium',
    'medium',
  );

  rangeSetBorder(worksheet, 54, 2, 54, 2, 'thin', 'thin', 'thin', 'thin');
  rangeSetBorder(worksheet, 53, 1, 53, 1, 'medium', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 54, 1, 59, 1, 'thin', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 60, 1, 60, 1, 'thin', 'medium', 'medium', 'thin');
  rangeSetBorder(worksheet, 60, 2, 60, 2, 'thin', 'thin', 'medium', 'thin');
  rangeSetBorder(worksheet, 60, 3, 60, 3, 'thin', 'thin', 'medium', 'medium');
  rangeSetBorder(worksheet, 54, 3, 59, 3, 'thin', 'thin', 'thin', 'medium');
  rangeSetBorder(worksheet, 53, 3, 53, 3, 'medium', 'thin', 'thin', 'medium');

  rangeFillColor(worksheet, 1, 1, 1, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 3, 1, 9, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 11, 1, 34, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 36, 1, 51, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 53, 1, 60, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 54, 3, 60, 3, 'solid', '00FFFFF0', '00FFFFFF');

  worksheet.views = [{ state: 'frozen', xSplit: 2, ySplit: 1 }];
}
