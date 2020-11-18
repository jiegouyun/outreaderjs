import { readWmassOutput } from './wmass';
import { IWmass } from '@outreader/core';
import * as path from 'path';
import { wmass as wmass1 } from '../../../../fixtures/test-result/pkpm-1/wmass';
import { wmass as wmass2 } from '../../../../fixtures/test-result/pkpm-2/wmass';

describe('wmass1', () => {
  const dir = path.join(__dirname, '../../../../fixtures/pkpm/3');
  let wmass: IWmass;

  beforeEach(async () => {
    wmass = await readWmassOutput(dir);
  });

  it('should read wmass.out', async () => {
    expect(wmass).toBeTruthy();
  });

  // it('should extract information', async () => {
  //   const basicInformation = wmass.basicInformation;
  //   expect(basicInformation.engineering).toBe(wmass1.engineering);
  //   expect(basicInformation.software).toBe(wmass1.software);
  // });

  // it('should extract generalInformation', async () => {
  //   const generalInformation = wmass.generalInformation;
  //   expect(generalInformation.structuralSystem).toBe(wmass1.structuralSystem);
  //   expect(generalInformation.podium).toBe(wmass1.podium);
  //   expect(generalInformation.transferStorey).toBe(wmass1.transferStorey);
  //   expect(generalInformation.reinforceStorey).toBe(wmass1.reinforceStorey);
  // });

  // it('should extract calculationControl', async () => {
  //   const calculationControl = wmass.calculationControl;
  //   expect(calculationControl.couplingBeamFactorSeismic).toBe(
  //     wmass1.couplingBeamFactorSeismic,
  //   );
  //   expect(calculationControl.couplingBeamFactorWind).toBe(
  //     wmass1.couplingBeamFactorWind,
  //   );
  // });

  // it('should extract windInformation', async () => {
  //   const windInformation = wmass.windInformation;
  //   expect(windInformation.pressureModified).toBe(wmass1.windPressureModified);
  //   expect(windInformation.dampingRatio).toBe(wmass1.windDampingRatio);
  // });

  // it('should extract seismicInformation', async () => {
  //   const seismicInformation = wmass.seismicInformation;
  //   expect(seismicInformation.group).toBe(wmass1.seismicGroup);
  //   expect(seismicInformation.dampingRatio).toBe(wmass1.seismicDampingRatio);
  // });

  // it('should extract storey', async () => {
  //   const storey = wmass.storey;
  //   expect(storey.storeyID[4]).toBe(wmass1.storeyID);
  //   expect(storey.height[4]).toBe(wmass1.storeyHeight);
  //   expect(storey.area[4]).toBe(wmass1.sotreyArea);
  // });

  // it('should extract massRatio', async () => {
  //   const massRatio = wmass.massRatio;
  //   expect(massRatio.ratio[4]).toBe(wmass1.massRatio);
  //   expect(massRatio.massPerArea[4]).toBe(wmass1.massPerArea);
  // });

  // it('should extract weight', async () => {
  //   const weight = wmass.weight;
  //   expect(weight.live).toBe(wmass1.live);
  //   expect(weight.dead).toBe(wmass1.dead);
  // });

  // it('should extract wind', async () => {
  //   const wind = wmass.wind;
  //   expect(wind.shearAlongX[4]).toBe(wmass1.shearAlongX);
  //   expect(wind.shearAlongY[4]).toBe(wmass1.shearAlongY);
  // });

  // it('should extract stiffness', async () => {
  //   const stiffness = wmass.stiffness;
  //   expect(stiffness.storeyID[4]).toBe(wmass1.stiffnessStoreyID);
  //   expect(stiffness.ratx1[4]).toBe(wmass1.ratx1);
  //   expect(stiffness.ratx2[4]).toBe(wmass1.ratx2);
  //   expect(stiffness.rjx1[4]).toBe(wmass1.rjx1);
  //   expect(stiffness.rjx3[4]).toBe(wmass1.rjx3);
  // });

  // it('should extract overturningCheck', async () => {
  //   const overturningCheck = wmass.overturningCheck;
  //   expect(overturningCheck.mrWindX).toBe(wmass1.overturningCheckMrWindX);
  //   expect(overturningCheck.mrSeismicY).toBe(wmass1.overturningCheckMrSeismicY);
  // });

  // it('should extract stableCheck', async () => {
  //   const stableCheck = wmass.stableCheck;
  //   expect(stableCheck.seismicRatioX).toBe(wmass1.stableCheckSeismicRatioX);
  //   expect(stableCheck.seismicRatioY).toBe(wmass1.stableCheckSeismicRatioY);
  // });

  // it('should extract windComfort', async () => {
  //   const windComfort = wmass.windComfort;
  //   expect(windComfort.accelerationAlongX).toBe(wmass1.accelerationAlongX);
  //   expect(windComfort.accelerationCrossY).toBe(wmass1.accelerationCrossY);
  // });

  // it('should extract shearCapacityCheck', async () => {
  //   const shearCapacityCheck = wmass.shearCapacityCheck;
  //   expect(shearCapacityCheck.ratioX[4]).toBe(wmass1.shearCapacityCheckRatioX);
  // });
});

// describe('wmass2', () => {
//   const dir = path.join(__dirname, '../../../../fixtures/pkpm/2');
//   let wmass: IWmass;

//   beforeEach(async () => {
//     wmass = await readWmassOutput(dir);
//   });

//   it('should read wmass.out', async () => {
//     expect(wmass).toBeTruthy();
//   });

//   it('should extract information', async () => {
//     const basicInformation = wmass.basicInformation;
//     expect(basicInformation.engineering).toBe(wmass2.engineering);
//     expect(basicInformation.software).toBe(wmass2.software);
//   });

//   it('should extract generalInformation', async () => {
//     const generalInformation = wmass.generalInformation;
//     expect(generalInformation.structuralSystem).toBe(wmass2.structuralSystem);
//     expect(generalInformation.podium).toBe(wmass2.podium);
//     expect(generalInformation.transferStorey).toBe(wmass2.transferStorey);
//     expect(generalInformation.reinforceStorey).toBe(wmass2.reinforceStorey);
//   });

//   it('should extract calculationControl', async () => {
//     const calculationControl = wmass.calculationControl;
//     expect(calculationControl.couplingBeamFactorSeismic).toBe(
//       wmass2.couplingBeamFactorSeismic,
//     );
//     expect(calculationControl.couplingBeamFactorWind).toBe(
//       wmass2.couplingBeamFactorWind,
//     );
//   });

//   it('should extract windInformation', async () => {
//     const windInformation = wmass.windInformation;
//     expect(windInformation.pressureModified).toBe(wmass2.windPressureModified);
//     expect(windInformation.dampingRatio).toBe(wmass2.windDampingRatio);
//   });

//   it('should extract seismicInformation', async () => {
//     const seismicInformation = wmass.seismicInformation;
//     expect(seismicInformation.group).toBe(wmass2.seismicGroup);
//     expect(seismicInformation.dampingRatio).toBe(wmass2.seismicDampingRatio);
//   });

//   it('should extract storey', async () => {
//     const storey = wmass.storey;
//     expect(storey.storeyID[4]).toBe(wmass2.storeyID);
//     expect(storey.height[4]).toBe(wmass2.storeyHeight);
//     expect(storey.area[4]).toBe(wmass2.sotreyArea);
//   });

//   it('should extract massRatio', async () => {
//     const massRatio = wmass.massRatio;
//     expect(massRatio.ratio[4]).toBe(wmass2.massRatio);
//     expect(massRatio.massPerArea[4]).toBe(wmass2.massPerArea);
//   });

//   it('should extract weight', async () => {
//     const weight = wmass.weight;
//     expect(weight.live).toBe(wmass2.live);
//     expect(weight.dead).toBe(wmass2.dead);
//   });

//   it('should extract wind', async () => {
//     const wind = wmass.wind;
//     expect(wind.shearAlongX[4]).toBe(wmass2.shearAlongX);
//     expect(wind.shearAlongY[4]).toBe(wmass2.shearAlongY);
//   });

//   it('should extract stiffness', async () => {
//     const stiffness = wmass.stiffness;
//     expect(stiffness.storeyID[4]).toBe(wmass2.stiffnessStoreyID);
//     expect(stiffness.ratx1[4]).toBe(wmass2.ratx1);
//     expect(stiffness.ratx2[4]).toBe(wmass2.ratx2);
//     expect(stiffness.rjx1[4]).toBe(wmass2.rjx1);
//     expect(stiffness.rjx3[4]).toBe(wmass2.rjx3);
//   });

//   it('should extract overturningCheck', async () => {
//     const overturningCheck = wmass.overturningCheck;
//     expect(overturningCheck.mrWindX).toBe(wmass2.overturningCheckMrWindX);
//     expect(overturningCheck.mrSeismicY).toBe(wmass2.overturningCheckMrSeismicY);
//   });

//   it('should extract stableCheck', async () => {
//     const stableCheck = wmass.stableCheck;
//     expect(stableCheck.seismicRatioX).toBe(wmass2.stableCheckSeismicRatioX);
//     expect(stableCheck.seismicRatioY).toBe(wmass2.stableCheckSeismicRatioY);
//   });

//   it('should extract windComfort', async () => {
//     const windComfort = wmass.windComfort;
//     expect(windComfort.accelerationAlongX).toBe(wmass2.accelerationAlongX);
//     expect(windComfort.accelerationCrossY).toBe(wmass2.accelerationCrossY);
//   });

//   it('should extract shearCapacityCheck', async () => {
//     const shearCapacityCheck = wmass.shearCapacityCheck;
//     expect(shearCapacityCheck.ratioX[4]).toBe(wmass2.shearCapacityCheckRatioX);
//   });
// });
