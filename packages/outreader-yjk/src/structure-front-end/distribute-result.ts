import { IStructure, IDistributeResultFE } from '@outreader/core';

export function convertDistributeResult(
  structure: IStructure,
): IDistributeResultFE {
  const distributeResult: IDistributeResultFE = {
    storey: {
      storeyID: structure.wmass?.storey.storeyID || [0],
      towerID: structure.wmass?.storey.towerID || [0],
      attribute: structure.wmass?.storey.attribute || [],
      height: structure.wmass?.storey.height || [0],
      heightToGround: structure.wmass?.storey.heightToGround || [0],
      area: structure.wmass?.storey.area || [0],
      wallSectionAreaX: structure.wmass?.storey.wallSectionAreaX || [0],
      wallSectionAreaY: structure.wmass?.storey.wallSectionAreaY || [0],
      wallSectionAreaStorey: (
        structure.wmass?.storey.wallSectionAreaX || [0]
      ).map((elem, index) => {
        return elem + (structure.wmass?.storey.wallSectionAreaY || [0])[index];
      }),
      wallSectionAreaRatio: (
        structure.wmass?.storey.wallSectionAreaX || [0]
      ).map((elem, index) => {
        return (
          ((elem + (structure.wmass?.storey.wallSectionAreaY || [0])[index]) /
            (structure.wmass?.storey.area || [1])[index]) *
          100
        );
      }),
    },
    massRatio: {
      storeyID: structure.wmass?.massRatio.storeyID || [0],
      towerID: structure.wmass?.massRatio.towerID || [0],
      ratio: structure.wmass?.massRatio.ratio || [0],
      storeyMass: structure.wmass?.massRatio.storeyMass || [0],
      massPerArea: structure.wmass?.massRatio.massPerArea || [0],
      massPerAreaRatio: structure.wmass?.massRatio.massPerAreaRatio || [0],
    },
    stiffness: {
      storeyID: structure.wmass?.stiffness.storeyID || [0],
      towerID: structure.wmass?.stiffness.towerID || [0],
      ratx1: structure.wmass?.stiffness.ratx1 || [0],
      ratx2: structure.wmass?.stiffness.ratx2 || [0],
      rjx1: structure.wmass?.stiffness.rjx1 || [0],
      rjx3: structure.wmass?.stiffness.rjx3 || [0],
      raty1: structure.wmass?.stiffness.raty1 || [0],
      raty2: structure.wmass?.stiffness.raty2 || [0],
      rjy1: structure.wmass?.stiffness.rjy1 || [0],
      rjy3: structure.wmass?.stiffness.rjy3 || [0],
      rjz1: structure.wmass?.stiffness.rjz1 || [0],
      rjz3: structure.wmass?.stiffness.rjz3 || [0],
    },
    shearWeightRatio: {
      storeyID: structure.wzq?.seismicForce.storeyID || [0],
      towerID: structure.wzq?.seismicForce.towerID || [0],
      factorX: structure.wzq?.seismicForce.shearWeightRatioX || [0],
      factorY: structure.wzq?.seismicForce.shearWeightRatioY || [0],
    },
    shearCapacityCheck: {
      storeyID: structure.wmass?.shearCapacityCheck.storeyID || [0],
      towerID: structure.wmass?.shearCapacityCheck.towerID || [0],
      capacityX: structure.wmass?.shearCapacityCheck.capacityX || [0],
      ratioX: structure.wmass?.shearCapacityCheck.ratioX || [0],
      capacityY: structure.wmass?.shearCapacityCheck.capacityY || [0],
      ratioY: structure.wmass?.shearCapacityCheck.ratioY || [0],
    },
    momentPercent: {
      storeyID: structure.wv02q?.momentPercent.storeyID || [0],
      towerID: structure.wv02q?.momentPercent.towerID || [0],
      percentColumnX: structure.wv02q?.momentPercent.percentColumnX || [0],
      percentWallX: structure.wv02q?.momentPercent.percentWallX || [0],
      percentColumnY: structure.wv02q?.momentPercent.percentColumnY || [0],
      percentWallY: structure.wv02q?.momentPercent.percentWallY || [0],
      percentWallXX: structure.wv02q?.momentPercent.percentWallXX || [0],
      percentWallYX: structure.wv02q?.momentPercent.percentWallYX || [0],
      percentEdgeX: structure.wv02q?.momentPercent.percentEdgeX || [0],
      percentWallXY: structure.wv02q?.momentPercent.percentWallXY || [0],
      percentWallYY: structure.wv02q?.momentPercent.percentWallYY || [0],
      percentEdgeY: structure.wv02q?.momentPercent.percentEdgeY || [0],
    },
    columnShear: {
      storeyID: structure.wv02q?.columnShear.storeyID || [0],
      towerID: structure.wv02q?.columnShear.towerID || [0],
      columnX: structure.wv02q?.columnShear.columnX || [0],
      wallX: structure.wv02q?.columnShear.wallX || [0],
      totalX: structure.wv02q?.columnShear.totalX || [0],
      percentColumnX: structure.wv02q?.columnShear.percentColumnX || [0],
      columnY: structure.wv02q?.columnShear.columnY || [0],
      wallY: structure.wv02q?.columnShear.wallY || [0],
      totalY: structure.wv02q?.columnShear.totalY || [0],
      percentColumnY: structure.wv02q?.columnShear.percentColumnY || [0],
      percentWallXX: structure.wv02q?.columnShear.percentWallXX || [0],
      percentWallYX: structure.wv02q?.columnShear.percentWallYX || [0],
      percentEdgeX: structure.wv02q?.columnShear.percentEdgeX || [0],
      percentWallXY: structure.wv02q?.columnShear.percentWallXY || [0],
      percentWallYY: structure.wv02q?.columnShear.percentWallYY || [0],
      percentEdgeY: structure.wv02q?.columnShear.percentEdgeY || [0],
    },
  };

  return distributeResult;
}
