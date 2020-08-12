import { Descriptions, Table, Layout, Row, Col } from 'antd';
import React from 'react';
import { IForceFE } from '@outreader/core';
import { StoreyChart } from './../storey-chart';

export function ForceComponent(force: IForceFE) {
  const forceColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: '外力X',
      dataIndex: 'forceX',
    },
    {
      title: '剪力X',
      dataIndex: 'shearX',
    },
    {
      title: '弯矩X',
      dataIndex: 'momentX',
    },
    {
      title: '外力Y',
      dataIndex: 'forceY',
    },
    {
      title: '剪力Y',
      dataIndex: 'shearY',
    },
    {
      title: '弯矩Y',
      dataIndex: 'momentY',
    },
  ];

  const forceAlongWindTableData = [];
  const shearWindXChartData = [];
  const shearWindYChartData = [];
  const momentWindXChartData = [];
  const momentWindYChartData = [];
  for (let i = 0; i < force.wind.storeyID.length; i++) {
    forceAlongWindTableData.push({
      storeyID: force.wind.storeyID[i],
      towerID: force.wind.towerID[i],
      forceX: force.wind.forceAlongX[i],
      shearX: force.wind.shearAlongX[i],
      momentX: force.wind.momentAlongX[i],
      forceY: force.wind.forceAlongY[i],
      shearY: force.wind.shearAlongY[i],
      momentY: force.wind.momentAlongY[i],
    });
    shearWindXChartData.push({
      x: Math.abs(force.wind.shearAlongX[i]),
      y: Math.abs(force.wind.storeyID[i]),
    });
    shearWindYChartData.push({
      x: Math.abs(force.wind.shearAlongY[i]),
      y: Math.abs(force.wind.storeyID[i]),
    });
    momentWindXChartData.push({
      x: Math.abs(force.wind.momentAlongX[i]),
      y: Math.abs(force.wind.storeyID[i]),
    });
    momentWindYChartData.push({
      x: Math.abs(force.wind.momentAlongY[i]),
      y: Math.abs(force.wind.storeyID[i]),
    });
  }

  const forceCrossWindTableData = [];
  for (let i = 0; i < force.wind.storeyID.length; i++) {
    forceCrossWindTableData.push({
      storeyID: force.wind.storeyID[i],
      towerID: force.wind.towerID[i],
      forceX: force.wind.forceCrossX[i],
      shearX: force.wind.shearCrossX[i],
      momentX: force.wind.momentCrossX[i],
      forceY: force.wind.forceCrossY[i],
      shearY: force.wind.shearCrossY[i],
      momentY: force.wind.momentCrossY[i],
    });
  }

  const forceSeismicTableData = [];
  const shearSeismicXChartData = [];
  const shearSeismicYChartData = [];
  const momentSeismicXChartData = [];
  const momentSeismicYChartData = [];
  for (let i = 0; i < force.seismic.storeyID.length; i++) {
    forceSeismicTableData.push({
      storeyID: force.seismic.storeyID[i],
      towerID: force.seismic.towerID[i],
      forceX: force.seismic.forceX[i],
      shearX: force.seismic.shearX[i],
      momentX: force.seismic.momentX[i],
      forceY: force.seismic.forceY[i],
      shearY: force.seismic.shearY[i],
      momentY: force.seismic.momentY[i],
    });
    shearSeismicXChartData.push({
      x: Math.abs(force.seismic.shearX[i]),
      y: Math.abs(force.seismic.storeyID[i]),
    });
    shearSeismicYChartData.push({
      x: Math.abs(force.seismic.shearY[i]),
      y: Math.abs(force.seismic.storeyID[i]),
    });
    momentSeismicXChartData.push({
      x: Math.abs(force.seismic.momentX[i]),
      y: Math.abs(force.seismic.storeyID[i]),
    });
    momentSeismicYChartData.push({
      x: Math.abs(force.seismic.momentY[i]),
      y: Math.abs(force.seismic.storeyID[i]),
    });
  }

  const Force = (
    <div>
      <Descriptions title="顺风向风荷载"></Descriptions>
      <Row>
        <Col span={12}>
          <StoreyChart
            data1={shearWindXChartData}
            data2={shearWindYChartData}
            xLabel="剪力(kN)"
          />
        </Col>
        <Col span={12}>
          <StoreyChart
            data1={momentWindXChartData}
            data2={momentWindYChartData}
            xLabel="弯矩(kNm)"
          />
        </Col>
      </Row>
      <Table
        columns={forceColumns}
        dataSource={forceAlongWindTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      {/* <Descriptions title="横风向风荷载"></Descriptions>
      <Table
        columns={forceColumns}
        dataSource={forceCrossWindTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      /> */}
      <Descriptions title="地震作用"></Descriptions>
      <Row>
        <Col span={12}>
          <StoreyChart
            data1={shearSeismicXChartData}
            data2={shearSeismicYChartData}
            xLabel="剪力(kN)"
          />
        </Col>
        <Col span={12}>
          <StoreyChart
            data1={momentSeismicXChartData}
            data2={momentSeismicYChartData}
            xLabel="弯矩(kNm)"
          />
        </Col>
      </Row>
      <Table
        columns={forceColumns}
        dataSource={forceSeismicTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
    </div>
  );

  return Force;
}
