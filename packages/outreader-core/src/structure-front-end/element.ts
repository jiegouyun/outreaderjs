import { IElementFE, IWpj } from '../interfaces';

export function convertElement(wpj?: IWpj): IElementFE {
  const element: IElementFE = {
    def: {
      col: {
        storeyID: wpj?.column.storeyID || [],
        colName: wpj?.column.colName || [],
        colID: wpj?.column.colID || [],
        secType: wpj?.column.secType || [],
        colProps: wpj?.column.colProps || [],
        startNode: wpj?.column.startNode || [],
        endNode: wpj?.column.endNode || [],
        section: wpj?.column.section || [],
        ang: wpj?.column.ang || [],
      },
    },
    uc: {
      col: {
        storeyID: wpj?.column.storeyID || [],
        colName: wpj?.column.colName || [],
        uc: wpj?.column.uc || [],
        ucG: wpj?.column.ucG || [],
      },
    },
    rs: {
      col: {
        storeyID: wpj?.column.storeyID || [],
        colName: wpj?.column.colName || [],
        rs: wpj?.column.rs || [],
        rsv: wpj?.column.rsv || [],
      },
    },
    cb: {
      col: {
        storeyID: wpj?.column.storeyID || [],
        colName: wpj?.column.colName || [],
        cbX: wpj?.column.cbX || [],
        cbY: wpj?.column.cbY || [],
      },
    },
  };

  return element;
}
