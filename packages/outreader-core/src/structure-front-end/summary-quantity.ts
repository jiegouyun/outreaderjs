import { IStructure, ISummaryQuantityFE } from '../interfaces';

export function convertSummaryQuantity(
  structure: IStructure,
): ISummaryQuantityFE {
  const totalArea: number =
    structure.rebar?.area.totalArea ||
    (structure.wmass?.storey.area || [1]).reduce(function (sum, cur) {
      return sum + cur;
    });
  const summaryQuantity: ISummaryQuantityFE = {
    structure: {
      engineering: structure.wmass?.basicInformation.engineering || '',
      height: structure.wmass?.generalInformation.basement
        ? (structure.wmass?.storey.heightToGround[0] || 0) -
          (structure.wmass?.storey.heightToGround[
            structure.wmass?.storey.heightToGround.length -
              (structure.wmass?.generalInformation.basement || 0)
          ] || 0)
        : structure.wmass?.storey.heightToGround[0] || 0,
      area: totalArea,
      period: `${
        Math.round((structure.wzq?.modeCoupling.period[0] || 0) * 100) / 100
      }/${
        Math.round((structure.wzq?.modeCoupling.period[1] || 0) * 100) / 100
      }/${
        Math.round((structure.wzq?.modeCoupling.period[2] || 0) * 100) / 100
      }`,
      drift: `${Math.min(
        ...(structure.wdisp?.driftWindXP.drift || [0]),
        ...(structure.wdisp?.driftWindYP.drift || [0]),
      )}/${Math.min(
        ...(structure.wdisp?.driftSeismicX.drift || [0]),
        ...(structure.wdisp?.driftSeismicY.drift || [0]),
      )}`,
    },
    unitRebar: {
      wall: (structure.rebar?.wallRebar.total || 0) / totalArea,
      column: (structure.rebar?.columnRebar.total || 0) / totalArea,
      beam: (structure.rebar?.beamRebar.total || 0) / totalArea,
      floor: (structure.rebar?.floorRebar.total || 0) / totalArea,
      total: (structure.rebar?.projectRebar.total || 0) / totalArea,
    },
    unitConcrete: {
      wall: (structure.concreteSteel?.concrete.totalWall || 0) / totalArea,
      column: (structure.concreteSteel?.concrete.totalColumn || 0) / totalArea,
      beam: (structure.concreteSteel?.concrete.totalBeam || 0) / totalArea,
      floor: (structure.concreteSteel?.concrete.totalFloor || 0) / totalArea,
      total: (structure.concreteSteel?.concrete.totalStorey || 0) / totalArea,
    },
    unitSteel: {
      wall: (structure.concreteSteel?.steel.totalWall || 0) / totalArea,
      column: (structure.concreteSteel?.steel.totalColumn || 0) / totalArea,
      beam: (structure.concreteSteel?.steel.totalBeam || 0) / totalArea,
      floor: (structure.concreteSteel?.steel.totalFloor || 0) / totalArea,
      total: (structure.concreteSteel?.steel.totalStorey || 0) / totalArea,
    },
    rebar: {
      wall: structure.rebar?.wallRebar.total || 0,
      column: structure.rebar?.columnRebar.total || 0,
      beam: structure.rebar?.beamRebar.total || 0,
      floor: structure.rebar?.floorRebar.total || 0,
      total: structure.rebar?.projectRebar.total || 0,
    },
    concrete: {
      wall: structure.concreteSteel?.concrete.totalWall || 0,
      column: structure.concreteSteel?.concrete.totalColumn || 0,
      beam: structure.concreteSteel?.concrete.totalBeam || 0,
      floor: structure.concreteSteel?.concrete.totalFloor || 0,
      total: structure.concreteSteel?.concrete.totalStorey || 0,
    },
    steel: {
      wall: structure.concreteSteel?.steel.totalWall || 0,
      column: structure.concreteSteel?.steel.totalColumn || 0,
      beam: structure.concreteSteel?.steel.totalBeam || 0,
      floor: structure.concreteSteel?.steel.totalFloor || 0,
      total: structure.concreteSteel?.steel.totalStorey || 0,
    },
  };

  return summaryQuantity;
}
