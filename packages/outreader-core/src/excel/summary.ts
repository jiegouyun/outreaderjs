import { IStructure, IModeMass, IMode } from '../interfaces';
import { lookUp, rangeSetBorder, rangeFillColor } from './commom';
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
  structure: IStructure,
  worksheet: Excel.Worksheet,
) {
  // write project information
  worksheet.getCell('D2').value = structure.dir;
  worksheet.getCell('D3').value =
    structure.wmass?.basicInformation.engineering || '';
  worksheet.getCell('D4').value =
    structure.wmass?.basicInformation.software || '';
  worksheet.getCell('F3').value =
    structure.wmass?.basicInformation.calDate || '';
  worksheet.getCell('F4').value =
    structure.wmass?.basicInformation.softwareVersion || '';

  // write structure information
  worksheet.getCell('D5').value =
    structure.wmass?.generalInformation.structuralSystem || '';
  worksheet.getCell('D6').value = structure.wmass?.storey.storeyID[0] || '';
  worksheet.getCell('D7').value =
    structure.wmass?.generalInformation.basement || '';
  worksheet.getCell('D8').value =
    structure.wmass?.seismicInformation.intensity || '';
  worksheet.getCell('D9').value =
    structure.wmass?.calculationControl.rigidFloorAssumption || '';
  worksheet.getCell('F5').value =
    structure.wmass?.generalInformation.structuralMaterial || '';
  worksheet.getCell('F6').value = structure.wmass?.generalInformation.basement
    ? (structure.wmass?.storey.heightToGround[0] as number) -
      (structure.wmass?.storey.heightToGround[
        structure.wmass?.storey.heightToGround.length -
          (structure.wmass?.generalInformation.basement as number)
      ] as number)
    : structure.wmass?.storey.heightToGround[0] || '';
  worksheet.getCell('F7').value =
    structure.wmass?.generalInformation.constraintFloor || '';
  worksheet.getCell('F8').value =
    structure.wmass?.windInformation.pressureModified || '';
  worksheet.getCell('F9').value =
    structure.wmass?.seismicInformation.periodReductionFactor || '';

  // write mass information
  worksheet.getCell('D10').value =
    Math.round(structure.wmass?.weight.live as number) || '';
  worksheet.getCell('D11').value =
    Math.round(structure.wmass?.weight.dead as number) || '';
  worksheet.getCell('F10').value =
    Math.round(structure.wmass?.weight.super as number) || '';
  worksheet.getCell('F11').value =
    Math.round(structure.wmass?.weight.sum as number) || '';

  // write drift information
  [worksheet.getCell('D12').value, worksheet.getCell('F12').value] = lookUp(
    'min',
    structure.wdisp?.driftWindXP.drift as number[],
    structure.wdisp?.driftWindXP.storeyID as number[],
  );
  [worksheet.getCell('D13').value, worksheet.getCell('F13').value] = lookUp(
    'min',
    structure.wdisp?.driftWindYP.drift as number[],
    structure.wdisp?.driftWindYP.storeyID as number[],
  );
  [worksheet.getCell('D14').value, worksheet.getCell('F14').value] = lookUp(
    'min',
    structure.wdisp?.driftSeismicX.drift as number[],
    structure.wdisp?.driftSeismicX.storeyID as number[],
  );
  [worksheet.getCell('D15').value, worksheet.getCell('F15').value] = lookUp(
    'min',
    structure.wdisp?.driftSeismicY.drift as number[],
    structure.wdisp?.driftSeismicY.storeyID as number[],
  );
  worksheet.getCell('D16').value = structure.wmass?.generalInformation.basement
    ? calcDriftLimit(
        structure.wmass?.generalInformation.location as string,
        structure.wmass?.generalInformation.structuralSystem as string,
        structure.wmass?.generalInformation.structuralMaterial as string,
        (structure.wmass?.storey.heightToGround[0] as number) -
          (structure.wmass?.storey.heightToGround[
            structure.wmass?.storey.heightToGround.length -
              (structure.wmass?.generalInformation.basement as number)
          ] as number),
      )
    : calcDriftLimit(
        structure.wmass?.generalInformation.location as string,
        structure.wmass?.generalInformation.structuralSystem as string,
        structure.wmass?.generalInformation.structuralMaterial as string,
        structure.wmass?.storey.heightToGround[0] as number,
      );

  // write displacement ratio information
  [worksheet.getCell('D17').value, worksheet.getCell('F17').value] = lookUp(
    'max',
    structure.wdisp?.ratioSeismicXEccP.ratio as number[],
    structure.wdisp?.ratioSeismicXEccP.storeyID as number[],
  );
  [worksheet.getCell('D18').value, worksheet.getCell('F18').value] = lookUp(
    'max',
    structure.wdisp?.ratioSeismicYEccP.ratio as number[],
    structure.wdisp?.ratioSeismicYEccP.storeyID as number[],
  );
  [worksheet.getCell('D19').value, worksheet.getCell('F19').value] = lookUp(
    'max',
    structure.wdisp?.ratioSeismicXEccN.ratio as number[],
    structure.wdisp?.ratioSeismicXEccN.storeyID as number[],
  );
  [worksheet.getCell('D20').value, worksheet.getCell('F20').value] = lookUp(
    'max',
    structure.wdisp?.ratioSeismicYEccN.ratio as number[],
    structure.wdisp?.ratioSeismicYEccN.storeyID as number[],
  );
  worksheet.getCell('D21').value = '1.2 / 1.4';

  // write storey displacement ratio information
  [worksheet.getCell('D22').value, worksheet.getCell('F22').value] = lookUp(
    'max',
    structure.wdisp?.ratioSeismicXEccP.ratioD as number[],
    structure.wdisp?.ratioSeismicXEccP.storeyID as number[],
  );
  [worksheet.getCell('D23').value, worksheet.getCell('F23').value] = lookUp(
    'max',
    structure.wdisp?.ratioSeismicYEccP.ratioD as number[],
    structure.wdisp?.ratioSeismicYEccP.storeyID as number[],
  );
  [worksheet.getCell('D24').value, worksheet.getCell('F24').value] = lookUp(
    'max',
    structure.wdisp?.ratioSeismicXEccN.ratioD as number[],
    structure.wdisp?.ratioSeismicXEccN.storeyID as number[],
  );
  [worksheet.getCell('D25').value, worksheet.getCell('F25').value] = lookUp(
    'max',
    structure.wdisp?.ratioSeismicYEccN.ratioD as number[],
    structure.wdisp?.ratioSeismicYEccN.storeyID as number[],
  );
  worksheet.getCell('D26').value = '1.2 / 1.4';

  // write shear weight ratio information
  worksheet.getCell('D27').value =
    structure.wzq?.seismicForce.shearWeightRatioX[
      structure.wzq?.seismicForce.shearWeightRatioX.length -
        (structure.wmass?.generalInformation.constraintFloor as number) -
        1
    ] || '';
  worksheet.getCell('F27').value =
    structure.wzq?.seismicForce.shearWeightRatioLimitX || '';
  worksheet.getCell('D28').value =
    structure.wzq?.seismicForce.shearWeightRatioY[
      structure.wzq?.seismicForce.shearWeightRatioY.length -
        (structure.wmass?.generalInformation.constraintFloor as number) -
        1
    ] || '';
  worksheet.getCell('F28').value =
    structure.wzq?.seismicForce.shearWeightRatioLimitY || '';

  // write stiffness weight ratio information
  worksheet.getCell('D29').value =
    structure.wmass?.stableCheck.windRatioX || '';
  worksheet.getCell('D30').value =
    structure.wmass?.stableCheck.windRatioY || '';
  worksheet.getCell('D31').value =
    structure.wmass?.stableCheck.seismicRatioX || '';
  worksheet.getCell('D32').value =
    structure.wmass?.stableCheck.seismicRatioY || '';
  worksheet.getCell('F29').value = stiffnessWeightRatioCheck(
    structure.wmass?.stableCheck.windRatioX as number,
  );
  worksheet.getCell('F30').value = stiffnessWeightRatioCheck(
    structure.wmass?.stableCheck.windRatioY as number,
  );
  worksheet.getCell('F31').value = stiffnessWeightRatioCheck(
    structure.wmass?.stableCheck.seismicRatioX as number,
  );
  worksheet.getCell('F32').value = stiffnessWeightRatioCheck(
    structure.wmass?.stableCheck.seismicRatioY as number,
  );

  // write stiffness ratio information
  if (structure.wmass?.generalInformation.structuralSystem === '框架结构') {
    [worksheet.getCell('D33').value, worksheet.getCell('F33').value] = lookUp(
      'min',
      structure.wmass?.stiffness.ratx1 as number[],
      structure.wmass?.stiffness.storeyID as number[],
    );
    [worksheet.getCell('D34').value, worksheet.getCell('F34').value] = lookUp(
      'min',
      structure.wmass?.stiffness.raty1 as number[],
      structure.wmass?.stiffness.storeyID as number[],
    );
  } else {
    [worksheet.getCell('D33').value, worksheet.getCell('F33').value] = lookUp(
      'min',
      structure.wmass?.stiffness.ratx2 as number[],
      structure.wmass?.stiffness.storeyID as number[],
    );
    [worksheet.getCell('D34').value, worksheet.getCell('F34').value] = lookUp(
      'min',
      structure.wmass?.stiffness.raty2 as number[],
      structure.wmass?.stiffness.storeyID as number[],
    );
  }

  // write shear capacity ratio
  [worksheet.getCell('D35').value, worksheet.getCell('F35').value] = lookUp(
    'min',
    structure.wmass?.shearCapacityCheck.ratioX as number[],
    structure.wmass?.shearCapacityCheck.storeyID as number[],
  );
  [worksheet.getCell('D36').value, worksheet.getCell('F36').value] = lookUp(
    'min',
    structure.wmass?.shearCapacityCheck.ratioY as number[],
    structure.wmass?.shearCapacityCheck.storeyID as number[],
  );

  // write mode informatio
  writeMode(
    worksheet,
    structure.wzq?.modeCoupling as IMode,
    structure.wzq?.modeMass as IModeMass,
  );

  // write base shear
  worksheet.getCell('D48').value =
    Math.round(
      structure.wmass?.wind.shearAlongX[
        structure.wmass?.wind.shearAlongX.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
    ) || '';
  worksheet.getCell('F48').value =
    Math.round(
      structure.wmass?.wind.shearAlongY[
        structure.wmass?.wind.shearAlongY.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
    ) || '';
  worksheet.getCell('D49').value =
    Math.round(
      structure.wzq?.seismicForce.shearX[
        structure.wzq?.seismicForce.shearX.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
    ) || '';
  worksheet.getCell('F49').value =
    Math.round(
      structure.wzq?.seismicForce.shearY[
        structure.wzq?.seismicForce.shearY.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
    ) || '';

  // write base moment
  worksheet.getCell('D50').value =
    Math.round(
      structure.wmass?.wind.momentAlongX[
        structure.wmass?.wind.momentAlongX.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
    ) || '';
  worksheet.getCell('F50').value =
    Math.round(
      structure.wmass?.wind.momentAlongY[
        structure.wmass?.wind.momentAlongY.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
    ) || '';
  worksheet.getCell('D51').value =
    Math.round(
      structure.wzq?.seismicForce.momentX[
        structure.wzq?.seismicForce.momentX.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
    ) || '';
  worksheet.getCell('F51').value =
    Math.round(
      structure.wzq?.seismicForce.momentY[
        structure.wzq?.seismicForce.momentY.length -
          (structure.wmass?.generalInformation.constraintFloor as number) -
          1
      ] as number,
    ) || '';
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

export function calcDriftLimit(
  location: string,
  system: string,
  material: string,
  height: number,
): number {
  let limit = 0;

  if (material === '钢结构') {
    return 250;
  }

  if (height <= 150) {
    if (['框架结构', '异形柱框架结构'].includes(system)) {
      limit = /广东/gi.test(location) ? 500 : 550;
    } else if (
      ['框剪结构', '框筒结构', '板柱-剪力墙结构', '异形柱框剪结构'].includes(
        system,
      )
    ) {
      limit = /广东/gi.test(location) ? 650 : 800;
    } else if (
      ['筒中筒结构', '剪力墙结构', '部分框支剪力墙结构'].includes(system)
    ) {
      limit = /广东/gi.test(location) ? 800 : 1000;
    }
  } else if (height < 250) {
    if (['框架结构', '异形柱框架结构'].includes(system)) {
      limit = /广东/gi.test(location)
        ? 500
        : Math.round(
            1 /
              (((1 / 500 - 1 / 550) * (height - 150)) / (250 - 150) + 1 / 550),
          );
    } else if (
      ['框剪结构', '框筒结构', '板柱-剪力墙结构', '异形柱框剪结构'].includes(
        system,
      )
    ) {
      limit = /广东/gi.test(location)
        ? Math.round(
            1 /
              (((1 / 500 - 1 / 650) * (height - 150)) / (250 - 150) + 1 / 650),
          )
        : Math.round(
            1 /
              (((1 / 500 - 1 / 800) * (height - 150)) / (250 - 150) + 1 / 800),
          );
    } else if (
      ['筒中筒结构', '剪力墙结构', '部分框支剪力墙结构'].includes(system)
    ) {
      limit = /广东/gi.test(location)
        ? Math.round(
            1 /
              (((1 / 500 - 1 / 800) * (height - 150)) / (250 - 150) + 1 / 800),
          )
        : Math.round(
            1 /
              (((1 / 500 - 1 / 1000) * (height - 150)) / (250 - 150) +
                1 / 1000),
          );
    }
  } else {
    limit = 500;
  }

  return limit;
}

export function stiffnessWeightRatioCheck(ratio: number): string {
  let result: string;
  if (ratio < 1.4) {
    result = '稳定不足,考虑二阶';
  } else if (ratio < 2.7) {
    result = '满足稳定,考虑二阶';
  } else {
    result = '满足稳定,不计二阶';
  }
  return result;
}

export function writeMode(
  worksheet: Excel.Worksheet,
  mode: IMode,
  mass: IModeMass,
): void {
  for (let i: number = 0; i < 6; i++) {
    worksheet.getCell(`C${39 + i}`).value =
      Math.round(mode.period[i] * 100) / 100;
    worksheet.getCell(`D${39 + i}`).value =
      Math.round(mode.factorX[i] * 100) / 100;
    worksheet.getCell(`E${39 + i}`).value =
      Math.round(mode.factorY[i] * 100) / 100;
    worksheet.getCell(`F${39 + i}`).value =
      Math.round(mode.factorZ[i] * 100) / 100;
  }

  let indexPeriodZ: number = mode.factorZ.findIndex((value) => value >= 0.5);
  let indexPeriodXY: number = mode.factorZ.findIndex((value) => value < 0.5);
  let periodRatio: number =
    mode.period[indexPeriodZ] / mode.period[indexPeriodXY];
  worksheet.getCell('C45').value = Math.round(periodRatio * 100) / 100;
  worksheet.getCell('D45').value = periodRatio < 0.85 ? '<0.85' : '>0.85';

  worksheet.getCell('F45').value = mode.modeID.length;

  worksheet.getCell('D46').value = Math.round(mass.sumX as number);
  worksheet.getCell('F46').value = Math.round(mass.sumY as number);
}
