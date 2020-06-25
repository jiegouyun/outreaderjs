import Excel from 'exceljs';

/**
 * @description look up a specific value in lookUp array, get value;
 * match same index in result array, get result; return value and result.
 * if not  given result array, return value and index in lookUp array.
 * @param mode string, should be 'max' or 'min';
 * @param lookUpArray number[], array to search value;
 * @param resultArray number[], array  of match result;
 */
export function lookUp(
  mode: string,
  lookUpArray: number[],
  resultArray?: number[],
) {
  let value: number;
  let result: number;
  if (mode === 'max') {
    value = Math.max(...lookUpArray);
  } else if (mode === 'min') {
    value = Math.min(...lookUpArray);
  } else {
    throw new Error(`mode should be 'max' or 'min'.`);
  }

  if (resultArray) {
    result = resultArray[lookUpArray.indexOf(value)];
    return [value, result];
  } else {
    result = lookUpArray.indexOf(value);
    return [value, result];
  }
}

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
