import {
  hashFile,
  IMode,
  IModeMass,
  ISeismicForce,
  IShearWeightRatioModify,
  IWzq,
  readLineByLine,
} from '@outreader/core';
import fs from 'fs';
import path from 'path';

// Define flag
let FLAG: string;

export async function readWzqOutput(dir: string): Promise<IWzq | undefined> {
  const file = path.join(dir, 'WZQ.OUT');
  if (!fs.existsSync(file)) {
    console.error('cannot find file', file);
    return;
  }
  let wzq: IWzq = {
    hash: hashFile(file),
    modeCoupling: {
      modeID: [],
      period: [],
      angle: [],
      factorX: [],
      factorY: [],
      factorZ: [],
      allExtracted: false,
    },
    modeSeismic: {
      modeID: [],
      period: [],
      angle: [],
      factorX: [],
      factorY: [],
      factorZ: [],
      allExtracted: false,
    },
    modeMass: {
      modeID: [],
      factorX: [],
      factorY: [],
      factorZ: [],
      allExtracted: false,
    },
    seismicForce: {
      storeyID: [],
      towerID: [],
      forceX: [],
      shearX: [],
      momentX: [],
      shearWeightRatioX: [],
      forceY: [],
      shearY: [],
      momentY: [],
      shearWeightRatioY: [],
      allExtracted: false,
    },
    shearWeightRatioModify: {
      storeyID: [],
      towerID: [],
      factorX: [],
      factorY: [],
      allExtracted: false,
    },
  };

  await readLineByLine(file, (line: string) => {
    // Extract valuable data from .out

    if (line.length === 0) {
      return;
    }

    // Divide line into array
    const lineArray = lineToArray(line);
    if (lineArray.length === 0) {
      return;
    }

    // Extract modeCoupling{}
    if (!wzq.modeCoupling.allExtracted) {
      wzq.modeCoupling = extractModeCoupling(lineArray, wzq.modeCoupling);
    }

    // Extract modeSeismic{}
    // if (!wzq.modeSeismic.allExtracted) {
    //   wzq.modeSeismic = extractModeSeismic(lineArray, wzq.modeSeismic);
    // }

    // Extract modeMass{}
    if (!wzq.modeMass.allExtracted) {
      wzq.modeMass = extractModeMass(lineArray, wzq.modeMass);
    }

    // Extract seismicForce{}
    if (!wzq.seismicForce.allExtracted) {
      wzq.seismicForce = extractSeismicForce(lineArray, wzq.seismicForce);
    }

    // Extract shearWeightRatioModify{}
    if (!wzq.shearWeightRatioModify?.allExtracted) {
      wzq.shearWeightRatioModify = extractShearWeightRatioModify(
        lineArray,
        wzq.shearWeightRatioModify,
      );
    }
  });

  return wzq;
}

export function extractModeCoupling(
  lineArray: string[],
  modeCoupling: IMode,
): IMode {
  if (lineArray[0] === '考虑扭转耦联时的振动周期') {
    FLAG = 'keyMOdeCoupling';
  } else if (lineArray[0] === '地震作用最大的方向') {
    if (FLAG === 'keyMOdeCoupling') {
      modeCoupling.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keyMOdeCoupling') {
    modeCoupling = extractMode(lineArray, modeCoupling);
  }
  return modeCoupling;
}

// export function extractModeSeismic(
//   lineArray: string[],
//   modeSeismic: IMode,
// ): IMode {
//   if (lineArray[lineArray.length - 2] === '扭转系数') {
//     FLAG = 'keyModeSeismic';
//   } else if (lineArray[1] === 'X向平动质量系数') {
//     if (FLAG === 'keyModeSeismic') {
//       modeSeismic.allExtracted = true;
//     }

//     FLAG = '';
//   }

//   if (FLAG === 'keyModeSeismic') {
//     modeSeismic = extractMode(lineArray, modeSeismic);
//   }
//   return modeSeismic;
// }

export function extractModeMass(
  lineArray: string[],
  modeMass: IModeMass,
): IModeMass {
  if (lineArray[0] === 'X向地震作用参与振型的有效质量系数') {
    FLAG = 'keyModeMassX';
  } else if (
    lineArray[0] + lineArray[1] + lineArray[2] ===
    '各层X方向的作用力'
  ) {
    if (FLAG === 'keyModeMassX') {
      modeMass.sumX = modeMass.factorX.reduce(
        (sum: number, current: number) => sum + current,
        0,
      );
    }

    FLAG = '';
  }

  if (lineArray[0] === 'Y向地震作用参与振型的有效质量系数') {
    FLAG = 'keyModeMassY';
  } else if (
    lineArray[0] + lineArray[1] + lineArray[2] ===
    '各层Y方向的作用力'
  ) {
    if (FLAG === 'keyModeMassY') {
      modeMass.sumY = modeMass.factorY.reduce(
        (sum: number, current: number) => sum + current,
        0,
      );
      modeMass.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keyModeMassX') {
    if (!isNaN(Number(lineArray[0]))) {
      modeMass.modeID.push(Number(lineArray[0]));
      modeMass.factorX.push(Number(lineArray[1]));
    }
  }

  if (FLAG === 'keyModeMassY') {
    if (!isNaN(Number(lineArray[0]))) {
      modeMass.factorY.push(Number(lineArray[1]));
    }
  }

  return modeMass;
}

export function extractSeismicForce(
  lineArray: string[],
  seismicForce: ISeismicForce,
): ISeismicForce {
  if (lineArray[0] + lineArray[1] + lineArray[2] === '各层X方向的作用力') {
    FLAG = 'keySeismicForceX';
  } else if (
    lineArray[0] + lineArray[1] + lineArray[2] ===
    '抗震规范5.2.5条要求的X向楼层最小剪重比'
  ) {
    if (FLAG === 'keySeismicForceX') {
      seismicForce.shearWeightRatioLimitX = Number(lineArray[3]);
    }

    FLAG = '';
  }

  if (lineArray[0] + lineArray[1] + lineArray[2] === '各层Y方向的作用力') {
    FLAG = 'keySeismicForceY';
  } else if (
    lineArray[0] + lineArray[1] + lineArray[2] ===
    '抗震规范5.2.5条要求的Y向楼层最小剪重比'
  ) {
    if (FLAG === 'keySeismicForceY') {
      seismicForce.shearWeightRatioLimitY = Number(lineArray[3]);
      seismicForce.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keySeismicForceX') {
    if (!isNaN(Number(lineArray[0]))) {
      seismicForce.storeyID.push(Number(lineArray[0]));
      seismicForce.towerID.push(Number(lineArray[1]));
      seismicForce.forceX.push(Number(lineArray[2]));
      seismicForce.shearX.push(Number(lineArray[3]));
      seismicForce.momentX.push(Number(lineArray[6]));
      seismicForce.shearWeightRatioX.push(Number(lineArray[4]));
    }
  } else if (FLAG === 'keySeismicForceY') {
    if (!isNaN(Number(lineArray[0]))) {
      seismicForce.forceY.push(Number(lineArray[2]));
      seismicForce.shearY.push(Number(lineArray[3]));
      seismicForce.momentY.push(Number(lineArray[6]));
      seismicForce.shearWeightRatioY.push(Number(lineArray[4]));
    }
  }

  return seismicForce;
}

export function extractShearWeightRatioModify(
  lineArray: string[],
  shearWeightRatioModify: IShearWeightRatioModify | undefined,
): IShearWeightRatioModify | undefined {
  if (lineArray[0] === '各楼层地震剪力系数调整情况') {
    FLAG = 'keyShearWeightRatioModify';
  }

  if (FLAG === 'keyShearWeightRatioModify') {
    if (!isNaN(Number(lineArray[0]))) {
      shearWeightRatioModify?.storeyID.push(Number(lineArray[0]));
      shearWeightRatioModify?.towerID.push(Number(lineArray[1]));
      shearWeightRatioModify?.factorX.push(Number(lineArray[2]));
      shearWeightRatioModify?.factorY.push(Number(lineArray[3]));
    }
  }
  return shearWeightRatioModify;
}

export function extractMode(lineArray: string[], mode: IMode): IMode {
  if (!isNaN(Number(lineArray[0]))) {
    mode.modeID.push(Number(lineArray[0]));
    mode.period.push(Number(lineArray[1]));
    mode.angle.push(Number(lineArray[2]));
    mode.factorX.push(Number(lineArray[4]));
    mode.factorY.push(Number(lineArray[5]));
    mode.factorZ.push(Number(lineArray[6]));
  }

  return mode;
}
/**
 * @description devide line string and return string array
 * @param line: original line string
 */
function lineToArray(line: string): string[] {
  // const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa5]+\d*\-?\d*|-?\d+\.?\d*[a-zA-Z]*\+?\d*/g;
  const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa50-9\u2150-\u218f\.\-\/\*\，\_]+/g;
  return line.match(regexp) || [];
}
