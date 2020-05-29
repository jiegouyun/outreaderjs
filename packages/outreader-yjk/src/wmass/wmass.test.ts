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
});
