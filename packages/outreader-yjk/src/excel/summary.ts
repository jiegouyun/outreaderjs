import { IStructure, hashStr, lookUp, IModeMass, IMode } from '@outreader/core';
import * as Excel from 'exceljs';

export function initSummary(worksheet: Excel.Worksheet): void {
  worksheet.mergeCells('A1:F1');
  worksheet.getCell('A1').value = '计算结果记录表';

  worksheet.mergeCells('A2:B4');
  worksheet.getCell('A2').value = '工程信息';
  worksheet.getCell('C2').value = '工程文件路径';
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
  worksheet.getCell('C9').value = '刚性楼板假定';
  worksheet.getCell('E5').value = '结构材料';
  worksheet.getCell('E6').value = '结构高度';
  worksheet.getCell('E7').value = '嵌固层';
  worksheet.getCell('E8').value = '修正后基本风压';
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
  worksheet.getCell('E45').value = '计算振型个数';
  worksheet.mergeCells('A46:B46');
  worksheet.getCell('A46').value = '振型质量参与系数';
  worksheet.getCell('B46').value = 'X向';
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
  worksheet.getCell('A50').value = '基底倾覆弯矩';
  worksheet.getCell('B50').value = '风荷载';
  worksheet.getCell('B51').value = '地震';
  worksheet.getCell('C50').value = 'X向';
  worksheet.getCell('C51').value = 'X向';
  worksheet.getCell('E50').value = 'Y向';
  worksheet.getCell('E51').value = 'Y向';
}

export function writeSummary(
  dir: string,
  strunture: IStructure,
  worksheet: Excel.Worksheet,
): void {
  // write project information
  worksheet.getCell('D2').value = dir;
  worksheet.getCell('D3').value =
    strunture.wmass?.basicInformation.engineering || '';
  worksheet.getCell('D4').value =
    strunture.wmass?.basicInformation.software || '';
  worksheet.getCell('F3').value =
    strunture.wmass?.basicInformation.calDate || '';
  worksheet.getCell('F4').value =
    strunture.wmass?.basicInformation.softwareVersion || '';

  // write structure information
  worksheet.getCell('D5').value =
    strunture.wmass?.generalInformation.structuralSystem || '';
  worksheet.getCell('D6').value = strunture.wmass?.storey.storeyID[0] || '';
  worksheet.getCell('D7').value =
    strunture.wmass?.generalInformation.basement || '';
  worksheet.getCell('D8').value =
    strunture.wmass?.seismicInformation.intensity || '';
  worksheet.getCell('D9').value =
    strunture.wmass?.calculationControl.rigidFloorAssumption || '';
  worksheet.getCell('F5').value =
    strunture.wmass?.generalInformation.structuralMaterial || '';
  worksheet.getCell('F6').value =
    strunture.wmass?.storey.heightToGround[0] || '';
  worksheet.getCell('F7').value =
    strunture.wmass?.generalInformation.constraintFloor || '';
  worksheet.getCell('F8').value =
    strunture.wmass?.windInformation.pressureModified || '';
  worksheet.getCell('F9').value =
    strunture.wmass?.seismicInformation.periodReductionFactor || '';

  // write mass information
  worksheet.getCell('D10').value = strunture.wmass?.weight.live || '';
  worksheet.getCell('D11').value = strunture.wmass?.weight.dead || '';
  worksheet.getCell('F10').value = strunture.wmass?.weight.super || '';
  worksheet.getCell('F11').value = strunture.wmass?.weight.sum || '';

  // write drift information
  [worksheet.getCell('D12').value, worksheet.getCell('F12').value] = lookUp(
    'min',
    strunture.wdisp?.driftWindXP.drift as number[],
    strunture.wdisp?.driftWindXP.storeyID as number[],
  );
  [worksheet.getCell('D13').value, worksheet.getCell('F13').value] = lookUp(
    'min',
    strunture.wdisp?.driftWindYP.drift as number[],
    strunture.wdisp?.driftWindYP.storeyID as number[],
  );
  [worksheet.getCell('D14').value, worksheet.getCell('F14').value] = lookUp(
    'min',
    strunture.wdisp?.driftSeismicX.drift as number[],
    strunture.wdisp?.driftSeismicX.storeyID as number[],
  );
  [worksheet.getCell('D15').value, worksheet.getCell('F15').value] = lookUp(
    'min',
    strunture.wdisp?.driftSeismicY.drift as number[],
    strunture.wdisp?.driftSeismicY.storeyID as number[],
  );
  worksheet.getCell('D16').value = calcDriftLimit(
    strunture.wmass?.generalInformation.location as string,
    strunture.wmass?.generalInformation.structuralSystem as string,
    strunture.wmass?.generalInformation.structuralMaterial as string,
    strunture.wmass?.storey.heightToGround[0] as number,
  );

  // write displacement ratio information
  [worksheet.getCell('D17').value, worksheet.getCell('F17').value] = lookUp(
    'max',
    strunture.wdisp?.ratioSeismicXEccP.ratio as number[],
    strunture.wdisp?.ratioSeismicXEccP.storeyID as number[],
  );
  [worksheet.getCell('D18').value, worksheet.getCell('F18').value] = lookUp(
    'max',
    strunture.wdisp?.ratioSeismicYEccP.ratio as number[],
    strunture.wdisp?.ratioSeismicYEccP.storeyID as number[],
  );
  [worksheet.getCell('D19').value, worksheet.getCell('F19').value] = lookUp(
    'max',
    strunture.wdisp?.ratioSeismicXEccN.ratio as number[],
    strunture.wdisp?.ratioSeismicXEccN.storeyID as number[],
  );
  [worksheet.getCell('D20').value, worksheet.getCell('F20').value] = lookUp(
    'max',
    strunture.wdisp?.ratioSeismicYEccN.ratio as number[],
    strunture.wdisp?.ratioSeismicYEccN.storeyID as number[],
  );
  worksheet.getCell('D21').value = '1.2 / 1.4';

  // write storey displacement ratio information
  [worksheet.getCell('D22').value, worksheet.getCell('F22').value] = lookUp(
    'max',
    strunture.wdisp?.ratioSeismicXEccP.ratioD as number[],
    strunture.wdisp?.ratioSeismicXEccP.storeyID as number[],
  );
  [worksheet.getCell('D23').value, worksheet.getCell('F23').value] = lookUp(
    'max',
    strunture.wdisp?.ratioSeismicYEccP.ratioD as number[],
    strunture.wdisp?.ratioSeismicYEccP.storeyID as number[],
  );
  [worksheet.getCell('D24').value, worksheet.getCell('F24').value] = lookUp(
    'max',
    strunture.wdisp?.ratioSeismicXEccN.ratioD as number[],
    strunture.wdisp?.ratioSeismicXEccN.storeyID as number[],
  );
  [worksheet.getCell('D25').value, worksheet.getCell('F25').value] = lookUp(
    'max',
    strunture.wdisp?.ratioSeismicYEccN.ratioD as number[],
    strunture.wdisp?.ratioSeismicYEccN.storeyID as number[],
  );
  worksheet.getCell('D26').value = '1.2 / 1.4';

  // write shear weight ratio information
  worksheet.getCell('D27').value =
    strunture.wzq?.seismicForce.shearWeightRatioX[
      strunture.wzq?.seismicForce.shearWeightRatioX.length -
        (strunture.wmass?.generalInformation.constraintFloor as number) -
        1
    ] || '';
  worksheet.getCell('F27').value =
    strunture.wzq?.seismicForce.shearWeightRatioLimitX || '';
  worksheet.getCell('D28').value =
    strunture.wzq?.seismicForce.shearWeightRatioY[
      strunture.wzq?.seismicForce.shearWeightRatioY.length -
        (strunture.wmass?.generalInformation.constraintFloor as number) -
        1
    ] || '';
  worksheet.getCell('F28').value =
    strunture.wzq?.seismicForce.shearWeightRatioLimitY || '';

  // write stiffness weight ratio information
  worksheet.getCell('D29').value =
    strunture.wmass?.stableCheck.windRatioX || '';
  worksheet.getCell('D30').value =
    strunture.wmass?.stableCheck.windRatioY || '';
  worksheet.getCell('D31').value =
    strunture.wmass?.stableCheck.seismicRatioX || '';
  worksheet.getCell('D32').value =
    strunture.wmass?.stableCheck.seismicRatioY || '';
  worksheet.getCell('F29').value = stiffnessWeightRatioCheck(
    strunture.wmass?.stableCheck.windRatioX as number,
  );
  worksheet.getCell('F30').value = stiffnessWeightRatioCheck(
    strunture.wmass?.stableCheck.windRatioY as number,
  );
  worksheet.getCell('F31').value = stiffnessWeightRatioCheck(
    strunture.wmass?.stableCheck.seismicRatioX as number,
  );
  worksheet.getCell('F32').value = stiffnessWeightRatioCheck(
    strunture.wmass?.stableCheck.seismicRatioY as number,
  );

  // write stiffness ratio information
  if (strunture.wmass?.generalInformation.structuralSystem === '框架结构') {
    [worksheet.getCell('D33').value, worksheet.getCell('F33').value] = lookUp(
      'min',
      strunture.wmass?.stiffness.ratx1 as number[],
      strunture.wmass?.stiffness.storeyID as number[],
    );
    [worksheet.getCell('D34').value, worksheet.getCell('F34').value] = lookUp(
      'min',
      strunture.wmass?.stiffness.raty1 as number[],
      strunture.wmass?.stiffness.storeyID as number[],
    );
  } else {
    [worksheet.getCell('D33').value, worksheet.getCell('F33').value] = lookUp(
      'min',
      strunture.wmass?.stiffness.ratx2 as number[],
      strunture.wmass?.stiffness.storeyID as number[],
    );
    [worksheet.getCell('D34').value, worksheet.getCell('F34').value] = lookUp(
      'min',
      strunture.wmass?.stiffness.raty2 as number[],
      strunture.wmass?.stiffness.storeyID as number[],
    );
  }

  // write shear capacity ratio
  [worksheet.getCell('D35').value, worksheet.getCell('F35').value] = lookUp(
    'min',
    strunture.wmass?.shearCapacityCheck.ratioX as number[],
    strunture.wmass?.shearCapacityCheck.storeyID as number[],
  );
  [worksheet.getCell('D36').value, worksheet.getCell('F36').value] = lookUp(
    'min',
    strunture.wmass?.shearCapacityCheck.ratioY as number[],
    strunture.wmass?.shearCapacityCheck.storeyID as number[],
  );

  // write mode informatio
  writeMode(
    worksheet,
    strunture.wzq?.modeCoupling as IMode,
    strunture.wzq?.modeMass as IModeMass,
  );

  // write base shear
  worksheet.getCell('D48').value =
    strunture.wmass?.wind.shearAlongX[
      strunture.wmass?.wind.shearAlongX.length -
        (strunture.wmass?.generalInformation.constraintFloor as number) -
        1
    ].toFixed(0) || '';
  worksheet.getCell('F48').value =
    strunture.wmass?.wind.shearAlongY[
      strunture.wmass?.wind.shearAlongY.length -
        (strunture.wmass?.generalInformation.constraintFloor as number) -
        1
    ].toFixed(0) || '';
  worksheet.getCell('D49').value =
    strunture.wzq?.seismicForce.shearX[
      strunture.wzq?.seismicForce.shearX.length -
        (strunture.wmass?.generalInformation.constraintFloor as number) -
        1
    ].toFixed(0) || '';
  worksheet.getCell('F49').value =
    strunture.wzq?.seismicForce.shearY[
      strunture.wzq?.seismicForce.shearY.length -
        (strunture.wmass?.generalInformation.constraintFloor as number) -
        1
    ].toFixed(0) || '';

  // write base moment
  worksheet.getCell('D50').value =
    strunture.wmass?.wind.momentAlongX[
      strunture.wmass?.wind.momentAlongX.length -
        (strunture.wmass?.generalInformation.constraintFloor as number) -
        1
    ].toFixed(0) || '';
  worksheet.getCell('F50').value =
    strunture.wmass?.wind.momentAlongY[
      strunture.wmass?.wind.momentAlongY.length -
        (strunture.wmass?.generalInformation.constraintFloor as number) -
        1
    ].toFixed(0) || '';
  worksheet.getCell('D51').value =
    strunture.wzq?.seismicForce.momentX[
      strunture.wzq?.seismicForce.momentX.length -
        (strunture.wmass?.generalInformation.constraintFloor as number) -
        1
    ].toFixed(0) || '';
  worksheet.getCell('F51').value =
    strunture.wzq?.seismicForce.momentY[
      strunture.wzq?.seismicForce.momentY.length -
        (strunture.wmass?.generalInformation.constraintFloor as number) -
        1
    ].toFixed(0) || '';
}

export function calcDriftLimit(
  location: string,
  system: string,
  material: string,
  height: number,
): number {
  let limit = 0;
  if (/广东/gi.test(location)) {
    if (system === '框架结构') {
      limit = 500;
    } else if (
      ['框筒结构', '框剪结构', '板柱剪力墙结构', '巨型框架核心筒结构'].includes(
        system,
      )
    ) {
      if (height <= 150) {
        limit = 650;
      } else if (height < 250) {
        limit = Math.round(
          1 / (((1 / 500 - 1 / 650) * (height - 150)) / (250 - 150) + 1 / 650),
        );
      } else {
        limit = 500;
      }
    } else if (['筒中筒结构', '剪力墙结构'].includes(system)) {
      if (height <= 150) {
        limit = 800;
      } else if (height < 250) {
        limit = Math.round(
          1 / (((1 / 500 - 1 / 800) * (height - 150)) / (250 - 150) + 1 / 800),
        );
      } else {
        limit = 500;
      }
    } else {
      throw new Error(`could not find structural system type.`);
    }
  } else if (/全国/gi.test(location)) {
    if (material === '钢结构') {
      return 250;
    }

    if (system === '框架结构') {
      if (height <= 150) {
        limit = 550;
      } else if (height < 250) {
        limit = Math.round(
          1 / (((1 / 500 - 1 / 550) * (height - 150)) / (250 - 150) + 1 / 550),
        );
      } else {
        limit = 500;
      }
    } else if (['框筒结构', '框剪结构', '板柱剪力墙结构'].includes(system)) {
      if (height <= 150) {
        limit = 800;
      } else if (height < 250) {
        limit = Math.round(
          1 / (((1 / 500 - 1 / 800) * (height - 150)) / (250 - 150) + 1 / 800),
        );
      } else {
        limit = 500;
      }
    } else if (['筒中筒结构', '剪力墙结构'].includes(system)) {
      if (height <= 150) {
        limit = 1000;
      } else if (height < 250) {
        limit = Math.round(
          1 /
            (((1 / 500 - 1 / 1000) * (height - 150)) / (250 - 150) + 1 / 1000),
        );
      } else {
        limit = 500;
      }
    } else {
      throw new Error(`could not find structural system type.`);
    }
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
    worksheet.getCell(`C${39 + i}`).value = mode.period[i].toFixed(2);
    worksheet.getCell(`D${39 + i}`).value = mode.factorX[i].toFixed(2);
    worksheet.getCell(`E${39 + i}`).value = mode.factorY[i].toFixed(2);
    worksheet.getCell(`F${39 + i}`).value = mode.factorZ[i].toFixed(2);
  }

  let indexPeriodZ: number = mode.factorZ.findIndex((value) => value >= 0.5);
  let indexPeriodXY: number = mode.factorZ.findIndex((value) => value < 0.5);
  let periodRatio: number =
    mode.period[indexPeriodZ] / mode.period[indexPeriodXY];
  worksheet.getCell('C45').value = periodRatio.toFixed(2);
  worksheet.getCell('D45').value = periodRatio < 0.85 ? '<0.85' : '>0.85';

  worksheet.getCell('F45').value = mode.modeID.length;

  worksheet.getCell('D46').value = (mass.sumX as number).toFixed(2);
  worksheet.getCell('F46').value = (mass.sumY as number).toFixed(2);
}
