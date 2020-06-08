import {
  hashFile,
  IDispRatio,
  IDrift,
  IWdisp,
  IWindDriftDiap,
  readLineByLine,
} from '@outreader/core';
import fs from 'fs';
import path from 'path';

// Define flag
let flag: string;

export async function readWdispOutput(
  dir: string,
): Promise<IWdisp | undefined> {
  const file = path.join(dir, 'wdisp.out');
  if (!fs.existsSync(file)) {
    console.error('cannot find file', file);
    return;
  }
  let wdisp: IWdisp = {
    hash: hashFile(file),
    driftSeismicX: {
      storeyID: [],
      towerID: [],
      displacement: [],
      drift: [],
      allExtracted: false,
    },
    driftSeismicTwoWayX: {
      storeyID: [],
      towerID: [],
      displacement: [],
      drift: [],
      allExtracted: false,
    },
    driftSeismicXEccP: {
      storeyID: [],
      towerID: [],
      displacement: [],
      drift: [],
      allExtracted: false,
    },
    driftSeismicXEccN: {
      storeyID: [],
      towerID: [],
      displacement: [],
      drift: [],
      allExtracted: false,
    },
    driftSeismicY: {
      storeyID: [],
      towerID: [],
      displacement: [],
      drift: [],
      allExtracted: false,
    },
    driftSeismicTwoWayY: {
      storeyID: [],
      towerID: [],
      displacement: [],
      drift: [],
      allExtracted: false,
    },
    driftSeismicYEccP: {
      storeyID: [],
      towerID: [],
      displacement: [],
      drift: [],
      allExtracted: false,
    },
    driftSeismicYEccN: {
      storeyID: [],
      towerID: [],
      displacement: [],
      drift: [],
      allExtracted: false,
    },
    driftWindXP: {
      storeyID: [],
      towerID: [],
      displacement: [],
      drift: [],
      ratio: [],
      ratioD: [],
      allExtracted: false,
    },
    driftWindXN: {
      storeyID: [],
      towerID: [],
      displacement: [],
      drift: [],
      ratio: [],
      ratioD: [],
      allExtracted: false,
    },
    driftWindYP: {
      storeyID: [],
      towerID: [],
      displacement: [],
      drift: [],
      ratio: [],
      ratioD: [],
      allExtracted: false,
    },
    driftWindYN: {
      storeyID: [],
      towerID: [],
      displacement: [],
      drift: [],
      ratio: [],
      ratioD: [],
      allExtracted: false,
    },
    ratioSeismicX: {
      storeyID: [],
      towerID: [],
      ratio: [],
      ratioD: [],
      allExtracted: false,
    },
    ratioSeismicXEccP: {
      storeyID: [],
      towerID: [],
      ratio: [],
      ratioD: [],
      allExtracted: false,
    },
    ratioSeismicXEccN: {
      storeyID: [],
      towerID: [],
      ratio: [],
      ratioD: [],
      allExtracted: false,
    },
    ratioSeismicY: {
      storeyID: [],
      towerID: [],
      ratio: [],
      ratioD: [],
      allExtracted: false,
    },
    ratioSeismicYEccP: {
      storeyID: [],
      towerID: [],
      ratio: [],
      ratioD: [],
      allExtracted: false,
    },
    ratioSeismicYEccN: {
      storeyID: [],
      towerID: [],
      ratio: [],
      ratioD: [],
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

    // Extract driftSeismicX{}
    if (!wdisp.driftSeismicX.allExtracted) {
      wdisp.driftSeismicX = extractDriftSeismicX(
        lineArray,
        wdisp.driftSeismicX,
      );
    }

    // Extract driftSeismicTwoWayX{}
    if (!wdisp.driftSeismicTwoWayX.allExtracted) {
      wdisp.driftSeismicTwoWayX = extractDriftSeismicTwoWayX(
        lineArray,
        wdisp.driftSeismicTwoWayX,
      );
    }

    // Extract driftSeismicXEccP{}
    if (!wdisp.driftSeismicXEccP.allExtracted) {
      wdisp.driftSeismicXEccP = extractDriftSeismicXEccP(
        lineArray,
        wdisp.driftSeismicXEccP,
      );
    }

    // Extract driftSeismicXEccN{}
    if (!wdisp.driftSeismicXEccN.allExtracted) {
      wdisp.driftSeismicXEccN = extractDriftSeismicXEccN(
        lineArray,
        wdisp.driftSeismicXEccN,
      );
    }

    // Extract driftSeismicY{}
    if (!wdisp.driftSeismicY.allExtracted) {
      wdisp.driftSeismicY = extractDriftSeismicY(
        lineArray,
        wdisp.driftSeismicY,
      );
    }

    // Extract driftSeismicTwoWayY{}
    if (!wdisp.driftSeismicTwoWayY.allExtracted) {
      wdisp.driftSeismicTwoWayY = extractDriftSeismicTwoWayY(
        lineArray,
        wdisp.driftSeismicTwoWayY,
      );
    }

    // Extract driftSeismicYEccP{}
    if (!wdisp.driftSeismicYEccP.allExtracted) {
      wdisp.driftSeismicYEccP = extractDriftSeismicYEccP(
        lineArray,
        wdisp.driftSeismicYEccP,
      );
    }

    // Extract driftSeismicYEccN{}
    if (!wdisp.driftSeismicYEccN.allExtracted) {
      wdisp.driftSeismicYEccN = extractDriftSeismicYEccN(
        lineArray,
        wdisp.driftSeismicYEccN,
      );
    }

    // Extract driftWindXP{}
    if (!wdisp.driftWindXP.allExtracted) {
      wdisp.driftWindXP = extractDriftWindXP(lineArray, wdisp.driftWindXP);
    }

    // Extract driftWindXN{}
    if (!wdisp.driftWindXN.allExtracted) {
      wdisp.driftWindXN = extractDriftWindXN(lineArray, wdisp.driftWindXN);
    }

    // Extract driftWindYP{}
    if (!wdisp.driftWindYP.allExtracted) {
      wdisp.driftWindYP = extractDriftWindYP(lineArray, wdisp.driftWindYP);
    }

    // Extract driftWindYN{}
    if (!wdisp.driftWindYN.allExtracted) {
      wdisp.driftWindYN = extractDriftWindYN(lineArray, wdisp.driftWindYN);
    }

    // Extract ratioSeismicX{}
    if (!wdisp.ratioSeismicX.allExtracted) {
      wdisp.ratioSeismicX = extractRatioSeismicX(
        lineArray,
        wdisp.ratioSeismicX,
      );
    }

    // Extract atioSeismicXEccP{}
    if (!wdisp.ratioSeismicXEccP.allExtracted) {
      wdisp.ratioSeismicXEccP = extractRatioSeismicXEccP(
        lineArray,
        wdisp.ratioSeismicXEccP,
      );
    }

    // Extract ratioSeismicXEccN{}
    if (!wdisp.ratioSeismicXEccN.allExtracted) {
      wdisp.ratioSeismicXEccN = extractRatioSeismicXEccN(
        lineArray,
        wdisp.ratioSeismicXEccN,
      );
    }

    // Extract ratioSeismicY{}
    if (!wdisp.ratioSeismicY.allExtracted) {
      wdisp.ratioSeismicY = extractRatioSeismicY(
        lineArray,
        wdisp.ratioSeismicY,
      );
    }

    // Extract ratioSeismicYEccP{}
    if (!wdisp.ratioSeismicYEccP.allExtracted) {
      wdisp.ratioSeismicYEccP = extractRatioSeismicYEccP(
        lineArray,
        wdisp.ratioSeismicYEccP,
      );
    }

    // Extract ratioSeismicYEccN{}
    if (!wdisp.ratioSeismicYEccN.allExtracted) {
      wdisp.ratioSeismicYEccN = extractRatioSeismicYEccN(
        lineArray,
        wdisp.ratioSeismicYEccN,
      );
    }
  });

  return wdisp;
}

export function extractDriftSeismicX(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (lineArray[1] === 'X' && lineArray[2] === '方向地震作用下的楼层最大位移') {
    flag = 'keyDriftSeismicX';
  } else if (lineArray[0] === 'X向最大层间位移角') {
    if (flag === 'keyDriftSeismicX') {
      loadCaseDrift.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyDriftSeismicX') {
    loadCaseDrift = extractDrift(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftSeismicTwoWayX(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (lineArray[1] === 'X' && lineArray[2] === '双向地震作用下的楼层最大位移') {
    flag = 'keyDriftSeismicTwoWayX';
  } else if (lineArray[0] === 'X向最大层间位移角') {
    if (flag === 'keyDriftSeismicTwoWayX') {
      loadCaseDrift.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyDriftSeismicTwoWayX') {
    loadCaseDrift = extractDrift(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftSeismicXEccP(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (
    lineArray[1] === 'X+' &&
    lineArray[2] === '偶然偏心地震作用下的楼层最大位移'
  ) {
    flag = 'keydriftSeismicXEccP';
  } else if (lineArray[0] === 'X向最大层间位移角') {
    if (flag === 'keydriftSeismicXEccP') {
      loadCaseDrift.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keydriftSeismicXEccP') {
    loadCaseDrift = extractDrift(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftSeismicXEccN(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (
    lineArray[1] === 'X-' &&
    lineArray[2] === '偶然偏心地震作用下的楼层最大位移'
  ) {
    flag = 'keydriftSeismicXEccN';
  } else if (lineArray[0] === 'X向最大层间位移角') {
    if (flag === 'keydriftSeismicXEccN') {
      loadCaseDrift.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keydriftSeismicXEccN') {
    loadCaseDrift = extractDrift(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftSeismicY(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (lineArray[1] === 'Y' && lineArray[2] === '方向地震作用下的楼层最大位移') {
    flag = 'keyDriftSeismicY';
  } else if (lineArray[0] === 'Y向最大层间位移角') {
    if (flag === 'keyDriftSeismicY') {
      loadCaseDrift.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyDriftSeismicY') {
    loadCaseDrift = extractDrift(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftSeismicTwoWayY(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (lineArray[1] === 'Y' && lineArray[2] === '双向地震作用下的楼层最大位移') {
    flag = 'keyDriftSeismicTwoWayY';
  } else if (lineArray[0] === 'Y向最大层间位移角') {
    if (flag === 'keyDriftSeismicTwoWayY') {
      loadCaseDrift.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyDriftSeismicTwoWayY') {
    loadCaseDrift = extractDrift(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftSeismicYEccP(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (
    lineArray[1] === 'Y+' &&
    lineArray[2] === '偶然偏心地震作用下的楼层最大位移'
  ) {
    flag = 'keydriftSeismicYEccP';
  } else if (lineArray[0] === 'Y向最大层间位移角') {
    if (flag === 'keydriftSeismicYEccP') {
      loadCaseDrift.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keydriftSeismicYEccP') {
    loadCaseDrift = extractDrift(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftSeismicYEccN(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (
    lineArray[1] === 'Y-' &&
    lineArray[2] === '偶然偏心地震作用下的楼层最大位移'
  ) {
    flag = 'keydriftSeismicYEccN';
  } else if (lineArray[0] === 'Y向最大层间位移角') {
    if (flag === 'keydriftSeismicYEccN') {
      loadCaseDrift.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keydriftSeismicYEccN') {
    loadCaseDrift = extractDrift(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftWindXP(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (
    lineArray[1] === '+X' &&
    lineArray[2] === '方向风荷载作用下的楼层最大位移'
  ) {
    flag = 'keyDriftWindXP';
  } else if (lineArray[0] === 'X向最大层间位移角') {
    if (flag === 'keyDriftWindXP') {
      loadCaseDrift.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyDriftWindXP') {
    loadCaseDrift = extractWindDriftDisp(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftWindXN(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (
    lineArray[1] === '-X' &&
    lineArray[2] === '方向风荷载作用下的楼层最大位移'
  ) {
    flag = 'keyDriftWindXN';
  } else if (lineArray[0] === 'X向最大层间位移角') {
    if (flag === 'keyDriftWindXN') {
      loadCaseDrift.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyDriftWindXN') {
    loadCaseDrift = extractWindDriftDisp(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftWindYP(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (
    lineArray[1] === '+Y' &&
    lineArray[2] === '方向风荷载作用下的楼层最大位移'
  ) {
    flag = 'keyDriftWindYP';
  } else if (lineArray[0] === 'Y向最大层间位移角') {
    if (flag === 'keyDriftWindYP') {
      loadCaseDrift.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyDriftWindYP') {
    loadCaseDrift = extractWindDriftDisp(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftWindYN(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (
    lineArray[1] === '-Y' &&
    lineArray[2] === '方向风荷载作用下的楼层最大位移'
  ) {
    flag = 'keyDriftWindYN';
  } else if (lineArray[0] === 'Y向最大层间位移角') {
    if (flag === 'keyDriftWindYN') {
      loadCaseDrift.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyDriftWindYN') {
    loadCaseDrift = extractWindDriftDisp(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractRatioSeismicX(
  lineArray: string[],
  loadCaseRatio: IDispRatio,
): IDispRatio {
  if (
    lineArray[1] === 'X' &&
    lineArray[2] === '方向规定水平力作用下的楼层最大位移'
  ) {
    flag = 'keyRatioSeismicX';
  } else if (lineArray[0] === 'X方向最大位移与层平均位移的比值') {
    if (flag === 'keyRatioSeismicX') {
      loadCaseRatio.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyRatioSeismicX') {
    loadCaseRatio = extractRatio(lineArray, loadCaseRatio);
  }

  return loadCaseRatio;
}

export function extractRatioSeismicXEccP(
  lineArray: string[],
  loadCaseRatio: IDispRatio,
): IDispRatio {
  if (
    lineArray[1] === 'X+' &&
    lineArray[2] === '偶然偏心规定水平力作用下的楼层最大位移'
  ) {
    flag = 'keyRatioSeismicXEccP';
  } else if (lineArray[0] === 'X方向最大位移与层平均位移的比值') {
    if (flag === 'keyRatioSeismicXEccP') {
      loadCaseRatio.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyRatioSeismicXEccP') {
    loadCaseRatio = extractRatio(lineArray, loadCaseRatio);
  }

  return loadCaseRatio;
}

export function extractRatioSeismicXEccN(
  lineArray: string[],
  loadCaseRatio: IDispRatio,
): IDispRatio {
  if (
    lineArray[1] === 'X-' &&
    lineArray[2] === '偶然偏心规定水平力作用下的楼层最大位移'
  ) {
    flag = 'keyRatioSeismicXEccN';
  } else if (lineArray[0] === 'X方向最大位移与层平均位移的比值') {
    if (flag === 'keyRatioSeismicXEccN') {
      loadCaseRatio.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyRatioSeismicXEccN') {
    loadCaseRatio = extractRatio(lineArray, loadCaseRatio);
  }

  return loadCaseRatio;
}

export function extractRatioSeismicY(
  lineArray: string[],
  loadCaseRatio: IDispRatio,
): IDispRatio {
  if (
    lineArray[1] === 'Y' &&
    lineArray[2] === '方向规定水平力作用下的楼层最大位移'
  ) {
    flag = 'keyRatioSeismicY';
  } else if (lineArray[0] === 'Y方向最大位移与层平均位移的比值') {
    if (flag === 'keyRatioSeismicY') {
      loadCaseRatio.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyRatioSeismicY') {
    loadCaseRatio = extractRatio(lineArray, loadCaseRatio);
  }

  return loadCaseRatio;
}

export function extractRatioSeismicYEccP(
  lineArray: string[],
  loadCaseRatio: IDispRatio,
): IDispRatio {
  if (
    lineArray[1] === 'Y+' &&
    lineArray[2] === '偶然偏心规定水平力作用下的楼层最大位移'
  ) {
    flag = 'keyRatioSeismicYEccP';
  } else if (lineArray[0] === 'Y方向最大位移与层平均位移的比值') {
    if (flag === 'keyRatioSeismicYEccP') {
      loadCaseRatio.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyRatioSeismicYEccP') {
    loadCaseRatio = extractRatio(lineArray, loadCaseRatio);
  }

  return loadCaseRatio;
}

export function extractRatioSeismicYEccN(
  lineArray: string[],
  loadCaseRatio: IDispRatio,
): IDispRatio {
  if (
    lineArray[1] === 'Y-' &&
    lineArray[2] === '偶然偏心规定水平力作用下的楼层最大位移'
  ) {
    flag = 'keyRatioSeismicYEccN';
  } else if (lineArray[0] === 'Y方向最大位移与层平均位移的比值') {
    if (flag === 'keyRatioSeismicYEccN') {
      loadCaseRatio.allExtracted = true;
    }

    flag = '';
  }

  if (flag === 'keyRatioSeismicYEccN') {
    loadCaseRatio = extractRatio(lineArray, loadCaseRatio);
  }

  return loadCaseRatio;
}

export function extractDrift(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (!isNaN(Number(lineArray[0]))) {
    if (Number(lineArray[0]) < 1000000) {
      if (typeof loadCaseDrift.storeyID === 'object') {
        loadCaseDrift.storeyID.push(Number(lineArray[0]));
      }
      if (typeof loadCaseDrift.towerID === 'object') {
        loadCaseDrift.towerID.push(Number(lineArray[1]));
      }
    } else {
      if (typeof loadCaseDrift.displacement === 'object') {
        loadCaseDrift.displacement.push(Number(lineArray[1]));
      }
      if (typeof loadCaseDrift.drift === 'object') {
        loadCaseDrift.drift.push(Number(lineArray[4]));
      }
    }
  }

  return loadCaseDrift;
}

export function extractWindDriftDisp(
  lineArray: string[],
  loadCaseDrift: IWindDriftDiap,
): IWindDriftDiap {
  if (!isNaN(Number(lineArray[0]))) {
    if (Number(lineArray[0]) < 1000000) {
      if (typeof loadCaseDrift.storeyID === 'object') {
        loadCaseDrift.storeyID.push(Number(lineArray[0]));
      }
      if (typeof loadCaseDrift.towerID === 'object') {
        loadCaseDrift.towerID.push(Number(lineArray[1]));
      }
      if (typeof loadCaseDrift.ratio === 'object') {
        loadCaseDrift.ratio.push(Number(lineArray[5]));
      }
    } else {
      if (typeof loadCaseDrift.displacement === 'object') {
        loadCaseDrift.displacement.push(Number(lineArray[1]));
      }
      if (typeof loadCaseDrift.drift === 'object') {
        loadCaseDrift.drift.push(Number(lineArray[5]));
      }
      if (typeof loadCaseDrift.ratioD === 'object') {
        loadCaseDrift.ratioD.push(Number(lineArray[3]));
      }
    }
  }

  return loadCaseDrift;
}

export function extractRatio(
  lineArray: string[],
  loadCaseRatio: IDispRatio,
): IDispRatio {
  if (!isNaN(Number(lineArray[0]))) {
    if (Number(lineArray[0]) < 1000000) {
      if (typeof loadCaseRatio.storeyID === 'object') {
        loadCaseRatio.storeyID.push(Number(lineArray[0]));
      }
      if (typeof loadCaseRatio.towerID === 'object') {
        loadCaseRatio.towerID.push(Number(lineArray[1]));
      }
      if (typeof loadCaseRatio.ratio === 'object') {
        loadCaseRatio.ratio.push(Number(lineArray[5]));
      }
    } else {
      if (typeof loadCaseRatio.ratioD === 'object') {
        loadCaseRatio.ratioD.push(Number(lineArray[3]));
      }
    }
  }

  return loadCaseRatio;
}

/**
 * @description devide line string and return string array
 * @param line: original line string
 */
function lineToArray(line: string): string[] {
  // const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa5]+\d*\-?\d*|-?\d+\.?\d*[a-zA-Z]*\+?\d*/g;
  const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa50-9\u2150-\u218f\.\-\+\(\)\《\》\*\，\_]+/g;
  return line.match(regexp) || [];
}
