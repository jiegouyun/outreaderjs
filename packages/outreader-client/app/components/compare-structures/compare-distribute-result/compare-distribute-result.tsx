import { Row, Collapse } from 'antd';
import {
  BaseTable,
  ArtColumn,
  useTablePipeline,
  features,
} from 'ali-react-table';
import React from 'react';
import { IDistributeResultFE } from '@outreader/core';
import { StoreyChart } from '../../chart-tools';
import { ICompare, IData, IDescribe } from '../../../interfaces';
import { userColors, userShaps } from '../../../colors';

export function CompareDistributeResultComponent(
  distributeResults: IDistributeResultFE[]
) {
  const n = distributeResults.length;
  let count = 0;
  const towers = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    towers[i] = new Set([
      ...distributeResults[i].storey.towerID,
      ...distributeResults[i].shearWeightRatio.towerID,
      ...distributeResults[i].momentPercent.towerID,
    ]).size;

    count =
      (distributeResults[i].storey || distributeResults[i].columnShear)
        .storeyID[0] > count
        ? (distributeResults[i].storey || distributeResults[i].columnShear)
            .storeyID[0]
        : count;
  }

  const storeyID = Array.from(Array(count).keys())
    .reverse()
    .map((val) => val + 1);

  const storeyColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
      features: { sortable: true },
    },
  ];

  for (let i = 0; i < n; i++) {
    storeyColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children:
        towers[i] === 1
          ? [
              {
                name: `层高`,
                code: `height${i}-0`,
                align: 'right',
              },
              {
                name: `累高`,
                code: `heightTD${i}-0`,
                align: 'right',
              },
              {
                name: `面积`,
                code: `area${i}-0`,
                align: 'right',
              },
              {
                name: `墙地比`,
                code: `wallAreaRatio${i}-0`,
                align: 'right',
              },
            ]
          : Array.from(Array(towers[i]).keys()).map((val) => {
              return {
                name: `塔${val + 1}`,
                align: 'center',
                children: [
                  {
                    name: `层高`,
                    code: `height${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `累高`,
                    code: `heightTD${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `面积`,
                    code: `area${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `墙地比`,
                    code: `wallAreaRatio${i}-${val}`,
                    align: 'right',
                  },
                ],
              };
            }),
    });
  }

  const storeyTableData: ICompare[] = [];
  const storeyChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      storeyChartData.push([]);
    }
  }

  for (let j = 0; j < count; j++) {
    storeyTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      const tempStoreyID: number[] = [];
      const tempHeight: number[] = [];
      const tempHeightToGround: number[] = [];
      const tempArea: number[] = [];
      const tempAllSectionAreaRatio: number[] = [];
      distributeResults[i].storey.towerID.forEach((val, index) => {
        if (val === k + 1) {
          tempStoreyID.push(distributeResults[i].storey.storeyID[index]);
          tempHeight.push(distributeResults[i].storey.height[index]);
          tempHeightToGround.push(
            distributeResults[i].storey.heightToGround[index]
          );
          tempArea.push(distributeResults[i].storey.area[index]);
          tempAllSectionAreaRatio.push(
            distributeResults[i].storey.wallSectionAreaRatio[index]
          );
        }
      });
      const len = tempStoreyID[0];
      const diff = count - len;

      for (let j = 0; j < count; j++) {
        storeyTableData[j][`height${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempHeight[j - diff].toFixed(2)
            : '';
        storeyTableData[j][`heightTD${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempHeightToGround[j - diff].toFixed(2)
            : '';
        storeyTableData[j][`area${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempArea[j - diff].toFixed(0)
            : '';
        storeyTableData[j][`wallAreaRatio${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempAllSectionAreaRatio[j - diff] * 10) / 10
            : '';

        if (j < tempStoreyID.length) {
          storeyChartData[m].push({
            x: tempAllSectionAreaRatio[j],
            y: tempStoreyID[j],
          });
        }
      }

      m++;
    }
  }

  const massRatioColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
      features: { sortable: true },
    },
  ];

  for (let i = 0; i < n; i++) {
    massRatioColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children:
        towers[i] === 1
          ? [
              {
                name: `质量比`,
                code: `ratio${i}-0`,
                align: 'right',
              },
              {
                name: `单位质量比`,
                code: `unitRatio${i}-0`,
                align: 'right',
              },
            ]
          : Array.from(Array(towers[i]).keys()).map((val) => {
              return {
                name: `塔${val + 1}`,
                align: 'center',
                children: [
                  {
                    name: `质量比`,
                    code: `ratio${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `单位质量比`,
                    code: `unitRatio${i}-${val}`,
                    align: 'right',
                  },
                ],
              };
            }),
    });
  }

  const massRatioTableData: ICompare[] = [];
  const massRatioChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      massRatioChartData.push([], []);
    }
  }

  for (let j = 0; j < count; j++) {
    massRatioTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      const tempStoreyID: number[] = [];
      const tempMassRatio: number[] = [];
      const tempMassPerAreaRatio: number[] = [];
      distributeResults[i].massRatio.towerID.forEach((val, index) => {
        if (val === k + 1) {
          tempStoreyID.push(distributeResults[i].massRatio.storeyID[index]);
          tempMassRatio.push(distributeResults[i].massRatio.ratio[index]);
          tempMassPerAreaRatio.push(
            distributeResults[i].massRatio.massPerAreaRatio[index]
          );
        }
      });
      const len = tempStoreyID[0];
      const diff = count - len;

      for (let j = 0; j < count; j++) {
        massRatioTableData[j][`ratio${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempMassRatio[j - diff].toFixed(2)
            : '';
        massRatioTableData[j][`unitRatio${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempMassPerAreaRatio[j - diff].toFixed(2)
            : '';

        if (j < tempStoreyID.length) {
          massRatioChartData[2 * m].push({
            x: tempMassRatio[j],
            y: tempStoreyID[j],
          });
          massRatioChartData[2 * m + 1].push({
            x: tempMassPerAreaRatio[j],
            y: tempStoreyID[j],
          });
        }
      }

      m++;
    }
  }

  const stiffRatioColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
      features: { sortable: true },
    },
  ];

  for (let i = 0; i < n; i++) {
    stiffRatioColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children:
        towers[i] === 1
          ? [
              {
                name: `X`,
                code: `ratx1${i}-0`,
                align: 'right',
              },
              {
                name: `Y`,
                code: `raty1${i}-0`,
                align: 'right',
              },
              {
                name: `X(层高修正)`,
                code: `ratx2${i}-0`,
                align: 'right',
              },
              {
                name: `Y(层高修正)`,
                code: `raty2${i}-0`,
                align: 'right',
              },
            ]
          : Array.from(Array(towers[i]).keys()).map((val) => {
              return {
                name: `塔${val + 1}`,
                align: 'center',
                children: [
                  {
                    name: `X`,
                    code: `ratx1${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `Y`,
                    code: `raty1${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `X(层高修正)`,
                    code: `ratx2${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `Y(层高修正)`,
                    code: `raty2${i}-${val}`,
                    align: 'right',
                  },
                ],
              };
            }),
    });
  }

  const stiffRatioTableData: ICompare[] = [];
  const stiffRatioChartData: IData[][] = [];
  const stiffRatioModifyChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      stiffRatioChartData.push([], []);
      stiffRatioModifyChartData.push([], []);
    }
  }

  for (let j = 0; j < count; j++) {
    stiffRatioTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      const tempStoreyID: number[] = [];
      const tempRatx1: number[] = [];
      const tempRaty1: number[] = [];
      const tempRatx2: number[] = [];
      const tempRaty2: number[] = [];
      distributeResults[i].stiffness.towerID.forEach((val, index) => {
        if (val === k + 1) {
          tempStoreyID.push(distributeResults[i].stiffness.storeyID[index]);
          tempRatx1.push(distributeResults[i].stiffness.ratx1[index]);
          tempRaty1.push(distributeResults[i].stiffness.raty1[index]);
          tempRatx2.push(distributeResults[i].stiffness.ratx2[index]);
          tempRaty2.push(distributeResults[i].stiffness.raty2[index]);
        }
      });
      const len = tempStoreyID[0];
      const diff = count - len;

      for (let j = 0; j < count; j++) {
        stiffRatioTableData[j][`ratx1${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempRatx1[j - diff].toFixed(3)
            : '';
        stiffRatioTableData[j][`raty1${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempRaty1[j - diff].toFixed(3)
            : '';
        stiffRatioTableData[j][`ratx2${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempRatx2[j - diff] * 1000) / 1000
            : '';
        stiffRatioTableData[j][`raty2${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempRaty2[j - diff] * 1000) / 1000
            : '';

        if (j < tempStoreyID.length) {
          stiffRatioChartData[2 * m].push({
            x: tempRatx1[j],
            y: tempStoreyID[j],
          });
          stiffRatioChartData[2 * m + 1].push({
            x: tempRaty1[j],
            y: tempStoreyID[j],
          });
          stiffRatioModifyChartData[2 * m].push({
            x: tempRatx2[j],
            y: tempStoreyID[j],
          });
          stiffRatioModifyChartData[2 * m + 1].push({
            x: tempRaty2[j],
            y: tempStoreyID[j],
          });
        }
      }
      m++;
    }
  }

  const shearWeightColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
      features: { sortable: true },
    },
  ];

  for (let i = 0; i < n; i++) {
    shearWeightColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children:
        towers[i] === 1
          ? [
              {
                name: `X`,
                code: `ratioX${i}-0`,
                align: 'right',
              },
              {
                name: `Y`,
                code: `ratioY${i}-0`,
                align: 'right',
              },
            ]
          : Array.from(Array(towers[i]).keys()).map((val) => {
              return {
                name: `塔${val + 1}`,
                align: 'center',
                children: [
                  {
                    name: `X`,
                    code: `ratioX${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `Y`,
                    code: `ratioY${i}-${val}`,
                    align: 'right',
                  },
                ],
              };
            }),
    });
  }

  const shearWeightTableData: ICompare[] = [];
  const shearWeightChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      shearWeightChartData.push([], []);
    }
  }

  for (let j = 0; j < count; j++) {
    shearWeightTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      const tempStoreyID: number[] = [];
      const tempFactorX: number[] = [];
      const tempFactorY: number[] = [];
      distributeResults[i].shearWeightRatio.towerID.forEach((val, index) => {
        if (val === k + 1) {
          tempStoreyID.push(
            distributeResults[i].shearWeightRatio.storeyID[index]
          );
          tempFactorX.push(
            distributeResults[i].shearWeightRatio.factorX[index]
          );
          tempFactorY.push(
            distributeResults[i].shearWeightRatio.factorY[index]
          );
        }
      });
      const len = tempStoreyID[0];
      const diff = count - len;

      for (let j = 0; j < count; j++) {
        shearWeightTableData[j][`ratioX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempFactorX[j - diff].toFixed(3)
            : '';
        shearWeightTableData[j][`ratioY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempFactorY[j - diff].toFixed(3)
            : '';

        if (j < tempStoreyID.length) {
          shearWeightChartData[2 * m].push({
            x: tempFactorX[j],
            y: tempStoreyID[j],
          });
          shearWeightChartData[2 * m + 1].push({
            x: tempFactorY[j],
            y: tempStoreyID[j],
          });
        }
      }

      m++;
    }
  }

  const shearCapacityColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
      features: { sortable: true },
    },
  ];

  for (let i = 0; i < n; i++) {
    shearCapacityColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children:
        towers[i] === 1
          ? [
              {
                name: `X`,
                code: `ratioX${i}-0`,
                align: 'right',
              },
              {
                name: `Y`,
                code: `ratioY${i}-0`,
                align: 'right',
              },
            ]
          : Array.from(Array(towers[i]).keys()).map((val) => {
              return {
                name: `塔${val + 1}`,
                align: 'center',
                children: [
                  {
                    name: `X`,
                    code: `ratioX${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `Y`,
                    code: `ratioY${i}-${val}`,
                    align: 'right',
                  },
                ],
              };
            }),
    });
  }

  const shearCapacityTableData: ICompare[] = [];
  const shearCapacityChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      shearCapacityChartData.push([], []);
    }
  }

  for (let j = 0; j < count; j++) {
    shearCapacityTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      const tempStoreyID: number[] = [];
      const tempRatioX: number[] = [];
      const tempRatioY: number[] = [];
      distributeResults[i].shearCapacityCheck.towerID.forEach((val, index) => {
        if (val === k + 1) {
          tempStoreyID.push(
            distributeResults[i].shearCapacityCheck.storeyID[index]
          );
          tempRatioX.push(
            distributeResults[i].shearCapacityCheck.ratioX[index]
          );
          tempRatioY.push(
            distributeResults[i].shearCapacityCheck.ratioY[index]
          );
        }
      });
      const len = tempStoreyID[0];
      const diff = count - len;

      for (let j = 0; j < count; j++) {
        shearCapacityTableData[j][`ratioX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempRatioX[j - diff].toFixed(2)
            : '';
        shearCapacityTableData[j][`ratioY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempRatioY[j - diff].toFixed(2)
            : '';

        if (j < tempStoreyID.length) {
          shearCapacityChartData[2 * m].push({
            x: tempRatioX[j],
            y: tempStoreyID[j],
          });
          shearCapacityChartData[2 * m + 1].push({
            x: tempRatioY[j],
            y: tempStoreyID[j],
          });
        }
      }

      m++;
    }
  }

  const momentDistributeColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
      features: { sortable: true },
    },
  ];

  for (let i = 0; i < n; i++) {
    momentDistributeColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children:
        towers[i] === 1
          ? [
              {
                name: `X`,
                align: 'center',
                children: [
                  {
                    name: `柱`,
                    code: `columnX${i}-0`,
                    align: 'right',
                  },
                  {
                    name: `短肢墙`,
                    code: `wallX${i}-0`,
                    align: 'right',
                  },
                ],
              },
              {
                name: `Y`,
                align: 'center',
                children: [
                  {
                    name: `柱`,
                    code: `columnY${i}-0`,
                    align: 'right',
                  },
                  {
                    name: `短肢墙`,
                    code: `wallY${i}-0`,
                    align: 'right',
                  },
                ],
              },
            ]
          : Array.from(Array(towers[i]).keys()).map((val) => {
              return {
                name: `塔${val + 1}`,
                align: 'center',
                children: [
                  {
                    name: `X`,
                    align: 'center',
                    children: [
                      {
                        name: `柱`,
                        code: `columnX${i}-${val}`,
                        align: 'right',
                      },
                      {
                        name: `短肢墙`,
                        code: `wallX${i}-${val}`,
                        align: 'right',
                      },
                    ],
                  },
                  {
                    name: `Y`,
                    align: 'center',
                    children: [
                      {
                        name: `柱`,
                        code: `columnY${i}-${val}`,
                        align: 'right',
                      },
                      {
                        name: `短肢墙`,
                        code: `wallY${i}-${val}`,
                        align: 'right',
                      },
                    ],
                  },
                ],
              };
            }),
    });
  }

  const momentDistributeTableData: ICompare[] = [];
  const momentColumnChartData: IData[][] = [];
  const momentWallChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      momentColumnChartData.push([], []);
      momentWallChartData.push([], []);
    }
  }

  for (let j = 0; j < count; j++) {
    momentDistributeTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      const tempStoreyID: number[] = [];
      const tempPercentColumnX: number[] = [];
      const tempPercentWallX: number[] = [];
      const tempPercentColumnY: number[] = [];
      const tempPercentWallY: number[] = [];
      distributeResults[i].momentPercent.towerID.forEach((val, index) => {
        if (val === k + 1) {
          tempStoreyID.push(distributeResults[i].momentPercent.storeyID[index]);
          tempPercentColumnX.push(
            distributeResults[i].momentPercent.percentColumnX[index]
          );
          tempPercentWallX.push(
            distributeResults[i].momentPercent.percentWallX[index]
          );
          tempPercentColumnY.push(
            distributeResults[i].momentPercent.percentColumnY[index]
          );
          tempPercentWallY.push(
            distributeResults[i].momentPercent.percentWallY[index]
          );
        }
      });
      const len = tempStoreyID[0];
      const diff = count - len;

      for (let j = 0; j < count; j++) {
        momentDistributeTableData[j][`columnX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempPercentColumnX[j - diff].toFixed(1)
            : '';
        momentDistributeTableData[j][`wallX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempPercentWallX[j - diff].toFixed(1)
            : '';
        momentDistributeTableData[j][`columnY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempPercentColumnY[j - diff].toFixed(1)
            : '';
        momentDistributeTableData[j][`wallY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempPercentWallY[j - diff].toFixed(1)
            : '';

        if (j < tempStoreyID.length) {
          momentColumnChartData[2 * m].push({
            x: tempPercentColumnX[j],
            y: tempStoreyID[j],
          });
          momentColumnChartData[2 * m + 1].push({
            x: tempPercentColumnY[j],
            y: tempStoreyID[j],
          });
          momentWallChartData[2 * m].push({
            x: tempPercentWallX[j],
            y: tempStoreyID[j],
          });
          momentWallChartData[2 * m + 1].push({
            x: tempPercentWallY[j],
            y: tempStoreyID[j],
          });
        }
      }

      m++;
    }
  }

  const shearDistributeColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
      features: { sortable: true },
    },
  ];

  for (let i = 0; i < n; i++) {
    shearDistributeColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children:
        towers[i] === 1
          ? [
              {
                name: `X`,
                code: `ratioX${i}-0`,
                align: 'right',
              },
              {
                name: `Y`,
                code: `ratioY${i}-0`,
                align: 'right',
              },
            ]
          : Array.from(Array(towers[i]).keys()).map((val) => {
              return {
                name: `塔${val + 1}`,
                align: 'center',
                children: [
                  {
                    name: `X`,
                    code: `ratioX${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `Y`,
                    code: `ratioY${i}-${val}`,
                    align: 'right',
                  },
                ],
              };
            }),
    });
  }

  const shearDistributeTableData: ICompare[] = [];
  const shearColumnChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      shearColumnChartData.push([], []);
    }
  }

  for (let j = 0; j < count; j++) {
    shearDistributeTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      const tempStoreyID: number[] = [];
      const tempPercentColumnX: number[] = [];
      const tempPercentColumnY: number[] = [];
      distributeResults[i].columnShear.towerID.forEach((val, index) => {
        if (val === k + 1) {
          tempStoreyID.push(distributeResults[i].columnShear.storeyID[index]);
          tempPercentColumnX.push(
            distributeResults[i].columnShear.percentColumnX[index]
          );
          tempPercentColumnY.push(
            distributeResults[i].columnShear.percentColumnY[index]
          );
        }
      });
      const len = tempStoreyID[0];
      const diff = count - len;

      for (let j = 0; j < count; j++) {
        shearDistributeTableData[j][`ratioX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempPercentColumnX[j - diff] * 10) / 10
            : '';
        shearDistributeTableData[j][`ratioY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempPercentColumnY[j - diff] * 10) / 10
            : '';

        if (j < tempStoreyID.length) {
          shearColumnChartData[2 * m].push({
            x: tempPercentColumnX[j],
            y: tempStoreyID[j],
          });
          shearColumnChartData[2 * m + 1].push({
            x: tempPercentColumnY[j],
            y: tempStoreyID[j],
          });
        }
      }

      m++;
    }
  }

  const pipelineStorey = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: storeyTableData, columns: storeyColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineMassRatio = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: massRatioTableData, columns: massRatioColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineStiffRatio = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: stiffRatioTableData, columns: stiffRatioColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineShearWeight = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: shearWeightTableData, columns: shearWeightColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineShearCapacity = useTablePipeline({
    components: BaseTable as any,
  })
    .input({
      dataSource: shearCapacityTableData,
      columns: shearCapacityColumns,
    })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineMomentDistribute = useTablePipeline({
    components: BaseTable as any,
  })
    .input({
      dataSource: momentDistributeTableData,
      columns: momentDistributeColumns,
    })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineShearDistribute = useTablePipeline({
    components: BaseTable as any,
  })
    .input({
      dataSource: shearDistributeTableData,
      columns: shearDistributeColumns,
    })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const describesStorey: IDescribe[] = [];
  const describesMassRatio: IDescribe[] = [];
  const describes: IDescribe[] = [];
  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      describesStorey.push({
        name: towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`,
        fill: userColors[m % 8],
        shape: userShaps[m % 7],
      });
      describesMassRatio.push(
        {
          name:
            towers[i] === 1
              ? `模型${i + 1}-质量比`
              : `模型${i + 1}-塔${k + 1}-质量比`,
          fill: userColors[(2 * m) % 8],
          shape: userShaps[(2 * m) % 7],
        },
        {
          name:
            towers[i] === 1
              ? `模型${i + 1}-单位质量比`
              : `模型${i + 1}-塔${k + 1}-单位质量比`,
          fill: userColors[(2 * m + 1) % 8],
          shape: userShaps[(2 * m + 1) % 7],
        }
      );
      describes.push(
        {
          name:
            towers[i] === 1 ? `模型${i + 1}-X` : `模型${i + 1}-塔${k + 1}-X`,
          fill: userColors[(2 * m) % 8],
          shape: userShaps[(2 * m) % 7],
        },
        {
          name:
            towers[i] === 1 ? `模型${i + 1}-Y` : `模型${i + 1}-塔${k + 1}-Y`,
          fill: userColors[(2 * m + 1) % 8],
          shape: userShaps[(2 * m + 1) % 7],
        }
      );
      m++;
    }
  }

  const { Panel } = Collapse;
  const DistributeResults = (
    <React.Fragment>
      <h3>楼层属性</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '墙地比（%）',
          }}
          describes={describesStorey}
          datas={storeyChartData}
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelineStorey.getProps()}
          />
        </Panel>
      </Collapse>
      <h3>质量比</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '质量比',
          }}
          describes={describesMassRatio}
          datas={massRatioChartData}
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelineMassRatio.getProps()}
          />
        </Panel>
      </Collapse>
      <h3>刚度比</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '刚度比',
          }}
          describes={describes}
          datas={stiffRatioChartData}
        />
        <StoreyChart
          labels={{
            xLabel: '层高修正刚度比',
          }}
          describes={describes}
          datas={stiffRatioModifyChartData}
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelineStiffRatio.getProps()}
          />
        </Panel>
      </Collapse>
      <h3>剪重比</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '剪重比',
          }}
          describes={describes}
          datas={shearWeightChartData}
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelineShearWeight.getProps()}
          />
        </Panel>
      </Collapse>
      <h3>抗剪承载力比</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '抗剪承载力比',
          }}
          describes={describes}
          datas={shearCapacityChartData}
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelineShearCapacity.getProps()}
          />
        </Panel>
      </Collapse>
      <h3>规定水平力下倾覆力矩分配</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '柱倾覆力矩占比(%)',
          }}
          describes={describes}
          datas={momentColumnChartData}
        />
        <StoreyChart
          labels={{
            xLabel: '短肢墙倾覆力矩占比(%)',
          }}
          describes={describes}
          datas={momentWallChartData}
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelineMomentDistribute.getProps()}
          />
        </Panel>
      </Collapse>
      <h3>柱剪力与分段基底剪力百分比</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '柱剪力与分段基底剪力百分比(%)',
          }}
          describes={describes}
          datas={shearColumnChartData}
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelineShearDistribute.getProps()}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return DistributeResults;
}
