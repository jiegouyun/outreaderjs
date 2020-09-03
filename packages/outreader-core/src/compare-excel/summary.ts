import { ISummaryFE, IStructureFrontEnd } from '../interfaces';
import { rangeSetBorder, rangeFillColor } from '../excel/commom';
import Excel from 'exceljs';

export async function initSummary(worksheet: Excel.Worksheet, nums: number) {
  worksheet.mergeCells('A1:C1');
  worksheet.getCell('A1').value = '模型';

  worksheet.mergeCells(2, 1, 2, 3 + nums);

  worksheet.mergeCells('A3:B7');
  worksheet.getCell('A3').value = '工程信息';
  worksheet.getCell('C3').value = '工程路径';
  worksheet.getCell('C4').value = '工程名称';
  worksheet.getCell('C5').value = '计算日期';
  worksheet.getCell('C6').value = '软件名称';
  worksheet.getCell('C7').value = '版本';

  worksheet.mergeCells('A8:B17');
  worksheet.getCell('A8').value = '结构信息';
  worksheet.getCell('C8').value = '结构体系';
  worksheet.getCell('C9').value = '结构材料';
  worksheet.getCell('C10').value = '结构高度';
  worksheet.getCell('C11').value = '楼层数';
  worksheet.getCell('C12').value = '地下室层数';
  worksheet.getCell('C13').value = '嵌固层';
  worksheet.getCell('C14').value = '地震烈度';
  worksheet.getCell('C15').value = '基本风压';
  worksheet.getCell('C16').value = '楼板假定';
  worksheet.getCell('C17').value = '周期折减系数';

  worksheet.mergeCells('A18:B21');
  worksheet.getCell('A18').value = '质量';
  worksheet.getCell('C18').value = '活载质量';
  worksheet.getCell('C19').value = '恒载质量';
  worksheet.getCell('C20').value = '附加质量';
  worksheet.getCell('C21').value = '总质量';

  worksheet.mergeCells(22, 1, 22, 3 + nums);

  worksheet.mergeCells('A23:A31');
  worksheet.getCell('A23').value = '层间位移角';
  worksheet.mergeCells('B23:B26');
  worksheet.getCell('B23').value = '风荷载';
  worksheet.getCell('C23').value = 'X向';
  worksheet.getCell('C24').value = '楼层';
  worksheet.getCell('C25').value = 'Y向';
  worksheet.getCell('C26').value = '楼层';
  worksheet.mergeCells('B27:B30');
  worksheet.getCell('B27').value = '地震';
  worksheet.getCell('C27').value = 'X向';
  worksheet.getCell('C28').value = '楼层';
  worksheet.getCell('C29').value = 'Y向';
  worksheet.getCell('C30').value = '楼层';
  worksheet.mergeCells('B31:C31');
  worksheet.getCell('B31').value = '限值';

  worksheet.mergeCells('A32:A40');
  worksheet.getCell('A32').value = '位移比';
  worksheet.mergeCells('B32:B35');
  worksheet.getCell('B32').value = '+偏心';
  worksheet.getCell('C32').value = 'X向';
  worksheet.getCell('C33').value = '楼层';
  worksheet.getCell('C34').value = 'Y向';
  worksheet.getCell('C35').value = '楼层';
  worksheet.mergeCells('B36:B39');
  worksheet.getCell('B36').value = '-偏心';
  worksheet.getCell('C36').value = 'X向';
  worksheet.getCell('C37').value = '楼层';
  worksheet.getCell('C38').value = 'Y向';
  worksheet.getCell('C39').value = '楼层';
  worksheet.mergeCells('B40:C40');
  worksheet.getCell('B40').value = '限值';

  worksheet.mergeCells('A41:A49');
  worksheet.getCell('A41').value = '层间位移比';
  worksheet.mergeCells('B41:B44');
  worksheet.getCell('B41').value = '+偏心';
  worksheet.getCell('C41').value = 'X向';
  worksheet.getCell('C42').value = '楼层';
  worksheet.getCell('C43').value = 'Y向';
  worksheet.getCell('C44').value = '楼层';
  worksheet.mergeCells('B45:B48');
  worksheet.getCell('B45').value = '-偏心';
  worksheet.getCell('C45').value = 'X向';
  worksheet.getCell('C46').value = '楼层';
  worksheet.getCell('C47').value = 'Y向';
  worksheet.getCell('C48').value = '楼层';
  worksheet.mergeCells('B49:C49');
  worksheet.getCell('B49').value = '限值';

  worksheet.mergeCells('A50:B53');
  worksheet.getCell('A50').value = '剪重比';
  worksheet.getCell('C50').value = 'X向';
  worksheet.getCell('C51').value = '限值';
  worksheet.getCell('C52').value = 'Y向';
  worksheet.getCell('C53').value = '限值';

  worksheet.mergeCells('A54:A61');
  worksheet.getCell('A54').value = '刚重比';
  worksheet.mergeCells('B54:B57');
  worksheet.getCell('B54').value = '风荷载';
  worksheet.getCell('C54').value = 'X向';
  worksheet.getCell('C55').value = '判断';
  worksheet.getCell('C56').value = 'Y向';
  worksheet.getCell('C57').value = '判断';
  worksheet.mergeCells('B58:B61');
  worksheet.getCell('B58').value = '地震';
  worksheet.getCell('C58').value = 'X向';
  worksheet.getCell('C59').value = '判断';
  worksheet.getCell('C60').value = 'Y向';
  worksheet.getCell('C61').value = '判断';

  worksheet.mergeCells('A62:B65');
  worksheet.getCell('A62').value = '刚度比';
  worksheet.getCell('C62').value = 'X向';
  worksheet.getCell('C63').value = '楼层';
  worksheet.getCell('C64').value = 'Y向';
  worksheet.getCell('C65').value = '楼层';

  worksheet.mergeCells('A66:B69');
  worksheet.getCell('A66').value = '受剪承载力比';
  worksheet.getCell('C66').value = 'X向';
  worksheet.getCell('C67').value = '楼层';
  worksheet.getCell('C68').value = 'Y向';
  worksheet.getCell('C69').value = '楼层';

  worksheet.mergeCells(70, 1, 70, 3 + nums);

  worksheet.mergeCells('A71:A80');
  worksheet.getCell('A71').value = '动力特性';
  worksheet.mergeCells('B71:B73');
  worksheet.getCell('B71').value = '周期';
  worksheet.getCell('C71').value = 1;
  worksheet.getCell('C72').value = 2;
  worksheet.getCell('C73').value = 3;
  worksheet.mergeCells('B74:B76');
  worksheet.getCell('B74').value = '转角';
  worksheet.getCell('C74').value = 1;
  worksheet.getCell('C75').value = 2;
  worksheet.getCell('C76').value = 3;
  worksheet.mergeCells('B77:B79');
  worksheet.getCell('B77').value = '振型质量参与系数';
  worksheet.getCell('C77').value = 'X向';
  worksheet.getCell('C78').value = 'Y向';
  worksheet.getCell('C79').value = 'Z向';
  worksheet.mergeCells('B80:C80');
  worksheet.getCell('B80').value = '计算振型数';

  worksheet.mergeCells(81, 1, 81, 3 + nums);

  worksheet.mergeCells('A82:A85');
  worksheet.getCell('A82').value = '基底剪力';
  worksheet.mergeCells('B82:B83');
  worksheet.getCell('B82').value = '风荷载';
  worksheet.getCell('C82').value = 'X向';
  worksheet.getCell('C83').value = 'Y向';
  worksheet.mergeCells('B84:B85');
  worksheet.getCell('B84').value = '地震';
  worksheet.getCell('C84').value = 'X向';
  worksheet.getCell('C85').value = 'Y向';

  worksheet.mergeCells('A86:A89');
  worksheet.getCell('A86').value = '基底弯矩';
  worksheet.mergeCells('B86:B87');
  worksheet.getCell('B86').value = '风荷载';
  worksheet.getCell('C86').value = 'X向';
  worksheet.getCell('C87').value = 'Y向';
  worksheet.mergeCells('B88:B89');
  worksheet.getCell('B88').value = '地震';
  worksheet.getCell('C88').value = 'X向';
  worksheet.getCell('C89').value = 'Y向';
}

export async function writeSummary(
  structures: IStructureFrontEnd[],
  worksheet: Excel.Worksheet,
) {
  const n = structures.length;

  for (let i = 0; i < n; i++) {
    const summary: ISummaryFE = structures[i].summary;

    // write title
    worksheet.getCell(1, 4 + i).value = `模型${i + 1}`;

    // write project information
    worksheet.getCell(3, 4 + i).value = summary.project.dir;
    worksheet.getCell(4, 4 + i).value = summary.project.engineering;
    worksheet.getCell(5, 4 + i).value = summary.project.calDate;
    worksheet.getCell(6, 4 + i).value = summary.project.software;
    worksheet.getCell(7, 4 + i).value = summary.project.softwareVersion;

    // write structure information
    worksheet.getCell(8, 4 + i).value = summary.structures.system;
    worksheet.getCell(9, 4 + i).value = summary.structures.material;
    worksheet.getCell(10, 4 + i).value = summary.structures.height;
    worksheet.getCell(11, 4 + i).value = summary.structures.storeys;
    worksheet.getCell(12, 4 + i).value = summary.structures.basement;
    worksheet.getCell(13, 4 + i).value = summary.structures.constraintFloor;
    worksheet.getCell(14, 4 + i).value = summary.structures.intensity;
    worksheet.getCell(15, 4 + i).value = summary.structures.pressureModified;
    worksheet.getCell(16, 4 + i).value =
      summary.structures.rigidFloorAssumption;
    worksheet.getCell(17, 4 + i).value =
      summary.structures.periodReductionFactor;

    // write mass information
    worksheet.getCell(18, 4 + i).value = Math.round(summary.weight.live);
    worksheet.getCell(19, 4 + i).value = Math.round(summary.weight.dead);
    worksheet.getCell(20, 4 + i).value = Math.round(summary.weight.super);
    worksheet.getCell(21, 4 + i).value = Math.round(summary.weight.sum);

    // write drift information
    worksheet.getCell(23, 4 + i).value = summary.drift.windX[0];
    worksheet.getCell(24, 4 + i).value = summary.drift.windX[1];
    worksheet.getCell(25, 4 + i).value = summary.drift.windY[0];
    worksheet.getCell(26, 4 + i).value = summary.drift.windY[1];
    worksheet.getCell(27, 4 + i).value = summary.drift.seismicX[0];
    worksheet.getCell(28, 4 + i).value = summary.drift.seismicX[1];
    worksheet.getCell(29, 4 + i).value = summary.drift.seismicY[0];
    worksheet.getCell(30, 4 + i).value = summary.drift.seismicY[1];
    worksheet.getCell(31, 4 + i).value = summary.drift.limit;

    // write displacement ratio information
    worksheet.getCell(32, 4 + i).value = summary.dispRatio.eccPX[0];
    worksheet.getCell(33, 4 + i).value = summary.dispRatio.eccPX[1];
    worksheet.getCell(34, 4 + i).value = summary.dispRatio.eccPY[0];
    worksheet.getCell(35, 4 + i).value = summary.dispRatio.eccPY[1];
    worksheet.getCell(36, 4 + i).value = summary.dispRatio.eccNX[0];
    worksheet.getCell(37, 4 + i).value = summary.dispRatio.eccNX[1];
    worksheet.getCell(38, 4 + i).value = summary.dispRatio.eccNY[0];
    worksheet.getCell(39, 4 + i).value = summary.dispRatio.eccNY[1];
    worksheet.getCell(40, 4 + i).value = summary.dispRatio.limit;

    // write storey displacement ratio information
    worksheet.getCell(41, 4 + i).value = summary.dispRatioStorey.eccPX[0];
    worksheet.getCell(42, 4 + i).value = summary.dispRatioStorey.eccPX[1];
    worksheet.getCell(43, 4 + i).value = summary.dispRatioStorey.eccPY[0];
    worksheet.getCell(44, 4 + i).value = summary.dispRatioStorey.eccPY[1];
    worksheet.getCell(45, 4 + i).value = summary.dispRatioStorey.eccNX[0];
    worksheet.getCell(46, 4 + i).value = summary.dispRatioStorey.eccNX[1];
    worksheet.getCell(47, 4 + i).value = summary.dispRatioStorey.eccNY[0];
    worksheet.getCell(48, 4 + i).value = summary.dispRatioStorey.eccNY[1];
    worksheet.getCell(49, 4 + i).value = summary.dispRatioStorey.limit;

    // write shear weight ratio information
    worksheet.getCell(50, 4 + i).value = summary.shearWeightRatio.x;
    worksheet.getCell(51, 4 + i).value = summary.shearWeightRatio.xLimit;
    worksheet.getCell(52, 4 + i).value = summary.shearWeightRatio.y;
    worksheet.getCell(53, 4 + i).value = summary.shearWeightRatio.yLimit;

    // write stiffness weight ratio information
    worksheet.getCell(54, 4 + i).value = summary.stiffWeightRatio.windX;
    worksheet.getCell(55, 4 + i).value = summary.stiffWeightRatio.windXCheck;
    worksheet.getCell(56, 4 + i).value = summary.stiffWeightRatio.windY;
    worksheet.getCell(57, 4 + i).value = summary.stiffWeightRatio.windYCheck;
    worksheet.getCell(58, 4 + i).value = summary.stiffWeightRatio.seismicX;
    worksheet.getCell(59, 4 + i).value = summary.stiffWeightRatio.seismicXCheck;
    worksheet.getCell(60, 4 + i).value = summary.stiffWeightRatio.seismicY;
    worksheet.getCell(61, 4 + i).value = summary.stiffWeightRatio.seismicYCheck;

    // write stiffness ratio information
    worksheet.getCell(62, 4 + i).value = summary.stiffRatio.x[0];
    worksheet.getCell(63, 4 + i).value = summary.stiffRatio.x[1];
    worksheet.getCell(64, 4 + i).value = summary.stiffRatio.y[0];
    worksheet.getCell(65, 4 + i).value = summary.stiffRatio.y[1];

    // write shear capacity ratio
    worksheet.getCell(66, 4 + i).value = summary.shearCapacityRatio.x[0];
    worksheet.getCell(67, 4 + i).value = summary.shearCapacityRatio.x[1];
    worksheet.getCell(68, 4 + i).value = summary.shearCapacityRatio.y[0];
    worksheet.getCell(69, 4 + i).value = summary.shearCapacityRatio.y[1];

    // write mode informatio
    worksheet.getCell(71, 4 + i).value = {
      formula: `round(${summary.mode.period[0] || 0},2)`,
      date1904: false,
    };
    worksheet.getCell(72, 4 + i).value = {
      formula: `round(${summary.mode.period[1] || 0},2)`,
      date1904: false,
    };
    worksheet.getCell(73, 4 + i).value = {
      formula: `round(${summary.mode.period[2] || 0},2)`,
      date1904: false,
    };
    worksheet.getCell(74, 4 + i).value = {
      formula: `round(${summary.mode.angle[0] || 0},0)`,
      date1904: false,
    };
    worksheet.getCell(75, 4 + i).value = {
      formula: `round(${summary.mode.angle[1] || 0},0)`,
      date1904: false,
    };
    worksheet.getCell(76, 4 + i).value = {
      formula: `round(${summary.mode.angle[2] || 0},0)`,
      date1904: false,
    };
    worksheet.getCell(77, 4 + i).value = {
      formula: `round(${summary.mode.sumX},0)`,
      date1904: false,
    };
    worksheet.getCell(78, 4 + i).value = {
      formula: `round(${summary.mode.sumY},0)`,
      date1904: false,
    };
    worksheet.getCell(79, 4 + i).value = {
      formula: `round(${summary.mode.sumZ},0)`,
      date1904: false,
    };
    worksheet.getCell(80, 4 + i).value = summary.mode.count;

    // write base shear
    worksheet.getCell(82, 4 + i).value = Math.round(summary.baseShear.windX);
    worksheet.getCell(83, 4 + i).value = Math.round(summary.baseShear.windY);
    worksheet.getCell(84, 4 + i).value = Math.round(summary.baseShear.seismicX);
    worksheet.getCell(85, 4 + i).value = Math.round(summary.baseShear.seismicY);

    // write base moment
    worksheet.getCell(86, 4 + i).value = Math.round(summary.baseMoment.windX);
    worksheet.getCell(87, 4 + i).value = Math.round(summary.baseMoment.windY);
    worksheet.getCell(88, 4 + i).value = Math.round(
      summary.baseMoment.seismicX,
    );
    worksheet.getCell(89, 4 + i).value = Math.round(
      summary.baseMoment.seismicY,
    );
  }
}

export async function formatSummary(worksheet: Excel.Worksheet, nums: number) {
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
  worksheet.getRow(1).font = { name: 'Arial', size: 11, bold: true };

  rangeSetBorder(worksheet, 2, 2, 88, 2 + nums, 'thin', 'thin', 'thin', 'thin');
  rangeSetBorder(worksheet, 1, 1, 1, 1, 'medium', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 2, 1, 88, 1, 'thin', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 89, 1, 89, 1, 'thin', 'medium', 'medium', 'thin');
  rangeSetBorder(
    worksheet,
    89,
    2,
    89,
    2 + nums,
    'thin',
    'thin',
    'medium',
    'thin',
  );
  rangeSetBorder(
    worksheet,
    89,
    3 + nums,
    89,
    3 + nums,
    'thin',
    'thin',
    'medium',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    2,
    3 + nums,
    88,
    3 + nums,
    'thin',
    'thin',
    'thin',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    1,
    3 + nums,
    1,
    3 + nums,
    'medium',
    'thin',
    'thin',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    1,
    4,
    1,
    2 + nums,
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
    3 + nums,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    22,
    1,
    22,
    3 + nums,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    70,
    1,
    70,
    3 + nums,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    81,
    1,
    81,
    3 + nums,
    'medium',
    'medium',
    'medium',
    'medium',
  );

  rangeFillColor(worksheet, 1, 1, 1, 3, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 3, 1, 21, 3, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 23, 1, 69, 3, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 71, 1, 80, 3, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 82, 1, 89, 3, 'solid', '00F0FFF0', '00FFFFFF');

  worksheet.views = [{ state: 'frozen', xSplit: 3, ySplit: 1 }];
}
