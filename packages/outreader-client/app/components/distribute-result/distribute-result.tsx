import { Descriptions, Table, Row, Col, Collapse } from 'antd';
import React from 'react';
import { IDistributeResultFE } from '@outreader/core';
import { StoreyChart } from './../storey-chart';

export function DistributeResultComponent(
  distributeResult: IDistributeResultFE
) {
  const storeyColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: '属性(标准层)',
      dataIndex: 'attribute',
    },
    {
      title: '层高(m)',
      dataIndex: 'height',
    },
    {
      title: '累计高度(m)',
      dataIndex: 'heightTD',
    },
    {
      title: '面积(m^2)',
      dataIndex: 'area',
    },
  ];

  const storeyTableData = [];
  for (let i = 0; i < distributeResult.storey.storeyID.length; i++) {
    storeyTableData.push({
      storeyID: distributeResult.storey.storeyID[i],
      towerID: distributeResult.storey.towerID[i],
      attribute: distributeResult.storey.attribute[i],
      height: distributeResult.storey.height[i].toFixed(2),
      heightTD: distributeResult.storey.heightToGround[i].toFixed(2),
      area: distributeResult.storey.area[i].toFixed(0),
    });
  }

  const massRatioColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: '楼层质量(t)',
      dataIndex: 'mass',
    },
    {
      title: '质量比',
      dataIndex: 'ratio',
    },
    {
      title: '单位质量(kg/m^2)',
      dataIndex: 'unitMass',
    },
    {
      title: '单位质量比',
      dataIndex: 'unitRatio',
    },
  ];

  const massRatioTableData = [];
  const massRatioChartData = [];
  const unitMassRatioChartData = [];
  for (let i = 0; i < distributeResult.massRatio.storeyID.length; i++) {
    massRatioTableData.push({
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

  const stiffRatioColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: 'X',
      dataIndex: 'ratx1',
    },
    {
      title: 'Y',
      dataIndex: 'raty1',
    },
    {
      title: 'X(层高修正)',
      dataIndex: 'ratx2',
    },
    {
      title: 'Y(层高修正)',
      dataIndex: 'raty2',
    },
  ];

  const stiffRatioTableData = [];
  const stiffRatioXChartData = [];
  const stiffRatioYChartData = [];
  const sriffRatioXModifyChartData = [];
  const sriffRatioYModifyChartData = [];
  for (let i = 0; i < distributeResult.stiffness.storeyID.length; i++) {
    stiffRatioTableData.push({
      storeyID: distributeResult.stiffness.storeyID[i],
      towerID: distributeResult.stiffness.towerID[i],
      ratx1: distributeResult.stiffness.ratx1[i].toFixed(3),
      raty1: distributeResult.stiffness.raty1[i].toFixed(3),
      ratx2: distributeResult.stiffness.ratx2[i].toFixed(3),
      raty2: distributeResult.stiffness.raty2[i].toFixed(3),
    });
    stiffRatioXChartData.push({
      x: distributeResult.stiffness.ratx1[i],
      y: distributeResult.stiffness.storeyID[i],
    });
    stiffRatioYChartData.push({
      x: distributeResult.stiffness.raty1[i],
      y: distributeResult.stiffness.storeyID[i],
    });
    sriffRatioXModifyChartData.push({
      x: distributeResult.stiffness.ratx2[i],
      y: distributeResult.stiffness.storeyID[i],
    });
    sriffRatioYModifyChartData.push({
      x: distributeResult.stiffness.raty2[i],
      y: distributeResult.stiffness.storeyID[i],
    });
  }

  const shearWeightColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: 'X',
      dataIndex: 'ratioX',
    },
    {
      title: 'Y',
      dataIndex: 'ratioY',
    },
  ];

  const shearWeightTableData = [];
  const shearWeightXChartData = [];
  const shearWeightYChartData = [];
  for (let i = 0; i < distributeResult.shearWeightRatio.storeyID.length; i++) {
    shearWeightTableData.push({
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

  const shearCapacityColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: 'X',
      dataIndex: 'ratioX',
    },
    {
      title: 'Y',
      dataIndex: 'ratioY',
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

  const momentDistributeColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: 'X向柱',
      dataIndex: 'columnX',
    },
    {
      title: 'X向短肢墙',
      dataIndex: 'wallX',
    },
    {
      title: 'Y向柱',
      dataIndex: 'columnY',
    },
    {
      title: 'Y向短肢墙',
      dataIndex: 'wallY',
    },
  ];

  const momentDistributeTableData = [];
  const momentColumnXChartData = [];
  const momentColumnYChartData = [];
  const momentWallXChartData = [];
  const momentWallYChartData = [];
  for (let i = 0; i < distributeResult.momentPercent.storeyID.length; i++) {
    momentDistributeTableData.push({
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
  }

  const shearDistributeColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: 'X',
      dataIndex: 'ratioX',
    },
    {
      title: 'Y',
      dataIndex: 'ratioY',
    },
  ];

  const shearDistributeTableData = [];
  const shearColumnXChartData = [];
  const shearColumnYChartData = [];
  for (let i = 0; i < distributeResult.columnShear.storeyID.length; i++) {
    shearDistributeTableData.push({
      storeyID: distributeResult.columnShear.storeyID[i],
      towerID: distributeResult.columnShear.towerID[i],
      ratioX: distributeResult.columnShear.percentColumnX[i].toFixed(1),
      ratioY: distributeResult.columnShear.percentColumnY[i].toFixed(1),
    });
    shearColumnXChartData.push({
      x: distributeResult.columnShear.percentColumnX[i],
      y: distributeResult.columnShear.storeyID[i],
    });
    shearColumnYChartData.push({
      x: distributeResult.columnShear.percentColumnY[i],
      y: distributeResult.columnShear.storeyID[i],
    });
  }

  const { Panel } = Collapse;
  const DistributeResult = (
    <div>
      <Descriptions title="楼层属性"></Descriptions>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={storeyColumns}
            dataSource={storeyTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <Descriptions title="质量比"></Descriptions>
      <StoreyChart
        data1={massRatioChartData}
        data2={unitMassRatioChartData}
        xLabel="质量比"
      />
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={massRatioColumns}
            dataSource={massRatioTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <Descriptions title="刚度比"></Descriptions>
      <Row>
        <Col span={12}>
          <StoreyChart
            data1={stiffRatioXChartData}
            data2={stiffRatioYChartData}
            xLabel="刚度比"
          />
        </Col>
        <Col span={12}>
          <StoreyChart
            data1={sriffRatioXModifyChartData}
            data2={sriffRatioYModifyChartData}
            xLabel="层高修正刚度比"
          />
        </Col>
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
          />
        </Panel>
      </Collapse>
      <Descriptions title="剪重比"></Descriptions>
      <StoreyChart
        data1={shearWeightXChartData}
        data2={shearWeightYChartData}
        xLabel="剪重比"
      />
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={shearWeightColumns}
            dataSource={shearWeightTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <Descriptions title="抗剪承载力比"></Descriptions>
      <StoreyChart
        data1={shearCapacityXChartData}
        data2={shearCapacityYChartData}
        xLabel="抗剪承载力比"
      />
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={shearCapacityColumns}
            dataSource={shearCapacityTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <Descriptions title="规定水平力下倾覆力矩分配"></Descriptions>
      <Row>
        <Col span={12}>
          <StoreyChart
            data1={momentColumnXChartData}
            data2={momentColumnYChartData}
            xLabel="框架柱倾覆力矩占比(%)"
          />
        </Col>
        <Col span={12}>
          <StoreyChart
            data1={momentWallXChartData}
            data2={momentWallYChartData}
            xLabel="短肢墙倾覆力矩占比(%)"
          />
        </Col>
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
          />
        </Panel>
      </Collapse>
      <Descriptions title="柱剪力与分段基底剪力百分比"></Descriptions>
      <StoreyChart
        data1={shearColumnXChartData}
        data2={shearColumnYChartData}
        xLabel="柱剪力与分段基底剪力百分比(%)"
      />
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={shearDistributeColumns}
            dataSource={shearDistributeTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
    </div>
  );

  return DistributeResult;
}
