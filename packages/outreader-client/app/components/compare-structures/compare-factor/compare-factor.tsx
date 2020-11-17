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
import { ICompare, IData, IDescribe } from '../../../interfaces';
import { userColors, userShaps } from '../../../colors';

export function CompareFactorComponent(factors: IFactorFE[]) {
  const n = factors.length;
  let count = 0;
  const towers = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    towers[i] = new Set([
      ...factors[i].stiffness.towerID,
      ...factors[i].v02qFactor.towerID,
      ...factors[i].shearWeightRatioModify.towerID,
    ]).size;

    count =
      (
        factors[i].stiffness ||
        factors[i].v02qFactor ||
        factors[i].shearWeightRatioModify
      ).storeyID[0] > count
        ? (
            factors[i].stiffness ||
            factors[i].v02qFactor ||
            factors[i].shearWeightRatioModify
          ).storeyID[0]
        : count;
  }

  const storeyID = Array.from(Array(count).keys())
    .reverse()
    .map((val) => val + 1);

  const weakColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
      features: { sortable: true },
    },
  ];

  for (let i = 0; i < n; i++) {
    weakColumns.push(
      towers[i] === 1
        ? {
            name: `模型${i + 1}`,
            code: `factor${i}-0`,
            align: 'right',
          }
        : {
            name: `模型${i + 1}`,
            align: 'center',
            children: Array.from(Array(towers[i]).keys()).map((val) => {
              return {
                name: `塔${val + 1}`,
                code: `factor${i}-${val}`,
                align: 'right',
              };
            }),
          }
    );
  }

  const weakTableData: ICompare[] = [];
  const weakChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      weakChartData.push([]);
    }
  }

  for (let j = 0; j < count; j++) {
    weakTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      const tempStoreyID: number[] = [];
      const tempWeakStoreyFactor: number[] = [];
      factors[i].stiffness.towerID.forEach((val, index) => {
        if (val === k + 1) {
          tempStoreyID.push(factors[i].stiffness.storeyID[index]);
          tempWeakStoreyFactor.push(
            factors[i].stiffness.weakStoreyFactor[index]
          );
        }
      });
      const len = tempStoreyID[0];
      const diff = count - len;

      for (let j = 0; j < count; j++) {
        weakTableData[j][`factor${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempWeakStoreyFactor[j - diff].toFixed(2)
            : '';

        if (j < tempStoreyID.length) {
          weakChartData[m].push({
            x: tempWeakStoreyFactor[j],
            y: tempStoreyID[j],
          });
        }
      }
      m++;
    }
  }

  const factorColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
      features: { sortable: true },
    },
  ];

  for (let i = 0; i < n; i++) {
    factorColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children:
        towers[i] === 1
          ? [
              {
                name: `X`,
                code: `factorX${i}-0`,
                align: 'right',
              },
              {
                name: `Y`,
                code: `factorY${i}-0`,
                align: 'right',
              },
            ]
          : Array.from(Array(towers[i]).keys()).map((val) => {
              return {
                name: `塔${val + 1}`,
                align: 'center',
                children: [
                  {
                    name: `X`,
                    code: `factorX${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `Y`,
                    code: `factorY${i}-${val}`,
                    align: 'right',
                  },
                ],
              };
            }),
    });
  }

  const shearWeightTableData: ICompare[] = [];
  const shearWeightChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      shearWeightChartData.push([], []);
    }
  }

  for (let j = 0; j < count; j++) {
    shearWeightTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      const tempStoreyID: number[] = [];
      const tempFactorX: number[] = [];
      const tempFactorY: number[] = [];
      factors[i].shearWeightRatioModify.towerID.forEach((val, index) => {
        if (val === k + 1) {
          tempStoreyID.push(factors[i].shearWeightRatioModify.storeyID[index]);
          tempFactorX.push(factors[i].shearWeightRatioModify.factorX[index]);
          tempFactorY.push(factors[i].shearWeightRatioModify.factorY[index]);
        }
      });
      const len = tempStoreyID[0];
      const diff = count - len;

      for (let j = 0; j < count; j++) {
        shearWeightTableData[j][`factorX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempFactorX[j - diff].toFixed(3)
            : '';
        shearWeightTableData[j][`factorY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempFactorY[j - diff].toFixed(3)
            : '';

        if (j < tempStoreyID.length) {
          shearWeightChartData[2 * m].push({
            x: tempFactorX[j],
            y: tempStoreyID[j],
          });
          shearWeightChartData[2 * m + 1].push({
            x: tempFactorY[j],
            y: tempStoreyID[j],
          });
        }
      }
      m++;
    }
  }

  const v02qTableData: ICompare[] = [];
  const v02qChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      v02qChartData.push([], []);
    }
  }

  for (let j = 0; j < count; j++) {
    v02qTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      const tempStoreyID: number[] = [];
      const tempFactorX: number[] = [];
      const tempFactorY: number[] = [];
      factors[i].v02qFactor.towerID.forEach((val, index) => {
        if (val === k + 1) {
          tempStoreyID.push(factors[i].v02qFactor.storeyID[index]);
          tempFactorX.push(factors[i].v02qFactor.factorX[index]);
          tempFactorY.push(factors[i].v02qFactor.factorY[index]);
        }
      });
      const len = tempStoreyID[0];
      const diff = count - len;

      for (let j = 0; j < count; j++) {
        v02qTableData[j][`factorX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempFactorX[j - diff].toFixed(3)
            : '';
        v02qTableData[j][`factorY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempFactorY[j - diff].toFixed(3)
            : '';

        if (j < tempStoreyID.length) {
          v02qChartData[2 * m].push({
            x: tempFactorX[j],
            y: tempStoreyID[j],
          });
          v02qChartData[2 * m + 1].push({
            x: tempFactorY[j],
            y: tempStoreyID[j],
          });
        }
      }
      m++;
    }
  }

  const pipelineWeak = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: weakTableData, columns: weakColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineShearWeight = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: shearWeightTableData, columns: factorColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineV02q = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: v02qTableData, columns: factorColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const describesWeak: IDescribe[] = [];
  const describes: IDescribe[] = [];
  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      describesWeak.push({
        name: towers[i] === 1 ? `模型${i + 1}` : `模型${i + 1}-塔${k + 1}`,
        fill: userColors[i % 8],
        shape: userShaps[i % 7],
      });
      describes.push(
        {
          name:
            towers[i] === 1 ? `模型${i + 1}-X` : `模型${i + 1}-塔${k + 1}-X`,
          fill: userColors[(2 * i) % 8],
          shape: userShaps[(2 * i) % 7],
        },
        {
          name:
            towers[i] === 1 ? `模型${i + 1}-Y` : `模型${i + 1}-塔${k + 1}-Y`,
          fill: userColors[(2 * i + 1) % 8],
          shape: userShaps[(2 * i + 1) % 7],
        }
      );
      m++;
    }
  }

  const { Panel } = Collapse;
  const Factors = (
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
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelineV02q.getProps()}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return Factors;
}
