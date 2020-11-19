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
import { IData, IDescribe } from '../../../interfaces';
import { userColors, userShaps } from '../../../colors';

export function DriftComponent(drift: IDriftFE) {
  const n = new Set([...drift.driftSeismicX.towerID]).size;

  const driftDispColumns: ArtColumn[] = [
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
      name: '风荷载X',
      code: 'windX',
      align: 'right',
    },
    {
      name: '风荷载Y',
      code: 'windY',
      align: 'right',
    },
    {
      name: '地震X',
      code: 'seismicX',
      align: 'right',
    },
    {
      name: '地震Y',
      code: 'seismicY',
      align: 'right',
    },
  ];

  const dispTableData = [];
  const driftTableData = [];
  const dispSeismicChartData: IData[][] = [];
  const dispWindChartData: IData[][] = [];
  const driftSeismicChartData: IData[][] = [];
  const driftWindChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    dispSeismicChartData.push([], []);
    dispWindChartData.push([], []);
    driftSeismicChartData.push([], []);
    driftWindChartData.push([], []);
  }

  for (let i = 0; i < drift.driftWindXP.storeyID.length; i++) {
    dispTableData.push({
      key: i,
      storeyID: drift.driftWindXP.storeyID[i],
      towerID: drift.driftWindXP.towerID[i],
      windX: drift.driftWindXP.displacement[i].toFixed(2),
      windY: drift.driftWindYP.displacement[i].toFixed(2),
      seismicX: drift.driftSeismicX.displacement[i].toFixed(2),
      seismicY: drift.driftSeismicY.displacement[i].toFixed(2),
    });
    driftTableData.push({
      key: i,
      storeyID: drift.driftWindXP.storeyID[i],
      towerID: drift.driftWindXP.towerID[i],
      windX: drift.driftWindXP.drift[i],
      windY: drift.driftWindYP.drift[i],
      seismicX: drift.driftSeismicX.drift[i],
      seismicY: drift.driftSeismicY.drift[i],
    });

    const towerIndex = drift.driftWindXP.towerID[i] - 1;
    dispSeismicChartData[2 * towerIndex].push({
      x: drift.driftSeismicX.displacement[i],
      y: drift.driftSeismicX.storeyID[i],
    });
    dispSeismicChartData[2 * towerIndex + 1].push({
      x: drift.driftSeismicY.displacement[i],
      y: drift.driftSeismicY.storeyID[i],
    });
    dispWindChartData[2 * towerIndex].push({
      x: drift.driftWindXP.displacement[i],
      y: drift.driftWindXP.storeyID[i],
    });
    dispWindChartData[2 * towerIndex + 1].push({
      x: drift.driftWindYP.displacement[i],
      y: drift.driftWindYP.storeyID[i],
    });
    driftSeismicChartData[2 * towerIndex].push({
      x: 1 / drift.driftSeismicX.drift[i],
      y: drift.driftSeismicX.storeyID[i],
    });
    driftSeismicChartData[2 * towerIndex + 1].push({
      x: 1 / drift.driftSeismicY.drift[i],
      y: drift.driftSeismicY.storeyID[i],
    });
    driftWindChartData[2 * towerIndex].push({
      x: 1 / drift.driftWindXP.drift[i],
      y: drift.driftWindXP.storeyID[i],
    });
    driftWindChartData[2 * towerIndex + 1].push({
      x: 1 / drift.driftWindYP.drift[i],
      y: drift.driftWindYP.storeyID[i],
    });
  }

  const dispRatioColumns: ArtColumn[] = [
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
      name: '+X偏心',
      code: 'eccXP',
      align: 'right',
    },
    {
      name: '-X偏心',
      code: 'eccXN',
      align: 'right',
    },
    {
      name: '+Y偏心',
      code: 'eccYP',
      align: 'right',
    },
    {
      name: '-Y偏心',
      code: 'eccYN',
      align: 'right',
    },
  ];

  const dispRatioTableData = [];
  const dispRatioStoreyTableData = [];
  const ratioXChartData: IData[][] = [];
  const ratioYChartData: IData[][] = [];
  const ratioDXChartData: IData[][] = [];
  const ratioDYChartData: IData[][] = [];
  for (let i = 0; i < n; i++) {
    ratioXChartData.push([], []);
    ratioYChartData.push([], []);
    ratioDXChartData.push([], []);
    ratioDYChartData.push([], []);
  }

  for (let i = 0; i < drift.ratioSeismicXEccP.storeyID.length; i++) {
    dispRatioTableData.push({
      key: i,
      storeyID: drift.ratioSeismicXEccP.storeyID[i],
      towerID: drift.ratioSeismicXEccP.towerID[i],
      eccXP: drift.ratioSeismicXEccP.ratio[i].toFixed(2),
      eccXN: drift.ratioSeismicXEccN.ratio[i].toFixed(2),
      eccYP: drift.ratioSeismicYEccP.ratio[i].toFixed(2),
      eccYN: drift.ratioSeismicYEccN.ratio[i].toFixed(2),
    });
    dispRatioStoreyTableData.push({
      key: i,
      storeyID: drift.ratioSeismicXEccP.storeyID[i],
      towerID: drift.ratioSeismicXEccP.towerID[i],
      eccXP: drift.ratioSeismicXEccP.ratioD[i].toFixed(2),
      eccXN: drift.ratioSeismicXEccN.ratioD[i].toFixed(2),
      eccYP: drift.ratioSeismicYEccP.ratioD[i].toFixed(2),
      eccYN: drift.ratioSeismicYEccN.ratioD[i].toFixed(2),
    });

    const towerIndex = drift.ratioSeismicXEccP.towerID[i] - 1;
    ratioXChartData[2 * towerIndex].push({
      x: drift.ratioSeismicXEccP.ratio[i],
      y: drift.ratioSeismicXEccP.storeyID[i],
    });
    ratioXChartData[2 * towerIndex + 1].push({
      x: drift.ratioSeismicXEccN.ratio[i],
      y: drift.ratioSeismicXEccN.storeyID[i],
    });
    ratioYChartData[2 * towerIndex].push({
      x: drift.ratioSeismicYEccP.ratio[i],
      y: drift.ratioSeismicYEccP.storeyID[i],
    });
    ratioYChartData[2 * towerIndex + 1].push({
      x: drift.ratioSeismicYEccN.ratio[i],
      y: drift.ratioSeismicYEccN.storeyID[i],
    });
    ratioDXChartData[2 * towerIndex].push({
      x: drift.ratioSeismicXEccP.ratioD[i],
      y: drift.ratioSeismicXEccP.storeyID[i],
    });
    ratioDXChartData[2 * towerIndex + 1].push({
      x: drift.ratioSeismicXEccN.ratioD[i],
      y: drift.ratioSeismicXEccN.storeyID[i],
    });
    ratioDYChartData[2 * towerIndex].push({
      x: drift.ratioSeismicYEccP.ratioD[i],
      y: drift.ratioSeismicYEccP.storeyID[i],
    });
    ratioDYChartData[2 * towerIndex + 1].push({
      x: drift.ratioSeismicYEccN.ratioD[i],
      y: drift.ratioSeismicYEccN.storeyID[i],
    });
  }

  const pipelineDisp = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: dispTableData, columns: driftDispColumns })
    .use(
      features.sort({
        mode: 'multiple',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineDrift = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: driftTableData, columns: driftDispColumns })
    .use(
      features.sort({
        mode: 'multiple',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineDispRatio = useTablePipeline({ components: BaseTable as any })
    .input({ dataSource: dispRatioTableData, columns: dispRatioColumns })
    .use(
      features.sort({
        mode: 'multiple',
        highlightColumnWhenActive: true,
      })
    );

  const pipelineDispRatioStorey = useTablePipeline({
    components: BaseTable as any,
  })
    .input({ dataSource: dispRatioStoreyTableData, columns: dispRatioColumns })
    .use(
      features.sort({
        mode: 'multiple',
        highlightColumnWhenActive: true,
      })
    );

  const describesDrift: IDescribe[] = [];
  const describesDispRatio: IDescribe[] = [];
  for (let i = 0; i < n; i++) {
    describesDrift.push(
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
    describesDispRatio.push(
      {
        name: n === 1 ? `正偏心` : `塔${i + 1}-正偏心`,
        fill: userColors[(2 * i) % 8],
        shape: userShaps[(2 * i) % 7],
      },
      {
        name: n === 1 ? `负偏心` : `塔${i + 1}-负偏心`,
        fill: userColors[(2 * i + 1) % 8],
        shape: userShaps[(2 * i + 1) % 7],
      }
    );
  }

  const { Panel } = Collapse;
  const Drift = (
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
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
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
            useVirtual={{ horizontal: false, header: false, vertical: true }}
            useOuterBorder
            defaultColumnWidth={64}
            style={{ maxHeight: 'calc(100vh - 12.5rem)', overflow: 'auto' }}
            {...pipelineDispRatioStorey.getProps()}
          />
        </Panel>
      </Collapse>
    </React.Fragment>
  );

  return Drift;
}
