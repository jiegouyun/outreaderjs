import { Collapse, Row } from 'antd';
import { BaseTable, ArtColumn } from 'ali-react-table';
import React from 'react';
import { IFactorFE } from '@outreader/core';
import { StoreyChart } from '../../chart-tools';

export function FactorComponent(factor: IFactorFE) {
  const weakColumns: ArtColumn[] = [
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
      name: '放大系数',
      code: 'factor',
      align: 'right',
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

  const factorColumns: ArtColumn[] = [
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
      code: 'factorX',
      align: 'right',
    },
    {
      name: 'Y向',
      code: 'factorY',
      align: 'right',
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
    <React.Fragment>
      <h3>薄弱层剪力放大系数</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '薄弱层剪力放大系数',
          }}
          describes={[
            {
              name: '系数',
              fill: '#8884d8',
              shape: 'cross',
            },
          ]}
          datas={[weakChartData]}
        />
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            columns={weakColumns}
            dataSource={weakTableData}
            primaryKey={'key'}
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
          />
        </Panel>
      </Collapse>
      <h3>剪重比调整系数</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '剪重比调整系数',
          }}
          describes={[
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
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            columns={factorColumns}
            dataSource={shearTableData}
            primaryKey={'key'}
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
          />
        </Panel>
      </Collapse>
      <h3>0.2V0调整系数</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '0.2V0调整系数',
          }}
          describes={[
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
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            columns={factorColumns}
            dataSource={v02qTableData}
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

  return Factor;
}
