import { IStructure } from '@outreader/core';
import { rangeSetBorder, rangeFillColor } from './commom';
import Excel from 'exceljs';

export function initSummaryQuantity(worksheet: Excel.Worksheet): void {
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

export function writeSummaryQuantity(
  structure: IStructure,
  worksheet: Excel.Worksheet,
): void {
  // write basic information
  worksheet.getCell('B1').value = { formula: '汇总信息!D3', date1904: false };
  worksheet.getCell('C2').value = { formula: '汇总信息!F6', date1904: false };
  worksheet.getCell('C3').value =
    Math.round(structure.rebar?.area.totalArea as number) || '';
  worksheet.getCell('C4').value = {
    formula: '汇总信息!C39 & "/" & 汇总信息!C40 & "/" & 汇总信息!C41',
    date1904: false,
  };
  worksheet.getCell('C5').value = {
    formula: 'min(汇总信息!D12:D13) & "/" & min(汇总信息!D14:D15)',
    date1904: false,
  };

  // write rebar perarea
  worksheet.getCell('C10').value = {
    formula: 'round(C35*1000/C3,2)',
    date1904: false,
  };
  worksheet.getCell('C11').value = {
    formula: 'round(C36*1000/C3,2)',
    date1904: false,
  };
  worksheet.getCell('C12').value = {
    formula: 'round(C37*1000/C3,2)',
    date1904: false,
  };
  worksheet.getCell('C13').value = {
    formula: 'round(C38*1000/C3,2)',
    date1904: false,
  };
  worksheet.getCell('C14').value = {
    formula: 'round(C39*1000/C3,2)',
    date1904: false,
  };

  // wtite concrete perarea
  worksheet.getCell('C15').value = {
    formula: 'round(C40/C3,2)',
    date1904: false,
  };
  worksheet.getCell('C16').value = {
    formula: 'round(C41/C3,2)',
    date1904: false,
  };
  worksheet.getCell('C17').value = {
    formula: 'round(C42/C3,2)',
    date1904: false,
  };
  worksheet.getCell('C18').value = {
    formula: 'round(C43/C3,2)',
    date1904: false,
  };
  worksheet.getCell('C19').value = {
    formula: 'round(C44/C3,2)',
    date1904: false,
  };

  // wtite steel perarea
  worksheet.getCell('C20').value = {
    formula: 'round(C45*1000/C3,2)',
    date1904: false,
  };
  worksheet.getCell('C21').value = {
    formula: 'round(C46*1000/C3,2)',
    date1904: false,
  };
  worksheet.getCell('C22').value = {
    formula: 'round(C47*1000/C3,2)',
    date1904: false,
  };
  worksheet.getCell('C23').value = {
    formula: 'round(C48*1000/C3,2)',
    date1904: false,
  };
  worksheet.getCell('C24').value = {
    formula: 'round(C49*1000/C3,2)',
    date1904: false,
  };

  // write rebar
  worksheet.getCell('C35').value = Math.round(
    (structure.rebar?.wallRebar.total as number) / 1000,
  );
  worksheet.getCell('C36').value = Math.round(
    (structure.rebar?.columnRebar.total as number) / 1000,
  );
  worksheet.getCell('C37').value = Math.round(
    (structure.rebar?.beamRebar.total as number) / 1000,
  );
  worksheet.getCell('C38').value = Math.round(
    (structure.rebar?.floorRebar.total as number) / 1000,
  );
  worksheet.getCell('C39').value = Math.round(
    (structure.rebar?.projectRebar.total as number) / 1000,
  );

  // write concrete
  worksheet.getCell('C40').value = Math.round(
    structure.concreteSteel?.concrete.totalWall as number,
  );
  worksheet.getCell('C41').value = Math.round(
    structure.concreteSteel?.concrete.totalColumn as number,
  );
  worksheet.getCell('C42').value = Math.round(
    structure.concreteSteel?.concrete.totalBeam as number,
  );
  worksheet.getCell('C43').value = Math.round(
    structure.concreteSteel?.concrete.totalFloor as number,
  );
  worksheet.getCell('C44').value = Math.round(
    structure.concreteSteel?.concrete.totalStorey as number,
  );

  // write steel
  worksheet.getCell('C45').value = Math.round(
    structure.concreteSteel?.steel.totalWall as number,
  );
  worksheet.getCell('C46').value = Math.round(
    structure.concreteSteel?.steel.totalColumn as number,
  );
  worksheet.getCell('C47').value = Math.round(
    structure.concreteSteel?.steel.totalBeam as number,
  );
  worksheet.getCell('C48').value = Math.round(
    structure.concreteSteel?.steel.totalFloor as number,
  );
  worksheet.getCell('C49').value = Math.round(
    structure.concreteSteel?.steel.totalStorey as number,
  );

  // write price
  worksheet.getCell('C52').value = 750;
  worksheet.getCell('C53').value = 6500;
  worksheet.getCell('C54').value = 13500;
  worksheet.getCell('C55').value = 10000;
  worksheet.getCell('C56').value = 55;
  worksheet.getCell('C57').value = 55;
  worksheet.getCell('C58').value = 65.7;
}

export function formatSummaryQuantity(worksheet: Excel.Worksheet): void {
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
  rangeFillColor(worksheet, 9, 1, 9, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 10, 1, 32, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 34, 1, 34, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 35, 1, 49, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 51, 1, 51, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 52, 1, 58, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 52, 3, 58, 3, 'solid', '00FFFFF0', '00FFFFFF');
}
