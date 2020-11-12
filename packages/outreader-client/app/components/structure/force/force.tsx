import { Row, Collapse } from 'antd';
import { BaseTable, ArtColumn } from 'ali-react-table';
import React from 'react';
import { IForceFE } from '@outreader/core';
import { StoreyChart } from '../../chart-tools';

export function ForceComponent(force: IForceFE) {
  const forceColumns: ArtColumn[] = [
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
      name: '外力X',
      code: 'forceX',
      align: 'right',
    },
    {
      name: '剪力X',
      code: 'shearX',
      align: 'right',
    },
    {
      name: '弯矩X',
      code: 'momentX',
      align: 'right',
    },
    {
      name: '外力Y',
      code: 'forceY',
      align: 'right',
    },
    {
      name: '剪力Y',
      code: 'shearY',
      align: 'right',
    },
    {
      name: '弯矩Y',
      code: 'momentY',
      align: 'right',
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
      forceX: Math.round(force.wind.forceCrossX[i]),
      shearX: Math.round(force.wind.shearCrossX[i]),
      momentX: Math.round(force.wind.momentCrossX[i]),
      forceY: Math.round(force.wind.forceCrossY[i]),
      shearY: Math.round(force.wind.shearCrossY[i]),
      momentY: Math.round(force.wind.momentCrossY[i]),
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
    <React.Fragment>
      <h3>顺风向风荷载</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '顺风剪力(kN)',
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
        <StoreyChart
          labels={{
            xLabel: '顺风弯矩(kNm)',
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
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            columns={forceColumns}
            dataSource={forceAlongWindTableData}
            primaryKey={'key'}
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
          />
        </Panel>
      </Collapse>
      <h3>横风向风荷载</h3>
      <Collapse ghost>
        <Panel header="展开" key="1">
          <Row justify="space-around">
            <StoreyChart
              labels={{
                xLabel: '横风剪力(kN)',
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
            <StoreyChart
              labels={{
                xLabel: '横风弯矩(kNm)',
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
          </Row>
          <Collapse ghost>
            <Panel header="详细数据" key="1">
              <BaseTable
                columns={forceColumns}
                dataSource={forceCrossWindTableData}
                primaryKey={'key'}
                useVirtual={{
                  horizontal: false,
                  header: false,
                  vertical: true,
                }}
                useOuterBorder
                defaultColumnWidth={64}
                style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
              />
            </Panel>
          </Collapse>
        </Panel>
      </Collapse>
      <h3>地震作用</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '地震剪力(kN)',
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
        <StoreyChart
          labels={{
            xLabel: '地震弯矩(kNm)',
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
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <BaseTable
            columns={forceColumns}
            dataSource={forceSeismicTableData}
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

  return Force;
}
