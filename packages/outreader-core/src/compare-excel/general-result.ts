import { IGeneralResultFE, IStructureFrontEnd } from '../interfaces';
import { rangeSetBorder, rangeFillColor } from '../excel/commom';
import Excel from 'exceljs';

export async function initGeneralResult(
  worksheet: Excel.Worksheet,
  nums: number,
) {
  worksheet.mergeCells('A1:B1');
  worksheet.getCell('A1').value = '模型';

  worksheet.mergeCells(2, 1, 2, 2 + nums);

  worksheet.mergeCells('A3:A9');
  worksheet.getCell('A3').value = '工程信息';
  worksheet.getCell('B3').value = '工程名称';
  worksheet.getCell('B4').value = '工程代号';
  worksheet.getCell('B5').value = '设计人';
  worksheet.getCell('B6').value = '校核人';
  worksheet.getCell('B7').value = '软件名称';
  worksheet.getCell('B8').value = '版本';
  worksheet.getCell('B9').value = '计算日期';

  worksheet.mergeCells(10, 1, 10, 2 + nums);

  worksheet.mergeCells('A11:A14');
  worksheet.getCell('A11').value = '质量信息\n（t）';
  worksheet.getCell('B11').value = '活载总质量';
  worksheet.getCell('B12').value = '恒载总质量';
  worksheet.getCell('B13').value = '附加总质量';
  worksheet.getCell('B14').value = '结构总质量';

  worksheet.mergeCells(15, 1, 15, 2 + nums);

  worksheet.mergeCells('A16:A17');
  worksheet.getCell('A16').value = '地下室楼层\n侧向刚度比\n（剪切刚度）';
  worksheet.getCell('B16').value = 'X向刚度比';
  worksheet.getCell('B17').value = 'Y向刚度比';

  worksheet.mergeCells(18, 1, 18, 2 + nums);

  worksheet.mergeCells('A19:A26');
  worksheet.getCell('A19').value = '结构整体\n抗倾覆';
  worksheet.getCell('B19').value = 'X向风\nMr/Mov';
  worksheet.getCell('B20').value = 'Y向风\nMr/Mov';
  worksheet.getCell('B21').value = 'X地震\nMr/Mov';
  worksheet.getCell('B22').value = 'Y地震\nMr/Mov';
  worksheet.getCell('B23').value = 'X向风\n零应力区（%）';
  worksheet.getCell('B24').value = 'Y向风\n零应力区（%）';
  worksheet.getCell('B25').value = 'X地震\n零应力区（%）';
  worksheet.getCell('B26').value = 'Y地震\n零应力区（%）';

  worksheet.mergeCells(27, 1, 27, 2 + nums);

  worksheet.mergeCells('A28:A31');
  worksheet.getCell('A28').value = '结构整体稳定\n（刚重比）';
  worksheet.getCell('B28').value = 'X向风';
  worksheet.getCell('B29').value = 'Y向风';
  worksheet.getCell('B30').value = 'X地震';
  worksheet.getCell('B31').value = 'Y地震';

  worksheet.mergeCells(32, 1, 32, 2 + nums);

  worksheet.mergeCells('A33:A36');
  worksheet.getCell('A33').value = '风振舒适度\n（顶点加速度）';
  worksheet.getCell('B33').value = '顺风X向';
  worksheet.getCell('B34').value = '顺风Y向';
  worksheet.getCell('B35').value = '横风X向';
  worksheet.getCell('B36').value = '横风Y向';
}

export async function writeGeneralResult(
  structures: IStructureFrontEnd[],
  worksheet: Excel.Worksheet,
) {
  const n = structures.length;

  for (let i = 0; i < n; i++) {
    const general: IGeneralResultFE = structures[i].generalResult;

    // write title
    worksheet.getCell(1, 3 + i).value = `模型${i + 1}`;

    // write base information
    worksheet.getCell(3, 3 + i).value = general.project.engineering;
    worksheet.getCell(4, 3 + i).value = general.project.engineeringCode;
    worksheet.getCell(5, 3 + i).value = general.project.designer;
    worksheet.getCell(6, 3 + i).value = general.project.checker;
    worksheet.getCell(7, 3 + i).value = general.project.software;
    worksheet.getCell(8, 3 + i).value = general.project.softwareVersion;
    worksheet.getCell(9, 3 + i).value = general.project.calDate;

    // write weight information
    worksheet.getCell(11, 3 + i).value = general.weight.live;
    worksheet.getCell(12, 3 + i).value = general.weight.dead;
    worksheet.getCell(13, 3 + i).value = general.weight.super;
    worksheet.getCell(14, 3 + i).value = general.weight.sum;

    // write constraint floor stiffness
    worksheet.getCell(16, 3 + i).value =
      general.constraintFloorStiffnessRatio.ratioX;
    worksheet.getCell(17, 3 + i).value =
      general.constraintFloorStiffnessRatio.ratioY;

    // write overturning
    worksheet.getCell(19, 3 + i).value = general.overturningCheck.ratioWindX;
    worksheet.getCell(20, 3 + i).value = general.overturningCheck.ratioWindY;
    worksheet.getCell(21, 3 + i).value = general.overturningCheck.ratioSeismicX;
    worksheet.getCell(22, 3 + i).value = general.overturningCheck.ratioSeismicY;
    worksheet.getCell(23, 3 + i).value = general.overturningCheck.zeroAreaWindX;
    worksheet.getCell(24, 3 + i).value = general.overturningCheck.zeroAreaWindY;
    worksheet.getCell(25, 3 + i).value =
      general.overturningCheck.zeroAreaSeismicX;
    worksheet.getCell(26, 3 + i).value =
      general.overturningCheck.zeroAreaSeismicY;

    // write stable check
    worksheet.getCell(28, 3 + i).value = general.stableCheck.windRatioX;
    worksheet.getCell(29, 3 + i).value = general.stableCheck.windRatioY;
    worksheet.getCell(30, 3 + i).value = general.stableCheck.seismicRatioX;
    worksheet.getCell(31, 3 + i).value = general.stableCheck.seismicRatioY;

    // write wind comfort
    worksheet.getCell(33, 3 + i).value = general.windComfort.accelerationAlongX;
    worksheet.getCell(34, 3 + i).value = general.windComfort.accelerationAlongY;
    worksheet.getCell(35, 3 + i).value = general.windComfort.accelerationCrossX;
    worksheet.getCell(36, 3 + i).value = general.windComfort.accelerationCrossY;
  }
}

export async function formatGeneralResult(
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

  rangeSetBorder(worksheet, 1, 1, 36, 2 + nums, 'thin', 'thin', 'thin', 'thin');
  rangeSetBorder(worksheet, 1, 1, 1, 1, 'medium', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 2, 1, 35, 1, 'thin', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 36, 1, 36, 1, 'thin', 'medium', 'medium', 'thin');
  rangeSetBorder(
    worksheet,
    36,
    2,
    36,
    1 + nums,
    'thin',
    'thin',
    'medium',
    'thin',
  );
  rangeSetBorder(
    worksheet,
    36,
    2 + nums,
    36,
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
    35,
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
    15,
    1,
    15,
    2 + nums,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    18,
    1,
    18,
    2 + nums,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    27,
    1,
    27,
    2 + nums,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    32,
    1,
    32,
    2 + nums,
    'medium',
    'medium',
    'medium',
    'medium',
  );

  rangeFillColor(worksheet, 1, 1, 1, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 3, 1, 9, 2, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 11, 1, 14, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 16, 1, 17, 2, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 19, 1, 26, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 28, 1, 31, 2, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 33, 1, 36, 2, 'solid', '00F0FFF0', '00FFFFFF');

  worksheet.views = [{ state: 'frozen', xSplit: 2, ySplit: 3 }];
}
