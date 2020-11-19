import { IDistributeResultFE, IWmass, IWv02q, IWzq } from '../interfaces';

export function convertDistributeResult(
  wmass?: IWmass,
  wzq?: IWzq,
  wv02q?: IWv02q,
): IDistributeResultFE {
  const distributeResult: IDistributeResultFE = {
    storey: {
      storeyID: wmass?.storey.storeyID || [1],
      towerID: wmass?.storey.towerID || [1],
      attribute: wmass?.storey.attribute || [],
      height: wmass?.storey.height || [0],
      heightToGround: wmass?.storey.heightToGround || [0],
      area: wmass?.storey.area || [0],
      wallSectionAreaX: wmass?.storey.wallSectionAreaX || [0],
      wallSectionAreaY: wmass?.storey.wallSectionAreaY || [0],
      wallSectionAreaStorey: (wmass?.storey.wallSectionAreaX || [0]).map(
        (elem, index) => {
          return elem + (wmass?.storey.wallSectionAreaY || [0])[index];
        },
      ),
      wallSectionAreaRatio: (wmass?.storey.wallSectionAreaX || [0]).map(
        (elem, index) => {
          return (
            ((elem + (wmass?.storey.wallSectionAreaY || [0])[index]) /
              (wmass?.storey.area || [1])[index]) *
            100
          );
        },
      ),
    },
    massRatio: {
      storeyID: wmass?.massRatio.storeyID || [1],
      towerID: wmass?.massRatio.towerID || [1],
      ratio: wmass?.massRatio.ratio || [0],
      storeyMass: wmass?.massRatio.storeyMass || [0],
      massPerArea: wmass?.massRatio.massPerArea || [0],
      massPerAreaRatio: wmass?.massRatio.massPerAreaRatio || [0],
    },
    stiffness: {
      storeyID: wmass?.stiffness.storeyID || [1],
      towerID: wmass?.stiffness.towerID || [1],
      ratx1: wmass?.stiffness.ratx1 || [0],
      ratx2: wmass?.stiffness.ratx2 || [0],
      rjx1: wmass?.stiffness.rjx1 || [0],
      rjx3: wmass?.stiffness.rjx3 || [0],
      raty1: wmass?.stiffness.raty1 || [0],
      raty2: wmass?.stiffness.raty2 || [0],
      rjy1: wmass?.stiffness.rjy1 || [0],
      rjy3: wmass?.stiffness.rjy3 || [0],
      rjz1: wmass?.stiffness.rjz1 || [0],
      rjz3: wmass?.stiffness.rjz3 || [0],
    },
    shearWeightRatio: {
      storeyID: wzq?.seismicForce.storeyID || [1],
      towerID: wzq?.seismicForce.towerID || [1],
      factorX: wzq?.seismicForce.shearWeightRatioX || [0],
      factorY: wzq?.seismicForce.shearWeightRatioY || [0],
    },
    shearCapacityCheck: {
      storeyID: wmass?.shearCapacityCheck.storeyID || [1],
      towerID: wmass?.shearCapacityCheck.towerID || [1],
      capacityX: wmass?.shearCapacityCheck.capacityX || [0],
      ratioX: wmass?.shearCapacityCheck.ratioX || [0],
      capacityY: wmass?.shearCapacityCheck.capacityY || [0],
      ratioY: wmass?.shearCapacityCheck.ratioY || [0],
    },
    momentPercent: {
      storeyID: wv02q?.momentPercent.storeyID || [1],
      towerID: wv02q?.momentPercent.towerID || [1],
      percentColumnX: wv02q?.momentPercent.percentColumnX || [0],
      percentWallX: wv02q?.momentPercent.percentWallX || [0],
      percentColumnY: wv02q?.momentPercent.percentColumnY || [0],
      percentWallY: wv02q?.momentPercent.percentWallY || [0],
      percentWallXX: wv02q?.momentPercent.percentWallXX || [0],
      percentWallYX: wv02q?.momentPercent.percentWallYX || [0],
      percentEdgeX: wv02q?.momentPercent.percentEdgeX || [0],
      percentWallXY: wv02q?.momentPercent.percentWallXY || [0],
      percentWallYY: wv02q?.momentPercent.percentWallYY || [0],
      percentEdgeY: wv02q?.momentPercent.percentEdgeY || [0],
    },
    columnShear: {
      storeyID: wv02q?.columnShear.storeyID || [1],
      towerID: wv02q?.columnShear.towerID || [1],
      columnX: wv02q?.columnShear.columnX || [0],
      wallX: wv02q?.columnShear.wallX || [0],
      totalX: wv02q?.columnShear.totalX || [0],
      percentColumnX: wv02q?.columnShear.percentColumnX || [0],
      columnY: wv02q?.columnShear.columnY || [0],
      wallY: wv02q?.columnShear.wallY || [0],
      totalY: wv02q?.columnShear.totalY || [0],
      percentColumnY: wv02q?.columnShear.percentColumnY || [0],
      percentWallXX: wv02q?.columnShear.percentWallXX || [0],
      percentWallYX: wv02q?.columnShear.percentWallYX || [0],
      percentEdgeX: wv02q?.columnShear.percentEdgeX || [0],
      percentWallXY: wv02q?.columnShear.percentWallXY || [0],
      percentWallYY: wv02q?.columnShear.percentWallYY || [0],
      percentEdgeY: wv02q?.columnShear.percentEdgeY || [0],
    },
  };

  return distributeResult;
}
