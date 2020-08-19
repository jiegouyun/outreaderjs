import { Descriptions, Table, Collapse } from 'antd';
import React from 'react';
import { IFactorFE } from '@outreader/core';
import { StoreyChart } from './../storey-chart';

export function FactorComponent(factor: IFactorFE) {
  const weakColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: '放大系数',
      dataIndex: 'factor',
    },
  ];

  const weakTableData = [];
  const weakChartData = [];
  for (let i = 0; i < factor.stiffness.storeyID.length; i++) {
    weakTableData.push({
      key: i,
      storeyID: factor.stiffness.storeyID[i],
      towerID: factor.stiffness.towerID[i],
      factor: factor.stiffness.weakStoreyFactor[i].toFixed(2),
    });
    weakChartData.push({
      x: factor.stiffness.weakStoreyFactor[i],
      y: factor.stiffness.storeyID[i],
    });
  }

  const factorColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: 'X向',
      dataIndex: 'factorX',
    },
    {
      title: 'Y向',
      dataIndex: 'factorY',
    },
  ];

  const shearTableData = [];
  const shearXChartData = [];
  const shearYChartData = [];
  for (let i = 0; i < factor.shearWeightRatioModify.storeyID.length; i++) {
    shearTableData.push({
      key: i,
      storeyID: factor.shearWeightRatioModify.storeyID[i],
      towerID: factor.shearWeightRatioModify.towerID[i],
      factorX: factor.shearWeightRatioModify.factorX[i].toFixed(3),
      factorY: factor.shearWeightRatioModify.factorY[i].toFixed(3),
    });
    shearXChartData.push({
      x: factor.shearWeightRatioModify.factorX[i],
      y: factor.shearWeightRatioModify.storeyID[i],
    });
    shearYChartData.push({
      x: factor.shearWeightRatioModify.factorY[i],
      y: factor.shearWeightRatioModify.storeyID[i],
    });
  }

  const v02qTableData = [];
  const v02qXChartData = [];
  const v02qYChartData = [];
  for (let i = 0; i < factor.v02qFactor.storeyID.length; i++) {
    v02qTableData.push({
      key: i,
      storeyID: factor.v02qFactor.storeyID[i],
      towerID: factor.v02qFactor.towerID[i],
      factorX: factor.v02qFactor.factorX[i].toFixed(3),
      factorY: factor.v02qFactor.factorY[i].toFixed(3),
    });
    v02qXChartData.push({
      x: factor.v02qFactor.factorX[i],
      y: factor.v02qFactor.storeyID[i],
    });
    v02qYChartData.push({
      x: factor.v02qFactor.factorY[i],
      y: factor.v02qFactor.storeyID[i],
    });
  }

  const { Panel } = Collapse;
  const Factor = (
    <div>
      <h3>薄弱层剪力放大系数</h3>
      <StoreyChart
        labels={{
          xLabel: '薄弱层剪力放大系数',
        }}
        describe={[
          {
            name: '系数',
            fill: '#8884d8',
            shape: 'cross',
          },
        ]}
        datas={[weakChartData]}
      />
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={weakColumns}
            dataSource={weakTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>剪重比调整系数</h3>
      <StoreyChart
        labels={{
          xLabel: '剪重比调整系数',
        }}
        describe={[
          {
            name: 'X向',
            fill: '#8884d8',
            shape: 'cross',
          },
          {
            name: 'Y向',
            fill: '#82ca9d',
            shape: 'circle',
          },
        ]}
        datas={[shearXChartData, shearYChartData]}
      />
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={factorColumns}
            dataSource={shearTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>0.2V0调整系数</h3>
      <StoreyChart
        labels={{
          xLabel: '0.2V0调整系数',
        }}
        describe={[
          {
            name: 'X向',
            fill: '#8884d8',
            shape: 'cross',
          },
          {
            name: 'Y向',
            fill: '#82ca9d',
            shape: 'circle',
          },
        ]}
        datas={[v02qXChartData, v02qYChartData]}
      />
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={factorColumns}
            dataSource={v02qTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
    </div>
  );

  return Factor;
}
