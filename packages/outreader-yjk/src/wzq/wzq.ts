import { readLineByLine, checkObjectKeysIfAllExtracted } from '@outreader/core';
import * as path from 'path';
import { IWzq, IMode, IModeMass, ISeismicForce } from './wzq.interface';

// Define flag
let flag: string;

export async function readWzqOutput(dir: string): Promise<IWzq> {
  const file = path.join(dir, 'wzq.out');
  let wzq: IWzq = {
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
      shearWeiightRatioX: [],
      forceY: [],
      shearY: [],
      momentY: [],
      shearWeiightRatioY: [],
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
    // console.log(`line: ${line}`);
    // console.log(`lineArray: ${lineArray}`);

    if (lineArray.length === 0) {
      return;
    }

    // Extract modeCoupling{}
    if (!wzq.modeCoupling.allExtracted) {
      wzq.modeCoupling = extractModeCoupling(lineArray, wzq.modeCoupling);
    }

    // Extract modeSeismic{}
    if (!wzq.modeSeismic.allExtracted) {
      wzq.modeSeismic = extractModeSeismic(lineArray, wzq.modeSeismic);
    }

    // Extract modeMass{}
    if (!wzq.modeMass.allExtracted) {
      wzq.modeMass = extractModeMass(lineArray, wzq.modeMass);
    }

    // Extract seismicForce{}
    if (!wzq.seismicForce.allExtracted) {
      wzq.seismicForce = extractSeismicForce(lineArray, wzq.seismicForce);
    }
  });

  console.log(wzq);
  return wzq;
}

export function extractModeCoupling(
  lineArray: string[],
  modeCoupling: IMode,
): IMode {
  if (lineArray[lineArray.length - 1] === '强制刚性楼板模型') {
    flag = 'keyMOdeCoupling';
  } else if (lineArray[0] === '地震作用最大的方向') {
    if (flag === 'keyMOdeCoupling') {
      modeCoupling.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyMOdeCoupling') {
    modeCoupling = extractMode(lineArray, modeCoupling);
  }
  return modeCoupling;
}

export function extractModeSeismic(
  lineArray: string[],
  modeSeismic: IMode,
): IMode {
  if (lineArray[lineArray.length - 2] === '扭转系数') {
    flag = 'keyModeSeismic';
  } else if (lineArray[1] === 'X向平动质量系数') {
    if (flag === 'keyModeSeismic') {
      modeSeismic.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyModeSeismic') {
    modeSeismic = extractMode(lineArray, modeSeismic);
  }
  return modeSeismic;
}

export function extractModeMass(
  lineArray: string[],
  modeMass: IModeMass,
): IModeMass {
  if (lineArray[1] === 'X向平动质量系数') {
    flag = 'keyModeMass';
  } else if (lineArray[0] === 'X向平动振型参与质量系数总计') {
    if (flag === 'keyModeMass') {
      if (typeof modeMass.factorX === 'object') {
        modeMass.sumX = modeMass.factorX.reduce(
          (sum, current) => sum + current,
          0,
        );
      }
      if (typeof modeMass.factorY === 'object') {
        modeMass.sumY = modeMass.factorY.reduce(
          (sum, current) => sum + current,
          0,
        );
      }
      if (typeof modeMass.factorZ === 'object') {
        modeMass.sumZ = modeMass.factorZ.reduce(
          (sum, current) => sum + current,
          0,
        );
      }
      modeMass.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyModeMass') {
    if (!isNaN(Number(lineArray[0]))) {
      if (typeof modeMass.modeID === 'object') {
        modeMass.modeID.push(Number(lineArray[0]));
      }
      if (typeof modeMass.factorX === 'object') {
        modeMass.factorX.push(Number(lineArray[1]));
      }
      if (typeof modeMass.factorY === 'object') {
        modeMass.factorY.push(Number(lineArray[3]));
      }
      if (typeof modeMass.factorZ === 'object') {
        modeMass.factorZ.push(Number(lineArray[5]));
      }
    }
  }

  return modeMass;
}

export function extractSeismicForce(
  lineArray: string[],
  seismicForce: ISeismicForce,
): ISeismicForce {
  if (lineArray[0] + lineArray[1] + lineArray[2] === '各层X方向的作用力') {
    flag = 'keySeismicForceX';
  } else if (
    lineArray[0] + lineArray[1] + lineArray[2] ===
    '抗震规范5.2.5条要求的X向楼层最小剪重比'
  ) {
    flag = '';
  } else if (
    lineArray[0] + lineArray[1] + lineArray[2] ===
    '各层Y方向的作用力'
  ) {
    flag = 'keySeismicForceY';
  } else if (
    lineArray[0] + lineArray[1] + lineArray[2] ===
    '抗震规范5.2.5条要求的Y向楼层最小剪重比'
  ) {
    if (flag === 'keySeismicForceY') {
      seismicForce.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keySeismicForceX') {
    if (!isNaN(Number(lineArray[0]))) {
      if (typeof seismicForce.storeyID === 'object') {
        seismicForce.storeyID.push(Number(lineArray[0]));
      }
      if (typeof seismicForce.towerID === 'object') {
        seismicForce.towerID.push(Number(lineArray[1]));
      }
      if (typeof seismicForce.forceX === 'object') {
        seismicForce.forceX.push(Number(lineArray[2]));
      }
      if (typeof seismicForce.shearX === 'object') {
        seismicForce.shearX.push(Number(lineArray[3]));
      }
      if (typeof seismicForce.momentX === 'object') {
        seismicForce.momentX.push(Number(lineArray[5]));
      }
      if (typeof seismicForce.shearWeiightRatioX === 'object') {
        seismicForce.shearWeiightRatioX.push(Number(lineArray[4]));
      }
    }
  } else if (flag === 'keySeismicForceY') {
    if (!isNaN(Number(lineArray[0]))) {
      if (typeof seismicForce.forceY === 'object') {
        seismicForce.forceY.push(Number(lineArray[2]));
      }
      if (typeof seismicForce.shearY === 'object') {
        seismicForce.shearY.push(Number(lineArray[3]));
      }
      if (typeof seismicForce.momentY === 'object') {
        seismicForce.momentY.push(Number(lineArray[5]));
      }
      if (typeof seismicForce.shearWeiightRatioY === 'object') {
        seismicForce.shearWeiightRatioY.push(Number(lineArray[4]));
      }
    }
  }

  return seismicForce;
}

export function extractMode(lineArray: string[], mode: IMode): IMode {
  if (!isNaN(Number(lineArray[0]))) {
    if (typeof mode.modeID === 'object') {
      mode.modeID.push(Number(lineArray[0]));
    }
    if (typeof mode.period === 'object') {
      mode.period.push(Number(lineArray[1]));
    }
    if (typeof mode.angle === 'object') {
      mode.angle.push(Number(lineArray[2]));
    }
    if (typeof mode.factorX === 'object') {
      mode.factorX.push(Number(lineArray[4]));
    }
    if (typeof mode.factorY === 'object') {
      mode.factorY.push(Number(lineArray[5]));
    }
    if (typeof mode.factorZ === 'object') {
      mode.factorZ.push(Number(lineArray[6]));
    }
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
