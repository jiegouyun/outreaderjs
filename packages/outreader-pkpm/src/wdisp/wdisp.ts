import {
  hashFile,
  IDispRatio,
  IDrift,
  IWindDriftDisp,
  IWdisp,
  readLineByLine,
} from '@outreader/core';
import fs from 'fs';
import path from 'path';

// Define flag
let FLAG: string;
let INFLAG: boolean = false;

export async function readWdispOutput(
  dir: string,
): Promise<IWdisp | undefined> {
  const file = path.join(dir, 'WDISP.OUT');
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
    driftCrossWindXP: {
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
    driftCrossWindXN: {
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
    driftCrossWindYP: {
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
    driftCrossWindYN: {
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

    // Extract driftCrossWindXP{}
    // if (!wdisp.driftCrossWindXP.allExtracted) {
    //   wdisp.driftCrossWindXP = extractDriftCrossWindXP(
    //     lineArray,
    //     wdisp.driftCrossWindXP,
    //   );
    // }

    // Extract driftWindYP{}
    if (!wdisp.driftWindYP.allExtracted) {
      wdisp.driftWindYP = extractDriftWindYP(lineArray, wdisp.driftWindYP);
    }

    // Extract driftCrossWindYP{}
    // if (!wdisp.driftCrossWindYP.allExtracted) {
    //   wdisp.driftCrossWindYP = extractDriftCrossWindYP(
    //     lineArray,
    //     wdisp.driftCrossWindYP,
    //   );
    // }

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
  if (lineArray[2] + lineArray[3] === 'X方向地震作用下的楼层最大位移') {
    FLAG = 'keyDriftSeismicX';
  } else if (lineArray[0] === 'X方向最大层间位移角') {
    if (FLAG === 'keyDriftSeismicX') {
      loadCaseDrift.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keyDriftSeismicX') {
    loadCaseDrift = extractDrift(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftSeismicTwoWayX(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (lineArray[2] + lineArray[3] === 'X双向地震作用下的楼层最大位移') {
    FLAG = 'keyDriftSeismicTwoWayX';
  } else if (lineArray[0] === 'X方向最大层间位移角') {
    if (FLAG === 'keyDriftSeismicTwoWayX') {
      loadCaseDrift.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keyDriftSeismicTwoWayX') {
    loadCaseDrift = extractDrift(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftSeismicXEccP(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (lineArray[2] + lineArray[3] === 'X+偶然偏心地震作用下的楼层最大位移') {
    FLAG = 'keydriftSeismicXEccP';
  } else if (lineArray[0] === 'X方向最大层间位移角') {
    if (FLAG === 'keydriftSeismicXEccP') {
      loadCaseDrift.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keydriftSeismicXEccP') {
    loadCaseDrift = extractDrift(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftSeismicXEccN(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (lineArray[2] + lineArray[3] === 'X-偶然偏心地震作用下的楼层最大位移') {
    FLAG = 'keydriftSeismicXEccN';
  } else if (lineArray[0] === 'X方向最大层间位移角') {
    if (FLAG === 'keydriftSeismicXEccN') {
      loadCaseDrift.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keydriftSeismicXEccN') {
    loadCaseDrift = extractDrift(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftSeismicY(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (lineArray[2] + lineArray[3] === 'Y方向地震作用下的楼层最大位移') {
    FLAG = 'keyDriftSeismicY';
  } else if (lineArray[0] === 'Y方向最大层间位移角') {
    if (FLAG === 'keyDriftSeismicY') {
      loadCaseDrift.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keyDriftSeismicY') {
    loadCaseDrift = extractDrift(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftSeismicTwoWayY(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (lineArray[2] + lineArray[3] === 'Y双向地震作用下的楼层最大位移') {
    FLAG = 'keyDriftSeismicTwoWayY';
  } else if (lineArray[0] === 'Y方向最大层间位移角') {
    if (FLAG === 'keyDriftSeismicTwoWayY') {
      loadCaseDrift.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keyDriftSeismicTwoWayY') {
    loadCaseDrift = extractDrift(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftSeismicYEccP(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (lineArray[2] + lineArray[3] === 'Y+偶然偏心地震作用下的楼层最大位移') {
    FLAG = 'keydriftSeismicYEccP';
  } else if (lineArray[0] === 'Y方向最大层间位移角') {
    if (FLAG === 'keydriftSeismicYEccP') {
      loadCaseDrift.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keydriftSeismicYEccP') {
    loadCaseDrift = extractDrift(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftSeismicYEccN(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (lineArray[2] + lineArray[3] === 'Y-偶然偏心地震作用下的楼层最大位移') {
    FLAG = 'keydriftSeismicYEccN';
  } else if (lineArray[0] === 'Y方向最大层间位移角') {
    if (FLAG === 'keydriftSeismicYEccN') {
      loadCaseDrift.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keydriftSeismicYEccN') {
    loadCaseDrift = extractDrift(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

export function extractDriftWindXP(
  lineArray: string[],
  loadCaseDrift: IWindDriftDisp,
): IWindDriftDisp {
  if (lineArray[2] + lineArray[3] === 'X方向风荷载作用下的楼层最大位移') {
    FLAG = 'keyDriftWindXP';
  } else if (lineArray[0] === 'X方向最大层间位移角') {
    if (FLAG === 'keyDriftWindXP') {
      loadCaseDrift.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keyDriftWindXP') {
    loadCaseDrift = extractWindDriftDisp(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

// export function extractDriftCrossWindXP(
//   lineArray: string[],
//   loadCaseDrift: IWindDriftDisp,
// ): IWindDriftDisp {
//   if (
//     lineArray[2] + lineArray[3] === 'X方向风荷载作用下的楼层最大位移'
//   ) {
//     FLAG = 'keyDriftCrossWindXP';
//   } else if (lineArray[0] === 'X方向最大层间位移角') {
//     if (FLAG === 'keyDriftCrossWindXP') {
//       loadCaseDrift.allExtracted = true;
//     }

//     FLAG = '';
//   }

//   if (FLAG === 'keyDriftCrossWindXP') {
//     loadCaseDrift = extractWindDriftDisp(lineArray, loadCaseDrift);
//   }

//   return loadCaseDrift;
// }

export function extractDriftWindYP(
  lineArray: string[],
  loadCaseDrift: IWindDriftDisp,
): IWindDriftDisp {
  if (lineArray[2] + lineArray[3] === 'Y方向风荷载作用下的楼层最大位移') {
    FLAG = 'keyDriftWindYP';
  } else if (lineArray[0] === 'Y方向最大层间位移角') {
    if (FLAG === 'keyDriftWindYP') {
      loadCaseDrift.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keyDriftWindYP') {
    loadCaseDrift = extractWindDriftDisp(lineArray, loadCaseDrift);
  }

  return loadCaseDrift;
}

// export function extractDriftCrossWindYP(
//   lineArray: string[],
//   loadCaseDrift: IWindDriftDisp,
// ): IWindDriftDisp {
//   if (
//     lineArray[2] + lineArray[3] === 'Y方向风荷载作用下的楼层最大位移'
//   ) {
//     FLAG = 'keyDriftCrossWindYP';
//   } else if (lineArray[0] === 'Y方向最大层间位移角') {
//     if (FLAG === 'keyDriftCrossWindYP') {
//       loadCaseDrift.allExtracted = true;
//     }

//     FLAG = '';
//   }

//   if (FLAG === 'keyDriftCrossWindYP') {
//     loadCaseDrift = extractWindDriftDisp(lineArray, loadCaseDrift);
//   }

//   return loadCaseDrift;
// }

export function extractRatioSeismicX(
  lineArray: string[],
  loadCaseRatio: IDispRatio,
): IDispRatio {
  if (
    lineArray[2] + lineArray[3] ===
    'X方向地震作用规定水平力下的楼层最大位移'
  ) {
    FLAG = 'keyRatioSeismicX';
  } else if (lineArray[0] === 'X方向最大位移与层平均位移的比值') {
    if (FLAG === 'keyRatioSeismicX') {
      loadCaseRatio.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keyRatioSeismicX') {
    loadCaseRatio = extractRatio(lineArray, loadCaseRatio);
  }

  return loadCaseRatio;
}

export function extractRatioSeismicXEccP(
  lineArray: string[],
  loadCaseRatio: IDispRatio,
): IDispRatio {
  if (lineArray[2] === 'X+偶然偏心地震作用规定水平力下的楼层最大位移') {
    FLAG = 'keyRatioSeismicXEccP';
  } else if (lineArray[0] === 'X方向最大位移与层平均位移的比值') {
    if (FLAG === 'keyRatioSeismicXEccP') {
      loadCaseRatio.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keyRatioSeismicXEccP') {
    loadCaseRatio = extractRatio(lineArray, loadCaseRatio);
  }

  return loadCaseRatio;
}

export function extractRatioSeismicXEccN(
  lineArray: string[],
  loadCaseRatio: IDispRatio,
): IDispRatio {
  if (lineArray[2] === 'X-偶然偏心地震作用规定水平力下的楼层最大位移') {
    FLAG = 'keyRatioSeismicXEccN';
  } else if (lineArray[0] === 'X方向最大位移与层平均位移的比值') {
    if (FLAG === 'keyRatioSeismicXEccN') {
      loadCaseRatio.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keyRatioSeismicXEccN') {
    loadCaseRatio = extractRatio(lineArray, loadCaseRatio);
  }

  return loadCaseRatio;
}

export function extractRatioSeismicY(
  lineArray: string[],
  loadCaseRatio: IDispRatio,
): IDispRatio {
  if (
    lineArray[2] + lineArray[3] ===
    'Y方向地震作用规定水平力下的楼层最大位移'
  ) {
    FLAG = 'keyRatioSeismicY';
  } else if (lineArray[0] === 'Y方向最大位移与层平均位移的比值') {
    if (FLAG === 'keyRatioSeismicY') {
      loadCaseRatio.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keyRatioSeismicY') {
    loadCaseRatio = extractRatio(lineArray, loadCaseRatio);
  }

  return loadCaseRatio;
}

export function extractRatioSeismicYEccP(
  lineArray: string[],
  loadCaseRatio: IDispRatio,
): IDispRatio {
  if (lineArray[2] === 'Y+偶然偏心地震作用规定水平力下的楼层最大位移') {
    FLAG = 'keyRatioSeismicYEccP';
  } else if (lineArray[0] === 'Y方向最大位移与层平均位移的比值') {
    if (FLAG === 'keyRatioSeismicYEccP') {
      loadCaseRatio.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keyRatioSeismicYEccP') {
    loadCaseRatio = extractRatio(lineArray, loadCaseRatio);
  }

  return loadCaseRatio;
}

export function extractRatioSeismicYEccN(
  lineArray: string[],
  loadCaseRatio: IDispRatio,
): IDispRatio {
  if (lineArray[2] === 'Y-偶然偏心地震作用规定水平力下的楼层最大位移') {
    FLAG = 'keyRatioSeismicYEccN';
  } else if (lineArray[0] === 'Y方向最大位移与层平均位移的比值') {
    if (FLAG === 'keyRatioSeismicYEccN') {
      loadCaseRatio.allExtracted = true;
    }

    FLAG = '';
  }

  if (FLAG === 'keyRatioSeismicYEccN') {
    loadCaseRatio = extractRatio(lineArray, loadCaseRatio);
  }

  return loadCaseRatio;
}

export function extractDrift(
  lineArray: string[],
  loadCaseDrift: IDrift,
): IDrift {
  if (!isNaN(Number(lineArray[0]))) {
    if (lineArray.length === 6 && !INFLAG) {
      loadCaseDrift.storeyID.push(Number(lineArray[0]));
      loadCaseDrift.towerID.push(Number(lineArray[1]));
      loadCaseDrift.displacement.push(Number(lineArray[4]));
      INFLAG = true;
    } else if (lineArray.length === 5 && !INFLAG) {
      //多塔
      loadCaseDrift.storeyID.push(
        loadCaseDrift.storeyID[loadCaseDrift.storeyID.length - 1],
      );
      loadCaseDrift.towerID.push(Number(lineArray[0]));
      loadCaseDrift.displacement.push(Number(lineArray[3]));
      INFLAG = true;
    } else if (INFLAG) {
      loadCaseDrift.drift.push(Number(lineArray[4]));
      INFLAG = false;
    }
  }

  return loadCaseDrift;
}

export function extractWindDriftDisp(
  lineArray: string[],
  loadCaseDrift: IWindDriftDisp,
): IWindDriftDisp {
  if (!isNaN(Number(lineArray[0]))) {
    if (lineArray.length === 7 && !INFLAG) {
      loadCaseDrift.storeyID.push(Number(lineArray[0]));
      loadCaseDrift.towerID.push(Number(lineArray[1]));
      loadCaseDrift.displacement.push(Number(lineArray[4]));
      loadCaseDrift.ratio.push(Number(lineArray[5]));
      INFLAG = true;
    } else if (lineArray.length === 6 && !INFLAG) {
      //多塔
      loadCaseDrift.storeyID.push(
        loadCaseDrift.storeyID[loadCaseDrift.storeyID.length - 1],
      );
      loadCaseDrift.towerID.push(Number(lineArray[0]));
      loadCaseDrift.displacement.push(Number(lineArray[3]));
      loadCaseDrift.ratio.push(Number(lineArray[4]));
      INFLAG = true;
    } else if (INFLAG) {
      loadCaseDrift.ratioD.push(Number(lineArray[3]));
      loadCaseDrift.drift.push(Number(lineArray[5]));
      INFLAG = false;
    }
  }

  return loadCaseDrift;
}

export function extractRatio(
  lineArray: string[],
  loadCaseRatio: IDispRatio,
): IDispRatio {
  if (!isNaN(Number(lineArray[0]))) {
    if (lineArray.length === 7 && !INFLAG) {
      loadCaseRatio.storeyID.push(Number(lineArray[0]));
      loadCaseRatio.towerID.push(Number(lineArray[1]));
      loadCaseRatio.ratio.push(Number(lineArray[5]));
      INFLAG = true;
    } else if (lineArray.length === 6 && !INFLAG) {
      //多塔
      loadCaseRatio.storeyID.push(
        loadCaseRatio.storeyID[loadCaseRatio.storeyID.length - 1],
      );
      loadCaseRatio.towerID.push(Number(lineArray[0]));
      loadCaseRatio.ratio.push(Number(lineArray[4]));
      INFLAG = true;
    } else if (INFLAG) {
      loadCaseRatio.ratioD.push(Number(lineArray[3]));
      INFLAG = false;
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
  const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa50-9\u2150-\u218f\.\-\+\《\》\*\，\_]+/g;
  return line.match(regexp) || [];
}
