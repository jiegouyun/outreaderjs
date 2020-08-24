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
export async function exportCompareExcel(
  structures: IStructureFrontEnd[],
  dir?: string,
) {
  // initial workbook.
  const workbook = new Excel.Workbook();
  const nums = structures.length;

  // write worksheet sumamary information.
  const sheetSummary = workbook.addWorksheet('汇总信息');
  await initSummary(sheetSummary, nums);
  await writeSummary(structures, sheetSummary);
  await formatSummary(sheetSummary, nums);

  // // write worksheet sumamary quantity information.
  const sheetSummaryQuantity = workbook.addWorksheet('含钢量汇总');
  await initSummaryQuantity(sheetSummaryQuantity, nums);
  await writeSummaryQuantity(structures, sheetSummaryQuantity);
  await formatSummaryQuantity(sheetSummaryQuantity, nums);

  // write worksheet parameters information.
  const sheetParameters = workbook.addWorksheet('计算参数');
  await initParameters(sheetParameters, nums);
  await writeParameters(structures, sheetParameters);
  await formatParameters(sheetParameters, nums);

  // // write worksheet period information
  const sheetPeriod = workbook.addWorksheet('周期');
  await initPeriod(sheetPeriod, nums);
  await writePeriod(structures, sheetPeriod);
  await formatPeriod(sheetPeriod, nums);

  // // write force information
  const sheetForce = workbook.addWorksheet('内力');
  await initForce(sheetForce, nums);
  await writeForce(structures, sheetForce);
  await formatForce(sheetForce, nums);

  // // write drift information
  const sheetDrift = workbook.addWorksheet('位移角');
  await initDrift(sheetDrift, nums);
  await writeDrift(structures, sheetDrift);
  await formatDrift(sheetDrift, nums);

  // // write feneral result information
  const sheetGeneralResult = workbook.addWorksheet('整体验算结果');
  await initGeneralResult(sheetGeneralResult, nums);
  await writeGeneralResult(structures, sheetGeneralResult);
  await formatGeneralResult(sheetGeneralResult, nums);

  // // write distribute result
  const sheetDistributeResult = workbook.addWorksheet('楼层分布数据');
  await initDistributeResult(sheetDistributeResult, nums);
  await writeDistributeResult(structures, sheetDistributeResult);
  await formatDistributeResult(sheetDistributeResult, nums);

  // // write modify factor
  const sheetFactor = workbook.addWorksheet('调整系数');
  await initFactor(sheetFactor, nums);
  await writeFactor(structures, sheetFactor);
  await formatFactor(sheetFactor, nums);

  // // write quantity
  // const sheetQuantity = workbook.addWorksheet('工程量');
  // await initQuantity(sheetQuantity);
  // await writeQuantity(structure.quantity, sheetQuantity);
  // await formatQuantity(sheetQuantity);

  // write xlsx file.
  const filename = path.join(
    dir ? dir : structures[0].summary.project.dir,
    'Compare.xlsx',
  );
  await workbook.xlsx.writeFile(filename);
  // const buffer = await workbook.xlsx.writeBuffer();
  // const fileType =
  //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  // const blob = new Blob([buffer], { type: fileType });
  // saveAs(blob, 'Compare.xlsx');

  return true;
}
