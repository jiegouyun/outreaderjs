import { IStructure, hashStr, lookUp } from '@outreader/core';
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
  worksheet.getCell('F10').value = '附加质量';
  worksheet.getCell('F11').value = '总质量';

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
  worksheet.getCell('B14').value = '-偏心';
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
}

export function writeSummary(
  dir: string,
  strunture: IStructure,
  worksheet: Excel.Worksheet,
): void {
  worksheet.getCell('D2').value = dir;
  worksheet.getCell('D3').value =
    strunture.wmass?.basicInformation.engineering || '';
  worksheet.getCell('D4').value =
    strunture.wmass?.basicInformation.software || '';
  worksheet.getCell('F3').value =
    strunture.wmass?.basicInformation.calDate || '';
  worksheet.getCell('F4').value =
    strunture.wmass?.basicInformation.softwareVersion || '';

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

  worksheet.getCell('D10').value = strunture.wmass?.weight.live || '';
  worksheet.getCell('D11').value = strunture.wmass?.weight.dead || '';
  worksheet.getCell('F10').value = strunture.wmass?.weight.super || '';
  worksheet.getCell('F11').value = strunture.wmass?.weight.sum || '';

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
  [worksheet.getCell('D15').value, worksheet.getCell('F15').value] = lookUp(
    'max',
    strunture.wdisp?.ratioSeismicYEccN.ratio as number[],
    strunture.wdisp?.ratioSeismicYEccN.storeyID as number[],
  );
  worksheet.getCell('D21').value = '1.2 / 1.4';

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
}

export function calcDriftLimit(
  location: string,
  system: string,
  material: string,
  height: number,
): number {
  let limit = 0;
  if (/广东/gi.test(location)) {
    console.log(`system: ${system}`);
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
