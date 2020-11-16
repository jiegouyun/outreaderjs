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
import { IDescribe, IData } from '../../../interfaces';
import { userColors, userShaps } from '../../../colors';

export function DistributeResultComponent(
  distributeResult: IDistributeResultFE
) {
  const n = new Set([
    ...distributeResult.storey.towerID,
    ...distributeResult.shearWeightRatio.towerID,
    ...distributeResult.momentPercent.towerID,
  ]).size;

  const storeyColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: '塔号',
      code: 'towerID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: `属性(标准层)`,
      code: 'attribute',
      width: 70,
      align: 'right',
    },
    {
      name: '层高(m)',
      code: 'height',
      align: 'right',
    },
    {
      name: '累计高度(m)',
      code: 'heightTD',
      align: 'right',
    },
    {
      name: '面积(m^2)',
      code: 'area',
      align: 'right',
    },
    {
      name: '墙面积X(m^2)',
      code: 'wallAreaX',
      align: 'right',
    },
    {
      name: '墙面积Y(m^2)',
      code: 'wallAreaY',
      align: 'right',
    },
    {
      name: '墙面积(m^2)',
      code: 'wallAreaStorey',
      align: 'right',
    },
    {
      name: '墙地比(%)',
      code: 'wallAreaRatio',
      align: 'right',
    },
  ];

  const storeyTableData = [];
  const storeyChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    storeyChartData.push([]);
  }

  for (let i = 0; i < distributeResult.storey.storeyID.length; i++) {
    storeyTableData.push({
      key: i,
      storeyID: distributeResult.storey.storeyID[i],
      towerID: distributeResult.storey.towerID[i],
      attribute: distributeResult.storey.attribute[i],
      height: distributeResult.storey.height[i].toFixed(2),
      heightTD: distributeResult.storey.heightToGround[i].toFixed(2),
      area: distributeResult.storey.area[i].toFixed(0),
      wallAreaX: distributeResult.storey.wallSectionAreaX[i].toFixed(1),
      wallAreaY: distributeResult.storey.wallSectionAreaY[i].toFixed(1),
      wallAreaStorey: distributeResult.storey.wallSectionAreaStorey[i].toFixed(
        0
      ),
      wallAreaRatio: distributeResult.storey.wallSectionAreaRatio[i].toFixed(1),
    });

    const towerIndex = distributeResult.storey.towerID[i] - 1;
    storeyChartData[towerIndex].push({
      x: distributeResult.storey.wallSectionAreaRatio[i],
      y: distributeResult.storey.storeyID[i],
    });
  }

  const massRatioColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: '塔号',
      code: 'towerID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: '楼层质量(t)',
      code: 'mass',
      align: 'right',
    },
    {
      name: '质量比',
      code: 'ratio',
      align: 'right',
    },
    {
      name: '单位质量(kg/m^2)',
      code: 'unitMass',
      align: 'right',
    },
    {
      name: '单位质量比',
      code: 'unitRatio',
      align: 'right',
    },
  ];

  const massRatioTableData = [];
  const massRatioChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    massRatioChartData.push([], []);
  }

  for (let i = 0; i < distributeResult.massRatio.storeyID.length; i++) {
    massRatioTableData.push({
      key: i,
      storeyID: distributeResult.massRatio.storeyID[i],
      towerID: distributeResult.massRatio.towerID[i],
      mass: (distributeResult.massRatio.storeyMass[i] / 1000).toFixed(0),
      ratio: distributeResult.massRatio.ratio[i].toFixed(2),
      unitMass: distributeResult.massRatio.massPerArea[i].toFixed(2),
      unitRatio: distributeResult.massRatio.massPerAreaRatio[i].toFixed(2),
    });

    const towerIndex = distributeResult.massRatio.towerID[i] - 1;
    massRatioChartData[2 * towerIndex].push({
      x: distributeResult.massRatio.ratio[i],
      y: distributeResult.massRatio.storeyID[i],
    });
    massRatioChartData[2 * towerIndex + 1].push({
      x: distributeResult.massRatio.massPerAreaRatio[i],
      y: distributeResult.massRatio.storeyID[i],
    });
  }

  const stiffRatioColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: '塔号',
      code: 'towerID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: 'X',
      code: 'ratx1',
      align: 'right',
    },
    {
      name: 'Y',
      code: 'raty1',
      align: 'right',
    },
    {
      name: 'X(层高修正)',
      code: 'ratx2',
      align: 'right',
    },
    {
      name: 'Y(层高修正)',
      code: 'raty2',
      align: 'right',
    },
  ];

  const stiffRatioTableData = [];
  const stiffRatioChartData: IData[][] = [];
  const stiffRatioModifyChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    stiffRatioChartData.push([], []);
    stiffRatioModifyChartData.push([], []);
  }

  for (let i = 0; i < distributeResult.stiffness.storeyID.length; i++) {
    stiffRatioTableData.push({
      key: i,
      storeyID: distributeResult.stiffness.storeyID[i],
      towerID: distributeResult.stiffness.towerID[i],
      ratx1: Math.round(distributeResult.stiffness.ratx1[i] * 1000) / 1000,
      raty1: Math.round(distributeResult.stiffness.raty1[i] * 1000) / 1000,
      ratx2: Math.round(distributeResult.stiffness.ratx2[i] * 1000) / 1000,
      raty2: Math.round(distributeResult.stiffness.raty2[i] * 1000) / 1000,
    });

    const towerIndex = distributeResult.stiffness.towerID[i] - 1;
    stiffRatioChartData[2 * towerIndex].push({
      x: distributeResult.stiffness.ratx1[i],
      y: distributeResult.stiffness.storeyID[i],
    });
    stiffRatioChartData[2 * towerIndex + 1].push({
      x: distributeResult.stiffness.raty1[i],
      y: distributeResult.stiffness.storeyID[i],
    });
    stiffRatioModifyChartData[2 * towerIndex].push({
      x: distributeResult.stiffness.ratx2[i],
      y: distributeResult.stiffness.storeyID[i],
    });
    stiffRatioModifyChartData[2 * towerIndex + 1].push({
      x: distributeResult.stiffness.raty2[i],
      y: distributeResult.stiffness.storeyID[i],
    });
  }

  const shearWeightColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: '塔号',
      code: 'towerID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: 'X',
      code: 'ratioX',
      align: 'right',
    },
    {
      name: 'Y',
      code: 'ratioY',
      align: 'right',
    },
  ];

  const shearWeightTableData = [];
  const shearWeightChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    shearWeightChartData.push([], []);
  }

  for (let i = 0; i < distributeResult.shearWeightRatio.storeyID.length; i++) {
    shearWeightTableData.push({
      key: i,
      storeyID: distributeResult.shearWeightRatio.storeyID[i],
      towerID: distributeResult.shearWeightRatio.towerID[i],
      ratioX: distributeResult.shearWeightRatio.factorX[i].toFixed(3),
      ratioY: distributeResult.shearWeightRatio.factorY[i].toFixed(3),
    });

    const towerIndex = distributeResult.shearWeightRatio.towerID[i] - 1;
    shearWeightChartData[2 * towerIndex].push({
      x: distributeResult.shearWeightRatio.factorX[i],
      y: distributeResult.shearWeightRatio.storeyID[i],
    });
    shearWeightChartData[2 * towerIndex + 1].push({
      x: distributeResult.shearWeightRatio.factorY[i],
      y: distributeResult.shearWeightRatio.storeyID[i],
    });
  }

  const shearCapacityColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: '塔号',
      code: 'towerID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: 'X',
      code: 'ratioX',
      align: 'right',
    },
    {
      name: 'Y',
      code: 'ratioY',
      align: 'right',
    },
  ];

  const shearCapacityTableData = [];
  const shearCapacityChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    shearCapacityChartData.push([], []);
  }

  for (
    let i = 0;
    i < distributeResult.shearCapacityCheck.storeyID.length;
    i++
  ) {
    shearCapacityTableData.push({
      key: i,
      storeyID: distributeResult.shearCapacityCheck.storeyID[i],
      towerID: distributeResult.shearCapacityCheck.towerID[i],
      ratioX: distributeResult.shearCapacityCheck.ratioX[i].toFixed(2),
      ratioY: distributeResult.shearCapacityCheck.ratioY[i].toFixed(2),
    });

    const towerIndex = distributeResult.shearCapacityCheck.towerID[i] - 1;
    shearCapacityChartData[2 * towerIndex].push({
      x: distributeResult.shearCapacityCheck.ratioX[i],
      y: distributeResult.shearCapacityCheck.storeyID[i],
    });
    shearCapacityChartData[2 * towerIndex + 1].push({
      x: distributeResult.shearCapacityCheck.ratioY[i],
      y: distributeResult.shearCapacityCheck.storeyID[i],
    });
  }

  const momentDistributeColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: '塔号',
      code: 'towerID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: 'X向',
      align: 'center',
      children: [
        {
          name: '柱',
          code: 'columnX',
          align: 'right',
        },
        {
          name: '短肢墙',
          code: 'wallX',
          align: 'right',
        },
      ],
    },
    {
      name: 'Y向',
      align: 'center',
      children: [
        {
          name: '柱',
          code: 'columnY',
          align: 'right',
        },
        {
          name: '短肢墙',
          code: 'wallY',
          align: 'right',
        },
      ],
    },
  ];

  const lackWallColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: '塔号',
      code: 'towerID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: 'X向',
      align: 'center',
      children: [
        {
          name: '长墙',
          code: 'wallXX',
          align: 'right',
        },
        {
          name: '扁柱框架',
          code: 'wallYX',
          align: 'right',
        },
        {
          name: '框架',
          code: 'edgeX',
          align: 'right',
        },
      ],
    },
    {
      name: 'Y向',
      align: 'center',
      children: [
        {
          name: '长墙',
          code: 'wallYY',
          align: 'right',
        },
        {
          name: '扁柱框架',
          code: 'wallXY',
          align: 'right',
        },
        {
          name: '框架',
          code: 'edgeY',
          align: 'right',
        },
      ],
    },
  ];

  const momentDistributeTableData = [];
  const momentColumnChartData: IData[][] = [];
  const momentWallChartData: IData[][] = [];
  const lackWallMomentTableData = [];
  const lackWallMomentXChartData: IData[][] = [[], [], []];
  const lackWallMomentYChartData: IData[][] = [[], [], []];
  for (let i = 0; i < n; i++) {
    momentColumnChartData.push([], []);
    momentWallChartData.push([], []);
  }

  for (let i = 0; i < distributeResult.momentPercent.storeyID.length; i++) {
    momentDistributeTableData.push({
      key: i,
      storeyID: distributeResult.momentPercent.storeyID[i],
      towerID: distributeResult.momentPercent.towerID[i],
      columnX: distributeResult.momentPercent.percentColumnX[i].toFixed(1),
      wallX: distributeResult.momentPercent.percentWallX[i].toFixed(1),
      columnY: distributeResult.momentPercent.percentColumnY[i].toFixed(1),
      wallY: distributeResult.momentPercent.percentWallY[i].toFixed(1),
    });

    const towerIndex = distributeResult.shearCapacityCheck.towerID[i] - 1;
    momentColumnChartData[2 * towerIndex].push({
      x: distributeResult.momentPercent.percentColumnX[i],
      y: distributeResult.momentPercent.storeyID[i],
    });
    momentColumnChartData[2 * towerIndex + 1].push({
      x: distributeResult.momentPercent.percentColumnY[i],
      y: distributeResult.momentPercent.storeyID[i],
    });
    momentWallChartData[2 * towerIndex].push({
      x: distributeResult.momentPercent.percentWallX[i],
      y: distributeResult.momentPercent.storeyID[i],
    });
    momentWallChartData[2 * towerIndex + 1].push({
      x: distributeResult.momentPercent.percentWallY[i],
      y: distributeResult.momentPercent.storeyID[i],
    });

    lackWallMomentTableData.push({
      key: i,
      storeyID: distributeResult.momentPercent.storeyID[i],
      towerID: distributeResult.momentPercent.towerID[i],
      wallXX:
        Math.round(distributeResult.momentPercent.percentWallXX[i] * 10) / 10,
      wallYX:
        Math.round(distributeResult.momentPercent.percentWallYX[i] * 10) / 10,
      edgeX:
        Math.round(distributeResult.momentPercent.percentEdgeX[i] * 10) / 10,
      wallYY:
        Math.round(distributeResult.momentPercent.percentWallYY[i] * 10) / 10,
      wallXY:
        Math.round(distributeResult.momentPercent.percentWallXY[i] * 10) / 10,
      edgeY:
        Math.round(distributeResult.momentPercent.percentEdgeY[i] * 10) / 10,
    });

    lackWallMomentXChartData[0].push({
      x: distributeResult.momentPercent.percentWallXX[i],
      y: distributeResult.momentPercent.storeyID[i],
    });
    lackWallMomentXChartData[1].push({
      x: distributeResult.momentPercent.percentWallYX[i],
      y: distributeResult.momentPercent.storeyID[i],
    });
    lackWallMomentXChartData[2].push({
      x: distributeResult.momentPercent.percentEdgeX[i],
      y: distributeResult.momentPercent.storeyID[i],
    });

    lackWallMomentYChartData[0].push({
      x: distributeResult.momentPercent.percentWallYY[i],
      y: distributeResult.momentPercent.storeyID[i],
    });
    lackWallMomentYChartData[1].push({
      x: distributeResult.momentPercent.percentWallXY[i],
      y: distributeResult.momentPercent.storeyID[i],
    });
    lackWallMomentYChartData[2].push({
      x: distributeResult.momentPercent.percentEdgeY[i],
      y: distributeResult.momentPercent.storeyID[i],
    });
  }

  const shearDistributeColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: '塔号',
      code: 'towerID',
      align: 'right',
      features: { sortable: true },
    },
    {
      name: 'X',
      code: 'ratioX',
      align: 'right',
    },
    {
      name: 'Y',
      code: 'ratioY',
      align: 'right',
    },
  ];

  const shearDistributeTableData = [];
  const shearColumnChartData: IData[][] = [];
  const lackWallShearTableData = [];
  const lackWallShearXChartData: IData[][] = [[], [], []];
  const lackWallShearYChartData: IData[][] = [[], [], []];
  for (let i = 0; i < n; i++) {
    shearColumnChartData.push([], []);
  }

  for (let i = 0; i < distributeResult.columnShear.storeyID.length; i++) {
    shearDistributeTableData.push({
      key: i,
      storeyID: distributeResult.columnShear.storeyID[i],
      towerID: distributeResult.columnShear.towerID[i],
      ratioX:
        Math.round(distributeResult.columnShear.percentColumnX[i] * 10) / 10,
      ratioY:
        Math.round(distributeResult.columnShear.percentColumnY[i] * 10) / 10,
    });

    const towerIndex = distributeResult.columnShear.towerID[i] - 1;
    shearColumnChartData[2 * towerIndex].push({
      x: distributeResult.columnShear.percentColumnX[i],
      y: distributeResult.columnShear.storeyID[i],
    });
    shearColumnChartData[2 * towerIndex + 1].push({
      x: distributeResult.columnShear.percentColumnY[i],
      y: distributeResult.columnShear.storeyID[i],
    });

    lackWallShearTableData.push({
      key: i,
      storeyID: distributeResult.columnShear.storeyID[i],
      towerID: distributeResult.columnShear.towerID[i],
      wallXX:
        Math.round(distributeResult.columnShear.percentWallXX[i] * 10) / 10,
      wallYX:
        Math.round(distributeResult.columnShear.percentWallYX[i] * 10) / 10,
      edgeX: Math.round(distributeResult.columnShear.percentEdgeX[i] * 10) / 10,
      wallYY:
        Math.round(distributeResult.columnShear.percentWallYY[i] * 10) / 10,
      wallXY:
        Math.round(distributeResult.columnShear.percentWallXY[i] * 10) / 10,
      edgeY: Math.round(distributeResult.columnShear.percentEdgeY[i] * 10) / 10,
    });

    lackWallShearXChartData[0].push({
      x: distributeResult.columnShear.percentWallXX[i],
      y: distributeResult.columnShear.storeyID[i],
    });
    lackWallShearXChartData[1].push({
      x: distributeResult.columnShear.percentWallYX[i],
      y: distributeResult.columnShear.storeyID[i],
    });
    lackWallShearXChartData[2].push({
      x: distributeResult.columnShear.percentEdgeX[i],
      y: distributeResult.columnShear.storeyID[i],
    });

    lackWallShearYChartData[0].push({
      x: distributeResult.columnShear.percentWallYY[i],
      y: distributeResult.columnShear.storeyID[i],
    });
    lackWallShearYChartData[1].push({
      x: distributeResult.columnShear.percentWallXY[i],
      y: distributeResult.columnShear.storeyID[i],
    });
    lackWallShearYChartData[2].push({
      x: distributeResult.columnShear.percentEdgeY[i],
      y: distributeResult.columnShear.storeyID[i],
    });
  }

  const pipelineStorey = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: storeyTableData, columns: storeyColumns })
    .use(
      features.sort({
        mode: 'multiple',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineMassRatio = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: massRatioTableData, columns: massRatioColumns })
    .use(
      features.sort({
        mode: 'multiple',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineStiffRatio = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: stiffRatioTableData, columns: stiffRatioColumns })
    .use(
      features.sort({
        mode: 'multiple',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineShearWeight = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: shearWeightTableData, columns: shearWeightColumns })
    .use(
      features.sort({
        mode: 'multiple',
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
        mode: 'multiple',
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
        mode: 'multiple',
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
        mode: 'multiple',
        highlightColumnWhenActive: true,
      })
    );

  const describesStorey: IDescribe[] = [];
  const describesMassRatio: IDescribe[] = [];
  const describes: IDescribe[] = [];
  for (let i = 0; i < n; i++) {
    describesStorey.push({
      name: n === 1 ? `墙地比` : `塔${i + 1}`,
      fill: userColors[i % 8],
      shape: userShaps[i % 7],
    });
    describesMassRatio.push(
      {
        name: n === 1 ? `质量比` : `塔${i + 1}-质量比`,
        fill: userColors[(2 * i) % 8],
        shape: userShaps[(2 * i) % 7],
      },
      {
        name: n === 1 ? `单位质量比` : `塔${i + 1}-单位质量比`,
        fill: userColors[(2 * i + 1) % 8],
        shape: userShaps[(2 * i + 1) % 7],
      }
    );
    describes.push(
      {
        name: n === 1 ? `X向` : `塔${i + 1}-X`,
        fill: userColors[(2 * i) % 8],
        shape: userShaps[(2 * i) % 7],
      },
      {
        name: n === 1 ? `Y向` : `塔${i + 1}-Y`,
        fill: userColors[(2 * i + 1) % 8],
        shape: userShaps[(2 * i + 1) % 7],
      }
    );
  }

  const describesLackWall: IDescribe[] = [
    {
      name: `长墙`,
      fill: userColors[0],
      shape: userShaps[0],
    },
    {
      name: `扁柱框架`,
      fill: userColors[1],
      shape: userShaps[1],
    },
    {
      name: `框架`,
      fill: userColors[2],
      shape: userShaps[2],
    },
  ];

  const { Panel } = Collapse;
  const DistributeResult = (
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
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelineShearDistribute.getProps()}
          />
        </Panel>
      </Collapse>
      <h3>单向少墙分析</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: 'X向剪力(%)',
          }}
          describes={describesLackWall}
          datas={lackWallShearXChartData}
        />
        <StoreyChart
          labels={{
            xLabel: 'Y向剪力(%)',
          }}
          describes={describesLackWall}
          datas={lackWallShearYChartData}
        />
      </Row>
      <Collapse ghost>
        <Panel header="剪力分配" key="1">
          <BaseTable
            columns={lackWallColumns}
            dataSource={lackWallShearTableData}
            primaryKey={'key'}
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
          />
        </Panel>
      </Collapse>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: 'X向弯矩(%)',
          }}
          describes={describesLackWall}
          datas={lackWallMomentXChartData}
        />
        <StoreyChart
          labels={{
            xLabel: 'Y向弯矩(%)',
          }}
          describes={describesLackWall}
          datas={lackWallMomentYChartData}
        />
      </Row>
      <Collapse ghost>
        <Panel header="倾覆力矩分配" key="1">
          <BaseTable
            columns={lackWallColumns}
            dataSource={lackWallMomentTableData}
            primaryKey={'key'}
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return DistributeResult;
}
