import { initSummary, writeSummary, formatSummary } from './summary';
import {
  initSummaryQuantity,
  writeSummaryQuantity,
  formatSummaryQuantity,
} from './summary-quantity';
import {
  initParameters,
  writeParameters,
  formatParameters,
} from './parameters';
import { initPeriod, writePeriod, formatPeriod } from './period';
import { IStructure } from '@outreader/core';
import Excel from 'exceljs';
import path from 'path';

export function exportExcel(dir: string, structure: IStructure): boolean {
  // inirial structure data.
  initStructureData(structure);

  // initial workbook.
  const workbook = new Excel.Workbook();

  // write worksheet sumamary information.
  const sheetSummary = workbook.addWorksheet('汇总信息');
  initSummary(sheetSummary);
  writeSummary(dir, structure, sheetSummary);
  formatSummary(sheetSummary);

  // write worksheet sumamary quantity information.
  const sheetSummaryQuantity = workbook.addWorksheet('含钢量汇总');
  initSummaryQuantity(sheetSummaryQuantity);
  writeSummaryQuantity(structure, sheetSummaryQuantity);
  formatSummaryQuantity(sheetSummaryQuantity);

  // write worksheet parameters information.
  const sheetParameters = workbook.addWorksheet('计算参数');
  initParameters(sheetParameters);
  writeParameters(structure, sheetParameters);
  formatParameters(sheetParameters);

  // write worksheet period information
  const sheetPeriod = workbook.addWorksheet('周期');
  initPeriod(sheetPeriod);
  writePeriod(structure, sheetPeriod);
  formatPeriod(sheetPeriod);

  const sheetForce = workbook.addWorksheet('内力');
  const sheetDrift = workbook.addWorksheet('位移角');
  const sheetGeneralResult = workbook.addWorksheet('整体验算结果');
  const sheetDistributeResult = workbook.addWorksheet('楼层分布数据');
  const sheetFactor = workbook.addWorksheet('调整系数');
  const sheetQuantity = workbook.addWorksheet('工程量');

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
