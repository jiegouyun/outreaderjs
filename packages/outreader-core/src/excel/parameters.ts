import { IParametersFE } from '../interfaces';
import { rangeSetBorder, rangeFillColor } from './commom';
import Excel from 'exceljs';

export async function initParameters(worksheet: Excel.Worksheet) {
  worksheet.mergeCells('A1:B1');
  worksheet.getCell('A1').value = '结构总体信息';
  worksheet.getCell('A2').value = '结构体系';
  worksheet.getCell('A3').value = '结构材料信息';
  worksheet.getCell('A4').value = '结构所在地区';
  worksheet.getCell('A5').value = '地下室层数';
  worksheet.getCell('A6').value = '嵌固端所在层号';
  worksheet.getCell('A6').note = 'YJK：层顶嵌固\nPKPM：层底嵌固';
  worksheet.getCell('A7').value = '裙房层数';
  worksheet.getCell('A8').value = '转换层所在层号';
  worksheet.getCell('A9').value = '加强层所在层号';

  worksheet.mergeCells('A10:B10');

  worksheet.mergeCells('A11:B11');
  worksheet.getCell('A11').value = '计算控制信息';
  worksheet.getCell('A12').value = '连梁刚度折减系数（地震）';
  worksheet.getCell('A13').value = '连梁刚度折减系数（风）';
  worksheet.getCell('A14').value = '刚性楼板假定';

  worksheet.mergeCells('A15:B15');

  worksheet.mergeCells('A16:B16');
  worksheet.getCell('A16').value = '风荷载信息';
  worksheet.getCell('A17').value = '使用指定风荷载数据';
  worksheet.getCell('A18').value = '执行规范';
  worksheet.getCell('A19').value = '地面粗糙度';
  worksheet.getCell('A20').value = '修正后基本风压 (kN/m^2)';
  worksheet.getCell('A21').value = '风荷载计算阻尼比';
  worksheet.getCell('A22').value = '舒适度验算基本风压 (kN/m^2)';
  worksheet.getCell('A23').value = '舒适度验算阻尼比';

  worksheet.mergeCells('A24:B24');

  worksheet.mergeCells('A25:B25');
  worksheet.getCell('A25').value = '地震信息';
  worksheet.getCell('A26').value = '按地震动区划图GB18306-2015计算';
  worksheet.getCell('A27').value = '设计地震分组';
  worksheet.getCell('A28').value = '地震烈度';
  worksheet.getCell('A29').value = '场地类别';
  worksheet.getCell('A30').value = '特征周期';
  worksheet.getCell('A31').value = '阻尼比';
  worksheet.getCell('A32').value = '周期折减系数';
  worksheet.getCell('A33').value = 'X向偶然偏心';
  worksheet.getCell('A34').value = 'Y向偶然偏心';
  worksheet.getCell('A35').value = '地震影响系数最大值';
  worksheet.getCell('A36').value = '罕遇地震影响系数最大值';
  worksheet.getCell('A37').value = '最大附加阻尼比';
  worksheet.getCell('A38').value = '调整后水平向减震系数 ';
}

export async function writeParameters(
  parameters: IParametersFE,
  worksheet: Excel.Worksheet,
) {
  // write general information
  worksheet.getCell('B2').value = parameters.general.system;
  worksheet.getCell('B3').value = parameters.general.material;
  worksheet.getCell('B4').value = parameters.general.location;
  worksheet.getCell('B5').value = parameters.general.basement;
  worksheet.getCell('B6').value = parameters.general.constraintFloor;
  worksheet.getCell('B7').value = parameters.general.podium;
  worksheet.getCell('B8').value = parameters.general.transferStorey;
  worksheet.getCell('B9').value = parameters.general.reinforceStorey;

  // write calculation information
  worksheet.getCell('B12').value =
    parameters.calculate.couplingBeamFactorSeismic;
  worksheet.getCell('B13').value = parameters.calculate.couplingBeamFactorWind;
  worksheet.getCell('B14').value = parameters.calculate.rigidFloorAssumption;

  // write wind information
  worksheet.getCell('B17').value = parameters.wind.assigned;
  worksheet.getCell('B18').value = parameters.wind.loadCode;
  worksheet.getCell('B19').value = parameters.wind.terrainRoughness;
  worksheet.getCell('B20').value = parameters.wind.pressureModified;
  worksheet.getCell('B21').value = parameters.wind.dampingRatio;
  worksheet.getCell('B22').value = parameters.wind.pressureComfort;
  worksheet.getCell('B23').value = parameters.wind.dampingRationComfort;

  // write seismic information
  worksheet.getCell('B26').value = parameters.seismic.use2015GB18306;
  worksheet.getCell('B27').value = parameters.seismic.group;
  worksheet.getCell('B28').value = parameters.seismic.intensity;
  worksheet.getCell('B29').value = parameters.seismic.siteCategory;
  worksheet.getCell('B30').value = parameters.seismic.characteristicPeriod;
  worksheet.getCell('B31').value = parameters.seismic.dampingRatio;
  worksheet.getCell('B32').value = parameters.seismic.periodReductionFactor;
  worksheet.getCell('B33').value = parameters.seismic.eccentricityX;
  worksheet.getCell('B34').value = parameters.seismic.eccentricityY;
  worksheet.getCell('B35').value = parameters.seismic.maxSpectrumValue;
  worksheet.getCell('B36').value = parameters.seismic.maxSpectrumValueL3;
  worksheet.getCell('B37').value = parameters.seismic.additionalDampingRatio;
  worksheet.getCell('B38').value =
    parameters.seismic.modifiedSeismicReductionFactor;
}

export async function formatParameters(worksheet: Excel.Worksheet) {
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

  rangeSetBorder(worksheet, 2, 1, 37, 2, 'thin', 'thin', 'thin', 'thin');
  rangeSetBorder(worksheet, 2, 1, 37, 1, 'thin', 'medium', 'thin', 'thin');
  rangeSetBorder(worksheet, 38, 1, 38, 1, 'thin', 'medium', 'medium', 'thin');
  rangeSetBorder(worksheet, 38, 2, 38, 2, 'thin', 'thin', 'medium', 'medium');
  rangeSetBorder(worksheet, 2, 2, 37, 2, 'thin', 'thin', 'thin', 'medium');
  rangeSetBorder(worksheet, 1, 1, 1, 1, 'medium', 'medium', 'medium', 'medium');
  rangeSetBorder(
    worksheet,
    10,
    1,
    11,
    2,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    15,
    1,
    16,
    2,
    'medium',
    'medium',
    'medium',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    24,
    1,
    25,
    2,
    'medium',
    'medium',
    'medium',
    'medium',
  );

  rangeFillColor(worksheet, 1, 1, 9, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 11, 1, 14, 1, 'solid', '00F0FFFF', '00FFFFFF');
  rangeFillColor(worksheet, 16, 1, 23, 1, 'solid', '00F0FFF0', '00FFFFFF');
  rangeFillColor(worksheet, 25, 1, 38, 1, 'solid', '00F0FFFF', '00FFFFFF');
}
