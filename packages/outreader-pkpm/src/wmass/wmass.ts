import {
  hashFile,
  IBasicInformation,
  ICalculationControl,
  IConstraintFloorStiffnessRatio,
  IGeneralInformation,
  IMassRatio,
  IOverturningCheck,
  ISeismicInformation,
  IShearCapacityCheck,
  IShearWeightRatioModify,
  IStableCheck,
  IStiffness,
  IStorey,
  ITower,
  IWeight,
  IWind,
  IWindComfort,
  IWindInformation,
  IWmass,
  readLineByLine,
} from '@outreader/core';
import path from 'path';
import fs from 'fs';

// Define flag
let FLAG: string;

export async function readWmassOutput(
  dir: string,
): Promise<IWmass | undefined> {
  const file = path.join(dir, 'WMASS.OUT');
  if (!fs.existsSync(file)) {
    console.error('cannot find file', file);
    return;
  }
  let wmass: IWmass = {
    hash: hashFile(file),
    basicInformation: { allExtracted: false },
    generalInformation: { allExtracted: false },
    calculationControl: { allExtracted: false },
    windInformation: { allExtracted: false },
    seismicInformation: { allExtracted: false },
    storey: {
      storeyID: [],
      towerID: [],
      attribute: [],
      height: [],
      heightToGround: [],
      area: [],
      wallSectionAreaX: [],
      wallSectionAreaY: [],
      allExtracted: false,
    },
    tower: {
      towerID: [],
      structuralSystem: [],
      allExtracted: false,
    },
    massRatio: {
      storeyID: [],
      towerID: [],
      ratio: [],
      storeyMass: [],
      massPerArea: [],
      massPerAreaRatio: [],
      allExtracted: false,
    },
    weight: { allExtracted: false },
    wind: {
      storeyID: [],
      towerID: [],
      forceAlongX: [],
      shearAlongX: [],
      momentAlongX: [],
      forceAlongY: [],
      shearAlongY: [],
      momentAlongY: [],
      forceCrossX: [],
      shearCrossX: [],
      momentCrossX: [],
      forceCrossY: [],
      shearCrossY: [],
      momentCrossY: [],
      allExtracted: false,
    },
    stiffness: {
      storeyID: [],
      towerID: [],
      ratx1: [],
      ratx2: [],
      rjx1: [],
      rjx3: [],
      raty1: [],
      raty2: [],
      rjy1: [],
      rjy3: [],
      rjz1: [],
      rjz3: [],
      weakStoreyFactor: [],
      allExtracted: false,
    },
    constraintFloorStiffnessRatio: { allExtracted: false },
    overturningCheck: { allExtracted: false },
    stableCheck: { allExtracted: false },
    shearWeightRatioModify: {
      storeyID: [],
      towerID: [],
      factorX: [],
      factorY: [],
      allExtracted: false,
    },
    windComfort: { allExtracted: false },
    shearCapacityCheck: {
      storeyID: [],
      towerID: [],
      capacityX: [],
      ratioX: [],
      capacityY: [],
      ratioY: [],
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

    // Extract basicInformation{}
    if (!wmass.basicInformation.allExtracted) {
      wmass.basicInformation = extractInformation(
        lineArray,
        wmass.basicInformation,
      );
    }

    // Extract generalInformation{}
    if (!wmass.generalInformation.allExtracted) {
      wmass.generalInformation = extractGeneralInformation(
        lineArray,
        wmass.generalInformation,
      );
    }

    // Extract windInformation{}
    if (!wmass.windInformation.allExtracted) {
      wmass.windInformation = extractWindInformation(
        lineArray,
        wmass.windInformation,
      );
    }

    // Extract seismicInformation{}
    if (!wmass.seismicInformation.allExtracted) {
      wmass.seismicInformation = extractSeismicInformation(
        lineArray,
        wmass.seismicInformation,
      );
    }

    // Extract calculationControl{}
    if (!wmass.calculationControl.allExtracted) {
      wmass.calculationControl = extractCalculationControl(
        lineArray,
        wmass.calculationControl,
      );
    }

    // Extract massRatio{} part1/2
    if (!wmass.massRatio.allExtracted) {
      wmass.massRatio = extractMassRatioPart1(lineArray, wmass.massRatio);
    }

    // Extract weight{}
    if (!wmass.weight.allExtracted) {
      wmass.weight = extractWeight(lineArray, wmass.weight);
    }

    // Extract storey[] part2/4
    if (!wmass.storey.allExtracted) {
      wmass.storey = extractStoreyPart2(lineArray, wmass.storey);
    }

    // Extract wind{}
    if (!wmass.wind.allExtracted && wmass.weight.allExtracted) {
      wmass.wind = extractWind(lineArray, wmass.wind);
    }

    // Extract storey[] part3/4
    if (!wmass.storey.allExtracted) {
      wmass.storey = extractStoreyPart3(lineArray, wmass.storey);
    }

    // Extract storey[] part4/4
    if (!wmass.storey.allExtracted) {
      wmass.storey = extractStoreyPart4(lineArray, wmass.storey);
    }

    // Extract massRatio{} part2/2
    if (!wmass.massRatio.allExtracted) {
      wmass.massRatio = extractMassRatioPart2(lineArray, wmass.massRatio);
    }

    // Extract stiffness{}
    if (!wmass.stiffness.allExtracted) {
      wmass.stiffness = extractStiffness(lineArray, wmass.stiffness);
    }

    // Extract overturningCheck{}
    if (!wmass.overturningCheck.allExtracted) {
      wmass.overturningCheck = extractOverturningCheck(
        lineArray,
        wmass.overturningCheck,
      );
    }

    // Extract windComfort{}
    if (!wmass.windComfort.allExtracted) {
      wmass.windComfort = extractWIndComfort(lineArray, wmass.windComfort);
    }

    // Extract stableCheck{}
    if (!wmass.stableCheck.allExtracted) {
      wmass.stableCheck = extractStableCheck(lineArray, wmass.stableCheck);
    }

    // Extract shearCapacityCheck{}
    if (!wmass.shearCapacityCheck.allExtracted) {
      wmass.shearCapacityCheck = extractShearCapacityCheck(
        lineArray,
        wmass.shearCapacityCheck,
      );
    }
  });

  return wmass;
}

export function extractInformation(
  lineArray: string[],
  basicInformation: IBasicInformation,
): IBasicInformation {
  if (lineArray[0].slice(0, 5) === 'SATWE') {
    basicInformation.software = lineArray[0];
    basicInformation.softwareVersion = lineArray[1];
  }
  switch (lineArray[0]) {
    case '工程名称':
      basicInformation.engineering = 'default';
      basicInformation.designer = 'default';
      basicInformation.calDate = lineArray[3];
      break;
    case '工程代号':
      basicInformation.engineeringCode = 'default';
      basicInformation.checker = 'default';
      basicInformation.allExtracted = true;
  }

  return basicInformation;
}

export function extractGeneralInformation(
  lineArray: string[],
  generalInformation: IGeneralInformation,
): IGeneralInformation {
  switch (lineArray[0]) {
    case '结构材料信息':
      generalInformation.structuralMaterial = lineArray[1];
      break;
    case '地下室层数':
      generalInformation.basement = Number(lineArray[2]);
      break;
    case '结构类别':
      generalInformation.structuralSystem = lineArray[1];
      break;
    case '裙房层数':
      generalInformation.podium = Number(lineArray[2]);
      break;
    case '转换层所在层号':
      generalInformation.transferStorey = Number(lineArray[2]);
      break;
    case '嵌固端所在层号':
      generalInformation.constraintFloor = Number(lineArray[2]);
      break;
    case '结构所在地区':
      generalInformation.location = lineArray[1];
      generalInformation.allExtracted = true;
  }

  return generalInformation;
}

export function extractWindInformation(
  lineArray: string[],
  windInformation: IWindInformation,
): IWindInformation {
  switch (lineArray[0]) {
    case '修正后的基本风压':
      windInformation.pressureModified = Number(lineArray[3]);
      break;
    case '风荷载作用下舒适度验算风压':
      windInformation.pressureComfort = Number(lineArray[3]);
      break;
    case '地面粗糙程度':
      windInformation.terrainRoughness = lineArray[1];
      break;
    case '风荷载作用下结构的阻尼比':
      windInformation.dampingRatio = Number(lineArray[2]);
      break;
    case '风荷载作用下舒适度验算阻尼比':
      windInformation.dampingRationComfort = Number(lineArray[2]);
      windInformation.allExtracted = true;
  }

  return windInformation;
}

export function extractSeismicInformation(
  lineArray: string[],
  seismicInformation: ISeismicInformation,
): ISeismicInformation {
  switch (lineArray[0]) {
    case '地震烈度':
      seismicInformation.intensity = lineArray[2];
      break;
    case '场地类别':
      seismicInformation.siteCategory = lineArray[2];
      break;
    case '设计地震分组':
      seismicInformation.group = lineArray[1];
      break;
    case '特征周期':
      seismicInformation.characteristicPeriod = Number(lineArray[2]);
      break;
    case '地震影响系数最大值':
      seismicInformation.maxSpectrumValue = Number(lineArray[2]);
      break;
    case '周期折减系数':
      seismicInformation.periodReductionFactor = Number(lineArray[2]);
      break;
    case '结构的阻尼比':
      seismicInformation.dampingRatio = Number(lineArray[2]);
      seismicInformation.allExtracted = true;
  }

  return seismicInformation;
}

export function extractCalculationControl(
  lineArray: string[],
  calculationControl: ICalculationControl,
): ICalculationControl {
  switch (lineArray[0]) {
    case '是否对全楼强制采用刚性楼板假定':
      calculationControl.rigidFloorAssumption = lineArray[1];
      break;
    case '地震工况连梁刚度折减系数':
      calculationControl.couplingBeamFactorSeismic = Number(lineArray[2]);
      break;
    case '风荷载工况连梁刚度折减系数':
      calculationControl.couplingBeamFactorWind = Number(lineArray[2]);
      calculationControl.allExtracted = true;
  }

  return calculationControl;
}

export function extractMassRatioPart1(
  lineArray: string[],
  massRatio: IMassRatio,
): IMassRatio {
  if (lineArray[0] === '各层的质量') {
    FLAG = 'keyMassRatio1';
  } else if (lineArray[0] === '活载产生的总质量') {
    FLAG = '';
  }

  if (FLAG === 'keyMassRatio1') {
    if (!isNaN(Number(lineArray[0]))) {
      if (lineArray[1].length < 5) {
        massRatio.storeyID.push(Number(lineArray[0]));
        massRatio.towerID.push(Number(lineArray[1]));
        massRatio.storeyMass.push(
          Number(lineArray[5]) + Number(lineArray[6]) + Number(lineArray[7]),
        );
        massRatio.ratio.push(Number(lineArray[8]));
      } else {
        // 多塔
        massRatio.storeyID.push(
          massRatio.storeyID[massRatio.storeyID.length - 1],
        );
        massRatio.towerID.push(Number(lineArray[0]));
        massRatio.storeyMass.push(
          Number(lineArray[4]) + Number(lineArray[5]) + Number(lineArray[6]),
        );
        massRatio.ratio.push(Number(lineArray[7]));
      }
    }
  }

  return massRatio;
}

export function extractWeight(lineArray: string[], weight: IWeight): IWeight {
  switch (lineArray[0]) {
    case '活载产生的总质量':
      weight.live = Number(lineArray[2]);
      break;
    case '恒载产生的总质量':
      weight.dead = Number(lineArray[2]);
      break;
    case '附加总质量':
      weight.super = Number(lineArray[2]);
      break;
    case '结构的总质量':
      weight.sum = Number(lineArray[2]);
      weight.allExtracted = true;
  }

  return weight;
}

export function extractStoreyPart2(
  lineArray: string[],
  storey: IStorey,
): IStorey {
  if (lineArray[0] === '各层构件数量') {
    FLAG = 'keyStoreyPart2';
  } else if (lineArray[0] === '风荷载信息') {
    FLAG = '';
  }

  if (FLAG === 'keyStoreyPart2') {
    if (!isNaN(Number(lineArray[0]))) {
      if (lineArray.length === 18) {
        storey.storeyID.push(Number(lineArray[0]));
        storey.towerID.push(Number(lineArray[2]));
        storey.attribute.push(lineArray[1]);
        storey.height.push(Number(lineArray[16]));
        storey.heightToGround.push(Number(lineArray[17]));
      } else {
        // 多塔
        storey.storeyID.push(storey.storeyID[storey.storeyID.length - 1]);
        storey.towerID.push(Number(lineArray[0]));
        storey.attribute.push(storey.attribute[storey.attribute.length - 1]);
        storey.height.push(Number(lineArray[14]));
        storey.heightToGround.push(Number(lineArray[15]));
      }
    }
  }

  return storey;
}

export function extractWind(lineArray: string[], wind: IWind): IWind {
  if (lineArray[0] === '风荷载信息') {
    FLAG = 'keyWind';
  } else if (lineArray[0] === '各楼层偶然偏心信息') {
    wind.allExtracted = true;
    FLAG = '';
  }

  if (FLAG === 'keyWind') {
    if (!isNaN(Number(lineArray[0]))) {
      if (lineArray[1].length < 4) {
        wind.storeyID.push(Number(lineArray[0]));
        wind.towerID.push(Number(lineArray[1]));
        wind.forceAlongX.push(Number(lineArray[2]));
        wind.shearAlongX.push(Number(lineArray[3]));
        wind.momentAlongX.push(Number(lineArray[4]));
        // wind.forceCrossX.push(0);
        // wind.shearCrossX.push(0);
        // wind.momentCrossX.push(0);
        wind.forceAlongY.push(Number(lineArray[5]));
        wind.shearAlongY.push(Number(lineArray[6]));
        wind.momentAlongY.push(Number(lineArray[7]));
        // wind.forceCrossY.push(Number(0));
        // wind.shearCrossY.push(Number(0));
        // wind.momentCrossY.push(Number(0));
      } else {
        //多塔
        wind.storeyID.push(wind.storeyID[wind.storeyID.length - 1]);
        wind.towerID.push(Number(lineArray[0]));
        wind.forceAlongX.push(Number(lineArray[1]));
        wind.shearAlongX.push(Number(lineArray[2]));
        wind.momentAlongX.push(Number(lineArray[3]));
        wind.forceAlongY.push(Number(lineArray[4]));
        wind.shearAlongY.push(Number(lineArray[5]));
        wind.momentAlongY.push(Number(lineArray[6]));
      }
    }
  }

  return wind;
}

export function extractStoreyPart3(
  lineArray: string[],
  storey: IStorey,
): IStorey {
  if (lineArray[0] === '各楼层等效尺寸') {
    FLAG = 'keyStoreyPart3';
  } else if (
    lineArray[0] === '各楼层的单位面积质量分布' ||
    lineArray[0] === '各层的柱'
  ) {
    FLAG = '';
  }

  if (FLAG === 'keyStoreyPart3') {
    if (!isNaN(Number(lineArray[0]))) {
      if (lineArray[1].length < 4) {
        storey.area.push(Number(lineArray[2]));
      } else {
        //多塔
        storey.area.push(Number(lineArray[1]));
      }
    }
  }

  return storey;
}

export function extractStoreyPart4(
  lineArray: string[],
  storey: IStorey,
): IStorey {
  if (lineArray[0] === '各层的柱') {
    FLAG = 'keyStoreyPart4';
  } else if (lineArray[0] === '各楼层的单位面积质量分布') {
    storey.allExtracted = true;
    FLAG = '';
  }

  if (FLAG === 'keyStoreyPart4') {
    if (!isNaN(Number(lineArray[0]))) {
      if (lineArray[1].length < 4) {
        // storey.area.push(Number(lineArray[2]));
        storey.wallSectionAreaX.push(Number(lineArray[7]));
        storey.wallSectionAreaY.push(Number(lineArray[9]));
      } else {
        //多塔
        // storey.area.push(Number(lineArray[1]));
        storey.wallSectionAreaX.push(Number(lineArray[6]));
        storey.wallSectionAreaY.push(Number(lineArray[8]));
      }
    }
  }

  return storey;
}

export function extractMassRatioPart2(
  lineArray: string[],
  massRatio: IMassRatio,
): IMassRatio {
  if (lineArray[0] === '各楼层的单位面积质量分布') {
    FLAG = 'keyMassRatio2';
  } else if (lineArray[0] === '计算信息') {
    massRatio.allExtracted = true;
    massRatio.massPerArea.reverse();
    massRatio.massPerAreaRatio.reverse();
    FLAG = '';
  }

  if (FLAG === 'keyMassRatio2') {
    if (!isNaN(Number(lineArray[0]))) {
      if (lineArray[1].length < 4) {
        massRatio.massPerArea.push(Number(lineArray[2]));
        massRatio.massPerAreaRatio.push(Number(lineArray[3]));
      } else {
        //多塔
        massRatio.massPerArea.push(Number(lineArray[1]));
        massRatio.massPerAreaRatio.push(Number(lineArray[2]));
      }
    }
  }

  return massRatio;
}

export function extractStiffness(
  lineArray: string[],
  stiffness: IStiffness,
): IStiffness {
  if (lineArray[0] === 'RJX3，RJY3，RJZ3') {
    FLAG = 'keyStiffness';
  } else if (lineArray[0] === 'X方向最小刚度比') {
    stiffness.allExtracted = true;
    FLAG = '';
  }

  if (FLAG === 'keyStiffness') {
    if (lineArray[0] === 'Floor') {
      stiffness.storeyID.push(Number(lineArray[2]));
      stiffness.towerID.push(Number(lineArray[5]));
    }
    if (lineArray[0] === 'Ratx1') {
      stiffness.ratx1.push(Number(lineArray[1]));
      stiffness.raty1.push(Number(lineArray[3]));
    }
    if (lineArray[0] === 'Ratx2') {
      stiffness.ratx2.push(Number(lineArray[1]));
      stiffness.raty2.push(Number(lineArray[3]));
      stiffness.weakStoreyFactor.push(Number(lineArray[5]));
    }
    if (lineArray[0] === 'RJX1') {
      stiffness.rjx1.push(Number(lineArray[1]));
      stiffness.rjy1.push(Number(lineArray[4]));
      stiffness.rjz1.push(Number(lineArray[7]));
    }
    if (lineArray[0] === 'RJX3' && lineArray[1] !== 'H') {
      stiffness.rjx3.push(Number(lineArray[1]));
      stiffness.rjy3.push(Number(lineArray[4]));
      stiffness.rjz3.push(Number(lineArray[7]));
    }
  }

  return stiffness;
}

export function extractOverturningCheck(
  lineArray: string[],
  overturningCheck: IOverturningCheck,
): IOverturningCheck {
  if (lineArray[0] === '结构整体抗倾覆验算结果') {
    FLAG = 'keyOverturning';
  } else if (lineArray[0] === '结构舒适性验算结果') {
    overturningCheck.allExtracted = true;
    FLAG = '';
  }

  if (FLAG === 'keyOverturning') {
    switch (lineArray[0] + lineArray[1]) {
      case 'X风荷载':
        overturningCheck.mrWindX = Number(lineArray[2]);
        overturningCheck.movWindX = Number(lineArray[3]);
        overturningCheck.ratioWindX = Number(lineArray[4]);
        overturningCheck.zeroAreaWindX = Number(lineArray[5]);
        break;
      case 'Y风荷载':
        overturningCheck.mrWindY = Number(lineArray[2]);
        overturningCheck.movWindY = Number(lineArray[3]);
        overturningCheck.ratioWindY = Number(lineArray[4]);
        overturningCheck.zeroAreaWindY = Number(lineArray[5]);
        break;
      case 'X地':
        overturningCheck.mrSeismicX = Number(lineArray[3]);
        overturningCheck.movSeismicX = Number(lineArray[4]);
        overturningCheck.ratioSeismicX = Number(lineArray[5]);
        overturningCheck.zeroAreaSeismicX = Number(lineArray[6]);
        break;
      case 'Y地':
        overturningCheck.mrSeismicY = Number(lineArray[3]);
        overturningCheck.movSeismicY = Number(lineArray[4]);
        overturningCheck.ratioSeismicY = Number(lineArray[5]);
        overturningCheck.zeroAreaSeismicY = Number(lineArray[6]);
    }
  }

  return overturningCheck;
}

export function extractWIndComfort(
  lineArray: string[],
  windComfort: IWindComfort,
): IWindComfort {
  switch (lineArray[0]) {
    case '按荷载规范计算X向顺风向顶点最大加速度':
      windComfort.accelerationAlongX = Number(lineArray[2]);
      break;
    case '按荷载规范计算X向横风向顶点最大加速度':
      windComfort.accelerationCrossX = Number(lineArray[2]);
      break;
    case '按荷载规范计算Y向顺风向顶点最大加速度':
      windComfort.accelerationAlongY = Number(lineArray[2]);
      break;
    case '按荷载规范计算Y向横风向顶点最大加速度':
      windComfort.accelerationCrossY = Number(lineArray[2]);
      windComfort.allExtracted = true;
  }

  return windComfort;
}

export function extractStableCheck(
  lineArray: string[],
  stableCheck: IStableCheck,
): IStableCheck {
  switch (lineArray[0]) {
    case 'X向刚重比':
      stableCheck.seismicRatioX = Number(lineArray[3]);
      break;
    case 'Y向刚重比':
      stableCheck.seismicRatioY = Number(lineArray[3]);
      stableCheck.allExtracted = true;
  }

  return stableCheck;
}

export function extractShearCapacityCheck(
  lineArray: string[],
  shearCapacityCheck: IShearCapacityCheck,
): IShearCapacityCheck {
  if (lineArray[0] === '楼层抗剪承载力') {
    FLAG = 'keyShearCapacityCheck';
  }

  if (FLAG === 'keyShearCapacityCheck') {
    if (!isNaN(Number(lineArray[0]))) {
      shearCapacityCheck.storeyID.push(Number(lineArray[0]));
      shearCapacityCheck.towerID.push(Number(lineArray[1]));
      shearCapacityCheck.capacityX.push(Number(lineArray[2]));
      shearCapacityCheck.capacityY.push(Number(lineArray[3]));
      shearCapacityCheck.ratioX.push(Number(lineArray[4]));
      shearCapacityCheck.ratioY.push(Number(lineArray[5]));
      if (lineArray[0] === '1') {
        shearCapacityCheck.allExtracted = true;
      }
    }
  }

  return shearCapacityCheck;
}

/**
 * @description devide line string and return string array
 * @param line: original line string
 */
function lineToArray(line: string): string[] {
  // const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa5]+\d*\-?\d*|-?\d+\.?\d*[a-zA-Z]*\+?\d*/g;
  const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa50-9\u2150-\u218f\.\-\+\《\》\/\，]+/g;
  return line.match(regexp) || [];
}
