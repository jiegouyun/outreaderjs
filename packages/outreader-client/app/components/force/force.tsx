import { Descriptions, Table, Layout, Row, Col, Collapse } from 'antd';
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
  const shearAlongWindXChartData = [];
  const shearAlongWindYChartData = [];
  const momentAlongWindXChartData = [];
  const momentAlongWindYChartData = [];
  for (let i = 0; i < force.wind.storeyID.length; i++) {
    forceAlongWindTableData.push({
      key: i,
      storeyID: force.wind.storeyID[i],
      towerID: force.wind.towerID[i],
      forceX: force.wind.forceAlongX[i].toFixed(0),
      shearX: force.wind.shearAlongX[i].toFixed(0),
      momentX: force.wind.momentAlongX[i].toFixed(0),
      forceY: force.wind.forceAlongY[i].toFixed(0),
      shearY: force.wind.shearAlongY[i].toFixed(0),
      momentY: force.wind.momentAlongY[i].toFixed(0),
    });
    shearAlongWindXChartData.push({
      x: Math.abs(force.wind.shearAlongX[i]),
      y: force.wind.storeyID[i],
    });
    shearAlongWindYChartData.push({
      x: Math.abs(force.wind.shearAlongY[i]),
      y: force.wind.storeyID[i],
    });
    momentAlongWindXChartData.push({
      x: Math.abs(force.wind.momentAlongX[i]),
      y: force.wind.storeyID[i],
    });
    momentAlongWindYChartData.push({
      x: Math.abs(force.wind.momentAlongY[i]),
      y: force.wind.storeyID[i],
    });
  }

  const forceCrossWindTableData = [];
  const shearCrossWindXChartData = [];
  const shearCrossWindYChartData = [];
  const momentCrossWindXChartData = [];
  const momentCrossWindYChartData = [];
  for (let i = 0; i < force.wind.storeyID.length; i++) {
    forceCrossWindTableData.push({
      key: i,
      storeyID: force.wind.storeyID[i],
      towerID: force.wind.towerID[i],
      forceX: force.wind.forceCrossX[i].toFixed(0),
      shearX: force.wind.shearCrossX[i].toFixed(0),
      momentX: force.wind.momentCrossX[i].toFixed(0),
      forceY: force.wind.forceCrossY[i].toFixed(0),
      shearY: force.wind.shearCrossY[i].toFixed(0),
      momentY: force.wind.momentCrossY[i].toFixed(0),
    });
    shearCrossWindXChartData.push({
      x: Math.abs(force.wind.shearCrossX[i]),
      y: force.wind.storeyID[i],
    });
    shearCrossWindYChartData.push({
      x: Math.abs(force.wind.shearCrossY[i]),
      y: force.wind.storeyID[i],
    });
    momentCrossWindXChartData.push({
      x: Math.abs(force.wind.momentCrossX[i]),
      y: force.wind.storeyID[i],
    });
    momentCrossWindYChartData.push({
      x: Math.abs(force.wind.momentCrossY[i]),
      y: force.wind.storeyID[i],
    });
  }

  const forceSeismicTableData = [];
  const shearSeismicXChartData = [];
  const shearSeismicYChartData = [];
  const momentSeismicXChartData = [];
  const momentSeismicYChartData = [];
  for (let i = 0; i < force.seismic.storeyID.length; i++) {
    forceSeismicTableData.push({
      key: i,
      storeyID: force.seismic.storeyID[i],
      towerID: force.seismic.towerID[i],
      forceX: force.seismic.forceX[i].toFixed(0),
      shearX: force.seismic.shearX[i].toFixed(0),
      momentX: force.seismic.momentX[i].toFixed(0),
      forceY: force.seismic.forceY[i].toFixed(0),
      shearY: force.seismic.shearY[i].toFixed(0),
      momentY: force.seismic.momentY[i].toFixed(0),
    });
    shearSeismicXChartData.push({
      x: Math.abs(force.seismic.shearX[i]),
      y: force.seismic.storeyID[i],
    });
    shearSeismicYChartData.push({
      x: Math.abs(force.seismic.shearY[i]),
      y: force.seismic.storeyID[i],
    });
    momentSeismicXChartData.push({
      x: Math.abs(force.seismic.momentX[i]),
      y: force.seismic.storeyID[i],
    });
    momentSeismicYChartData.push({
      x: Math.abs(force.seismic.momentY[i]),
      y: force.seismic.storeyID[i],
    });
  }

  const { Panel } = Collapse;
  const Force = (
    <div>
      <h3>顺风向风荷载</h3>
      <Row>
        <Col span={12}>
          <StoreyChart
            labels={{
              xLabel: '剪力(kN)',
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
            datas={[shearAlongWindXChartData, shearAlongWindYChartData]}
          />
        </Col>
        <Col span={12}>
          <StoreyChart
            labels={{
              xLabel: '弯矩(kNm)',
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
            datas={[momentAlongWindXChartData, momentAlongWindYChartData]}
          />
        </Col>
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={forceColumns}
            dataSource={forceAlongWindTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>横风向风荷载</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Row>
            <Col span={12}>
              <StoreyChart
                labels={{
                  xLabel: '剪力(kN)',
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
                datas={[shearCrossWindXChartData, shearCrossWindYChartData]}
              />
            </Col>
            <Col span={12}>
              <StoreyChart
                labels={{
                  xLabel: '弯矩(kNm)',
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
                datas={[momentCrossWindXChartData, momentCrossWindYChartData]}
              />
            </Col>
          </Row>
          <Table
            columns={forceColumns}
            dataSource={forceCrossWindTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
      <h3>地震作用</h3>
      <Row>
        <Col span={12}>
          <StoreyChart
            labels={{
              xLabel: '剪力(kN)',
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
            datas={[shearSeismicXChartData, shearSeismicYChartData]}
          />
        </Col>
        <Col span={12}>
          <StoreyChart
            labels={{
              xLabel: '弯矩(kNm)',
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
            datas={[momentSeismicXChartData, momentSeismicYChartData]}
          />
        </Col>
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={forceColumns}
            dataSource={forceSeismicTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
    </div>
  );

  return Force;
}