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
import { ICompare, IData, IDescribe } from '../../../interfaces';
import { userColors, userShaps } from '../../../colors';

export function CompareForceComponent(forces: IForceFE[]) {
  const n = forces.length;
  let count = 0;
  const towers = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    towers[i] = new Set([
      ...forces[i].wind.towerID,
      ...forces[i].seismic.towerID,
    ]).size;

    count =
      (forces[i].wind || forces[i].seismic).storeyID[0] > count
        ? (forces[i].wind || forces[i].seismic).storeyID[0]
        : count;
  }

  const storeyID = Array.from(Array(count).keys())
    .reverse()
    .map((val) => val + 1);

  const forceColumns: ArtColumn[] = [
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
    forceColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children:
        towers[i] === 1
          ? [
              {
                name: `剪力X`,
                code: `shearX${i}-0`,
                align: 'right',
              },
              {
                name: `弯矩X`,
                code: `momentX${i}-0`,
                align: 'right',
              },
              {
                name: `剪力Y`,
                code: `shearY${i}-0`,
                align: 'right',
              },
              {
                name: `弯矩Y`,
                code: `momentY${i}-0`,
                align: 'right',
              },
            ]
          : Array.from(Array(towers[i]).keys()).map((val) => {
              return {
                name: `塔${val + 1}`,
                align: 'center',
                children: [
                  {
                    name: `剪力X`,
                    code: `shearX${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `弯矩X`,
                    code: `momentX${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `剪力Y`,
                    code: `shearY${i}-${val}`,
                    align: 'right',
                  },
                  {
                    name: `弯矩Y`,
                    code: `momentY${i}-${val}`,
                    align: 'right',
                  },
                ],
              };
            }),
    });
  }

  const alongWindTableData: ICompare[] = [];
  const shearAlongWindChartData: IData[][] = [];
  const momentAlongWindChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      shearAlongWindChartData.push([], []);
      momentAlongWindChartData.push([], []);
    }
  }

  for (let j = 0; j < count; j++) {
    alongWindTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      const tempStoreyID: number[] = [];
      const tempShearX: number[] = [];
      const tempMomentX: number[] = [];
      const tempShearY: number[] = [];
      const tempMomentY: number[] = [];
      forces[i].wind.towerID.forEach((val, index) => {
        if (val === k + 1) {
          tempStoreyID.push(forces[i].wind.storeyID[index]);
          tempShearX.push(forces[i].wind.shearAlongX[index]);
          tempMomentX.push(forces[i].wind.momentAlongX[index]);
          tempShearY.push(forces[i].wind.shearAlongY[index]);
          tempMomentY.push(forces[i].wind.momentAlongY[index]);
        }
      });
      const len = tempStoreyID[0];
      const diff = count - len;

      for (let j = 0; j < count; j++) {
        alongWindTableData[j][`shearX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempShearX[j - diff].toFixed(0)
            : '';
        alongWindTableData[j][`momentX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempMomentX[j - diff].toFixed(0)
            : '';
        alongWindTableData[j][`shearY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempShearY[j - diff].toFixed(0)
            : '';
        alongWindTableData[j][`momentY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempMomentY[j - diff].toFixed(0)
            : '';

        if (j < tempStoreyID.length) {
          shearAlongWindChartData[2 * m].push({
            x: Math.abs(tempShearX[j]),
            y: tempStoreyID[j],
          });
          shearAlongWindChartData[2 * m + 1].push({
            x: Math.abs(tempShearY[j]),
            y: tempStoreyID[j],
          });
          momentAlongWindChartData[2 * m].push({
            x: Math.abs(tempMomentX[j]),
            y: tempStoreyID[j],
          });
          momentAlongWindChartData[2 * m + 1].push({
            x: Math.abs(tempMomentY[j]),
            y: tempStoreyID[j],
          });
        }
      }
      m++;
    }
  }

  const crossWindTableData: ICompare[] = [];
  const shearCrossWindChartData: IData[][] = [];
  const momentCrossWindChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      shearCrossWindChartData.push([], []);
      momentCrossWindChartData.push([], []);
    }
  }

  for (let j = 0; j < count; j++) {
    crossWindTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      const tempStoreyID: number[] = [];
      const tempShearX: number[] = [];
      const tempMomentX: number[] = [];
      const tempShearY: number[] = [];
      const tempMomentY: number[] = [];
      forces[i].wind.towerID.forEach((val, index) => {
        if (val === k + 1) {
          tempStoreyID.push(forces[i].wind.storeyID[index]);
          tempShearX.push(forces[i].wind.shearCrossX[index]);
          tempMomentX.push(forces[i].wind.momentCrossX[index]);
          tempShearY.push(forces[i].wind.shearCrossY[index]);
          tempMomentY.push(forces[i].wind.momentCrossY[index]);
        }
      });
      const len = tempStoreyID[0];
      const diff = count - len;

      for (let j = 0; j < count; j++) {
        crossWindTableData[j][`shearX${i}`] =
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? Math.round(forces[i].wind.shearCrossX[j - diff])
            : '';
        crossWindTableData[j][`momentX${i}`] =
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? Math.round(forces[i].wind.momentCrossX[j - diff])
            : '';
        crossWindTableData[j][`shearY${i}`] =
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? Math.round(forces[i].wind.shearCrossY[j - diff])
            : '';
        crossWindTableData[j][`momentY${i}`] =
          forces[i].wind.storeyID[j - diff] === storeyID[j]
            ? Math.round(forces[i].wind.momentCrossY[j - diff])
            : '';

        if (j < tempStoreyID.length) {
          shearCrossWindChartData[2 * m].push({
            x: Math.abs(tempShearX[j]),
            y: tempStoreyID[j],
          });
          shearCrossWindChartData[2 * m + 1].push({
            x: Math.abs(tempShearY[j]),
            y: tempStoreyID[j],
          });
          momentCrossWindChartData[2 * m].push({
            x: Math.abs(tempMomentX[j]),
            y: tempStoreyID[j],
          });
          momentCrossWindChartData[2 * m + 1].push({
            x: Math.abs(tempMomentY[j]),
            y: tempStoreyID[j],
          });
        }
      }
      m++;
    }
  }

  const seismicTableData: ICompare[] = [];
  const shearSeismicChartData: IData[][] = [];
  const momentSeismicChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      shearSeismicChartData.push([], []);
      momentSeismicChartData.push([], []);
    }
  }

  for (let j = 0; j < count; j++) {
    seismicTableData.push({
      key: j,
      storeyID: storeyID[j],
    });
  }

  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      const tempStoreyID: number[] = [];
      const tempShearX: number[] = [];
      const tempMomentX: number[] = [];
      const tempShearY: number[] = [];
      const tempMomentY: number[] = [];
      forces[i].seismic.towerID.forEach((val, index) => {
        if (val === k + 1) {
          tempStoreyID.push(forces[i].seismic.storeyID[index]);
          tempShearX.push(forces[i].seismic.shearX[index]);
          tempMomentX.push(forces[i].seismic.momentX[index]);
          tempShearY.push(forces[i].seismic.shearY[index]);
          tempMomentY.push(forces[i].seismic.momentY[index]);
        }
      });
      const len = tempStoreyID[0];
      const diff = count - len;

      for (let j = 0; j < count; j++) {
        seismicTableData[j][`shearX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempShearX[j - diff].toFixed(0)
            : '';
        seismicTableData[j][`momentX${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempMomentX[j - diff].toFixed(0)
            : '';
        seismicTableData[j][`shearY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempShearY[j - diff].toFixed(0)
            : '';
        seismicTableData[j][`momentY${i}-${k}`] =
          tempStoreyID[j - diff] === storeyID[j]
            ? tempMomentY[j - diff].toFixed(0)
            : '';

        if (j < tempStoreyID.length) {
          shearSeismicChartData[2 * m].push({
            x: Math.abs(tempShearX[j]),
            y: tempStoreyID[j],
          });
          shearSeismicChartData[2 * m + 1].push({
            x: Math.abs(tempShearY[j]),
            y: tempStoreyID[j],
          });
          momentSeismicChartData[2 * m].push({
            x: Math.abs(tempMomentX[j]),
            y: tempStoreyID[j],
          });
          momentSeismicChartData[2 * m + 1].push({
            x: Math.abs(tempMomentY[j]),
            y: tempStoreyID[j],
          });
        }
      }
      m++;
    }
  }

  const pipelineAlongWind = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: alongWindTableData, columns: forceColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineCrossWind = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: crossWindTableData, columns: forceColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineSeismic = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: seismicTableData, columns: forceColumns })
    .use(
      features.sort({
        mode: 'single',
        highlightColumnWhenActive: true,
      })
    );

  const describes: IDescribe[] = [];
  for (let i = 0, m = 0; i < n; i++) {
    for (let k = 0; k < towers[i]; k++) {
      describes.push(
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
      m++;
    }
  }

  const { Panel } = Collapse;
  const Forces = (
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
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={80}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            <Panel header="详细数据" key="2">
              <BaseTable
                primaryKey={'key'}
                useVirtual={true}
                hasHeader={true}
                useOuterBorder
                defaultColumnWidth={80}
                style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={80}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelineSeismic.getProps()}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return Forces;
}
