import { IStructure, ISummaryQuantityFE } from '@outreader/core';

export function convertSummaryQuantity(
  structure: IStructure,
): ISummaryQuantityFE {
  const summaryQuantity: ISummaryQuantityFE = {
    structure: {
      engineering: structure.wmass?.basicInformation.engineering || '',
      height: structure.wmass?.generalInformation.basement
        ? (structure.wmass?.storey.heightToGround[0] as number) -
          (structure.wmass?.storey.heightToGround[
            structure.wmass?.storey.heightToGround.length -
              (structure.wmass?.generalInformation.basement as number)
          ] as number)
        : (structure.wmass?.storey.heightToGround[0] as number),
      area: structure.rebar?.area.totalArea as number,
      period: `${
        Math.round((structure.wzq?.modeCoupling.period[0] as number) * 100) /
        100
      }/${
        Math.round((structure.wzq?.modeCoupling.period[1] as number) * 100) /
        100
      }/${
        Math.round((structure.wzq?.modeCoupling.period[2] as number) * 100) /
        100
      }`,
      drift: `${Math.min(
        ...(structure.wdisp?.driftWindXP.drift as number[]),
        ...(structure.wdisp?.driftWindYP.drift as number[]),
      )}/${Math.min(
        ...(structure.wdisp?.driftSeismicX.drift as number[]),
        ...(structure.wdisp?.driftSeismicY.drift as number[]),
      )}`,
    },
    unitRebar: {
      wall:
        (structure.rebar?.wallRebar.total as number) /
        (structure.rebar?.area.totalArea as number),
      column:
        (structure.rebar?.columnRebar.total as number) /
        (structure.rebar?.area.totalArea as number),
      beam:
        (structure.rebar?.beamRebar.total as number) /
        (structure.rebar?.area.totalArea as number),
      floor:
        (structure.rebar?.floorRebar.total as number) /
        (structure.rebar?.area.totalArea as number),
      total:
        (structure.rebar?.projectRebar.total as number) /
        (structure.rebar?.area.totalArea as number),
    },
    unitConcrete: {
      wall:
        (structure.concreteSteel?.concrete.totalWall as number) /
        (structure.rebar?.area.totalArea as number),
      column:
        (structure.concreteSteel?.concrete.totalColumn as number) /
        (structure.rebar?.area.totalArea as number),
      beam:
        (structure.concreteSteel?.concrete.totalBeam as number) /
        (structure.rebar?.area.totalArea as number),
      floor:
        (structure.concreteSteel?.concrete.totalFloor as number) /
        (structure.rebar?.area.totalArea as number),
      total:
        (structure.concreteSteel?.concrete.totalStorey as number) /
        (structure.rebar?.area.totalArea as number),
    },
    unitSteel: {
      wall:
        (structure.concreteSteel?.steel.totalWall as number) /
        (structure.rebar?.area.totalArea as number),
      column:
        (structure.concreteSteel?.steel.totalColumn as number) /
        (structure.rebar?.area.totalArea as number),
      beam:
        (structure.concreteSteel?.steel.totalBeam as number) /
        (structure.rebar?.area.totalArea as number),
      floor:
        (structure.concreteSteel?.steel.totalFloor as number) /
        (structure.rebar?.area.totalArea as number),
      total:
        (structure.concreteSteel?.steel.totalStorey as number) /
        (structure.rebar?.area.totalArea as number),
    },
    rebar: {
      wall: structure.rebar?.wallRebar.total as number,
      column: structure.rebar?.columnRebar.total as number,
      beam: structure.rebar?.beamRebar.total as number,
      floor: structure.rebar?.floorRebar.total as number,
      total: structure.rebar?.projectRebar.total as number,
    },
    concrete: {
      wall: structure.concreteSteel?.concrete.totalWall as number,
      column: structure.concreteSteel?.concrete.totalColumn as number,
      beam: structure.concreteSteel?.concrete.totalBeam as number,
      floor: structure.concreteSteel?.concrete.totalFloor as number,
      total: structure.concreteSteel?.concrete.totalStorey as number,
    },
    steel: {
      wall: structure.concreteSteel?.steel.totalWall as number,
      column: structure.concreteSteel?.steel.totalColumn as number,
      beam: structure.concreteSteel?.steel.totalBeam as number,
      floor: structure.concreteSteel?.steel.totalFloor as number,
      total: structure.concreteSteel?.steel.totalStorey as number,
    },
  };

  return summaryQuantity;
}
