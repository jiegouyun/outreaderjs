import { IStructure, IElementFE } from '../interfaces';

export function convertElement(structure: IStructure): IElementFE {
  const element: IElementFE = {
    def: {
      col: {
        storeyID: structure.wpj?.column.storeyID || [],
        colName: structure.wpj?.column.colName || [],
        colID: structure.wpj?.column.colID || [],
        secType: structure.wpj?.column.secType || [],
        colProps: structure.wpj?.column.colProps || [],
        startNode: structure.wpj?.column.startNode || [],
        endNode: structure.wpj?.column.endNode || [],
        section: structure.wpj?.column.section || [],
        ang: structure.wpj?.column.ang || [],
      },
    },
    uc: {
      col: {
        storeyID: structure.wpj?.column.storeyID || [],
        colName: structure.wpj?.column.colName || [],
        uc: structure.wpj?.column.uc || [],
        ucG: structure.wpj?.column.ucG || [],
      },
    },
    rs: {
      col: {
        storeyID: structure.wpj?.column.storeyID || [],
        colName: structure.wpj?.column.colName || [],
        rs: structure.wpj?.column.rs || [],
        rsv: structure.wpj?.column.rsv || [],
      },
    },
    cb: {
      col: {
        storeyID: structure.wpj?.column.storeyID || [],
        colName: structure.wpj?.column.colName || [],
        cbX: structure.wpj?.column.cbX || [],
        cbY: structure.wpj?.column.cbY || [],
      },
    },
  };

  return element;
}
