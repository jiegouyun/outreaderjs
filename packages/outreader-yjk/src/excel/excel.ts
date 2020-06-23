import { IStructure, hashStr, IStiffness } from '@outreader/core';
import * as Excel from 'exceljs';
import * as path from 'path';

export function exportExcel(dir: string, structure: IStructure): boolean {
  // inirial structure data.
  initStructureData(structure);
  // initial workbook.
  const workbook = new Excel.Workbook();

  // initial worksheet general information.
  const sheetGeneral = workbook.addWorksheet('汇总信息');
  initSheetGeneral(sheetGeneral);

  // write worksheet general information.
  writeSheetGeneral(dir, structure, sheetGeneral);

  // write xlsx file.
  const filename = path.join(dir, 'OutReader.xlsx');
  workbook.xlsx.writeFile(filename);

  return true;
}

export function initStructureData(structure: IStructure): void {
  // need revise.
  reverseArray(structure.wmass?.stiffness);
  reverseArray(structure.wv02q?.v02qFactor);
  reverseArray(structure.concreteSteel?.concrete);
  reverseArray(structure.concreteSteel?.steel);
  reverseArray(structure.rebar?.area);
  reverseArray(structure.rebar?.floorRebar);
  reverseArray(structure.rebar?.beamRebar);
  reverseArray(structure.rebar?.columnRebar);
  reverseArray(structure.rebar?.wallRebar);
}

export function reverseArray<T>(obj: T): void {
  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      Array.prototype.reverse.call(obj[key]);
    }
  }
}

export function initSheetGeneral(worksheet: Excel.Worksheet): void {
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
}

export function writeSheetGeneral(
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
}
