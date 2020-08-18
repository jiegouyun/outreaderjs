import { IStructure, IQuantityFE } from '@outreader/core';

export function convertQuantity(structure: IStructure): IQuantityFE {
  const area: number[] = structure.wmass?.storey.area ||
    structure.rebar?.area.storey || [1];
  const quantity: IQuantityFE = {
    storeyID: structure.wmass?.storey.storeyID ||
      structure.concreteSteel?.concrete.storeyID ||
      structure.rebar?.area.storeyID || [0],
    towerID: structure.wmass?.storey.towerID || [0],
    area: area,
    concrete: {
      storeyID: structure.concreteSteel?.concrete.storeyID || [0],
      wall: structure.concreteSteel?.concrete.wall || [0],
      beam: structure.concreteSteel?.concrete.beam || [0],
      column: structure.concreteSteel?.concrete.column || [0],
      floor: structure.concreteSteel?.concrete.floor || [0],
      storey: structure.concreteSteel?.concrete.storey || [0],
    },
    unitConcrete: {
      storeyID: structure.concreteSteel?.concrete.storeyID || [0],
      wall: quantityPerArea(
        structure.concreteSteel?.concrete.wall || [0],
        area,
      ) || [0],
      beam: quantityPerArea(
        structure.concreteSteel?.concrete.beam || [0],
        area,
      ) || [0],
      column: quantityPerArea(
        structure.concreteSteel?.concrete.column || [0],
        area,
      ) || [0],
      floor: quantityPerArea(
        structure.concreteSteel?.concrete.floor || [0],
        area,
      ) || [0],
      storey: quantityPerArea(
        structure.concreteSteel?.concrete.storey || [0],
        area,
      ) || [0],
    },
    steel: {
      storeyID: structure.concreteSteel?.steel.storeyID || [0],
      wall: structure.concreteSteel?.steel.wall || [0],
      beam: structure.concreteSteel?.steel.beam || [0],
      column: structure.concreteSteel?.steel.column || [0],
      floor: structure.concreteSteel?.steel.floor || [0],
      storey: structure.concreteSteel?.steel.storey || [0],
    },
    unitSteel: {
      storeyID: structure.concreteSteel?.steel.storeyID || [0],
      wall: quantityPerArea(
        structure.concreteSteel?.steel.wall || [0],
        area,
      ) || [0],
      beam: quantityPerArea(
        structure.concreteSteel?.steel.beam || [0],
        area,
      ) || [0],
      column: quantityPerArea(
        structure.concreteSteel?.steel.column || [0],
        area,
      ) || [0],
      floor: quantityPerArea(
        structure.concreteSteel?.steel.floor || [0],
        area,
      ) || [0],
      storey: quantityPerArea(
        structure.concreteSteel?.steel.storey || [0],
        area,
      ) || [0],
    },
    rebar: {
      storeyID: structure.rebar?.area.storeyID || [0],
      wall: structure.rebar?.wallRebar.storey || [0],
      beam: structure.rebar?.beamRebar.storey || [0],
      column: structure.rebar?.columnRebar.storey || [0],
      floor: structure.rebar?.floorRebar.storey || [0],
      storey: storeyRebar(
        structure.rebar?.wallRebar.storey || [0],
        structure.rebar?.columnRebar.storey || [0],
        structure.rebar?.beamRebar.storey || [0],
        structure.rebar?.floorRebar.storey || [0],
      ) || [0],
    },
    unitRebar: {
      storeyID: structure.rebar?.area.storeyID || [0],
      wall: quantityPerArea(structure.rebar?.wallRebar.storey || [0], area) || [
        0,
      ],
      beam: quantityPerArea(structure.rebar?.beamRebar.storey || [0], area) || [
        0,
      ],
      column: quantityPerArea(
        structure.rebar?.columnRebar.storey || [0],
        area,
      ) || [0],
      floor: quantityPerArea(
        structure.rebar?.floorRebar.storey || [0],
        area,
      ) || [0],
      storey: quantityPerArea(
        storeyRebar(
          structure.rebar?.wallRebar.storey || [0],
          structure.rebar?.columnRebar.storey || [0],
          structure.rebar?.beamRebar.storey || [0],
          structure.rebar?.floorRebar.storey || [0],
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
