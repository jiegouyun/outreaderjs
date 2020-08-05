import { IStructure, IQuantityFE, ISubQuantityFE } from '@outreader/core';

export function convertQuantity(structure: IStructure): IQuantityFE {
  const quantity: IQuantityFE = {
    storeyID: structure.wmass?.storey.storeyID as number[],
    towerID: structure.wmass?.storey.towerID as number[],
    area: structure.wmass?.storey.area as number[],
    concrete: structure.concreteSteel?.concrete as ISubQuantityFE,
    unitConcrete: {
      storeyID: structure.concreteSteel?.concrete.storeyID as number[],
      wall: quantityPerArea(
        structure.concreteSteel?.concrete.wall as number[],
        structure.wmass?.storey.area as number[],
      ) as number[],
      beam: quantityPerArea(
        structure.concreteSteel?.concrete.beam as number[],
        structure.wmass?.storey.area as number[],
      ) as number[],
      column: quantityPerArea(
        structure.concreteSteel?.concrete.column as number[],
        structure.wmass?.storey.area as number[],
      ) as number[],
      floor: quantityPerArea(
        structure.concreteSteel?.concrete.floor as number[],
        structure.wmass?.storey.area as number[],
      ) as number[],
      storey: quantityPerArea(
        structure.concreteSteel?.concrete.storey as number[],
        structure.wmass?.storey.area as number[],
      ) as number[],
    },
    steel: structure.concreteSteel?.steel as ISubQuantityFE,
    unitSteel: {
      storeyID: structure.concreteSteel?.steel.storeyID as number[],
      wall: quantityPerArea(
        structure.concreteSteel?.steel.wall as number[],
        structure.wmass?.storey.area as number[],
      ) as number[],
      beam: quantityPerArea(
        structure.concreteSteel?.steel.beam as number[],
        structure.wmass?.storey.area as number[],
      ) as number[],
      column: quantityPerArea(
        structure.concreteSteel?.steel.column as number[],
        structure.wmass?.storey.area as number[],
      ) as number[],
      floor: quantityPerArea(
        structure.concreteSteel?.steel.floor as number[],
        structure.wmass?.storey.area as number[],
      ) as number[],
      storey: quantityPerArea(
        structure.concreteSteel?.steel.storey as number[],
        structure.wmass?.storey.area as number[],
      ) as number[],
    },
    rebar: {
      storeyID: structure.rebar?.area.storeyID as number[],
      wall: structure.rebar?.wallRebar.storey as number[],
      beam: structure.rebar?.beamRebar.storey as number[],
      column: structure.rebar?.columnRebar.storey as number[],
      floor: structure.rebar?.floorRebar.storey as number[],
      storey: storeyRebar(
        structure.rebar?.wallRebar.storey as number[],
        structure.rebar?.columnRebar.storey as number[],
        structure.rebar?.beamRebar.storey as number[],
        structure.rebar?.floorRebar.storey as number[],
      ) as number[],
    },
    unitRebar: {
      storeyID: structure.rebar?.area.storeyID as number[],
      wall: quantityPerArea(
        structure.rebar?.wallRebar.storey as number[],
        structure.wmass?.storey.area as number[],
      ) as number[],
      beam: quantityPerArea(
        structure.rebar?.beamRebar.storey as number[],
        structure.wmass?.storey.area as number[],
      ) as number[],
      column: quantityPerArea(
        structure.rebar?.columnRebar.storey as number[],
        structure.wmass?.storey.area as number[],
      ) as number[],
      floor: quantityPerArea(
        structure.rebar?.floorRebar.storey as number[],
        structure.wmass?.storey.area as number[],
      ) as number[],
      storey: quantityPerArea(
        storeyRebar(
          structure.rebar?.wallRebar.storey as number[],
          structure.rebar?.columnRebar.storey as number[],
          structure.rebar?.beamRebar.storey as number[],
          structure.rebar?.floorRebar.storey as number[],
        ) as number[],
        structure.wmass?.storey.area as number[],
      ) as number[],
    },
  };

  return quantity;
}

function quantityPerArea(
  quantity: number[],
  area: number[],
): number[] | undefined {
  if (!quantity || !area) {
    return;
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
