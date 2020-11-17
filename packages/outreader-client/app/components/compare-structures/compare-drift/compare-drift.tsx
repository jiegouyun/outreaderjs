import { Row, Collapse } from 'antd';
import {
  BaseTable,
  ArtColumn,
  useTablePipeline,
  features,
} from 'ali-react-table';
import React from 'react';
import { IDriftFE } from '@outreader/core';
import { StoreyChart } from '../../chart-tools';
import { ICompare, IData, IDescribe } from '../../../interfaces';
import { userColors, userShaps } from '../../../colors';

export function CompareDriftComponent(drifts: IDriftFE[]) {
  const n = drifts.length;
  let count = 0;
  const towers = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    towers[i] = new Set([
      ...drifts[i].driftSeismicX.towerID,
      ...drifts[i].driftWindXP.towerID,
    ]).size;

    count =
      drifts[i].driftSeismicX.storeyID[0] > count
        ? drifts[i].driftSeismicX.storeyID[0]
        : count;
  }

  const storeyID = Array.from(Array(count).keys())
    .reverse()
    .map((val) => val + 1);

  const driftDispColumns: ArtColumn[] = [
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
    driftDispColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children:
        towers[i] === 1
          ? [
              {
                name: `地震X`,
                code: `seismicX${i}-0`,
                align: 'right',
              },
              {
                name: `地震Y`,
                code: `seismicY${i}-0`,
                align: 'right',
              },
              {
                name: `顺风X`,
                code: `windAX${i}-0`,
                align: 'right',
              },
              {
                name: `顺风Y`,
                code: `windAY${i}-0`,
                align: 'right',
              },
              {
                name: `横风X`,
                code: `windCX${i}-0`,
                align: 'right',
              },
              {
                name: `横风Y`,
                code: `windCY${i}-0`,
                align: 'right',
              },
            ]
          : Array.from(Array(towers[i]).keys()).map((val) => {
              return {
                name: `塔${val + 1}`,
                align: 'center',
                children: [
                  {
                    name: `地震X`,
                    code: `seismicX${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `地震Y`,
                    code: `seismicY${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `顺风X`,
                    code: `windAX${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `顺风Y`,
                    code: `windAY${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `横风X`,
                    code: `windCX${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `横风Y`,
                    code: `windCY${i}-${val}`,
                    align: 'right',
                  },
                ],
              };
            }),
    });
  }

  const dispTableData: ICompare[] = [];
  const dispSeismicChartData: IData[][] = [];
  const dispWindChartData: IData[][] = [];
  const driftTableData: ICompare[] = [];
  const driftSeismicChartData: IData[][] = [];
  const driftWindChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      dispSeismicChartData.push([], []);
      dispWindChartData.push([], []);
      driftSeismicChartData.push([], []);
      driftWindChartData.push([], []);
    }
  }

  for (let j = 0; j < count; j++) {
    dispTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
    driftTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      const tempStoreyID: number[] = [];
      const tempDispSeismicX: number[] = [];
      const tempDispSeismicY: number[] = [];
      const tempDispWindX: number[] = [];
      const tempDispWindY: number[] = [];
      const tempDispCrossWindX: number[] = [];
      const tempDispCrossWindY: number[] = [];
      const tempDriftSeismicX: number[] = [];
      const tempDriftSeismicY: number[] = [];
      const tempDriftWindX: number[] = [];
      const tempDriftWindY: number[] = [];
      const tempDriftCrossWindX: number[] = [];
      const tempDriftCrossWindY: number[] = [];
      drifts[i].driftWindXP.towerID.forEach((val, index) => {
        if (val === k + 1) {
          tempStoreyID.push(drifts[i].driftWindXP.storeyID[index]);
          tempDispSeismicX.push(drifts[i].driftSeismicX.displacement[index]);
          tempDispSeismicY.push(drifts[i].driftSeismicY.displacement[index]);
          tempDispWindX.push(drifts[i].driftWindXP.displacement[index]);
          tempDispWindY.push(drifts[i].driftWindYP.displacement[index]);
          tempDispCrossWindX.push(
            drifts[i].driftCrossWindXP.displacement[index]
          );
          tempDispCrossWindY.push(
            drifts[i].driftCrossWindYP.displacement[index]
          );
          tempDriftSeismicX.push(drifts[i].driftSeismicX.drift[index]);
          tempDriftSeismicY.push(drifts[i].driftSeismicY.drift[index]);
          tempDriftWindX.push(drifts[i].driftWindXP.drift[index]);
          tempDriftWindY.push(drifts[i].driftWindYP.drift[index]);
          tempDriftCrossWindX.push(drifts[i].driftCrossWindXP.drift[index]);
          tempDriftCrossWindY.push(drifts[i].driftCrossWindYP.drift[index]);
        }
      });
      const len = tempStoreyID[0];
      const diff = count - len;

      for (let j = 0; j < count; j++) {
        dispTableData[j][`seismicX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempDispSeismicX[j - diff] * 100) / 100
            : '';
        dispTableData[j][`seismicY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempDispSeismicY[j - diff] * 100) / 100
            : '';
        dispTableData[j][`windAX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempDispWindX[j - diff] * 100) / 100
            : '';
        dispTableData[j][`windAY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempDispWindY[j - diff] * 100) / 100
            : '';
        dispTableData[j][`windCX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempDispCrossWindX[j - diff] * 100) / 100
            : '';
        dispTableData[j][`windCY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempDispCrossWindY[j - diff] * 100) / 100
            : '';

        if (j < tempStoreyID.length) {
          dispSeismicChartData[2 * m].push({
            x: tempDispSeismicX[j],
            y: tempStoreyID[j],
          });
          dispSeismicChartData[2 * m + 1].push({
            x: tempDispSeismicY[j],
            y: tempStoreyID[j],
          });
          dispWindChartData[2 * m].push({
            x: tempDispWindX[j],
            y: tempStoreyID[j],
          });
          dispWindChartData[2 * m + 1].push({
            x: tempDispWindY[j],
            y: tempStoreyID[j],
          });
        }

        driftTableData[j][`seismicX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempDriftSeismicX[j - diff]
            : '';
        driftTableData[j][`seismicY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempDriftSeismicY[j - diff]
            : '';
        driftTableData[j][`windAX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempDriftWindX[j - diff]
            : '';
        driftTableData[j][`windAY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempDriftWindY[j - diff]
            : '';
        driftTableData[j][`windCX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempDriftCrossWindX[j - diff]
            : '';
        driftTableData[j][`windCY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempDriftCrossWindY[j - diff]
            : '';

        if (j < tempStoreyID.length) {
          driftSeismicChartData[2 * m].push({
            x: 1 / tempDriftSeismicX[j],
            y: tempStoreyID[j],
          });
          driftSeismicChartData[2 * m + 1].push({
            x: 1 / tempDriftSeismicY[j],
            y: tempStoreyID[j],
          });
          driftWindChartData[2 * m].push({
            x: 1 / tempDriftWindX[j],
            y: tempStoreyID[j],
          });
          driftWindChartData[2 * m + 1].push({
            x: 1 / tempDriftWindY[j],
            y: tempStoreyID[j],
          });
        }
      }
      m++;
    }
  }

  const dispRatioColumns: ArtColumn[] = [
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
    dispRatioColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children:
        towers[i] === 1
          ? [
              {
                name: `+X`,
                code: `eccXP${i}-0`,
                align: 'right',
              },
              {
                name: `-X`,
                code: `eccXN${i}-0`,
                align: 'right',
              },
              {
                name: `+Y`,
                code: `eccYP${i}-0`,
                align: 'right',
              },
              {
                name: `-Y`,
                code: `eccYN${i}-0`,
                align: 'right',
              },
            ]
          : Array.from(Array(towers[i]).keys()).map((val) => {
              return {
                name: `塔${val + 1}`,
                align: 'center',
                children: [
                  {
                    name: `+X`,
                    code: `eccXP${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `-X`,
                    code: `eccXN${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `+Y`,
                    code: `eccYP${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `-Y`,
                    code: `eccYN${i}-${val}`,
                    align: 'right',
                  },
                ],
              };
            }),
    });
  }

  const dispRatioTableData: ICompare[] = [];
  const ratioXChartData: IData[][] = [];
  const ratioYChartData: IData[][] = [];
  const dispRatioDTableData: ICompare[] = [];
  const ratioDXChartData: IData[][] = [];
  const ratioDYChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      ratioXChartData.push([], []);
      ratioYChartData.push([], []);
      ratioDXChartData.push([], []);
      ratioDYChartData.push([], []);
    }
  }

  for (let j = 0; j < count; j++) {
    dispRatioTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
    dispRatioDTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      const tempStoreyID: number[] = [];
      const tempRatioXEccP: number[] = [];
      const tempRatioXEccN: number[] = [];
      const tempRatioYEccP: number[] = [];
      const tempRatioYEccN: number[] = [];
      const tempRatioDXEccP: number[] = [];
      const tempRatioDXEccN: number[] = [];
      const tempRatioDYEccP: number[] = [];
      const tempRatioDYEccN: number[] = [];
      drifts[i].ratioSeismicXEccP.towerID.forEach((val, index) => {
        if (val === k + 1) {
          tempStoreyID.push(drifts[i].driftWindXP.storeyID[index]);
          tempRatioXEccP.push(drifts[i].ratioSeismicXEccP.ratio[index]);
          tempRatioXEccN.push(drifts[i].ratioSeismicXEccN.ratio[index]);
          tempRatioYEccP.push(drifts[i].ratioSeismicYEccP.ratio[index]);
          tempRatioYEccN.push(drifts[i].ratioSeismicYEccN.ratio[index]);

          tempRatioDXEccP.push(drifts[i].ratioSeismicXEccP.ratioD[index]);
          tempRatioDXEccN.push(drifts[i].ratioSeismicXEccN.ratioD[index]);
          tempRatioDYEccP.push(drifts[i].ratioSeismicYEccP.ratioD[index]);
          tempRatioDYEccN.push(drifts[i].ratioSeismicYEccN.ratioD[index]);
        }
      });
      const len = tempStoreyID[0];
      const diff = count - len;

      for (let j = 0; j < count; j++) {
        dispRatioTableData[j][`eccXP${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempRatioXEccP[j - diff] * 100) / 100
            : '';
        dispRatioTableData[j][`eccXN${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempRatioXEccN[j - diff] * 100) / 100
            : '';
        dispRatioTableData[j][`eccYP${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempRatioYEccP[j - diff] * 100) / 100
            : '';
        dispRatioTableData[j][`eccYN${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempRatioYEccN[j - diff] * 100) / 100
            : '';

        if (j < tempStoreyID.length) {
          ratioXChartData[2 * m].push({
            x: tempRatioXEccP[j],
            y: tempStoreyID[j],
          });
          ratioXChartData[2 * m + 1].push({
            x: tempRatioXEccN[j],
            y: tempStoreyID[j],
          });
          ratioYChartData[2 * m].push({
            x: tempRatioYEccP[j],
            y: tempStoreyID[j],
          });
          ratioYChartData[2 * m + 1].push({
            x: tempRatioYEccN[j],
            y: tempStoreyID[j],
          });
        }

        dispRatioDTableData[j][`eccXP${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempRatioDXEccP[j - diff] * 100) / 100
            : '';
        dispRatioDTableData[j][`eccXN${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempRatioDXEccN[j - diff] * 100) / 100
            : '';
        dispRatioDTableData[j][`eccYP${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempRatioDYEccP[j - diff] * 100) / 100
            : '';
        dispRatioDTableData[j][`eccYN${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? Math.round(tempRatioDYEccN[j - diff] * 100) / 100
            : '';

        if (j < tempStoreyID.length) {
          ratioDXChartData[2 * m].push({
            x: tempRatioDXEccP[j],
            y: tempStoreyID[j],
          });
          ratioDXChartData[2 * m + 1].push({
            x: tempRatioDXEccN[j],
            y: tempStoreyID[j],
          });
          ratioDYChartData[2 * m].push({
            x: tempRatioDYEccP[j],
            y: tempStoreyID[j],
          });
          ratioDYChartData[2 * m + 1].push({
            x: tempRatioDYEccN[j],
            y: tempStoreyID[j],
          });
        }
      }
      m++;
    }
  }

  const pipelineDisp = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: dispTableData, columns: driftDispColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineDrift = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: driftTableData, columns: driftDispColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineDispRatio = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: dispRatioTableData, columns: dispRatioColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineDispRatioStorey = useTablePipeline({
    components: BaseTable as any,
  })
    .input({ dataSource: dispRatioDTableData, columns: dispRatioColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const describesDrift: IDescribe[] = [];
  const describesDispRatio: IDescribe[] = [];
  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      describesDrift.push(
        {
          name:
            towers[i] === 1 ? `模型${i + 1}-X` : `模型${i + 1}-塔${k + 1}-X`,
          fill: userColors[(2 * m) % 8],
          shape: userShaps[(2 * m) % 7],
        },
        {
          name:
            towers[i] === 1 ? `模型${i + 1}-Y` : `模型${i + 1}-塔${k + 1}-Y`,
          fill: userColors[(2 * m + 1) % 8],
          shape: userShaps[(2 * m + 1) % 7],
        }
      );
      describesDispRatio.push(
        {
          name:
            towers[i] === 1
              ? `模型${i + 1}-正偏心`
              : `模型${i + 1}-塔${k + 1}-正偏心`,
          fill: userColors[(2 * m) % 8],
          shape: userShaps[(2 * m) % 7],
        },
        {
          name:
            towers[i] === 1
              ? `模型${i + 1}-负偏心`
              : `模型${i + 1}-塔${k + 1}-负偏心`,
          fill: userColors[(2 * m + 1) % 8],
          shape: userShaps[(2 * m + 1) % 7],
        }
      );
      m++;
    }
  }

  const { Panel } = Collapse;
  const Drifts = (
    <React.Fragment>
      <h3>位移</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '地震位移(mm)',
          }}
          describes={describesDrift}
          datas={dispSeismicChartData}
        />
        <StoreyChart
          labels={{
            xLabel: '风位移(mm)',
          }}
          describes={describesDrift}
          datas={dispWindChartData}
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
            {...pipelineDisp.getProps()}
          />
        </Panel>
      </Collapse>
      <h3>层间位移角</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: '地震位移角',
          }}
          describes={describesDrift}
          datas={driftSeismicChartData}
        />
        <StoreyChart
          labels={{
            xLabel: '风位移角',
          }}
          describes={describesDrift}
          datas={driftWindChartData}
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
            {...pipelineDrift.getProps()}
          />
        </Panel>
      </Collapse>
      <h3>位移比</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: 'X向位移比',
          }}
          describes={describesDispRatio}
          datas={ratioXChartData}
        />
        <StoreyChart
          labels={{
            xLabel: 'Y向位移比',
          }}
          describes={describesDispRatio}
          datas={ratioYChartData}
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
            {...pipelineDispRatio.getProps()}
          />
        </Panel>
      </Collapse>
      <h3>层间位移比</h3>
      <Row justify="space-around">
        <StoreyChart
          labels={{
            xLabel: 'X向层间位移比',
          }}
          describes={describesDispRatio}
          datas={ratioDXChartData}
        />
        <StoreyChart
          labels={{
            xLabel: 'Y向层间位移比',
          }}
          describes={describesDispRatio}
          datas={ratioDYChartData}
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
            {...pipelineDispRatioStorey.getProps()}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return Drifts;
}
