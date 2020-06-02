import { readWmassOutput, IWmass } from './wmass';
import * as path from 'path';

describe('wmass', () => {
  const dir = path.join(__dirname, '../../../../fixtures/yjk/1');
  let wmass: IWmass;

  beforeEach(async () => {
    wmass = await readWmassOutput(dir);
  });

  it('should read wmass.out', async () => {
    expect(wmass).toBeTruthy();
  });

  it('should extract information', async () => {
    const information = wmass.information;
    expect(information.engineering).toBe('071A');
    expect(information.software).toBe('盈建科建筑结构设计软件');
  });

  it('should extract generalInformation', async () => {
    const generalInformation = wmass.generalInformation;
    expect(generalInformation.structuralSystem).toBe('框筒结构');
    expect(generalInformation.podium).toBe(9);
    expect(generalInformation.transferStorey).toBe(0);
    expect(generalInformation.reinforceStorey).toBe(0);
  });

  it('should extract calculationControl', async () => {
    const calculationControl = wmass.calculationControl;
    expect(calculationControl.couplingBeamFactorSeismic).toBe(0.7);
    expect(calculationControl.couplingBeamFactorWind).toBe(1.0);
  });

  it('should extract windInformation', async () => {
    const windInformation = wmass.windInformation;
    expect(windInformation.pressureModified).toBe(0.75);
    expect(windInformation.dampingRatio).toBe(0.05);
  });

  it('should extract seismicInformation', async () => {
    const seismicInformation = wmass.seismicInformation;
    expect(seismicInformation.group).toBe('一');
    expect(seismicInformation.dampingRatio).toBe(0.05);
  });

  it('should extract storey', async () => {
    const storey = wmass.storey;
    expect(storey.storeyID[4]).toBe(50);
    expect(storey.height[4]).toBe(4.5);
    expect(storey.area[4]).toBe(1614.89);
  });

  it('should extract tower', async () => {
    const tower = wmass.tower;
    expect(tower.towerID[0]).toBe(1);
    expect(tower.structuralSystem[0]).toBe('框筒结构');
  });

  it('should extract massRatio', async () => {
    const massRatio = wmass.massRatio;
    expect(massRatio.storeyID[4]).toBe(50);
    expect(massRatio.ratio[4]).toBe(1.0);
    expect(massRatio.massPerArea[4]).toBe(1481.91);
  });

  it('should extract weight', async () => {
    const weight = wmass.weight;
    expect(weight.live).toBe(23980.664);
    expect(weight.dead).toBe(198539.547);
  });

  it('should extract wind', async () => {
    const wind = wmass.wind;
    expect(wind.storeyID[4]).toBe(50);
    expect(wind.shearX[4]).toBe(-1600.5);
    expect(wind.shearY[4]).toBe(2770.6);
  });

  it('should extract stiffness', async () => {
    const stiffness = wmass.stiffness;
    expect(stiffness.storeyID[4]).toBe(5);
    expect(stiffness.ratx1[4]).toBe(6705.0505);
    expect(stiffness.ratx2[4]).toBe(5258.8637);
    expect(stiffness.rjx1[4]).toBe(1.8963e8);
    expect(stiffness.rjx3[4]).toBe(5.9294e10);
  });

  it('should extract constraintFloorStiffnessRatio', async () => {
    const constraintFloorStiffnessRatio = wmass.constraintFloorStiffnessRatio;
    expect(constraintFloorStiffnessRatio.storeyID).toBe(5);
    expect(constraintFloorStiffnessRatio.ratioX).toBe(1.9499);
    expect(constraintFloorStiffnessRatio.ratioY).toBe(2.2203);
  });

  it('should extract overturningCheck', async () => {
    const overturningCheck = wmass.overturningCheck;
    expect(overturningCheck.storeyID).toBe(3);
    expect(overturningCheck.mrWindX).toBe(1.217e8);
    expect(overturningCheck.mrSeismicY).toBe(6.708e7);
  });

  it('should extract stableCheck', async () => {
    const stableCheck = wmass.stableCheck;
    expect(stableCheck.seismicID).toBe(6);
    expect(stableCheck.seismicRatioX).toBe(2.334);
    expect(stableCheck.windID).toBe(6);
    expect(stableCheck.windRatioY).toBe(1.878);
  });

  it('should extract shearWeightRatioModify', async () => {
    const shearWeightRatioModify = wmass.shearWeightRatioModify;
    expect(shearWeightRatioModify.storeyID[4]).toBe(50);
    expect(shearWeightRatioModify.factorX[4]).toBe(1.116);
  });

  it('should extract windComfort', async () => {
    const windComfort = wmass.windComfort;
    expect(windComfort.accelerationAlongX).toBe(0.063);
    expect(windComfort.accelerationCrossY).toBe(0.083);
  });

  it('should extract shearCapacityCheck', async () => {
    const shearCapacityCheck = wmass.shearCapacityCheck;
    expect(shearCapacityCheck.storeyID[4]).toBe(50);
    expect(shearCapacityCheck.ratioX[4]).toBe(1.06);
  });
});
