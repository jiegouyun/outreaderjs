import { Descriptions, Table, Collapse } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { IFactorFE } from '@outreader/core';
import { StoreyChart } from '../storey-chart';
import { ICompare, IData, IDescribe } from '../../interfaces';
import { userColors, userShaps } from '../../colors';

export function CompareFactorComponent(factors: IFactorFE[]) {
  const n = factors.length;
  let storeyID: number[] = [];
  for (let i = 0; i < n; i++) {
    if (
      (factors[i].stiffness || factors[i].v02qFactor).storeyID.length >
      storeyID.length
    ) {
      storeyID = (factors[i].stiffness || factors[i].v02qFactor).storeyID;
    }
  }
  const count = storeyID.length;

  const weakColumns: ColumnsType<ICompare> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      width: '10%',
      align: 'right',
    },
  ];

  for (let i = 0; i < n; i++) {
    weakColumns.push({
      title: `模型${i + 1}`,
      dataIndex: `factor${i}`,
      width: `${90 / n}%`,
      align: 'right',
    });
  }

  const weakTableData: ICompare[] = [];
  const weakChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    weakChartData.push([]);
  }

  for (let j = 0; j < count; j++) {
    weakTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    const len = factors[i].stiffness.storeyID.length;
    const diff = count - len;

    for (let j = 0; j < count; j++) {
      weakTableData[j][`factor${i}`] =
        factors[i].stiffness.storeyID[j - diff] === storeyID[j]
          ? factors[i].stiffness.weakStoreyFactor[j - diff].toFixed(2)
          : '';

      weakChartData[i].push({
        x:
          factors[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? factors[i].stiffness.weakStoreyFactor[j - diff]
            : factors[i].stiffness.weakStoreyFactor[0],
        y:
          factors[i].stiffness.storeyID[j - diff] === storeyID[j]
            ? factors[i].stiffness.storeyID[j - diff]
            : factors[i].stiffness.storeyID[0],
      });
    }
  }

  const factorColumns: ColumnsType<ICompare> = [
    {
      title: '层号',
      dataIndex: 'storeyID',
      width: '10%',
      align: 'right',
    },
  ];

  for (let i = 0; i < n; i++) {
    factorColumns.push(
      {
        title: `模型${i + 1}-X`,
        dataIndex: `factorX${i}`,
        width: `${90 / 2 / n}%`,
        align: 'right',
      },
      {
        title: `模型${i + 1}-Y`,
        dataIndex: `factorY${i}`,
        width: `${90 / 2 / n}%`,
        align: 'right',
      }
    );
  }

  const shearWeightTableData: ICompare[] = [];
  const shearWeightChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    shearWeightChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    shearWeightTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    const len = factors[i].shearWeightRatioModify.storeyID.length;
    const diff = storeyID[0] - factors[i].shearWeightRatioModify.storeyID[0];

    for (let j = 0; j < count; j++) {
      shearWeightTableData[j][`factorX${i}`] =
        factors[i].shearWeightRatioModify.storeyID[j - diff] === storeyID[j]
          ? factors[i].shearWeightRatioModify.factorX[j - diff].toFixed(3)
          : '';
      shearWeightTableData[j][`factorY${i}`] =
        factors[i].shearWeightRatioModify.storeyID[j - diff] === storeyID[j]
          ? factors[i].shearWeightRatioModify.factorY[j - diff].toFixed(3)
          : '';

      shearWeightChartData[2 * i].push({
        x:
          factors[i].shearWeightRatioModify.storeyID[j - diff] === storeyID[j]
            ? factors[i].shearWeightRatioModify.factorX[j - diff]
            : factors[i].shearWeightRatioModify.factorX[
                Math.round(j / count) * (len - 1)
              ],
        y:
          factors[i].shearWeightRatioModify.storeyID[j - diff] === storeyID[j]
            ? factors[i].shearWeightRatioModify.storeyID[j - diff]
            : factors[i].shearWeightRatioModify.storeyID[
                Math.round(j / count) * (len - 1)
              ],
      });
      shearWeightChartData[2 * i + 1].push({
        x:
          factors[i].shearWeightRatioModify.storeyID[j - diff] === storeyID[j]
            ? factors[i].shearWeightRatioModify.factorY[j - diff]
            : factors[i].shearWeightRatioModify.factorY[
                Math.round(j / count) * (len - 1)
              ],
        y:
          factors[i].shearWeightRatioModify.storeyID[j - diff] === storeyID[j]
            ? factors[i].shearWeightRatioModify.storeyID[j - diff]
            : factors[i].shearWeightRatioModify.storeyID[
                Math.round(j / count) * (len - 1)
              ],
      });
    }
  }

  const v02qTableData: ICompare[] = [];
  const v02qChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    v02qChartData.push([], []);
  }

  for (let j = 0; j < count; j++) {
    v02qTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    const len = factors[i].v02qFactor.storeyID.length;
    const diff = storeyID[0] - factors[i].v02qFactor.storeyID[0];

    for (let j = 0; j < count; j++) {
      v02qTableData[j][`factorX${i}`] =
        factors[i].v02qFactor.storeyID[j - diff] === storeyID[j]
          ? factors[i].v02qFactor.factorX[j - diff].toFixed(3)
          : '';
      v02qTableData[j][`factorY${i}`] =
        factors[i].v02qFactor.storeyID[j - diff] === storeyID[j]
          ? factors[i].v02qFactor.factorY[j - diff].toFixed(3)
          : '';

      v02qChartData[2 * i].push({
        x:
          factors[i].v02qFactor.storeyID[j - diff] === storeyID[j]
            ? factors[i].v02qFactor.factorX[j - diff]
            : factors[i].v02qFactor.factorX[Math.round(j / count) * (len - 1)],
        y:
          factors[i].v02qFactor.storeyID[j - diff] === storeyID[j]
            ? factors[i].v02qFactor.storeyID[j - diff]
            : factors[i].v02qFactor.storeyID[Math.round(j / count) * (len - 1)],
      });
      v02qChartData[2 * i + 1].push({
        x:
          factors[i].v02qFactor.storeyID[j - diff] === storeyID[j]
            ? factors[i].v02qFactor.factorY[j - diff]
            : factors[i].v02qFactor.factorY[Math.round(j / count) * (len - 1)],
        y:
          factors[i].v02qFactor.storeyID[j - diff] === storeyID[j]
            ? factors[i].v02qFactor.storeyID[j - diff]
            : factors[i].v02qFactor.storeyID[Math.round(j / count) * (len - 1)],
      });
    }
  }

  const describesWeak: IDescribe[] = [];
  const describes: IDescribe[] = [];
  for (let i = 0; i < n; i++) {
    describesWeak.push({
      name: `模型${i + 1}`,
      fill: userColors[i % 8],
      shape: userShaps[i % 7],
    });
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
  const Factors = (
    <div>
      <h3>薄弱层剪力放大系数</h3>
      <StoreyChart
        labels={{
          xLabel: '薄弱层剪力放大系数',
        }}
        describes={describesWeak}
        datas={weakChartData}
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
        describes={describes}
        datas={shearWeightChartData}
      />
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={factorColumns}
            dataSource={shearWeightTableData}
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
        describes={describes}
        datas={v02qChartData}
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

  return Factors;
}
