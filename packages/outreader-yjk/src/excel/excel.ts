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
import { initForce, writeForce, formatForce } from './force';
import { initDrift, writeDrift, formatDrift } from './drift';
import {
  initGeneralResult,
  writeGeneralResult,
  formatGeneralResult,
} from './general-result';
import {
  initDistributeResult,
  writeDistributeResult,
  formatDistributeResult,
} from './distribute-result';
import { initFactor, writeFactor, formatFactor } from './factor';
import { initQuantity, writeQuantity, formatQuantity } from './quantity';
import { IStructure } from '@outreader/core';
import Excel from 'exceljs';
import path from 'path';

export async function exportExcel(dir: string, structure: IStructure) {
  // inirial structure data.
  initStructureData(structure);

  // initial workbook.
  const workbook = new Excel.Workbook();

  // write worksheet sumamary information.
  const sheetSummary = workbook.addWorksheet('汇总信息');
  await initSummary(sheetSummary);
  await writeSummary(dir, structure, sheetSummary);
  await formatSummary(sheetSummary);

  // write worksheet sumamary quantity information.
  const sheetSummaryQuantity = workbook.addWorksheet('含钢量汇总');
  await initSummaryQuantity(sheetSummaryQuantity);
  await writeSummaryQuantity(structure, sheetSummaryQuantity);
  await formatSummaryQuantity(sheetSummaryQuantity);

  // write worksheet parameters information.
  const sheetParameters = workbook.addWorksheet('计算参数');
  await initParameters(sheetParameters);
  await writeParameters(structure, sheetParameters);
  await formatParameters(sheetParameters);

  // write worksheet period information
  const sheetPeriod = workbook.addWorksheet('周期');
  await initPeriod(sheetPeriod);
  await writePeriod(structure, sheetPeriod);
  await formatPeriod(sheetPeriod);

  // write force information
  const sheetForce = workbook.addWorksheet('内力');
  await initForce(sheetForce);
  await writeForce(structure, sheetForce);
  await formatForce(sheetForce);

  // write drift information
  const sheetDrift = workbook.addWorksheet('位移角');
  await initDrift(sheetDrift);
  await writeDrift(structure, sheetDrift);
  await formatDrift(sheetDrift);

  // write feneral result information
  const sheetGeneralResult = workbook.addWorksheet('整体验算结果');
  await initGeneralResult(sheetGeneralResult);
  await writeGeneralResult(structure, sheetGeneralResult);
  await formatGeneralResult(sheetGeneralResult);

  // write distribute result
  const sheetDistributeResult = workbook.addWorksheet('楼层分布数据');
  await initDistributeResult(sheetDistributeResult);
  await writeDistributeResult(structure, sheetDistributeResult);
  await formatDistributeResult(sheetDistributeResult);

  // write modify factor
  const sheetFactor = workbook.addWorksheet('调整系数');
  await initFactor(sheetFactor);
  await writeFactor(structure, sheetFactor);
  await formatFactor(sheetFactor);

  // write quantity
  const sheetQuantity = workbook.addWorksheet('工程量');
  await initQuantity(sheetQuantity);
  await writeQuantity(structure, sheetQuantity);
  await formatQuantity(sheetQuantity);

  // write xlsx file.
  const filename = path.join(dir, 'OutReader.xlsx');
  await workbook.xlsx.writeFile(filename);

  return true;
}

export function initStructureData(structure: IStructure): void {
  Object.values(structure).forEach(function (subFile) {
    Object.values(subFile).forEach(function (customInterface) {
      filterInterface(customInterface);
    });
  });
}

export function filterInterface<T>(obj: T): void {
  if (Object.keys(obj).includes('storeyID')) {
    if (
      Array.prototype.slice.call(obj['storeyID' as keyof T])[0] <
      Array.prototype.slice.call(obj['storeyID' as keyof T])[
        Array.prototype.slice.call(obj['storeyID' as keyof T]).length - 1
      ]
    ) {
      reverseArray(obj);
    }
  }
}

export function reverseArray<T>(obj: T): void {
  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      Array.prototype.reverse.call(obj[key]);
    }
  }
}
