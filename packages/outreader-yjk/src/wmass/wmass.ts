import {
  readLineByLine,
  extractData,
  checkObjectKeysIfAllExtracted,
} from '@outreader/core';
import * as path from 'path';
import {
  IWmass,
  IInformation,
  IGeneralInformation,
  ICalculationControl,
  IWindInformation,
  ISeismicInformation,
  IStorey,
  ITower,
  IMassRatio,
  IWeight,
  IWind,
  IStiffness,
  IConstraintFloorStiffnessRatio,
  IOverturningCheck,
  IStableCheck,
  IShearWeightRatioModify,
  IWindComfort,
  IShearCapacityCheck,
} from './wmass.interface';
import { check } from 'prettier';

export async function readWmassOutput(dir: string): Promise<IWmass> {
  const file = path.join(dir, 'wmass.out');
  let wmass: IWmass = {
    information: { allExtracted: false },
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
      forceX: [],
      shearX: [],
      momentX: [],
      forceY: [],
      shearY: [],
      momentY: [],
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

  // Define flag
  let flag: string;
  let innerFlag: string;

  await readLineByLine(file, (line: string) => {
    // Extract valuable data from .out

    if (line.length === 0) {
      return;
    }

    // Divide line into array
    const lineArray = lineToArray(line);
    // console.log(`line: ${line}
    // lineArray: ${lineArray}`);

    if (lineArray.length === 0) {
      return;
    }
      
    // Extract information{}
    if (!wmass.information.allExtracted) {
      wmass.information = extractInformation(lineArray, wmass.information);
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

    // Extract storey[] part1/3
    if (lineArray[0] === "楼层属性") {
      flag = "keyStoreyPart1";
    } else if (lineArray[0] === "塔属性") {
      flag = "";
    }

    if (flag === "keyStoreyPart1") {
      if (!wmass.storey.allExtracted) {
        wmass.storey = extractStoreyPart1(lineArray, wmass.storey);
      }
    }

    // Extract tower{}
    if (lineArray[0] === "塔属性") {
      flag = "keyTower";
    } else if (lineArray[0] === "各层质量") {
      flag = "";
    }

    if (flag === "keyTower") {
      if (!wmass.tower.allExtracted) {
        wmass.tower = extractTower(lineArray, wmass.tower);
      }
    }

    // Extract massRatio{} part1/2
    if (lineArray[0] === "各层质量") {
      flag = "keyMassRatio1";
    } else if (lineArray[0] === "活载总质量") {
      flag = "";
    }

    if (flag === "keyMassRatio1") {
      if (!wmass.massRatio.allExtracted) {
        wmass.massRatio = extractMassRatioPart1(lineArray, wmass.massRatio);
      }
    }

    // Extract weight{}
    if (!wmass.weight.allExtracted) {
      wmass.weight = extractWeight(lineArray, wmass.weight);
    }  

    // Extract storey[] part2/3
    if (lineArray[0] === "各层构件数量") {
      flag = "keyStoreyPart2";
    } else if (lineArray[0] === "保护层") {
      flag = "";
    }

    if (flag === "keyStoreyPart2") {
      if (!wmass.storey.allExtracted) {
        wmass.storey = extractStoreyPart2(lineArray, wmass.storey);
      }
    }

    // Extract wind{}
    if (lineArray[0] === "风荷载信息") {
      flag = "keyWind";
    } else if (lineArray[0] === "各楼层等效尺寸(单位") {
      flag = "";
    }

    if (flag === "keyWind") {
      if (!wmass.wind.allExtracted) {
        wmass.wind = extractWind(lineArray, wmass.wind);
      }
    }

    // Extract storey[] part3/3
    if (lineArray[0] === "各楼层等效尺寸(单位") {
      flag = "keyStoreyPart3";
    } else if (lineArray[0] === "各楼层质量") {
      flag = "";
    }

    if (flag === "keyStoreyPart3") {
      if (!wmass.storey.allExtracted) {
        wmass.storey = extractStoreyPart3(lineArray, wmass.storey);
      }
    }
    
    // Extract massRatio{} part2/2
    if (lineArray[0] === "各楼层质量") {
      flag = "keyMassRatio2";
    } else if (lineArray[0] === "计算时间") {
      flag = "";
    }

    if (flag === "keyMassRatio2") {
      if (!wmass.massRatio.allExtracted) {
        wmass.massRatio = extractMassRatioPart2(lineArray, wmass.massRatio);
      }
    }

    // Extract stiffness{}
    if (lineArray[0] === "RJX3，RJY3，RJZ3") {
      flag = "keyStiffness";
    } else if (lineArray[0] === "X方向最小刚度比") {
      flag = "";
    }

    if (flag === "keyStiffness") {
      if (!wmass.stiffness.allExtracted) {
        wmass.stiffness = extractStiffness(lineArray, wmass.stiffness);
      }
    }

    // Extract constraintFloorStiffnessRatio{}
    if (!wmass.constraintFloorStiffnessRatio.allExtracted) {
      wmass.constraintFloorStiffnessRatio = extractConstraintFloorStiffnessRatio(
        lineArray,
        wmass.constraintFloorStiffnessRatio,
      );
    }

    // Extract overturningCheck{}
    if (lineArray[0] === "结构整体抗倾覆验算") {
      flag = "keyOverturning";
    } else if (lineArray[0] === "结构整体稳定验算") {
      flag = "";
    }

    if (flag === "keyOverturning") {
      if (!wmass.overturningCheck.allExtracted) {
        wmass.overturningCheck = extractOverturningCheck(
          lineArray,
          wmass.overturningCheck,
        );
      }
    }

    // Extract stableCheck{}
    if (lineArray[0] === "结构整体稳定验算") {
      flag = "keyStable";
    } else if (lineArray[0] === "二阶效应系数(仅针对于钢框架结构)") {
      flag = "";
    }
    
    if (flag === "keyStable") {
      if (lineArray[0] === "地震") {
        innerFlag = "seismic";
      } else if (lineArray[0] === "风荷载") {
        innerFlag = "wind";
      } else if (lineArray[0] === "二阶效应系数(仅针对于钢框架结构)") {
        innerFlag = "";
      }

      if (innerFlag === "seismic") {
        if (!wmass.stableCheck.allExtracted) {
          wmass.stableCheck = extractStableCheckSeismic(lineArray, wmass.stableCheck);
        }
      } else if (innerFlag === "wind") {
        if (!wmass.stableCheck.allExtracted) {
          wmass.stableCheck = extractStableCheckWind(lineArray, wmass.stableCheck);
        }
      }
      
    }

    // Extract shearWeightRatioModify{}
    if (lineArray[0] === "本工程如下楼层进行了最小剪重比调整") {
      flag = "keyShearWeightRatioModify";
    } else if (lineArray[0] === "风振舒适度验算") {
      flag = "";
    }

    if (flag === "keyShearWeightRatioModify") {
      if (!wmass.shearWeightRatioModify.allExtracted) {
        wmass.shearWeightRatioModify = extractShearWeightRatioModify(lineArray, wmass.shearWeightRatioModify);
      }
    }

    // Extract windComfort{}
    if (!wmass.windComfort.allExtracted) {
      wmass.windComfort = extractWIndComfort(lineArray, wmass.windComfort);
    }

    // Extract shearCapacityCheck{}
    if (lineArray[0] === "楼层抗剪承载力验算") {
      flag = "keyShearCapacityCheck";
    }

    if (flag === "keyShearCapacityCheck") {
      if (!wmass.shearCapacityCheck.allExtracted) {
        wmass.shearCapacityCheck = extractShearCapacityCheck(lineArray, wmass.shearCapacityCheck);
      }
    }

  });

  // console.log(wmass);
  return wmass;
}

export function extractInformation(
  lineArray: string[],
  information: IInformation,
): IInformation {
  if (!Boolean(information.engineering)) {
    information.engineering = extractData(lineArray, '工程名称', 0, 1);
  }
  if (!Boolean(information.engineeringCode)) {
    information.engineeringCode = extractData(lineArray, '工程代号', 0, 1);
  }
  if (!Boolean(information.designer)) {
    information.designer = extractData(lineArray, '设计人', 0, 1);
  }
  if (!Boolean(information.checker)) {
    information.checker = extractData(lineArray, '校核人', 0, 1);
  }
  if (!Boolean(information.software)) {
    information.software = extractData(lineArray, '软件名称', 0, 1);
  }
  if (!Boolean(information.softwareVersion)) {
    information.softwareVersion = extractData(lineArray, '版本', 0, 1);
  }
  if (!Boolean(information.calDate)) {
    information.calDate = extractData(lineArray, '计算日期', 0, 1);
  }

  information.allExtracted = checkObjectKeysIfAllExtracted(information);

  return information;
}

export function extractGeneralInformation(
  lineArray: string[],
  generalInformation: IGeneralInformation,
): IGeneralInformation {
  if (!Boolean(generalInformation.structuralSystem)) {
    generalInformation.structuralSystem = extractData(lineArray,'结构体系', 0, 1,);
  }
  if (!Boolean(generalInformation.structuralMaterial)) {
    generalInformation.structuralMaterial = extractData(
      lineArray,
      '结构材料信息',
      0,
      1,
    );
  }
  if (!Boolean(generalInformation.location)) {
    generalInformation.location = extractData(lineArray, '结构所在地区', 0, 1);
  }
  if (!Boolean(generalInformation.basement)) {
    generalInformation.basement = Number(
      extractData(lineArray, '地下室层数', 0, 1),
    );
  }
  if (!Boolean(generalInformation.constraintFloor)) {
    generalInformation.constraintFloor = Number(
      extractData(lineArray, '嵌固端所在层号(层顶嵌固)', 0, 1),
    );
  }
  if (!Boolean(generalInformation.podium)) {
    generalInformation.podium = Number(
      extractData(lineArray, '裙房层数', 0, 1),
    );
  }
  if (!Boolean(generalInformation.transferStorey)) {
    generalInformation.transferStorey = Number(
      extractData(lineArray, '转换层所在层号', 0, 1),
    );  
  }
  if (!Boolean(generalInformation.reinforceStorey)) {
    generalInformation.reinforceStorey = Number(
      extractData(lineArray, '加强层所在层号', 0, 1),
    );
  }

  generalInformation.allExtracted = checkObjectKeysIfAllExtracted(
    generalInformation,
  );

  return generalInformation;
}

export function extractCalculationControl(
  lineArray: string[],
  calculationControl: ICalculationControl,
): ICalculationControl {
  if (!Boolean(calculationControl.couplingBeamFactorSeismic)) {
    calculationControl.couplingBeamFactorSeismic = Number(
      extractData(lineArray, '连梁刚度折减系数(地震)', 0, 1),
    );
  }
  if (!Boolean(calculationControl.couplingBeamFactorWind)) {
    calculationControl.couplingBeamFactorWind = Number(
      extractData(lineArray, '连梁刚度折减系数(风)', 0, 1),
    );
  }
  if (!Boolean(calculationControl.rigidFloorAssumption)) {
    calculationControl.rigidFloorAssumption = extractData(
      lineArray,
      '刚性楼板假定',
      0,
      1,
    );
  }

  calculationControl.allExtracted = checkObjectKeysIfAllExtracted(
    calculationControl,
  );

  return calculationControl;
}

export function extractWindInformation(
  lineArray: string[],
  windInformation: IWindInformation,
): IWindInformation {
  if (!Boolean(windInformation.useAssigned)) {
    windInformation.useAssigned = extractData(
      lineArray,
      '使用指定风荷载数据',
      0,
      1,
    );
  }
  if (!Boolean(windInformation.loadCode)) {
    windInformation.loadCode = extractData(lineArray, '执行规范', 0, 1);
  }
  if (!Boolean(windInformation.terrainRoughness)) {
    windInformation.terrainRoughness = extractData(
      lineArray,
      '地面粗糙程度',
      0,
      1,
    );
  }
  if (!Boolean(windInformation.pressureModified)) {
    windInformation.pressureModified = Number(
      extractData(lineArray, '修正后的基本风压', 0, 2),
    );
  }
  if (!Boolean(windInformation.dampingRatio)) {
    windInformation.dampingRatio = Number(
      extractData(lineArray, '风荷载计算用阻尼比', 0, 1),
    );
  }
  if (!Boolean(windInformation.pressureComfort)) {
    windInformation.pressureComfort = Number(
      extractData(lineArray, '舒适度验算用基本风压', 0, 2),
    );
  }
  if (!Boolean(windInformation.dampingRationComfort)) {
    windInformation.dampingRationComfort = Number(
      extractData(lineArray, '舒适度验算用阻尼比', 0, 1),
    );
  }

  windInformation.allExtracted = checkObjectKeysIfAllExtracted(windInformation);

  return windInformation;
}

export function extractSeismicInformation(
  lineArray: string[],
  seismicInformation: ISeismicInformation,
): ISeismicInformation {
  if (!Boolean(seismicInformation.use2015GB18306)) {
    seismicInformation.use2015GB18306 = extractData(
      lineArray,
      '按地震动区划图GB18306-2015计算',
      0,
      1,
    );
  }
  if (!Boolean(seismicInformation.group)) {
    seismicInformation.group = extractData(lineArray, '设计地震分组', 0, 1);
  }
  if (!Boolean(seismicInformation.intensity)) {
    seismicInformation.intensity = extractData(lineArray, '地震烈度', 0, 1);
  }
  if (!Boolean(seismicInformation.siteCategory)) {
    seismicInformation.siteCategory = extractData(lineArray, '场地类别', 0, 1);
  }
  if (!Boolean(seismicInformation.characteristicPeriod)) {
    seismicInformation.characteristicPeriod = Number(
      extractData(lineArray, '特征周期', 0, 1),
    );
  }
  if (!Boolean(seismicInformation.dampingRatio)) {
    seismicInformation.dampingRatio = Number(
      extractData(lineArray, '结构的阻尼比', 0, 1),
    );
  }
  if (!Boolean(seismicInformation.periodReductionFactor)) {
    seismicInformation.periodReductionFactor = Number(
      extractData(lineArray, '周期折减系数', 0, 1),
    );
  }
  if (!Boolean(seismicInformation.eccentricityX)) {
    seismicInformation.eccentricityX = Number(
      extractData(lineArray, 'X向偶然偏心值', 0, 1),
    );
  }
  if (!Boolean(seismicInformation.eccentricityY)) {
    seismicInformation.eccentricityY = Number(
      extractData(lineArray, 'Y向偶然偏心值', 0, 1),
    );
  }
  if (!Boolean(seismicInformation.maxSpectrumValue)) {
    seismicInformation.maxSpectrumValue = Number(
      extractData(lineArray, '地震影响系数最大值', 0, 1),
    );
  }
  if (!Boolean(seismicInformation.maxSpectrumValueL3)) {
    seismicInformation.maxSpectrumValueL3 = Number(
      extractData(lineArray, '罕遇地震影响系数最大值', 0, 1),
    );
  }
  if (!Boolean(seismicInformation.additionalDampingRatio)) {
    seismicInformation.additionalDampingRatio = Number(
      extractData(lineArray, '最大附加阻尼比', 0, 1),
    );
  }
  if (!Boolean(seismicInformation.modifiedSeismicReductionFactor)) {
    seismicInformation.modifiedSeismicReductionFactor = Number(
      extractData(lineArray, '调整后的水平向减震系数', 0, 1),
    );
  }

  seismicInformation.allExtracted = checkObjectKeysIfAllExtracted(
    seismicInformation,
  );

  return seismicInformation;
}

export function extractStoreyPart1(lineArray: string[], storey: IStorey): IStorey {
  if (!isNaN(Number(lineArray[0]))) {
    // console.log(`lineArray[0]= ${lineArray[0]}`);
    if (typeof storey.storeyID === "object") {
      storey.storeyID.push(Number(lineArray[0]));
    }
    if (typeof storey.towerID === "object") {
      storey.towerID.push(Number(lineArray[1]));
    }
    if (typeof storey.attribute === "object") {
      storey.attribute.push(lineArray[2]);
    }
  }

  return storey;
}

export function extractTower(lineArray: string[], tower: ITower): ITower {
  if (lineArray[0] === "塔号") {
    if (typeof tower.towerID === "object") {
      tower.towerID.push(Number(lineArray[1]));
    }
  }

  if (lineArray[0] === "结构体系") {
    if (typeof tower.structuralSystem === "object") {
      tower.structuralSystem.push(lineArray[1]);
    }
  }

  // tower.allExtracted = checkObjectKeysIfAllExtracted(tower);

  return tower;
}

export function extractMassRatioPart1(lineArray: string[], massRatio: IMassRatio): IMassRatio {
  if (!isNaN(Number(lineArray[0]))) {
    if (typeof massRatio.storeyID === 'object') {
      massRatio.storeyID.push(Number(lineArray[0]));
    }
    if (typeof massRatio.towerID === 'object') {
      massRatio.towerID.push(Number(lineArray[1]));
    }
    if (typeof massRatio.ratio === 'object') {
      massRatio.ratio.push(Number(lineArray[9]));
    }
  }

  return massRatio;
}

export function extractWeight(lineArray: string[], weight: IWeight): IWeight {
  if (!Boolean(weight.live)) {
    weight.live = Number(extractData(lineArray, '活载总质量', 0, 2));
  }
  if (!Boolean(weight.dead)) {
    weight.dead = Number(extractData(lineArray, '恒载总质量', 0, 2));
  }
  if (!Boolean(weight.super)) {
    weight.super = Number(extractData(lineArray, '附加总质量', 0, 2));
  }
  if (!Boolean(weight.sum)) {
    weight.sum = Number(extractData(lineArray, '结构总质量', 0, 2));
  }

  weight.allExtracted = checkObjectKeysIfAllExtracted(weight);

  return weight;
}

export function extractStoreyPart2(lineArray: string[], storey: IStorey): IStorey {
  if (!isNaN(Number(lineArray[0]))) {
    if (typeof storey.height === "object") {
      storey.height.push(Number(lineArray[6]));
    }
    if (typeof storey.heightToGround === "object") {
      storey.heightToGround.push(Number(lineArray[7]));
    }
  }

  return storey;
}

export function extractWind(lineArray: string[], wind: IWind): IWind {
  if (!isNaN(Number(lineArray[0])) && (lineArray.length === 9)) {
    if (typeof wind.storeyID === "object") {
      wind.storeyID.push(Number(lineArray[0]));
    }
    if (typeof wind.towerID === "object") {
      wind.towerID.push(Number(lineArray[1]));
    }
    if (typeof wind.forceX === "object") {
      wind.forceX.push(Number(lineArray[3]));
    }
    if (typeof wind.shearX === "object") {
      wind.shearX.push(Number(lineArray[4]));
    }
    if (typeof wind.momentX === "object") {
      wind.momentX.push(Number(lineArray[5]));
    }
  }

  if (!isNaN(Number(lineArray[1])) && (lineArray.length === 7)) {
    if (typeof wind.forceY === "object") {
      wind.forceY.push(Number(lineArray[1]));
    }
    if (typeof wind.shearY === "object") {
      wind.shearY.push(Number(lineArray[2]));
    }
    if (typeof wind.momentY === "object") {
      wind.momentY.push(Number(lineArray[3]));
    }
  }

  // wind.allExtracted = checkObjectKeysIfAllExtracted(wind);

  return wind;
}

export function extractStoreyPart3(lineArray: string[], storey: IStorey): IStorey {
  if (!isNaN(Number(lineArray[0]))) {
    if (typeof storey.area === "object") {
      storey.area.push(Number(lineArray[2]));
    }
  }

  // storey.allExtracted = checkObjectKeysIfAllExtracted(storey);

  return storey;
}

export function extractMassRatioPart2(lineArray: string[], massRatio: IMassRatio): IMassRatio {
  if (!isNaN(Number(lineArray[0]))) {
    if (typeof massRatio.storeyMass === 'object') {
      massRatio.storeyMass.push(Number(lineArray[2]));
    }
    if (typeof massRatio.massPerArea === 'object') {
      massRatio.massPerArea.push(Number(lineArray[3]));
    }
    if (typeof massRatio.massPerAreaRatio === 'object') {
      massRatio.massPerAreaRatio.push(Number(lineArray[4]));
    }
  }

  // massRatio.allExtracted = checkObjectKeysIfAllExtracted(massRatio);

  return massRatio;
}

export function extractStiffness(lineArray: string[], stiffness: IStiffness): IStiffness {
  if (lineArray[0] === 'Floor') {
    if (typeof stiffness.storeyID === 'object') {
      stiffness.storeyID.push(Number(lineArray[2]));
      stiffness.towerID?.push(Number(lineArray[5]));
    }
  }
  if (lineArray[0] === '薄弱层地震剪力放大系数') {
    if (typeof stiffness.weakStoreyFactor === 'object') {
      stiffness.weakStoreyFactor.push(Number(lineArray[1]));      
    }
  }
  if (lineArray[0] === 'Ratx1') {
    if (typeof stiffness.ratx1 === 'object') {
      stiffness.ratx1.push(Number(lineArray[1]));      
    }
    if (typeof stiffness.raty1 === 'object') {
      stiffness.raty1.push(Number(lineArray[3]));      
    }
  }
  if (lineArray[0] === 'Ratx2') {
    if (typeof stiffness.ratx2 === 'object') {
      stiffness.ratx2.push(Number(lineArray[1]));      
    }
    if (typeof stiffness.raty2 === 'object') {
      stiffness.raty2.push(Number(lineArray[3]));      
    }
  }
  if (lineArray[0] === 'RJX1') {
    if (typeof stiffness.rjx1 === 'object') {
      stiffness.rjx1.push(Number(lineArray[1].split('(')[0]));
    }
    if (typeof stiffness.rjy1 === 'object') {
      stiffness.rjy1.push(Number(lineArray[3].split('(')[0]));
    }
    if (typeof stiffness.rjz1 === 'object') {
      stiffness.rjz1.push(Number(lineArray[5].split('(')[0]));
    }
  }
  if (lineArray[0] === 'RJX3') {
    if (typeof stiffness.rjx3 === 'object') {
      stiffness.rjx3.push(Number(lineArray[1].split('(')[0]));
    }
    if (typeof stiffness.rjy3 === 'object') {
      stiffness.rjy3.push(Number(lineArray[3].split('(')[0]));
    }
    if (typeof stiffness.rjz3 === 'object') {
      stiffness.rjz3.push(Number(lineArray[5].split('(')[0]));
    }
  }

  // stiffness.allExtracted = checkObjectKeysIfAllExtracted(stiffness);

  return stiffness;
}

export function extractConstraintFloorStiffnessRatio(
  lineArray: string[],
  constraintFloorStiffnessRatio: IConstraintFloorStiffnessRatio,
): IConstraintFloorStiffnessRatio {
  if (!Boolean(constraintFloorStiffnessRatio.storeyID)) {
    let towerStorey: string[];
    towerStorey = extractData(lineArray, '地下室层号', 0, [1, 3,]);
    if (towerStorey) {
      constraintFloorStiffnessRatio.storeyID = Number(towerStorey[0]);
      constraintFloorStiffnessRatio.towerID = Number(towerStorey[1]);
    }
  }
  if (!Boolean(constraintFloorStiffnessRatio.stiffnessX0)) {
    let xStiff: string[];
    xStiff = extractData(lineArray, 'X方向地下一层剪切刚度', 0, [1, 3, 5,]);
    if (xStiff) {
      constraintFloorStiffnessRatio.stiffnessX0 = Number(xStiff[0]);
      constraintFloorStiffnessRatio.stiffnessX1 = Number(xStiff[1]);
      constraintFloorStiffnessRatio.ratioX = Number(xStiff[2]);
    }
   }
  if (!Boolean(constraintFloorStiffnessRatio.stiffnessY0)) {
    let ystiff: string[];
    ystiff = extractData(lineArray, 'Y方向地下一层剪切刚度', 0, [1, 3, 5,]);
    if (ystiff) {
      constraintFloorStiffnessRatio.stiffnessY0 = Number(ystiff[0]);
      constraintFloorStiffnessRatio.stiffnessY1 = Number(ystiff[1]);
      constraintFloorStiffnessRatio.ratioY = Number(ystiff[2]);
    }
  }

  // constraintFloorStiffnessRatio.allExtracted = checkObjectKeysIfAllExtracted(
  //   constraintFloorStiffnessRatio,
  // );

  return constraintFloorStiffnessRatio;
}

export function extractOverturningCheck(
  lineArray: string[],
  overturningCheck: IOverturningCheck,
): IOverturningCheck {
  if (!Boolean(overturningCheck.storeyID)) {
    let storeyTower: string[];
    storeyTower = extractData(lineArray, '层号', 0, [1, 3,]);
    if (storeyTower) {
      overturningCheck.storeyID = Number(storeyTower[0]);
      overturningCheck.towerID = Number(storeyTower[1]);
    }
  }
  if (!Boolean(overturningCheck.mrWindX)) {
    let arrayWindX: string[];
    arrayWindX = extractData(lineArray, 'X向风', 0, [1, 2, 3, 4]);
    if (arrayWindX) {
      overturningCheck.mrWindX = Number(arrayWindX[0]);
      overturningCheck.movWindX = Number(arrayWindX[1]);
      overturningCheck.ratioWindX = Number(arrayWindX[2]);
      overturningCheck.zeroAreaWindX = Number(arrayWindX[3]);
    }
  }
  if (!Boolean(overturningCheck.mrWindY)) {
    let arrayWindY: string[];
    arrayWindY = extractData(lineArray, 'Y向风', 0, [1, 2, 3, 4]);
    if (arrayWindY) {
      overturningCheck.mrWindY = Number(arrayWindY[0]);
      overturningCheck.movWindY = Number(arrayWindY[1]);
      overturningCheck.ratioWindY = Number(arrayWindY[2]);
      overturningCheck.zeroAreaWindY = Number(arrayWindY[3]);
    }
  }
  if (!Boolean(overturningCheck.mrSeismicX)) {
    let arraySeismicX: string[];
    arraySeismicX = extractData(lineArray, 'X地震', 0, [1, 2, 3, 4]);
    if (arraySeismicX) {
      overturningCheck.mrSeismicX = Number(arraySeismicX[0]);
      overturningCheck.movSeismicX = Number(arraySeismicX[1]);
      overturningCheck.ratioSeismicX = Number(arraySeismicX[2]);
      overturningCheck.zeroAreaSeismicX = Number(arraySeismicX[3]);
    }
  }
  if (!Boolean(overturningCheck.mrSeismicY)) {
    let arraySeismicY: string[];
    arraySeismicY = extractData(lineArray, 'Y地震', 0, [1, 2, 3, 4]);
    if (arraySeismicY) {
      overturningCheck.mrSeismicY = Number(arraySeismicY[0]);
      overturningCheck.movSeismicY = Number(arraySeismicY[1]);
      overturningCheck.ratioSeismicY = Number(arraySeismicY[2]);
      overturningCheck.zeroAreaSeismicY = Number(arraySeismicY[3]);
    }
  }

  // overturningCheck.allExtracted = checkObjectKeysIfAllExtracted(
  //   overturningCheck,
  // );

  return overturningCheck;
}

export function extractStableCheckSeismic (
  lineArray: string[],
  stableCheck: IStableCheck,
): IStableCheck {
  if (!Boolean(stableCheck.seismicID)) {
    let storeyT: string[];
    storeyT = extractData(lineArray, "层号", 0, [1, 3,]);
    if (storeyT) {
      stableCheck.seismicID = Number(storeyT[0]);
      stableCheck.seismicTcowerID = Number(storeyT[1]);
    }
  }
  if (!Boolean(stableCheck.seismicRatioX)) {
    stableCheck.seismicRatioX = Number(extractData(lineArray, "X向刚重比", 0, 2));
  }
  if (!Boolean(stableCheck.seismicRatioY)) {
    stableCheck.seismicRatioY = Number(extractData(lineArray, "Y向刚重比", 0, 2));
  }

  return stableCheck;
}

export function extractStableCheckWind (
  lineArray: string[],
  stableCheck: IStableCheck,
): IStableCheck {
  if (!Boolean(stableCheck.windID)) {
    let towerS: string[];
    towerS = extractData(lineArray, "层号", 0, [1, 3]);
    if (towerS) {
      stableCheck.windID = Number(towerS[0]);      
      stableCheck.windTcowerID = Number(towerS[1]);
    }    
  }
  if (!Boolean(stableCheck.windRatioX)) {
    stableCheck.windRatioX = Number(extractData(lineArray, "X向刚重比", 0, 2));
  }
  if (!Boolean(stableCheck.windRatioY)) {
    stableCheck.windRatioY = Number(extractData(lineArray, "Y向刚重比", 0, 2));
  }

  stableCheck.allExtracted = checkObjectKeysIfAllExtracted(stableCheck);

  return stableCheck;
}

export function extractShearWeightRatioModify (
  lineArray: string[],
  shearWeightRatioModify: IShearWeightRatioModify,
): IShearWeightRatioModify {
  if (!isNaN(Number(lineArray[0]))) {
    if (typeof shearWeightRatioModify.storeyID === 'object') {
      shearWeightRatioModify.storeyID.push(Number(lineArray[0]));
    }
    if (typeof shearWeightRatioModify.towerID === 'object') {
      shearWeightRatioModify.towerID.push(Number(lineArray[1]));
    }
    if (typeof shearWeightRatioModify.factorX === 'object') {
      shearWeightRatioModify.factorX.push(Number(lineArray[2]));
    }
    if (typeof shearWeightRatioModify.factorY === 'object') {
      shearWeightRatioModify.factorY.push(Number(lineArray[3]));
    }
  }

  // shearWeightRatioModify.allExtracted = checkObjectKeysIfAllExtracted(shearWeightRatioModify);

  return shearWeightRatioModify;
}

export function extractWIndComfort(lineArray: string[], windComfort: IWindComfort): IWindComfort {
  if (!Boolean(windComfort.accelerationAlongX)) {
    windComfort.accelerationAlongX = Number(extractData(lineArray, 'X向顺风向顶点最大加速度(m/s2)', 0, 1));
  }
  if (!Boolean(windComfort.accelerationCrossX)) {
    windComfort.accelerationCrossX = Number(extractData(lineArray, 'X向横风向顶点最大加速度(m/s2)', 0, 1));
  }
  if (!Boolean(windComfort.accelerationAlongY)) {
    windComfort.accelerationAlongY = Number(extractData(lineArray, 'Y向顺风向顶点最大加速度(m/s2)', 0, 1));
  }
  if (!Boolean(windComfort.accelerationCrossY)) {
    windComfort.accelerationCrossY = Number(extractData(lineArray, 'Y向横风向顶点最大加速度(m/s2)', 0, 1));
  }

  windComfort.allExtracted = checkObjectKeysIfAllExtracted(windComfort);

  return windComfort;
}

export function extractShearCapacityCheck (
  lineArray: string[],
  shearCapacityCheck: IShearCapacityCheck,
): IShearCapacityCheck {
  if (!isNaN(Number(lineArray[0]))) {
    if (typeof shearCapacityCheck.storeyID === 'object') {
      shearCapacityCheck.storeyID.push(Number(lineArray[0]));
    }
    if (typeof shearCapacityCheck.towerID === 'object') {
      shearCapacityCheck.towerID.push(Number(lineArray[1]));
    }
    if (typeof shearCapacityCheck.capacityX === 'object') {
      shearCapacityCheck.capacityX.push(Number(lineArray[2]));
    }
    if (typeof shearCapacityCheck.capacityY === 'object') {
      shearCapacityCheck.capacityY.push(Number(lineArray[3]));
    }
    if (typeof shearCapacityCheck.ratioX === 'object') {
      shearCapacityCheck.ratioX.push(Number(lineArray[4]));
    }
    if (typeof shearCapacityCheck.ratioY === 'object') {
      shearCapacityCheck.ratioY.push(Number(lineArray[5]));
    }
  }

  // shearCapacityCheck.allExtracted = checkObjectKeysIfAllExtracted(shearCapacityCheck);

  return shearCapacityCheck;
}

/**
 * @description devide line string and return string array
 * @param line: original line string
 */
export function lineToArray(line: string): string[] {
  // const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa5]+\d*\-?\d*|-?\d+\.?\d*[a-zA-Z]*\+?\d*/g;
  const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa50-9\u2150-\u218f\.\-\+\(\)\《\》\/\*\，\_]+/g;
  return line.match(regexp) || [];
}
