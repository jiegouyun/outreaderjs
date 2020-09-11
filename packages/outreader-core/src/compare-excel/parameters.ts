import { IParametersFE, IStructureFrontEnd } from '../interfaces';
import { rangeSetBorder, rangeFillColor } from '../excel/commom';
import Excel from 'exceljs';

export async function initParameters(worksheet: Excel.Worksheet, nums: number) {
  worksheet.mergeCells('A1:B1');
  worksheet.getCell('A1').value = '模型';

  worksheet.mergeCells(2, 1, 2, 2 + nums);

  worksheet.mergeCells('A3:A10');
  worksheet.getCell('A3').value = '结构总体信息';
  worksheet.getCell('B3').value = '结构体系';
  worksheet.getCell('B4').value = '结构材料信息';
  worksheet.getCell('B5').value = '结构所在地区';
  worksheet.getCell('B6').value = '地下室层数';
  worksheet.getCell('B7').value = '嵌固端所在层号';
  worksheet.getCell('B7').note = 'YJK：层顶嵌固\nPKPM：层底嵌固';
  worksheet.getCell('B8').value = '裙房层数';
  worksheet.getCell('B9').value = '转换层所在层号';
  worksheet.getCell('B10').value = '加强层所在层号';

  worksheet.mergeCells(11, 1, 11, 2 + nums);

  worksheet.mergeCells('A12:A14');
  worksheet.getCell('A12').value = '计算控制信息';
  worksheet.getCell('B12').value = '连梁刚度折减系数（地震）';
  worksheet.getCell('B13').value = '连梁刚度折减系数（风）';
  worksheet.getCell('B14').value = '刚性楼板假定';

  worksheet.mergeCells(15, 1, 15, 2 + nums);

  worksheet.mergeCells('A16:A22');
  worksheet.getCell('A16').value = '风荷载信息';
  worksheet.getCell('B16').value = '使用指定风荷载数据';
  worksheet.getCell('B17').value = '执行规范';
  worksheet.getCell('B18').value = '地面粗糙度';
  worksheet.getCell('B19').value = '修正后基本风压 (kN/m^2)';
  worksheet.getCell('B20').value = '风荷载计算阻尼比';
  worksheet.getCell('B21').value = '舒适度验算基本风压 (kN/m^2)';
  worksheet.getCell('B22').value = '舒适度验算阻尼比';

  worksheet.mergeCells(23, 1, 23, 2 + nums);

  worksheet.mergeCells('A24:A36');
  worksheet.getCell('A24').value = '地震信息';
  worksheet.getCell('B24').value = '按地震动区划图GB18306-2015计算';
  worksheet.getCell('B25').value = '设计地震分组';
  worksheet.getCell('B26').value = '地震烈度';
  worksheet.getCell('B27').value = '场地类别';
  worksheet.getCell('B28').value = '特征周期';
  worksheet.getCell('B29').value = '阻尼比';
  worksheet.getCell('B30').value = '周期折减系数';
  worksheet.getCell('B31').value = 'X向偶然偏心';
  worksheet.getCell('B32').value = 'Y向偶然偏心';
  worksheet.getCell('B33').value = '地震影响系数最大值';
  worksheet.getCell('B34').value = '罕遇地震影响系数最大值';
  worksheet.getCell('B35').value = '最大附加阻尼比';
  worksheet.getCell('B36').value = '调整后水平向减震系数 ';
}

export async function writeParameters(
  structures: IStructureFrontEnd[],
  worksheet: Excel.Worksheet,
) {
  const n = structures.length;

  for (let i = 0; i < n; i++) {
    const parameters: IParametersFE = structures[i].parameters;

    // write title
    worksheet.getCell(1, 3 + i).value = `模型${i + 1}`;

    // write general information
    worksheet.getCell(3, 3 + i).value = parameters.general.system;
    worksheet.getCell(4, 3 + i).value = parameters.general.material;
    worksheet.getCell(5, 3 + i).value = parameters.general.location;
    worksheet.getCell(6, 3 + i).value = parameters.general.basement;
    worksheet.getCell(7, 3 + i).value = parameters.general.constraintFloor;
    worksheet.getCell(8, 3 + i).value = parameters.general.podium;
    worksheet.getCell(9, 3 + i).value = parameters.general.transferStorey;
    worksheet.getCell(10, 3 + i).value = parameters.general.reinforceStorey;

    // write calculation information
    worksheet.getCell(12, 3 + i).value =
      parameters.calculate.couplingBeamFactorSeismic;
    worksheet.getCell(13, 3 + i).value =
      parameters.calculate.couplingBeamFactorWind;
    worksheet.getCell(14, 3 + i).value =
      parameters.calculate.rigidFloorAssumption;

    // write wind information
    worksheet.getCell(16, 3 + i).value = parameters.wind.assigned;
    worksheet.getCell(17, 3 + i).value = parameters.wind.loadCode;
    worksheet.getCell(18, 3 + i).value = parameters.wind.terrainRoughness;
    worksheet.getCell(19, 3 + i).value = parameters.wind.pressureModified;
    worksheet.getCell(20, 3 + i).value = parameters.wind.dampingRatio;
    worksheet.getCell(21, 3 + i).value = parameters.wind.pressureComfort;
    worksheet.getCell(22, 3 + i).value = parameters.wind.dampingRationComfort;

    // write seismic information
    worksheet.getCell(24, 3 + i).value = parameters.seismic.use2015GB18306;
    worksheet.getCell(25, 3 + i).value = parameters.seismic.group;
    worksheet.getCell(26, 3 + i).value = parameters.seismic.intensity;
    worksheet.getCell(27, 3 + i).value = parameters.seismic.siteCategory;
    worksheet.getCell(28, 3 + i).value =
      parameters.seismic.characteristicPeriod;
    worksheet.getCell(29, 3 + i).value = parameters.seismic.dampingRatio;
    worksheet.getCell(30, 3 + i).value =
      parameters.seismic.periodReductionFactor;
    worksheet.getCell(31, 3 + i).value = parameters.seismic.eccentricityX;
    worksheet.getCell(32, 3 + i).value = parameters.seismic.eccentricityY;
    worksheet.getCell(33, 3 + i).value = parameters.seismic.maxSpectrumValue;
    worksheet.getCell(34, 3 + i).value = parameters.seismic.maxSpectrumValueL3;
    worksheet.getCell(35, 3 + i).value =
      parameters.seismic.additionalDampingRatio;
    worksheet.getCell(36, 3 + i).value =
      parameters.seismic.modifiedSeismicReductionFactor;
  }
}

export async function formatParameters(
  worksheet: Excel.Worksheet,
  nums: number,
) {
  for (let col = 1; col <= worksheet.columnCount; col++) {
    worksheet.getColumn(col).width = 20;
    worksheet.getColumn(col).alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    worksheet.getColumn(col).font = { name: 'Arial', size: 10 };
  }

  for (let row = 1; row <= worksheet.rowCount; row++) {
    worksheet.getRow(row).height = 20;
  }

  rangeSetBorder(worksheet, 2, 2, 35, 1 + nums, 'thin', 'thin', 'thin', 'thin');
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
    11,
    1,
    11,
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
    23,
    1,
    23,
    2 + nums,
    'medium',
    'medium',
    'medium',
    'medium',
  );

  rangeFillColor(worksheet, 1, 1, 1, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 3, 1, 10, 2, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 12, 1, 14, 2, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 16, 1, 22, 2, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 24, 1, 36, 2, 'solid', '00F0FFF0', '00FFFFFF');

  worksheet.views = [{ state: 'frozen', xSplit: 2, ySplit: 1 }];
}
