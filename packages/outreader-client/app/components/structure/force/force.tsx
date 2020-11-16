import { Row, Collapse } from 'antd';
import {
  BaseTable,
  ArtColumn,
  useTablePipeline,
  features,
} from 'ali-react-table';
import React from 'react';
import { IForceFE } from '@outreader/core';
import { StoreyChart } from '../../chart-tools';
import { IData, IDescribe } from '../../../interfaces';
import { userColors, userShaps } from '../../../colors';

export function ForceComponent(force: IForceFE) {
  const forceColumns: ArtColumn[] = [
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

  const n = new Set([...force.wind.towerID, ...force.seismic.towerID]).size;
  const forceAlongWindTableData = [];
  const shearAlongWindChartData: IData[][] = [];
  const momentAlongWindChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    shearAlongWindChartData.push([], []);
    momentAlongWindChartData.push([], []);
  }

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

    const towerIndex = force.wind.towerID[i] - 1;
    shearAlongWindChartData[2 * towerIndex].push({
      x: Math.abs(force.wind.shearAlongX[i]),
      y: force.wind.storeyID[i],
    });
    shearAlongWindChartData[2 * towerIndex + 1].push({
      x: Math.abs(force.wind.shearAlongY[i]),
      y: force.wind.storeyID[i],
    });
    momentAlongWindChartData[2 * towerIndex].push({
      x: Math.abs(force.wind.momentAlongX[i]),
      y: force.wind.storeyID[i],
    });
    momentAlongWindChartData[2 * towerIndex + 1].push({
      x: Math.abs(force.wind.momentAlongY[i]),
      y: force.wind.storeyID[i],
    });
  }

  const forceCrossWindTableData = [];
  const shearCrossWindChartData: IData[][] = [];
  const momentCrossWindChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    shearCrossWindChartData.push([], []);
    momentCrossWindChartData.push([], []);
  }

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

    const towerIndex = force.wind.towerID[i] - 1;
    shearCrossWindChartData[2 * towerIndex].push({
      x: Math.abs(force.wind.shearCrossX[i]),
      y: force.wind.storeyID[i],
    });
    shearCrossWindChartData[2 * towerIndex + 1].push({
      x: Math.abs(force.wind.shearCrossY[i]),
      y: force.wind.storeyID[i],
    });
    momentCrossWindChartData[2 * towerIndex].push({
      x: Math.abs(force.wind.momentCrossX[i]),
      y: force.wind.storeyID[i],
    });
    momentCrossWindChartData[2 * towerIndex + 1].push({
      x: Math.abs(force.wind.momentCrossY[i]),
      y: force.wind.storeyID[i],
    });
  }

  const forceSeismicTableData = [];
  const shearSeismicChartData: IData[][] = [];
  const momentSeismicChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    shearSeismicChartData.push([], []);
    momentSeismicChartData.push([], []);
  }

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

    const towerIndex = force.seismic.towerID[i] - 1;
    shearSeismicChartData[2 * towerIndex].push({
      x: Math.abs(force.seismic.shearX[i]),
      y: force.seismic.storeyID[i],
    });
    shearSeismicChartData[2 * towerIndex + 1].push({
      x: Math.abs(force.seismic.shearY[i]),
      y: force.seismic.storeyID[i],
    });
    momentSeismicChartData[2 * towerIndex].push({
      x: Math.abs(force.seismic.momentX[i]),
      y: force.seismic.storeyID[i],
    });
    momentSeismicChartData[2 * towerIndex + 1].push({
      x: Math.abs(force.seismic.momentY[i]),
      y: force.seismic.storeyID[i],
    });
  }

  const pipelineAlongWind = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: forceAlongWindTableData, columns: forceColumns })
    .use(
      features.sort({
        mode: 'multiple',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineCrossWind = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: forceCrossWindTableData, columns: forceColumns })
    .use(
      features.sort({
        mode: 'multiple',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineSeismic = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: forceSeismicTableData, columns: forceColumns })
    .use(
      features.sort({
        mode: 'multiple',
        highlightColumnWhenActive: true,
      })
    );

  const describes: IDescribe[] = [];
  for (let i = 0; i < n; i++) {
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

  const { Panel } = Collapse;
  const Force = (
    <React.Fragment>
      <h3>顺风向风荷载</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '顺风剪力(kN)',
          }}
          describes={describes}
          datas={shearAlongWindChartData}
        />
        <StoreyChart
          labels={{
            xLabel: '顺风弯矩(kNm)',
          }}
          describes={describes}
          datas={momentAlongWindChartData}
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
            {...pipelineAlongWind.getProps()}
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
              describes={describes}
              datas={shearCrossWindChartData}
            />
            <StoreyChart
              labels={{
                xLabel: '横风弯矩(kNm)',
              }}
              describes={describes}
              datas={momentCrossWindChartData}
            />
          </Row>
          <Collapse ghost>
            <Panel header="详细数据" key="1">
              <BaseTable
                primaryKey={'key'}
                useVirtual={{
                  horizontal: false,
                  header: false,
                  vertical: true,
                }}
                useOuterBorder
                defaultColumnWidth={64}
                style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
                {...pipelineCrossWind.getProps()}
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
          describes={describes}
          datas={shearSeismicChartData}
        />
        <StoreyChart
          labels={{
            xLabel: '地震弯矩(kNm)',
          }}
          describes={describes}
          datas={momentSeismicChartData}
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
            {...pipelineSeismic.getProps()}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return Force;
}
