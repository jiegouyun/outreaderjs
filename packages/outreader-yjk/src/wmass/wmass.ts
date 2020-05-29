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
  IWeight,
  IConstraintFloorStiffnessRatio,
  IOverturningCheck,
  IStableCheck,
} from './wmass.interface';

export async function readWmassOutput(dir: string): Promise<IWmass> {
  const file = path.join(dir, 'wmass.out');
  let wmass: IWmass = {
    information: { allExtracted: false },
    generalInformation: { allExtracted: false },
    calculationControl: { allExtracted: false },
    windInformation: { allExtracted: false },
    seismicInformation: { allExtracted: false },
    weight: { allExtracted: false },
    constraintFloorStiffnessRatio: { allExtracted: false },
    overturningCheck: { allExtracted: false },
    stableCheck: { allExtracted: false },
  };

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

    // Extract weight{}
    if (!wmass.weight.allExtracted) {
      wmass.weight = extractWeight(lineArray, wmass.weight);
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

    // // Extract stableCheck{}
    // if (!wmass.stableCheck.allExtracted) {
    //   wmass.stableCheckk = extractStableCheck(lineArray, wmass.stableCheck);
    // }
  });

  console.log(wmass);
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
    generalInformation.structuralSystem = extractData(
      lineArray,
      '结构体系',
      0,
      1,
    );
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

export function extractConstraintFloorStiffnessRatio(
  lineArray: string[],
  constraintFloorStiffnessRatio: IConstraintFloorStiffnessRatio,
): IConstraintFloorStiffnessRatio {
  if (!Boolean(constraintFloorStiffnessRatio.storeyID)) {
    constraintFloorStiffnessRatio.storeyID = Number(
      extractData(lineArray, '地下室层号', 0, 1),
    ); //why can not use array methon
    constraintFloorStiffnessRatio.towerID = Number(
      extractData(lineArray, '地下室层号', 0, 3),
    ); //why can not use array methon
  }
  if (!Boolean(constraintFloorStiffnessRatio.stiffnessX0)) {
    constraintFloorStiffnessRatio.stiffnessX0 = Number(
      extractData(lineArray, 'X方向地下一层剪切刚度', 0, 1),
    ); //why can not use array methon
    constraintFloorStiffnessRatio.stiffnessX1 = Number(
      extractData(lineArray, 'X方向地下一层剪切刚度', 0, 3),
    ); //why can not use array methon
    constraintFloorStiffnessRatio.ratioX = Number(
      extractData(lineArray, 'X方向地下一层剪切刚度', 0, 5),
    ); //why can not use array methon
  }
  if (!Boolean(constraintFloorStiffnessRatio.stiffnessY0)) {
    constraintFloorStiffnessRatio.stiffnessY0 = Number(
      extractData(lineArray, 'Y方向地下一层剪切刚度', 0, 1),
    ); //why can not use array methon
    constraintFloorStiffnessRatio.stiffnessY1 = Number(
      extractData(lineArray, 'Y方向地下一层剪切刚度', 0, 3),
    ); //why can not use array methon
    constraintFloorStiffnessRatio.ratioY = Number(
      extractData(lineArray, 'Y方向地下一层剪切刚度', 0, 5),
    ); //why can not use array methon
  }

  constraintFloorStiffnessRatio.allExtracted = checkObjectKeysIfAllExtracted(
    constraintFloorStiffnessRatio,
  );

  return constraintFloorStiffnessRatio;
}

export function extractOverturningCheck(
  lineArray: string[],
  overturningCheck: IOverturningCheck,
): IOverturningCheck {
  if (!Boolean(overturningCheck.storeyID)) {
    //storeyID and towerID
  }
  if (!Boolean(overturningCheck.mrWindX)) {
    overturningCheck.mrWindX = Number(extractData(lineArray, 'X向风', 0, 1)); //why can not use array methon
    overturningCheck.movWindX = Number(extractData(lineArray, 'X向风', 0, 2)); //why can not use array methon
    overturningCheck.ratioWindX = Number(extractData(lineArray, 'X向风', 0, 3)); //why can not use array methon
    overturningCheck.zeroAreaWindX = Number(
      extractData(lineArray, 'X向风', 0, 4),
    ); //why can not use array methon
  }
  if (!Boolean(overturningCheck.mrWindY)) {
    overturningCheck.mrWindY = Number(extractData(lineArray, 'Y向风', 0, 1)); //why can not use array methon
    overturningCheck.movWindY = Number(extractData(lineArray, 'Y向风', 0, 2)); //why can not use array methon
    overturningCheck.ratioWindY = Number(extractData(lineArray, 'Y向风', 0, 3)); //why can not use array methon
    overturningCheck.zeroAreaWindY = Number(
      extractData(lineArray, 'Y向风', 0, 4),
    ); //why can not use array methon
  }
  if (!Boolean(overturningCheck.mrSeismicX)) {
    overturningCheck.mrSeismicX = Number(extractData(lineArray, 'X地震', 0, 1)); //why can not use array methon
    overturningCheck.movSeismicX = Number(
      extractData(lineArray, 'X地震', 0, 2),
    ); //why can not use array methon
    overturningCheck.ratioSeismicX = Number(
      extractData(lineArray, 'X地震', 0, 3),
    ); //why can not use array methon
    overturningCheck.zeroAreaSeismicX = Number(
      extractData(lineArray, 'X地震', 0, 4),
    ); //why can not use array methon
  }
  if (!Boolean(overturningCheck.mrSeismicY)) {
    overturningCheck.mrSeismicY = Number(extractData(lineArray, 'Y地震', 0, 1)); //why can not use array methon
    overturningCheck.movSeismicY = Number(
      extractData(lineArray, 'Y地震', 0, 2),
    ); //why can not use array methon
    overturningCheck.ratioSeismicY = Number(
      extractData(lineArray, 'Y地震', 0, 3),
    ); //why can not use array methon
    overturningCheck.zeroAreaSeismicY = Number(
      extractData(lineArray, 'Y地震', 0, 4),
    ); //why can not use array methon
  }

  overturningCheck.allExtracted = checkObjectKeysIfAllExtracted(
    overturningCheck,
  );

  return overturningCheck;
}

/**
 * @description devide line string and return string array
 * @param line: original line string
 */
export function lineToArray(line: string): string[] {
  // const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa5]+\d*\-?\d*|-?\d+\.?\d*[a-zA-Z]*\+?\d*/g;
  const regexp: RegExp = /[a-zA-Z\u4e00-\u9fa50-9\.\-\+\(\)\《\》\/\*\，\_]+/g;
  return line.match(regexp) || [];
}
