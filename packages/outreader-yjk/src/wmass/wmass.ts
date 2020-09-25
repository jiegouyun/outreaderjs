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
let INNERFLAG: string;

export async function readWmassOutput(
  dir: string,
): Promise<IWmass | undefined> {
  const file = path.join(dir, 'wmass.out');
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

    // Extract calculationControl{}
    if (!wmass.calculationControl.allExtracted) {
      wmass.calculationControl = extractCalculationControl(
        lineArray,
        wmass.calculationControl,
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

    // Extract storey[] part1/4
    if (!wmass.storey.allExtracted) {
      wmass.storey = extractStoreyPart1(lineArray, wmass.storey);
    }

    // Extract tower{}
    if (!wmass.tower.allExtracted) {
      wmass.tower = extractTower(lineArray, wmass.tower);
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

    // Extract storey[] part3/4
    if (!wmass.storey.allExtracted) {
      wmass.storey = extractStoreyPart3(lineArray, wmass.storey);
    }

    // Extract wind{}
    if (!wmass.wind.allExtracted) {
      wmass.wind = extractWind(lineArray, wmass.wind);
    }

    // Extract storey[] part3/4
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

    // Extract constraintFloorStiffnessRatio{}
    if (!wmass.constraintFloorStiffnessRatio.allExtracted) {
      wmass.constraintFloorStiffnessRatio = extractConstraintFloorStiffnessRatio(
        lineArray,
        wmass.constraintFloorStiffnessRatio,
      );
    }

    // Extract overturningCheck{}
    if (!wmass.overturningCheck.allExtracted) {
      wmass.overturningCheck = extractOverturningCheck(
        lineArray,
        wmass.overturningCheck,
      );
    }

    // Extract stableCheck{}
    if (!wmass.stableCheck.allExtracted) {
      wmass.stableCheck = extractStableCheck(lineArray, wmass.stableCheck);
    }

    // Extract shearWeightRatioModify{}
    if (!wmass.shearWeightRatioModify.allExtracted) {
      wmass.shearWeightRatioModify = extractShearWeightRatioModify(
        lineArray,
        wmass.shearWeightRatioModify,
      );
    }

    // Extract windComfort{}
    if (!wmass.windComfort.allExtracted) {
      wmass.windComfort = extractWIndComfort(lineArray, wmass.windComfort);
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
  switch (lineArray[0]) {
    case '工程名称':
      basicInformation.engineering = lineArray[1] || 'default';
      break;
    case '工程代号':
      basicInformation.engineeringCode = lineArray[1] || 'default';
      break;
    case '设计人':
      basicInformation.designer = lineArray[1] || 'default';
      break;
    case '校核人':
      basicInformation.checker = lineArray[1] || 'default';
      break;
    case '软件名称':
      basicInformation.software = lineArray[1] || 'default';
      break;
    case '版本':
      basicInformation.softwareVersion = lineArray[1] || 'default';
      break;
    case '计算日期':
      basicInformation.calDate = lineArray[1] || 'default';
      basicInformation.allExtracted = true;
  }

  return basicInformation;
}

export function extractGeneralInformation(
  lineArray: string[],
  generalInformation: IGeneralInformation,
): IGeneralInformation {
  switch (lineArray[0]) {
    case '结构体系':
      generalInformation.structuralSystem = lineArray[1];
      break;
    case '结构材料信息':
      generalInformation.structuralMaterial = lineArray[1];
      break;
    case '结构所在地区':
      generalInformation.location = lineArray[1];
      break;
    case '地下室层数':
      generalInformation.basement = Number(lineArray[1]);
      break;
    case '嵌固端所在层号(层顶嵌固)':
      generalInformation.constraintFloor = Number(lineArray[1]);
      break;
    case '裙房层数':
      generalInformation.podium = Number(lineArray[1]);
      break;
    case '转换层所在层号':
      generalInformation.transferStorey = Number(lineArray[1]);
      break;
    case '加强层所在层号':
      generalInformation.reinforceStorey = Number(lineArray[1]);
      generalInformation.allExtracted = true;
  }

  return generalInformation;
}

export function extractCalculationControl(
  lineArray: string[],
  calculationControl: ICalculationControl,
): ICalculationControl {
  switch (lineArray[0]) {
    case '连梁刚度折减系数(地震)':
      calculationControl.couplingBeamFactorSeismic = Number(lineArray[1]);
      break;
    case '连梁刚度折减系数(风)':
      calculationControl.couplingBeamFactorWind = Number(lineArray[1]);
      break;
    case '刚性楼板假定':
      calculationControl.rigidFloorAssumption = lineArray[1];
      calculationControl.allExtracted = true;
  }

  return calculationControl;
}

export function extractWindInformation(
  lineArray: string[],
  windInformation: IWindInformation,
): IWindInformation {
  switch (lineArray[0]) {
    case '使用指定风荷载数据':
      windInformation.useAssigned = lineArray[1];
      break;
    case '执行规范':
      windInformation.loadCode = lineArray[1];
      break;
    case '地面粗糙程度':
      windInformation.terrainRoughness = lineArray[1];
      break;
    case '修正后的基本风压':
      windInformation.pressureModified = Number(lineArray[2]);
      break;
    case '风荷载计算用阻尼比':
      windInformation.dampingRatio = Number(lineArray[1]);
      break;
    case '舒适度验算用基本风压':
      windInformation.pressureComfort = Number(lineArray[2]);
      break;
    case '舒适度验算用阻尼比':
      windInformation.dampingRationComfort = Number(lineArray[1]);
      windInformation.allExtracted = true;
  }

  return windInformation;
}

export function extractSeismicInformation(
  lineArray: string[],
  seismicInformation: ISeismicInformation,
): ISeismicInformation {
  switch (lineArray[0]) {
    case '按地震动区划图GB18306-2015计算':
      seismicInformation.use2015GB18306 = lineArray[1];
      break;
    case '设计地震分组':
      seismicInformation.group = lineArray[1];
      break;
    case '地震烈度':
      seismicInformation.intensity = lineArray[1] + lineArray[2];
      break;
    case '场地类别':
      seismicInformation.siteCategory = lineArray[1];
      break;
    case '特征周期':
      seismicInformation.characteristicPeriod = Number(lineArray[1]);
      break;
    case '结构的阻尼比':
      seismicInformation.dampingRatio = Number(lineArray[1]);
      break;
    case '周期折减系数':
      seismicInformation.periodReductionFactor = Number(lineArray[1]);
      break;
    case 'X向偶然偏心值':
      seismicInformation.eccentricityX = Number(lineArray[1]);
      break;
    case 'Y向偶然偏心值':
      seismicInformation.eccentricityY = Number(lineArray[1]);
      break;
    case '地震影响系数最大值':
      seismicInformation.maxSpectrumValue = Number(lineArray[1]);
      break;
    case '罕遇地震影响系数最大值':
      seismicInformation.maxSpectrumValueL3 = Number(lineArray[1]);
      break;
    case '最大附加阻尼比':
      seismicInformation.additionalDampingRatio = Number(lineArray[1]);
      break;
    case '调整后的水平向减震系数':
      seismicInformation.modifiedSeismicReductionFactor = Number(lineArray[1]);
      seismicInformation.allExtracted = true;
  }

  return seismicInformation;
}

export function extractStoreyPart1(
  lineArray: string[],
  storey: IStorey,
): IStorey {
  if (lineArray[0] === '楼层属性') {
    FLAG = 'keyStoreyPart1';
  } else if (lineArray[0] === '塔属性') {
    FLAG = '';
  }

  if (FLAG === 'keyStoreyPart1') {
    if (!isNaN(Number(lineArray[0]))) {
      storey.storeyID.push(Number(lineArray[0]));
      storey.towerID.push(Number(lineArray[1]));
      storey.attribute.push(lineArray[2]);
    }
  }

  return storey;
}

export function extractTower(lineArray: string[], tower: ITower): ITower {
  if (lineArray[0] === '塔属性') {
    FLAG = 'keyTower';
  } else if (lineArray[0] === '各层质量' || lineArray[0] === '人防信息输出') {
    tower.allExtracted = true;
    FLAG = '';
  }

  if (FLAG === 'keyTower') {
    if (lineArray[0] === '塔号') {
      tower.towerID.push(Number(lineArray[1]));
    }

    if (lineArray[0] === '结构体系') {
      tower.structuralSystem.push(lineArray[1]);
    }
  }

  return tower;
}

export function extractMassRatioPart1(
  lineArray: string[],
  massRatio: IMassRatio,
): IMassRatio {
  if (lineArray[0] === '各层质量') {
    FLAG = 'keyMassRatio1';
  } else if (lineArray[0] === '活载总质量') {
    FLAG = '';
  }

  if (FLAG === 'keyMassRatio1') {
    if (!isNaN(Number(lineArray[0]))) {
      massRatio.storeyID.push(Number(lineArray[0]));
      massRatio.towerID.push(Number(lineArray[1]));
      massRatio.ratio.push(Number(lineArray[9]));
    }
  }

  return massRatio;
}

export function extractWeight(lineArray: string[], weight: IWeight): IWeight {
  switch (lineArray[0]) {
    case '活载总质量':
      weight.live = Number(lineArray[2]);
      break;
    case '恒载总质量':
      weight.dead = Number(lineArray[2]);
      break;
    case '附加总质量':
      weight.super = Number(lineArray[2]);
      break;
    case '结构总质量':
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
  } else if (lineArray[0] === '保护层') {
    FLAG = '';
  }

  if (FLAG === 'keyStoreyPart2') {
    if (!isNaN(Number(lineArray[0]))) {
      storey.height.push(Number(lineArray[6]));
      storey.heightToGround.push(Number(lineArray[7]));
    }
  }

  return storey;
}

export function extractStoreyPart3(
  lineArray: string[],
  storey: IStorey,
): IStorey {
  if (lineArray[1] === 'Y方向剪力墙截面面积') {
    FLAG = 'keyStoreyPart3';
  } else if (lineArray[0] === '风荷载信息') {
    FLAG = '';
  }

  if (FLAG === 'keyStoreyPart3') {
    if (!isNaN(Number(lineArray[0]))) {
      storey.wallSectionAreaX.push(Number(lineArray[2]));
      storey.wallSectionAreaY.push(Number(lineArray[3]));
    }
  }

  return storey;
}

export function extractWind(lineArray: string[], wind: IWind): IWind {
  if (lineArray[0] === '风荷载信息') {
    FLAG = 'keyWind';
  } else if (lineArray[0] === '各楼层等效尺寸(单位') {
    wind.allExtracted = true;
    FLAG = '';
  }

  if (FLAG === 'keyWind') {
    if (!isNaN(Number(lineArray[0])) && lineArray[2] === 'X') {
      wind.storeyID.push(Number(lineArray[0]));
      wind.towerID.push(Number(lineArray[1]));
      wind.forceAlongX.push(Number(lineArray[3]));
      wind.shearAlongX.push(Number(lineArray[4]));
      wind.momentAlongX.push(Number(lineArray[5]));
      wind.forceCrossX.push(Number(lineArray[6]));
      wind.shearCrossX.push(Number(lineArray[7]));
      wind.momentCrossX.push(Number(lineArray[8]));
    }

    if (!isNaN(Number(lineArray[1])) && lineArray[0] === 'Y') {
      wind.forceAlongY.push(Number(lineArray[1]));
      wind.shearAlongY.push(Number(lineArray[2]));
      wind.momentAlongY.push(Number(lineArray[3]));
      wind.forceCrossY.push(Number(lineArray[4]));
      wind.shearCrossY.push(Number(lineArray[5]));
      wind.momentCrossY.push(Number(lineArray[6]));
    }

    // compatibilized v1.8.2
    if (!isNaN(Number(lineArray[0])) && lineArray.length === 8) {
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
    }
  }

  return wind;
}

export function extractStoreyPart4(
  lineArray: string[],
  storey: IStorey,
): IStorey {
  if (lineArray[0] === '各楼层等效尺寸(单位') {
    FLAG = 'keyStoreyPart4';
  } else if (lineArray[0] === '各楼层质量') {
    storey.allExtracted = true;
    FLAG = '';
  }

  if (FLAG === 'keyStoreyPart4') {
    if (!isNaN(Number(lineArray[0]))) {
      storey.area.push(Number(lineArray[2]));
    }
  }

  return storey;
}

export function extractMassRatioPart2(
  lineArray: string[],
  massRatio: IMassRatio,
): IMassRatio {
  if (lineArray[0] === '各楼层质量') {
    FLAG = 'keyMassRatio2';
  } else if (lineArray[0] === '计算时间') {
    massRatio.allExtracted = true;
    FLAG = '';
  }

  if (FLAG === 'keyMassRatio2') {
    if (!isNaN(Number(lineArray[0]))) {
      massRatio.storeyMass.push(Number(lineArray[2]));
      massRatio.massPerArea.push(Number(lineArray[3]));
      massRatio.massPerAreaRatio.push(Number(lineArray[4]));
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
    if (lineArray[0] === '薄弱层地震剪力放大系数') {
      stiffness.weakStoreyFactor.push(Number(lineArray[1]));
    }
    if (lineArray[0] === 'Ratx1') {
      stiffness.ratx1.push(Number(lineArray[1]));
      stiffness.raty1.push(Number(lineArray[3]));
    }
    if (lineArray[0] === 'Ratx2') {
      stiffness.ratx2.push(Number(lineArray[1]));
      stiffness.raty2.push(Number(lineArray[3]));
    }
    if (lineArray[0] === 'RJX1') {
      stiffness.rjx1.push(Number(lineArray[1].split('(')[0]));
      stiffness.rjy1.push(Number(lineArray[3].split('(')[0]));
      stiffness.rjz1.push(Number(lineArray[5].split('(')[0]));
    }
    if (lineArray[0] === 'RJX3') {
      stiffness.rjx3.push(Number(lineArray[1].split('(')[0]));
      stiffness.rjy3.push(Number(lineArray[3].split('(')[0]));
      stiffness.rjz3.push(Number(lineArray[5].split('(')[0]));
    }
  }

  return stiffness;
}

export function extractConstraintFloorStiffnessRatio(
  lineArray: string[],
  constraintFloorStiffnessRatio: IConstraintFloorStiffnessRatio,
): IConstraintFloorStiffnessRatio {
  switch (lineArray[0]) {
    case '地下室层号':
      constraintFloorStiffnessRatio.storeyNo = Number(lineArray[1]);
      constraintFloorStiffnessRatio.towerNo = Number(lineArray[3]);
      break;
    case 'X方向地下一层剪切刚度':
      constraintFloorStiffnessRatio.stiffnessX0 = Number(lineArray[1]);
      constraintFloorStiffnessRatio.stiffnessX1 = Number(lineArray[3]);
      constraintFloorStiffnessRatio.ratioX = Number(lineArray[5]);
      break;
    case 'Y方向地下一层剪切刚度':
      constraintFloorStiffnessRatio.stiffnessY0 = Number(lineArray[1]);
      constraintFloorStiffnessRatio.stiffnessY1 = Number(lineArray[3]);
      constraintFloorStiffnessRatio.ratioY = Number(lineArray[5]);
      constraintFloorStiffnessRatio.allExtracted = true;
  }

  return constraintFloorStiffnessRatio;
}

export function extractOverturningCheck(
  lineArray: string[],
  overturningCheck: IOverturningCheck,
): IOverturningCheck {
  if (lineArray[0] === '结构整体抗倾覆验算') {
    FLAG = 'keyOverturning';
  } else if (lineArray[0] === '结构整体稳定验算') {
    overturningCheck.allExtracted = true;
    FLAG = '';
  }

  if (FLAG === 'keyOverturning') {
    switch (lineArray[0]) {
      case '层号':
        overturningCheck.storeyNo = Number(lineArray[1]);
        overturningCheck.towerNo = Number(lineArray[3]);
        break;
      case 'X向风':
        overturningCheck.mrWindX = Number(lineArray[1]);
        overturningCheck.movWindX = Number(lineArray[2]);
        overturningCheck.ratioWindX = Number(lineArray[3]);
        overturningCheck.zeroAreaWindX = Number(lineArray[4]);
        break;
      case 'Y向风':
        overturningCheck.mrWindY = Number(lineArray[1]);
        overturningCheck.movWindY = Number(lineArray[2]);
        overturningCheck.ratioWindY = Number(lineArray[3]);
        overturningCheck.zeroAreaWindY = Number(lineArray[4]);
        break;
      case 'X地震':
        overturningCheck.mrSeismicX = Number(lineArray[1]);
        overturningCheck.movSeismicX = Number(lineArray[2]);
        overturningCheck.ratioSeismicX = Number(lineArray[3]);
        overturningCheck.zeroAreaSeismicX = Number(lineArray[4]);
        break;
      case 'Y地震':
        overturningCheck.mrSeismicY = Number(lineArray[1]);
        overturningCheck.movSeismicY = Number(lineArray[2]);
        overturningCheck.ratioSeismicY = Number(lineArray[3]);
        overturningCheck.zeroAreaSeismicY = Number(lineArray[4]);
    }
  }

  return overturningCheck;
}

export function extractStableCheck(
  lineArray: string[],
  stableCheck: IStableCheck,
): IStableCheck {
  if (lineArray[0] === '结构整体稳定验算') {
    FLAG = 'keyStable';
  } else if (
    lineArray[0] === '二阶效应系数(仅针对于钢框架结构)' ||
    lineArray[0] === '结构抗震验算'
  ) {
    stableCheck.allExtracted = true;
    FLAG = '';
  }

  if (FLAG === 'keyStable') {
    if (lineArray[0] === '地震') {
      INNERFLAG = 'seismic';
    } else if (lineArray[0] === '风荷载') {
      INNERFLAG = 'wind';
    } else if (
      lineArray[0] === '二阶效应系数(仅针对于钢框架结构)' ||
      lineArray[0] === '结构抗震验算'
    ) {
      INNERFLAG = '';
    }

    if (INNERFLAG === 'seismic') {
      switch (lineArray[0]) {
        case '层号':
          stableCheck.seismicStoreyNo = Number(lineArray[1]);
          stableCheck.seismicTowerNo = Number(lineArray[3]);
          break;
        case 'X向刚重比':
          stableCheck.seismicRatioX = Number(lineArray[2]);
          break;
        case 'Y向刚重比':
          stableCheck.seismicRatioY = Number(lineArray[2]);
      }
    } else if (INNERFLAG === 'wind') {
      switch (lineArray[0]) {
        case '层号':
          stableCheck.windStoreyNo = Number(lineArray[1]);
          stableCheck.windTowerNo = Number(lineArray[3]);
          break;
        case 'X向刚重比':
          stableCheck.windRatioX = Number(lineArray[2]);
          break;
        case 'Y向刚重比':
          stableCheck.windRatioY = Number(lineArray[2]);
      }
    }
  }

  return stableCheck;
}

export function extractShearWeightRatioModify(
  lineArray: string[],
  shearWeightRatioModify: IShearWeightRatioModify,
): IShearWeightRatioModify {
  if (lineArray[0] === '本工程如下楼层进行了最小剪重比调整') {
    FLAG = 'keyShearWeightRatioModify';
  } else if (
    lineArray[0] === '风振舒适度验算' ||
    lineArray[0] === '本工程如下楼层进行了0.2V0调整'
  ) {
    shearWeightRatioModify.allExtracted = true;
    FLAG = '';
  }

  if (FLAG === 'keyShearWeightRatioModify') {
    if (!isNaN(Number(lineArray[0]))) {
      shearWeightRatioModify.storeyID.push(Number(lineArray[0]));
      shearWeightRatioModify.towerID.push(Number(lineArray[1]));
      shearWeightRatioModify.factorX.push(Number(lineArray[2]));
      shearWeightRatioModify.factorY.push(Number(lineArray[3]));
    }
  }

  return shearWeightRatioModify;
}

export function extractWIndComfort(
  lineArray: string[],
  windComfort: IWindComfort,
): IWindComfort {
  switch (lineArray[0]) {
    case 'X向顺风向顶点最大加速度(m/s2)':
      windComfort.accelerationAlongX = Number(lineArray[1]);
      break;
    case 'X向横风向顶点最大加速度(m/s2)':
      windComfort.accelerationCrossX = Number(lineArray[1]);
      break;
    case 'Y向顺风向顶点最大加速度(m/s2)':
      windComfort.accelerationAlongY = Number(lineArray[1]);
      break;
    case 'Y向横风向顶点最大加速度(m/s2)':
      windComfort.accelerationCrossY = Number(lineArray[1]);
      windComfort.allExtracted = true;
  }

  return windComfort;
}

export function extractShearCapacityCheck(
  lineArray: string[],
  shearCapacityCheck: IShearCapacityCheck,
): IShearCapacityCheck {
  if (lineArray[0] === '楼层抗剪承载力验算') {
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
  const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa50-9\u2150-\u218f\.\-\+\(\)\《\》\/\*\，\_]+/g;
  return line.match(regexp) || [];
}
