import { IStructure } from '../interfaces';

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
 * @description caldulate drift limit.
 * @param location string, guangdong different with nation;
 * @param system string, structural system;
 * @param material string, steel will be different;
 * @param height number, to ground.
 */
export function calcDriftLimit(
  location: string,
  system: string,
  material: string,
  height: number,
): number {
  let limit = 0;

  if (material === '钢结构') {
    return 250;
  }

  if (height <= 150) {
    if (['框架结构', '异形柱框架结构'].includes(system)) {
      limit = /广东/gi.test(location) ? 500 : 550;
    } else if (
      [
        '框剪结构',
        '框筒结构',
        '板柱-剪力墙结构',
        '异形柱框剪结构',
        '框架-筒体结构',
      ].includes(system)
    ) {
      limit = /广东/gi.test(location) ? 650 : 800;
    } else if (
      ['筒中筒结构', '剪力墙结构', '部分框支剪力墙结构'].includes(system)
    ) {
      limit = /广东/gi.test(location) ? 800 : 1000;
    }
  } else if (height < 250) {
    if (['框架结构', '异形柱框架结构'].includes(system)) {
      limit = /广东/gi.test(location)
        ? 500
        : Math.round(
            1 /
              (((1 / 500 - 1 / 550) * (height - 150)) / (250 - 150) + 1 / 550),
          );
    } else if (
      [
        '框剪结构',
        '框筒结构',
        '板柱-剪力墙结构',
        '异形柱框剪结构',
        '框架-筒体结构',
      ].includes(system)
    ) {
      limit = /广东/gi.test(location)
        ? Math.round(
            1 /
              (((1 / 500 - 1 / 650) * (height - 150)) / (250 - 150) + 1 / 650),
          )
        : Math.round(
            1 /
              (((1 / 500 - 1 / 800) * (height - 150)) / (250 - 150) + 1 / 800),
          );
    } else if (
      ['筒中筒结构', '剪力墙结构', '部分框支剪力墙结构'].includes(system)
    ) {
      limit = /广东/gi.test(location)
        ? Math.round(
            1 /
              (((1 / 500 - 1 / 800) * (height - 150)) / (250 - 150) + 1 / 800),
          )
        : Math.round(
            1 /
              (((1 / 500 - 1 / 1000) * (height - 150)) / (250 - 150) +
                1 / 1000),
          );
    }
  } else {
    limit = 500;
  }

  return limit;
}

/**
 * @description check stiffness weight ratio.
 * @param ratio number, stiffness weight ratio.
 */
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

/**
 * @description sort array by DESC in storeyID.
 * @param structure IStructure, structure data.
 */
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
