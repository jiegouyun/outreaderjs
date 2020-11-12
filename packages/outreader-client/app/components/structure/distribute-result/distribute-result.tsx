import { Row, Collapse } from 'antd';
import { BaseTable, ArtColumn } from 'ali-react-table';
import React from 'react';
import { IDistributeResultFE } from '@outreader/core';
import { StoreyChart } from '../../chart-tools';
import { IDescribe, IData } from '../../../interfaces';
import { userColors, userShaps } from '../../../colors';

export function DistributeResultComponent(
  distributeResult: IDistributeResultFE
) {
  const storeyColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      align: 'right',
    },
    {
      name: '塔号',
      code: 'towerID',
      align: 'right',
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
  const wallAreaRatioChartData = [];
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
    wallAreaRatioChartData.push({
      x: distributeResult.storey.wallSectionAreaRatio[i],
      y: distributeResult.storey.storeyID[i],
    });
  }

  const massRatioColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      align: 'right',
    },
    {
      name: '塔号',
      code: 'towerID',
      align: 'right',
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
  const massRatioChartData = [];
  const unitMassRatioChartData = [];
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
    massRatioChartData.push({
      x: distributeResult.massRatio.ratio[i],
      y: distributeResult.massRatio.storeyID[i],
    });
    unitMassRatioChartData.push({
      x: distributeResult.massRatio.massPerAreaRatio[i],
      y: distributeResult.massRatio.storeyID[i],
    });
  }

  const stiffRatioColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      align: 'right',
    },
    {
      name: '塔号',
      code: 'towerID',
      align: 'right',
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
  const stiffRatioXChartData = [];
  const stiffRatioYChartData = [];
  const stiffRatioXModifyChartData = [];
  const stiffRatioYModifyChartData = [];
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
    stiffRatioXChartData.push({
      x: distributeResult.stiffness.ratx1[i],
      y: distributeResult.stiffness.storeyID[i],
    });
    stiffRatioYChartData.push({
      x: distributeResult.stiffness.raty1[i],
      y: distributeResult.stiffness.storeyID[i],
    });
    stiffRatioXModifyChartData.push({
      x: distributeResult.stiffness.ratx2[i],
      y: distributeResult.stiffness.storeyID[i],
    });
    stiffRatioYModifyChartData.push({
      x: distributeResult.stiffness.raty2[i],
      y: distributeResult.stiffness.storeyID[i],
    });
  }

  const shearWeightColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      align: 'right',
    },
    {
      name: '塔号',
      code: 'towerID',
      align: 'right',
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
  const shearWeightXChartData = [];
  const shearWeightYChartData = [];
  for (let i = 0; i < distributeResult.shearWeightRatio.storeyID.length; i++) {
    shearWeightTableData.push({
      key: i,
      storeyID: distributeResult.shearWeightRatio.storeyID[i],
      towerID: distributeResult.shearWeightRatio.towerID[i],
      ratioX: distributeResult.shearWeightRatio.factorX[i].toFixed(3),
      ratioY: distributeResult.shearWeightRatio.factorY[i].toFixed(3),
    });
    shearWeightXChartData.push({
      x: distributeResult.shearWeightRatio.factorX[i],
      y: distributeResult.shearWeightRatio.storeyID[i],
    });
    shearWeightYChartData.push({
      x: distributeResult.shearWeightRatio.factorY[i],
      y: distributeResult.shearWeightRatio.storeyID[i],
    });
  }

  const shearCapacityColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      align: 'right',
    },
    {
      name: '塔号',
      code: 'towerID',
      align: 'right',
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
  const shearCapacityXChartData = [];
  const shearCapacityYChartData = [];
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
    shearCapacityXChartData.push({
      x: distributeResult.shearCapacityCheck.ratioX[i],
      y: distributeResult.shearCapacityCheck.storeyID[i],
    });
    shearCapacityYChartData.push({
      x: distributeResult.shearCapacityCheck.ratioY[i],
      y: distributeResult.shearCapacityCheck.storeyID[i],
    });
  }

  const momentDistributeColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      align: 'right',
    },
    {
      name: '塔号',
      code: 'towerID',
      align: 'right',
    },
    {
      name: 'X向柱',
      code: 'columnX',
      align: 'right',
    },
    {
      name: 'X向短肢墙',
      code: 'wallX',
      align: 'right',
    },
    {
      name: 'Y向柱',
      code: 'columnY',
      align: 'right',
    },
    {
      name: 'Y向短肢墙',
      code: 'wallY',
      align: 'right',
    },
  ];

  const lackWallColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      align: 'right',
    },
    {
      name: '塔号',
      code: 'towerID',
      align: 'right',
    },
    {
      name: 'X向',
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
  const lackWallMomentTableData = [];
  const momentColumnXChartData = [];
  const momentColumnYChartData = [];
  const momentWallXChartData = [];
  const momentWallYChartData = [];
  const lackWallMomentXChartData: IData[][] = [[], [], []];
  const lackWallMomentYChartData: IData[][] = [[], [], []];
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
    momentColumnXChartData.push({
      x: distributeResult.momentPercent.percentColumnX[i],
      y: distributeResult.momentPercent.storeyID[i],
    });
    momentColumnYChartData.push({
      x: distributeResult.momentPercent.percentColumnY[i],
      y: distributeResult.momentPercent.storeyID[i],
    });
    momentWallXChartData.push({
      x: distributeResult.momentPercent.percentWallX[i],
      y: distributeResult.momentPercent.storeyID[i],
    });
    momentWallYChartData.push({
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
    },
    {
      name: '塔号',
      code: 'towerID',
      align: 'right',
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
  const shearColumnXChartData = [];
  const shearColumnYChartData = [];
  const lackWallShearTableData = [];
  const lackWallShearXChartData: IData[][] = [[], [], []];
  const lackWallShearYChartData: IData[][] = [[], [], []];
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
    shearColumnXChartData.push({
      x: distributeResult.columnShear.percentColumnX[i],
      y: distributeResult.columnShear.storeyID[i],
    });
    shearColumnYChartData.push({
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

  const describes: IDescribe[] = [
    {
      name: `X向`,
      fill: userColors[0],
      shape: userShaps[0],
    },
    {
      name: `Y向`,
      fill: userColors[1],
      shape: userShaps[1],
    },
  ];

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
          describes={[
            {
              name: '墙地比',
              fill: '#8884d8',
              shape: 'cross',
            },
          ]}
          datas={[wallAreaRatioChartData]}
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            columns={storeyColumns}
            dataSource={storeyTableData}
            primaryKey={'key'}
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
          />
        </Panel>
      </Collapse>
      <h3>质量比</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '质量比',
          }}
          describes={[
            {
              name: '质量比',
              fill: '#8884d8',
              shape: 'cross',
            },
            {
              name: '单位面积质量比',
              fill: '#82ca9d',
              shape: 'circle',
            },
          ]}
          datas={[massRatioChartData, unitMassRatioChartData]}
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            columns={massRatioColumns}
            dataSource={massRatioTableData}
            primaryKey={'key'}
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
          datas={[stiffRatioXChartData, stiffRatioYChartData]}
        />
        <StoreyChart
          labels={{
            xLabel: '层高修正刚度比',
          }}
          describes={describes}
          datas={[stiffRatioXModifyChartData, stiffRatioYModifyChartData]}
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            columns={stiffRatioColumns}
            dataSource={stiffRatioTableData}
            primaryKey={'key'}
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
          datas={[shearWeightXChartData, shearWeightYChartData]}
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            columns={shearWeightColumns}
            dataSource={shearWeightTableData}
            primaryKey={'key'}
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
          datas={[shearCapacityXChartData, shearCapacityYChartData]}
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            columns={shearCapacityColumns}
            dataSource={shearCapacityTableData}
            primaryKey={'key'}
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
          />
        </Panel>
      </Collapse>
      <h3>规定水平力下倾覆力矩分配</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '规定水平力下倾覆力矩分配(%)',
          }}
          describes={describes}
          datas={[momentColumnXChartData, momentColumnYChartData]}
        />
        <StoreyChart
          labels={{
            xLabel: '短肢墙倾覆力矩占比(%)',
          }}
          describes={describes}
          datas={[momentWallXChartData, momentWallYChartData]}
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            columns={momentDistributeColumns}
            dataSource={momentDistributeTableData}
            primaryKey={'key'}
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
          datas={[shearColumnXChartData, shearColumnYChartData]}
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            columns={shearDistributeColumns}
            dataSource={shearDistributeTableData}
            primaryKey={'key'}
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
