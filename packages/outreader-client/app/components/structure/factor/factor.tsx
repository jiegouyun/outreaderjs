import { Collapse, Row } from 'antd';
import {
  BaseTable,
  ArtColumn,
  useTablePipeline,
  features,
} from 'ali-react-table';
import React from 'react';
import { IFactorFE } from '@outreader/core';
import { StoreyChart } from '../../chart-tools';
import { IData, IDescribe } from '../../../interfaces';
import { userColors, userShaps } from '../../../colors';

export function FactorComponent(factor: IFactorFE) {
  const n = new Set([
    ...factor.stiffness.towerID,
    ...factor.shearWeightRatioModify.towerID,
    ...factor.v02qFactor.towerID,
  ]).size;

  const weakColumns: ArtColumn[] = [
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
      name: '放大系数',
      code: 'factor',
      align: 'right',
    },
  ];

  const weakTableData = [];
  const weakChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    weakChartData.push([]);
  }

  for (let i = 0; i < factor.stiffness.storeyID.length; i++) {
    weakTableData.push({
      key: i,
      storeyID: factor.stiffness.storeyID[i],
      towerID: factor.stiffness.towerID[i],
      factor: factor.stiffness.weakStoreyFactor[i].toFixed(2),
    });

    const towerIndex = factor.stiffness.towerID[i] - 1;
    weakChartData[towerIndex].push({
      x: factor.stiffness.weakStoreyFactor[i],
      y: factor.stiffness.storeyID[i],
    });
  }

  const factorColumns: ArtColumn[] = [
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

  const shearWeightTableData = [];
  const shearWeightChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    shearWeightChartData.push([], []);
  }

  for (let i = 0; i < factor.shearWeightRatioModify.storeyID.length; i++) {
    shearWeightTableData.push({
      key: i,
      storeyID: factor.shearWeightRatioModify.storeyID[i],
      towerID: factor.shearWeightRatioModify.towerID[i],
      factorX: factor.shearWeightRatioModify.factorX[i].toFixed(3),
      factorY: factor.shearWeightRatioModify.factorY[i].toFixed(3),
    });

    const towerIndex = factor.shearWeightRatioModify.towerID[i] - 1;
    shearWeightChartData[2 * towerIndex].push({
      x: factor.shearWeightRatioModify.factorX[i],
      y: factor.shearWeightRatioModify.storeyID[i],
    });
    shearWeightChartData[2 * towerIndex + 1].push({
      x: factor.shearWeightRatioModify.factorY[i],
      y: factor.shearWeightRatioModify.storeyID[i],
    });
  }

  const v02qTableData = [];
  const v02qChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    v02qChartData.push([], []);
  }

  for (let i = 0; i < factor.v02qFactor.storeyID.length; i++) {
    v02qTableData.push({
      key: i,
      storeyID: factor.v02qFactor.storeyID[i],
      towerID: factor.v02qFactor.towerID[i],
      factorX: factor.v02qFactor.factorX[i].toFixed(3),
      factorY: factor.v02qFactor.factorY[i].toFixed(3),
    });

    const towerIndex = factor.v02qFactor.towerID[i] - 1;
    v02qChartData[2 * towerIndex].push({
      x: factor.v02qFactor.factorX[i],
      y: factor.v02qFactor.storeyID[i],
    });
    v02qChartData[2 * towerIndex + 1].push({
      x: factor.v02qFactor.factorY[i],
      y: factor.v02qFactor.storeyID[i],
    });
  }

  const pipelineWeak = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: weakTableData, columns: weakColumns })
    .use(
      features.sort({
        mode: 'multiple',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineShearWeight = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: shearWeightTableData, columns: factorColumns })
    .use(
      features.sort({
        mode: 'multiple',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineV02q = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: v02qTableData, columns: factorColumns })
    .use(
      features.sort({
        mode: 'multiple',
        highlightColumnWhenActive: true,
      })
    );

  const describesWeak: IDescribe[] = [];
  const describes: IDescribe[] = [];
  for (let i = 0; i < n; i++) {
    describesWeak.push({
      name: n === 1 ? `调整系数` : `塔${i + 1}`,
      fill: userColors[i % 8],
      shape: userShaps[i % 7],
    });
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
  const Factor = (
    <React.Fragment>
      <h3>薄弱层剪力放大系数</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '薄弱层剪力放大系数',
          }}
          describes={describesWeak}
          datas={weakChartData}
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
            {...pipelineWeak.getProps()}
          />
        </Panel>
      </Collapse>
      <h3>剪重比调整系数</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '剪重比调整系数',
          }}
          describes={describes}
          datas={shearWeightChartData}
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
            {...pipelineShearWeight.getProps()}
          />
        </Panel>
      </Collapse>
      <h3>0.2V0调整系数</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '0.2V0调整系数',
          }}
          describes={describes}
          datas={v02qChartData}
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
            {...pipelineV02q.getProps()}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return Factor;
}
