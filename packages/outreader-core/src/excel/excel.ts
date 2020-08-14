import { saveAs } from 'file-saver';
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
import { IStructureFrontEnd } from '../interfaces';
import Excel from 'exceljs';
import path from 'path';

/**
 * @description export data into a excel file.
 * @param structure IStructureFrontEnd, structure data.
 */
export async function exportExcel(structure: IStructureFrontEnd, dir?: string) {
  // initial workbook.
  const workbook = new Excel.Workbook();

  // write worksheet sumamary information.
  const sheetSummary = workbook.addWorksheet('汇总信息');
  await initSummary(sheetSummary);
  await writeSummary(structure.summary, sheetSummary);
  await formatSummary(sheetSummary);

  // write worksheet sumamary quantity information.
  const sheetSummaryQuantity = workbook.addWorksheet('含钢量汇总');
  await initSummaryQuantity(sheetSummaryQuantity);
  await writeSummaryQuantity(structure.summaryQuantity, sheetSummaryQuantity);
  await formatSummaryQuantity(sheetSummaryQuantity);

  // write worksheet parameters information.
  const sheetParameters = workbook.addWorksheet('计算参数');
  await initParameters(sheetParameters);
  await writeParameters(structure.parameters, sheetParameters);
  await formatParameters(sheetParameters);

  // write worksheet period information
  const sheetPeriod = workbook.addWorksheet('周期');
  await initPeriod(sheetPeriod);
  await writePeriod(structure.period, sheetPeriod);
  await formatPeriod(sheetPeriod);

  // write force information
  const sheetForce = workbook.addWorksheet('内力');
  await initForce(sheetForce);
  await writeForce(structure.force, sheetForce);
  await formatForce(sheetForce);

  // write drift information
  const sheetDrift = workbook.addWorksheet('位移角');
  await initDrift(sheetDrift);
  await writeDrift(structure.drift, sheetDrift);
  await formatDrift(sheetDrift);

  // write feneral result information
  const sheetGeneralResult = workbook.addWorksheet('整体验算结果');
  await initGeneralResult(sheetGeneralResult);
  await writeGeneralResult(structure.generalResult, sheetGeneralResult);
  await formatGeneralResult(sheetGeneralResult);

  // write distribute result
  const sheetDistributeResult = workbook.addWorksheet('楼层分布数据');
  await initDistributeResult(sheetDistributeResult);
  await writeDistributeResult(
    structure.distributeResult,
    sheetDistributeResult,
  );
  await formatDistributeResult(sheetDistributeResult);

  // write modify factor
  const sheetFactor = workbook.addWorksheet('调整系数');
  await initFactor(sheetFactor);
  await writeFactor(structure.factor, sheetFactor);
  await formatFactor(sheetFactor);

  // write quantity
  const sheetQuantity = workbook.addWorksheet('工程量');
  await initQuantity(sheetQuantity);
  await writeQuantity(structure.quantity, sheetQuantity);
  await formatQuantity(sheetQuantity);

  // write xlsx file.
  // const filename = path.join(dir ? dir : structure.summary.project.dir, 'OutReader.xlsx');
  // await workbook.xlsx.writeFile(filename);
  const buffer = await workbook.xlsx.writeBuffer();
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const blob = new Blob([buffer], { type: fileType });
  saveAs(blob, 'OutReader.xlsx');

  return true;
}
