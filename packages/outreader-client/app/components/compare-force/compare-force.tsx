import { Descriptions, Table, Layout, Row, Col, Collapse } from 'antd';
import React from 'react';
import { IForceFE } from '@outreader/core';
import { StoreyChart } from '../storey-chart';
import { ICompare, IData, IDescribe } from '../../interfaces';
import { userColors, userShaps } from '../../colors';

export function CompareForceComponent(forces: IForceFE[]) {
  const n = forces.length;
  let storeyID: number[] = [];
  for (let i = 0; i < n; i++) {
    if (
      (forces[i].wind || forces[i].seismic).storeyID.length > storeyID.length
    ) {
      storeyID = (forces[i].wind || forces[i].seismic).storeyID;
    }
  }
  const count = storeyID.length;

  const forceColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
  ];

  for (let i = 0; i < n; i++) {
    forceColumns.push(
      {
        title: `模型${i + 1}-剪力X`,
        dataIndex: `shearX${i}`,
      },
      {
        title: `模型${i + 1}-弯矩X`,
        dataIndex: `momentX${i}`,
      },
      {
        title: `模型${i + 1}-剪力Y`,
        dataIndex: `shearY${i}`,
      },
      {
        title: `模型${i + 1}-弯矩Y`,
        dataIndex: `momentY${i}`,
      }
    );
  }

  const alongWindTableData: ICompare[] = [];
  const shearAlongWindChartData: IData[][] = [];
  const momentAlongWindChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    shearAlongWindChartData.push([], []);
    momentAlongWindChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    alongWindTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    const len = forces[i].wind.storeyID.length;
    const diff = count - len;

    for (let j = 0; j < count; j++) {
      alongWindTableData[j][`shearX${i}`] =
        forces[i].wind.storeyID[j - diff] === storeyID[j]
          ? forces[i].wind.shearAlongX[j - diff].toFixed(0)
          : '';
      alongWindTableData[j][`momentX${i}`] =
        forces[i].wind.storeyID[j - diff] === storeyID[j]
          ? forces[i].wind.momentAlongX[j - diff].toFixed(0)
          : '';
      alongWindTableData[j][`shearY${i}`] =
        forces[i].wind.storeyID[j - diff] === storeyID[j]
          ? forces[i].wind.shearAlongY[j - diff].toFixed(0)
          : '';
      alongWindTableData[j][`momentY${i}`] =
        forces[i].wind.storeyID[j - diff] === storeyID[j]
          ? forces[i].wind.momentAlongY[j - diff].toFixed(0)
          : '';

      shearAlongWindChartData[2 * i].push({
        x:
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? Math.abs(forces[i].wind.shearAlongX[j - diff])
            : Math.abs(forces[i].wind.shearAlongX[0]),
        y:
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? forces[i].wind.storeyID[j - diff]
            : forces[i].wind.storeyID[0],
      });
      shearAlongWindChartData[2 * i + 1].push({
        x:
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? Math.abs(forces[i].wind.shearAlongY[j - diff])
            : Math.abs(forces[i].wind.shearAlongY[0]),
        y:
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? forces[i].wind.storeyID[j - diff]
            : forces[i].wind.storeyID[0],
      });
      momentAlongWindChartData[2 * i].push({
        x:
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? Math.abs(forces[i].wind.momentAlongX[j - diff])
            : Math.abs(forces[i].wind.momentAlongX[0]),
        y:
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? forces[i].wind.storeyID[j - diff]
            : forces[i].wind.storeyID[0],
      });
      momentAlongWindChartData[2 * i + 1].push({
        x:
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? Math.abs(forces[i].wind.momentAlongY[j - diff])
            : Math.abs(forces[i].wind.momentAlongY[0]),
        y:
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? forces[i].wind.storeyID[j - diff]
            : forces[i].wind.storeyID[0],
      });
    }
  }

  const crossWindTableData: ICompare[] = [];
  const shearCrossWindChartData: IData[][] = [];
  const momentCrossWindChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    shearCrossWindChartData.push([], []);
    momentCrossWindChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    crossWindTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    const len = forces[i].wind.storeyID.length;
    const diff = count - len;

    for (let j = 0; j < count; j++) {
      crossWindTableData[j][`shearX${i}`] =
        forces[i].wind.storeyID[j - diff] === storeyID[j]
          ? forces[i].wind.shearCrossX[j - diff].toFixed(0)
          : '';
      crossWindTableData[j][`momentX${i}`] =
        forces[i].wind.storeyID[j - diff] === storeyID[j]
          ? forces[i].wind.momentCrossX[j - diff].toFixed(0)
          : '';
      crossWindTableData[j][`shearY${i}`] =
        forces[i].wind.storeyID[j - diff] === storeyID[j]
          ? forces[i].wind.shearCrossY[j - diff].toFixed(0)
          : '';
      crossWindTableData[j][`momentY${i}`] =
        forces[i].wind.storeyID[j - diff] === storeyID[j]
          ? forces[i].wind.momentCrossY[j - diff].toFixed(0)
          : '';

      shearCrossWindChartData[2 * i].push({
        x:
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? Math.abs(forces[i].wind.shearCrossX[j - diff])
            : Math.abs(forces[i].wind.shearCrossX[0]),
        y:
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? forces[i].wind.storeyID[j - diff]
            : forces[i].wind.storeyID[0],
      });
      shearCrossWindChartData[2 * i + 1].push({
        x:
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? Math.abs(forces[i].wind.shearCrossY[j - diff])
            : Math.abs(forces[i].wind.shearCrossY[0]),
        y:
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? forces[i].wind.storeyID[j - diff]
            : forces[i].wind.storeyID[0],
      });
      momentCrossWindChartData[2 * i].push({
        x:
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? Math.abs(forces[i].wind.momentCrossX[j - diff])
            : Math.abs(forces[i].wind.momentCrossX[0]),
        y:
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? forces[i].wind.storeyID[j - diff]
            : forces[i].wind.storeyID[0],
      });
      momentCrossWindChartData[2 * i + 1].push({
        x:
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? Math.abs(forces[i].wind.momentCrossY[j - diff])
            : Math.abs(forces[i].wind.momentCrossY[0]),
        y:
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? forces[i].wind.storeyID[j - diff]
            : forces[i].wind.storeyID[0],
      });
    }
  }

  const seismicTableData: ICompare[] = [];
  const shearSeismicChartData: IData[][] = [];
  const momentSeismicChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    shearSeismicChartData.push([], []);
    momentSeismicChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    seismicTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    const len = forces[i].seismic.storeyID.length;
    const diff = count - len;

    for (let j = 0; j < count; j++) {
      seismicTableData[j][`shearX${i}`] =
        forces[i].seismic.storeyID[j - diff] === storeyID[j]
          ? forces[i].seismic.shearX[j - diff].toFixed(0)
          : '';
      seismicTableData[j][`momentX${i}`] =
        forces[i].seismic.storeyID[j - diff] === storeyID[j]
          ? forces[i].seismic.momentX[j - diff].toFixed(0)
          : '';
      seismicTableData[j][`shearY${i}`] =
        forces[i].seismic.storeyID[j - diff] === storeyID[j]
          ? forces[i].seismic.shearY[j - diff].toFixed(0)
          : '';
      seismicTableData[j][`momentY${i}`] =
        forces[i].seismic.storeyID[j - diff] === storeyID[j]
          ? forces[i].seismic.momentY[j - diff].toFixed(0)
          : '';

      shearSeismicChartData[2 * i].push({
        x:
          forces[i].seismic.storeyID[j - diff] === storeyID[j]
            ? Math.abs(forces[i].seismic.shearX[j - diff])
            : Math.abs(forces[i].seismic.shearX[0]),
        y:
          forces[i].seismic.storeyID[j - diff] === storeyID[j]
            ? forces[i].seismic.storeyID[j - diff]
            : forces[i].seismic.storeyID[0],
      });
      shearSeismicChartData[2 * i + 1].push({
        x:
          forces[i].seismic.storeyID[j - diff] === storeyID[j]
            ? Math.abs(forces[i].seismic.shearY[j - diff])
            : Math.abs(forces[i].seismic.shearY[0]),
        y:
          forces[i].seismic.storeyID[j - diff] === storeyID[j]
            ? forces[i].seismic.storeyID[j - diff]
            : forces[i].seismic.storeyID[0],
      });
      momentSeismicChartData[2 * i].push({
        x:
          forces[i].seismic.storeyID[j - diff] === storeyID[j]
            ? Math.abs(forces[i].seismic.momentX[j - diff])
            : Math.abs(forces[i].seismic.momentX[0]),
        y:
          forces[i].seismic.storeyID[j - diff] === storeyID[j]
            ? forces[i].seismic.storeyID[j - diff]
            : forces[i].seismic.storeyID[0],
      });
      momentSeismicChartData[2 * i + 1].push({
        x:
          forces[i].seismic.storeyID[j - diff] === storeyID[j]
            ? Math.abs(forces[i].seismic.momentY[j - diff])
            : Math.abs(forces[i].seismic.momentY[0]),
        y:
          forces[i].seismic.storeyID[j - diff] === storeyID[j]
            ? forces[i].seismic.storeyID[j - diff]
            : forces[i].seismic.storeyID[0],
      });
    }
  }

  const describes: IDescribe[] = [];
  for (let i = 0; i < n; i++) {
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
  const Forces = (
    <div>
      <h3>顺风向风荷载</h3>
      <Row>
        <Col span={12}>
          <StoreyChart
            labels={{
              xLabel: '剪力(kN)',
            }}
            describes={describes}
            datas={shearAlongWindChartData}
          />
        </Col>
        <Col span={12}>
          <StoreyChart
            labels={{
              xLabel: '弯矩(kNm)',
            }}
            describes={describes}
            datas={momentAlongWindChartData}
          />
        </Col>
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={forceColumns}
            dataSource={alongWindTableData}
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
                describes={describes}
                datas={shearCrossWindChartData}
              />
            </Col>
            <Col span={12}>
              <StoreyChart
                labels={{
                  xLabel: '弯矩(kNm)',
                }}
                describes={describes}
                datas={momentCrossWindChartData}
              />
            </Col>
          </Row>
          <Table
            columns={forceColumns}
            dataSource={crossWindTableData}
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
            describes={describes}
            datas={shearSeismicChartData}
          />
        </Col>
        <Col span={12}>
          <StoreyChart
            labels={{
              xLabel: '弯矩(kNm)',
            }}
            describes={describes}
            datas={momentSeismicChartData}
          />
        </Col>
      </Row>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={forceColumns}
            dataSource={seismicTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
    </div>
  );

  return Forces;
}
