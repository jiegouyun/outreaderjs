import { ISummaryFE } from '../interfaces';
import { rangeSetBorder, rangeFillColor } from './commom';
import Excel from 'exceljs';

export async function initSummary(worksheet: Excel.Worksheet) {
  worksheet.mergeCells('A1:F1');
  worksheet.getCell('A1').value = '计算结果记录表';

  worksheet.mergeCells('A2:B4');
  worksheet.getCell('A2').value = '工程信息';
  worksheet.getCell('C2').value = '工程路径';
  worksheet.mergeCells('D2:F2');
  worksheet.getCell('C3').value = '工程名称';
  worksheet.getCell('C4').value = '软件名称';
  worksheet.getCell('E3').value = '计算日期';
  worksheet.getCell('E4').value = '版本';

  worksheet.mergeCells('A5:B9');
  worksheet.getCell('A5').value = '结构信息';
  worksheet.getCell('C5').value = '结构体系';
  worksheet.getCell('C6').value = '楼层数';
  worksheet.getCell('C7').value = '地下室层数';
  worksheet.getCell('C8').value = '地震烈度';
  worksheet.getCell('C9').value = '楼板假定';
  worksheet.getCell('E5').value = '结构材料';
  worksheet.getCell('E6').value = '结构高度';
  worksheet.getCell('E7').value = '嵌固层';
  worksheet.getCell('E8').value = '基本风压';
  worksheet.getCell('E9').value = '周期折减系数';

  worksheet.mergeCells('A10:B11');
  worksheet.getCell('A10').value = '质量';
  worksheet.getCell('C10').value = '活载质量';
  worksheet.getCell('C11').value = '恒载质量';
  worksheet.getCell('E10').value = '附加质量';
  worksheet.getCell('E11').value = '总质量';

  worksheet.mergeCells('A12:A16');
  worksheet.getCell('A12').value = '层间位移角';
  worksheet.mergeCells('B12:B13');
  worksheet.getCell('B12').value = '风荷载';
  worksheet.mergeCells('B14:B15');
  worksheet.getCell('B14').value = '地震';
  worksheet.getCell('C12').value = 'X向';
  worksheet.getCell('C13').value = 'Y向';
  worksheet.getCell('C14').value = 'X向';
  worksheet.getCell('C15').value = 'Y向';
  worksheet.getCell('E12').value = '楼层';
  worksheet.getCell('E13').value = '楼层';
  worksheet.getCell('E14').value = '楼层';
  worksheet.getCell('E15').value = '楼层';
  worksheet.mergeCells('B16:C16');
  worksheet.getCell('B16').value = '限值';
  worksheet.mergeCells('D16:F16');

  worksheet.mergeCells('A17:A21');
  worksheet.getCell('A17').value = '位移比';
  worksheet.mergeCells('B17:B18');
  worksheet.getCell('B17').value = '+偏心';
  worksheet.mergeCells('B19:B20');
  worksheet.getCell('B19').value = '-偏心';
  worksheet.getCell('C17').value = 'X向';
  worksheet.getCell('C18').value = 'Y向';
  worksheet.getCell('C19').value = 'X向';
  worksheet.getCell('C20').value = 'Y向';
  worksheet.getCell('E17').value = '楼层';
  worksheet.getCell('E18').value = '楼层';
  worksheet.getCell('E19').value = '楼层';
  worksheet.getCell('E20').value = '楼层';
  worksheet.mergeCells('B21:C21');
  worksheet.getCell('B21').value = '限值';
  worksheet.mergeCells('D21:F21');

  worksheet.mergeCells('A22:A26');
  worksheet.getCell('A22').value = '层间位移比';
  worksheet.mergeCells('B22:B23');
  worksheet.getCell('B22').value = '+偏心';
  worksheet.mergeCells('B24:B25');
  worksheet.getCell('B24').value = '-偏心';
  worksheet.getCell('C22').value = 'X向';
  worksheet.getCell('C23').value = 'Y向';
  worksheet.getCell('C24').value = 'X向';
  worksheet.getCell('C25').value = 'Y向';
  worksheet.getCell('E22').value = '楼层';
  worksheet.getCell('E23').value = '楼层';
  worksheet.getCell('E24').value = '楼层';
  worksheet.getCell('E25').value = '楼层';
  worksheet.mergeCells('B26:C26');
  worksheet.getCell('B26').value = '限值';
  worksheet.mergeCells('D26:F26');

  worksheet.mergeCells('A27:B28');
  worksheet.getCell('A27').value = '剪重比';
  worksheet.getCell('C27').value = 'X向';
  worksheet.getCell('C28').value = 'Y向';
  worksheet.getCell('E27').value = '限值';
  worksheet.getCell('E28').value = '限值';

  worksheet.mergeCells('A29:A32');
  worksheet.getCell('A29').value = '刚重比';
  worksheet.mergeCells('B29:B30');
  worksheet.getCell('B29').value = '风荷载';
  worksheet.mergeCells('B31:B32');
  worksheet.getCell('B31').value = '地震';
  worksheet.getCell('C29').value = 'X向';
  worksheet.getCell('C30').value = 'Y向';
  worksheet.getCell('C31').value = 'X向';
  worksheet.getCell('C32').value = 'Y向';
  worksheet.getCell('E29').value = '判断';
  worksheet.getCell('E30').value = '判断';
  worksheet.getCell('E31').value = '判断';
  worksheet.getCell('E32').value = '判断';

  worksheet.mergeCells('A33:B34');
  worksheet.getCell('A33').value = '刚度比';
  worksheet.getCell('C33').value = 'X向';
  worksheet.getCell('C34').value = 'Y向';
  worksheet.getCell('E33').value = '楼层';
  worksheet.getCell('E34').value = '楼层';

  worksheet.mergeCells('A35:B36');
  worksheet.getCell('A35').value = '受剪承载力比';
  worksheet.getCell('C35').value = 'X向';
  worksheet.getCell('C36').value = 'Y向';
  worksheet.getCell('E35').value = '楼层';
  worksheet.getCell('E36').value = '楼层';

  worksheet.mergeCells('A37:F37');

  worksheet.mergeCells('A38:A45');
  worksheet.getCell('A38').value = '动力特性';
  worksheet.getCell('B38').value = '振型';
  worksheet.getCell('C38').value = '周期';
  worksheet.getCell('D38').value = '平动系数X';
  worksheet.getCell('E38').value = '平动系数Y';
  worksheet.getCell('F38').value = '扭转系数Z';
  worksheet.getCell('B39').value = 1;
  worksheet.getCell('B40').value = 2;
  worksheet.getCell('B41').value = 3;
  worksheet.getCell('B42').value = 4;
  worksheet.getCell('B43').value = 5;
  worksheet.getCell('B44').value = 6;
  worksheet.getCell('B45').value = '周期比';
  worksheet.getCell('E45').value = '计算振型数';
  worksheet.mergeCells('A46:B46');
  worksheet.getCell('A46').value = '振型质量参与系数';
  worksheet.getCell('C46').value = 'X向';
  worksheet.getCell('E46').value = 'Y向';

  worksheet.mergeCells('A47:F47');

  worksheet.mergeCells('A48:A49');
  worksheet.getCell('A48').value = '基底剪力';
  worksheet.getCell('B48').value = '风荷载';
  worksheet.getCell('B49').value = '地震';
  worksheet.getCell('C48').value = 'X向';
  worksheet.getCell('C49').value = 'X向';
  worksheet.getCell('E48').value = 'Y向';
  worksheet.getCell('E49').value = 'Y向';

  worksheet.mergeCells('A50:A51');
  worksheet.getCell('A50').value = '基底弯矩';
  worksheet.getCell('B50').value = '风荷载';
  worksheet.getCell('B51').value = '地震';
  worksheet.getCell('C50').value = 'X向';
  worksheet.getCell('C51').value = 'X向';
  worksheet.getCell('E50').value = 'Y向';
  worksheet.getCell('E51').value = 'Y向';
}

export async function writeSummary(
  summary: ISummaryFE,
  worksheet: Excel.Worksheet,
) {
  // write project information
  worksheet.getCell('D2').value = summary.project.dir;
  worksheet.getCell('D3').value = summary.project.engineering;
  worksheet.getCell('D4').value = summary.project.software;
  worksheet.getCell('F3').value = summary.project.calDate;
  worksheet.getCell('F4').value = summary.project.softwareVersion;

  // write structure information
  worksheet.getCell('D5').value = summary.structures.system;
  worksheet.getCell('D6').value = summary.structures.storeys;
  worksheet.getCell('D7').value = summary.structures.basement;
  worksheet.getCell('D8').value = summary.structures.intensity;
  worksheet.getCell('D9').value = summary.structures.rigidFloorAssumption;
  worksheet.getCell('F5').value = summary.structures.material;
  worksheet.getCell('F6').value = summary.structures.height;
  worksheet.getCell('F7').value = summary.structures.constraintFloor;
  worksheet.getCell('F8').value = summary.structures.pressureModified;
  worksheet.getCell('F9').value = summary.structures.periodReductionFactor;

  // write mass information
  worksheet.getCell('D10').value = {
    formula: `round(${summary.weight.live},0)`,
    date1904: false,
  };
  worksheet.getCell('D11').value = {
    formula: `round(${summary.weight.dead},0)`,
    date1904: false,
  };
  worksheet.getCell('F10').value = {
    formula: `round(${summary.weight.super},0)`,
    date1904: false,
  };
  worksheet.getCell('F11').value = {
    formula: `round(${summary.weight.sum},0)`,
    date1904: false,
  };

  // write drift information
  worksheet.getCell('D12').value = summary.drift.windX[0];
  worksheet.getCell('F12').value = summary.drift.windX[1];
  worksheet.getCell('D13').value = summary.drift.windY[0];
  worksheet.getCell('F13').value = summary.drift.windY[1];
  worksheet.getCell('D14').value = summary.drift.seismicX[0];
  worksheet.getCell('F14').value = summary.drift.seismicX[1];
  worksheet.getCell('D15').value = summary.drift.seismicY[0];
  worksheet.getCell('F15').value = summary.drift.seismicY[1];
  worksheet.getCell('D16').value = summary.drift.limit;

  // write displacement ratio information
  worksheet.getCell('D17').value = summary.dispRatio.eccPX[0];
  worksheet.getCell('F17').value = summary.dispRatio.eccPX[1];
  worksheet.getCell('D18').value = summary.dispRatio.eccPY[0];
  worksheet.getCell('F18').value = summary.dispRatio.eccPY[1];
  worksheet.getCell('D19').value = summary.dispRatio.eccNX[0];
  worksheet.getCell('F19').value = summary.dispRatio.eccNX[1];
  worksheet.getCell('D20').value = summary.dispRatio.eccNY[0];
  worksheet.getCell('F20').value = summary.dispRatio.eccNY[1];
  worksheet.getCell('D21').value = summary.dispRatio.limit;

  // write storey displacement ratio information
  worksheet.getCell('D22').value = summary.dispRatioStorey.eccPX[0];
  worksheet.getCell('F22').value = summary.dispRatioStorey.eccPX[1];
  worksheet.getCell('D23').value = summary.dispRatioStorey.eccPY[0];
  worksheet.getCell('F23').value = summary.dispRatioStorey.eccPY[1];
  worksheet.getCell('D24').value = summary.dispRatioStorey.eccNX[0];
  worksheet.getCell('F24').value = summary.dispRatioStorey.eccNX[1];
  worksheet.getCell('D25').value = summary.dispRatioStorey.eccNY[0];
  worksheet.getCell('F25').value = summary.dispRatioStorey.eccNY[1];
  worksheet.getCell('D26').value = summary.dispRatioStorey.limit;

  // write shear weight ratio information
  worksheet.getCell('D27').value = summary.shearWeightRatio.x;
  worksheet.getCell('F27').value = summary.shearWeightRatio.xLimit;
  worksheet.getCell('D28').value = summary.shearWeightRatio.y;
  worksheet.getCell('F28').value = summary.shearWeightRatio.yLimit;

  // write stiffness weight ratio information
  worksheet.getCell('D29').value = summary.stiffWeightRatio.windX;
  worksheet.getCell('D30').value = summary.stiffWeightRatio.windY;
  worksheet.getCell('D31').value = summary.stiffWeightRatio.seismicX;
  worksheet.getCell('D32').value = summary.stiffWeightRatio.seismicY;
  worksheet.getCell('F29').value = summary.stiffWeightRatio.windXCheck;
  worksheet.getCell('F30').value = summary.stiffWeightRatio.windYCheck;
  worksheet.getCell('F31').value = summary.stiffWeightRatio.seismicXCheck;
  worksheet.getCell('F32').value = summary.stiffWeightRatio.seismicYCheck;

  // write stiffness ratio information
  worksheet.getCell('D33').value = summary.stiffRatio.x[0];
  worksheet.getCell('F33').value = summary.stiffRatio.x[1];
  worksheet.getCell('D34').value = summary.stiffRatio.y[0];
  worksheet.getCell('F34').value = summary.stiffRatio.y[1];

  // write shear capacity ratio
  worksheet.getCell('D35').value = summary.shearCapacityRatio.x[0];
  worksheet.getCell('F35').value = summary.shearCapacityRatio.x[1];
  worksheet.getCell('D36').value = summary.shearCapacityRatio.y[0];
  worksheet.getCell('F36').value = summary.shearCapacityRatio.y[1];

  // write mode informatio
  for (let i: number = 0; i < 6; i++) {
    worksheet.getCell(`C${39 + i}`).value =
      Math.round(summary.mode.period[i] * 100) / 100;
    worksheet.getCell(`D${39 + i}`).value =
      Math.round(summary.mode.factorX[i] * 100) / 100;
    worksheet.getCell(`E${39 + i}`).value =
      Math.round(summary.mode.factorY[i] * 100) / 100;
    worksheet.getCell(`F${39 + i}`).value =
      Math.round(summary.mode.factorZ[i] * 100) / 100;
  }
  worksheet.getCell('C45').value =
    Math.round(summary.mode.periodRatio * 100) / 100;
  worksheet.getCell('D45').value = summary.mode.periodRatioCheck;

  worksheet.getCell('F45').value = summary.mode.count;

  worksheet.getCell('D46').value = Math.round(summary.mode.sumX);
  worksheet.getCell('F46').value = Math.round(summary.mode.sumY);

  // write base shear
  worksheet.getCell('D48').value = Math.round(summary.baseShear.windX);
  worksheet.getCell('F48').value = Math.round(summary.baseShear.windY);
  worksheet.getCell('D49').value = Math.round(summary.baseShear.seismicX);
  worksheet.getCell('F49').value = Math.round(summary.baseShear.seismicY);

  // write base moment
  worksheet.getCell('D50').value = Math.round(summary.baseMoment.windX);
  worksheet.getCell('F50').value = Math.round(summary.baseMoment.windY);
  worksheet.getCell('D51').value = Math.round(summary.baseMoment.seismicX);
  worksheet.getCell('F51').value = Math.round(summary.baseMoment.seismicY);
}

export async function formatSummary(worksheet: Excel.Worksheet) {
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

  worksheet.getColumn(2).width = 10;
  worksheet.getRow(1).height = 25;
  worksheet.getRow(1).font = { name: 'Arial', size: 14, bold: true };

  rangeSetBorder(worksheet, 1, 1, 51, 6, 'thin', 'thin', 'thin', 'thin');
  rangeSetBorder(worksheet, 1, 1, 51, 1, 'thin', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 51, 1, 51, 6, 'thin', 'thin', 'medium', 'thin');
  rangeSetBorder(worksheet, 1, 6, 51, 6, 'thin', 'thin', 'thin', 'medium');
  rangeSetBorder(worksheet, 51, 1, 51, 1, 'thin', 'medium', 'medium', 'thin');
  rangeSetBorder(worksheet, 51, 6, 51, 6, 'thin', 'thin', 'medium', 'medium');
  rangeSetBorder(worksheet, 1, 1, 1, 1, 'medium', 'medium', 'medium', 'medium');
  rangeSetBorder(
    worksheet,
    37,
    1,
    37,
    1,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    47,
    1,
    47,
    1,
    'medium',
    'medium',
    'medium',
    'medium',
  );

  rangeFillColor(worksheet, 2, 1, 36, 3, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 3, 5, 15, 5, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 17, 5, 20, 5, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 22, 5, 25, 5, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 27, 5, 36, 5, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 38, 1, 38, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 38, 2, 38, 6, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 39, 2, 45, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 46, 1, 46, 3, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 45, 5, 46, 5, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 48, 1, 51, 3, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 48, 5, 51, 5, 'solid', '00F0FFF0', '00FFFFFF');
}
