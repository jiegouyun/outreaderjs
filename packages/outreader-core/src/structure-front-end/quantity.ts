import { IQuantityFE, IWmass, IConcreteSteel, IRebar } from '../interfaces';

export function convertQuantity(
  wmass?: IWmass,
  concreteSteel?: IConcreteSteel,
  rebar?: IRebar,
): IQuantityFE {
  const area = wmass?.storey.area || rebar?.area.storey || [1];
  const quantity: IQuantityFE = {
    storeyID: concreteSteel?.concrete.storeyID ||
      rebar?.area.storeyID ||
      wmass?.storey.storeyID || [1],
    towerID: wmass?.storey.towerID || [1],
    area: area,
    concrete: {
      storeyID: concreteSteel?.concrete.storeyID || [1],
      wall: concreteSteel?.concrete.wall || [0],
      beam: concreteSteel?.concrete.beam || [0],
      column: concreteSteel?.concrete.column || [0],
      floor: concreteSteel?.concrete.floor || [0],
      storey: concreteSteel?.concrete.storey || [0],
    },
    unitConcrete: {
      storeyID: concreteSteel?.concrete.storeyID || [1],
      wall: quantityPerArea(concreteSteel?.concrete.wall || [0], area) || [0],
      beam: quantityPerArea(concreteSteel?.concrete.beam || [0], area) || [0],
      column: quantityPerArea(concreteSteel?.concrete.column || [0], area) || [
        0,
      ],
      floor: quantityPerArea(concreteSteel?.concrete.floor || [0], area) || [0],
      storey: quantityPerArea(concreteSteel?.concrete.storey || [0], area) || [
        0,
      ],
    },
    steel: {
      storeyID: concreteSteel?.steel.storeyID || [1],
      wall: concreteSteel?.steel.wall || [0],
      beam: concreteSteel?.steel.beam || [0],
      column: concreteSteel?.steel.column || [0],
      floor: concreteSteel?.steel.floor || [0],
      storey: concreteSteel?.steel.storey || [0],
    },
    unitSteel: {
      storeyID: concreteSteel?.steel.storeyID || [1],
      wall: quantityPerArea(concreteSteel?.steel.wall || [0], area) || [0],
      beam: quantityPerArea(concreteSteel?.steel.beam || [0], area) || [0],
      column: quantityPerArea(concreteSteel?.steel.column || [0], area) || [0],
      floor: quantityPerArea(concreteSteel?.steel.floor || [0], area) || [0],
      storey: quantityPerArea(concreteSteel?.steel.storey || [0], area) || [0],
    },
    rebar: {
      storeyID: rebar?.area.storeyID || [1],
      wall: rebar?.wallRebar.storey || [0],
      beam: rebar?.beamRebar.storey || [0],
      column: rebar?.columnRebar.storey || [0],
      floor: rebar?.floorRebar.storey || [0],
      storey: storeyRebar(
        rebar?.wallRebar.storey || [0],
        rebar?.columnRebar.storey || [0],
        rebar?.beamRebar.storey || [0],
        rebar?.floorRebar.storey || [0],
      ) || [0],
    },
    unitRebar: {
      storeyID: rebar?.area.storeyID || [1],
      wall: quantityPerArea(rebar?.wallRebar.storey || [0], area) || [0],
      beam: quantityPerArea(rebar?.beamRebar.storey || [0], area) || [0],
      column: quantityPerArea(rebar?.columnRebar.storey || [0], area) || [0],
      floor: quantityPerArea(rebar?.floorRebar.storey || [0], area) || [0],
      storey: quantityPerArea(
        storeyRebar(
          rebar?.wallRebar.storey || [0],
          rebar?.columnRebar.storey || [0],
          rebar?.beamRebar.storey || [0],
          rebar?.floorRebar.storey || [0],
        ) || [0],
        area,
      ) || [0],
    },
  };

  return quantity;
}

function quantityPerArea(
  quantity: number[],
  area: number[],
): number[] | undefined {
  if (quantity === [0] || area === [0]) {
    return [0];
  }

  let result: number[] = [];

  for (let i: number = 0; i <= quantity.length - 1; i++) {
    result[i] = quantity[i] / area[i];
  }

  return result;
}

function storeyRebar(
  wall: number[],
  column: number[],
  beam: number[],
  floor: number[],
): number[] | undefined {
  if (!wall && !column && !beam && !floor) {
    return;
  }

  let result: number[] = [];

  const count: number = Math.max(
    wall.length,
    column.length,
    beam.length,
    floor.length,
  );

  for (let i: number = 0; i <= count - 1; i++) {
    result[i] =
      (wall[i] || 0) + (column[i] || 0) + (beam[i] || 0) + (floor[i] || 0);
  }

  return result;
}
