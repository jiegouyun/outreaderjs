import { readWzqOutput } from './wzq';
import { IWzq } from '@outreader/core';
import * as path from 'path';
import { wzq as wzq1 } from '../../../../fixtures/test-result/pkpm-1/wzq';
import { wzq as wzq2 } from '../../../../fixtures/test-result/pkpm-2/wzq';

describe('wzq1', () => {
  const dir = path.join(__dirname, '../../../../fixtures/pkpm/3');
  let wzq: IWzq;

  beforeEach(async () => {
    wzq = await readWzqOutput(dir);
  });

  it('should read wzq.out', async () => {
    expect(wzq).toBeTruthy();
  });

  // it('should extract modeCoupling', async () => {
  //   const modeCoupling = wzq.modeCoupling;
  //   expect(modeCoupling.modeID[3]).toBe(wzq1.modeID);
  //   expect(modeCoupling.period[3]).toBe(wzq1.modeCouplingPeriod);
  //   expect(modeCoupling.factorX[3]).toBe(wzq1.modeCouplingFactorX);
  // });

  // it('should extract modeMass', async () => {
  //   const modeMass = wzq.modeMass;
  //   expect(modeMass.modeID[3]).toBe(wzq1.modeID);
  //   expect(modeMass.factorX[3]).toBe(wzq1.modeMassFactorX);
  //   expect(modeMass.factorY[3]).toBe(wzq1.modeMassFactorY);
  // });

  // it('should extract seismicForce', async () => {
  //   const seismicForce = wzq.seismicForce;
  //   expect(seismicForce.storeyID[4]).toBe(wzq1.storeyID);
  //   expect(seismicForce.shearX[4]).toBe(wzq1.shearX);
  //   expect(seismicForce.shearY[4]).toBe(wzq1.shearY);
  // });
});

// describe('wzq2', () => {
//   const dir = path.join(__dirname, '../../../../fixtures/pkpm/2');
//   let wzq: IWzq;

//   beforeEach(async () => {
//     wzq = await readWzqOutput(dir);
//   });

//   it('should read wzq.out', async () => {
//     expect(wzq).toBeTruthy();
//   });

//   it('should extract modeCoupling', async () => {
//     const modeCoupling = wzq.modeCoupling;
//     expect(modeCoupling.modeID[3]).toBe(wzq2.modeID);
//     expect(modeCoupling.period[3]).toBe(wzq2.modeCouplingPeriod);
//     expect(modeCoupling.factorX[3]).toBe(wzq2.modeCouplingFactorX);
//   });

//   it('should extract modeMass', async () => {
//     const modeMass = wzq.modeMass;
//     expect(modeMass.modeID[3]).toBe(wzq2.modeID);
//     expect(modeMass.factorX[3]).toBe(wzq2.modeMassFactorX);
//     expect(modeMass.factorY[3]).toBe(wzq2.modeMassFactorY);
//   });

//   it('should extract seismicForce', async () => {
//     const seismicForce = wzq.seismicForce;
//     expect(seismicForce.storeyID[4]).toBe(wzq2.storeyID);
//     expect(seismicForce.shearX[4]).toBe(wzq2.shearX);
//     expect(seismicForce.shearY[4]).toBe(wzq2.shearY);
//   });
// });
