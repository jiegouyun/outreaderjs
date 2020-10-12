import { Table, Collapse } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { IPeriodFE } from '@outreader/core';
import { ICompare } from '../../../interfaces';

export function ComparePeriodComponent(periods: IPeriodFE[]) {
  const n = periods.length;
  let modeID: number[] = [];
  for (let i = 0; i < n; i++) {
    if (periods[i].modeCoupling.modeID.length > modeID.length) {
      modeID = periods[i].modeCoupling.modeID;
    }
  }
  const count = modeID.length;

  const modeColumns: ColumnsType<ICompare> = [
    {
      title: '振型',
      dataIndex: 'modeID',
      width: '3rem',
      align: 'right',
      fixed: 'left',
    },
  ];

  for (let i = 0; i < n; i++) {
    modeColumns.push({
      title: `模型${i + 1}`,
      children: [
        {
          title: `周期`,
          dataIndex: `period${i}`,
          width: `${100 / 2 / n}%`,
          align: 'right',
        },
        {
          title: `转角`,
          dataIndex: `angle${i}`,
          width: `${100 / 2 / n}%`,
          align: 'right',
        },
      ],
    });
  }

  const periodModeTableData: ICompare[] = [];
  for (let j = 0; j < count; j++) {
    periodModeTableData.push({
      key: j,
      modeID: modeID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < count; j++) {
      periodModeTableData[j][`period${i}`] = (
        periods[i].modeCoupling.period[j] || 0
      ).toFixed(3);
      periodModeTableData[j][`angle${i}`] = (
        periods[i].modeCoupling.angle[j] || 0
      ).toFixed(0);
    }
  }

  const periodSeismicTableData: ICompare[] = [];
  for (let j = 0; j < count; j++) {
    periodSeismicTableData.push({
      key: j,
      modeID: modeID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < count; j++) {
      periodSeismicTableData[j][`period${i}`] = (
        periods[i].modeSeismic.period[j] || 0
      ).toFixed(3);
      periodSeismicTableData[j][`angle${i}`] = (
        periods[i].modeSeismic.angle[j] || 0
      ).toFixed(0);
    }
  }

  const periodMassColumns: ColumnsType<ICompare> = [
    {
      title: '振型',
      dataIndex: 'modeID',
      width: '3rem',
      align: 'left',
      fixed: 'left',
    },
  ];

  for (let i = 0; i < n; i++) {
    periodMassColumns.push({
      title: `模型${i + 1}`,
      children: [
        {
          title: `X`,
          dataIndex: `factorX${i}`,
          width: `${100 / 3 / n}%`,
          align: 'right',
        },
        {
          title: `Y`,
          dataIndex: `factorY${i}`,
          width: `${100 / 3 / n}%`,
          align: 'right',
        },
        {
          title: `Z`,
          dataIndex: `factorZ${i}`,
          width: `${100 / 3 / n}%`,
          align: 'right',
        },
      ],
    });
  }

  const periodMassTableData: ICompare[] = [];
  for (let j = 0; j < count; j++) {
    periodMassTableData.push({
      key: j,
      modeID: modeID[j],
    });
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < count; j++) {
      periodMassTableData[j][`factorX${i}`] = (
        periods[i].modeMass.factorX[j] || 0
      ).toFixed(2);
      periodMassTableData[j][`factorY${i}`] = (
        periods[i].modeMass.factorY[j] || 0
      ).toFixed(2);
      periodMassTableData[j][`factorZ${i}`] = (
        periods[i].modeMass.factorZ[j] || 0
      ).toFixed(2);
    }
  }

  const { Panel } = Collapse;
  const Periods = (
    <div>
      <h3>考虑扭转耦联时的动力特性</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={modeColumns}
            dataSource={periodModeTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ x: '30rem', y: 'calc(100vh - 14rem)' }}
          />
        </Panel>
      </Collapse>
      <h3>地震最大作用方向的动力特性</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={modeColumns}
            dataSource={periodSeismicTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ x: '30rem', y: 'calc(100vh - 14rem)' }}
          />
        </Panel>
      </Collapse>
      <h3>质量参与系数</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={periodMassColumns}
            dataSource={periodMassTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ x: '50rem', y: 'calc(100vh - 14rem)' }}
          />
        </Panel>
      </Collapse>
    </div>
  );

  return Periods;
}
