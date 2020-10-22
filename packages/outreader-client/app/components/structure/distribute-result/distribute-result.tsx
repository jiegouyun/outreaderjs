import { Table, Row, Collapse } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { IDistributeResultFE } from '@outreader/core';
import { StoreyChart } from '../../chart-tools';
import { IDescribe, IData } from '../../../interfaces';
import { userColors, userShaps } from '../../../colors';

export function DistributeResultComponent(
  distributeResult: IDistributeResultFE
) {
  const storeyColumns: ColumnsType<Object> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      align: 'right',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
      align: 'right',
    },
    {
      title: '属性(标准层)',
      dataIndex: 'attribute',
      align: 'right',
    },
    {
      title: '层高(m)',
      dataIndex: 'height',
      align: 'right',
    },
    {
      title: '累计高度(m)',
      dataIndex: 'heightTD',
      align: 'right',
    },
    {
      title: '面积(m^2)',
      dataIndex: 'area',
      align: 'right',
    },
    {
      title: '墙面积X(m^2)',
      dataIndex: 'wallAreaX',
      align: 'right',
    },
    {
      title: '墙面积Y(m^2)',
      dataIndex: 'wallAreaY',
      align: 'right',
    },
    {
      title: '墙面积(m^2)',
      dataIndex: 'wallAreaStorey',
      align: 'right',
    },
    {
      title: '墙地比(%)',
      dataIndex: 'wallAreaRatio',
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

  const massRatioColumns: ColumnsType<Object> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      align: 'right',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
      align: 'right',
    },
    {
      title: '楼层质量(t)',
      dataIndex: 'mass',
      align: 'right',
    },
    {
      title: '质量比',
      dataIndex: 'ratio',
      align: 'right',
    },
    {
      title: '单位质量(kg/m^2)',
      dataIndex: 'unitMass',
      align: 'right',
    },
    {
      title: '单位质量比',
      dataIndex: 'unitRatio',
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

  const stiffRatioColumns: ColumnsType<Object> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      align: 'right',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
      align: 'right',
    },
    {
      title: 'X',
      dataIndex: 'ratx1',
      align: 'right',
    },
    {
      title: 'Y',
      dataIndex: 'raty1',
      align: 'right',
    },
    {
      title: 'X(层高修正)',
      dataIndex: 'ratx2',
      align: 'right',
    },
    {
      title: 'Y(层高修正)',
      dataIndex: 'raty2',
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

  const shearWeightColumns: ColumnsType<Object> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      align: 'right',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
      align: 'right',
    },
    {
      title: 'X',
      dataIndex: 'ratioX',
      align: 'right',
    },
    {
      title: 'Y',
      dataIndex: 'ratioY',
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

  const shearCapacityColumns: ColumnsType<Object> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      align: 'right',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
      align: 'right',
    },
    {
      title: 'X',
      dataIndex: 'ratioX',
      align: 'right',
    },
    {
      title: 'Y',
      dataIndex: 'ratioY',
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

  const momentDistributeColumns: ColumnsType<Object> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      align: 'right',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
      align: 'right',
    },
    {
      title: 'X向柱',
      dataIndex: 'columnX',
      align: 'right',
    },
    {
      title: 'X向短肢墙',
      dataIndex: 'wallX',
      align: 'right',
    },
    {
      title: 'Y向柱',
      dataIndex: 'columnY',
      align: 'right',
    },
    {
      title: 'Y向短肢墙',
      dataIndex: 'wallY',
      align: 'right',
    },
  ];

  const lackWallColumns: ColumnsType<Object> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      align: 'right',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
      align: 'right',
    },
    {
      title: 'X向',
      children: [
        {
          title: '长墙',
          dataIndex: 'wallXX',
          align: 'right',
        },
        {
          title: '扁柱框架',
          dataIndex: 'wallYX',
          align: 'right',
        },
        {
          title: '框架',
          dataIndex: 'edgeX',
          align: 'right',
        },
      ],
    },
    {
      title: 'Y向',
      children: [
        {
          title: '长墙',
          dataIndex: 'wallYY',
          align: 'right',
        },
        {
          title: '扁柱框架',
          dataIndex: 'wallXY',
          align: 'right',
        },
        {
          title: '框架',
          dataIndex: 'edgeY',
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

  const shearDistributeColumns: ColumnsType<Object> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      align: 'right',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
      align: 'right',
    },
    {
      title: 'X',
      dataIndex: 'ratioX',
      align: 'right',
    },
    {
      title: 'Y',
      dataIndex: 'ratioY',
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
          <Table
            columns={storeyColumns}
            dataSource={storeyTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ y: 'calc(100vh - 12.5rem)' }}
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
          <Table
            columns={massRatioColumns}
            dataSource={massRatioTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ y: 'calc(100vh - 12.5rem)' }}
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
          <Table
            columns={stiffRatioColumns}
            dataSource={stiffRatioTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ y: 'calc(100vh - 12.5rem)' }}
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
          <Table
            columns={shearWeightColumns}
            dataSource={shearWeightTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ y: 'calc(100vh - 12.5rem)' }}
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
          <Table
            columns={shearCapacityColumns}
            dataSource={shearCapacityTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ y: 'calc(100vh - 12.5rem)' }}
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
          <Table
            columns={momentDistributeColumns}
            dataSource={momentDistributeTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ y: 'calc(100vh - 12.5rem)' }}
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
          <Table
            columns={shearDistributeColumns}
            dataSource={shearDistributeTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ y: 'calc(100vh - 12.5rem)' }}
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
          <Table
            columns={lackWallColumns}
            dataSource={lackWallShearTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ y: 'calc(100vh - 12.5rem)' }}
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
          <Table
            columns={lackWallColumns}
            dataSource={lackWallMomentTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ y: 'calc(100vh - 12.5rem)' }}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return DistributeResult;
}
