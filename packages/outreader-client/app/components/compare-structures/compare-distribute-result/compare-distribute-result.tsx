import { Row, Collapse } from 'antd';
import { BaseTable, ArtColumn } from 'ali-react-table';
import React from 'react';
import { IDistributeResultFE } from '@outreader/core';
import { StoreyChart } from '../../chart-tools';
import { ICompare, IData, IDescribe } from '../../../interfaces';
import { userColors, userShaps } from '../../../colors';

export function CompareDistributeResultComponent(
  distributeResults: IDistributeResultFE[]
) {
  const n = distributeResults.length;
  let storeyID: number[] = [];
  for (let i = 0; i < n; i++) {
    if (
      (distributeResults[i].storey || distributeResults[i].columnShear).storeyID
        .length > storeyID.length
    ) {
      storeyID = (
        distributeResults[i].storey || distributeResults[i].columnShear
      ).storeyID;
    }
  }
  const count = storeyID.length;

  const storeyColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
    },
  ];

  for (let i = 0; i < n; i++) {
    storeyColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children: [
        {
          name: `层高`,
          code: `height${i}`,
          align: 'right',
        },
        {
          name: `累高`,
          code: `heightTD${i}`,
          align: 'right',
        },
        {
          name: `面积`,
          code: `area${i}`,
          align: 'right',
        },
        {
          name: `墙地比`,
          code: `wallAreaRatio${i}`,
          align: 'right',
        },
      ],
    });
  }

  const storeyTableData: ICompare[] = [];
  const storeyChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    storeyChartData.push([]);
  }

  for (let j = 0; j < count; j++) {
    storeyTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    const len = distributeResults[i].storey.storeyID.length;
    const diff = count - len;

    for (let j = 0; j < count; j++) {
      storeyTableData[j][`height${i}`] =
        distributeResults[i].storey.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].storey.height[j - diff].toFixed(2)
          : '';
      storeyTableData[j][`heightTD${i}`] =
        distributeResults[i].storey.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].storey.heightToGround[j - diff].toFixed(2)
          : '';
      storeyTableData[j][`area${i}`] =
        distributeResults[i].storey.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].storey.area[j - diff].toFixed(0)
          : '';
      storeyTableData[j][`wallAreaRatio${i}`] =
        distributeResults[i].storey.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].storey.wallSectionAreaRatio[j - diff].toFixed(
              1
            )
          : '';

      storeyChartData[i].push({
        x:
          distributeResults[i].storey.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].storey.wallSectionAreaRatio[j - diff]
            : distributeResults[i].storey.wallSectionAreaRatio[0],
        y:
          distributeResults[i].storey.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].storey.storeyID[j - diff]
            : distributeResults[i].storey.storeyID[0],
      });
    }
  }

  const massRatioColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
    },
  ];

  for (let i = 0; i < n; i++) {
    massRatioColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children: [
        {
          name: `质量比`,
          code: `ratio${i}`,
          align: 'right',
        },
        {
          name: `单位质量比`,
          code: `unitRatio${i}`,
          align: 'right',
        },
      ],
    });
  }

  const massRatioTableData: ICompare[] = [];
  const massRatioChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    massRatioChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    massRatioTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    const len = distributeResults[i].massRatio.storeyID.length;
    const diff = count - len;

    for (let j = 0; j < count; j++) {
      massRatioTableData[j][`ratio${i}`] =
        distributeResults[i].massRatio.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].massRatio.ratio[j - diff].toFixed(2)
          : '';
      massRatioTableData[j][`unitRatio${i}`] =
        distributeResults[i].massRatio.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].massRatio.massPerAreaRatio[j - diff].toFixed(2)
          : '';

      massRatioChartData[2 * i].push({
        x:
          distributeResults[i].massRatio.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].massRatio.ratio[j - diff]
            : distributeResults[i].massRatio.ratio[0],
        y:
          distributeResults[i].massRatio.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].massRatio.storeyID[j - diff]
            : distributeResults[i].massRatio.storeyID[0],
      });
      massRatioChartData[2 * i + 1].push({
        x:
          distributeResults[i].massRatio.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].massRatio.massPerAreaRatio[j - diff]
            : distributeResults[i].massRatio.massPerAreaRatio[0],
        y:
          distributeResults[i].massRatio.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].massRatio.storeyID[j - diff]
            : distributeResults[i].massRatio.storeyID[0],
      });
    }
  }

  const stiffRatioColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
    },
  ];

  for (let i = 0; i < n; i++) {
    stiffRatioColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children: [
        {
          name: `X`,
          code: `ratx1${i}`,
          align: 'right',
        },
        {
          name: `Y`,
          code: `raty1${i}`,
          align: 'right',
        },
        {
          name: `X(层高修正)`,
          code: `ratx2${i}`,
          align: 'right',
        },
        {
          name: `Y(层高修正)`,
          code: `raty2${i}`,
          align: 'right',
        },
      ],
    });
  }

  const stiffRatioTableData: ICompare[] = [];
  const stiffRatioChartData: IData[][] = [];
  const stiffRatioModifyChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    stiffRatioChartData.push([], []);
    stiffRatioModifyChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    stiffRatioTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    const len = distributeResults[i].stiffness.storeyID.length;
    const diff = count - len;

    for (let j = 0; j < count; j++) {
      stiffRatioTableData[j][`ratx1${i}`] =
        distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].stiffness.ratx1[j - diff].toFixed(3)
          : '';
      stiffRatioTableData[j][`raty1${i}`] =
        distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].stiffness.raty1[j - diff].toFixed(3)
          : '';
      stiffRatioTableData[j][`ratx2${i}`] =
        distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].stiffness.ratx2[j - diff].toFixed(3)
          : '';
      stiffRatioTableData[j][`raty2${i}`] =
        distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].stiffness.raty2[j - diff].toFixed(3)
          : '';
      stiffRatioChartData[2 * i].push({
        x:
          distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].stiffness.ratx1[j - diff]
            : distributeResults[i].stiffness.ratx1[0],
        y:
          distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].stiffness.storeyID[j - diff]
            : distributeResults[i].stiffness.storeyID[0],
      });
      stiffRatioChartData[2 * i + 1].push({
        x:
          distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].stiffness.raty1[j - diff]
            : distributeResults[i].stiffness.raty1[0],
        y:
          distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].stiffness.storeyID[j - diff]
            : distributeResults[i].stiffness.storeyID[0],
      });
      stiffRatioModifyChartData[2 * i].push({
        x:
          distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].stiffness.ratx2[j - diff]
            : distributeResults[i].stiffness.ratx2[0],
        y:
          distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].stiffness.storeyID[j - diff]
            : distributeResults[i].stiffness.storeyID[0],
      });
      stiffRatioModifyChartData[2 * i + 1].push({
        x:
          distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].stiffness.raty2[j - diff]
            : distributeResults[i].stiffness.raty2[0],
        y:
          distributeResults[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].stiffness.storeyID[j - diff]
            : distributeResults[i].stiffness.storeyID[0],
      });
    }
  }

  const shearWeightColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
    },
  ];

  for (let i = 0; i < n; i++) {
    shearWeightColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children: [
        {
          name: `X`,
          code: `ratioX${i}`,
          align: 'right',
        },
        {
          name: `Y`,
          code: `ratioY${i}`,
          align: 'right',
        },
      ],
    });
  }

  const shearWeightTableData: ICompare[] = [];
  const shearWeightChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    shearWeightChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    shearWeightTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    const len = distributeResults[i].shearWeightRatio.storeyID.length;
    const diff = count - len;

    for (let j = 0; j < count; j++) {
      shearWeightTableData[j][`ratioX${i}`] =
        distributeResults[i].shearWeightRatio.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].shearWeightRatio.factorX[j - diff].toFixed(3)
          : '';
      shearWeightTableData[j][`ratioY${i}`] =
        distributeResults[i].shearWeightRatio.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].shearWeightRatio.factorY[j - diff].toFixed(3)
          : '';

      shearWeightChartData[2 * i].push({
        x:
          distributeResults[i].shearWeightRatio.storeyID[j - diff] ===
          storeyID[j]
            ? distributeResults[i].shearWeightRatio.factorX[j - diff]
            : distributeResults[i].shearWeightRatio.factorX[0],
        y:
          distributeResults[i].shearWeightRatio.storeyID[j - diff] ===
          storeyID[j]
            ? distributeResults[i].shearWeightRatio.storeyID[j - diff]
            : distributeResults[i].shearWeightRatio.storeyID[0],
      });
      shearWeightChartData[2 * i + 1].push({
        x:
          distributeResults[i].shearWeightRatio.storeyID[j - diff] ===
          storeyID[j]
            ? distributeResults[i].shearWeightRatio.factorY[j - diff]
            : distributeResults[i].shearWeightRatio.factorY[0],
        y:
          distributeResults[i].shearWeightRatio.storeyID[j - diff] ===
          storeyID[j]
            ? distributeResults[i].shearWeightRatio.storeyID[j - diff]
            : distributeResults[i].shearWeightRatio.storeyID[0],
      });
    }
  }

  const shearCapacityColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
    },
  ];

  for (let i = 0; i < n; i++) {
    shearCapacityColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children: [
        {
          name: `X`,
          code: `ratioX${i}`,
          align: 'right',
        },
        {
          name: `Y`,
          code: `ratioY${i}`,
          align: 'right',
        },
      ],
    });
  }

  const shearCapacityTableData: ICompare[] = [];
  const shearCapacityChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    shearCapacityChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    shearCapacityTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    const len = distributeResults[i].shearCapacityCheck.storeyID.length;
    const diff = count - len;

    for (let j = 0; j < count; j++) {
      shearCapacityTableData[j][`ratioX${i}`] =
        distributeResults[i].shearCapacityCheck.storeyID[j - diff] ===
        storeyID[j]
          ? distributeResults[i].shearCapacityCheck.ratioX[j - diff].toFixed(2)
          : '';
      shearCapacityTableData[j][`ratioY${i}`] =
        distributeResults[i].shearCapacityCheck.storeyID[j - diff] ===
        storeyID[j]
          ? distributeResults[i].shearCapacityCheck.ratioY[j - diff].toFixed(2)
          : '';

      shearCapacityChartData[2 * i].push({
        x:
          distributeResults[i].shearCapacityCheck.storeyID[j - diff] ===
          storeyID[j]
            ? distributeResults[i].shearCapacityCheck.ratioX[j - diff]
            : distributeResults[i].shearCapacityCheck.ratioX[0],
        y:
          distributeResults[i].shearCapacityCheck.storeyID[j - diff] ===
          storeyID[j]
            ? distributeResults[i].shearCapacityCheck.storeyID[j - diff]
            : distributeResults[i].shearCapacityCheck.storeyID[0],
      });
      shearCapacityChartData[2 * i + 1].push({
        x:
          distributeResults[i].shearCapacityCheck.storeyID[j - diff] ===
          storeyID[j]
            ? distributeResults[i].shearCapacityCheck.ratioY[j - diff]
            : distributeResults[i].shearCapacityCheck.ratioY[0],
        y:
          distributeResults[i].shearCapacityCheck.storeyID[j - diff] ===
          storeyID[j]
            ? distributeResults[i].shearCapacityCheck.storeyID[j - diff]
            : distributeResults[i].shearCapacityCheck.storeyID[0],
      });
    }
  }

  const momentDistributeColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
    },
  ];

  for (let i = 0; i < n; i++) {
    momentDistributeColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children: [
        {
          name: `X`,
          children: [
            {
              name: `柱`,
              code: `columnX${i}`,
              align: 'right',
            },
            {
              name: `短肢墙`,
              code: `wallX${i}`,
              align: 'right',
            },
          ],
        },
        {
          name: `Y`,
          children: [
            {
              name: `柱`,
              code: `columnY${i}`,
              align: 'right',
            },
            {
              name: `短肢墙`,
              code: `wallY${i}`,
              align: 'right',
            },
          ],
        },
      ],
    });
  }

  const momentDistributeTableData: ICompare[] = [];
  const momentColumnChartData: IData[][] = [];
  const momentWallChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    momentColumnChartData.push([], []);
    momentWallChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    momentDistributeTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    const len = distributeResults[i].momentPercent.storeyID.length;
    const diff = count - len;

    for (let j = 0; j < count; j++) {
      momentDistributeTableData[j][`columnX${i}`] =
        distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].momentPercent.percentColumnX[j - diff].toFixed(
              1
            )
          : '';
      momentDistributeTableData[j][`wallX${i}`] =
        distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].momentPercent.percentWallX[j - diff].toFixed(1)
          : '';
      momentDistributeTableData[j][`columnY${i}`] =
        distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].momentPercent.percentColumnY[j - diff].toFixed(
              1
            )
          : '';
      momentDistributeTableData[j][`wallY${i}`] =
        distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
          ? distributeResults[i].momentPercent.percentWallY[j - diff].toFixed(1)
          : '';
      momentColumnChartData[2 * i].push({
        x:
          distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].momentPercent.percentColumnX[j - diff]
            : distributeResults[i].momentPercent.percentColumnX[0],
        y:
          distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].momentPercent.storeyID[j - diff]
            : distributeResults[i].momentPercent.storeyID[0],
      });
      momentColumnChartData[2 * i + 1].push({
        x:
          distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].momentPercent.percentColumnY[j - diff]
            : distributeResults[i].momentPercent.percentColumnY[0],
        y:
          distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].momentPercent.storeyID[j - diff]
            : distributeResults[i].momentPercent.storeyID[0],
      });
      momentWallChartData[2 * i].push({
        x:
          distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].momentPercent.percentWallX[j - diff]
            : distributeResults[i].momentPercent.percentWallX[0],
        y:
          distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].momentPercent.storeyID[j - diff]
            : distributeResults[i].momentPercent.storeyID[0],
      });
      momentWallChartData[2 * i + 1].push({
        x:
          distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].momentPercent.percentWallY[j - diff]
            : distributeResults[i].momentPercent.percentWallY[0],
        y:
          distributeResults[i].momentPercent.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].momentPercent.storeyID[j - diff]
            : distributeResults[i].momentPercent.storeyID[0],
      });
    }
  }

  const shearDistributeColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
    },
  ];

  for (let i = 0; i < n; i++) {
    shearDistributeColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children: [
        {
          name: `X`,
          code: `ratioX${i}`,
          align: 'right',
        },
        {
          name: `Y`,
          code: `ratioY${i}`,
          align: 'right',
        },
      ],
    });
  }

  const shearDistributeTableData: ICompare[] = [];
  const shearColumnChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    shearColumnChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    shearDistributeTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    const len = distributeResults[i].columnShear.storeyID.length;
    const diff = count - len;

    for (let j = 0; j < count; j++) {
      shearDistributeTableData[j][`ratioX${i}`] =
        distributeResults[i].columnShear.storeyID[j - diff] === storeyID[j]
          ? Math.round(
              distributeResults[i].columnShear.percentColumnX[j - diff] * 10
            ) / 10
          : '';
      shearDistributeTableData[j][`ratioY${i}`] =
        distributeResults[i].columnShear.storeyID[j - diff] === storeyID[j]
          ? Math.round(
              distributeResults[i].columnShear.percentColumnY[j - diff] * 10
            ) / 10
          : '';

      shearColumnChartData[2 * i].push({
        x:
          distributeResults[i].columnShear.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].columnShear.percentColumnX[j - diff]
            : distributeResults[i].columnShear.percentColumnX[0],
        y:
          distributeResults[i].columnShear.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].columnShear.storeyID[j - diff]
            : distributeResults[i].columnShear.storeyID[0],
      });
      shearColumnChartData[2 * i + 1].push({
        x:
          distributeResults[i].columnShear.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].columnShear.percentColumnY[j - diff]
            : distributeResults[i].columnShear.percentColumnY[0],
        y:
          distributeResults[i].columnShear.storeyID[j - diff] === storeyID[j]
            ? distributeResults[i].columnShear.storeyID[j - diff]
            : distributeResults[i].columnShear.storeyID[0],
      });
    }
  }

  const describesStorey: IDescribe[] = [];
  const describesMassRatio: IDescribe[] = [];
  const describes: IDescribe[] = [];
  for (let i = 0; i < n; i++) {
    describesStorey.push({
      name: `模型${i + 1}`,
      fill: userColors[i % 8],
      shape: userShaps[i % 7],
    });
    describesMassRatio.push(
      {
        name: `模型${i + 1}-质量比`,
        fill: userColors[(2 * i) % 8],
        shape: userShaps[(2 * i) % 7],
      },
      {
        name: `模型${i + 1}-单位质量比`,
        fill: userColors[(2 * i + 1) % 8],
        shape: userShaps[(2 * i + 1) % 7],
      }
    );
    describes.push(
      {
        name: `模型${i + 1}-X`,
        fill: userColors[(2 * i) % 8],
        shape: userShaps[(2 * i) % 7],
      },
      {
        name: `模型${i + 1}-Y`,
        fill: userColors[(2 * i + 1) % 8],
        shape: userShaps[(2 * i + 1) % 7],
      }
    );
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
            columns={storeyColumns}
            dataSource={storeyTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            columns={massRatioColumns}
            dataSource={massRatioTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            columns={stiffRatioColumns}
            dataSource={stiffRatioTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            columns={shearWeightColumns}
            dataSource={shearWeightTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            columns={shearCapacityColumns}
            dataSource={shearCapacityTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            columns={momentDistributeColumns}
            dataSource={momentDistributeTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            columns={shearDistributeColumns}
            dataSource={shearDistributeTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return DistributeResults;
}
