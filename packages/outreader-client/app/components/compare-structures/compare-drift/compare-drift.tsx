import { Row, Collapse } from 'antd';
import { BaseTable, ArtColumn } from 'ali-react-table';
import React from 'react';
import { IDriftFE } from '@outreader/core';
import { StoreyChart } from '../../chart-tools';
import { ICompare, IData, IDescribe } from '../../../interfaces';
import { userColors, userShaps } from '../../../colors';

export function CompareDriftComponent(drifts: IDriftFE[]) {
  const n = drifts.length;
  let storeyID: number[] = [];
  for (let i = 0; i < n; i++) {
    if (
      (drifts[i].driftSeismicX || drifts[i].driftWindXP).storeyID.length >
      storeyID.length
    ) {
      storeyID = (drifts[i].driftSeismicX || drifts[i].driftWindXP).storeyID;
    }
  }
  const count = storeyID.length;

  const driftDispColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
    },
  ];

  for (let i = 0; i < n; i++) {
    driftDispColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children: [
        {
          name: `地震X`,
          code: `seismicX${i}`,
          align: 'right',
        },
        {
          name: `地震Y`,
          code: `seismicY${i}`,
          align: 'right',
        },
        {
          name: `顺风X`,
          code: `windAX${i}`,
          align: 'right',
        },
        {
          name: `顺风Y`,
          code: `windAY${i}`,
          align: 'right',
        },
        {
          name: `横风X`,
          code: `windCX${i}`,
          align: 'right',
        },
        {
          name: `横风Y`,
          code: `windCY${i}`,
          align: 'right',
        },
      ],
    });
  }

  const dispTableData: ICompare[] = [];
  const dispSeismicChartData: IData[][] = [];
  const dispWindChartData: IData[][] = [];
  const driftTableData: ICompare[] = [];
  const driftSeismicChartData: IData[][] = [];
  const driftWindChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    dispSeismicChartData.push([], []);
    dispWindChartData.push([], []);
    driftSeismicChartData.push([], []);
    driftWindChartData.push([], []);
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

  for (let i = 0; i < n; i++) {
    const len = drifts[i].driftWindXP.storeyID.length;
    const diff = count - len;

    for (let j = 0; j < count; j++) {
      dispTableData[j][`seismicX${i}`] =
        drifts[i].driftSeismicX.storeyID[j - diff] === storeyID[j]
          ? drifts[i].driftSeismicX.displacement[j - diff].toFixed(2)
          : '';
      dispTableData[j][`seismicY${i}`] =
        drifts[i].driftSeismicY.storeyID[j - diff] === storeyID[j]
          ? drifts[i].driftSeismicY.displacement[j - diff].toFixed(2)
          : '';
      dispTableData[j][`windAX${i}`] =
        drifts[i].driftWindXP.storeyID[j - diff] === storeyID[j]
          ? drifts[i].driftWindXP.displacement[j - diff].toFixed(2)
          : '';
      dispTableData[j][`windAY${i}`] =
        drifts[i].driftWindYP.storeyID[j - diff] === storeyID[j]
          ? drifts[i].driftWindYP.displacement[j - diff].toFixed(2)
          : '';
      dispTableData[j][`windCX${i}`] =
        drifts[i].driftCrossWindXP.storeyID[j - diff] === storeyID[j]
          ? drifts[i].driftCrossWindXP.displacement[j - diff].toFixed(2)
          : '';
      dispTableData[j][`windCY${i}`] =
        drifts[i].driftCrossWindYP.storeyID[j - diff] === storeyID[j]
          ? drifts[i].driftCrossWindYP.displacement[j - diff].toFixed(2)
          : '';

      dispSeismicChartData[2 * i].push({
        x:
          drifts[i].driftSeismicX.storeyID[j - diff] === storeyID[j]
            ? drifts[i].driftSeismicX.displacement[j - diff]
            : drifts[i].driftSeismicX.displacement[0],
        y:
          drifts[i].driftSeismicX.storeyID[j - diff] === storeyID[j]
            ? drifts[i].driftSeismicX.storeyID[j - diff]
            : drifts[i].driftSeismicX.storeyID[0],
      });
      dispSeismicChartData[2 * i + 1].push({
        x:
          drifts[i].driftSeismicY.storeyID[j - diff] === storeyID[j]
            ? drifts[i].driftSeismicY.displacement[j - diff]
            : drifts[i].driftSeismicY.displacement[0],
        y:
          drifts[i].driftSeismicY.storeyID[j - diff] === storeyID[j]
            ? drifts[i].driftSeismicY.storeyID[j - diff]
            : drifts[i].driftSeismicY.storeyID[0],
      });
      dispWindChartData[2 * i].push({
        x:
          drifts[i].driftWindXP.storeyID[j - diff] === storeyID[j]
            ? drifts[i].driftWindXP.displacement[j - diff]
            : drifts[i].driftWindXP.displacement[0],
        y:
          drifts[i].driftWindXP.storeyID[j - diff] === storeyID[j]
            ? drifts[i].driftWindXP.storeyID[j - diff]
            : drifts[i].driftWindXP.storeyID[0],
      });
      dispWindChartData[2 * i + 1].push({
        x:
          drifts[i].driftWindYP.storeyID[j - diff] === storeyID[j]
            ? drifts[i].driftWindYP.displacement[j - diff]
            : drifts[i].driftWindYP.displacement[0],
        y:
          drifts[i].driftWindYP.storeyID[j - diff] === storeyID[j]
            ? drifts[i].driftWindYP.storeyID[j - diff]
            : drifts[i].driftWindYP.storeyID[0],
      });

      driftTableData[j][`seismicX${i}`] =
        drifts[i].driftSeismicX.storeyID[j - diff] === storeyID[j]
          ? drifts[i].driftSeismicX.drift[j - diff]
          : '';
      driftTableData[j][`seismicY${i}`] =
        drifts[i].driftSeismicY.storeyID[j - diff] === storeyID[j]
          ? drifts[i].driftSeismicY.drift[j - diff]
          : '';
      driftTableData[j][`windAX${i}`] =
        drifts[i].driftWindXP.storeyID[j - diff] === storeyID[j]
          ? drifts[i].driftWindXP.drift[j - diff]
          : '';
      driftTableData[j][`windAY${i}`] =
        drifts[i].driftWindYP.storeyID[j - diff] === storeyID[j]
          ? drifts[i].driftWindYP.drift[j - diff]
          : '';
      driftTableData[j][`windCX${i}`] =
        drifts[i].driftCrossWindXP.storeyID[j - diff] === storeyID[j]
          ? drifts[i].driftCrossWindXP.drift[j - diff]
          : '';
      driftTableData[j][`windCY${i}`] =
        drifts[i].driftCrossWindYP.storeyID[j - diff] === storeyID[j]
          ? drifts[i].driftCrossWindYP.drift[j - diff]
          : '';

      driftSeismicChartData[2 * i].push({
        x:
          drifts[i].driftSeismicX.storeyID[j - diff] === storeyID[j]
            ? 1 / drifts[i].driftSeismicX.drift[j - diff]
            : 1 / drifts[i].driftSeismicX.drift[0],
        y:
          drifts[i].driftSeismicX.storeyID[j - diff] === storeyID[j]
            ? drifts[i].driftSeismicX.storeyID[j - diff]
            : drifts[i].driftSeismicX.storeyID[0],
      });
      driftSeismicChartData[2 * i + 1].push({
        x:
          drifts[i].driftSeismicY.storeyID[j - diff] === storeyID[j]
            ? 1 / drifts[i].driftSeismicY.drift[j - diff]
            : 1 / drifts[i].driftSeismicY.drift[0],
        y:
          drifts[i].driftSeismicY.storeyID[j - diff] === storeyID[j]
            ? drifts[i].driftSeismicY.storeyID[j - diff]
            : drifts[i].driftSeismicY.storeyID[0],
      });
      driftWindChartData[2 * i].push({
        x:
          drifts[i].driftWindXP.storeyID[j - diff] === storeyID[j]
            ? 1 / drifts[i].driftWindXP.drift[j - diff]
            : 1 / drifts[i].driftWindXP.drift[0],
        y:
          drifts[i].driftWindXP.storeyID[j - diff] === storeyID[j]
            ? drifts[i].driftWindXP.storeyID[j - diff]
            : drifts[i].driftWindXP.storeyID[0],
      });
      driftWindChartData[2 * i + 1].push({
        x:
          drifts[i].driftWindYP.storeyID[j - diff] === storeyID[j]
            ? 1 / drifts[i].driftWindYP.drift[j - diff]
            : 1 / drifts[i].driftWindYP.drift[0],
        y:
          drifts[i].driftWindYP.storeyID[j - diff] === storeyID[j]
            ? drifts[i].driftWindYP.storeyID[j - diff]
            : drifts[i].driftWindYP.storeyID[0],
      });
    }
  }

  const dispRatioColumns: ArtColumn[] = [
    {
      name: '层号',
      code: 'storeyID',
      width: 64,
      align: 'right',
      lock: true,
    },
  ];

  for (let i = 0; i < n; i++) {
    dispRatioColumns.push({
      name: `模型${i + 1}`,
      align: 'center',
      children: [
        {
          name: `+X`,
          code: `eccXP${i}`,
          align: 'right',
        },
        {
          name: `-X`,
          code: `eccXN${i}`,
          align: 'right',
        },
        {
          name: `+Y`,
          code: `eccYP${i}`,
          align: 'right',
        },
        {
          name: `-Y`,
          code: `eccYN${i}`,
          align: 'right',
        },
      ],
    });
  }

  const dispRatioTableData: ICompare[] = [];
  const ratioXChartData: IData[][] = [];
  const ratioYChartData: IData[][] = [];
  const dispRatioDTableData: ICompare[] = [];
  const ratioDXChartData: IData[][] = [];
  const ratioDYChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    ratioXChartData.push([], []);
    ratioYChartData.push([], []);
    ratioDXChartData.push([], []);
    ratioDYChartData.push([], []);
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

  for (let i = 0; i < n; i++) {
    const len = drifts[i].ratioSeismicXEccP.storeyID.length;
    const diff = count - len;

    for (let j = 0; j < count; j++) {
      dispRatioTableData[j][`eccXP${i}`] =
        drifts[i].ratioSeismicXEccP.storeyID[j - diff] === storeyID[j]
          ? drifts[i].ratioSeismicXEccP.ratio[j - diff].toFixed(2)
          : '';
      dispRatioTableData[j][`eccXN${i}`] =
        drifts[i].ratioSeismicXEccN.storeyID[j - diff] === storeyID[j]
          ? drifts[i].ratioSeismicXEccN.ratio[j - diff].toFixed(2)
          : '';
      dispRatioTableData[j][`eccYP${i}`] =
        drifts[i].ratioSeismicYEccP.storeyID[j - diff] === storeyID[j]
          ? drifts[i].ratioSeismicYEccP.ratio[j - diff].toFixed(2)
          : '';
      dispRatioTableData[j][`eccYN${i}`] =
        drifts[i].ratioSeismicYEccN.storeyID[j - diff] === storeyID[j]
          ? drifts[i].ratioSeismicYEccN.ratio[j - diff].toFixed(2)
          : '';

      ratioXChartData[2 * i].push({
        x:
          drifts[i].ratioSeismicXEccP.storeyID[j - diff] === storeyID[j]
            ? drifts[i].ratioSeismicXEccP.ratio[j - diff]
            : drifts[i].ratioSeismicXEccP.ratio[0],
        y:
          drifts[i].ratioSeismicXEccP.storeyID[j - diff] === storeyID[j]
            ? drifts[i].ratioSeismicXEccP.storeyID[j - diff]
            : drifts[i].ratioSeismicXEccP.storeyID[0],
      });
      ratioXChartData[2 * i + 1].push({
        x:
          drifts[i].ratioSeismicXEccN.storeyID[j - diff] === storeyID[j]
            ? drifts[i].ratioSeismicXEccN.ratio[j - diff]
            : drifts[i].ratioSeismicXEccN.ratio[0],
        y:
          drifts[i].ratioSeismicXEccN.storeyID[j - diff] === storeyID[j]
            ? drifts[i].ratioSeismicXEccN.storeyID[j - diff]
            : drifts[i].ratioSeismicXEccN.storeyID[0],
      });
      ratioYChartData[2 * i].push({
        x:
          drifts[i].ratioSeismicYEccP.storeyID[j - diff] === storeyID[j]
            ? drifts[i].ratioSeismicYEccP.ratio[j - diff]
            : drifts[i].ratioSeismicYEccP.ratio[0],
        y:
          drifts[i].ratioSeismicYEccP.storeyID[j - diff] === storeyID[j]
            ? drifts[i].ratioSeismicYEccP.storeyID[j - diff]
            : drifts[i].ratioSeismicYEccP.storeyID[0],
      });
      ratioYChartData[2 * i + 1].push({
        x:
          drifts[i].ratioSeismicYEccN.storeyID[j - diff] === storeyID[j]
            ? drifts[i].ratioSeismicYEccN.ratio[j - diff]
            : drifts[i].ratioSeismicYEccN.ratio[0],
        y:
          drifts[i].ratioSeismicYEccN.storeyID[j - diff] === storeyID[j]
            ? drifts[i].ratioSeismicYEccN.storeyID[j - diff]
            : drifts[i].ratioSeismicYEccN.storeyID[0],
      });

      dispRatioDTableData[j][`eccXP${i}`] =
        drifts[i].ratioSeismicXEccP.storeyID[j - diff] === storeyID[j]
          ? drifts[i].ratioSeismicXEccP.ratioD[j - diff].toFixed(2)
          : '';
      dispRatioDTableData[j][`eccXN${i}`] =
        drifts[i].ratioSeismicXEccN.storeyID[j - diff] === storeyID[j]
          ? drifts[i].ratioSeismicXEccN.ratioD[j - diff].toFixed(2)
          : '';
      dispRatioDTableData[j][`eccYP${i}`] =
        drifts[i].ratioSeismicYEccP.storeyID[j - diff] === storeyID[j]
          ? drifts[i].ratioSeismicYEccP.ratioD[j - diff].toFixed(2)
          : '';
      dispRatioDTableData[j][`eccYN${i}`] =
        drifts[i].ratioSeismicYEccN.storeyID[j - diff] === storeyID[j]
          ? drifts[i].ratioSeismicYEccN.ratioD[j - diff].toFixed(2)
          : '';

      ratioDXChartData[2 * i].push({
        x:
          drifts[i].ratioSeismicXEccP.storeyID[j - diff] === storeyID[j]
            ? drifts[i].ratioSeismicXEccP.ratioD[j - diff]
            : drifts[i].ratioSeismicXEccP.ratioD[0],
        y:
          drifts[i].ratioSeismicXEccP.storeyID[j - diff] === storeyID[j]
            ? drifts[i].ratioSeismicXEccP.storeyID[j - diff]
            : drifts[i].ratioSeismicXEccP.storeyID[0],
      });
      ratioDXChartData[2 * i + 1].push({
        x:
          drifts[i].ratioSeismicXEccN.storeyID[j - diff] === storeyID[j]
            ? drifts[i].ratioSeismicXEccN.ratioD[j - diff]
            : drifts[i].ratioSeismicXEccN.ratioD[0],
        y:
          drifts[i].ratioSeismicXEccN.storeyID[j - diff] === storeyID[j]
            ? drifts[i].ratioSeismicXEccN.storeyID[j - diff]
            : drifts[i].ratioSeismicXEccN.storeyID[0],
      });
      ratioDYChartData[2 * i].push({
        x:
          drifts[i].ratioSeismicYEccP.storeyID[j - diff] === storeyID[j]
            ? drifts[i].ratioSeismicYEccP.ratioD[j - diff]
            : drifts[i].ratioSeismicYEccP.ratioD[0],
        y:
          drifts[i].ratioSeismicYEccP.storeyID[j - diff] === storeyID[j]
            ? drifts[i].ratioSeismicYEccP.storeyID[j - diff]
            : drifts[i].ratioSeismicYEccP.storeyID[0],
      });
      ratioDYChartData[2 * i + 1].push({
        x:
          drifts[i].ratioSeismicYEccN.storeyID[j - diff] === storeyID[j]
            ? drifts[i].ratioSeismicYEccN.ratioD[j - diff]
            : drifts[i].ratioSeismicYEccN.ratioD[0],
        y:
          drifts[i].ratioSeismicYEccN.storeyID[j - diff] === storeyID[j]
            ? drifts[i].ratioSeismicYEccN.storeyID[j - diff]
            : drifts[i].ratioSeismicYEccN.storeyID[0],
      });
    }
  }

  const describesDrift: IDescribe[] = [];
  const describesDispRatio: IDescribe[] = [];
  for (let i = 0; i < n; i++) {
    describesDrift.push(
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
    describesDispRatio.push(
      {
        name: `模型${i + 1}-正偏心`,
        fill: userColors[(2 * i) % 8],
        shape: userShaps[(2 * i) % 7],
      },
      {
        name: `模型${i + 1}-负偏心`,
        fill: userColors[(2 * i + 1) % 8],
        shape: userShaps[(2 * i + 1) % 7],
      }
    );
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
            columns={driftDispColumns}
            dataSource={dispTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            columns={driftDispColumns}
            dataSource={driftTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            columns={dispRatioColumns}
            dataSource={dispRatioTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            columns={dispRatioColumns}
            dataSource={dispRatioDTableData}
            primaryKey={'key'}
            useVirtual={true}
            hasHeader={true}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ height: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return Drifts;
}
