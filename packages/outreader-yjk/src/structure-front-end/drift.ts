import {
  IStructure,
  IDriftFE,
  ISeismicDriftFE,
  IWindDriftFE,
  ISeismicDispRatio,
} from '@outreader/core';

export function convertDrift(structure: IStructure): IDriftFE {
  const drift: IDriftFE = {
    driftSeismicX: structure.wdisp?.driftSeismicX as ISeismicDriftFE,
    driftSeismicTwoWayX: structure.wdisp
      ?.driftSeismicTwoWayX as ISeismicDriftFE,
    driftSeismicXEccP: structure.wdisp?.driftSeismicXEccP as ISeismicDriftFE,
    driftSeismicXEccN: structure.wdisp?.driftSeismicXEccN as ISeismicDriftFE,
    driftSeismicY: structure.wdisp?.driftSeismicY as ISeismicDriftFE,
    driftSeismicTwoWayY: structure.wdisp
      ?.driftSeismicTwoWayY as ISeismicDriftFE,
    driftSeismicYEccP: structure.wdisp?.driftSeismicYEccP as ISeismicDriftFE,
    driftSeismicYEccN: structure.wdisp?.driftSeismicYEccN as ISeismicDriftFE,
    driftWindXP: structure.wdisp?.driftWindXP as IWindDriftFE,
    driftCrossWindXP: structure.wdisp?.driftCrossWindXP as IWindDriftFE,
    driftWindXN: structure.wdisp?.driftWindXN as IWindDriftFE,
    driftCrossWindXN: structure.wdisp?.driftCrossWindXN as IWindDriftFE,
    driftWindYP: structure.wdisp?.driftWindYP as IWindDriftFE,
    driftCrossWindYP: structure.wdisp?.driftCrossWindYP as IWindDriftFE,
    driftWindYN: structure.wdisp?.driftWindYN as IWindDriftFE,
    driftCrossWindYN: structure.wdisp?.driftCrossWindYN as IWindDriftFE,
    ratioSeismicX: structure.wdisp?.ratioSeismicX as ISeismicDispRatio,
    ratioSeismicXEccP: structure.wdisp?.ratioSeismicXEccP as ISeismicDispRatio,
    ratioSeismicXEccN: structure.wdisp?.ratioSeismicXEccN as ISeismicDispRatio,
    ratioSeismicY: structure.wdisp?.ratioSeismicY as ISeismicDispRatio,
    ratioSeismicYEccP: structure.wdisp?.ratioSeismicYEccP as ISeismicDispRatio,
    ratioSeismicYEccN: structure.wdisp?.ratioSeismicYEccN as ISeismicDispRatio,
  };

  return drift;
}
