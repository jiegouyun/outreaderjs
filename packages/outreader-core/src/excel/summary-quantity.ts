import { ISummaryQuantityFE } from '../interfaces';
import { rangeSetBorder, rangeFillColor } from './commom';
import Excel from 'exceljs';

export async function initSummaryQuantity(worksheet: Excel.Worksheet) {
  worksheet.getCell('A1').value = '工程名称';
  worksheet.mergeCells('B1:C1');
  worksheet.getCell('A2').value = '结构高度';
  worksheet.getCell('B2').value = 'm';
  worksheet.getCell('A3').value = '结构面积';
  worksheet.getCell('B3').value = 'm^2';
  worksheet.getCell('A4').value = '结构周期';
  worksheet.getCell('B4').value = 'T1/T2/T3';
  worksheet.getCell('A5').value = '层间位移角';
  worksheet.getCell('B5').value = '风/地震';
  worksheet.getCell('A6').value = '底层墙厚';
  worksheet.getCell('B6').value = 'X/Y mm';
  worksheet.getCell('A7').value = '底层柱截面';
  worksheet.getCell('B7').value = 'mm';

  worksheet.mergeCells('A8:C8');

  worksheet.getCell('A9').value = '含量';
  worksheet.mergeCells('B9:C9');
  worksheet.mergeCells('A10:A14');
  worksheet.getCell('A10').value = '钢筋含量\nkg/m^2';
  worksheet.getCell('B10').value = '墙';
  worksheet.getCell('B11').value = '柱';
  worksheet.getCell('B12').value = '梁';
  worksheet.getCell('B13').value = '板';
  worksheet.getCell('B14').value = '合计';

  worksheet.mergeCells('A15:A19');
  worksheet.getCell('A15').value = '砼含量\nm^3/m^2';
  worksheet.getCell('B15').value = '墙';
  worksheet.getCell('B16').value = '柱';
  worksheet.getCell('B17').value = '梁';
  worksheet.getCell('B18').value = '板';
  worksheet.getCell('B19').value = '合计';

  worksheet.mergeCells('A20:A24');
  worksheet.getCell('A20').value = '型钢含量\nkg/m^2';
  worksheet.getCell('B20').value = '墙';
  worksheet.getCell('B21').value = '柱';
  worksheet.getCell('B22').value = '梁';
  worksheet.getCell('B23').value = '板';
  worksheet.getCell('B24').value = '合计';

  worksheet.mergeCells('A25:A28');
  worksheet.getCell('A25').value = '模板含量\nm^2/m^2';
  worksheet.getCell('B25').value = '墙';
  worksheet.getCell('B26').value = '柱';
  worksheet.getCell('B27').value = '梁、板';
  worksheet.getCell('B28').value = '压型钢板';

  worksheet.mergeCells('A29:A32');
  worksheet.getCell('A29').value = '涂料含量\nm^2/m^2';
  worksheet.getCell('B29').value = '墙';
  worksheet.getCell('B30').value = '柱';
  worksheet.getCell('B31').value = '梁、板';
  worksheet.getCell('B32').value = '压型钢板';

  worksheet.mergeCells('A33:C33');

  worksheet.getCell('A34').value = '总量';
  worksheet.mergeCells('B34:C34');
  worksheet.mergeCells('A35:A39');
  worksheet.getCell('A35').value = '钢筋总量\nt';
  worksheet.getCell('B35').value = '墙';
  worksheet.getCell('B36').value = '柱';
  worksheet.getCell('B37').value = '梁';
  worksheet.getCell('B38').value = '板';
  worksheet.getCell('B39').value = '合计';

  worksheet.mergeCells('A40:A44');
  worksheet.getCell('A40').value = '砼总量\nm^3';
  worksheet.getCell('B40').value = '墙';
  worksheet.getCell('B41').value = '柱';
  worksheet.getCell('B42').value = '梁';
  worksheet.getCell('B43').value = '板';
  worksheet.getCell('B44').value = '合计';

  worksheet.mergeCells('A45:A49');
  worksheet.getCell('A45').value = '型钢总量\nt';
  worksheet.getCell('B45').value = '墙';
  worksheet.getCell('B46').value = '柱';
  worksheet.getCell('B47').value = '梁';
  worksheet.getCell('B48').value = '板';
  worksheet.getCell('B49').value = '合计';

  worksheet.mergeCells('A50:C50');

  worksheet.getCell('A51').value = '单价';
  worksheet.mergeCells('B51:C51');
  worksheet.getCell('A52').value = '砼';
  worksheet.getCell('B52').value = '元/m^3';
  worksheet.getCell('A53').value = '钢筋';
  worksheet.getCell('B53').value = '元/t';
  worksheet.getCell('A54').value = '钢材';
  worksheet.getCell('B54').value = '元/t';
  worksheet.getCell('A55').value = '型钢';
  worksheet.getCell('B55').value = '元/t';
  worksheet.getCell('A56').value = '模板';
  worksheet.getCell('B56').value = '元/m^2';
  worksheet.getCell('A57').value = '涂料';
  worksheet.getCell('B57').value = '元/m^2';
  worksheet.getCell('A58').value = '压型钢板';
  worksheet.getCell('B58').value = '元/m^2';
}

export async function writeSummaryQuantity(
  summaryQuantity: ISummaryQuantityFE,
  worksheet: Excel.Worksheet,
) {
  // write basic information
  worksheet.getCell('B1').value = summaryQuantity.structure.engineering;
  worksheet.getCell('C2').value = summaryQuantity.structure.height;
  worksheet.getCell('C3').value = summaryQuantity.structure.area;
  worksheet.getCell('C4').value = summaryQuantity.structure.period;
  worksheet.getCell('C5').value = summaryQuantity.structure.drift;

  // write rebar perarea
  worksheet.getCell('C10').value = {
    formula: `round(${summaryQuantity.unitRebar.wall},2)`,
    date1904: false,
  };
  worksheet.getCell('C11').value = {
    formula: `round(${summaryQuantity.unitRebar.column},2)`,
    date1904: false,
  };
  worksheet.getCell('C12').value = {
    formula: `round(${summaryQuantity.unitRebar.beam},2)`,
    date1904: false,
  };
  worksheet.getCell('C13').value = {
    formula: `round(${summaryQuantity.unitRebar.floor},2)`,
    date1904: false,
  };
  worksheet.getCell('C14').value = {
    formula: `round(${summaryQuantity.unitRebar.total},2)`,
    date1904: false,
  };

  // wtite concrete perarea
  worksheet.getCell('C15').value = {
    formula: `round(${summaryQuantity.unitConcrete.wall},2)`,
    date1904: false,
  };
  worksheet.getCell('C16').value = {
    formula: `round(${summaryQuantity.unitConcrete.column},2)`,
    date1904: false,
  };
  worksheet.getCell('C17').value = {
    formula: `round(${summaryQuantity.unitConcrete.beam},2)`,
    date1904: false,
  };
  worksheet.getCell('C18').value = {
    formula: `round(${summaryQuantity.unitConcrete.floor},2)`,
    date1904: false,
  };
  worksheet.getCell('C19').value = {
    formula: `round(${summaryQuantity.unitConcrete.total},2)`,
    date1904: false,
  };

  // wtite steel perarea
  worksheet.getCell('C20').value = {
    formula: `round(${summaryQuantity.unitSteel.wall} * 1000,2)`,
    date1904: false,
  };
  worksheet.getCell('C21').value = {
    formula: `round(${summaryQuantity.unitSteel.column} * 1000,2)`,
    date1904: false,
  };
  worksheet.getCell('C22').value = {
    formula: `round(${summaryQuantity.unitSteel.beam} * 1000,2)`,
    date1904: false,
  };
  worksheet.getCell('C23').value = {
    formula: `round(${summaryQuantity.unitSteel.floor} * 1000,2)`,
    date1904: false,
  };
  worksheet.getCell('C24').value = {
    formula: `round(${summaryQuantity.unitSteel.total} * 1000,2)`,
    date1904: false,
  };

  // write rebar
  worksheet.getCell('C35').value = {
    formula: `round(${summaryQuantity.rebar.wall} / 1000,0)`,
    date1904: false,
  };
  worksheet.getCell('C36').value = {
    formula: `round(${summaryQuantity.rebar.column} / 1000,0)`,
    date1904: false,
  };
  worksheet.getCell('C37').value = {
    formula: `round(${summaryQuantity.rebar.beam} / 1000,0)`,
    date1904: false,
  };
  worksheet.getCell('C38').value = {
    formula: `round(${summaryQuantity.rebar.floor} / 1000,0)`,
    date1904: false,
  };
  worksheet.getCell('C39').value = {
    formula: `round(${summaryQuantity.rebar.total} / 1000,0)`,
    date1904: false,
  };

  // write concrete
  worksheet.getCell('C40').value = {
    formula: `round(${summaryQuantity.concrete.wall},0)`,
    date1904: false,
  };
  worksheet.getCell('C41').value = {
    formula: `round(${summaryQuantity.concrete.column},0)`,
    date1904: false,
  };
  worksheet.getCell('C42').value = {
    formula: `round(${summaryQuantity.concrete.beam},0)`,
    date1904: false,
  };
  worksheet.getCell('C43').value = {
    formula: `round(${summaryQuantity.concrete.floor},0)`,
    date1904: false,
  };
  worksheet.getCell('C44').value = {
    formula: `round(${summaryQuantity.concrete.total},0)`,
    date1904: false,
  };

  // write steel
  worksheet.getCell('C45').value = {
    formula: `round(${summaryQuantity.steel.wall},0)`,
    date1904: false,
  };
  worksheet.getCell('C46').value = {
    formula: `round(${summaryQuantity.steel.column},0)`,
    date1904: false,
  };
  worksheet.getCell('C47').value = {
    formula: `round(${summaryQuantity.steel.beam},0)`,
    date1904: false,
  };
  worksheet.getCell('C48').value = {
    formula: `round(${summaryQuantity.steel.floor},0)`,
    date1904: false,
  };
  worksheet.getCell('C49').value = {
    formula: `round(${summaryQuantity.steel.total},0)`,
    date1904: false,
  };

  // write price
  worksheet.getCell('C52').value = 750;
  worksheet.getCell('C53').value = 6500;
  worksheet.getCell('C54').value = 13500;
  worksheet.getCell('C55').value = 10000;
  worksheet.getCell('C56').value = 55;
  worksheet.getCell('C57').value = 55;
  worksheet.getCell('C58').value = 65.7;
}

export async function formatSummaryQuantity(worksheet: Excel.Worksheet) {
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

  rangeSetBorder(worksheet, 1, 1, 58, 3, 'thin', 'thin', 'thin', 'thin');
  rangeSetBorder(worksheet, 1, 1, 1, 3, 'medium', 'thin', 'thin', 'thin');
  rangeSetBorder(worksheet, 1, 1, 58, 1, 'thin', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 58, 1, 58, 3, 'thin', 'thin', 'medium', 'thin');
  rangeSetBorder(worksheet, 1, 3, 58, 3, 'thin', 'thin', 'thin', 'medium');
  rangeSetBorder(worksheet, 8, 1, 8, 3, 'medium', 'medium', 'medium', 'medium');
  rangeSetBorder(
    worksheet,
    33,
    1,
    33,
    3,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    50,
    1,
    50,
    3,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(worksheet, 1, 1, 1, 1, 'medium', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 58, 1, 58, 1, 'thin', 'medium', 'medium', 'thin');
  rangeSetBorder(worksheet, 58, 3, 58, 3, 'thin', 'thin', 'medium', 'medium');
  rangeSetBorder(worksheet, 1, 3, 1, 3, 'medium', 'thin', 'thin', 'medium');

  rangeFillColor(worksheet, 1, 1, 1, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 2, 1, 7, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 9, 1, 9, 1, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 10, 1, 32, 2, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 34, 1, 34, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 35, 1, 49, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 51, 1, 51, 1, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 52, 1, 58, 2, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 52, 3, 58, 3, 'solid', '00FFFFF0', '00FFFFFF');
}
