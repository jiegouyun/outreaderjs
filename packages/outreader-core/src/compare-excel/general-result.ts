import { IGeneralResultFE } from '../interfaces';
import { rangeSetBorder, rangeFillColor } from '../excel/commom';
import Excel from 'exceljs';

export async function initGeneralResult(worksheet: Excel.Worksheet) {
  worksheet.mergeCells('A1:B1');
  worksheet.getCell('A1').value = '工程信息';
  worksheet.getCell('A2').value = '工程名称';
  worksheet.getCell('A3').value = '工程代号';
  worksheet.getCell('A4').value = '设计人';
  worksheet.getCell('A5').value = '校核人';
  worksheet.getCell('A6').value = '软件名称';
  worksheet.getCell('A7').value = '版本';
  worksheet.getCell('A8').value = '计算日期';

  worksheet.mergeCells('A10:B10');
  worksheet.getCell('A10').value = '塔属性';
  worksheet.getCell('A11').value = '塔号';
  worksheet.getCell('A12').value = '结构体系';

  worksheet.mergeCells('A14:B14');
  worksheet.getCell('A14').value = '质量信息（t）';
  worksheet.getCell('A15').value = '活载总质量';
  worksheet.getCell('A16').value = '恒载总质量';
  worksheet.getCell('A17').value = '附加总质量';
  worksheet.getCell('A18').value = '结构总质量';

  worksheet.mergeCells('A20:D20');
  worksheet.getCell('A20').value = '地下室楼层侧向刚度比验算（剪切刚度）';
  worksheet.getCell('A21').value = '地下室层号';
  worksheet.getCell('C21').value = '塔号';
  worksheet.getCell('A22').value = '方向/刚度';
  worksheet.getCell('B22').value = '地下一层';
  worksheet.getCell('C22').value = '地上一层';
  worksheet.getCell('D22').value = '刚度比';
  worksheet.getCell('A23').value = 'X向';
  worksheet.getCell('A24').value = 'Y向';

  worksheet.mergeCells('A26:E26');
  worksheet.getCell('A26').value = '结构整体抗倾覆验算';
  worksheet.getCell('B27').value = '层号';
  worksheet.getCell('D27').value = '塔号';
  worksheet.getCell('B28').value = '抗倾覆力矩Mr';
  worksheet.getCell('C28').value = '倾覆力矩Mov';
  worksheet.getCell('D28').value = '比值Mr/Mov';
  worksheet.getCell('E28').value = '零应力区（%）';
  worksheet.getCell('A29').value = 'X向风';
  worksheet.getCell('A30').value = 'Y向风';
  worksheet.getCell('A31').value = 'X地震';
  worksheet.getCell('A32').value = 'Y地震';

  worksheet.mergeCells('A34:E34');
  worksheet.getCell('A34').value = '结构整体稳定验算（刚重比）';
  worksheet.getCell('B35').value = '层号';
  worksheet.getCell('C35').value = '塔号';
  worksheet.getCell('D35').value = 'X向';
  worksheet.getCell('E35').value = 'Y向';
  worksheet.getCell('A36').value = '地震';
  worksheet.getCell('A37').value = '风荷载';

  worksheet.mergeCells('A39:C39');
  worksheet.getCell('A39').value = '风振舒适度验算（顶点加速度）';
  worksheet.getCell('B40').value = 'X向';
  worksheet.getCell('C40').value = 'Y向';
  worksheet.getCell('A41').value = '顺风向';
  worksheet.getCell('A42').value = '横风向';
}

export async function writeGeneralResult(
  general: IGeneralResultFE,
  worksheet: Excel.Worksheet,
) {
  // write base information
  worksheet.getCell('B2').value = general.project.engineering;
  worksheet.getCell('B3').value = general.project.engineeringCode;
  worksheet.getCell('B4').value = general.project.designer;
  worksheet.getCell('B5').value = general.project.checker;
  worksheet.getCell('B6').value = general.project.software;
  worksheet.getCell('B7').value = general.project.softwareVersion;
  worksheet.getCell('B8').value = general.project.calDate;

  // write tower information
  for (let i = 0; i < general.tower.towerID.length; i++) {
    worksheet.getCell(11, 2 + i).value = general.tower.towerID[i];
    worksheet.getCell(12, 2 + i).value = general.tower.structuralSystem[i];
  }

  // write weight information
  worksheet.getCell('B15').value = general.weight.live;
  worksheet.getCell('B16').value = general.weight.dead;
  worksheet.getCell('B17').value = general.weight.super;
  worksheet.getCell('B18').value = general.weight.sum;

  // write constraint floor stiffness
  worksheet.getCell('B21').value =
    general.constraintFloorStiffnessRatio.storeyNo;
  worksheet.getCell('D21').value =
    general.constraintFloorStiffnessRatio.towerNo;
  worksheet.getCell('B23').value =
    general.constraintFloorStiffnessRatio.stiffnessX0;
  worksheet.getCell('C23').value =
    general.constraintFloorStiffnessRatio.stiffnessX1;
  worksheet.getCell('D23').value = general.constraintFloorStiffnessRatio.ratioX;
  worksheet.getCell('B24').value =
    general.constraintFloorStiffnessRatio.stiffnessY0;
  worksheet.getCell('C24').value =
    general.constraintFloorStiffnessRatio.stiffnessY1;
  worksheet.getCell('D24').value = general.constraintFloorStiffnessRatio.ratioY;

  // write overturning
  worksheet.getCell('C27').value = general.overturningCheck.storeyNo;
  worksheet.getCell('E27').value = general.overturningCheck.towerNo;
  worksheet.getCell('B29').value = general.overturningCheck.mrWindX;
  worksheet.getCell('C29').value = general.overturningCheck.movWindX;
  worksheet.getCell('D29').value = general.overturningCheck.ratioWindX;
  worksheet.getCell('E29').value = general.overturningCheck.zeroAreaWindX;
  worksheet.getCell('B30').value = general.overturningCheck.mrWindY;
  worksheet.getCell('C30').value = general.overturningCheck.movWindY;
  worksheet.getCell('D30').value = general.overturningCheck.ratioWindY;
  worksheet.getCell('E30').value = general.overturningCheck.zeroAreaWindY;
  worksheet.getCell('B31').value = general.overturningCheck.mrSeismicX;
  worksheet.getCell('C31').value = general.overturningCheck.movSeismicX;
  worksheet.getCell('D31').value = general.overturningCheck.ratioSeismicX;
  worksheet.getCell('E31').value = general.overturningCheck.zeroAreaSeismicX;
  worksheet.getCell('B32').value = general.overturningCheck.mrSeismicY;
  worksheet.getCell('C32').value = general.overturningCheck.movSeismicY;
  worksheet.getCell('D32').value = general.overturningCheck.ratioSeismicY;
  worksheet.getCell('E32').value = general.overturningCheck.zeroAreaSeismicY;

  // write stable check
  worksheet.getCell('B36').value = general.stableCheck.seismicStoreyNo;
  worksheet.getCell('C36').value = general.stableCheck.seismicTowerNo;
  worksheet.getCell('D36').value = general.stableCheck.seismicRatioX;
  worksheet.getCell('E36').value = general.stableCheck.seismicRatioY;
  worksheet.getCell('B37').value = general.stableCheck.windStoreyNo;
  worksheet.getCell('C37').value = general.stableCheck.windTowerNo;
  worksheet.getCell('D37').value = general.stableCheck.windRatioX;
  worksheet.getCell('E37').value = general.stableCheck.windRatioY;

  // write wind comfort
  worksheet.getCell('B41').value = general.windComfort.accelerationAlongX;
  worksheet.getCell('C41').value = general.windComfort.accelerationAlongY;
  worksheet.getCell('B42').value = general.windComfort.accelerationCrossX;
  worksheet.getCell('C42').value = general.windComfort.accelerationCrossY;
}

export async function formatGeneralResult(worksheet: Excel.Worksheet) {
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

  rangeSetBorder(worksheet, 1, 1, 1, 1, 'medium', 'medium', 'medium', 'medium');
  rangeSetBorder(worksheet, 2, 1, 7, 2, 'thin', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 8, 1, 8, 1, 'thin', 'medium', 'medium', 'thin');
  rangeSetBorder(worksheet, 8, 2, 8, 2, 'thin', 'thin', 'medium', 'medium');
  rangeSetBorder(worksheet, 2, 2, 7, 2, 'thin', 'thin', 'thin', 'medium');

  rangeSetBorder(
    worksheet,
    10,
    1,
    10,
    1,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(worksheet, 11, 1, 11, 1, 'thin', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 12, 1, 12, 1, 'thin', 'medium', 'medium', 'thin');
  rangeSetBorder(worksheet, 12, 2, 12, 2, 'thin', 'thin', 'medium', 'medium');
  rangeSetBorder(worksheet, 11, 2, 11, 2, 'thin', 'thin', 'thin', 'medium');

  rangeSetBorder(
    worksheet,
    14,
    1,
    14,
    1,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(worksheet, 15, 1, 17, 1, 'thin', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 18, 1, 18, 1, 'thin', 'medium', 'medium', 'thin');
  rangeSetBorder(worksheet, 18, 2, 18, 2, 'thin', 'thin', 'medium', 'medium');
  rangeSetBorder(worksheet, 15, 2, 17, 2, 'thin', 'thin', 'thin', 'medium');

  rangeSetBorder(
    worksheet,
    20,
    1,
    20,
    1,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(worksheet, 21, 1, 23, 1, 'thin', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 24, 1, 24, 1, 'thin', 'medium', 'medium', 'thin');
  rangeSetBorder(worksheet, 24, 2, 24, 3, 'thin', 'thin', 'medium', 'thin');
  rangeSetBorder(worksheet, 24, 4, 24, 4, 'thin', 'thin', 'medium', 'medium');
  rangeSetBorder(worksheet, 21, 4, 23, 4, 'thin', 'thin', 'thin', 'medium');
  rangeSetBorder(worksheet, 21, 2, 23, 3, 'thin', 'thin', 'thin', 'thin');

  rangeSetBorder(
    worksheet,
    26,
    1,
    26,
    1,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(worksheet, 27, 1, 31, 1, 'thin', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 32, 1, 32, 1, 'thin', 'medium', 'medium', 'thin');
  rangeSetBorder(worksheet, 32, 2, 32, 4, 'thin', 'thin', 'medium', 'thin');
  rangeSetBorder(worksheet, 32, 5, 32, 5, 'thin', 'thin', 'medium', 'medium');
  rangeSetBorder(worksheet, 27, 5, 31, 5, 'thin', 'thin', 'thin', 'medium');
  rangeSetBorder(worksheet, 27, 2, 31, 4, 'thin', 'thin', 'thin', 'thin');

  rangeSetBorder(
    worksheet,
    34,
    1,
    34,
    1,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(worksheet, 35, 1, 36, 1, 'thin', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 37, 1, 37, 1, 'thin', 'medium', 'medium', 'thin');
  rangeSetBorder(worksheet, 37, 2, 37, 4, 'thin', 'thin', 'medium', 'thin');
  rangeSetBorder(worksheet, 37, 5, 37, 5, 'thin', 'thin', 'medium', 'medium');
  rangeSetBorder(worksheet, 35, 5, 36, 5, 'thin', 'thin', 'thin', 'medium');
  rangeSetBorder(worksheet, 35, 2, 36, 4, 'thin', 'thin', 'thin', 'thin');

  rangeSetBorder(
    worksheet,
    39,
    1,
    39,
    1,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(worksheet, 40, 1, 41, 1, 'thin', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 42, 1, 42, 1, 'thin', 'medium', 'medium', 'thin');
  rangeSetBorder(worksheet, 42, 2, 42, 2, 'thin', 'thin', 'medium', 'thin');
  rangeSetBorder(worksheet, 42, 3, 42, 3, 'thin', 'thin', 'medium', 'medium');
  rangeSetBorder(worksheet, 40, 3, 41, 3, 'thin', 'thin', 'thin', 'medium');
  rangeSetBorder(worksheet, 40, 2, 41, 2, 'thin', 'thin', 'thin', 'thin');

  rangeFillColor(worksheet, 1, 1, 8, 1, 'solid', '00F0FFF0', '00FFFFFF');

  rangeFillColor(worksheet, 10, 1, 12, 1, 'solid', '00F0FFFF', '00FFFFFF');

  rangeFillColor(worksheet, 14, 1, 18, 1, 'solid', '00F0FFF0', '00FFFFFF');

  rangeFillColor(worksheet, 20, 1, 24, 1, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 22, 2, 22, 4, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 21, 3, 21, 3, 'solid', '00F0FFFF', '00FFFFFF');

  rangeFillColor(worksheet, 26, 1, 32, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 28, 2, 28, 5, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 27, 2, 27, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 27, 4, 27, 4, 'solid', '00F0FFF0', '00FFFFFF');

  rangeFillColor(worksheet, 34, 1, 37, 1, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 35, 2, 35, 5, 'solid', '00F0FFFF', '00FFFFFF');

  rangeFillColor(worksheet, 39, 1, 42, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 40, 2, 40, 3, 'solid', '00F0FFF0', '00FFFFFF');
}
