import Excel from 'exceljs';
import { rangeFillColor, rangeSetBorder } from '../excel/commom';

/**
 * @description format distribute sheet with two lines header;
 */
export function compareDistributeFormat(worksheet: Excel.Worksheet): void {
  let rowCount: number = worksheet.rowCount;
  let colCount: number = worksheet.columnCount;
  for (let col = 1; col <= colCount; col++) {
    worksheet.getColumn(col).width = 10;
    worksheet.getColumn(col).alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    worksheet.getColumn(col).font = { name: 'Arial', size: 10 };
  }

  for (let row = 1; row <= rowCount; row++) {
    worksheet.getRow(row).height = 20;
  }

  rangeSetBorder(
    worksheet,
    1,
    1,
    rowCount,
    colCount,
    'thin',
    'thin',
    'thin',
    'thin',
  );
  rangeSetBorder(
    worksheet,
    1,
    2,
    1,
    colCount - 1,
    'medium',
    'thin',
    'thin',
    'thin',
  );
  rangeSetBorder(
    worksheet,
    2,
    1,
    rowCount - 1,
    1,
    'thin',
    'medium',
    'thin',
    'thin',
  );
  rangeSetBorder(
    worksheet,
    rowCount,
    2,
    rowCount,
    colCount - 1,
    'thin',
    'thin',
    'medium',
    'thin',
  );
  rangeSetBorder(
    worksheet,
    2,
    colCount,
    rowCount - 1,
    colCount,
    'thin',
    'thin',
    'thin',
    'medium',
  );
  rangeSetBorder(worksheet, 1, 1, 1, 1, 'medium', 'medium', 'thin', 'thin');
  rangeSetBorder(
    worksheet,
    rowCount,
    1,
    rowCount,
    1,
    'thin',
    'medium',
    'medium',
    'thin',
  );
  rangeSetBorder(
    worksheet,
    rowCount,
    colCount,
    rowCount,
    colCount,
    'thin',
    'thin',
    'medium',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    1,
    colCount,
    1,
    colCount,
    'medium',
    'thin',
    'thin',
    'medium',
  );
  rangeSetBorder(
    worksheet,
    3,
    2,
    3,
    colCount - 1,
    'thin',
    'thin',
    'medium',
    'thin',
  );
  rangeSetBorder(worksheet, 3, 1, 3, 1, 'thin', 'medium', 'medium', 'thin');
  rangeSetBorder(
    worksheet,
    3,
    colCount,
    3,
    colCount,
    'thin',
    'thin',
    'medium',
    'medium',
  );

  rangeFillColor(worksheet, 4, 1, rowCount, 1, 'solid', '00F0FFF0', '00FFFFFF');
}
