import {
  IConcreteSteel,
  IRebar,
  IStructure,
  ISummaryQuantityFE,
  IWdisp,
  IWmass,
  IWzq,
} from '../interfaces';

export function convertSummaryQuantity(
  wmass?: IWmass,
  wdisp?: IWdisp,
  wzq?: IWzq,
  concreteSteel?: IConcreteSteel,
  rebar?: IRebar,
): ISummaryQuantityFE {
  const totalArea: number =
    rebar?.area.totalArea ||
    (wmass?.storey.area || [1]).reduce(function (sum, cur) {
      return sum + cur;
    });
  const summaryQuantity: ISummaryQuantityFE = {
    structure: {
      engineering: wmass?.basicInformation.engineering || '',
      height: wmass?.generalInformation.basement
        ? (wmass?.storey.heightToGround[0] || 0) -
          (wmass?.storey.heightToGround[
            wmass?.storey.heightToGround.length -
              (wmass?.generalInformation.basement || 0)
          ] || 0)
        : wmass?.storey.heightToGround[0] || 0,
      area: totalArea,
      period: `${Math.round((wzq?.modeCoupling.period[0] || 0) * 100) / 100}/${
        Math.round((wzq?.modeCoupling.period[1] || 0) * 100) / 100
      }/${Math.round((wzq?.modeCoupling.period[2] || 0) * 100) / 100}`,
      drift: `${Math.min(
        ...(wdisp?.driftWindXP.drift || [0]),
        ...(wdisp?.driftWindYP.drift || [0]),
      )}/${Math.min(
        ...(wdisp?.driftSeismicX.drift || [0]),
        ...(wdisp?.driftSeismicY.drift || [0]),
      )}`,
    },
    unitRebar: {
      wall: (rebar?.wallRebar.total || 0) / totalArea,
      column: (rebar?.columnRebar.total || 0) / totalArea,
      beam: (rebar?.beamRebar.total || 0) / totalArea,
      floor: (rebar?.floorRebar.total || 0) / totalArea,
      total: (rebar?.projectRebar.total || 0) / totalArea,
    },
    unitConcrete: {
      wall: (concreteSteel?.concrete.totalWall || 0) / totalArea,
      column: (concreteSteel?.concrete.totalColumn || 0) / totalArea,
      beam: (concreteSteel?.concrete.totalBeam || 0) / totalArea,
      floor: (concreteSteel?.concrete.totalFloor || 0) / totalArea,
      total: (concreteSteel?.concrete.totalStorey || 0) / totalArea,
    },
    unitSteel: {
      wall: (concreteSteel?.steel.totalWall || 0) / totalArea,
      column: (concreteSteel?.steel.totalColumn || 0) / totalArea,
      beam: (concreteSteel?.steel.totalBeam || 0) / totalArea,
      floor: (concreteSteel?.steel.totalFloor || 0) / totalArea,
      total: (concreteSteel?.steel.totalStorey || 0) / totalArea,
    },
    rebar: {
      wall: rebar?.wallRebar.total || 0,
      column: rebar?.columnRebar.total || 0,
      beam: rebar?.beamRebar.total || 0,
      floor: rebar?.floorRebar.total || 0,
      total: rebar?.projectRebar.total || 0,
    },
    concrete: {
      wall: concreteSteel?.concrete.totalWall || 0,
      column: concreteSteel?.concrete.totalColumn || 0,
      beam: concreteSteel?.concrete.totalBeam || 0,
      floor: concreteSteel?.concrete.totalFloor || 0,
      total: concreteSteel?.concrete.totalStorey || 0,
    },
    steel: {
      wall: concreteSteel?.steel.totalWall || 0,
      column: concreteSteel?.steel.totalColumn || 0,
      beam: concreteSteel?.steel.totalBeam || 0,
      floor: concreteSteel?.steel.totalFloor || 0,
      total: concreteSteel?.steel.totalStorey || 0,
    },
  };

  return summaryQuantity;
}
