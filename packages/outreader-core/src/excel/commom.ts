import Excel from 'exceljs';

/**
 * @description set border by range ;
 */
export function rangeSetBorder(
  worksheet: Excel.Worksheet,
  startR: number,
  startC: number,
  endR: number,
  endC: number,
  topStyle: Excel.BorderStyle,
  leftStyle: Excel.BorderStyle,
  bottomStyle: Excel.BorderStyle,
  rightStyle: Excel.BorderStyle,
): void {
  if (startR < 1 || startC < 1 || startR > endR || startC > endC) {
    throw new Error('invalide range.');
  } else {
    for (let r = startR; r <= endR; r++) {
      for (let c = startC; c <= endC; c++) {
        const cell = worksheet.getCell(r, c);
        cell.border = {
          top: { style: topStyle },
          left: { style: leftStyle },
          bottom: { style: bottomStyle },
          right: { style: rightStyle },
        };
      }
    }
  }
}

/**
 * @description fill range with ARGB type color;
 * @param selfFgColor string, ARGB type;
 * @param selfBgColor string, ARGB type.
 */
export function rangeFillColor(
  worksheet: Excel.Worksheet,
  startR: number,
  startC: number,
  endR: number,
  endC: number,
  selfPatten: Excel.FillPatterns,
  selfFgColor: string,
  selfBgColor: string,
): void {
  if (startR < 1 || startC < 1 || startR > endR || startC > endC) {
    throw new Error('invalide range.');
  } else {
    for (let r = startR; r <= endR; r++) {
      for (let c = startC; c <= endC; c++) {
        const cell = worksheet.getCell(r, c);
        cell.fill = {
          type: 'pattern',
          pattern: selfPatten,
          fgColor: { argb: selfFgColor },
          bgColor: { argb: selfBgColor },
        };
      }
    }
  }
}

/**
 * @description format distribute sheet with two lines header;
 */
export function distributeFormat(worksheet: Excel.Worksheet): void {
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
    2,
    2,
    2,
    colCount - 1,
    'thin',
    'thin',
    'medium',
    'thin',
  );
  rangeSetBorder(worksheet, 2, 1, 2, 1, 'thin', 'medium', 'medium', 'thin');
  rangeSetBorder(
    worksheet,
    2,
    colCount,
    2,
    colCount,
    'thin',
    'thin',
    'medium',
    'medium',
  );

  rangeFillColor(worksheet, 3, 1, rowCount, 1, 'solid', '00F0FFF0', '00FFFFFF');
}
